import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import BookModal from "./BookModal";

const BooksCard = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-gradient-to-br from-blue-100 to-indigo-100 shadow-md rounded-xl p-6 border border-blue-300 flex flex-col justify-between"
        >
          {/* Title */}
          <h2 className="text-xl font-bold text-indigo-900 mb-2">{book.title}</h2>

          {/* Author */}
          <p className="text-md text-blue-800 mb-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          {/* Year */}
          <p className="text-md text-blue-800 mb-4">
            <span className="font-semibold">Year:</span> {book.publishYear}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-blue-200">
            {/* 👁️ Eye button opens modal */}
            <button
              onClick={() => setSelectedBook(book)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
            >
              <BsInfoCircle className="text-lg" />
              <span>Details</span>
            </button>

            {/* Edit */}
            <Link
              to={`/books/edit/${book._id}`}
              className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
            >
              <AiOutlineEdit className="text-lg" />
              <span>Edit</span>
            </Link>

            {/* Delete */}
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

      {/* Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default BooksCard;
