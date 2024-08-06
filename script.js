const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.toggleRead = function (){
    this.read = !this.read;
}

let addBookbtn = document.getElementById("addBook");
let dialog = document.getElementById("dialogBook");
let confirmBtn = document.getElementById("confirmBtn");

let titleBook = document.getElementById("title");
let authorBook = document.getElementById("author");
let pagesBook = document.getElementById("pages");
let readBook = document.getElementById("read");
let urlFrontpageBook = document.getElementById("url");



addBookbtn.addEventListener("click", () => {
    dialog.showModal();
})