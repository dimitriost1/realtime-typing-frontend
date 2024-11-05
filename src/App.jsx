import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

function App() {
  const [text, setText] = useState("");
  const [textWS, setTextWS] = useState("");
  const clientId = useRef(uuidv4()); // Generate a unique client ID once when the component is first rendered

  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket("ws://localhost:8080");

      ws.current.onopen = () => {
        console.log("Connected to WebSocket server");
        console.log("Client ID:", clientId.current); // Log client ID to ensure uniqueness
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(`Message received from server: ${message.text} (Sender ID: ${message.senderId})`);

        // Update text only if the message is not from this client
        if (message.senderId !== clientId.current) {
          setTextWS(message.text);
        }
      };

      ws.current.onclose = () => {
        console.log("Disconnected from WebSocket server, attempting to reconnect...");
        setTimeout(connectWebSocket, 1000);
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.current.close();
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Send updated text with the client ID to the WebSocket server
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ senderId: clientId.current, text: newText }));
      console.log("Message sent to server:", newText);
    }
  };

  return (
    <div className="lg:columns-2 my-4">
      <div className="mockup-window border bg-base-300">
        <textarea
          className="textarea textarea-primary textarea-lg h-80"
          placeholder="Type here..."
          onChange={handleChange}
          value={text}
        />
      </div>
      <div className="mockup-window border bg-base-300">
        <textarea
          className="textarea textarea-primary textarea-lg h-80"
          disabled
          value={textWS}
        />
      </div>
    </div>
  );
}

export default App;
