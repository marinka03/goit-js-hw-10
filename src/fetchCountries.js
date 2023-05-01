
import Notiflix from 'notiflix';

 function fetchCountries(name){
    // const URL = `https://restcountries.com/v3.1/name/${name}`;
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then((response) => {
        if(!response.ok){
            throw Notiflix.Notify.failure("Oops, there is no country with that name");
        }

        return response.json();
    });
}


export {fetchCountries};
