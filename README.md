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
