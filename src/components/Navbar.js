import Button from "@mui/joy/Button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/joy/Avatar';
import { Stack } from "@mui/material";

export function Navbar() {
  const navigate = useNavigate();
  let image = localStorage.getItem('image')
  const authorization = localStorage.getItem('authorization')
  const logout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('image')
    localStorage.removeItem('authorization')
    navigate('/')
  }
  return (
    <div>
      {authorization === 'user' &&
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand text-warning">Home</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active">About</Link>
                <Link className="nav-link active">Contact</Link>
              </div>
            </div>
            <div className="d-flex">
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={image} size="sm" />
                <Button color="success" onClick={logout} size="sm">Logout</Button>
              </Stack>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      }
      {authorization === 'admin' &&
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand text-warning">Dashboard</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active">About</Link>
                <Link className="nav-link active">Contact</Link>
              </div>
            </div>
            <div className="d-flex">
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={image} size="sm" />
                <Button color="success" onClick={logout} size="sm">Logout</Button>
              </Stack>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      }
      {authorization === null &&
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            </div>
            <div className="d-flex">
              <Stack direction="row" spacing={2}>
                <Button color="primary" onClick={() => navigate('/')} size="sm">login</Button>
                <Button color="success" onClick={() => navigate('/register')} size="sm">Register</Button>
              </Stack>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      }
    </div>
  );
}

export default Navbar;
