# Video Platform

Учебная видеоплатформа на Django REST Framework и React. Здесь есть регистрация, вход по JWT, загрузка видео и управление своими записями. Проект создавался для практики с клиент-серверным приложением, а не для публичного видеохостинга.

## Стек

- Backend: Python, Django, Django REST Framework, PostgreSQL, Simple JWT.
- Frontend: React, React Router, Tailwind CSS, Axios (Create React App).
- API-документация: Swagger.

## Как запустить

Понадобятся Python 3, PostgreSQL и Node.js с npm.

Сначала создай в PostgreSQL базу `videoplatform_db` и пользователя с доступом к ней. Потом перейди в папку Django:

```bash
cd videoplatform
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

На Windows вместо `source .venv/bin/activate` используй `.venv\Scripts\activate`.

Создай `.env` рядом с `manage.py`. Названия настроек есть в `.env.example`: укажи новый секретный ключ Django и данные своей базы. Ключ сгенерируй командой:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Затем запусти миграции и сервер:

```bash
python manage.py migrate
python manage.py runserver
```

API будет доступно на http://localhost:8000, Swagger — на http://localhost:8000/swagger/.

Во втором терминале запусти React:

```bash
cd videoplatform/video-platform-frontend
npm ci
npm start
```

Здесь путь указан от корня репозитория. Если ты уже находишься в папке `videoplatform`, переходи в `video-platform-frontend`.

Интерфейс откроется на http://localhost:3000. Во время локальной разработки запросы `/api/` перенаправляются на Django через proxy из `package.json`.

## Что есть в проекте

- Регистрация и вход через JWT.
- Список и просмотр загруженных видео.
- Загрузка видео авторизованным пользователем.
- Редактирование и удаление своих видео.

Модели комментариев и оценок пока не подключены к API. Проект рассчитан на локальный запуск; настройки для публикации в интернете потребуется делать отдельно.

## API и структура

Маршруты и формат запросов описаны в [документации API](videoplatform/docs/API.md).

- `videoplatform/users/` — пользователи и регистрация.
- `videoplatform/videos/` — модели и API видео.
- `videoplatform/videoplatform/` — настройки Django.
- `videoplatform/video-platform-frontend/` — React-приложение.

## Проверка

Из папки `videoplatform`:

```bash
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py test
```

Из папки `videoplatform/video-platform-frontend`:

```bash
npm test -- --watch=false
npm run build
```

[Макет интерфейса в Figma](https://www.figma.com/design/SQo7GGx4kondK2OI2mT9Ek/03_%D0%A0%D0%93%D0%97).
