import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

const BooksTable = ({ books, setBooks }) => {

  const handleStatusChange = (bookId, newStatus) => {
    axios
      .patch(`http://localhost:5555/books/${bookId}/status`, { status: newStatus })
      .then(() => {
        // Update local state immediately
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book._id === bookId ? { ...book, status: newStatus } : book
          )
        );
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-blue-400 bg-blue-50">
      <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
        <tbody className="text-blue-900 text-sm font-light">
          {books.map((book) => (
            <tr key={book._id} className="border-b border-blue-300 hover:bg-blue-100">
              <td className="py-4 px-6">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-semibold">Title: </span>
                    <span>{book.title}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Author: </span>
                    <span>{book.author}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Year: </span>
                    <span>{book.publishYear}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Status: </span>
                    <select
                      className="border border-gray-400 rounded px-2 py-1 ml-2"
                      value={book.status || "Unread"}
                      onChange={(e) =>
                        handleStatusChange(book._id, e.target.value)
                      }
                    >
                      <option value="Read">Read</option>
                      <option value="Unread">Unread</option>
                      <option value="Reading">Reading</option>
                    </select>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-xl text-blue-600 hover:text-blue-900" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-700" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800" />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
