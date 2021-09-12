import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEdit, fetchUserType } from "../../store/actions/user";
import * as yup from "yup";
import axios from "axios";
import { useHistory, useParams } from "react-router";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("This field is required"),
  matKhau: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
  soDt: yup
    .string()
    .required("This field is required")
    .matches(/^[0-9]+$/g, { message: "Phone must be number" }),
  maLoaiNguoiDung: yup.string().required("This field is required"),
  hoTen: yup.string().required("This field is required"),
});

const EditUser = () => {
  const dispatch = useDispatch();
  const typeUserList = useSelector((state) => state.user.typeUserList);
  const userEdit = useSelector((state) => state.user.userEdit);
  const {
    values,
    errors,
    touched,
    setTouched,
    isValid,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: { ...userEdit, maNhom: "GP01" },
    enableReinitialize: true,
    validationSchema: schema,
    validateOnMount: true,
  });
  const { username } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserType);
    dispatch(fetchUserEdit(username));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      taiKhoan: true,
      matKhau: true,
      email: true,
      soDt: true,
      maLoaiNguoiDung: true,
      hoTen: true,
    });

    if (!isValid) return;

    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: values,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        alert("User update successful");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" style={{ margin: "0 50px" }}>
        <h1 style={{ textAlign: "center" }}>Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 30 }}>
            <TextField
              value={values.taiKhoan}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="taiKhoan"
              fullWidth
              label="Username"
              defaultValue="Username"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            {touched.taiKhoan && (
              <span style={{ color: "red" }}>{errors.taiKhoan}</span>
            )}
          </div>
          <div style={{ marginBottom: 30 }}>
            <TextField
              value={values.matKhau}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="matKhau"
              fullWidth
              label="Password"
              defaultValue="Password"
              variant="outlined"
            />
            {touched.taiKhoan && (
              <span style={{ color: "red" }}>{errors.taiKhoan}</span>
            )}
          </div>
          <div style={{ marginBottom: 30 }}>
            <TextField
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="email"
              fullWidth
              label="Email"
              defaultValue="Email"
              variant="outlined"
            />
            {touched.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div style={{ marginBottom: 30 }}>
            <TextField
              value={values.soDt}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="soDt"
              fullWidth
              label="Phone Number"
              defaultValue="Phone Number"
              variant="outlined"
            />
            {touched.soDt && (
              <span style={{ color: "red" }}>{errors.soDt}</span>
            )}
          </div>
          <div style={{ marginBottom: 30 }}>
            <TextField
              value={values.hoTen}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="hoTen"
              fullWidth
              label="Full Name"
              defaultValue="Full Name"
              variant="outlined"
            />
            {touched.hoTen && (
              <span style={{ color: "red" }}>{errors.hoTen}</span>
            )}
          </div>
          <div style={{ marginBottom: 30 }}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Type
              </InputLabel>
              <Select
                name="maLoaiNguoiDung"
                onChange={handleChange}
                onBlur={handleBlur}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Type"
                defaultValue="Type"
                renderValue={() => values.maLoaiNguoiDung}
              >
                {typeUserList.map((item) => (
                  <MenuItem value={item.maLoaiNguoiDung}>
                    {item.tenLoai}
                  </MenuItem>
                ))}
              </Select>
              {touched.maLoaiNguoiDung && (
                <span style={{ color: "red" }}>{errors.maLoaiNguoiDung}</span>
              )}
            </FormControl>
          </div>

          <div style={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditUser;
