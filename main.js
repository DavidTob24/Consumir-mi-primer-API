const API_KEY = 'live_BbbW8c9j31q4eM5Jqycu84BOB15VXdfKHyNw1kDUko3YEeToILaf2Gk7JIdqNYMI';
const API_URL_RANDOM = `https://api.thedogapi.com/v1/images/search?limit=2&api_key=${API_KEY}`;
const API_URL_FAV = `https://api.thedogapi.com/v1/favourites?limit=20&api_key=${API_KEY}`;

const spanError = document.getElementById('error');

const loadRandomDogs = async () => {
    try {
        const res = await fetch(API_URL_RANDOM);
        const data = await res.json();

        if (res.status !== 200) {
            spanError.innerHTML = `Hubo un error: ${res.status} ${res.statusText}`;
        } else {
            console.log('RANDOM', data);
            const img1 = document.getElementById('img1');
            const img2 = document.getElementById('img2');
      
            img1.src = data[0].url;
            img2.src = data[1].url;
        }
    } catch (error) {
        spanError.innerHTML = `Hubo un error: ${error.message}`;
    }
};

const loadFavoriteDogs = async () => {
    try {
        const res = await fetch(API_URL_FAV);
        const data = await res.json();
        
        if (res.status !== 200) {
            spanError.innerHTML = `Hubo un error cargando favoritos: ${res.status} ${res.statusText}`;
        } else {
            console.log('FAVOURITES', data);
            // Aquí puedes agregar el código para mostrar los favoritos
        }
    } catch (error) {
        spanError.innerHTML = `Hubo un error cargando favoritos: ${error.message}`;
    }
};

const saveFavouriteDogs = async () =>{
    try{
        const res = await fetch(API_URL_FAV,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                image_id:"XXNYMzrDO"

            })
        })

        const data = await res.json()

        if(res.status !== 200) {
            spanError.innerHTML = `Hubo un error cargando favoritos: ${res.status} ${res.statusText}`
        } else{
            console.log('Save',data)
        }


    }catch(error){
        spanError.innerHTML = `Hubo un error cargando favoritos: ${error.message}`;
    }
}

const refreshContent = () => {
    loadRandomDogs();
};

loadRandomDogs();
loadFavoriteDogs();
saveFavouriteDogs();

const refresh = document.getElementById('refresh-button');
refresh.addEventListener('click', refreshContent);