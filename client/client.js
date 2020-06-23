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
        listAllWoofs();
    });
});

function listAllWoofs() {
    woofsElement.innerHTML = '';
    
    fetch(API_URL)
        .then(response => response.json())
        .then(woofs => {
            woofs.reverse();
            woofs.forEach(woof => {
                const div = document.createElement('div');
                
                const header = document.createElement('h3');
                header.textContent = woof.name;
                header.style.fontStyle = 'italic';
                header.style.fontWeight = 'bold';

                const contents = document.createElement('p');
                contents.textContent = woof.message;

                const date = document.createElement('small');
                woofDate = new Date(woof.created);
                date.textContent = woofDate.toDateString();

                
                div.appendChild(header);
                div.appendChild(date);
                div.appendChild(contents);
                

                woofsElement.appendChild(div);
                
            });
            loading.style.display = 'none';
        });

        
    }
   
    