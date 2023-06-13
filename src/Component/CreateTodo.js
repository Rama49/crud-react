import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy1fDZYVkOR0OwbT3q447kxwHtKkQJYG0",
  authDomain: "crud-react-2c0b9.firebaseapp.com",
  projectId: "crud-react-2c0b9",
  storageBucket: "crud-react-2c0b9.appspot.com",
  messagingSenderId: "740596850015",
  appId: "1:740596850015:web:fafb9d518b2853af446aea",
  measurementId: "G-QQ2ENKKHR9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function CreateTodo() {
  const [subject, setSubject] = useState("");
  const [subject1, setSubject1] = useState("");
  const [subject2, setSubject2] = useState("");
  const [subject3, setSubject3] = useState("");
  const [subject4, setSubject4] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null); 
  const formRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter]); 

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      collection(db, "todos"), where("subject", "==", filter)
    );
    const data = querySnapshot.docs.map((doc) => doc.data());
    setTodos(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setTodos(data);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      subject !== "" &&
      subject1 !== "" &&
      subject2 !== "" &&
      subject3 !== "" &&
      subject4 !== ""
    ) {
      if (isEditing) {
        const updatedTodos = [...todos];
        const editedTodo = updatedTodos[editIndex];
        editedTodo.subject = subject;
        editedTodo.subject1 = subject1;
        editedTodo.subject2 = subject2;
        editedTodo.subject3 = subject3;
        editedTodo.subject4 = subject4;
        setTodos(updatedTodos);
      } else {
        setTodos((prevTodos) => [
          ...prevTodos,
          {
            subject,
            subject1,
            subject2,
            subject3,
            subject4,
            completed: false,
          },
        ]);
      }
  
      setSubject("");
      setSubject1("");
      setSubject2("");
      setSubject3("");
      setSubject4("");
  
      formRef.current.reset();
      setIsEditing(false);
      setEditIndex(null);
    }
  };
  
  

  const handleView = (index) => {
    if (index >= 0 && index < todos.length) {
      const todo = todos[index];
      setSelectedTodo(todo);
      setShowModal(true);
    }
  };

 
  const handleEdit = (index) => {
    const todo = todos[index];
    console.log("Modifier l'élément :", todo);
    setSubject(todo.subject);
    setSubject1(todo.subject1);
    setSubject2(todo.subject2);
    setSubject3(todo.subject3);
    setSubject4(todo.subject4);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  
  
  

  const [todos, setTodos] = useState([]);

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    
   
  setTodos(updatedTodos);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredTodos = todos.filter((todo) => {
    const { subject, subject1, subject2, subject3, subject4 } = todo;
    const searchTerm = filter.toLowerCase();
    return (
      subject.toLowerCase().includes(searchTerm) ||
      subject1.toLowerCase().includes(searchTerm) ||
      subject2.toLowerCase().includes(searchTerm) ||
      subject3.toLowerCase().includes(searchTerm) ||
      subject4.toLowerCase().includes(searchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="">
      <div className="shadow justify-content-center text-center w-50 offset-3 mb-5">
        <h1 className="m-5">Crud avec React et Firebase</h1>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="input-container container justify-content-center align-items -center">
            <div className="row">
              <div className="col-lg-6 col-sm-12 col-md-12">
                <InputGroup hasValidation className="border border-transparent">
                  <FloatingLabel controlId="floatingInput" label="Nom" className="mb-3">
                    <Form.Control
                      type="text"
                      required
                      isInvalid={subject === ""}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </FloatingLabel>

                </InputGroup>
              </div>
              <div className="col-lg-6 col-sm-12 col-md-12">
                <InputGroup hasValidation>
                  <FloatingLabel controlId="floatingInput" label="Adresse" className="mb-3">
                    <Form.Control
                      type="text"
                      required
                      isInvalid={subject1 === ""}
                      value={subject1}
                      onChange={(e) => setSubject1(e.target.value)}
                    />
                  </FloatingLabel>
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <InputGroup hasValidation>
                <FloatingLabel controlId="floatingInput" label="City" className="mb-3">
                  <Form.Control
                    type="text"
                    required
                    isInvalid={subject2 === ""}
                    value={subject2}
                    onChange={(e) => setSubject2(e.target.value)}
                  />
                </FloatingLabel>
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <InputGroup hasValidation>
                  <FloatingLabel controlId="floatingInput" label="Pin Code" className="mb-3">
                    <Form.Control
                      type="number"
                      required
                      isInvalid={subject3 === ""}
                      value={subject3}
                      onChange={(e) => setSubject3(e.target.value)}
                    />
                  </FloatingLabel>
                </InputGroup>
              </div>
              <div className="col-lg-6 col-sm-12">
                <InputGroup hasValidation>
                  <FloatingLabel controlId="floatingInput" label="Country" className="mb-3">
                    <Form.Control
                      type="text"
                      required
                      isInvalid={subject4 === ""}
                      value={subject4}
                      onChange={(e) => setSubject4(e.target.value)}
                    />
                  </FloatingLabel>
                </InputGroup>
              </div>
            </div>
            <div className="btn-container text-center">
              <button className="border border-none p-3 shadow w-100 bg-success text-white mb-5 mt-2">
              {isEditing ? "Modifier" : "Ajouter" }
              </button>
            </div>
          </div>
        </form>
      </div>
      <Form.Group controlId="formFilter">
        <Form.Control
          type="text"
          placeholder="Filtre ici ..."
          onChange={handleFilterChange}
          className="w-25 float-end mb-5"
        />
      </Form.Group>
      <Table>
        <thead>
          <tr className="">
            <th>Nom</th>
            <th>Adresse</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.subject}</td>
              <td>{todo.subject1}</td>
              <td>{todo.subject2}</td>
              <td>{todo.subject3}</td>
              <td>{todo.subject4}</td>
              <td className="text-center">
                <RemoveRedEyeIcon onClick={() => handleView(indexOfFirstItem + index)} className="text-primary" />
                <EditIcon onClick={() => handleEdit(indexOfFirstItem + index)} className="text-warning mx-5" />
                <DeleteIcon onClick={() => handleDelete(indexOfFirstItem + index)} className="text-danger" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-container">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="border p-2 bg-ligth">{`${currentPage}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Les Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
              <tr>
                <td>Nom:</td>
                <td>{selectedTodo?.subject}</td>
              </tr>
              <tr>
                <td>Adresse:</td>
                <td>{selectedTodo?.subject1}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{selectedTodo?.subject2}</td>
              </tr>
              <tr>
                <td>Pin Code:</td>
                <td>{selectedTodo?.subject3}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{selectedTodo?.subject4}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateTodo;
