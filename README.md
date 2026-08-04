# ThumbStackTask 

# 📚 Personal Book Manager

A full-stack Personal Book Manager built using the MERN stack with Next.js as the frontend.

This project is being developed as part of the Thumbstack Full Stack Developer Assignment.

---

## -> Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

---


## ✨ Planned Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Add Books
- Edit Books
- Delete Books
- Filter by Tags
- Filter by Reading Status
- Dashboard Statistics
- Responsive UI
- Dark Mode
- Smooth Animations

---


##  Backend Setup

### Current Features

- Express server initialized
- Modular application structure
- JSON middleware configured
- Ready for API routes
- Environment-based port configuration


## 📁 Backend Structure

- `server.js` – Starts the Express server.
- `src/app.js` – Configures the Express   application and middleware.
- `.env` – Stores environment variables such as the server port, database connection string, and JWT secret securely.



##  MongoDB connection 

- Uses **Mongoose** to connect to MongoDB.
- Connection logic is separated into `src/config/db.js`.
- Uses the `MONGO_URI` environment variable from `.env`.
- Handles successful and failed database connections.




