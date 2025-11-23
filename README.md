# Shaharyar Ali - Professional MERN Stack Portfolio

A modern, professional portfolio website built with the MERN stack featuring a cinematic dark theme with neon blue highlights and smooth Framer Motion animations.

## 🚀 Tech Stack

- **Frontend**: React.js with Framer Motion
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Styling**: CSS3 with CSS Variables
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Portfolio
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Run the application**
```bash
npm run dev
```

This will start both the backend server (port 5000) and React frontend (port 3000).

## 🌟 Features

- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion powered transitions
- **Contact Form**: Functional contact form with MongoDB storage
- **Dynamic Projects**: Projects fetched from database
- **Modern UI**: Cinematic dark theme with neon accents
- **Professional Layout**: Clean, developer-focused design

## 📁 Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server.js              # Express backend
├── package.json           # Backend dependencies
├── .env                   # Environment variables
└── README.md
```

## 🎨 Customization

- **Colors**: Modify CSS variables in `client/src/index.css`
- **Content**: Update component data in respective files
- **Database**: Add/modify MongoDB schemas in `server.js`

## 🚀 Deployment

1. **Build the React app**
```bash
cd client && npm run build
```

2. **Set production environment**
```bash
export NODE_ENV=production
```

3. **Start the server**
```bash
npm start
```

## 📧 Contact

For any questions or suggestions, feel free to reach out through the contact form on the website.