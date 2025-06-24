import { useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import Input from "./Input";
import { FaChevronLeft } from "react-icons/fa";
import { Trash2 } from "lucide-react";


function DeleteUser(){
    const navigate = useNavigate()
    const[users,setUsers]=useState([]);
    
    useEffect(()=>{
            
        const dataService = new LibraryDataService();
        dataService.getAllUsers()
        .then(response => {
            
            setUsers(response.data);
        })
        .catch(error =>{
            console.error("Error searching users",error);
        });
    
    },[]);

    const deleteSubmit= async(id_usuario)=>{
        try{
            const dataService = new LibraryDataService();
            const response = await dataService.deleteUser(id_usuario);
            alert("User deleted successfully");
            console.log("User deleted successfully",response.data);

            setUsers(users.filter(user => user.id_usuario !== id_usuario));

        }catch(error){
            console.log("Error deleting user:", error);
            alert("Error deleting user");
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
            
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <li key={user.id_usuario ?? index} className="p-2 border-b flex items-center justify-between">
                            {user.nome}
                            <button 
                            onClick={() => deleteSubmit(user.id_usuario)}
                            className="bg-red-400 rounded-md p-1 flex items-center justify-center">
                                <Trash2 size={20} className="text-black cursor-pointer" />
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No user found.</li>
                )}
            </ul>
        </div>
        </>
    )
}

export default DeleteUser;