import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 import CreateTodo from "./CreateTodo"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TodoLIst from './TodoLIst';
import Deleted from './Deleted';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreateTodo/>} />
      <Route path="/todos" element={<TodoLIst/>} />
      <Route path="/delete/:id" element={<Deleted/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
