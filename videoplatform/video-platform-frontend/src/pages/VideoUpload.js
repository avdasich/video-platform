import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      await api.post('videos/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка загрузки');
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-darkBg text-center mb-6">Загрузить видео</h2>
        {error && <div className="mb-4 text-errorRed text-center">{error}</div>}
        <form onSubmit={handleUpload}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              required
            />
          </div>
          <div className="mb-5">
            <textarea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              rows="4"
            />
          </div>
          <div className="mb-6">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full text-sm text-lightGray file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accentBlue file:text-white hover:file:bg-blue-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accentBlue text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Загрузить
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;