import {useState} from 'react';
import Input from "./Input";
import {Link} from "react-router-dom";
import axios from "axios";


class LibraryDataService{

    getAllUsers(){
        return axios.get("http://localhost:3001/bib/user");
    }

    getUserById(id){
        return axios.get(`http://localhost:3001/bib/user/${id}`)
    }


    registerUser(data){
        return axios.post("http://localhost:3001/bib/user",data,{
            headers:{
                "Content-type":"application/json",
            }
        });
    }

    updateUser(id,data){
        return axios.put(`http://localhost:3001/bib/user/${id}`,data,{
            headers:{
                "Content-type":"application/json",
            }
        })
    }

    deleteUser(id_usuario){
        return axios.delete(`http://localhost:3001/bib/user/${id_usuario}`,{
            headers:{
                "Content-type":"application/json",
            }
        });
    }

    getAllBooks(){
        return axios.get("http://localhost:3001/bib/livro");
    }

    getBookById(id){
        return axios.get(`http://localhost:3001/bib/livro/${id}`)
    }

    registerBook(data){
        return axios.post("http://localhost:3001/bib/livro",data,{
            headers:{
                "Content-type":"application/json",
            }
        });
    }

    updateBook(id,data){
        return axios.put(`http://localhost:3001/bib/livro/${id}`,data,{
            headers:{
                "Content-type":"application/json",
            }
        })
    }

    deleteBook(id_livro){
        return axios.delete(`http://localhost:3001/bib/livro/${id_livro}`,{
            headers:{
                "Content-type":"application/json",
            }
        });
    }
    getAllRent(){
        return axios.get("http://localhost:3001/bib/locar");
    }

    postLocacao(data) {
        return axios.post("http://localhost:3001/bib/locar", data, {
          headers: {
            "Content-type": "application/json",
          },
        });
      }
      
      getLivrosDisponiveis() {
        return axios.get("http://localhost:3001/bib/disp");
      }

}


export default LibraryDataService;
