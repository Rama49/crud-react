import React, { useState } from "react";
import { updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
        <div className="table">
            <thead>
                <th >pppppppp</th>
                <th>pppppppp</th>
                <th>pppppppp</th>
                <th>pppppppp</th>
                <th>pppppppp</th>
                <th>pppppppp</th>
            </thead>
            <tbody>
            <div className="todo d-flex align-items-center"> {/* Utilisation de la classe "d-flex" pour afficher les éléments sur la même ligne */}
        <div
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
          className="list" // Ajout de la classe "mr-2" pour ajouter un espace à droite
        >
          {newTitle}
        </div>

        {/* Afficher la valeur de Subject1 */}
        <div className="mr-2 ms-5">{newTitle1}</div> {/* Ajout de la classe "mr-2" pour ajouter un espace à droite */}

        {/* Afficher la valeur de Subject2 */}
        <div className="mr-2 ms-5">{newTitle2}</div> {/* Ajout de la classe "mr-2" pour ajouter un espace à droite */}

        {/* Afficher la valeur de Subject3 */}
        <div className="mr-2 ms-5">{newTitle3}</div> {/* Ajout de la classe "mr-2" pour ajouter un espace à droite */}

        {/* Afficher la valeur de Subject4 */}
        <div className="mr-2 ms-5">{newTitle4}</div> {/* Ajout de la classe "mr-2" pour ajouter un espace à droite */}

        <button
          className="button-complete mx-5 border border-transparent text-danger"
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>
        <button
          className="button-edit mx-5 border border-transparent text-success"
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
          className="button-delete mx-5 border border-transparent text-warning"
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon id="i" />
        </button>
      </div>
        </tbody>
        </div>
    </div>
  );
}