const form = document.querySelector('form');

const loading = document.querySelector('.loading'); 
loading.style.display = '';

const woofsElement = document.querySelector('.woofs');

const API_URL = 'http://localhost:5000/woofs';

listAllWoofs(); //#endregion
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
        form.reset();
        form.style.display = '';
        loading.style.display = 'none';
    });
});

function listAllWoofs() {
    fetch(API_URL)
        .then(response => response.json())
        .then(woofs => {
            console.log(woofs);
            woofs.forEach(woof => {
                const div = document.createElement('div');
                
                const header = document.createElement('h3');
                header.textContent = woof.name;

                const contents = document.createElement('p');
                contents.innerHTML = '<i>' + woof.message + '</i>';

                div.appendChild(header);
                div.appendChild(contents);

                woofsElement.appendChild(div);
                
            });
            loading.style.display = 'none';
        });

        
    }
   
    