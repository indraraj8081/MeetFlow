# MeetFlow — Real-Time Video Conferencing Platform

MeetFlow is a full-stack video conferencing application designed to make online communication simple and convenient. It provides a platform for users to connect and participate in virtual meetings.

## 🚀 Features

- **User Authentication:** User registration and login.
- **Video Conferencing:** Support for real-time video meeting functionality.
- **Audio and Video:** Designed for audio and video communication.
- **Meeting Management:** Meeting-related functionality.
- **Real-Time Communication:** Built with technologies that support real-time interactions.
- **Responsive Interface:** A React-based user interface.

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

**Tools**
- Git and GitHub
- VS Code
- npm

## 📁 Project Structure

```text
MeetFlow/
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── Backend/
│   ├── src/
│   │   ├── Models/
│   │   ├── controllers/
│   │   └── routes/
│   ├── package.json
│   └── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/indraraj8081/MeetFlow.git
cd MeetFlow
```

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB connection string. Add any other environment variables required by your backend configuration.

Start the backend:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser, usually `http://localhost:5173`.

## 🔐 Environment Variables

Keep credentials and secrets in environment files. Never commit `.env` files, database passwords, or authentication secrets to GitHub.

Ensure your `.gitignore` excludes environment files and `node_modules`.

## 🎯 Project Objective

The goal of MeetFlow is to provide a convenient platform for virtual communication while demonstrating full-stack development skills, including frontend development, backend APIs, database integration, authentication, and real-time communication.

## 👨‍💻 Developer

**Indraraj Singh**

GitHub: [@indraraj8081](https://github.com/indraraj8081)

Project Repository: [MeetFlow](https://github.com/indraraj8081/MeetFlow)

---

*MeetFlow — Connect. Communicate. Collaborate.*
