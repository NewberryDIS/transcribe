const path = require('path');
const contentjson = require('./src/data/items.json');
const data = contentjson['items']

exports.createPages =  async ({ actions }) => {
    const { createPage } = actions;

        // item pages
    const itemTemplate = path.resolve(`./src/templates/item-template.js`);
    data.forEach(item => {
        var path = 'item/' + item.id;
        createPage({
            path,
            component: itemTemplate,
            context: item,
        })
    })
}