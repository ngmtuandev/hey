import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icons from "../util/icon";
import logo from "../assets/logov1.png";
const Upload = () => {
  const { FcAddImage } = icons;

  const { token, newUser } = useSelector((state) => state.user);
  const [photoPost, setPhotoPost] = useState([]);
  const [stateUpload, setStateUpload] = useState({});

  const navigate = useNavigate();

  const handleSetState = (e) => {
    setStateUpload((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();

    if (photoPost && photoPost.name) {
      const formData = new FormData();
      // console.log('photoPost.name: ',photoPost)
      const filename = Date.now() + photoPost.name;
      formData.append("filename", filename);
      formData.append("file", photoPost);

      await fetch("http://localhost:8080/dang-tai-anh/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      const resDataApi = await fetch(
        "http://localhost:8080/bai-dang/tao-bai-dang",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify({ ...stateUpload, photo: filename }),
        }
      );

      const dataApi = await resDataApi.json();
      console.log("upload", dataApi);
      navigate("/");
    }
  };

  return (
    <div className=" flex items-center justify-center mt-[50px] mb-[30px] ">
      <div
        className="flex flex-col items-center bg-gradient-to-b py-4 rounded-md shadow-inner
       from-[#c177c1] to-[#d1a4d1] w-[600px] bg-opacity-10"
      >
        <h3 className="flex justify-center font-semibold text-[25px] text-gray-700">
          Cập Nhập Trạng Thái
        </h3>
        <img className="w-[70px] mb-2" src={logo} alt="" />
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmitUpload}
        >
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-2">Tiêu đề</p>
            <input
              className="w-[400px] outline-none px-3 rounded-md"
              type="text"
              name="title"
              onChange={handleSetState}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-2">Nội dung</p>
            <input
              className="w-[400px] outline-none px-3 rounded-md h-[40px]"
              type="text"
              name="content"
              onChange={handleSetState}
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-2">Vị trí</p>
            <input
              className="w-[400px] outline-none px-3 rounded-md"
              type="text"
              name="location"
              onChange={handleSetState}
            />
          </div>
          <label htmlFor="up-img" className="cursor-pointer">
            <FcAddImage size={55}></FcAddImage>
          </label>
          <input
            className="hidden"
            id="up-img"
            type="file"
            name="photo"
            onChange={(e) => setPhotoPost(e.target.files[0])}
          />
          <button
            className="mt-5 rounded-3xl w-[130px] text-gray-100 text-[14px] shadow-inner py-1 font-semibold
           hover:bg-[#6b246d] bg-[#973C9A]"
          >
            Đăng Bài
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
