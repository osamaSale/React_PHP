import { Container } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet/Sheet";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [authorization, setAuthorization] = useState("");
  const [fileImage, setFileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" style={{ marginTop: 80 }}>
      <Sheet
        variant="outlined"
        sx={{
          minWidth: 600,
          borderRadius: "md",
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography component="h2">Register</Typography>
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
            <option value="user">Open</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <input
            type="file"
            name="fileImage"
            className="form-control"
            onChange={(e) => setFileImage(e.target.files[0])}
          />
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
                    if (res.data.status === 200) {
                      toast(`${res.data.massage}`);
                      navigate("/");
                      setLoading(false);
                    } else if (res.data.status === 201) {
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
          <Stack direction={"row"} spacing={1}>
            <Typography component="h2">
              Already have an account ? Register
            </Typography>
            <Link className="nav-link active text-primary" to={"/"}>
              Here
            </Link>
          </Stack>
        </Stack>
      </Sheet>
    </Container>
  );
}
