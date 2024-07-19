const API_KEY = 'live_BbbW8c9j31q4eM5Jqycu84BOB15VXdfKHyNw1kDUko3YEeToILaf2Gk7JIdqNYMI';
const API_URL_RANDOM = `https://api.thedogapi.com/v1/images/search?limit=2&api_key=${API_KEY}`;
const API_URL_FAV = `https://api.thedogapi.com/v1/favourites?limit=40&api_key=${API_KEY}`;
const API_URL_FAV_DEL = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=${API_KEY}`;
const API_URL_upload = 'https://api.thedogapi.com/v1/images/upload'


const spanError = document.getElementById('error');

const loadRandomDogs = async () => {
    try {
        const res = await fetch(API_URL_RANDOM);
        const data = await res.json();

        if (res.status !== 200) {
            spanError.innerHTML = `Hubo un error: ${res.status} ${res.statusText}`;
            return;
        }

        console.log('RANDOM', data);
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
      
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteDog(data[0].id);
        btn2.onclick = () => saveFavouriteDog(data[1].id);
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
            return;
        }else{
            const section = document.getElementById('favoriteDogs');
            section.innerHTML = "";

            const h2 = document.createElement('h2');
            h2.textContent = 'Perritos favoritos';
            section.appendChild(h2);

            console.log('FAVOURITES', data);


            data.forEach(dog => {
                const article = document.createElement('article');
                const img = document.createElement('img');
                const button = document.createElement('button');
                const btntext = document.createTextNode('Sacar perrito de favs');

                img.className = 'fav_img'
                img.src = dog.image.url;
                button.appendChild(btntext);
                button.onclick = () => deleteFavouriteDog(dog.id);
                article.appendChild(img);
                article.appendChild(button);
                section.appendChild(article);
            });
        }

    } catch (error) {
        spanError.innerHTML = `Hubo un error cargando favoritos: ${error.message}`;
    }
};

const saveFavouriteDog = async (id) => {
    try {
        const res = await fetch(API_URL_FAV, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: id
            })
        });

        const data = await res.json();

        if (res.status !== 200) {
            spanError.innerHTML = `Hubo un error guardando favorito: ${res.status} ${res.statusText}`;
        } else {
            console.log('Save', data);
            loadFavoriteDogs();
        }
    } catch (error) {
        spanError.innerHTML = `Hubo un error guardando favorito: ${error.message}`;
    }
};

const deleteFavouriteDog = async (id) => {
    try {
        const res = await fetch(API_URL_FAV_DEL(id), {
            method: 'DELETE'
        });

        const data = await res.json();

        if (res.status !== 200) {
            spanError.innerHTML = `Hubo un error eliminando favorito: ${res.status} ${res.statusText}`;
        } else {
            console.log('Imagen eliminada de favoritos', data);
            loadFavoriteDogs();
        }
    } catch (error) {
        spanError.innerHTML = `Hubo un error eliminando favorito: ${error.message}`;
    }
};

const refreshContent = () => {
    loadRandomDogs();
};

console.log("main.js está cargado correctamente");

const uploadDogimg = async () => {
    const form = document.getElementById('uploading-form');
    const formData = new FormData(form);

    try {
        const res = await fetch(API_URL_upload, {
            method: 'POST',
            headers: {
                'X-API-KEY': API_KEY
            },
            body: formData,
        });

        if (res.status !== 201) {
            spanError.innerHTML = `Hubo un error subiendo la imagen: ${res.status} ${res.statusText}`;
            return;
        }

        const data = await res.json();
        console.log('Imagen subida:', data);
        console.log(data.url)

        saveFavouriteDog(data.id); // Guarda la imagen subida como favorita

    } catch (error) {
        spanError.innerHTML = `Hubo un error subiendo la imagen: ${error.message}`;
    }
};



loadRandomDogs();
loadFavoriteDogs();

const refresh = document.getElementById('refresh-button');
refresh.addEventListener('click', refreshContent);
