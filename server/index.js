import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import sequelize from './db.js';
import router from './routes/index.js';
import ErrorHandling from './middleware/ErrorHandling.js';

import {config} from 'dotenv';
config();

const app = express();

app
    .use( cors() )
    .use( express.json() )
    .use( fileUpload({}) )
    .use( '/api', router )
    .use( ErrorHandling );

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        const PORT = process.env.PORT || 5000;

        app.listen( PORT , ( err )=>{
            if( err ) return console.log(err)

            console.log('Server Started!')
        })
    }catch( err ){
        console.error(err)
    }
}

start();