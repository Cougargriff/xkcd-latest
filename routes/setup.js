const comics = require('./comics.js');

const routes = [
    {
        path: '/',
        method: 'GET',
        action: [comics.default]
    },
    {
        path: '/xkcd-latest',
        method: 'GET',
        action: [comics.getLatest] 
    },
    {
        path: '/xkcd-random/:min?(-:max)?',
        method: 'GET',
        action: [comics.getRandom] 
    }
];

module.exports = (app) => {
    routes.forEach((route) => {
        const {
            path,
            method,
            action
        } = route;
        app[method.toLowerCase()](path, action[0]);
    })
};
