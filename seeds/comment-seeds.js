const { Comment } = require('../models');


const commentData = [
    // {
    //     comment_text: "example comment text",
    //     post_id: 2,
    //     user_id: 1
    // },
    
    // {
    //     comment_text: "a second example comment text",
    //     post_id: 3,
    //     user_id: 1
    // },

    // {
    //     comment_text: "a third example comment text",
    //     post_id: 4,
    //     user_id: 1
    // },
    
];


const seedComments = () => Comment.bulkCreate(commentData);


module.exports = seedComments;