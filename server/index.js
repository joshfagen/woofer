const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Woof Woof! 🐶🐕'
    });
});

function isValidWoof(woof) {
    return woof.name && woof.name.toString().trim() != '' &&
    woof.message && woof.message.toString().trim() != '' 
}

app.post('/woofs', (req, res) => {
    if(isValidWoof(req.body)){
        const woof = {
            name: req.body.name.toString(),
            message: req.body.message.toString()
        };

        console.log(woof);
    } else {
        res.status(402);
        res.json({
            message: "Bark Bark!! Please re-enter with a name and a woof."
        });
    }
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');

});