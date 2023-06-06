import React, { useState } from "react";
import { updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Todo({
  todo,
  toggleComplete,
  handleEdit,
  handleDelete,
}) {
  const [newTitle, setNewTitle] = useState(todo.subject);
  const [newTitle1, setNewTitle1] = useState(todo.subject1);
  const [newTitle2, setNewTitle2] = useState(todo.subject2);
  const [newTitle3, setNewTitle3] = useState(todo.subject3);
  const [newTitle4, setNewTitle4] = useState(todo.subject4);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "subject":
        setNewTitle(value);
        break;
      case "subject1":
        setNewTitle1(value);
        break;
      case "subject2":
        setNewTitle2(value);
        break;
      case "subject3":
        setNewTitle3(value);
        break;
      case "subject4":
        setNewTitle4(value);
        break;
      default:
        break;
    }
  };

  const saveEdit = async () => {
    if (
      newTitle.trim() !== "" &&
      newTitle1.trim() !== "" &&
      newTitle2.trim() !== "" &&
      newTitle3.trim() !== "" &&
      newTitle4.trim() !== ""
    ) {
      await updateDoc(db, `todos/${todo.id}`, {
        subject: newTitle,
        subject1: newTitle1,
        subject2: newTitle2,
        subject3: newTitle3,
        subject4: newTitle4,
      });
    }
  };

  const deleteTodo = async () => {
    await deleteDoc(db, `todos/${todo.id}`);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
      <div className="table">
        <tbody className="table-responsive">
          <div className="todo d-flex align-items-center table-responsive">
            <div
              // style={{
              //   textDecoration: todo.completed ? "line-through" : "none",
              // }}
              className="list"
            >
              {newTitle}
            </div>
            <div className="mr-2 ms-5">{newTitle1}</div>
            <div className="mr-2 ms-5">{newTitle2}</div>
            <div className="mr-2 ms-5">{newTitle3}</div>
            <div className="mr-2 ms-5">{newTitle4}</div>
            <button
              className="button-complete  ms-5 border border-transparent text-primary"
              onClick={() => toggleComplete(todo)}
            >
              <RemoveRedEyeIcon id="i" onClick={handleShowModal} />
            </button>
            <button
              className="button-edit border border-transparent text-warning"
              onClick={() =>
                handleEdit(
                  todo,
                  newTitle,
                  newTitle1,
                  newTitle2,
                  newTitle3,
                  newTitle4
                )
              }
            >
              <EditIcon id="i" />
            </button>
            <button
              className="button-delete border border-transparent text-danger"
              onClick={() => handleDelete(todo.id)}
            >
              <DeleteIcon id="i" />
            </button>
          </div>
          <Modal  open={showModal} onClose={handleCloseModal}>
            <Box className='bg-success m-5 text-white w-25 p-3'>
              <table>
                <tbody >
                  <tr>
                    <td>Subject:</td>
                    <td>{newTitle}</td>
                  </tr>
                  <tr>
                    <td>Subject 1:</td>
                    <td>{newTitle1}</td>
                  </tr>
                  <tr>
                    <td>Subject 2:</td>
                    <td>{newTitle2}</td>
                  </tr>
                  <tr>
                    <td>Subject 3:</td>
                    <td>{newTitle3}</td>
                  </tr>
                  <tr>
                    <td>Subject 4:</td>
                    <td>{newTitle4}</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Modal>
        </tbody>
      </div>
    </div>
  );
}
