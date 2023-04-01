const { Post } = require('../models');


const postData = [
    {
        title: 'Example title',
        post_text: 'example post text',
        user_id: 1,
    },

    {
        title: 'A second Example title',
        post_text: 'Another example post text',
        user_id: 1,
    },

    {
        title: 'A third Example title',
        post_text: 'And another example post text',
        user_id: 1,
    },
   
];

const seedPosts = () => Post.bulkCreate(postData);


module.exports = seedPosts;