import { useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";


function ListAllRent(){
    const navigate = useNavigate();
    const[rent,setRents]=useState([]);
    

    useEffect(()=>{
            
        const dataService = new LibraryDataService();
        dataService.getAllRent()
        .then(response => {
            
            setRents(response.data);
        })
        .catch(error =>{
            console.error("Error searching rents",error);
        });
    
    },[]);

return(
    <>
        <button 
                        className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                        onClick={() => navigate("/")}>
                        <FaChevronLeft size={20} /> 
                    </button>
    
         
        <div className="flex flex-col space-y-4 bg-slate-200 rounded-md w-80 mx-auto ">
           
            <h2 className="text-black text-xl font-bold text-center mt-4">Rents list</h2>

            <ul className="text-black p-4 rounded-md shadow-md mt-4">
                {rent.length > 0 ? (
                    rent.map((r, index) => (
                        <li key={r.id_usuario ?? index} className="p-2 border-b">
                            <strong>Usuário:</strong> {r.nome} <br />
                            <strong>Livro:</strong> {r.titulo} <br />
                            <strong>Status:</strong> {r.status ? "Ativo" : "Inativo"}
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No rent found.</li>
                )}
            </ul>
            </div>
            
            </>
    );

}

export default ListAllRent;