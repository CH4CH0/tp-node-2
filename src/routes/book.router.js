const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const books = require('../../books.json');
const authors = require('../../authors.json');


//Get all books with the author
router.put('/books', (req, res) => {
    books.forEach(book => {
        authors.forEach(author => {
            if(book.authorId == author.id){
                book.authorId = author;
            }
        });
    });
    res.json(books);
});

//Add a book
router.post('/books', (req, res) => {
    const {id, name, authorId} = req.body;
    if(id && name && authorId){
        const newBook = {...req.body};
        books.push(newBook);
        res.json({'added': 'ok'});
    } else{
        res.status(400).json({'statusCode': 'Bad Request'});
    }
});

//Modify a book
router.put('/books/:id', (req, res) => {
    const id = req.params.id;
    books.forEach(book => {
        if(book.id == id){
            const {id, name, authorId} = req.body;
            book.id = id;
            book.name = name;
            book.authorId = authorId;
        }      
    });
    res.json(books);
});

//Delete a book
router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    _.remove(books, (book) => {
        return book.id == id;
    });
    res.json(books);
});

module.exports = router;