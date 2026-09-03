# 🤖 MindBot – AI Assistant

MindBot is a modern, minimalist AI chatbot web application powered by **FastAPI** on the backend and Google's **Gemini API** (connected via OpenAI SDK compatibility). It features a sleek, dark-themed responsive user interface.

> **Created & Developed by:** Sujit Kar

---

## ✨ Features

- 🧠 **Dual Memory Modes:**
  - **Without Memory:** Independent single-turn Q&A mode.
  - **With Memory:** Context-aware conversation retaining full chat history.
- 🎨 **Modern Minimalist UI:** Elegant dark aesthetics, subtle ambient glow, smooth transitions, and auto-expanding input field.
- ⚡ **High Performance:** Fast asynchronous backend with **FastAPI** + lightweight Vanilla JavaScript frontend.
- 🔄 **Memory Reset:** Clear session context anytime with a dedicated endpoint.

---

## 🛠️ Tech Stack

- **Backend:** Python 3.10+, [FastAPI](https://fastapi.tiangolo.com/), Uvicorn
- **AI Model:** Google Gemini (`gemini-3.1-flash-lite` via OpenAI compatibility API)
- **Frontend:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+)
- **Typography:** Inter (Google Fonts)

---

## 📁 Project Structure

```text
ChatBoot2.0/
│
├── main.py              # FastAPI server & AI logic
├── requirements.txt     # Python dependencies list
├── index.html           # Main chat web page
├── style.css            # Stylesheets and visual animations
├── app.js               # Frontend chat logic, API integration & state
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

Follow these step-by-step instructions to get MindBot running on your local machine.

### Step 1: Create a Virtual Environment

**Windows (PowerShell / CMD):**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

> You should see `(venv)` at the beginning of your terminal prompt when activated.

---

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs: `fastapi`, `uvicorn`, `python-dotenv`, `openai`

---

### Step 3: Start the Backend Server

```bash
uvicorn main:app --reload
```

- **Server:** `http://127.0.0.1:8000`
- **Swagger Docs:** `http://127.0.0.1:8000/docs`
- **ReDoc:** `http://127.0.0.1:8000/redoc`

> Keep this terminal running in the background.

---

### Step 4: Open the Frontend

Open `index.html` in your browser:

**Option A – Direct:**
```
Double-click index.html in your file explorer
```

**Option B – VS Code Live Server:**
```
Right-click index.html → Open with Live Server
```

**Option C – Python HTTP Server:**
```bash
python -m http.server 5500
```
Then open `http://localhost:5500` in your browser.

---

### Step 5: Start Chatting!

1. Select your mode: **Without Memory** or **✦ With Memory**
2. Type your message in the input field
3. Press Enter or click the Send button
4. Enjoy chatting with MindBot! 🎉

---

## 🔌 API Reference

### Send Message

```
POST /chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello MindBot!",
  "mode": "with-memory"
}
```

**Response:**
```json
{
  "message": "Hello! How can I help you today?"
}
```

### Reset Chat Memory

```
POST /reset
```

**Response:**
```json
{
  "status": "cleared"
}
```

---

## 👤 Author

- **Developer:** Sujit Kar
- **Application:** MindBot (ChatBoot2.0)

