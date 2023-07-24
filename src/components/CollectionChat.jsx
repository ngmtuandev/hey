import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CollectionChat = ({ chat, userCurrent }) => {
  const { token } = useSelector((state) => state.user);
  const [dataUserChat, setDataUserChat] = useState(null);
  const userChat = chat?.members?.find((id) => id !== userCurrent);

  useEffect(() => {
    const getDataUserApi = async (req, res) => {
      const dataApi = await fetch(
        `http://localhost:8080/nguoidung/${userChat}`,
        {
          headers: { authorization: `Bearer ${token}` },
          method: "GET",
        }
      );
      const data = await dataApi.json();
      setDataUserChat(data?.data);
    };
    getDataUserApi();
  }, []);

  return (
    <div className="mb-5 cursor-pointer">
      <div className="flex items-center">
        <img
          className="w-20 h-20 rounded-full mr-3 "
          src={
            dataUserChat?.profileimg
              ? `http://localhost:8080/images/${dataUserChat?.profileimg}`
              : "https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
          }
          alt=""
        ></img>
        <div className="flex flex-col">
          <span className="text-[18px] font-semibold">
            {dataUserChat?.username}
          </span>
          <span className="text-gray-500">Người dùng liên lạc</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionChat;
