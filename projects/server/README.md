# NestJS CRUD API

A comprehensive CRUD API built with NestJS, TypeORM, and PostgreSQL featuring Users and Projects management with complete Swagger documentation.

## Features

- **User Management**: Full CRUD operations for users
- **Project Management**: Full CRUD operations for projects with user relations
- **PostgreSQL Database**: Robust relational database with TypeORM
- **Swagger Documentation**: Complete API documentation at `/api/docs`
- **Docker Support**: Containerized PostgreSQL database
- **Validation**: Request validation with class-validator
- **CORS Enabled**: Ready for frontend integration

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Docker Desktop (for database)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the PostgreSQL database:
```bash
npm run db:up
```

3. Start the development server:
```bash
npm run start:dev
```

The application will be running at:
- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run db:up` - Start PostgreSQL container
- `npm run db:down` - Stop PostgreSQL container
- `npm run db:logs` - View database logs
- `npm run dev` - Start database and development server together
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run typecheck` - Check TypeScript types

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `GET /projects?userId=:id` - Get projects by user
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## Database Schema

### Users Table
- `id` (Primary Key)
- `name` (VARCHAR 255)
- `email` (VARCHAR 255, Unique)
- `phone` (VARCHAR 255, Optional)
- `bio` (TEXT, Optional)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Projects Table
- `id` (Primary Key)
- `name` (VARCHAR 255)
- `description` (TEXT, Optional)
- `status` (VARCHAR 100, Optional)
- `startDate` (DATE, Optional)
- `endDate` (DATE, Optional)
- `userId` (Foreign Key to Users)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=nestjs_db
PORT=3000
```

## Docker Configuration

The `docker-compose.yml` file configures:
- PostgreSQL 16 container
- Database persistence with volumes
- Health checks
- Port mapping (5432:5432)

## Testing the API

Visit http://localhost:3000/api/docs for the interactive Swagger documentation where you can test all endpoints.

### Example User Creation:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "bio": "Software developer"
}
```

### Example Project Creation:
```json
{
  "name": "E-commerce Website",
  "description": "A modern e-commerce platform",
  "status": "In Progress",
  "startDate": "2024-01-15",
  "endDate": "2024-06-15",
  "userId": 1
}
```
