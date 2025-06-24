import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LibraryDataService from "./DataService";
import { FaChevronLeft } from "react-icons/fa";

function UpdateBook() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState({
    titulo: "",
    isbn: "",
    edicao: "",
    ano: ""
    
  });

  
  useEffect(() => {
    const dataService = new LibraryDataService();
    dataService.getBookById(id)
      .then(response => {
        
        setBook(response.data[0]);
      })
      .catch(error => {
        console.error("Error searching book", error);
      });
  }, [id]);

 
  function handleChange(e) {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  }

  
  function handleUpdate(e) {
    e.preventDefault();

    const dataService = new LibraryDataService();
    dataService.updateBook(id, book)
      .then(() => {
        alert("Book uptaded successfully!");
        navigate("/");  
      })
      .catch(error => {
        console.error("Error updating book", error);
      });
  }

  return (

    <>
    <button 
                            className="absolute top-2 left-2 box-border size-12 bg-red-400 rounded-md font-medium text-white flex items-center justify-center"  
                            onClick={() => navigate("/update-book")}>
                            <FaChevronLeft size={20} /> 
                        </button>
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="titulo"
            value={book.titulo}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Edition</label>
          <input
            type="text"
            name="edicao"
            value={book.edicao}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Year</label>
          <input
            type="year"
            name="ano"
            value={book.ano}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
    </>
  );
}

export default UpdateBook;
