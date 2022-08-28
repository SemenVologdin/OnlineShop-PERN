import { Brand as BrandModel } from '../models/models.js'

class Brand {

    async create( req, res ){
        const name = req.body?.name;
        const brand = await BrandModel.create({ name });

        return res.status(202).json( brand );
    }

    async getAll( req, res ){
        const brands = await BrandModel.findAll();
        
        return res.status(200).json( brands );
    }

}

export default new Brand();