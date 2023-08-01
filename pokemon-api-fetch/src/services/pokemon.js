export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
    });
};

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
    })
};

export async function getSearchedPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                return response.json()
                } else if(response.status === 404) {
                return Promise.reject("404, pokemon hasn't been found")
                } else {
                return Promise.reject('some other error: ' + response.status)
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch((error, data) => {
                console.log('error is', error);
                reject(data = {})           
            });
    })
};
