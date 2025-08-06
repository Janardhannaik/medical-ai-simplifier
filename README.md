# 🧠 AI-Powered Medical Instruction Simplifier (MERN + DeepSeek AI)
![Home Section](https://github.com/user-attachments/assets/762ee1f6-4d49-4b80-9daf-3622e589bf68)
)

## 📌 Problem Statement
Many patients struggle to understand complex medical prescriptions and instructions due to medical jargon, lack of language accessibility, or unclear explanations.  
This can lead to **incorrect medication use**, **missed doses**, and **health complications**.

## 💡 Solution
We built an **AI-powered web application** that:
- Extracts text from medical images (prescriptions, reports, labels).
- Simplifies it into **patient-friendly language**.
- Translates into the **patient’s chosen language**.
- Lists **benefits** and **possible side effects** clearly.
- Saves history for **future reference** with text & image.

---

## ✨ Features
- 📷 **Upload or Scan** medical instructions (file upload or live camera capture).
- 🔠 **Multi-language Support** (English, Hindi, Kannada, Spanish, etc.).
- 🤖 **AI-Powered Simplification** using **DeepSeek Chat API**.
- 📝 **Benefits & Side Effects** automatically listed.
- 🗂 **History View** with image + text for past results.
- 🔊 **Text-to-Speech** output reading.
- 🎨 **Animated Gradient UI** with glassmorphism & blur effects.
- 📜 **Scrollable Output** with inner shadow for better reading.
- 📌 **Consistent Card Sizes** for input, output, and history.
- 🌐 **MERN Stack** architecture for scalability.

---

## 🛠 Tech Stack
**Frontend:** React.js, Axios, Webcam API, CSS animations  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**AI API:** [DeepSeek Chat API](https://api.deepseek.com)  
**OCR:** Tesseract.js / Any OCR model you choose  
**Other:** SpeechSynthesis API (Text-to-Speech), Dotenv for config




## 🔄 Workflow
1. **User uploads an image** or scans via **camera** OR directly enters text.
2. Backend **extracts text** using OCR (`/api/ocr`).
3. Extracted text is sent to **DeepSeek AI** (`/api/simplify`).
4. AI responds with **simplified instructions** + benefits + side effects.
5. Response is **saved to MongoDB history** with image URL.
6. User can:
   - Listen to the output (Text-to-Speech).
   - View history inside the app (click to see full response).
   - Scroll inside the output card for long text.

---

## ⚙️ Setup & Execution

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/medical-ai-simplifier.git
cd medical-ai-simplifier


## 📦 Necessary Packages

### **Backend**
```bash
npm install express mongoose multer cors dotenv axios
npm install tesseract.js         # OCR
````

**Dev dependencies:**

```bash
npm install --save-dev nodemon
```

---

### **Frontend**

```bash
npm install axios react-webcam
```

---

## ⚙️ Environment Variables

Create a `.env` file inside **backend/**:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medical_ai
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

---

## 🔗 Connections

### **Backend → MongoDB**

In `server.js`:

```javascript
import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));
```

---

### **Backend → DeepSeek API**

In `simplify.js` route:

```javascript
import axios from "axios";

const res = await axios.post(
  "https://api.deepseek.com/v1/chat/completions",
  {
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "You are a helpful assistant that simplifies medical prescriptions." },
      { role: "user", content: `Simplify and translate this: ${text}` }
    ]
  },
  { headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}` } }
);
```

---

## 🚀 Setup & Execution

### **1️⃣ Clone the repo**

```bash
git clone https://github.com/YOUR-USERNAME/medical-ai-simplifier.git
cd medical-ai-simplifier
```

---

### **2️⃣ Backend Setup**

```bash
cd backend
npm install
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

---

### **3️⃣ Frontend Setup**

```bash
cd ../frontend
npm install
npm start
```


---

## 📸 Sample Images



<table align="center">
<tr>
<td align="center" width="50%">
  
### 🗣 Language Page  
<img src="https://github.com/user-attachments/assets/972b62c3-a0ac-4191-b1da-a10fe3e8dedc" alt="Language" width="300" style="margin:10px;">

</td>
<td align="center" width="50%">
  
### ℹ About Page  
<img src="https://github.com/user-attachments/assets/4337f39f-32de-42d0-a92c-00eb9e44a971" alt="About" width="300" style="margin:10px;">

</td>
</tr>

<tr>
<td align="center" width="50%">
  
### 📞 Contact Page  
<img src="https://github.com/user-attachments/assets/0c455fb6-71c7-48a6-8483-b682695e112c" alt="Contact Page" width="300" style="margin:10px;">

</td>
<td align="center" width="50%">
  
### 📜 Previous Response  
<img src="https://github.com/user-attachments/assets/e6617ec2-b6e8-469d-bbf8-4d3c137da32c" alt="Previous Response" width="300" style="margin:10px;">

</td>
</tr>

<tr>
<td align="center" width="50%">
  
### 🕘 History Page  
<img src="https://github.com/user-attachments/assets/c34ea84f-5a82-4bcd-9da5-c46faca3b8ff" alt="History" width="300" style="margin:10px;">

</td>
<td align="center" width="50%">
  
### 📤 Output Page  
<img src="https://github.com/user-attachments/assets/17ac0d93-9e29-4003-b41e-8ec5575b839f" alt="Output" width="300" style="margin:10px;">

</td>
</tr>

<tr>
<td align="center" colspan="2">
  
### 🗄 MongoDB Database  
<img src="https://github.com/user-attachments/assets/7aaea803-f962-4d88-ad90-ea8fdb57393d" alt="MongoDB Database" width="300" style="margin:10px;">

</td>
</tr>
</table>

  


---

## 🛡 License

MIT License — Free to use, modify, and distribute.



---



