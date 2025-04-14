import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setChat([...chat, { message, self: true }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, { message: data.message, self: false }]);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Chat</h2>
      <div style={{ marginBottom: "20px" }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.self ? "right" : "left" }}>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App; // ✅ This should be outside, at the very end

