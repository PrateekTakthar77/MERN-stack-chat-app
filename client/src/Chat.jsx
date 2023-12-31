import React, { useEffect, useState } from "react";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3030");
    setWs(ws);
    ws.addEventListener("message", handleMesage);
  }, []);
  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
    console.log(people);
  }
  function handleMesage(ev) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  }
  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3">
        {Object.keys(onlinePeople).map((userId) => (
          <div>{onlinePeople[userId]}</div>
        ))}
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className="flex-grow">message with selected person</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="type your message here"
            className="bg-white flex-grow border rounded-sm p-2"
          />
          <button className="bg-blue-500 p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
