import React, { useState } from 'react';
import './styles.css';
import { IoCloseSharp } from "react-icons/io5";
import { URL } from "../../utils/constants";

const Modal = ({ isModalOpen, onClose }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const onSubmit = async () => {
    try {
      const response = await fetch(URL + '/create_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      })

      if (!response.ok) {
        console.log("There was an error while creating new post!", response.message)
      }

      console.log("Post created successfully!")
      window.location.reload()

    } catch(error) {
      console.error("There was an error!", error.message)
    }
  }

  return (
    <>
      {isModalOpen && (
        <>
          <div className="overlay" id="overlay"></div>
          <div id="modal" className="modal-container">
            <button onClick={onClose} className="modal-close-btn">
              <IoCloseSharp />
            </button>
            <div className="modal-title-container">
              <p className="modal-title">Create New Post</p>
            </div>
            <div className="modal-body-container">
              <label htmlFor="Title" className="modal-label">
                Title
              </label>
              <input
                className="modal-input"
                type="text"
                placeholder="Title of post..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="Title" className="modal-label">
                Content
              </label>
              <textarea
                className="modal-input-content"
                type="text"
                placeholder="Title of post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className='modal-create-button' onClick={onSubmit}>CREATE</button>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;