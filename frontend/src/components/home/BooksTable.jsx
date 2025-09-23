import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-blue-300 bg-blue-50">
      <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
        <tbody className="text-blue-900 text-sm font-light">
          {books.map((book) => (
            <tr
              key={book._id}
              className="border-b border-blue-200 hover:bg-blue-100"
            >
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
