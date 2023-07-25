const books =[ {
    ISBN: "1605Book",
    title : "Tesla!!",
    pubDate: "2021-08-05",
    language:"en",
    numPage: 250,
    author : [1,2],
    publications :[1],
    category:["tech","space","education"]
}
];

const author = [
    {
        id:1,
        name: "Raushani",
        books: ["1605Book", "SecretStoryBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["1605Book"] 
    }
];

const publication = [
    {
        id:1,
        name: "writex",
        books: ["1605Book"]
    }
]

// for rxporting this file
module.exports = {books,author, publication};