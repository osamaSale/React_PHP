import { useState, useEffect } from "react";
import Table from "@mui/joy/Table";
import Avatar from "@mui/joy/Avatar";
import Container from "@mui/material/Container";
import Button from "@mui/joy/Button";
import axios from "axios";
import { ViewUser } from "./Form/View";
import { Insert } from "./Form/Insert";
import { EditUser } from "./Form/Edit";
import { toast } from "react-toastify";
export function Users(image) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    update();
  }, []);
  const update = async () => {
    await axios.get("http://localhost:8000/api/users/read.php").then((res) => {
      console.log(res.statusText)
      if (res.data.status === 200) {
        setUsers(res.data.data);
      } else {
        toast.error(`${res.statusText}`);
      }
    });
  };
  const deleteUser = async (e) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`http://localhost:8000/api/users/delete.php?id=${e.id}`).then((res) => {
        if (res.data.status === 200) {
          toast(`${res.data.massage}`);
          update();
        } else {
          toast.error(`${res.data.massage}`);
        }
      });
    }
  };
  const searchName = () => {
    if (search === "") {
      update();
    } else {
      axios.get(`http://localhost:8000/api/users/search.php?name=${search}`).then((res) => {
        if (res.data.status === 200) {
          setUsers(res.data.data);
        } else if (res.data.status === 202) {
          toast.error(`${res.data.massage}`);
        } else {
          update();
        }
      });
    }
  };
  return (
    <Container maxWidth="xl" className="pt-3 pb-3">
      <div className="row">
        <div className="col-10 pt-3 pb-3">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="form-control"
            width={"160%"}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={() => {
              searchName();
            }}
          />
        </div>
        <div align="right" className="col pt-3 pb-3">
          <button
            className="btn btn-success"
            onClick={() => {
              setselectedUser({
                id: 0,
                name: "",
                email: "",
                password: "",
                fileImage: "",
                phone: "",
                authorization: "",
              });
              setOpenAdd(true);
            }}
          >
            <i className="material-icons">&#xE147;</i>
            <span>Add New User</span>
          </button>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Phone</th>
            <th>authorization</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    <Avatar alt="Remy Sharp" src={e.image} />
                  </td>
                  <td>{e.phone}</td>
                  <td>{e.authorization}</td>
                  <td>
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => {
                        setSelectedView(e);
                        setOpenView(true);
                      }}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedEdit(e);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deleteUser(e)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {openAdd && (
        <Insert
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          user={selectedUser}
          update={update}
        />
      )}
      {openEdit && (
        <EditUser
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          selectedEdit={selectedEdit}
          update={update}
          image={image}
        />
      )}
      {openView && (
        <ViewUser
          openView={openView}
          setOpenView={setOpenView}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
      )}
    </Container>
  );
};
