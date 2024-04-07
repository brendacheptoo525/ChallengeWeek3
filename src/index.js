document.addEventListener("DOMContentLoaded", function () {
    // Define the URL of the database
    const databaseUrl = "db.json";

    // Fetch data from the database URL
    fetchData(databaseUrl)
      .then((data) => {
        // Extract the list of movies from the fetched data
        const movieList = data.films;
        // Display details of the first movie in the list
        displayMovieDetails(movieList[0]);
        // Display the movie menu based on the list of movies
        displayMovieMenu(movieList);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Function to fetch data asynchronously from the specified URL
    async function fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }

    // Function to display details of a movie
    function displayMovieDetails(movie) {
        // Get references to DOM elements
        const elements = {
            title: document.getElementById("title"),
            runtime: document.getElementById("runtime"),
            description: document.getElementById("film-info"),
            showtime: document.getElementById("showtime"),
            ticketNumber: document.getElementById("ticket-num"),
            poster: document.getElementById("poster"),
            buyButton: document.getElementById("buy-ticket")
        };

        // Update DOM elements with movie details
        elements.title.textContent = movie.title;
        elements.runtime.textContent = movie.runtime + " minutes";
        elements.description.textContent = movie.description;
        elements.showtime.textContent = movie.showtime;
        const remainingTickets = movie.capacity - movie.tickets_sold;
        elements.ticketNumber.textContent = remainingTickets + " remaining tickets";
        elements.poster.src = movie.poster;

        // Update buy button based on ticket availability
        if (remainingTickets === 0) {
            elements.buyButton.textContent = "Sold Out";
            elements.buyButton.disabled = true;
        } else {
            elements.buyButton.textContent = "Buy Ticket";
            elements.buyButton.disabled = false;
        }

        // Add event listener to buy button for purchasing tickets
        elements.buyButton.addEventListener("click", function () {
            if (remainingTickets > 0) {
                movie.tickets_sold++;
                displayMovieDetails(movie);
                updateTicketSoldOnServer(movie.id, movie.tickets_sold);
                purchaseTicket(movie.id);
            }
        });
    }

    // Function to display the movie menu
    function displayMovieMenu(movieList) {
        // Get reference to the movie list element
        const movieListElement = document.getElementById("films");

        // Iterate over the list of movies to create list items
        movieList.forEach(movie => {
            const listItemElement = createListItem(movie);
            movieListElement.appendChild(listItemElement);
        });
    }

    // Function to create a list item for a movie
    function createListItem(movie) {
        // Create a list item element
        const listItemElement = document.createElement("li");
        listItemElement.classList.add("film", "item");
        listItemElement.textContent = movie.title;
        
        // Add event listener to list item for displaying movie details
        listItemElement.addEventListener("click", function () {
            displayMovieDetails(movie);
        });

        // Create delete button for removing the movie
        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.textContent = "Delete";
        deleteButtonElement.classList.add("delete-button");
        deleteButtonElement.addEventListener("click", function(event) {
            event.stopPropagation();
            // Remove the list item from the movie list
            listItemElement.parentNode.removeChild(listItemElement);
            // Call function to delete the movie
            deleteMovie(movie.id);
        });

        // Append delete button to list item
        listItemElement.appendChild(deleteButtonElement);

        return listItemElement;
    }

    // Function to update the number of tickets sold on the server
    function updateTicketSoldOnServer(movieId, ticketsSold) {
        console.log("Updating tickets_sold for movie ID:", movieId, "to", ticketsSold);
    }

    // Placeholder function for purchasing tickets
    function purchaseTicket(movieId) {
        // Implement purchase functionality if needed
    }

    // Placeholder function for deleting a movie
    function deleteMovie(movieId) {
        // Implement delete functionality if needed
    }
});
