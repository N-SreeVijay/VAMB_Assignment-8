import React, { useState } from "react";
import axios from "axios";

const HomePage = ({ onStartChat, isDarkMode, toggleTheme }) => {
  const themeStyles = {
    backgroundColor: isDarkMode ? "#1a1a1d" : "#e0e0e0", // Darker background for light mode
    color: isDarkMode ? "#f2f2f2" : "#444", // Darker text for light mode
    buttonBackground: isDarkMode ? "#ff6f61" : "#7f8c8d", // Slightly darker button for light mode
    buttonColor: "#fff",
    headerBackground: isDarkMode ? "#333" : "#fff",
    headerColor: isDarkMode ? "#f2f2f2" : "#444", // Slightly darker header text
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    inputBackground: isDarkMode ? "#262626" : "#f0f0f0", // Darker input background for light mode
    inputBorderColor: isDarkMode ? "#ff6f61" : "#bbb", // Darker border for light mode
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeStyles.backgroundColor,
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: themeStyles.headerBackground,
          color: themeStyles.headerColor,
          boxShadow: themeStyles.boxShadow,
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>Welcome to VAMB AI Bot</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          Your personal assistant .
        </p>
        <button
          onClick={onStartChat}
          style={{
            backgroundColor: themeStyles.buttonBackground,
            color: themeStyles.buttonColor,
            padding: "10px 20px",
            fontSize: "1.2rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Chat with BOT
        </button>
      </header>
    </div>
  );
};

const ChatPage = ({ isDarkMode, toggleTheme, onBackToHome }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const themeStyles = {
    backgroundColor: isDarkMode ? "#1a1a1d" : "#e0e0e0", // Darker background for light mode
    color: isDarkMode ? "#f2f2f2" : "#444", // Darker text for light mode
    buttonBackground: isDarkMode ? "#ff6f61" : "#7f8c8d", // Slightly darker button for light mode
    buttonColor: "#fff",
    headerBackground: isDarkMode ? "#333" : "#fff",
    headerColor: isDarkMode ? "#f2f2f2" : "#444", // Slightly darker header text
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    inputBackground: isDarkMode ? "#262626" : "#f0f0f0", // Darker input background for light mode
    inputBorderColor: isDarkMode ? "#ff6f61" : "#bbb", // Darker border for light mode
  };  

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading...");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBYAadzPyE6aJcuD_XW0FcCVZ1p5CFsg6I`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Something went wrong. Try again.");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div
      style={{
        backgroundColor: themeStyles.backgroundColor,
        color: themeStyles.color,
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Courier New', Courier, monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          backgroundColor: themeStyles.headerBackground,
          color: themeStyles.headerColor,
          boxShadow: themeStyles.boxShadow,
          padding: "10px 0",
          textAlign: "center",
          zIndex: "10",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: "0" }}>VAMB AI Bot</h1>
        <p style={{ fontStyle: "italic", color: "#ccc", margin: "0" }}>
          Your personal AI-powered assistant
        </p>
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            backgroundColor: themeStyles.buttonBackground,
            color: themeStyles.buttonColor,
            padding: "5px 10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={onBackToHome}
          style={{
            position: "absolute",
            top: "10px",
            left: "20px",
            backgroundColor: themeStyles.buttonBackground,
            color: themeStyles.buttonColor,
            padding: "5px 10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back to Home
        </button>
      </header>

      <section
        style={{
          maxWidth: "700px",
          backgroundColor: isDarkMode ? "#333" : "#f4f4f9",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.5)",
          border: `1px solid ${themeStyles.inputBorderColor}`,
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#ff6f61", fontWeight: "600" }}>How to Use</h2>
        <p style={{ color: isDarkMode ? "#ccc" : "#333", lineHeight: "1.6" }}>
          Type a question or request below, and  AI will provide you with a response based on its powerful language model. Simply click "Submit" to get started!
        </p>
      </section>

      <form
        onSubmit={generateAnswer}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          width: "100%",
          backgroundColor: themeStyles.inputBackground,
          color: themeStyles.color,
          padding: "20px",
          borderRadius: "12px",
          boxShadow: themeStyles.boxShadow,
          border: `1px solid ${themeStyles.inputBorderColor}`,
          marginTop: "120px",
        }}
      >
        <textarea
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          style={{
            backgroundColor: themeStyles.inputBackground,
            color: themeStyles.color,
            border: `1px solid ${themeStyles.inputBorderColor}`,
            borderRadius: "8px",
            padding: "10px",
            width: "100%",
            fontSize: "1rem",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: generatingAnswer ? "#888" : themeStyles.buttonBackground,
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: generatingAnswer ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Loading..." : "Submit"}
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          maxWidth: "600px",
          width: "100%",
          backgroundColor: themeStyles.inputBackground,
          borderRadius: "8px",
          boxShadow: themeStyles.boxShadow,
          fontSize: "1.1rem",
          color: themeStyles.buttonBackground,
        }}
      >
        {answer && (
          <>
            <h3 style={{ color: themeStyles.buttonBackground, marginBottom: "10px" }}>Response:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
          </>
        )}
      </div>

      <footer
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          padding: "10px 0",
          textAlign: "center",
          backgroundColor: themeStyles.headerBackground,
          color: themeStyles.headerColor,
        }}
      >
        <p style={{ fontSize: "0.9rem", margin: "0" }}>Done BY THE VAMB TEAM</p>
      </footer>
    </div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [showChatPage, setShowChatPage] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const startChat = () => setShowChatPage(true);
  const backToHome = () => setShowChatPage(false);

  return (
    <div>
      {showChatPage ? (
        <ChatPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} onBackToHome={backToHome} />
      ) : (
        <HomePage onStartChat={startChat} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
    </div>
  );
}
