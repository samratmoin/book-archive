// searching books
const searchBookInfo = () => {
  const searchInput = document.querySelector("#search-field");
  const searchText = searchInput.value;
  //   console.log(searchText);
  searchInput.value = "";
  if (searchText.length > 0) {
    document.getElementById("spinner").classList.remove("d-none");
    // toggleSearchResult("none");
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayInput(data.numFound));
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayBookInfo(data.docs.slice(0, 20)))

      .catch((err) => {
        errorMessage();
      });
  } else {
    document.getElementById("error-message").innerHTML =
      "<p class='text-center p-3 bg-danger'><b class='text-white'>Please enter a book name...</b></p>";
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
          <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="book" />
          <div class="card-body">
              <h3 class="card-title">${book.title}</h3>
              <p class="card-text text-primary"><span class="text-dark">Author : </span>${book?.author_name}</p>
              <p class="card-text"><span class="text-secondary">Publisher:</span> ${book?.publisher}</p>
              <p class="card-text"><span class="text-secondary">First Publish in </span> ${book.first_publish_year}</p>
              
          </div>
                        
    `;
    searchBooks.appendChild(div);
  });
  document.getElementById("spinner").classList.add("d-none");
  // toggleSearchResult("block");
};

// showing error
const errorMessage = () => {
  const inputValue = document.querySelector("#search-field").value;
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.innerHTML = ` <div class="card m-auto p-5 bg-danger" style="width: 18rem">
            <p class="card-text text-white">
              Your search <b>${inputValue}</b> did not match any of book name. Please enter a
              valid book name.
            </p>
          </div>`;
};

// ==========================================================
const toggleSearchResult = (displayStyle) => {
  document.querySelector("#search-result").style.display = displayStyle;
};

const displayInput = (data) => {
  console.log(data);
  document.getElementById(
    "item-found"
  ).innerHTML = `<p class='text-center p-3 bg-success'><b class="text-white">${data} Result Found!</b></p>`;
};
