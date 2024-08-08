const myLibrary = [];

function Book(title, author, pages, url, read){
    this.id = -1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.url = url;
    this.read = read;
    this.fav = false;
};

Book.prototype.toggleRead = function (){
    this.read = !this.read;
}

Book.prototype.toggleFav = function (){
    this.read = !this.fav;
}

Book.prototype.setId = function(id){
    this.id = id;
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

    myLibrary.push(book);
    dialog.close("success");
}

function displayBookCards(){
    let librayContainer = document.querySelector(".library");
    myLibrary.forEach((book, index) => {
        let templateCard = document.getElementById("templateCardBook").cloneNode(true);
        templateCard.id = index;
        book.setId(index);
        templateCard.querySelector(".book-front-page-img").src = book.url;
        templateCard.querySelector(".book-title");
        templateCard.querySelector(".book-author");
        librayContainer.appendChild(templateCard);
    });
}

function addDefaultBooks(){
    let TBATEe = new Book("The Beginning After The End Vol. 8", "TurtleMe", 559, 
        "https://elcoleccionistadenovelas.wordpress.com/wp-content/uploads/2023/06/57454646.jpg?w=350&h=560", true);

    let TBATEs = new Book("The Beginning After The End Vol. 7", "TurtleMe", 407, 
        "https://elcoleccionistadenovelas.wordpress.com/wp-content/uploads/2023/06/tbate-libro-7.jpg?w=350&h=560", false);

    let TBATEsix = new Book("The Beginning After The End Vol. 6", "TurtleMe", 392, 
        "https://elcoleccionistadenovelas.wordpress.com/wp-content/uploads/2023/06/tbate-libro-6.png?w=350&h=453", false);
    TBATEsix.toggleFav();

    myLibrary.push(TBATEe);
    myLibrary.push(TBATEs);
    myLibrary.push(TBATEsix);
};

let addBookbtn = document.getElementById("addBook");
let dialog = document.getElementById("dialogBook");
let formDialog = document.querySelector(".form-dialog");

addBookbtn.addEventListener("click", () => {
    dialog.showModal();
});


formDialog.addEventListener("submit", event => {
    event.preventDefault();
    if (!event.target.checkValidity()){
        return;
    }
    addBook();
});



let requiredInputs = document.querySelectorAll("input[required");
requiredInputs.forEach(i => {
    i.addEventListener("input", () => {
        if (!i.validity.valid){
            document.querySelector("#" + i.id + "+ span").classList.add("span-error");
            document.querySelector("#" + i.id + "+ span").classList.remove("span-success");
        } else {
            document.querySelector("#" + i.id + "+ span").classList.add("span-success");
            document.querySelector("#" + i.id + "+ span").classList.remove("span-error");
        }
    });
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

addDefaultBooks();
displayBookCards();