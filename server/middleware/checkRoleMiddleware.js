import jwt from 'jsonwebtoken';

export default ( role ) => {
    return ( req, res, next ) => {
        if( req.method == 'OPTIONS' ) 
            next();
    
        try{
    
            const token = req.headers.authorization.split(' ')[1];
    
            if( !token ){
                return res.status( 401 ).json({ message: 'User not autorized' });
            }
    
            const decode = jwt.verify( token, process.env.SECRET_KEY );

            if( decode !== role ){
                return res.status( 403 ).json({ message: 'Permission denied!' });
            }
            req.user = decode;
    
            next();
    
        }catch( e ){
            return res.status( 401 ).json({ message: 'User not autorized' });
        }
    }
}