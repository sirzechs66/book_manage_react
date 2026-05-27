# Book Management System

A full-stack Book Management System using React (frontend) and Express + PostgreSQL (backend). Ready for deployment on Railway as a single service.

<img width="1913" height="1032" alt="image" src="https://github.com/user-attachments/assets/b825ffb7-9f1f-4194-b361-674e74047cee" />


## Features
- List, add, edit, and delete books
- Search by title or author
- Filter by genre
- Responsive, clean UI
- Loading indicators and error handling

## Getting Started (Local)

1. **Clone the repo**
2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```
3. **Set up PostgreSQL**
   - Create a database (e.g., `bookdb`).
   - Set the `DATABASE_URL` environment variable:
     - Windows PowerShell:
       `$env:DATABASE_URL="postgresql://username:password@localhost:5432/bookdb"`
     - Linux/macOS:
       `export DATABASE_URL=postgresql://username:password@localhost:5432/bookdb`
4. **Build frontend**
   ```bash
   npm run build
   ```
5. **Start server**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

- For development with hot reload:
   ```bash
   npm run dev
   ```

## Railway Deployment
- Railway will automatically inject the `DATABASE_URL` environment variable for PostgreSQL.
- No extra configuration is needed.

## API Endpoints
- `GET /api/books` – List all books
- `POST /api/books` – Add a new book
- `PUT /api/books/:id` – Update a book
- `DELETE /api/books/:id` – Delete a book

### Request/Response Format
All endpoints use JSON. See code for details.

## Environment Variables
None required for local or Railway deployment.

## Deployment
- Push to GitHub, then deploy on [Railway](https://railway.app) via "Deploy from GitHub repo".
- Railway will use the `start` script in root `package.json`.

[Live Demo](https://bookmanagereact-production.up.railway.app/)
