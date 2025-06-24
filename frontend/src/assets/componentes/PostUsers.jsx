import { useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { useState,useEffect } from "react";
import Input from "./Input";
import { FaChevronLeft } from "react-icons/fa";

function PostUsers(){
    const navigate = useNavigate();
    const [nome,setNome] = useState("");
    const [cpf,setCpf] = useState("");
    const [email,setEmail] = useState("");
    const [telefone,setTelefone] = useState("");
    const [senha,setSenha] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const newUser = {nome,cpf,email,telefone,senha};

        try{
            const dataService = new LibraryDataService();
            const response = await dataService.registerUser(newUser);
            alert("User successfully registered");
            console.log("User successfully registered",response.data);

            setNome("");
            setCpf("");
            setEmail("");
            setTelefone("");
            setSenha("");

        }catch(error){
            console.log("Error registering user:", error);
            alert("Error registering user");
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
                <label className="text-black">Name</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />

                <label className="text-black">CPF (12 dígitos)</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />
                

                <label className="text-black">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />
                 <label className="text-black">Password</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />

                <label className="text-black">Telephone number</label>
                <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4"
                >
                    Register user
                </button>
            </form>
    
        </>
    );
}

export default PostUsers;