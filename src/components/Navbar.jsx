import React, { useState } from "react";
import icons from "../util/icon";
import { Link, useNavigate } from "react-router-dom";
import path from "../util/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import logo from "../assets/logov1.png";
import { BiLogOutCircle } from "react-icons/bi";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    HiSearch,
    AiOutlineLogout,
    AiOutlineUser,
    MdLocationPin,
    AiFillHome,
    AiFillMessage,
    BiSolidUser,
    RiUploadCloud2Fill,
    RiLogoutBoxRFill,
    BsFillBellFill,
  } = icons;
  const [showModelProfile, setShowModelProfile] = useState(false);

  const { newUser } = useSelector((state) => state?.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleMess = () => {
    window.location.reload();
  };

  return (
    <div className="flex shadow-2xl justify-center items-center h-[70px] bg-gradient-to-b from-[#895a89] to-[#4b2e4b] w-full px-5">
      <div className="w-[100%] flex items-center justify-center">
        <div className="mx-5">
          <Link
            to={path.HOME}
            className="flex flex-col items-center text-gray-100 hover:text-white"
          >
            <AiFillHome
              size={25}
              className="text-gray-300 hover:text-gray-100"
            ></AiFillHome>
            Trang chủ
          </Link>
        </div>
        <div className="mx-5">
          <Link
            to={path.UPLOAD}
            className="flex flex-col items-center text-gray-100 hover:text-white"
          >
            <RiUploadCloud2Fill
              size={25}
              className="text-gray-300 hover:text-gray-100"
            ></RiUploadCloud2Fill>
            Đăng bài
          </Link>
        </div>
        <div className="mx-5 flex flex-col items-center text-gray-100 hover:text-white">
          <BsFillBellFill
            size={25}
            className="text-gray-300 hover:text-gray-100"
          ></BsFillBellFill>
          Thông báo
        </div>
        <div className="mx-5" onClick={handleMess}>
          <Link
            to={path.CHAT}
            className="flex relative flex-col items-center text-gray-100 hover:text-white"
          >
            <AiFillMessage
              size={25}
              className="text-gray-300 hover:text-gray-100"
            ></AiFillMessage>
            Tin nhắn
            <div className="w-[10px] animate-ping h-[10px] bg-red-600 border rounded-full absolute ml-4"></div>
          </Link>
        </div>
        <div className="flex mx-5">
          <Link
            to={`/profile-detail/${newUser?._id}`}
            className=" cursor-pointer flex flex-col items-center text-gray-100 hover:text-white"
          >
            <BiSolidUser
              size={25}
              className="text-gray-300 hover:text-gray-100"
            ></BiSolidUser>
            Người dùng
          </Link>
        </div>
        <div
          onClick={handleLogout}
          className="mx-5 cursor-pointer flex flex-col items-center text-gray-100 hover:text-white"
        >
          <AiOutlineLogout
            size={25}
            className="text-gray-300 hover:text-gray-100"
          ></AiOutlineLogout>
          Đăng xuất
        </div>
        <div onClick={() => setShowModelProfile((state) => !state)}>
          <img
            className="rounded-full h-10 w-10 mx-5 cursor-pointer border border-solid"
            src={
              newUser?.profileimg
                ? `http://localhost:8080/images/${newUser?.profileimg}`
                : "https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
            }
            alt="avatar"
          ></img>
        </div>
        {showModelProfile && (
          <div
            className="absolute mt-[280px] rounded-md transition-shadow z-10
          right-[250px] bg-gradient-to-b from-[#9c0315] to-[#69166b] text-gray-50 px-5 py-7"
          >
            <span>Xin chào, {newUser?.username}</span>
            <ul>
              <li>
                <Link
                  className="hover:border-b-2 transition-all"
                  to={`/profile-detail/${newUser?._id}`}
                >
                  Trang cá nhân
                </Link>
              </li>
              <li>
                <Link
                  className="hover:border-b-2 transition-all"
                  to={`/upload-user/${newUser?._id}`}
                >
                  Chỉnh sửa thông tin
                </Link>
              </li>
              <li className="hover:border-b-2 transition-all cursor-pointer">
                Phản hồi ý kiến
              </li>
              <li className="hover:border-b-2 cursor-pointer transition-all">
                Cài đặt & Quyền riêng tư
              </li>
              <li onClick={handleLogout}>
                <Link className="hover:border-b-2 transition-all">
                  Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
