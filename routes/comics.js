const request = require('request');
const URL = 'https://xkcd.com/info.0.json';
let comics = {};

comics.getLatest = (req, res) => {
    return request(URL, (err, response, bdy) => {
        if (err) {
            res.status(400).json({
                err: true,
                msg: 'Request to xkcd failed'
            });
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
                    res.status(400).json({
                        err: true,
                        msg: 'Failed to grab comic'
                    });
                }
                res.set('Content-Type', 'image/png');
                res.send(bdy);
            
            });
        } catch (e) {
            res.status(400).json({
                err: true,
                msg: 'Failed to parse xkcd response'
            });
        }
    });
};

comics.default = (req, res) => {
    res.send(`Wrong path. Try ${req.baseUrl}/xkcd-latest`)
}

module.exports = comics;