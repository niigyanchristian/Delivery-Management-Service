const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils')

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();

    
    await expressApp(app);
    

    app.listen(PORT, () => {
          console.log(`Delivery is listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        // channel.close();
    })
    

}

StartServer();