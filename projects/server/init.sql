-- Create database if not exists
CREATE DATABASE IF NOT EXISTS nestjs_db;

-- Connect to the database
\c nestjs_db;

-- Create users table (will be managed by TypeORM)
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Create projects table (will be managed by TypeORM)
-- CREATE TABLE projects (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   description TEXT,
--   user_id INTEGER REFERENCES users(id),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Note: TypeORM will handle table creation automatically