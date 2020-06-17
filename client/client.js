const form = document.querySelector('form');

const loading = document.querySelector('.loading'); 
loading.style.display = 'none';

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
    console.log(woof);
});