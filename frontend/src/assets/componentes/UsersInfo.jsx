import { useNavigate,useParams } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";


function UsersInfo(){
    const navigate = useNavigate();
    const { id } = useParams(); 
    const[users,setUsers]=useState([]);
    

    useEffect(()=>{
            
        const dataService = new LibraryDataService();
        dataService.getUserById(id)
        .then(response => {
            
            setUsers(response.data);
        })
        .catch(error =>{
            console.error("Error searching users",error);
        });
    
    },[id]);

return(
    <>
        <button 
                        className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                        onClick={() => navigate("/list-users")}>
                        <FaChevronLeft size={20} /> 
                    </button>
    
         
        <div className="flex flex-col space-y-4 bg-slate-200 rounded-md w-80 mx-auto ">
           
            <h2 className="text-black text-xl font-bold text-center mt-4">User Info</h2>

            <ul className="text-black p-4 rounded-md shadow-md mt-4">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <li key={user.id_usuario ?? index} className="p-2 border-b">
                           <strong>User:</strong> {user.nome}<br/>

                           <strong>CPF:</strong> {user.cpf} <br />

                           <strong>Email:</strong> {user.email} <br />

                           <strong>Password</strong> {user.senha} <br />
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No user found.</li>
                )}
            </ul>
            </div>
            
            </>
    );

}

export default UsersInfo;