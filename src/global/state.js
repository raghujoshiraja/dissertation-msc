import { createContext, useState, useEffect } from "react";
import { taglines } from "../utils/constants";

export const chatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [chatData, setChatData] = useState([
    {
      time: "19:05",
      text: "Hello there, your representative this side",
      side: "left",
    },
    { time: "19:05", text: "How may I help you?", side: "left" },
  ]);

  const [currentApproach, setCurrentApproach] = useState(1);

  useEffect(() => {
    setChatData(
      taglines[currentApproach].firstMessages.map((msg) => ({
        time: "19:05",
        text: msg,
        side: "left",
      }))
    );
  }, [currentApproach]);

  return (
    <chatContext.Provider
      value={{ chatData, setChatData, currentApproach, setCurrentApproach }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatContextProvider;
