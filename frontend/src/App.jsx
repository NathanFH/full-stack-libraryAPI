import { useState,useEffect } from 'react'
import './App.css'
import InitialPage from "./assets/componentes/InitialPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListUsers from "./assets/componentes/ListUsers";
import PostUsers from "./assets/componentes/PostUsers";
import DeleteUser from './assets/componentes/DeleteUsers';
import ListAllBooks from './assets/componentes/ListBooks';
import PostBooks from './assets/componentes/PostBooks';
import DeleteBook from './assets/componentes/DeleteBook';
import ListAllRent from './assets/componentes/ListRent';
import UsersInfo from './assets/componentes/UsersInfo';
import BooksInfo from './assets/componentes/BooksInfo';
import UpdateUser from './assets/componentes/UpdateUser';
import UpdateBook from './assets/componentes/UpdateBook';
import BookList from './assets/componentes/BookList';
import PostLocacao from './assets/componentes/PostLocacao';



function App() {


  
  return(
    <Router>
    <div>
      
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/list-users" element={<ListUsers acao="ver"/>} />
        <Route path="/post-users" element={<PostUsers />} />
        <Route path="/delete-users" element={<DeleteUser />} />
        <Route path="/list-books" element={<ListAllBooks />} />
        <Route path="/post-books" element={<PostBooks />} />
        <Route path="/delete-books" element={<DeleteBook />} />
        <Route path="/list-rents" element={<ListAllRent />} />
        <Route path="/users-info/:id" element={<UsersInfo />} />
        <Route path="/books-info/:id" element={<BooksInfo />}/>
        <Route path="/update-user" element={<ListUsers acao="editar" />} />
        <Route path="/edit-user/:id" element={<UpdateUser />} />
        <Route path="/update-book" element={<ListAllBooks acao="editar" />} />
        <Route path="/edit-book/:id" element={<UpdateBook />} />
        <Route path="/post-locacao" element={<PostLocacao />} />

        
      </Routes>
    </div>
  </Router>
    
  );


 
}

export default App
