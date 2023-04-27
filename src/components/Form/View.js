import React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
export function ViewUser({
  openView,
  setOpenView,
  selectedView,
  setSelectedView,
}) {
  return (
    <Modal
      open={openView}
      onClose={() => setOpenView(false)}
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
          <Typography component="h2">View User</Typography>
          <Input value={selectedView.name} disabled />
          <Input value={selectedView.email} disabled />
          <Input value={selectedView.phone} disabled />
          <Input type="password" value={selectedView.password} disabled />
          <Input value={selectedView.authorization} disabled />
          <img
            src={selectedView.image}
            alt={selectedView.image}
            height={90}
            width={100}
          />
          <Button
            color="danger"
            onClick={() => {
              setOpenView(false);
            }}
          >
            Close
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
}
