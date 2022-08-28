import { Type  as TypeModel } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class Type {

    async create( req, res ){
        const name = req.body?.name

        const type = await TypeModel.create({ name })
        return res.json( type )
    }

    async getAll( req, res ){
        const types = await TypeModel.findAll();
        return res.status(200).json(types)
    }
}

export default new Type()