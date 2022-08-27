import express from 'express';
import cors from 'cors';

import sequelize from './db.js';
import * as models from './models/models.js';
import router from './routes/index.js';

import {config} from 'dotenv';
config();

const app = express();

app
    .use( cors() )
    .use( '/api', router )
    .use( express.json() );

app.get('/', ( req, res ) => {
    res.status(200).json({message: 'Working'})
})

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        const PORT = process.env.PORT || 5000

        app.get('/', ( req, res )=>{
            return res.status(200).send('<h1>Hello People!</h1>')
        })

        app.listen( PORT , ( err )=>{
            if( err ) return console.log(err)

            console.log('Server Started!')
        })
    }catch( err ){
        console.error(err)
    }
}

start();