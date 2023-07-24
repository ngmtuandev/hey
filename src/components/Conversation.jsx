import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CollectionChat from "./CollectionChat";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";

const Conversation = () => {
  const { newUser } = useSelector((state) => state.user);
  const [chatBox, setChatBox] = useState(null);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const socket = useRef();

  useEffect(() => {
    const getChatApi = async () => {
      const dataChat = await fetch(
        `http://localhost:8080/tro-chuyen/${newUser?._id}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        }
      );
      const data = await dataChat.json();
      setChats(data);
    };
    getChatApi();
  }, [newUser?._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("add-user-new", newUser._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log("onlineUsers", onlineUsers);
    });
  }, [newUser]);

  // send message
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message
  useEffect(() => {
    socket.current.on("recevied-message", (data) => {
      setReceivedMessage(data);
    });
  }, [receivedMessage]);

  return (
    <div className="flex p-5 bg-gradient-to-b py-4 from-[#d1a6d1] to-[#f7e7f7] h-screen">
      <div className="w-[30%]">
        <div>
          <h3 className="my-6 font-bold text-[23px] text-[#2d232d]">
            Cuộc trò chuyện
          </h3>
          {chats?.userChat?.length > 0 &&
            chats?.userChat?.map((chat, index) => (
              <div key={index} onClick={() => setChatBox(chat)}>
                <CollectionChat
                  chat={chat}
                  userCurrent={newUser?._id}
                ></CollectionChat>
              </div>
            ))}
        </div>
      </div>
      <div className="w-[40%]">
        <ChatBox
          chat={chatBox}
          userCurrent={newUser?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        ></ChatBox>
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
};

export default Conversation;
