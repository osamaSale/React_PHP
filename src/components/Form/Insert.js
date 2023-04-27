import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
export function Insert({ openAdd, setOpenAdd, user, update }) {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [authorization, setAuthorization] = useState(
    user ? user.authorization : ""
  );
  const [fileImage, setFileImage] = useState(user ? user.fileImage : null);
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      open={openAdd}
      onClose={() => setOpenAdd(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: 600,
          borderRadius: "md",
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography component="h2">Add User</Typography>
          <Input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Enter Your Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            name="authorization"
            className="form-control"
            onChange={(e) => setAuthorization(e.target.value)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <input
            type="file"
            name="fileImage"
            className="form-control"
            onChange={(e) => setFileImage(e.target.files[0])}
          />
          <Stack
            direction="row-reverse"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={2}
          >
            <Button
              onClick={() => {
                const fromData = new FormData();
                fromData.append("name", name);
                fromData.append("email", email);
                fromData.append("password", password);
                fromData.append("phone", phone);
                fromData.append("authorization", authorization);
                if (fileImage) {
                  fromData.append("fileImage", fileImage, fileImage.name);
                }
                setLoading(true);
                if (name === "") {
                  toast.error(`${"Enter Your Name"}`);
                  setLoading(false);
                } else if (email === "") {
                  toast.error(`${"Enter Your Email"}`);
                  setLoading(false);
                } else if (password === "") {
                  toast.error(`${"Enter Your Password"}`);
                  setLoading(false);
                } else if (phone === "") {
                  toast.error(`${"Enter Your Phone"}`);
                  setLoading(false);
                } else {
                axios
                  .post("http://localhost:8000/api/users/create.php", fromData)
                  .then((res) => {
                    console.log(res)
                    if (res.data.status === 200) {
                      console.log(res)
                      toast(`${res.data.massage}`);
                      update();
                      setLoading(false);
                      setOpenAdd(false);
                    } else if (res.data.status === 201) {
                      toast.error(`${res.data.massage}`);
                      setLoading(false);
                    } else if (res.data.status === 205) {
                      toast.error(`${res.data.massage}`);
                      setLoading(false);
                    } else {
                      toast.error(`${res.data.massage}`);
                      setLoading(false);
                    }
                  });
                }
              }}
            >
              {loading ? <CircularProgress /> : "Save"}
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setOpenAdd(false);
              }}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
}
