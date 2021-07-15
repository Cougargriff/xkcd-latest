const xkcd = require('../lib/xkcd.js');

let comics = {};

comics.getLatest = (req, res) => {
    xkcd.getSpecific(null, (err, img) => {
        if (err) {
            res.status(400).json({
                error: true,
                message: 'Couldn\'t grab latest comic'
            });
        }
        res.set('Content-Type', 'image/png');
        res.send(img);
    });
};

comics.getRandom = (req, res) => {
    const min = req.params.min || 1;
    const max = req.params.max || 2400;

    const randomBetween = (i, j) => {
        return Math.floor(
            Math.random() * (j - i) + i
        );
    };
    xkcd.getSpecific(randomBetween(min, max), (err, img) => {
        if (err) {
            res.status(400).json({
                error: true,
                message: 'Couldn\'t grab latest comic'
            });
        }
        res.set('Content-Type', 'image/png');
        res.send(img);
    });

};

comics.default = (req, res) => {
    res.send(`Wrong path. Try ${req.baseUrl}/xkcd-latest`)
};

module.exports = comics;
