import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useRef } from "react";
import icons from "../util/icon";
import EmotionInput, { async } from "react-input-emoji";
import { Link } from "react-router-dom";
const ChatBox = ({ chat, userCurrent, setSendMessage, receivedMessage }) => {
  const scroll = useRef();

  const { token, newUser } = useSelector((state) => state.user);
  const [dataUserChat, setDataUserChat] = useState(null);
  const [friendUserChat, setFriendUserChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { BiSolidPhoneCall, BsFillCameraVideoFill, BsFillSendFill } = icons;

  const dataSendMessage = (newMessage) => {
    setNewMessage(newMessage);
  };

  let friendUser = chat?.members?.find((id) => id !== userCurrent);
  console.log("aaaaaaaaaa", friendUser);
  useEffect(() => {
    const getDataUserApi = async (req, res) => {
      const dataApi = await fetch(
        `http://localhost:8080/nguoidung/${friendUser}`,
        {
          headers: { authorization: `Bearer ${token}` },
          method: "GET",
        }
      );
      const data = await dataApi.json();
      setFriendUserChat(data?.data);
    };
    getDataUserApi();
  }, [friendUser]);

  useEffect(() => {
    const getDataUserApi = async (req, res) => {
      const dataApi = await fetch(
        `http://localhost:8080/nguoidung/${newUser?._id}`,
        {
          headers: { authorization: `Bearer ${token}` },
          method: "GET",
        }
      );
      const data = await dataApi.json();
      setDataUserChat(data?.data);
    };
    getDataUserApi();
  }, [newUser]);

  useEffect(() => {
    const getMessageApi = async (req, res) => {
      const dataMessage = await fetch(
        `http://localhost:8080/tin-nhan/${chat?._id}`,
        {
          method: "GET",
        }
      );
      const message = await dataMessage.json();
      setMessage(message);
    };
    getMessageApi();
  }, [chat, setSendMessage, receivedMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newSendMessage = {
      sendMessageId: userCurrent,
      message: newMessage,
      chatId: chat?._id,
    };

    const idUserReceive = chat?.members.find((id) => id !== userCurrent); // idUserReceive will get in socket
    setSendMessage({ ...message, idUserReceive });
    try {
      const addMessageApi = await fetch("http://localhost:8080/tin-nhan/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(newSendMessage),
      });
      const data = await addMessageApi.json();
      setMessage([...message, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    // console.log("receivedMessage   => ", receivedMessage)
    if (receivedMessage !== null || receivedMessage?.chatId === chat?._id) {
      setMessage([...message, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <div className="relative">
      <div className="">
        {chat ? (
          <div className="flex items-center border justify-between shadow p-4 rounded-md">
            <div className="flex">
              <Link
                to={`http://localhost:3000/profile-detail/${friendUserChat?._id}`}
              >
                <img
                  className="mr-3 w-12 h-12 rounded-full"
                  src={
                    friendUserChat?.profileimg
                      ? `http://localhost:8080/images/${friendUserChat?.profileimg}`
                      : "https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
                  }
                  alt=""
                ></img>
              </Link>
              <div className="flex flex-col">
                <span className="text-[18px]">{friendUserChat?.username}</span>
                <span className="text-gray-600 text-[13px]">Người nhận</span>
              </div>
            </div>
            <div className="flex">
              <div className="text-[#8a5f8a]">
                <BsFillCameraVideoFill size={33}></BsFillCameraVideoFill>
              </div>
              <div className="text-[#8a5f8a] ml-4">
                <BiSolidPhoneCall size={33}></BiSolidPhoneCall>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-6 font-bold text-[23px] text-[#2d232d]">
            <span>Chưa có cuộc trò chuyện nào 🧐</span>
          </div>
        )}
      </div>
      {chat && (
        <div className="mt-5">
          <div className=" flex flex-col overflow-y-auto h-[400px] overflow-x-hidden">
            {message?.map((mess, index) => (
              <div key={index} className="flex flex-col mt-4" ref={scroll}>
                <div
                  className={
                    mess?.sendMessageId !== userCurrent
                      ? "bg-gradient-to-r from-[#f05a6c] to-[#a77aa8] w-[300px] rounded-md px-4 py-3 rounded-bl-lg text-white "
                      : "bg-gradient-to-r from-[#5bb3d2] to-[#128f9d] w-[300px] rounded-md ml-[140px]  px-4 py-3 text-white"
                  }
                >
                  <div className="flex flex-col">
                    <span>{mess?.message}</span>
                    <span className="text-gray-100 mt-2  text-[12px]">
                      {format(mess?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[30px] flex items-center">
            <EmotionInput
              value={newMessage}
              onChange={dataSendMessage}
            ></EmotionInput>
            <div
              className="rounded-3xl w-[50px] text-gray-100 text-[14px] shadow-inner py-1 
              flex justify-center font-semibold cursor-pointer hover:bg-[#6b246d] bg-[#973C9A]"
              onClick={handleSendMessage}
            >
              <BsFillSendFill size={19}></BsFillSendFill>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
