const axios = require("axios");

exports.simplifyText = async (req, res) => {
  try {
    const { prescriptionText, targetLanguage } = req.body;

    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are a helpful medical assistant. 
            Step 1: Convert the given prescription or doctor's note into very simple, patient-friendly step-by-step points.  
            Step 2: Translate it completely into ${targetLanguage}.  
            Step 3: After instructions, clearly list possible benefits and side effects (also in ${targetLanguage}).  
            Output must be formatted with bullet points for clarity.`,
          },
          {
            role: "user",
            content: prescriptionText,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_DEEPSEEK_API_KEY",
        },
      }
    );

    res.json({ simplifiedText: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error simplifying text" });
  }
};
