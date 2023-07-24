import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import logo from "../assets/logov1.png";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === "" || userEmail === "" || password === "") {
      alert("Bạn không được bỏ trống thông tin");
    } else {
      const responseApi = await fetch("http://localhost:8080/dangnhap", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          username: userName,
          password: password,
        }),
      });
      const data = await responseApi.json();
      console.log("data login", data);
      dispatch(login(data));
      if (data.token !== undefined) {
        navigate("/");
      }
    }
  };
  return (
    <div className="bg-gradient-to-b from-[#790c19] to-[#6f3871] w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <img className="w-[130px] mb-5" src={logo} alt="logo"></img>
        <div className="flex flex-col items-center mb-7 text-[#AED8CC]">
          <span className="text-[28px]">Hey, chào mừng bạn...</span>
          <div>Đăng nhập với để trò chuyện nhé 🥰</div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-[300px] w-[390px] bg-gray-300 rounded-2xl justify-center items-center 
          bg-opacity-50 shadow-lg shadow-gray-500 pb-5 pt-4"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-50 mb-1">Tên của bạn</span>
            <input
              className="mb-3 w-[300px] px-2 rounded-lg bg-[#7D6C6C] text-gray-100 shadow-inner text-[19px] outline-none"
              type="text"
              placeholder="Tên"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-50 mb-1">Tài khoản email</span>
            <input
              className="mb-3 w-[300px] px-2 rounded-lg bg-[#7D6C6C] text-gray-100 shadow-inner text-[19px] outline-none"
              type="email"
              placeholder="Email"
              onChange={(e) => setUserEmail(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-50 mb-1">Mật khẩu</span>
            <input
              className="mb-3 w-[300px] px-2 rounded-lg bg-[#7D6C6C] text-gray-100 shadow-inner text-[19px] outline-none"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button
            className="rounded-3xl w-[130px] text-gray-100 text-[14px] shadow-inner py-1 hover:bg-[#6b246d] bg-[#973C9A]"
            type="submit"
          >
            Đăng Nhập
          </button>
          <p className="mt-4 text-gray-100">
            Bạn chưa có tài khoản{" "}
            <Link
              to="/signup"
              className="text-[#973C9A] hover:text-[#6e2d70] font-bold"
            >
              Đăng kí
            </Link>{" "}
            ngay 😍{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
