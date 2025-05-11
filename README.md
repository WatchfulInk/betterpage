# BetterPage Project

[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

This is a full-stack application with a Django backend and React frontend.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher

## Backend Setup (Django)

1. Navigate to the backend directory:

```bash
cd backend-django
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure the database:

   - Create a PostgreSQL database named 'betterpage'
   - Update the database credentials in `backend-django/project/settings.py` if needed:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': 'betterpage',
             'USER': 'postgres',
             'PASSWORD': 'root',
             'HOST': 'localhost',
             'PORT': '5432',
         }
     }
     ```

5. Run migrations:

```bash
python manage.py migrate
```

6. Load the database dump:

```bash
psql -U postgres -d betterpage -f ../betterpage_db.dump
```

7. Start the development server:

```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

## Frontend Setup (React)

1. Navigate to the frontend directory:

```bash
cd frontend-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

The backend provides the following API endpoints:

- `/api/productos/` - Products management
- `/api/servicios/` - Services management
- `/api/noticias/` - News management
- `/api/trabajos/` - Jobs management
- `/api/ventas/` - Sales management
- `/api/auth/login/` - User login
- `/api/auth/logout/` - User logout
- `/api/auth/user/` - User information

## Default Login Credentials

The following credentials are available for testing the application:

```
Username: admin
Password: root
```

## Features

- User authentication
- Product management
- Service management
- News management
- Job listings
- Sales tracking

## Technologies Used

### Backend

- Django
- Django REST Framework
- PostgreSQL
- Django CORS Headers

### Frontend

- React
- TypeScript
- Vite
- ESLint
