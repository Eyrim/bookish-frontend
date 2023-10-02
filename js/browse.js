window.onload = () => {
    let cachedBookData = {};

    const clearBookTags = function() {
        let bookContainer = document.getElementById("books-container");
        while (bookContainer.firstChild) {
            bookContainer.removeChild(bookContainer.firstChild);
        }
    }

    const setBookDataTags = function(json) {
        if (json == null) {
            console.error("No input data");
            return;
        }
        console.log(json);

        let bookContainer = document.getElementById("books-container");
        let bookEntry;
        let bookNameElement;
        let bookGenreElement;
        let bookAuthorElement;
        let bookArtContainer;
        let bookArtElement;
        let counter = 0;

        for (const val of json) {
            bookEntry = document.createElement('span');
            bookEntry.className = "book-entry";
            bookEntry.id = `book-entry-${counter}`;

            bookNameElement = document.createElement('span');
            bookNameElement.className = "book-name";
            bookNameElement.id = `book-name-${counter}`;
            
            bookGenreElement = document.createElement('span');
            bookGenreElement.className = "book-genre";
            bookGenreElement.id = `book-genre-${counter}`;

            bookAuthorElement = document.createElement('span');
            bookAuthorElement.className = "book-author";
            bookAuthorElement.id = `book-id-${counter}`;

            bookArtContainer = document.createElement('span');
            bookArtContainer.className = "book-art-container";
            bookArtContainer.id = `book-art-container-${counter}`;

            bookArtElement = document.createElement('img');
            bookArtElement.src = val.coverArtUrl;
            bookArtElement.className = "book-art-element";
            bookArtElement.id = `book-art-element-${counter}`;

            bookNameElement.innerText = val.bookName;
            bookGenreElement.innerText = val.genre;
            bookAuthorElement.innerText = val.author.name;

            bookArtContainer.appendChild(bookArtElement);
            bookEntry.appendChild(bookNameElement);
            bookEntry.appendChild(bookGenreElement);
            bookEntry.appendChild(bookAuthorElement);
            bookEntry.appendChild(bookArtContainer);
            bookContainer.appendChild(bookEntry);
        }
    }

    // When the user submits the field
    document.getElementById("book-search-bar").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (event.target.value === "") {
                clearBookTags();
                setBookDataTags(cachedBookData);
                return;
            }

            let url = "http://localhost:8080/books/search/";
            url += event.target.value;

            fetch(url, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            })
            .then((data) => data.json())
            .then((json) => {
                // Clear bookContainer
                clearBookTags();
                setBookDataTags(json);
            })
            .catch((err) => console.error(err));
        }
    });

    fetch("http://localhost:8080/books", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        }
    )
    .then((data) => data.json())
    .then((json) => {
        cachedBookData = json;
        setBookDataTags(json);
    })
    .catch((err) => console.error(err));
}