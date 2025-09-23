import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 p-6">
            {/* toggle buttons */}
            <div className="flex justify-center items-center gap-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${showType === 'table'
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-200 text-blue-900 hover:bg-sky-400'
                        }`}
                    onClick={() => setShowType('table')}
                >
                    Table View
                </button>
                <button
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${showType === 'card'
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-200 text-blue-900 hover:bg-sky-400'
                        }`}
                    onClick={() => setShowType('card')}
                >
                    Card View
                </button>
            </div>

            {/* header */}
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold my-8 text-indigo-900">
                    Books List
                </h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-indigo-700 hover:text-indigo-900 text-5xl transition-colors" />
                </Link>
            </div>

            {/* content */}
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <BooksTable books={books} setBooks={setBooks} />
            ) : (
                <BooksCard books={books} setBooks={setBooks} />
            )}

        </div>
    );
};

export default Home;
