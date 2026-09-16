const { GOOGLE_BOOKS_API_KEY } = process.env;

const googleBookService = {

    searchBooks: async (query) => {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}`

            const res = await fetch(url);
            console.log(res.status);
            if (res.status === 200) {
                const data = await res.json();

                const filtered = data.items
                    // filtering items that contains 1) .industryIdentifiers 2)if there, we filter again(.some) only the items that has ISBN_13
                    .filter((item) => {

                        return item.volumeInfo.industryIdentifiers &&
                            item.volumeInfo.industryIdentifiers.some((isbn) => isbn.type === "ISBN_13")
                    })
                    //filtering new array from .filter() chossing which data to show: 
                    .map((item) => {
                        //we extract only ISBN13 (already there because of filter) rather than other type of ISBN
                        const isbn13 = item.volumeInfo.industryIdentifiers.find((isbn) => isbn.type === "ISBN_13")
                        return {
                            title: item.volumeInfo.title,
                            authors: item.volumeInfo.authors,
                            isbn: isbn13.identifier,
                            cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null
                        }
                    });

                return filtered
            }
            if (res.status === 400) {
                return null
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    },

    getBookDetails: async (volumeId) => {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${GOOGLE_BOOKS_API_KEY}`

            const res = await fetch(url);
            if (res.status === 200) {
                const data = await res.json();
                const isbn13 = data.volumeInfo.industryIdentifiers.find((isbn) => isbn.type === "ISBN_13")

                return {
                    title: data.volumeInfo.title,
                    authors: data.volumeInfo.authors,
                    pubDate: data.volumeInfo.publishedDate,
                    isbn: isbn13.identifier,
                    cover: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : null,
                    description: data.volumeInfo.description
                }
            }
            if (res.status === 400) {
                return null
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports= googleBookService;