import React, { useState } from 'react'
import { VscChromeClose } from "react-icons/vsc";
import { FiEdit3 } from "react-icons/fi";
import './styles.css'
import { URL } from '../../utils/constants';

const PostsList = ({posts, onDelete, openModal }) => {

  const fetchPostInfo = async (postId) => {
    try {
      const response = await fetch(URL + `/post/${postId}`);

      if (!response.ok) {
        throw new Error("There was an error");
      }

      const data = await response.json();
      openModal(data.post);

    } catch (error) {
      console.error("There was an error", error.message);
    }
  };

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
                <button
                  className="delete-button"
                  onClick={() => onDelete(post.id)}
                >
                  <VscChromeClose />
                </button>
                <button
                  className="edit-button"
                  onClick={() => fetchPostInfo(post.id)}
                >
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