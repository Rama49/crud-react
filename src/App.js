import React, { useState } from 'react';
import CreateTodo from './Component/CreateTodo';
import Todo from './Component/Todo';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './Component/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, Subject, Subject1, Subject2, Subject3, Subject4) => {
    await updateDoc(doc(db, "todos", todo.id), {
      Subject,
      Subject1,
      Subject2,
      Subject3,
      Subject4
    });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // Pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter
  const filteredTodos = currentTodos.filter((todo) => {
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

  return (
    <div>
      <CreateTodo />
      <div className="pagination-filter float-end">
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
       
      </div>
      {filteredTodos.map((todo, index) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
       <Pagination 
          todosPerPage={todosPerPage}
          totalTodos={todos.length}
          paginate={paginate}
        />
    </div>
  );
}

// Pagination component
const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
