import { useState, useEffect } from "react";
import SearchPack from "@/Components/Fragments/SearchPack/SearchPack";

const CardAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".ai-chat-container")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-full ai-chat-container">
      <SearchPack
        name="search"
        id="search"
        onClick={() => setIsOpen(true)}
        placeholder="Tanyakan pertanyaan ini kepada AI!"
      />

      {isOpen && (
        <div className="absolute mt-2 h-52 overflow-scroll w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
          <p>asdad</p>
        </div>
      )}
    </div>
  );
};

export default CardAIChat;
