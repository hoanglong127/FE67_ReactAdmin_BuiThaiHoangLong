import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { fetchUsers, fetchUsersByPage } from "../../store/actions/user";
import { useSelector } from "react-redux";
import Pagination from "material-ui-flat-pagination";
import { Link } from "react-router-dom";
import axios from "axios";

const limit = 10;

const Dashboard = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const usersByPage = useSelector((state) => state.user.usersByPage);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers);
    dispatch(fetchUsersByPage(1, limit));
  }, []);

  const handleClick = (offset) => {
    setOffset(offset);
    const page = offset / 10 + 1;
    dispatch(fetchUsersByPage(page, limit));
  };

  const handleDeleteUser = (username) => {
    axios({
      method: "DELETE",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/XoaNguoiDung`,
      params: { TaiKhoan: username },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        alert("Delete user successfully!");
        dispatch(fetchUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box pt={5} pb={2}>
        <Typography variant="h4" style={{ textAlign: "center" }} gutterBottom>
          User List
        </Typography>
        <Button variant="contained" color="primary">
          <Link to="/addUser" style={{ color: "#fff", textDecoration: "none" }}>
            Add User
          </Link>
        </Button>
      </Box>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersByPage.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.hoTen}</TableCell>
                <TableCell>{user.taiKhoan}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.soDt}</TableCell>
                <TableCell>{user.maLoaiNguoiDung}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 5 }}
                  >
                    <Link
                      to={`/editUser/${user.taiKhoan}`}
                      style={{ display: "inherit", color: "#fff" }}
                    >
                      <EditIcon />
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.taiKhoan)}
                    variant="contained"
                    color="secondary"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box my={5} style={{ textAlign: "center" }}>
        <Pagination
          limit={limit}
          offset={offset}
          total={userList.length}
          onClick={(e, offset) => handleClick(offset)}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
