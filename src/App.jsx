import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

function App() {
  const [text, setText] = useState("");
  const [textWS, setTextWS] = useState("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight); // Track window height dynamically
  const clientId = useRef(uuidv4()); // Generate a unique client ID once when the component is first rendered

  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(`ws://${window.location.hostname}:8081`);

      ws.current.onopen = () => {
        console.log("Connected to WebSocket server");
        console.log("Client ID:", clientId.current); // Log client ID to ensure uniqueness
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(
          `Message received from server: ${message.text} (Sender ID: ${message.senderId})`
        );

        // Update text only if the message is not from this client
        if (message.senderId !== clientId.current) {
          setTextWS(message.text);
        }
      };

      ws.current.onclose = () => {
        console.log(
          "Disconnected from WebSocket server, attempting to reconnect..."
        );
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
      ws.current.send(
        JSON.stringify({ senderId: clientId.current, text: newText })
      );
      console.log("Message sent to server:", newText);
    }
  };

  // Adjust window height dynamically on resize (handles keyboard on mobile)
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="lg:columns-2 my-4"
      style={{ height: `${windowHeight}px` }} // Dynamically adjust parent height
    >
      <div
        className="mockup-window border bg-base-300"
        style={{ height: `${windowHeight / 2}px` }} // Split space dynamically
      >
        <textarea
          id="chat-messages"
          className="textarea textarea-primary textarea-lg"
          placeholder="Type here..."
          onChange={handleChange}
          value={text}
          style={{ height: "100%" }} // Fill available space
        />
      </div>
      <div
        className="mockup-window border bg-base-300"
        style={{ height: `${windowHeight / 2}px` }} // Split space dynamically
      >
        <textarea
          id="chat-input"
          className="textarea textarea-primary textarea-lg"
          disabled
          value={textWS}
          style={{ height: "100%" }} // Fill available space
        />
      </div>
    </div>
  );
}

export default App;
