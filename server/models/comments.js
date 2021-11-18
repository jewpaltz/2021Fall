/* B"H
*/
const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('posts');
module.exports.collection = collection;

async function Get(id) {
    const results = await collection.findOne({ "comments._id":  new ObjectId(id)}, { projection: {"comments.$": 1}});
    if(results?.comments?.length){
        return { ...results.comments[0], postId: results._id };
    }else{
        return null;
    } 
}

function Add(postId, comment) {
    comment.created_at = new Date();
    comment._id = new ObjectId();

    return collection.updateOne(
        { _id: new ObjectId(postId) },
        { $push : { comments: comment } }
    ).then(x=> ({ ...x, insertedComment: comment }));
}

async function Update(id, comment) {
    const oldComment = await Get(id);
    if(!comment) throw { code: 404, msg: 'Comment not found'};

    const newComment = {...oldComment, ...comment};
    return collection.updateOne(
        { "comments._id":  new ObjectId(id) },
        { $set : { "comments.$": newComment } }
    );  
}

function Delete(id) {
    return collection.updateOne(
        { "comments._id":  new ObjectId(id) },
        { $pull : {"comments" : { "_id":  new ObjectId(id) } } }
    );    
}

module.exports = {
    Get, Add, Update, Delete, 
}