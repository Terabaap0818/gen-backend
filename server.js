import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/genchat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const ai = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Gen, a gentle, poetic, emotionally safe AI guide. You speak warmly, briefly, and with care."
          },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await ai.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "The bridge is quiet right now."
    });
  }
});

export default app;
