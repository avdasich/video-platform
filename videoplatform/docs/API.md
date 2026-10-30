# API видеоплатформы

Backend запускается на `http://localhost:8000`. Интерактивная документация находится по адресу `/swagger/`.

## Пользователи

- `POST /api/users/register/` — регистрация (`email`, `username`, `password`).
- `POST /api/token/` — получение JWT (`email`, `password`).
- `POST /api/token/refresh/` — обновление JWT (`refresh`).

Для защищённых запросов передай заголовок `Authorization: Bearer <access_token>`.

## Видео

- `GET /api/videos/` — список видео, доступен без входа.
- `GET /api/videos/<id>/` — сведения об одном видео.
- `POST /api/videos/upload/` — загрузка видео (multipart: `title`, `description`, `file`), нужен вход.
- `PUT /api/videos/<id>/edit/` — изменение видео владельцем.
- `PATCH /api/videos/<id>/edit/` — частичное изменение видео владельцем.
- `DELETE /api/videos/<id>/delete/` — удаление видео владельцем.

Примечание: модели комментариев и оценок есть в исходниках, но отдельные API-маршруты для них пока не реализованы.
