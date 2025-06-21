# 📚 BookVocal – AI PDF-to-Voice Web App

> Read your favorite storybooks or novels aloud with one click! Upload any PDF, choose a page range, select a voice, and let BookVocal narrate your book with synchronized highlighting.

🔗 **Live App**: [https://book-vocal.vercel.app](https://book-vocal.vercel.app)

---

## 🌟 Features

- 📂 Upload any PDF book or story
- 🔢 Select a page range to read
- 🔊 Text-to-speech using browser’s AI voices (Web Speech API)
- 🎙️ Multiple voice options (Google, Microsoft)
- 💡 Light/Dark Mode toggle
- 🔐 Firebase Auth (Login & Signup)
- 📖 Real-time line-by-line reading with highlight
- ⏸️ Playback controls (Play, Pause, Resume, Stop)
- 📱 Responsive UI for all screen sizes

---

## 🛠 Tech Stack

| Layer              | Tool/Library               |
|--------------------|----------------------------|
| Frontend           | React 18 + TypeScript      |
| Styling            | Tailwind CSS               |
| PDF Text Extraction| `pdfjs-dist`               |
| Text-to-Speech     | Web Speech API             |
| Authentication     | Firebase Auth              |
| State Management   | React Context API          |
| Hosting/Deployment | Vercel                     |

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/BookVocal.git
cd BookVocal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Firebase Config

Create a `.env` file in the root directory and paste your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit your .env file to GitHub.** Always use `.gitignore`.

### 4. Run the App Locally

```bash
npm run dev
```

The app will be available at:  
📍 `http://localhost:5173`

---

## 🚀 Deployment (Vercel)

1. Push your code to a GitHub repository
2. Go to [https://vercel.com](https://vercel.com) and import your repo
3. Set the environment variables in the **Vercel Dashboard** using `.env` keys
4. Click **Deploy** — and you're live! 🌐

---

## 💡 Security Best Practices

- Always use `.env` for sensitive credentials
- Use GitHub **Secrets Scanner alerts** to monitor exposed credentials
- If you leak any key, **revoke it immediately** and generate a new one in Firebase
- Use `.gitignore` to avoid committing `.env`

---

## 📂 Project Structure

```
bookvocal/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── firebase.ts
│   └── App.tsx
├── .env
├── vite.config.ts
└── README.md
```

---

## 👨‍💻 Author

Made with ❤️ by [@itsbapunpanda]
