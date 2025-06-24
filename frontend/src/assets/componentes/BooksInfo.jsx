import { useNavigate,useParams } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";


function BooksInfo(){
    const navigate = useNavigate();
    const { id } = useParams(); 
    const[books,setBooks]=useState([]);
    

    useEffect(()=>{
            
        const dataService = new LibraryDataService();
        dataService.getBookById(id)
        .then(response => {
            
            setBooks(response.data);
        })
        .catch(error =>{
            console.error("Error searching books",error);
        });
    
    },[id]);

return(
    <>
        <button 
                        className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                        onClick={() => navigate("/list-books")}>
                        <FaChevronLeft size={20} /> 
                    </button>
    
         
        <div className="flex flex-col space-y-4 bg-slate-200 rounded-md w-80 mx-auto ">
           
            <h2 className="text-black text-xl font-bold text-center mt-4">Book Info</h2>

            <ul className="text-black p-4 rounded-md shadow-md mt-4">
                {books.length > 0 ? (
                    books.map((books, index) => (
                        <li key={books.id_livro ?? index} className="p-2 border-b">
                           <strong>Book:</strong> {books.titulo}<br/>

                           <strong>ISBN:</strong> {books.isbn} <br />

                           <strong>Edition:</strong> {books.edicao} <br />

                           <strong>Year</strong> {books.ano} <br />
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No book found.</li>
                )}
            </ul>
            </div>
            
            </>
    );

}

export default BooksInfo;