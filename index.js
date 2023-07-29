const express = require("express");

// need bodyparser for posting request
var bodyParser = require("body-parser");

// database
const db = require("./database");

// initialise express
const book_emporium = express();

// bodyParser is used to parse the body and allows express to convert the body in json
// urlencoded({extended:true}) means the url passed can contain any strings,objects. 
book_emporium.use(bodyParser.urlencoded({extended:true}));
book_emporium.use(bodyParser.json());

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
Route           /author
Description     Get specific author
Access          Public
Parameter       id
Methods         Get


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
Route           /author/book/
Description     Get specific author based on books
Access          Public
Parameter       isbn
Methods         Get

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

*/
book_emporium.get("/publication" , (req,res) =>{
    return res.json({publication : db.publication})
})

/*
To get a specific publication
Route           /publication
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
Route           /publication/book
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

});


// POST
/*
ADD NEW BOOK

Route           /book/new
Description     Add new book
Access          Public
Parameter       NONE
Methods         POST
*/

book_emporium.post("/book/new", (req, res) => {
//    req.body - to fetch the body
    const newBook = req.body;
    // adding new book i.e pushing the newbook in database
    db.books.push(newBook);
    // returning the updated result
    return res.json({updateBooks : db.books});
});

/*
To add new AUTHOR
Route           /author/new
Description     Add new author
Access          Public
Parameter       NONE
Methods         POST

*/
book_emporium.post("/author/new", (req,res) => {
    // to fetch the body
    const newAuthor = req.body;
    db.author.push(newAuthor);
    return res.json(db.author);
});


/*      POST
To add new PUBLICATION
Route           /publication/new
Description     Add new PUBLICATION
Access          Public
Parameter       NONE
Methods         POST

*/

book_emporium.post("/publication/new", (req,res) => {
    const newPublication = req.body;
    db.publication.push(newPublication);
    return res.json(db.publication);
});

/*         PUT
Route           /publication/update/book
Description     Update/Add new publication
Access          Public
Parameter       isbn
Methods         PUT

*/
book_emporium.put("/publication/update/book/:isbn", (req,res) => {
    // update publication db
    db.publication.forEach((pub)=> {
        if(pub.id === req.body.pubID){
            return pub.books.push(req.params.isbn);
        }
    });
    // upadte the book database
    db.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.body.pubID;
            return;
        }
    });

    return res.json(
        {
            books :db.books,
            publications : db.publication,
            message : "Successfully updated publications"
        }
    );
});


/*         DELETE
Route           /book/delete
Description     delete a book
Access          Public
Parameter       isbn
Methods          DELETE

*/

book_emporium.delete("/book/delete/:isbn", (req,res) => {
    // book that does not match with the isbn is sent and rest will be filtered out

    const updateBookDb = db.books.filter(
        (book) => book.ISBN !== req.params.isbn);
        db.books = updateBookDb;

        return res.json({books : db.books});
});

book_emporium.listen(1600, () => {
    console.log("Server is running");
})