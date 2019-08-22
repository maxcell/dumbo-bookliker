// When the DOM FINISHES loading, it will execute anything inside
// of the callback
document.addEventListener("DOMContentLoaded", function() {

  // Event DELEGATION
  // Tell the container what to do when ever it sees this event + the item
  // we want something to fire off

  // Add an eventlistener to the UL
  // if the thing we're targetting is inside of there + is an li
  // we want to make our fetch request

  const listPanel = document.getElementById('list')
  const showPanel = document.getElementById('show-panel')

  listPanel.addEventListener('click', function(e) {
    if(e.target.className === "book"){
      // Alternative way to make event delegation
      // if(e.target.tagName === "LI"){
      
      // GOALS: WHEN CLICKING ON THIS LI
      // FETCH and then show the result on the right side
      const bookId = e.target.dataset.id
      fetch(`http://localhost:3000/books/${bookId}`)
      .then(res => res.json())
      .then(book => {
        // show the results on the right side
        // 1. find it and then put the stuff on the doommmmmmmmm
        showPanel.innerHTML = `<h2>${book.title}</h2>
        <img src=${book.img_url}/>
        <p>${book.description}</p>
        <button>Read Book</button>
        <ul id="user-list"></ul>
        `

        // I know that each time I rewrite the showpanel
        // the event listeners INSIDE of the it go away
        const readButton = showPanel.querySelector('button')

        readButton.addEventListener('click', function(){
          const userObject = {"id":1, "username":"pouros"}

          const newBook = {...book, users: [...book.users, userObject]}

          fetch(`http://localhost:3000/books/${bookId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
          })
          .then(res => res.json())
          .then(book => {
            document.getElementById('user-list').innerHTML += `<li>${userObject.username}</li>`
          })
        })
      })


    }
    
  })


  // 1. Be able to list all the books
  // - First, where is the data coming from? fetch GET
  fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(books => {
    // Take the books and slap on it on the dom
    // 1. Where to add it?
    // 2. How/The shape of that books?

    // append
    // - doesn't mutate the DOM's innerHTML
    books.forEach(book => {
      const liItem = document.createElement("li")
      liItem.innerText = book.title
      liItem.className = "book"
      liItem.dataset.id = book.id
      // liItem.setAttribute("data-id", book.id)

      
      // the place I want to append, then the  item I am trying to it to
      listPanel.append(liItem)
    })


    // innerHTML
    // - this does mutate the innerHTML
    // - if you add eventlisteners to items DIRECTLY INSIDE of the innerHTML
    //    they get removed
    // books.forEach(book => {
    //   listPanel.innerHTML += `<li data-id=${book.id} class="book">${book.title}</li>`
    // })

  })
  



  // 2. When I click on a book I will then render a show for a book
  // 3. When I click on the read book, it should send a patch
});
