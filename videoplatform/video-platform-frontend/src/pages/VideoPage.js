import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await api.get(`videos/${id}/`);
        console.log('Данные видео:', data); // Для отладки
        setVideo(data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки видео:', error);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('comments/', { video: id, text: comment });
      alert('Комментарий добавлен!');
      setComment('');
    } catch (error) {
      alert('Ошибка добавления комментария');
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await api.post('ratings/', { video: id, rating });
      alert('Оценка добавлена!');
    } catch (error) {
      alert('Ошибка добавления оценки');
    }
  };

  if (loading) return <div className="text-center py-8 text-white">Загрузка...</div>;

  if (!video) return <div className="text-center py-8 text-white">Видео не найдено</div>;

  return (
    <div className="bg-darkBg min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <video controls className="w-full aspect-video rounded-lg mb-6">
            <source src={video.file || video.file_url} type="video/mp4" /> {/* Используем file или file_url */}
            Ваш браузер не поддерживает видео.
          </video>
          <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
          <p className="text-lightGray mb-6">{video.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-white" fill={rating > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-white">0</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-white">0</span>
            </div>
          </div>
          <div className="bg-darkBg p-4 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Оставить комментарий</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray bg-white text-darkBg"
                placeholder="Ваш комментарий"
                rows="4"
                required
              />
              <button
                type="submit"
                className="mt-2 bg-accentBlue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
              >
                Отправить
              </button>
            </form>
            <h2 className="text-xl font-bold text-white mt-6 mb-4">Оценить видео</h2>
            <div className="flex items-center space-x-2">
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-lg bg-white text-darkBg"
              >
                <option value="0">Выберите оценку</option>
                <option value="1">1 - Ужасно</option>
                <option value="2">2 - Плохо</option>
                <option value="3">3 - Нормально</option>
                <option value="4">4 - Хорошо</option>
                <option value="5">5 - Отлично</option>
              </select>
              <button
                onClick={handleRatingSubmit}
                className="bg-accentBlue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
              >
                Оценить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;