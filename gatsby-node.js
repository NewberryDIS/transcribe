const path = require('path');
const data = require('./src/data/items.json');

exports.createPages =  async ({ page, actions }) => {
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
    });

        // search pages
    // const searchTemplate = path.resolve(`./src/templates/search-template.js`);
    // if (page.path.match(/search/)) {
    //     let params
    //     createPage({
    //         path: `/search/${params}`,
    //         component: searchTemplate,
    //     })
    // }
};
