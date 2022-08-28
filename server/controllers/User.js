import ApiError from "../error/ApiError.js";
import { hash, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User as UserModel, Cart } from '../models/models.js';

const generateJwt = ( id, email, role ) => {
    return jwt.sign({
            id,
            email,
            role
        }, 
        process.env.SECRET_KEY,
        {expiresIn: '2h'}
    );
}

class User{
    async registration( req, res, next ){
        const { email, password, role } = req.body;
        if( !email || !password )
            return next( ApiError.badRequest('Emai or password not send!') );


        const candidate = await UserModel.findOne({
            where: { email }
        });

        if( candidate ){
            return next( ApiError.badRequest( 'User with this email address already exists!' ) );
        }
        
        const hashPassword = await hash( password, 5 );
        const user = await UserModel.create({
            email, password: hashPassword, role
        });

        const cart = await Cart.create({
            userId: user.id
        });

        const token = generateJwt( user.id, email, user.role );

        return res.status( 200 ).json( {token} );
    }

    async login( req, res, next ){
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            where: {email}
        })

        if( !user ){
            return next( ApiError.internal('Email is wrong!') );
        };

        const isEqualsPassword = compareSync(password, user.password);
        if( !isEqualsPassword ){
            return next( ApiError.internal('Password not correct!') );
        }

        const token = generateJwt( user.id, user.email, user.role );
        return res.status( 200 ).json( {token} );
    }

    async check( req, res, next ){
        const token = generateJwt( req.user.id, req.user.email, req.user.role );

        return res.json( { token } );
    }
}

export default new User()