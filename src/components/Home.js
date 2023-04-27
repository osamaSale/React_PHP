import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    update();
  }, []);
  const update = async () => {
    await axios.get("http://localhost:8000/api/users/read.php").then((res) => {
      if (res.data.status === 200) {
        setUsers(res.data.data);
      } else if (res.data.status === 202) {
        setUsers(res.data.massage);
      } else {
        toast.error(`${res.data.massage}`);
      }
    });
  };
  return (
    <Container maxWidth="xl" style={{ marginTop: 50 }}>
      <div className="row">
        {users && users.map((e) => {
          return <div className="col pt-3 pb-3" key={e.id}>
            <Card variant="outlined" sx={{ width: 320 }}>
              <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {e.name}
              </Typography>
              <Typography level="body2">{e.email}</Typography>
              <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                <img
                  src={e.image}
                  srcSet={e.image}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Box sx={{ display: "flex" }}>
                <div>
                  <Typography level="body3">{e.phone}</Typography>
                </div>
                <Button
                  variant="solid"
                  size="sm"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", fontWeight: 600 }}
                >
                  {e.authorization}
                </Button>
              </Box>
            </Card>
          </div>
        })}
      </div>

    </Container>
  );
}
