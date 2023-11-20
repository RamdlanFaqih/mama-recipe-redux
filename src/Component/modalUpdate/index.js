import React from "react";
import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import iconEdit from "../../assets/icon/edit.svg";

function ModalUpdate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({
    name: "",
  });
  const [isError, setIsError] = useState(false);
  const [saveImage, setSaveImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userID = localStorage.getItem("userID");
  console.log(userID);

  useEffect(() => {
    if (show) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users/${userID}`)
        .then((response) => {
          setUser(response.data);
          console.log(response.data)
        })
        .catch((err) => {
          console.log(err.message);
          setIsError(true);
          setErrorMessage("Failed to fetch user data");
        });
    }
  }, [show]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleUpload = (e) => {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
    console.log(uploader);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userUpdate = new FormData();
    userUpdate.append("name", user.name);
    userUpdate.append("image", saveImage);
    console.log(userUpdate)
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateProfile/${userID}`,
        userUpdate
      );
      console.log(response);
      console.log(response.data);
      window.location.reload();

      handleClose();
    } catch (err) {
      console.log(err.message);
      setIsError(true);
      setErrorMessage("Data Error");
    }
  };
  return (
    <>
      <span variant="primary" onClick={handleShow}>
        <img src={iconEdit} alt="edit" />
      </span>
      <form onSubmit={handleSubmit}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleUpload} />
            </Form.Group>
            <Form.Label>Name</Form.Label>
            <div className="mb-3">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Edit Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                aria-label=".form-control-lg example"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="warning"
              name="sumbit"
              type="submit"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default ModalUpdate;
