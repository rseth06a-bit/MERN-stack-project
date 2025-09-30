import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBooks();
  }, [token]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5555/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data.data);
    } catch (err) {
      console.error(err);

      // Handle forbidden / expired token
      if (err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to fetch books.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5555/books/${bookId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, status: newStatus } : book
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      {/* Toggle buttons */}
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            showType === "table"
              ? "bg-sky-500 text-white"
              : "bg-sky-200 text-blue-900 hover:bg-sky-400"
          }`}
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            showType === "card"
              ? "bg-sky-500 text-white"
              : "bg-sky-200 text-blue-900 hover:bg-sky-400"
          }`}
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-8 text-indigo-900">Books List</h1>

        <div className="flex items-center gap-x-4">
          {token ? (
            // 🔓 Show Logout if logged in
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            // 🔑 Show Login if not logged in
            <button
              className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          <Link to="/books/create">
            <MdOutlineAddBox className="text-indigo-700 hover:text-indigo-900 text-5xl transition-colors" />
          </Link>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable
          books={books}
          setBooks={setBooks}
          handleStatusChange={handleStatusChange}
        />
      ) : (
        <BooksCard books={books} handleStatusChange={handleStatusChange} />
      )}
    </div>
  );
};

export default Home;
