import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { FaChevronLeft } from "react-icons/fa";

function UpdateUser() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    cpf: "",
    senha: "",
    email: ""
    
  });

  
  useEffect(() => {
    const dataService = new LibraryDataService();
    dataService.getUserById(id)
      .then(response => {
        
        setUsuario(response.data[0]);
      })
      .catch(error => {
        console.error("Error searching user", error);
      });
  }, [id]);

 
  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  }

  
  function handleUpdate(e) {
    e.preventDefault();

    const dataService = new LibraryDataService();
    dataService.updateUser(id, usuario)
      .then(() => {
        alert("User uptaded successfully!");
        navigate("/");  
      })
      .catch(error => {
        console.error("Error updating user", error);
      });
  }

  return (

    <>
    <button 
                            className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                            onClick={() => navigate("/update-user")}>
                            <FaChevronLeft size={20} /> 
                        </button>
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Editar Usuário</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">CPF</label>
          <input
            type="text"
            name="cpf"
            value={usuario.cpf}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="text"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Alterar
        </button>
      </form>
    </div>
    </>
  );
}

export default UpdateUser;