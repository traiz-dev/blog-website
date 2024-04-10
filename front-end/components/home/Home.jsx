import { useEffect, useState } from "react";
import "./styles.css";
import PostsList from "../posts/PostsList";
import { URL } from "../../utils/constants";
import { IoAddOutline } from "react-icons/io5";
import Modal from "../modal/Modal";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPostInfo, setModalPostInfo] = useState([]);

  const openModal = (postInfo) => {
    setModalPostInfo(postInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload()
  };

  const fetchData = async () => {
    try {
      const response = await fetch(URL + "/posts");

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();

      setPosts(data.posts);
    } catch (error) {
      console.error("Error occured while fetching posts!", error.message);
    }
  };

  const onDelete = async (postId) => {
    try {
      const response = await fetch(URL + `/delete_post/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post!");
      }

      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);

      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("There was an error while deleting post!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <PostsList posts={posts} onDelete={onDelete} openModal={openModal} />
      <button className="open-modal-button" id="openModal" onClick={openModal}>
        <IoAddOutline />
      </button>
      <Modal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        postInfo={modalPostInfo}
      />
    </>
  );
}

export default Home;
