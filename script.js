const myLibrary = [];

function Book(title, author, pages, url, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.url = url;
    this.read = read;
};

Book.prototype.toggleRead = function (){
    this.read = !this.read;
}

function addBook(){
    // get all the inputs values
    let titleBook = document.getElementById("title").value;
    let authorBook = document.getElementById("author").value;
    let pagesBook = document.getElementById("pages").value;
    let urlFrontpageBook = document.getElementById("url").value;
    let readBook = document.getElementById("read").checked;
    
    let book = new Book(titleBook, authorBook, pagesBook, urlFrontpageBook, readBook);

    if (!book) return dialog.close("error");

    // ensures that  all the inputs are filled
    for (propertie in book){
        if (propertie !== "read" && !book[propertie]){
            dialog.close("error");
            return;
        }
    }

    myLibrary.push(book);
    dialog.close("success");
}

let addBookbtn = document.getElementById("addBook");
let dialog = document.getElementById("dialogBook");
let confirmBtn = document.getElementById("confirmBtn");

addBookbtn.addEventListener("click", () => {
    dialog.showModal();
});

confirmBtn.addEventListener("click", event => {
    event.preventDefault();
    addBook();
});

let promptMsg = document.querySelector(".prompt");

dialog.addEventListener("close", () => {
    if (dialog.returnValue === "success"){
        promptMsg.textContent = "Book added"; 
        promptMsg.classList.add("prompt-success");
    } else {
        promptMsg.textContent = "Can not add the book";
        promptMsg.classList.add("prompt-error");
    }
    
    setTimeout(() => {
        promptMsg.classList.remove("prompt-error");
        promptMsg.classList.remove("prompt-success");
    }, 2000);

});