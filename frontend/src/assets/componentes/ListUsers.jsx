import { useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import {Link} from "react-router-dom";
import { Info } from "lucide-react";
import UserList from "./UserList";


function ListAllUsers({acao="ver"}){
    const navigate = useNavigate();
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

return(
    <>
        <button 
                        className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                        onClick={() => navigate("/")}>
                        <FaChevronLeft size={20} /> 
                    </button>
    
         
                    <div className="flex flex-col space-y-4 bg-slate-200 rounded-md w-80 mx-auto">
                        <h2 className="text-black text-xl font-bold text-center mt-4">
                        {acao === "ver" ? "Users list" : "Select user to update"}
                        </h2>

                        <UserList users={users} acao={acao} />
                    </div>
            
            </>
    );

}

export default ListAllUsers;