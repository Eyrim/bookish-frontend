window.onload = () => {
    fetch("http://localhost:8080/books", {
            method: "GET",
            //mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        }
    )
    .then((data) => data.json())
    .then((json) => {
        let bookContainer = document.getElementById("books-container");
        let bookEntry;
        let bookNameElement;
        let bookGenreElement;
        let bookAuthorElement;
        let toAppend = "";
        let counter = 0;
        console.log(json);

        for (const val of json) {
            bookEntry = document.createElement('span');
            bookEntry.className = "book-entry";
            bookEntry.id = `book-entry-${counter}`;

            bookNameElement = document.createElement('span');
            bookNameElement.className = "book-name";
            
            bookGenreElement = document.createElement('span');
            bookGenreElement.className = "book-genre";

            bookAuthorElement = document.createElement('span');
            bookAuthorElement.className = "book-author";

            bookNameElement.innerText = val.bookName;
            bookGenreElement.innerText = val.genre;
            //TODO: Join author and book tables serverside to get author name in this request
            bookAuthorElement.innerText = val.authorId;

            bookEntry.appendChild(bookNameElement);
            bookEntry.appendChild(bookGenreElement);
            bookEntry.appendChild(bookAuthorElement);
            bookContainer.appendChild(bookEntry);
        }
    })
    .catch((err) => console.error(err));
}