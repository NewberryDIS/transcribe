const path = require('path');
const data = require('./src/data/items.json');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    // Your component that should be rendered for every item in JSON.
    const template = path.resolve(`./src/templates/item-template.js`);

    // Create pages for each JSON entry.
    data.forEach(item => {
        var path = 'items/' + item.id;
        createPage({
            path,
            component: template,
            context: item,
        })
    });
};
