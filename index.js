const DEFAULT_READ_VALUE = false;
const TITLE_INPUT = document.getElementById("title");
const AUTHOR_INPUT = document.getElementById("author");
const PAGES_INPUT = document.getElementById("pages");
const BOOK_FORM = document.getElementById("book-form");
const DISPLAY_BTN = document.getElementById("display-btn");
const BOOKS_GRID = document.getElementById("books-grid");

const BOOK_CARD_TEMPLATE = document.getElementById("book-card-template");

const BOOKS = [
  new Book("The Hobbit", "J.R.R Tolkien", 295, false),
  new Book("Jamais plus", "Colleen Hoover", 25, true),
];

const setReadStatus = (bookIndex, status) => {
  BOOKS[bookIndex].read = status;
  displayBooks();
};

const addBook = (book) => {
  BOOKS.push(book);
  displayBooks();
};

const removeBookByIndex = (index) => {
  BOOKS.splice(index, 1);
  displayBooks();
};

const displayBooks = () => {
  BOOKS_GRID.innerHTML = "";
  BOOKS.forEach((book, index) => {
    const bookCard = BOOK_CARD_TEMPLATE.cloneNode(true);
    const bookReadIcon = bookCard.querySelector(".book-read-icon");

    bookCard.querySelector(".book-title").textContent = book.title;
    bookCard.querySelector(".book-author").textContent = book.author;
    bookCard.querySelector(".book-pages").textContent = book.pages;
    bookCard.querySelector(".book-read").textContent = `${
      book.read ? "read" : "not read"
    }`;

    bookCard.querySelector(".book-delete-icon").onclick = () =>
      removeBookByIndex(index);

    bookReadIcon.onclick = () => setReadStatus(index, !book.read);
    bookReadIcon.classList.add(
      `${book.read ? "book-read-true" : "book-read-false"}`
    );

    bookCard.removeAttribute("id");
    bookCard.removeAttribute("hidden");
    BOOKS_GRID.appendChild(bookCard);
  });
};

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;

  this.info = () =>
    `${this.title} by ${this.author}, ${this.page} pages, ${
      this.read ? "read" : "not read yet"
    }.`;
}

BOOK_FORM.onsubmit = (event) => {
  event.preventDefault(); //prevent page reloading.
  addBook(
    new Book(
      TITLE_INPUT.value,
      AUTHOR_INPUT.value,
      PAGES_INPUT.value,
      DEFAULT_READ_VALUE
    )
  );
  console.log(BOOKS);
};

DISPLAY_BTN.onclick = displayBooks;
