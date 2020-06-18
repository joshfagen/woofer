const form = document.querySelector('form');

const loading = document.querySelector('.loading'); 
loading.style.display = 'none';

const API_URL = 'http://localhost:5000/woofs';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const message = formData.get('message');

    const woof = {
        name,
        message
    };

    form.style.display = 'none';
    loading.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(woof),
        headers: {
            'content-type': 'application/JSON'
        }
    }).then(response => response.json())
    .then(newWoof => {
        console.log(newWoof);
    });
});

