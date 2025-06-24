import { useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import Input from "./Input";
import { FaChevronLeft } from "react-icons/fa";
import { Trash2 } from "lucide-react";


function DeleteBook(){
    const navigate = useNavigate()
    const[book,setBooks]=useState([]);
    
    useEffect(()=>{
            
        const dataService = new LibraryDataService();
        dataService.getAllBooks()
        .then(response => {
            
            setBooks(response.data);
        })
        .catch(error =>{
            console.error("Error searching books",error);
        });
    
    },[]);

    const deleteSubmit= async(id_livro)=>{
        try{
            const dataService = new LibraryDataService();
            const response = await dataService.deleteBook(id_livro);
            alert("Book deleted successfully");
            console.log("Book deleted successfully",response.data);

            setBooks(book.filter(book => book.id_livro !== id_livro));

        }catch(error){
            console.log("Error deleting book:", error);
            alert("Error deleting book");
    }
}

    return(
        <>
        <button 
                        className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                        onClick={() => navigate("/")}>
                        <FaChevronLeft size={20} /> 
        </button>
        <div className="flex flex-col space-y-4 bg-slate-200 rounded-md w-80 mx-auto ">

        <ul className="text-black p-4 rounded-md shadow-md mt-4">
            
                {book.length > 0 ? (
                    book.map((book, index) => (
                        <li key={book.id_livro ?? index} className="p-2 border-b flex items-center justify-between">
                            {book.titulo}
                            <button 
                            onClick={() => deleteSubmit(book.id_livro)}
                            className="bg-red-400 rounded-md p-1 flex items-center justify-center">
                                <Trash2 size={20} className="text-black cursor-pointer" />
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No book found.</li>
                )}
            </ul>
        </div>
        </>
    )
}

export default DeleteBook;