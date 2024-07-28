const express = require('express');
const cors  = require('cors');
const { appEvents, delivery } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api
    // appEvents(app);

    const channel = await CreateChannel()

    
    delivery(app,channel);
    // error handling
    
}
