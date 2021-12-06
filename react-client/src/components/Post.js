import React from "react";

const deleteStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
}




export default function Post( {post, deletePost=null} ) {

function prettyDate(){
    if(post.time && post.time.toDateString){
        return post.time.toDateString()
    }else{
        return new Date(post.time).toDateString()
    }
    
}    
    return (
  <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={post.src} alt={post.alt} />
        <button className="delete" style={deleteStyle} onClick={deletePost}></button>
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <img src={post.user.pic} alt="Placeholder image" />
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4"> {post.user.firstName} {post.user.lastName} </p>
        <p className="subtitle is-6">
            {post.user.handle}
                  <time dateTime={post.time}> {prettyDate} </time>
        </p>
      </div>
    </div>

    <div className="content">
      {post.caption}
    </div>
  </div>
    <footer className="card-footer">
        <a href="#" className="card-footer-item">Save</a>
        <a href="#" className="card-footer-item">Edit</a>
        <a href="#" className="card-footer-item">Delete</a>
  </footer>
</div>
)}
