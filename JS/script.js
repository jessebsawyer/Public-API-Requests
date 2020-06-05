// Global Variables
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
let current = 1;

// Create Search Bar
searchDiv.innerHTML = 
`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

// Grab ID's of Search Input
const searchSubmit = document.getElementById('search-submit');
const searchSpace = document.getElementById('search-input');

// API Selector Function
function getApi(url) {
   return fetch(url)
    .then(data => data.json())
    .catch(err => console.log(Error(`Something went wrong ${err}`)))
}
// Call API Function
getApi(url)
.then(data => {
    let people = data.results;
    people.map(person => galleryHtml(person))
})


// Search Event Listeners
searchSubmit.addEventListener('click', searchButton);
searchSpace.addEventListener('keyup', searchInput);

// Helper Functions:

// Display Gallery With Data From API
function galleryHtml(data) {
    this.data = data;
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = ` <div class="card-img-container">
    <img class="card-img" src="${data.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="card-text">${data.email}</p>
        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
    </div>`;
    gallery.appendChild(div);
    modalHtml(this.data, div);
}

// Display Modal of Employee 
function modalHtml(data, div) {
    div.addEventListener('click', () => {
        console.log(data);
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = 
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.dob.date.slice(0,10)}</p>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        </div>`;
        gallery.appendChild(modalContainer);
        // Reference variables Created
        const cards = document.querySelectorAll('.card');
        const x = document.getElementById('modal-close-btn');
        const btnRight = document.querySelector('#modal-next');
        const btnLeft = document.querySelector('#modal-prev');
        // Close Modal When X is Clicked
        closeModal(x, modalContainer);
        // Change Slide When Next/Prev Button Clicked
        changeModal(btnRight, btnLeft);
    });
}

// Close Modal Via X Button
function closeModal(x, modal) {
    x.addEventListener('click', () => modal.remove());
}

// Change Modals
function changeModal(btnNext, btnPrev, modal) {
    btnNext.addEventListener('click', () => {
        console.log('next button clicked');
        
    })
    btnPrev.addEventListener('click', () => {
        console.log('prev button clicked');
    })
}

// Search Employee via Button
function searchButton(e) {
    const searchValue = searchSpace.value.toUpperCase();
    const div = document.querySelectorAll('.card');
    div.forEach(person => {
        let a = person.querySelector('h3');
        if (a.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
            a.parentElement.parentElement.style.display = '';
        }else {
            a.parentElement.parentElement.style.display = 'none';
        }
    })
    e.preventDefault();
}

// Search Employee by Typing
function searchInput() {
    const searchValue = searchSpace.value.toUpperCase();
    const div = document.querySelectorAll('.card');
    div.forEach(person => {
        let a = person.querySelector('h3');
        if (a.innerHTML.toUpperCase().includes(searchValue) ) {
            a.parentElement.parentElement.style.display = '';
        }else {
            a.parentElement.parentElement.style.display = 'none';
        }
    })
}
