# **Gani — The Voice Assistant**

**Gani** is a bilingual, AI-powered voice assistant designed to create meaningful, natural interactions in both **English** and **Hausa**.
Built with **Next.js**, **TypeScript**, and **TailwindCSS**, it delivers a minimal, modern, and responsive interface — blending technology with culture in one elegant experience.

> *Gani doesn’t just understand you — **Gani speaks your language.***

---

## 🎥 **Demo**

Experience Gani in action:

> 🎬 *The demo showcases Gani’s bilingual voice interaction, responsive interface, and settings control on both desktop and mobile.*

If you prefer a visual embed inside your README, use the Markdown syntax below:


![Gani Voice Assistant Demo](/demo/demo.png)


---

## 🚀 **Overview**

Gani enables seamless communication between humans and AI through **speech and text**.
Its adaptive UI ensures a smooth experience across devices, while its dual-language system makes it more inclusive, expressive, and locally relevant.

---

## ✨ **Key Features**

* 🎙️ **Dual Voice Characters** — Switch between *Male* and *Female* voices.
* 🌐 **Language Flexibility** — Instantly toggle between **English** and **Hausa**.
* ⚙️ **Smart Settings Panel** — Lightweight and adaptive (fullscreen on mobile, floating on desktop).
* 🧠 **Conversational AI** — Speak or type your prompts naturally.
* 📱 **Responsive by Design** — Smooth experience across all screens.
* 💎 **Minimalist Interface** — Built with TailwindCSS for clarity, focus, and modern aesthetics.

---

## 🛠️ **Tech Stack**

| Category                      | Tools                                                     |
| ----------------------------- | --------------------------------------------------------- |
| **Framework**                 | [Next.js 15](https://nextjs.org/)                         |
| **Language**                  | [TypeScript](https://www.typescriptlang.org/)             |
| **Styling**                   | [TailwindCSS](https://tailwindcss.com/)                   |
| **Icons**                     | [React Icons](https://react-icons.github.io/react-icons/) |
| **Authentication**            | [NextAuth.js](https://next-auth.js.org/)                  |
| **Voice & AI API (optional)** | OpenAI / Google Speech API                                |

---

## 📁 **Project Structure**

```
src/
├── app/
│   ├── (auth)/
│   │   └── signin/page.tsx         # Minimal Google & GitHub sign-in page
│   ├── settings/page.tsx           # Settings panel (voice, language, timer)
│   ├── page.tsx                    # Main Gani interface
│   └── layout.tsx                  # Root layout
├── components/
│   ├── ui/                         # Reusable UI components
│   └── voice/                      # Voice interaction logic
├── lib/                            # Utility functions & configurations
├── styles/                         # TailwindCSS setup
```

---

## 🔐 **Authentication**

Gani integrates **NextAuth.js** for secure authentication, supporting:

* Google
* GitHub

```ts
// Example configuration (app/api/auth/[...nextauth]/route.ts)
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
]
```

---

## 🧭 **Getting Started**

```bash
# Clone the repository
git clone https://github.com/your-username/gani-voice-assistant.git

# Navigate into the project
cd gani-voice-assistant

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore Gani locally.

---

You need to have the follow variables in your .env file
AUTH_GITHUB_ID = '' // for auth
AUTH_GITHUB_SECRET = '' // for auth
GEMINI_API_KEY= '' // for ai model
BACKEND_HAUSA_AUDIO_SERVER_URL='http://127.0.0.1:5000/api/tts'
AUTH_SECRET="" // in your .env.local file for auth
AUTH_GOOGLE_ID="" // for auth
AUTH_GOOGLE_SECRET=""

## ⚙️ **Settings Panel**

The **Settings Panel** gives users control over:

* 🔄 Voice Character (Male or Female)
* 🌍 Language (English or Hausa)
* ⏱️ Voice Timer / Pause Duration

It’s **fullscreen on mobile** and **floating on desktop**, ensuring accessibility and simplicity.

---

## 🔮 **Future Enhancements**

* 🎧 Real-time voice recognition via AI integration
* 📢 Natural Hausa & English accent synthesis
* 💬 Persistent chat history
* ⚡ Offline mode for basic operations
* 🪄 Custom voice training for personalized interactions

---

## 💡 **Philosophy**

> “Gani isn’t just about talking — it’s about connecting.”

Gani is a bridge between cultures, empowering expression and learning through technology.
It celebrates language diversity while simplifying how humans interact with machines.

---

## 🩵 **Authors**

* **Ayomide** [@mide2020-16]
  *Mathematician · Web Developer · Visionary Educator*

* **Ayanfeoluwa** [@ogayanfe]
  *Creative Developer · DSA Enthhusiast · Full Stack Developer*

> “Building intelligent systems that speak with purpose.”

---

## Gallery
![Gani Voice Assistant Demo](/demo/demo2.png)
![Gani Voice Assistant Demo](/demo/demo3.png)
![Gani Voice Assistant Demo](/demo/demo4.png)
![Gani Voice Assistant Demo](/demo/demo5.png)
![Gani Voice Assistant Demo](/demo/demo6.png)
![Gani Voice Assistant Demo](/demo/demo7.png)
![Gani Voice Assistant Demo](/demo/demo8.png)
![Gani Voice Assistant Demo](/demo/demo9.png)
![Gani Voice Assistant Demo](/demo/demo10.jpg)

 ---

## 📜 **License**

This project is licensed under the **MIT License**.
Feel free to fork, modify, and contribute to make Gani even more expressive and intelligent.
