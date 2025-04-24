import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const fetchVideos = async () => {
    try {
      const { data } = await api.get('videos/');
      console.log('Список видео:', data);
      setVideos(data);
      if (data.length > 0) {
        console.log('Выбрано видео:', data[0]);
        setSelectedVideo(data[0]);
      } else {
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error('Ошибка загрузки видео:', error);
      alert('Не удалось загрузить видео');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSelectVideo = (video) => {
    console.log('Выбрано видео:', video);
    setSelectedVideo(video);
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingVideo) return;

    try {
      // Отправляем только title и description, исключаем file
      const updatedData = {
        title: editTitle,
        description: editDescription,
      };
      const response = await api.put(`videos/${editingVideo.id}/edit/`, updatedData);
      console.log('Ответ сервера:', response.data);
      alert('Видео обновлено!');
      setEditingVideo(null);
      fetchVideos();
    } catch (error) {
      console.error('Ошибка обновления видео:', error.response?.data || error);
      alert('Не удалось обновить видео: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await api.delete(`videos/${videoId}/delete/`);
      alert('Видео удалено!');
      setShowDeleteConfirm(null);
      fetchVideos();
    } catch (error) {
      console.error('Ошибка удаления видео:', error);
      alert('Не удалось удалить видео');
    }
  };

  if (loading) return <div className="text-center py-8 text-white">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex flex-1">
        <div className="flex-1 flex items-center justify-center">
          {selectedVideo ? (
            <div className="w-full max-w-[800px] aspect-video">
              <h2 className="text-white text-2xl mb-4">{selectedVideo.title}</h2>
              <video
                key={selectedVideo.id}
                controls
                className="w-full h-full rounded-lg shadow-lg object-contain"
              >
                <source src={selectedVideo.file_url} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          ) : (
            <div className="text-white text-center">
              <p className="text-2xl">Выберите видео из списка</p>
            </div>
          )}
        </div>

        <div className="w-80 bg-gray-800 rounded-lg shadow-lg p-4 ml-4 flex flex-col">
          <h2 className="text-white text-lg font-bold mb-4">Чат</h2>
          <div className="flex-1 overflow-y-auto">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video.id}
                  className={`p-3 mb-2 rounded-lg cursor-pointer ${
                    selectedVideo && selectedVideo.id === video.id ? 'bg-gray-700' : 'bg-gray-900'
                  } hover:bg-gray-700 transition duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <p onClick={() => handleSelectVideo(video)} className="text-white text-sm">
                      {video.title}
                    </p>
                    {video.is_owner && (
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEditVideo(video)} className="text-white hover:text-blue-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button onClick={() => setShowDeleteConfirm(video.id)} className="text-white hover:text-red-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4h12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400">У вас пока нет видео</p>
                <Link
                  to="/upload"
                  className="mt-2 inline-block bg-accentBlue hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Загрузить первое видео
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Редактировать видео</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Название</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Описание</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-accentBlue text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Подтверждение удаления</h3>
            <p className="mb-4">Вы уверены, что хотите удалить это видео?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Отмена
              </button>
              <button
                onClick={() => handleDeleteVideo(showDeleteConfirm)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;