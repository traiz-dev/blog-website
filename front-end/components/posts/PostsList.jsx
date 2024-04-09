import React from 'react'
import { VscChromeClose } from "react-icons/vsc";
import { FiEdit3 } from "react-icons/fi";
import './styles.css'

const PostsList = ({posts, onDelete}) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <div className="card" key={post.id}>
            <div className="card-header">
              <p className="post-title">{post.title}</p>
            </div>
            <div className="card-body">
              <p className="post-content">{post.content}</p>
              <p className="post-timestamp">{post.createdAt}</p>
              <div className="post-buttons">
                <button className="delete-button" onClick={() => onDelete(post.id)}>
                  <VscChromeClose />
                </button>
                <button className="edit-button">
                  <FiEdit3 />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default PostsList
