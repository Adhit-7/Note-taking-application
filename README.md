#  Notes App

[![Laravel](https://img.shields.io/badge/Laravel-10-red?logo=laravel)](https://laravel.com/)  
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)  
[![PHP](https://img.shields.io/badge/PHP-8.1-purple?logo=php)](https://www.php.net/)  
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com/)  

A full-stack Notes application with **category support**, built with **Laravel (Backend)** and **React + Material-UI (Frontend)**. Users can create, edit, delete, search, and filter notes by categories.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Backend Setup](#backend-setup)  
- [Frontend Setup](#frontend-setup)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Notes](#notes)  

---

## Features

- User authentication (Laravel Auth)  
- CRUD operations for notes  
- Assign a single category per note  
- Search notes by title  
- Filter notes by category  
- Responsive UI using Material-UI  
- Validation on both frontend and backend  

---

## Tech Stack

- **Backend:** Laravel 10, PHP 8+, MySQL  
- **Frontend:** React 18, Material-UI, Axios  
- **Other:** React Hooks for state management  

---

## Backend Setup

In the `backend` directory, you can run the Laravel project.

### Prerequisites

- PHP >= 8.1  
- Composer  
- MySQL  

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd backend

## Run locally (development)

### Backend
1. `cd Notes_taking_app_code/backend`
2. `composer install`
3. `cp .env.example .env` and update DB and APP_URL
4. `php artisan key:generate`
5. `php artisan jwt:secret`
6. `php artisan migrate --seed`
7. `php artisan serve --port=8000`

API base: `http://127.0.0.1:8000/api`

### Frontend
1. `cd Notes_taking_app_code/react-notes-frontend`
2. `cp .env.example .env` (set `VITE_API_BASE` to `http://127.0.0.1:8000/api`)
3. `npm install`
4. `npm run dev`
5. Open `http://127.0.0.1:5173`

## Production build
- `npm run build` (in frontend), copy `dist` to Laravel `public/react`, set `vite.config.js` base to `/react/`, add catch-all route to `routes/web.php`.

## Notes for grader
- JWT token is saved in `localStorage`.
- CORS enabled for `http://localhost:5173` (dev).
- API endpoints: `/api/register`, `/api/login`, `/api/logout`, `/api/user`, `/api/categories`, `/api/notes`.

## Troubleshooting
- If `APP_KEY` missing: run `php artisan key:generate`.
- If token errors: run `php artisan jwt:secret`.
- DB issues: check `.env` DB settings.
