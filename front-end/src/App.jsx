import { useEffect, useState } from 'react';
import './App.css'
import PostsList from '../components/posts/PostsList';
import { URL } from '../utils/constants';
import { IoAddOutline } from "react-icons/io5";
import Modal from '../components/modal/Modal';

function App() {
  const [posts, setPosts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(URL + '/posts');

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json()

      setPosts(data.posts)
    } catch (error) {
      console.error('Error occured while fetching posts!', error.message)
    }
  }

  const onDelete = async (postId) => {
    try {
      const response = await fetch(URL + `/delete_post/${postId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error("Failed to delete post!")
      }

      const updatedPosts = posts.filter(post => post.id !== postId)
      setPosts(updatedPosts)

      console.log("Post deleted successfully!")
    } catch(error) {
      console.error("There was an error while deleting post!", error.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <PostsList posts={posts} onDelete={onDelete} />
      <button className="open-modal-button" id="openModal" onClick={openModal}>
        <IoAddOutline />
      </button>
      <Modal isModalOpen={isModalOpen} onClose={closeModal}/>
    </>
  );
}

export default App;
