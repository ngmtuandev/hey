import React from "react";
import { Link } from "react-router-dom";
import path from "../util/path";
import { useSelector } from "react-redux";
import moment from "moment";
import logo from "../assets/logov1.png";

const ProfileCards = () => {
  const { newUser } = useSelector((state) => state.user);
  console.log("new user profile card", newUser);
  // console.log('new user in profilecarf' , newUser)

  return (
    <div>
      <div
        className=" bg-[#b684b6] shadow-inner w-[300px] h-[400px] 
      flex flex-col justify-center items-center rounded-md hover:bg-[#c99cc9]"
      >
        <div>
          <img
            className="w-28 h-28 rounded-full"
            src={
              newUser?.profileimg
                ? `http://localhost:8080/images/${newUser?.profileimg}`
                : "https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
            }
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="my-3">
            <span className="font-medium text-gray-800">Tên người dùng: </span>
            {newUser?.username}
          </p>
          <p className="my-3">
            <span className="font-medium text-gray-800 flex items-center justify-center">
              Ngày tạo:{" "}
            </span>
            {moment(`${newUser?.updatedAt}`).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="my-3">
            {newUser?.follower?.length} <span>Người theo dõi</span>
          </p>
          <p className="my-3">
            {newUser?.following?.length} <span>Người đang theo dõi</span>
          </p>
        </div>
        <div>
          <Link to={`/profile-detail/${newUser?._id}`}>
            <p
              className="rounded-3xl w-[130px] text-gray-100 text-[14px] 
            shadow-inner py-1 hover:bg-[#6b246d] bg-[#973C9A] flex items-center justify-center"
            >
              Trang cá nhân
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
