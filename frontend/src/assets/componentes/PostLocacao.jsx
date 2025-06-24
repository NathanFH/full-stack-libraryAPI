import { useEffect, useState } from "react";
import LibraryDataService from "./DataService";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import {Link} from "react-router-dom";

function PostLocacao() {
  const [usuarios, setUsuarios] = useState([]);
  const [livrosDisponiveis, setLivrosDisponiveis] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [livrosSelecionados, setLivrosSelecionados] = useState([]);
  const navigate = useNavigate();

  const dataService = new LibraryDataService();

  useEffect(() => {
    dataService.getAllUsers().then((res) => setUsuarios(res.data));
  }, []);

  const buscarLivros = () => {
    dataService.getLivrosDisponiveis().then((res) =>
      setLivrosDisponiveis(res.data)
    );
  };

  const toggleLivro = (idLivro) => {
    if (livrosSelecionados.includes(idLivro)) {
      setLivrosSelecionados(livrosSelecionados.filter((id) => id !== idLivro));
    } else {
      setLivrosSelecionados([...livrosSelecionados, idLivro]);
    }
  };

  const confirmarLocacao = async () => {
    if (!usuarioSelecionado || livrosSelecionados.length === 0) {
      alert("Select a user and at least one book");
      return;
    }

    try {
      await Promise.all(
        livrosSelecionados.map((idLivro) =>
          dataService.postLocacao({
            id_usuario: usuarioSelecionado,
            id_livro: idLivro,
            status: true,
          })
        )
      );
      alert("Locações registradas!");
      navigate("/list-rents");
    } catch (e) {
      console.error(e);
      alert("Error registering rent.");
    }
  };

  return (

    <>
     <button 
                        className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                        onClick={() => navigate("/")}>
                        <FaChevronLeft size={20} /> 
                    </button>
    
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">New Rent</h1>

      {!usuarioSelecionado ? (
        <>
          <h2 className="text-lg font-semibold mb-2">Select a user:</h2>
          <ul className="space-y-2">
            {usuarios.map((u) => (
              <li
                key={u.id_usuario}
                className="cursor-pointer bg-slate-200 text-black p-2 rounded hover:bg-slate-300"
                onClick={() => {
                  setUsuarioSelecionado(u.id_usuario);
                  buscarLivros();
                }}
              >
                {u.nome}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">Books available:</h2>
          <ul className="space-y-2">
            {livrosDisponiveis.map((l) => (
              <li
                key={l.id_livro}
                className={`p-2 text-black rounded cursor-pointer ${
                  livrosSelecionados.includes(l.id_livro)
                    ? "bg-green-300"
                    : "bg-slate-200"
                }`}
                onClick={() => toggleLivro(l.id_livro)}
              >
                {l.titulo}
              </li>
            ))}
          </ul>
          <button
            onClick={confirmarLocacao}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm rent
          </button>
        </>
      )}
    </div>
    </>
  );
}

export default PostLocacao;