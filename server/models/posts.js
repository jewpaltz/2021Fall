/* B"H
*/
const Users = require( "./users");
const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('posts');
module.exports.collection = collection;

const list = [
    { 
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "Lorem Ipsom",
        time: Date(),
        user_handle: "@johnsmith",
        isPublic: true,
    },
    { 
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "We want Moshiach Now",
        time: Date(),
        user_handle: "@vp",
        isPublic: true,
    },
    { 
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t31.18172-8/p720x720/886090_10100137903372610_773365632_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=DWVdkKM2PwQAX_tAc5p&_nc_ht=scontent-lga3-2.xx&oh=d9d284fef84a57b1a824932d5fd2da20&oe=618A0203",
        alt: "Purim in SUB #100",
        caption: "What a purim to remember",
        time: Date(),
        user_handle: "@JewPaltz",
        isPublic: true,
    },
    { 
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/s600x600/244029201_10167312248050347_4050463819121596219_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=oaf-csovSFEAX-I2hxQ&_nc_ht=scontent-lga3-2.xx&oh=8466fcd68032477fab99306ba1a6e800&oe=61895C64",
        alt: "Mug with slogan",
        caption: "Never be afraid to try something new. The ark was built by amateurs and the Titanic by professionals",
        time: Date(),
        user_handle: "@JewPaltz",
        isPublic: true,
    },
    { 
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/p180x540/242759506_10102663165018030_5506732176336636339_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=LJFWaOTJXvUAX-skiU3&_nc_ht=scontent-lga3-2.xx&oh=e6a03799ccf969c3b3fe62a7b266b8b9&oe=618C38F8",
        alt: "The family",
        caption: "The whole family. All the kids hiking together. Sukkot Vacation.",
        time: Date(),
        user_handle: "@JewPaltz",
        isPublic: true,
    },
];

const addOwnerPipeline = [
    {"$lookup" : {
        from: "users",
        localField: 'user_handle',
        foreignField: 'handle',
        as: 'user',
    }},
    {$unwind: "$user"},
    { $project: { "owner.password": 0}}
];

module.exports.GetAll = function GetAll() {
    return collection.aggregate(addOwnerPipeline).toArray();
}

module.exports.GetWall = function GetWall(handle) {
    return collection.aggregate(addOwnerPipeline).match({ user_handle: handle }).toArray();
}


module.exports.GetFeed_ = function GetFeed_(handle) {
    //  The "SQL" way to do things
    const query = Users.collection.aggregate([
        {$match: { handle }},
        {"$lookup" : {
            from: "posts",
            localField: 'following.handle',
            foreignField: 'user_handle',
            as: 'posts'
        }},
        {$unwind: '$posts'},
        {$replaceRoot: { newRoot: "$posts" } },
    ].concat(addOwnerPipeline));
    return query.toArray();

}

module.exports.GetFeed = async function (handle) {
    //  The "MongoDB" way to do things. (Should test with a large `following` array)
    const user = await Users.collection.findOne({ handle });
    if(!user){
        throw { code: 404, msg: 'No such user'};
    }
    const targets = user.following.filter(x=> x.isApproved).map(x=> x.handle).concat(handle)
    const query = collection.aggregate([
        {$match: { user_handle: {$in: targets} } },
     ].concat(addOwnerPipeline));
    return query.toArray();
}


module.exports.Get = function Get(post_id) { return collection.findOne({_id: new ObjectId(post_id) }); }

module.exports.Add = async function Add(post) {
    if(!post.user_handle){
        throw {code: 422, msg: "Post must have an Owner"}
    }
    post.time = Date();
    
    const response = await collection.insertOne(post);
    
    post.id = response.insertedId;

    return { ...post };
}
module.exports.Update = async function Update(post_id, post) {
    const results = await collection.findOneAndUpdate(
        {_id: new ObjectId(post_id) }, 
        { $set: post },
        { returnDocument: 'after'}
    );

    return results.value;
}
module.exports.Delete = async function Delete(post_id) {
    const results = await collection.findOneAndDelete({_id: new ObjectId(post_id) })

    return results.value;
} 

module.exports.Search = q => collection.find({ caption: new RegExp(q,"i") }).toArray();

module.exports.Seed = async ()=>{
    for (const x of list) {
        await this.Add(x)
    }
}
