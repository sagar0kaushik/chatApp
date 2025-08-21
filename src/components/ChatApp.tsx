"use client";

import { useState } from "react";
import {
  Search, Phone, Video, Info, X, Edit, Filter, Plus,
  Camera, Paperclip, Send
} from "lucide-react";

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [message, setMessage] = useState("");

  const contacts = [
    { id: 1, name: "Group", lastMessage: "team group", avatar: "https://static.thenounproject.com/png/1018209-200.png" },
    { id: 2, name: "rohan", lastMessage: "team leader", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "sagar", lastMessage: "team member", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "she", lastMessage: "team member", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  // ✅ messages
  const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({
    Group: [
      { from: "rohan", text: "Brooo, meeting today right?", time: "9:00 AM" },
      { from: "he", text: "Yeah, don’t be late ", time: "9:02 AM" },
      { from: "she", text: "I’ll bring the notes ", time: "9:05 AM" },
      { from: "me", text: "Cool, I’ll set up the projector.", time: "9:07 AM" },
      { from: "sagar", text: "Perfect! Let’s make it quick guys.", time: "9:10 AM" },
    ],
    sagar: [
      { from: "me", text: "Hey sagar, don’t forget the meeting today.", time: "9:00 AM" },
      { from: "them", text: "Got it, I’ll be there!", time: "9:05 AM" },
      { from: "me", text: "Bring your laptop too.", time: "9:10 AM" },
      { from: "them", text: "ok", time: "9:10 AM" },
    ],
    rohan: [
      { from: "me", text: "hello sir!", time: "8:15 PM" },
      { from: "them", text: "hey!", time: "8:16 PM" },
      { from: "me", text: "is there a meeting today?", time: "8:20 PM" },
      { from: "them", text: "yes! arround 2:00 pm", time: "8:16 PM" },
    ],
    she: [
      { from: "them", text: "Did you finish the notes?", time: "11:00 AM" },
      { from: "me", text: "Almost done, I’ll send them soon.", time: "11:05 AM" },
      { from: "them", text: "Thanks, lifesaver!", time: "11:07 AM" },
    ],
  });

  // ✅ send
  const handleSend = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      from: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedChat.name]: [...(prev[selectedChat.name] || []), newMessage],
    }));

    setMessage("");
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ descriptions
  const chatDescriptions: Record<string, string> = {
    Group: "This is your go-to hub for seamless communication and collaboration among our team. Share updates, discuss plans, and stay in sync effortlessly.",
    sagar: "Chat with Sagar directly. Share quick updates, reminders, or casual talk anytime without the group noise.",
    rohan: "This is your private space with Rohan, the team leader. Perfect for important updates, clarifications, and leadership discussions.",
    she: "A one-on-one chat with her. Great for sharing notes, progress, or even light conversations when you need some motivation.",
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-black p-4 space-x-4">
      {/* Sidebar */}
      <div className="w-1/4 flex flex-col rounded-2xl shadow-lg bg-white/70 backdrop-blur-md p-2">
        {/* Search */}
        <div className="p-3 flex items-center space-x-2">
          <div className="flex items-center bg-white/60 rounded-lg px-2 flex-1 shadow-sm">
            <Search className="text-gray-600 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search contacts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full p-2 outline-none text-sm text-black"
            />
            <Filter className="text-gray-600 w-4 h-4 cursor-pointer" />
          </div>
          <button className="ml-2 p-2 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-500">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Contacts */}
        <div className="flex-1 overflow-y-auto space-y-1">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-3 hover:bg-blue-50/80 hover:shadow-md rounded-xl cursor-pointer transition"
              onClick={() => setSelectedChat(contact)}
            >
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-bold">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col rounded-2xl shadow-xl bg-purple-50">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 shadow-md rounded-t-2xl bg-white/70 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <img src={selectedChat.avatar} className="w-10 h-10 rounded-full" />
                <h2
                  className="font-bold cursor-pointer"
                  onClick={() => setShowGroupInfo(true)}
                >
                  {selectedChat.name}
                </h2>
              </div>
              <div className="flex space-x-4 text-gray-700">
                <Search className="w-5 h-5 cursor-pointer" />
                <Phone className="w-5 h-5 cursor-pointer" />
                <Video className="w-5 h-5 cursor-pointer" />
                <Info
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShowGroupInfo(true)}
                />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages[selectedChat.name]?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-2 rounded-xl shadow-sm ${msg.from === "me" ? "bg-blue-100" : "bg-white"}`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white/70 backdrop-blur-md flex items-center rounded-b-2xl shadow-inner">
              <div className="flex items-center bg-gray-100 rounded-lg px-2 flex-1 shadow-sm">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 p-2 bg-transparent outline-none text-black"
                />
                <Camera className="w-5 h-5 text-gray-700 font-bold cursor-pointer mx-1" />
                <Paperclip className="w-5 h-5 text-gray-700 font-bold cursor-pointer mx-1" />
              </div>
              <button
                onClick={handleSend}
                className="ml-2 p-2 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-500 font-bold"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Info Sidebar */}
      {showGroupInfo && (
        <div className="w-1/4 flex flex-col rounded-2xl shadow-lg bg-white/80 backdrop-blur-md">
          <div className="flex justify-between items-center p-4 shadow-sm bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-2xl">
            <Edit className="w-5 h-5 cursor-pointer text-gray-700" />
            <X
              className="w-5 h-5 cursor-pointer text-gray-700"
              onClick={() => setShowGroupInfo(false)}
            />
          </div>
          <div className="p-4 flex flex-col items-center">
            <img src={selectedChat?.avatar} className="w-20 h-20 rounded-full mb-2 shadow-md" />
            <h3 className="font-bold">{selectedChat?.name}</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {chatDescriptions[selectedChat?.name] || ""}
            </p>
          </div>

          {/* ✅ Members list only in Group info */}
          {selectedChat?.name === "Group" && (
            <div className="p-4 flex-1 overflow-y-auto">
              <h4 className="font-bold mb-2">Members</h4>
              {contacts
                .filter(c => c.name !== "Group")
                .map(c => (
                  <div key={c.id} className="flex items-center mb-2 bg-white/60 rounded-lg p-2 shadow-sm">
                    <img src={c.avatar} className="w-8 h-8 rounded-full mr-2" />
                    <p className="font-bold">{c.name}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
