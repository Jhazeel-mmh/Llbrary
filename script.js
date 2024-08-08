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
    this.fav = !this.fav;
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
    resetNavItemsStatus();
};

function displayBookCards(library = myLibrary){
    let librayContainer = document.querySelector(".library");
    librayContainer.innerHTML = "";
    library.forEach((book, index) => {
        let templateCard = document.getElementById("templateCardBook").cloneNode(true);
        templateCard.id = index;
        book.setId(index);
        templateCard.querySelector(".book-front-page-img").src = book.url;
        templateCard.querySelector(".book-title").textContent = book.title;
        templateCard.querySelector(".book-author").textContent = book.author;
        templateCard.querySelector(".book-pages").textContent = book.pages;
        if (book.read == true) templateCard.querySelector(".read-btn").classList.add("read");
        if (book.fav == true) templateCard.querySelector(".fav-btn").classList.add("fav");
        librayContainer.appendChild(templateCard);
    });
    attachRemoveListeners();
    changeBtnsStatus();
};

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

function attachRemoveListeners(){
    let removeBtns = document.querySelectorAll(".rm-book");
    removeBtns.forEach(button => {
        button.addEventListener("click", () => {
            let idToRemove = button.parentElement.id;
            myLibrary.forEach(b => {
                if (idToRemove == b.id){
                    myLibrary.splice(idToRemove, 1);
                }
            });
            displayBookCards();
        }); 
    });     
};

function changeTheme(){
    let library = document.querySelector(".library");
    let header = document.querySelector(".header");
    let aside = document.querySelector(".aside");
    let svgs = document.querySelectorAll("img[src$='.svg']")
    let btns = document.querySelectorAll("button");
    let dialog = document.getElementById("dialogBook")
    let dialogInputs = dialog.querySelectorAll("input");

    library.classList.toggle("blackTheme");
    dialog.classList.toggle("blackTheme");
    header.classList.toggle("font-clr-100");
    aside.classList.toggle("font-clr-100");

    svgs.forEach(s => {
        s.classList.toggle("svg-invert");
    });
    btns.forEach(b => {
        b.classList.toggle("font-clr-100")
    });
    dialogInputs.forEach(i => {
        i.classList.toggle("blackTheme");
    });
};

function changeBtnsStatus(){
    let readBtns = document.querySelectorAll(".read-btn");
    let favBtns = document.querySelectorAll(".fav-btn");

    readBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let idOfBook = btn.parentElement.parentElement.id;
            myLibrary.forEach(book => {
                if (book.id == idOfBook) book.toggleRead();
            });
            btn.classList.toggle("read");
        });
    });

    favBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let idOfBook = btn.parentElement.parentElement.id;
            myLibrary.forEach(book => {
                if (book.id == idOfBook) book.toggleFav();
            });
            btn.classList.toggle("fav");

        });
    }); 
};

function resetNavItemsStatus(){
    let navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(n => {
        n.classList.remove("nav-item-active");
    });
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
    displayBookCards();
    formDialog.reset();
    requiredInputs.forEach(i => document.querySelector("#" + i.id + "+ span").classList.remove("span-error", "span-success"));
});



let requiredInputs = document.querySelectorAll("input[required]");
requiredInputs.forEach(i => {
    i.addEventListener("input", () => {
        if (!i.validity.valid){
            // select the correct span element with the id of the input
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

let changeThemeBtn = document.getElementById("colorTheme");
changeThemeBtn.addEventListener("click", changeTheme);

let navItems = document.querySelectorAll(".nav-item");
navItems.forEach(n => {
    n.addEventListener("click", () => {
        navItems.forEach(b => b.classList.remove("nav-item-active"));

        n.classList.toggle("nav-item-active");
        if (n.id == "fav-books"){
            let favBooks = myLibrary.filter(book => book.fav === true);
            displayBookCards(favBooks);
            return;
        }

        if (n.id == "read-books"){
            let readBooks = myLibrary.filter(book => book.read === true);
            displayBookCards(readBooks);
            return;
        }

        if (n.id == "all-books"){
            displayBookCards();
        }

    })

});


addDefaultBooks();
displayBookCards();