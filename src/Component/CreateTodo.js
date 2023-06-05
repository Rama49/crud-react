import React, { useState, useRef } from "react";
import { db } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function CreateTodo() {
  const [subject, setSubject] = useState("");
  const [subject1, setSubject1] = useState("");
  const [subject2, setSubject2] = useState("");
  const [subject3, setSubject3] = useState("");
  const [subject4, setSubject4] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      subject !== "" &&
      subject1 !== "" &&
      subject2 !== "" &&
      subject3 !== "" &&
      subject4 !== ""
    ) {
      addDoc(collection(db, "todos"), {
        subject,
        subject1,
        subject2,
        subject3,
        subject4,
        completed: false,
      });
      setSubject("");
      setSubject1("");
      setSubject2("");
      setSubject3("");
      setSubject4("");

      formRef.current.reset();
    }
  };

  return (
    <div className="shadow justify-content-center text-center w-50 offset-lg-3">
         <h1>Todo Application</h1>
           <form onSubmit={handleSubmit} ref={formRef}>
      <div className="input-container container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 col-md-6">
            <InputGroup hasValidation className="border border-transparent">
              <FloatingLabel
                controlId="floatingInput"
                label="Nom"
                className="mb-3"
              >
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
          <div className="col-lg-6 col-sm-12">
            <InputGroup hasValidation>
              <FloatingLabel
                controlId="floatingInput"
                label="Adresse"
                className="mb-3"
              >
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
            <FloatingLabel
              controlId="floatingInput"
              label="City"
              className="mb-3"
            >
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
              <FloatingLabel
                controlId="floatingInput"
                label="Pin Code"
                className="mb-3"
              >
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
              <FloatingLabel
                controlId="floatingInput"
                label="Country"
                className="mb-3"
              >
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
            Ajouter
          </button>
        </div>
      </div>
    </form>
    </div>
  );
}

export default CreateTodo;
