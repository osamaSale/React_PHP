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
export function EditUser({ openEdit, setOpenEdit, selectedEdit, update, image }) {
  const [name, setName] = useState(selectedEdit ? selectedEdit.name : "");
  const [email, setEmail] = useState(selectedEdit ? selectedEdit.email : "");
  const [password, setPassword] = useState(
    selectedEdit ? selectedEdit.password : ""
  );
  const [phone, setPhone] = useState(selectedEdit ? selectedEdit.phone : "");
  const [authorization, setAuthorization] = useState(
    selectedEdit ? selectedEdit.authorization : ""
  );
  const [fileImage, setFileImage] = useState(
    selectedEdit ? selectedEdit.fileImage : null
  );
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      open={openEdit}
      onClose={() => setOpenEdit(false)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Enter Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            name="authorization"
            className="form-control"
            value={authorization}
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
          <img
            src={selectedEdit.image}
            alt={selectedEdit.image}
            height={90}
            width={100}
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
                fromData.append("id", selectedEdit.id);
                fromData.append("name", name);
                fromData.append("email", email);
                fromData.append("phone", phone);
                fromData.append("authorization", authorization);
                if (fileImage !== "") {
                  selectedEdit.fileImage = fileImage;
                  fromData.append("fileImage", selectedEdit.fileImage);
                } else {
                  fromData.append("fileImage", fileImage, fileImage.name);
                }
                setLoading(true);
                axios
                  .post(
                    `http://localhost:8000/api/users/edit.php?id=${selectedEdit.id}`,
                    fromData
                  )
                  .then((res) => {
                    if (res.data.status === 200) {
                      toast(`${res.data.massage}`);
                      update();
                      setLoading(false);
                      setOpenEdit(false);
                    } else {
                      toast.error(`${res.data.massage}`);
                    }
                  });
              }}
            >
              {loading ? <CircularProgress /> : "Save"}
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setOpenEdit(false);
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
