import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './Header';
import './ProjectPage.css';

const API_URL = 'https://b-web-2noo.onrender.com';

function ProjectPage() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', image: null, content: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const createPostButtonRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (createPostButtonRef.current) {
      createPostButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/board`);
      setPosts(response.data);
    } catch (error) {
      console.error('There was an error fetching the posts!', error);
    }
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('image', newPost.image);
    formData.append('content', newPost.content);

    try {
      const response = await axios.post(`${API_URL}/board`, formData);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', image: null, content: '' });
      setModalOpen(false);
    } catch (error) {
      console.error('There was an error creating the post!', error);
    }
  };

  const handleEditPost = (index) => {
    setNewPost(posts[index]);
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleUpdatePost = async () => {
    const formData = new FormData();
    formData.append('title', newPost.title);
    if (newPost.image instanceof File) {
      formData.append('image', newPost.image);
    }
    formData.append('content', newPost.content);

    try {
      const response = await axios.put(`${API_URL}/board/${posts[editIndex]._id}`, formData);
      const updatedPosts = posts.map((post, index) =>
        index === editIndex ? response.data : post
      );
      setPosts(updatedPosts);
      setNewPost({ title: '', image: null, content: '' });
      setEditIndex(null);
      setModalOpen(false);
    } catch (error) {
      console.error('There was an error updating the post!', error);
    }
  };

  const handleDeletePost = async (index) => {
    const postId = posts[index]._id;
    try {
      await axios.delete(`${API_URL}/board/${postId}`);
      const updatedPosts = posts.filter((_, i) => i !== index);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('There was an error deleting the post!', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPost((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handlePostClick = (index) => {
    setSelectedPost(posts[index]);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  const closeCreateEditModal = () => {
    setModalOpen(false);
    setNewPost({ title: '', image: null, content: '' });
    setEditIndex(null);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="no-background">
      <Header />
      <div className="project-page">
        <button
          ref={createPostButtonRef}
          className="create-post-button"
          onClick={() => setModalOpen(true)}
        >
          게시물 생성
        </button>
        <div className="posts">
          {posts.length === 0 ? (
            <div className="no-posts-message">게시판을 이용해보세요!</div>
          ) : (
            posts.map((post, index) => (
              <div className="post" key={post._id} onClick={() => handlePostClick(index)}>
                <h2>{post.title}</h2>
                {post.image && (
                  <img src={`${API_URL}/${post.image}`} alt={post.title} />
                )}
                <p>
                  {truncateContent(post.content, 100)}
                  {post.content.length > 100 && (
                    <span
                      className="read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(index);
                      }}
                    >
                      {' '}
                      더보기
                    </span>
                  )}
                </p>
                <div className="post-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPost(index);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(index);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="modal" onClick={closeCreateEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editIndex === null ? '게시물 생성' : '게시물 수정'}</h2>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              placeholder="제목"
            />
            <input type="file" name="image" onChange={handleImageChange} />
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              placeholder="내용"
            />
            <div className="modal-actions">
              <button onClick={editIndex === null ? handleCreatePost : handleUpdatePost}>
                {editIndex === null ? '생성' : '수정'}
              </button>
              <button onClick={closeCreateEditModal}>취소</button>
            </div>
          </div>
        </div>
      )}
      {selectedPost && (
        <div className="post-modal" onClick={closePostModal}>
          <div className="post-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPost.title}</h2>
            {selectedPost.image && (
              <img src={`${API_URL}/${selectedPost.image}`} alt={selectedPost.title} />
            )}
            <p>{selectedPost.content}</p>
            <button onClick={closePostModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
