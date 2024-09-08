# Llbrary
This is a library app in which you can add books for their track with the general information.

* You can changue his status whether the book is read or not read.

* If the book is in the favs categories.

* Also you can filter the books using his current book status in the sidebar.

* The library uses form validation when you try to add new book with two required inputs
* The form also has some visual support (inputs are labeled) for users. 

## Skills 
The current project was built with html, css and javascript.

### HTML

The html was used for the web maquetation and to build a templateCard that I use with JS to generate the books, I tried to use ID and Clases in html to improve my capacity to style the pague with CSS.

### CSS

I use different displays to style the pague. The general style of the pague, per say how the sections of the pague are positioning in the window is styled with CSS grid thinking about as a display that focuses on how to display the entire web. I use a lot of CSS Flexbox to display things that relying in the content of the elements, also I use some or other if they achieve the goal with less lines.

### JS
I use object constructors to construct every book and push them  into an array.

I use a lot JS to show the dialog when the button ADD is clicked. And to add a support to the user when they add a book with comes with some validation with  JS.

Also was the tool in which I generate the book cards inside the library. I relationate the Book object id with the bookcard in the html to track the changues in their status both on HTML and myLibrary array.

I understand or learn that I only can  attach event listeners to elements that alredy exits in the DOM so I attach the event listeners of the buttons of the bookcards inside of the displayCardsBook (or something like that) function to listen correctly the buttons.

I use JS to filter the books depending of their status.

### 08/09/2024

I refactor the library project to use classes instead of objects and object constructors.