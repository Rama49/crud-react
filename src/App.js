import React from 'react';
import CreateTodo from './Component/CreateTodo';
import Todo from './Component/Todo';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './Component/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [todos, setTodos] = React.useState([]);
  
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
    await updateDoc(doc(db, "todos", todo.id), { Subject: Subject });
    await updateDoc(doc(db, "todos", todo.id), { Subject1: Subject1 });
    await updateDoc(doc(db, "todos", todo.id), { Subject2: Subject2 });
    await updateDoc(doc(db, "todos", todo.id), { Subject3: Subject3 });
    await updateDoc(doc(db, "todos", todo.id), { Subject4: Subject4 });
    
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div>
      <CreateTodo />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
