import axios from "axios";
import createAction from ".";
import actionType from "./type";

export const signIn = (userLogin, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
        data: userLogin,
      });

      if (res.data.content.maLoaiNguoiDung === "QuanTri") {
        callback();
        localStorage.setItem("tokenAdmin", res.data.content.accessToken);
      } else {
        alert("Bạn không phải là admin");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUsers = async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
    });
    dispatch(createAction(actionType.SET_USERS, res.data.content));
  } catch (err) {
    console.log(err);
  }
};

export const fetchUsersByPage = (page, limit) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${limit}`,
      });
      dispatch(
        createAction(actionType.SET_USERS_BY_PAGE, res.data.content.items)
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserType = async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
    });
    dispatch(createAction(actionType.SET_TYPE_USER_LIST, res.data.content));
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserEdit = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/TimKiemNguoiDung",
        params: {
          MaNhom: "GP01",
          tuKhoa: username,
        },
      });
      dispatch(createAction(actionType.SET_USER_EDIT, res.data.content[0]));
    } catch (err) {
      console.log(err);
    }
  };
};
