import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import BookModal from "./BookModal";

const BooksCard = ({ books, handleStatusChange }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <div
          key={book._id}
          className="bg-gradient-to-br from-blue-100 to-indigo-100 shadow-md rounded-xl p-6 border border-blue-300 flex flex-col justify-between"
        >
          <h2 className="text-xl font-bold text-indigo-900 mb-2">{book.title}</h2>
          <p className="text-md text-blue-800 mb-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-md text-blue-800 mb-4">
            <span className="font-semibold">Year:</span> {book.publishYear}
          </p>

          <div className="mb-4">
            <span className="font-semibold">Status: </span>
            <select
              value={book.status || "Unread"}
              onChange={e => handleStatusChange(book._id, e.target.value)}
              className="border border-gray-400 rounded px-2 py-1 ml-2"
            >
              <option value="Read">Read</option>
              <option value="Unread">Unread</option>
              <option value="Reading">Reading</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-blue-200">
            <button
              onClick={() => setSelectedBook(book)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
            >
              <BsInfoCircle className="text-lg" />
              <span>Details</span>
            </button>

            <Link
              to={`/books/edit/${book._id}`}
              className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
            >
              <AiOutlineEdit className="text-lg" />
              <span>Edit</span>
            </Link>

            <Link
              to={`/books/delete/${book._id}`}
              className="flex items-center gap-1 text-red-600 hover:text-red-800"
            >
              <MdOutlineDelete className="text-lg" />
              <span>Delete</span>
            </Link>
          </div>
        </div>
      ))}

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default BooksCard;
