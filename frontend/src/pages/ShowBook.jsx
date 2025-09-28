import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.VITE_API_URL}/books/${id}`,
          {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(response.data);
      } catch (error) {
        console.log(error);
        alert('Failed to fetch book. Make sure you are logged in.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <BackButton />
      <h1 className="text-3xl my-4 text-indigo-700">Show Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-blue-300 rounded-xl shadow-md bg-white w-fit p-6">
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Status</span>
            <span className="capitalize">{book.status || 'Unread'}</span>
          </div>
          {book.status === 'Read' && (
            <div className="my-2">
              <span className="text-xl mr-4 text-gray-600">Read At</span>
              <span>
                {book.readAt ? new Date(book.readAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          )}
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Create Time</span>
            <span>
              {book.createdAt ? new Date(book.createdAt).toString() : 'N/A'}
            </span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-gray-600">Last Update Time</span>
            <span>
              {book.updatedAt ? new Date(book.updatedAt).toString() : 'N/A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
