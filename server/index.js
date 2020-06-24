const express = require('express');

const cors = require('cors');

const monk = require('monk');

const badWords = require('bad-words');

const rateLimiter = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/woofer');
const woofs = db.get('woofs');
const filter = new badWords();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Woof Woof! 🐶🐕'
    });
});

app.get('/woofs', (req, res) => {
    woofs
        .find()
        .then(woofs => {
            res.json(woofs);
        });
});

function isValidWoof(woof) {
    return woof.name && woof.name.toString().trim() != '' &&
    woof.message && woof.message.toString().trim() != '' 
}

app.use(rateLimiter({
    windowMs: 5 * 1000,
    max: 1
}));

app.post('/woofs', (req, res) => {
    if(isValidWoof(req.body)){
        const woof = {
            name: filter.clean(req.body.name.toString()),
            message: filter.clean(req.body.message.toString()),
            created: new Date()
        };

        console.log(woof);
        woofs
            .insert(woof)
            .then(newWoof => {
                res.json(newWoof);
            });
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