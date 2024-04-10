import React, { useEffect, useState } from 'react';
import './styles.css';
import { IoCloseSharp } from "react-icons/io5";
import { URL } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

const Modal = ({ isModalOpen, onClose, postInfo }) => {
  const [title, setTitle] = useState(postInfo?.title || "");
  const [content, setContent] = useState(postInfo?.content || "");

  const onSubmit = async () => {
    try {
      const url =
        postInfo && postInfo.id
          ? `${URL}/edit_post/${postInfo.id}`
          : `${URL}/create_post`;

      const response = await fetch(url, {
        method: postInfo && postInfo.id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        toast.error(
          "There was an error while performing operation!",
        );
      } else {
        const data = await response.json();
        if (!postInfo.id) {
          postInfo.id = data.id; 
        }
        toast.success("Operation completed successfully!");
      }
    } catch (error) {
      console.error("There was an error!", error.message);
    }
  };

  useEffect(() => {
    setTitle(postInfo?.title || "");
    setContent(postInfo?.content || "");
  }, [postInfo]);


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {isModalOpen && (
        <>
          <div className="overlay" id="overlay"></div>
          <div id="modal" className="modal-container">
            <button onClick={onClose} className="modal-close-btn">
              <IoCloseSharp />
            </button>
            <div className="modal-title-container">
              <p className="modal-title">
                {postInfo && postInfo.id ? "Edit Post" : "Create New Post"}
              </p>
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
            <button className="modal-create-button" onClick={onSubmit}>
              {postInfo && postInfo.id ? "UPDATE" : "CREATE"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;