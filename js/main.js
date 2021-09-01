// searching books
const searchBookInfo = () => {
  const searchInput = document.querySelector("#search-field");
  const searchText = searchInput.value;
  //   console.log(searchText);
  searchInput.value = "";
  if (searchText.length > 0) {
    document.getElementById("spinner").classList.remove("d-none");

    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayBookInfo(data.docs))
      .catch((err) => {
        errorMessage();
      });
  } else {
    document.getElementById("error-message").innerHTML =
      "<p class='text-center p-3 bg-danger'><b>Please enter a book name...</b></p>";
  }
};

// displaying books
const displayBookInfo = (data) => {
  console.log(data);
  const searchBooks = document.querySelector("#search-result");
  searchBooks.textContent = "";
  data.forEach((book) => {
    // console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="..." />
          <div class="card-body">
              <h2 class="card-title">${book.title}</h2>
              <h4>Author - ${book.author_name}</h4>
              <h4><a href="https://openlibrary.org/authors/${book.author_key}.json">
              Author - ${book.author_name}</a></h4>
              <h5>Publisher - ${book.publisher}</h5>
              <h6>First publish in ${book.first_publish_year}</h6>
          </div>
    `;
    searchBooks.appendChild(div);
  });

  document.getElementById("spinner").classList.add("d-none");
};

// showing error
const errorMessage = () => {
  const inputValue = document.querySelector("#search-field").value;
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.innerHTML = ` <div class="card m-auto p-5 bg-danger" style="width: 18rem">
            <p class="card-text text-white">
              Your search <b>${inputValue}</b> did not match any of valid city name. Please enter a
              correct city name.
            </p>
          </div>`;
};
