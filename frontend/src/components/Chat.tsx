import { useState } from "react";
import api from "../api/api";

interface Message {
  sender: string;
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: "Hello 👋 I'm your viit AI Assistant. Ask me anything!",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "You",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const question = input;

    setInput("");

    try {
      const res = await api.post("/chat", {
        message: question,
      });

      const aiMessage = {
        sender: "AI",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "Unable to connect to AI.",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        width: "800px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>🤖  AI Assistant</h1>

      <div
        style={{
          height: "500px",
          border: "1px solid #ccc",
          padding: "20px",
          overflowY: "auto",
          borderRadius: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
            }}
          >
            <strong>{msg.sender}:</strong>

            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "20px",
        }}
      >
        <input
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
          }}
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          style={{
            width: "120px",
            marginLeft: "10px",
          }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}