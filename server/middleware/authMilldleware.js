import jwt from 'jsonwebtoken';

export default ( req, res, next ) => {
    if( req.method == 'OPTIONS' ) 
        next();

    try{

        const token = req.headers.authorization.split(' ')[1];

        if( !token ){
            return res.status( 401 ).json({ message: 'Пользователь не авторизован!' });
        }

        const decode = jwt.verify( token, process.env.SECRET_KEY );
        req.user = decode;

        next();

    }catch( e ){
        return res.status( 401 ).json({ message: 'Пользователь не авторизован!' });
    }
}