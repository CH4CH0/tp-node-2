const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../../authors.json');
const books = require('../../books.json');

//Get all authors
router.get('/authors', (req, res) => {
    res.json(authors);
});

//Add an author
router.post('/authors', (req, res) => {
    const {id, name, lastname} = req.body;
    if(id && name && lastname){
        const newAuthor = {...req.body};
        authors.push(newAuthor);
        res.json({'added': 'ok'});
    } else{
        res.status(400).json({'statusCode': 'Bad Request'});
    }
});

//Modify an author
router.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    authors.forEach(author => {
        if(author.id == id){
            const {id, name, lastname} = req.body;
            author.id = id;
            author.name = name;
            author.lastname = lastname;
        }      
    });
    res.json(authors);
});

//Delete an author with his books
router.delete('/authors/:id', (req, res) => {
    const id = req.params.id;

    authors.forEach(author => {
        if(author.id == id){

            _.remove(authors, (author) => {
                return author.id == id;
            });

            _.remove(books, (book) =>{
                return book.authorId == id
            });

            res.json(books);
        } else {
            // res.status(400).json({'statusRequest': 'Bad Request'});
        }
    });
});

module.exports = router;