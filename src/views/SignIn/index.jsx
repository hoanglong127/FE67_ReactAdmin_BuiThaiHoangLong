import { Button, Container, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { signIn } from "../../store/actions/user";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("This is field is required"),
  matKhau: yup.string().required("This is field is required"),
});

const Signin = (props) => {
  const {
    values,
    errors,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      taiKhoan: true,
      matKhau: true,
    });

    if (!isValid) return;

    dispatch(
      signIn(values, () => {
        history.push("/dashboard");
      })
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>Sign In Admin</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 30 }}>
            <TextField
              value={values.taiKhoan}
              onChange={handleChange}
              onBlur={handleBlur}
              name="taiKhoan"
              fullWidth
              label="Username"
              variant="outlined"
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
              variant="outlined"
            />
            {touched.matKhau && (
              <span style={{ color: "red" }}>{errors.matKhau}</span>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
