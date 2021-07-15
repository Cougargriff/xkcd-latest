const request = require('request');
let xkcd = {};

const URL = (id) => `https://xkcd.com/${id ? `${id}/` : ''}info.0.json`;

xkcd.getSpecific = (id, cb) => {
   const url = URL(id);

    return request(url, (err, response, bdy) => {
        if (err) {
            cb(true, null);
        }

        try {
            const img = JSON.parse(bdy).img;
            console.log(`Requesting ${img}...`)
            const options = {
                url: img,
                method: 'GET',
                encoding: null
            };
            return request(options, (err, result, bdy) => {
                if (err) {
                    cb(true, null);
                }
                cb(null, bdy);
            });
        } catch (e) {
            cb(true, null);
        }
    });
};

module.exports = xkcd;
