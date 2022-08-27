class User{
    async registration( req, res ){
        return res.status(201).json({message: 'I\'m from class User!'})
    }

    async login( req, res ){

    }

    async check( req, res ){
        
    }
}

export default new User()