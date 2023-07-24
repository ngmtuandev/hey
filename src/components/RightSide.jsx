import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dataSponsor from "../assets/dataSponsor";
import { Link } from "react-router-dom";
const RightSide = () => {
  const { token } = useSelector((state) => state.user);

  const [userFollowing, setUserFollowing] = useState([]);

  useEffect(() => {
    (async () => {
      const getApiUserFollowing = await fetch(
        `http://localhost:8080/nguoidung/danh-sach-ban-be`,
        {
          headers: { authorization: `Bearer ${token}` },
          method: "GET",
        }
      );

      const dataApi = await getApiUserFollowing.json();
      // console.log("data Api User Following", dataApi);
      setUserFollowing(dataApi?.data);
    })();
  }, []);

  console.log(userFollowing);

  return (
    <div className="pl-10">
      <div>
        <h3 className="font-semibold text-[18px] flex items-center justify-center mb-3">
          Được tài trợ
        </h3>
        <div>
          {dataSponsor.length > 0 &&
            dataSponsor?.map((sponser) => (
              <div key={sponser?.id} className="flex items-center my-4">
                <img
                  src={sponser?.img}
                  className="w-16 mr-4 rounded-md"
                  alt=""
                ></img>
                <span className="font-medium">{sponser?.title}</span>
              </div>
            ))}
        </div>
      </div>
      <h3 className="font-semibold mt-5 text-[18px] flex items-center justify-center mb-3">
        Những người bạn theo dõi
      </h3>
      <div>
        {userFollowing?.length > 0 && (
          <div>
            {userFollowing?.map((user) => (
              <div
                key={user?._id}
                className="bg-[#b684b6] p-3 cursor-pointer rounded-md mb-5 flex items-center shadow-inner"
              >
                <Link
                  className="flex items-center cursor-pointer"
                  to={`/profile-detail/${user?._id}`}
                >
                  <div className="flex items-center">
                    <img
                      className="rounded-full h-14 w-14 mr-3"
                      src={
                        user?.profileimg
                          ? `http://localhost:8080/images/${user?.profileimg}`
                          : "https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
                      }
                      alt=""
                    ></img>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user?.username}</span>
                      <span className="text-gray-800 text-[14px]">
                        {user?.follower.length} người theo dõi
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSide;
