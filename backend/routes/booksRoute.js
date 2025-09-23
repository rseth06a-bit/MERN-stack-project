import express from 'express'
import {Book} from '../models/bookModel.js';

const router = express.Router();

// Route to save new book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
  
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //route for get all books
  router.get('/', async (request,response)=>{
      try{
          const books = await Book.find({});
          return response.status(200).json({
              count: books.length,
              data: books
      });
      } catch (error){
          console.log(error.message);
          response.status(500).send({message: error.message});
      }
  });
  
  //route for get one book
  router.get('/:id', async (request,response)=>{
      try{
  
          const {id} = request.params;
          const book = await Book.findById(id);
          return response.status(200).json(book);
      } catch (error){
          console.log(error.message);
          response.status(500).send({message: error.message});
      }
  });
  
  //route for update a book
  router.put('/:id', async(request, response)=>{
      try{
          if(
              !request.body.title ||
              !request.body.author ||
              !request.body.publishYear
          ) {
              return response.status(400).send({
                  message: 'Send all required fields: title, author, publishYear',
              });
          }
      const {id} = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
      if (!result){
          return response.status(404).json({message: 'Book not found'});
      }
      return response.status(200).send({message: 'Book updated successfully'});
      } catch (error){
          console.log(error.message);
          response.status(500).send({message: error.message});
      }
  })
  
  //route for delete a book
  router.delete('/:id', async (request, response)=>{
      try{
          const {id} = request.params;
          const result = await Book.findByIdAndDelete(id);
  
          if (!result){
              return response.status(404).json({message: 'Book not found'});
          }
  
          return response.status(200).send({message: 'Book deleted successfully'});
      } catch (error){
          console.log(error.message);
          response.status(500).send({message: error.message});
      }
  });
  
  //route for updating book status
  // PATCH route for updating book status
// PATCH route for updating book status
router.patch('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }
  
      const updateFields = { status };
      if (status === 'Read') {
        updateFields.readAt = new Date(); // set when marked as Read
      } else {
        updateFields.readAt = null; // clear if not Read
      }
  
      const updatedBook = await Book.findByIdAndUpdate(id, updateFields, { new: true });
  
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json(updatedBook);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  

  export default router;
  