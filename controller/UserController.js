import UserModel from "../model/User.js";
import bcrypt from "bcrypt";
// import verifyToken from "../middleware/verifyToken";

const UserController = {
  getUserPropose: async (req, res) => {
    console.log("testr", req.datatoken.id);
    try {
      const userCurrent = await UserModel.findById(req.datatoken.id);
      const getAllUser = await UserModel.find({}).select("-password");
      const userFilter = getAllUser.filter((user) => {
        return (
          !userCurrent.following.includes(user._id) &&
          String(userCurrent._id) !== String(user._id)
        );
      });
      res.status(200).json({
        status: "success",
        data: userFilter,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getUserFollowing: async (req, res) => {
    try {
      const userCurr = await UserModel.findById(req.datatoken.id);
      const getFriendUserFollowing = await Promise.all(
        userCurr.following.map((user) => {
          return UserModel.findById(user).select("-password");
        })
      );
      console.log(getFriendUserFollowing);
      res.status(200).json({
        status: "success",
        data: getFriendUserFollowing,
      });
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const userGet = await UserModel.findById(req.params.id);
      console.log(userGet);
      if (!userGet) {
        res.status(500).json({ status: "Lấy người dùng thất bại" });
      } else {
        const { password, ...user } = userGet._doc;
        res.status(200).json({
          status: "Lấy người dùng thành công",
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await UserModel.find({}).select("-password");
      console.log(allUsers);
      if (!allUsers) {
        res.status(404).json({ status: "Lấy tất cả người dùng lỗi" });
      } else {
        res.status(200).json({
          status: "lấy tất cả người dùng thành công",
          data: allUsers,
        });
      }
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      if (!(String(req.params.id) === String(req.datatoken.id))) {
        res
          .status(500)
          .json({ status: "Bạn không thể chỉnh sửa người dùng này" });
      } else {
        if (req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const userUpdated = await UserModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json({
          status: "Cập nhập người dùng thành công",
          data: userUpdated,
        });
      }
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      if (req.params.id == req.datatoken.id) {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
          status: "Xóa người dùng thành công",
        });
      } else {
        res.status(500).json({
          status: "Bạn không thể xóa người dùng này",
        });
      }
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  },
  followUser: async (req, res) => {
    try {
      const userCurrent = await UserModel.findById(req.datatoken.id);
      const userNotCurrent = await UserModel.findById(req.params.id);

      if (String(req.datatoken.id) === String(req.params.id)) {
        res
          .status(400)
          .json({ status: "Bạn không thể theo dõi người dùng này" });
      } else {
        if (userCurrent.following.includes(req.params.id)) {
          userCurrent.following = userCurrent.following.filter(
            (idUser) => idUser != req.params.id
          );
          userNotCurrent.follower = userNotCurrent.follower.filter(
            (idUser) => idUser != req.datatoken.id
          );

          await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: userNotCurrent },
            { new: true }
          );
          await UserModel.findByIdAndUpdate(
            req.datatoken.id,
            { $set: userCurrent },
            { new: true }
          );

          res.status(200).json({
            status: "Bỏ theo dõi người dùng thành công",
          });
        } else {
          userCurrent.following.push(req.params.id);
          userNotCurrent.follower.push(req.datatoken.id);

          await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: userNotCurrent },
            { new: true }
          );
          await UserModel.findByIdAndUpdate(
            req.datatoken.id,
            { $set: userCurrent },
            { new: true }
          );

          res.status(200).json({
            status: "Theo dõi người dùng thành công",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  },
};

export default UserController;
