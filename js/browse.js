window.onload = () => {
    let cachedBookData;

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
        let bookContainer = document.getElementById("books-container");
        let bookEntry;
        let bookNameElement;
        let bookGenreElement;
        let bookAuthorElement;
        let counter = 0;

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
            bookAuthorElement.innerText = val.author.name;

            bookEntry.appendChild(bookNameElement);
            bookEntry.appendChild(bookGenreElement);
            bookEntry.appendChild(bookAuthorElement);
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