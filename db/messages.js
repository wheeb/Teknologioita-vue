const Joi = require('joi');
const db = require('./connection');

//checking user inputs for unwanted content
const schema = Joi.object().keys({
    username: Joi.string().alphanum(),
    subject: Joi.string(),
    message: Joi.string().max(500).required(),
    //makes sure that user inputs valid url in url field
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    //if no username is set = set Anonymous as username
    if (!message.username) message.username = 'Anonymous';
    //if no image url set = put this. will go through schema check
    if (!message.imageURL) message.imageURL = 'https://';

    const result = Joi.validate(message, schema);
    if (result.error == null) {
        if (message.imageURL == 'https://') {
            message.imageURL = ' '
        }
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create,
    getAll
};