import { useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import Input from "./Input";
import { FaChevronLeft } from "react-icons/fa";

function PostBooks(){
    const navigate = useNavigate();
    const [titulo,setTitulo] = useState("");
    const [isbn,setIsbn] = useState("");
    const [edicao,setEdicao] = useState("");
    const [ano,setAno] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();

        const newBook = {titulo,isbn,edicao,ano};

        try{
            const dataService = new LibraryDataService();
            const response = await dataService.registerBook(newBook);
            alert("Book registered successfully");
            console.log("Book registered successfully",response.data);

            setTitulo("");
            setIsbn("");
            setEdicao("");
            setAno("");
            

        }catch(error){
            console.log("Error registering book:", error);
            alert("Error registering book");
        }
     
    }

    return (
        <>
         <button 
                className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                onClick={() => navigate("/")}>
                <FaChevronLeft size={20} /> 
            </button> 

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6 bg-slate-200 rounded-md w-80 mx-auto mt-20 text-left"
            >
                <label className="text-black">Title</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />

                <label className="text-black">ISBN</label>
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />
                

                <label className="text-black">Edition</label>
                <input
                    type="text"
                    value={edicao}
                    onChange={(e) => setEdicao(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />
                 <label className="text-black">Year</label>
                <input
                    type="year"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4"
                >
                    Register Book
                </button>
            </form>
    
        </>
    );
}

export default PostBooks;