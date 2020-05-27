// Global Variables
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');


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
    people.map(person => {
        galleryHtml(person);
    })
})

// Event Listeners
searchSubmit.addEventListener('click', searchButton);
searchSpace.addEventListener('keydown', searchInput);


// Helper Functions:

// Display Gallery With Data From API
function galleryHtml(data) {
    this.data = data;
   const div = document.createElement('div');
   const img = document.createElement('img');
   const divCard = document.createElement('div');
   const divInfo = document.createElement('div');
   const h3 = document.createElement('h3');
   const email = document.createElement('p');
   const location = document.createElement('p');
   div.className = 'card';
   divCard.className = 'card-img-container';
   img.className = 'card-img';
   img.src = data.picture.medium;
   img.alt = 'Profile Picture';
   divInfo.className = 'card-info-container';
   h3.id = 'name';
   h3.className = 'card-name';
   h3.className = 'cap';
   h3.textContent = `${data.name.first}, ${data.name.last}`;
   email.className = 'card-text';
   email.textContent = data.email;
   location.className = 'card-text';
   location.className = 'cap';
   location.textContent = `${data.location.city}, ${data.location.state}`;
   div.appendChild(divCard);
   div.appendChild(divInfo);
   divCard.appendChild(img);
   divInfo.appendChild(h3);
   divInfo.appendChild(email);
   divInfo.appendChild(location);
   gallery.appendChild(div);
   modalHtml(this.data, div);
}

// Display Modal of Employee 
function modalHtml(data, div) {
    div.addEventListener('click', () => {
        console.log(data);
        const modalContainer = document.createElement('div');
        const modalBtnContainer = document.createElement('div');
        const modal = document.createElement('div');
        const x = document.createElement('btn');
        const btnRight = document.createElement('btn');
        const btnLeft = document.createElement('btn');
        const modalInfoContainer = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const email = document.createElement('p');
        const city = document.createElement('p');
        const hr = document.createElement('hr');
        const phone = document.createElement('p');
        const address = document.createElement('p');
        const birth = document.createElement('p');
        modalContainer.className = 'modal-container';
        modalBtnContainer.className = 'modal-btn-container'
        modal.className = 'modal';
        modalInfoContainer.className = 'modal-info-container';
        x.innerHTML = ` <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
        img.className = 'modal-img';
        img.src = data.picture.large;
        img.alt = 'profile picture';
        h3.id = 'name';
        h3.className = 'modal-name';
        h3.textContent = `${data.name.first} ${data.name.last}`;
        h3.className = 'cap';
        email.className = 'modal-text';
        email.textContent = data.email;
        city.className = 'modal-text';
        city.textContent = data.location.city
        phone.className = 'modal-text';
        phone.textContent = data.phone;
        address.className = 'modal-text';
        address.textContent = `${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.postcode}`;
        birth.className = 'modal-text';
        birth.textContent = `Birthday: ${data.dob.date.slice(0,10)}`;
        btnRight.className = 'modal-next';
        btnRight.className = 'btn';
        btnRight.id = 'modal-next';
        btnRight.textContent = 'Next';
        btnRight.type = 'button';
        btnLeft.className = 'modal-prev';
        btnLeft.className = 'btn'
        btnLeft.id = 'modal-prev';
        btnLeft.type = 'button';
        btnLeft.textContent = 'Prev';
        modalContainer.appendChild(modal);
        modalContainer.appendChild(modalBtnContainer);
        modalBtnContainer.appendChild(btnLeft);
        modalBtnContainer.appendChild(btnRight);
        modal.appendChild(x);
        modal.appendChild(modalInfoContainer);
        city.appendChild(hr);
        modalInfoContainer.appendChild(img);
        modalInfoContainer.appendChild(h3);
        modalInfoContainer.appendChild(email);
        modalInfoContainer.appendChild(city);
        modalInfoContainer.appendChild(phone);
        modalInfoContainer.appendChild(address);
        modalInfoContainer.appendChild(birth);
        div.appendChild(modalContainer);
        x.addEventListener('click', () => modalContainer.remove());
    });
}

// Search Employee via Button
function searchButton(e) {
    const searchValue = searchSpace.value.toUpperCase();
    const div = document.querySelectorAll('.card');
    div.forEach(person => {
        let a = person.querySelector('h3');
        if (a.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
            console.log('matched with...', a);
            a.parentElement.parentElement.style.display = '';
        }else {
            console.log('No match');
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
            console.log('matched with...', a);
            a.parentElement.parentElement.style.display = '';
        }else {
            console.log('No match');
            a.parentElement.parentElement.style.display = 'none';
        }
    })
}