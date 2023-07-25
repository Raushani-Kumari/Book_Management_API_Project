const express = require("express");

// database
const db = require("./database");
const { realpathSync } = require("fs");
const { get } = require("http");
const { publicDecrypt } = require("crypto");

// initialise express
const book_emporium = express();

/*
To get all the books
Route           /
Description     Get all the books
Access          Public
Parameter       NONE
Methods         Get
*/
book_emporium.get("/", (req,res) =>{
    return res.json({books : db.books});
});

/* To get a specific book
Route           /is
Description     Get specific books
Access          Public
Parameter       isbn
Methods         Get

*/
book_emporium.get("/is/:isbn",(req,res) => {
    const getSpecificBook = db.books.filter(
        (book) => book.ISBN === req.params.isbn);

    if(getSpecificBook.length === 0){
        return res.json({error : `No book found for the ISBN of ${req.params.isbn}`})
    }
    return res.json({book : getSpecificBook});
});


/*
To get a list of books based on category
Route           /c
Description     Get specific books on category
Access          Public
Parameter       category
Methods         Get

*/
book_emporium.get("/c/:category", (req,res) => {

    const getSpecificBook = db.books.filter(
        (book) => book.category.includes(req.params.category)
    )
    if (getSpecificBook.length === 0){
        return res.json({error : `No book found for the category of ${req.params.category} `})
    }
    return res.json({book : getSpecificBook});
});

/*
To get a list of books based on languages
Route           /l
Description     Get specific books on category
Access          Public
Parameter       language
Methods         Get
*/

book_emporium.get("/l/:language", (req,res) => {
    const getSpecificBook = db.books.filter (
        (book) => book.language.includes(req.params.language)
    )
    if(getSpecificBook.length === 0){
        return res.json({error : `No book found for the language ${req.params.language}`})
    }
    return res.json({book :getSpecificBook});
})

/* 
To get all the authors
Route           /author
Description     Get all the authors
Access          Public
Parameter       NONE
Methods         Get
*/

book_emporium.get("/author", (req,res) =>{
    return res.json({author : db.author});
});

/*
To get a specific author
Route           /author/id
Description     Get specific author
Access          Public
Parameter       id
Methods         Get

});
*/

book_emporium.get("/author/:id", (req,res) => {
    const getSpecificAuthor = db.author.filter(
        (author) => author.id == req.params.id);

    if(getSpecificAuthor.length === 0){
        return res.json({error : `No author found for the author id ${req.params.id}`})
    }
    return res.json({author : getSpecificAuthor});
});


/*
 To get a list of authors based on BOOKS
Route           /author/book/isbn
Description     Get specific author based on books
Access          Public
Parameter       isbn
Methods         Get
});
*/

book_emporium.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = db.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({error:`No author found for the book of ${req.params.isbn}`});
    }
    return res.json({author:getSpecificAuthor});
})



/*
To get all the publications

Route           /publication
Description     Get all the publication
Access          Public
Parameter       NONE
Methods         Get
});
*/
book_emporium.get("/publication" , (req,res) =>{
    return res.json({publication : db.publication})
})

/*
To get a specific publication
Route           /publication/id
Description     Get specific publication
Access          Public
Parameter       id
Methods         Get

*/

book_emporium.get("/publication/:id", (req, res) =>{
    const getSpecificPublication = db.publication.filter(
        (publication) => publication.id == req.params.id);

        if(getSpecificPublication.length === 0){
            return res.json({error: `No publication for the id ${req.params.id}`})
        }
        return res.json({publication :getSpecificPublication});
});


/*
To get list of publication based on books
Route           /publication/book/isbn
Description     Get list of publication based on books
Access          Public
Parameter       isbn
Methods         Get
*/

book_emporium.get("/publication/book/:isbn",(req,res) => {
    const getSpecificPublication = db.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0){
        return res.json({error:`No book for the publication ${isbn}`})
    }
    return res.json({publication :getSpecificPublication});

})

book_emporium.listen(1600, () => {
    console.log("Server is running");
})