🏗️ Project Structure

- Location: projects/server/
- NestJS Framework: Latest version with TypeScript
- Database: PostgreSQL with TypeORM
- Documentation: Swagger/OpenAPI integration

🗄️ Database Schema

- Users Table: id, name, email, phone, bio, createdAt, updatedAt
- Projects Table: id, name, description, status, startDate, endDate, userId, createdAt, updatedAt
- Relationship: One User → Many Projects (Foreign Key)

🚀 API Endpoints

Users:
- GET /users - Get all users with projects
- GET /users/:id - Get specific user
- POST /users - Create new user
- PATCH /users/:id - Update user
- DELETE /users/:id - Delete user

Projects:
- GET /projects - Get all projects with user info
- GET /projects?userId=:id - Filter projects by user
- GET /projects/:id - Get specific project
- POST /projects - Create new project
- PATCH /projects/:id - Update project
- DELETE /projects/:id - Delete project

🐳 Docker Configuration

- PostgreSQL 16 container with persistent volumes
- Health checks and automatic restart
- Environment variables for database connection

📚 Swagger Documentation

- Interactive API docs at http://localhost:3000/api/docs
- Complete endpoint documentation with examples
- Request/Response schemas with validation

✅ Angular Frontend Integration

🎯 Test Component

- User Management Interface with full CRUD operations
- Project Management with user relationships
- Real-time API integration with error handling
- Modern Angular 19 with standalone components

🎨 Features

- Form validation and error messaging
- Responsive card-based layout
- Status badges for project tracking
- Confirmation dialogs for deletion
- Loading indicators and empty states

✅ Development Setup

🛠️ Scripts Available

# Full Stack Development (from root)
npm run dev:full     # Start database + backend + frontend in parallel

# Backend (projects/server/)
npm run dev          # Start database + development server     
npm run db:up        # Start PostgreSQL container
npm run start:dev    # Development server with hot reload      
npm run build        # Build production bundle
npm run typecheck    # TypeScript validation

# Frontend (projects/primeng-table/)
ng serve            # Development server
ng build            # Production build

🌐 URLs

- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs
- Frontend: http://localhost:4200

🎯 Ready to Test

Quick Start (Everything in Parallel):
npm run dev:full     # Starts database, backend, and frontend

Or Manual Start:
1. Start Backend:
   cd projects/server
   npm run start:dev  # (PostgreSQL via Docker needed)
2. Start Frontend:
   ng serve primeng-table
3. Visit: http://localhost:4200 to test the complete API integration!

The application demonstrates full CRUD operations, proper error handling, database relationships, API documentation, and        
modern frontend integration. Everything is working and ready for testing! 🚀
