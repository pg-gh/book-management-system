# Book Management App

The **Book Management App** is a full-stack web application built using **React.js**, **Redux**, **Node.js**, **Express.js**, and **MongoDB/PostgreSQL**. It allows users to manage books by providing features such as viewing a list of books, adding new books, editing book details, deleting books, filtering and sorting books, and pagination. The application also includes features like real-time filtering, dropdown filters, and a date range picker.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Performance Optimizations](#performance-optimizations)
- [Testing](#testing)

## Features

- View a list of books with pagination.
- Add, edit, and delete books.
- Upload book cover images.
- Filter books by title, author, genre, and publication date.
- Sort books by title, author, or publication date.
- Advanced filtering with real-time search and date range picker.
- Fully responsive and mobile-first UI.
- REST API with CRUD operations.
- Backend image upload support using Multer middleware.

## Technologies Used

- **Frontend:**

  - React.js (with Redux for state management)
  - Material UI for responsive UI components
  - Axios for API requests
  - React Router for navigation

- **Backend:**
  - Node.js and Express.js
  - MongoDB
  - Multer for image uploads
  - Mongoose (for MongoDB)

## Folder Structure

\`\`\`plaintext
book-management-app/
│
├── backend/
│ ├── config/ # Database configuration
│ ├── controllers/ # Route controllers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── middlewares/ # Middleware functions (e.g., for Multer)
│ ├── app.js # Main Express app
│ └── package.json # Backend dependencies and scripts
│
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── redux/ # Redux actions, reducers, store
│ │ ├── App.js # Main application file
│ │ ├── index.js # Entry point for React
│ └── public/ # Public static assets
│
└── README.md # Project guide
\`\`\`

## Prerequisites

- **Node.js** (version >= 14.x.x)
- **MongoDB**
- **npm** or **yarn** (for managing dependencies)
- **Git** (version control)

## Backend Setup

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/pg-gh/book-management-app.git
   cd book-management-app/backend
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Variables**:
   Create a \`.env\` file in the \`backend/\` directory and configure your environment variables:

   \`\`\`env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/bookmanagement # MongoDB
   \`\`\`

4. **Run the server locally**:
   \`\`\`bash
   npm start
   \`\`\`

   The server will run on \`http://localhost:5000\`.

5. **API Endpoints**:

   | Method | Endpoint       | Description             |
   | ------ | -------------- | ----------------------- |
   | GET    | /api/books     | Get all books           |
   | GET    | /api/books/:id | Get a single book by ID |
   | POST   | /api/books     | Add a new book          |
   | PUT    | /api/books/:id | Edit a book             |
   | DELETE | /api/books/:id | Delete a book           |

## Frontend Setup

1. **Navigate to the frontend directory**:
   \`\`\`bash
   cd ../frontend
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Create a \`.env\` file**:
   Add the backend API URL to the \`.env\` file:

   \`\`\`env
   REACT_APP_API_URL=http://localhost:5000/api
   \`\`\`

4. **Run the frontend**:
   \`\`\`bash
   npm start
   \`\`\`

   The React application will run on \`http://localhost:3000\`.

## Performance Optimizations

The following performance optimization techniques have been applied to the project:

- **Lazy Loading**: Used for loading components and images to reduce initial page load.
- **Minification**: JavaScript and CSS files are minified to decrease file size and improve load speed.

## Testing

The application includes unit and integration tests for both frontend and backend components.

### Running Tests:

**Frontend tests**:
Run tests using \`Jest\` and \`React Testing Library\`:
\`\`\`bash
npm run test
\`\`\`
