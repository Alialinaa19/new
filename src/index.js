import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    input:  document.querySelector("input#search-box"),
    countryInfo: document.querySelector(".country-info"),
    countryList: document.querySelector(".country-list"),
};

refs.input.addEventListener("input", debounce (e => {
         cleanHtml();   
    const countryName = e.currentTarget.value.trim();
    fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data, "dsbgfbgd")
    if(data.length > 10) {
        Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
    }

    else if(data.length > 1 || data.length < 9) {
       insertContent(data)
        
    }
    else {

    }
    })
    .catch((error) =>{
        console.log(error, "huhu")
        if (error.status === 404) {
            Notiflix.Notify.failure(
                "Oops, there is no country with that name"
              );
        }
        
    }
    )
}, 3000));

// function onSearch(e) {
//     debounce (e => {
//     const countryName = e.currentTarget.value;
//     fetch(`https://restcountries.com/v2/name/${countryName}`)
//     .then((response) => response.json())
//     .then((data) => {console.log(data)
//     if(data.length > 10) {
//         Notiflix.Notify.info(
//             "Too many matches found. Please enter a more specific name."
//           );
//     }
//     else if(data.length > 1 || data.length < 9) {
//         insertContent(data)
//     }
//     else {

//     }
//     })
//     .catch((error) =>{
//         if (error.status === 404) {
//             Notiflix.Notify.failure(
//                 "Oops, there is no country with that name"
//               );
//         }
        
//     }
//     )
// }, DEBOUNCE_DELAY)
// }

function createLi(item) {
    item.map(o =>
`<li>
<img src = "${o.flag}" alt ="flag of ${o.name}" >
<p>${o.name}</p>
</li>`)
} 

function generateContent(array) {array.reduce((acc, item) => acc + createLi(item), "")};

const insertContent = (array) => {
const result = generateContent(array);
refs.countryList.insertAdjacentHTML("beforeend", result)
}

function cleanHtml() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }