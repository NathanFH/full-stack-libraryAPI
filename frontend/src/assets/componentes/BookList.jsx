import { Link } from "react-router-dom";
import { Info, Pencil } from "lucide-react";

function BookList({ books, acao }) {
  return (
    <ul className="text-black p-4 rounded-md shadow-md mt-4">
      {books.length > 0 ? (
        books.map((book, index) => (
          <li key={book.id_livro ?? index} className="p-2 border-b flex items-center justify-between">
            <span>{book.titulo}</span>

            {acao === "ver" && (
              <Link to={`/books-info/${book.id_livro}`}>
                <button className="bg-blue-500 rounded-md p-1 px-3 text-white flex items-center justify-center">
                  <Info size={18} />
                </button>
              </Link>
            )}

            {acao === "editar" && (
              <Link to={`/edit-book/${book.id_livro}`}>
                <button className="bg-yellow-500 rounded-md p-1 px-3 text-white flex items-center justify-center">
                  <Pencil size={18} />
                </button>
              </Link>
            )}
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500">No book found.</li>
      )}
    </ul>
  );
}

export default BookList;