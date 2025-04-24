# Video Platform
Тестовая видеоплатформа, разработанная с использованием Python (Django) для бэкенда и React JS для фронтенда.
Описание
Платформа позволяет пользователям регистрироваться, загружать видео, просматривать их, редактировать и удалять. Реализован адаптивный дизайн на основе макета из Figma.
Технологии

Бэкенд: Python, Django, Django REST Framework
Фронтенд: React JS, Tailwind CSS
Авторизация: JWT (rest_framework_simplejwt)
База данных: SQLite (для разработки)

## Установка

## Бэкенд:

Установите зависимости: pip install -r requirements.txt
Выполните миграции: python manage.py migrate
Запустите сервер: python manage.py runserver


## Фронтенд:

Перейдите в папку фронтенда: cd frontend
Установите зависимости: npm install
Запустите приложение: npm start



Запуск проекта в интегрированной среде
Для удобной работы с проектом рекомендуется использовать интегрированную среду разработки (IDE), например, Visual Studio Code (VS Code). Ниже приведены инструкции для macOS и Windows.
1. Убедитесь, что у вас установлен VS Code

Если VS Code не установлен:
macOS:
Перейдите на официальный сайт VS Code.
Скачайте версию для macOS.
Откройте скачанный файл .dmg, перетащите VS Code в папку "Программы" (Applications).


## Windows:
Перейдите на официальный сайт VS Code.
Скачайте версию для Windows.
Запустите установщик и следуйте инструкциям (рекомендуется установить опцию "Добавить в контекстное меню").





2. Откройте проект в VS Code

macOS:
Откройте Finder и перейдите в папку с проектом (video-platform).
Щёлкните правой кнопкой мыши на папке и выберите "Открыть с помощью" → "Visual Studio Code".
Альтернативно: запустите VS Code, нажмите File → Open Folder, выберите папку video-platform.


Откройте терминал в VS Code: Terminal → New Terminal.


Windows:
Откройте Проводник и перейдите в папку с проектом (video-platform).
Щёлкните правой кнопкой мыши на папке и выберите "Открыть с помощью Code" (если вы добавили VS Code в контекстное меню).
Альтернативно: запустите VS Code, нажмите File → Open Folder, выберите папку video-platform.


Откройте терминал в VS Code: Terminal → New Terminal.



3. Настройте терминал для запуска
VS Code автоматически открывает терминал в корне проекта. Вы можете использовать его для запуска бэкенда и фронтенда.

Для бэкенда:

Убедитесь, что вы находитесь в корне проекта (video-platform).
Активируйте виртуальное окружение (если вы его используете):
macOS: source venv/bin/activate
Windows: venv\Scripts\activate


Выполните команды из раздела "Установка":pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Если вы используете VS Code, можно нажать F5 (или Run → Start Debugging), чтобы запустить сервер, если у вас настроен launch.json для Python.




## Для фронтенда:

Откройте новый терминал в VS Code: Terminal → New Terminal.
Перейдите в папку фронтенда:cd frontend


Выполните команды:npm install
npm start


VS Code автоматически откроет браузер с приложением (по адресу http://localhost:3000).





## 4. Дополнительные рекомендации

Установите расширения в VS Code для удобной работы:
Python (от Microsoft) — для поддержки Python и Django.
ESLint и Prettier — для форматирования JavaScript-кода.
Tailwind CSS IntelliSense — для автодополнения Tailwind CSS.


Если у вас несколько терминалов, используйте кнопку "+" в терминале VS Code, чтобы открыть отдельный терминал для бэкенда и фронтенда.

## API

GET /api/videos/ — список видео
POST /api/videos/upload/ — загрузка видео
PUT /api/videos/<id>/edit/ — редактирование видео
DELETE /api/videos/<id>/delete/ — удаление видео

## Документация

API Документация
