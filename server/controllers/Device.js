import {v4} from 'uuid';
import path from 'path'
import { Device as DeviceModel, DeviceInfo } from '../models/models.js';
import ApiError from '../error/ApiError.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Device {

    async create( req, res, next ){
        try{
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            const fileName = `${v4()}.jpg`;
            img.mv(path.resolve( __dirname, '..', 'static', fileName ));

            const device = await DeviceModel.create({
                name, price, brandId, typeId, img: fileName
            });

            if( info ){
                info = JSON.parse( info );
                for( let information of info ){
                    DeviceInfo.create({
                        title: information.title,
                        description: information.description,
                        deviceId: device.id,
                    })
                }
            }

            return res.status(200).json(device);
        }catch( error ){
            next( ApiError.badRequest( error.message ) );
        }
    }

    async getAll( req, res ){
        let { brandId, typeId, limit = null, page = null } = req.query;

        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;

        let devices = [];
        if( !brandId && typeId ){
            devices = await DeviceModel.findAndCountAll({where: {typeId}, limit, offset});
        }else if( brandId && !typeId ){
            devices = await DeviceModel.findAndCountAll({where: {brandId}, limit, offset});
        }else if( brandId && typeId ){
            devices = await DeviceModel.findAndCountAll({ where:{ typeId, brandId }, limit, offset });
        }else{
            devices = await DeviceModel.findAndCountAll({ limit, offset });
        }

        return res.status( 200 ).json( devices );
    }

    async getOne( req, res ){
        const { id } = req.params;
        const device = await DeviceModel.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });

        return res.status( 200 ).json( device );
    }

}

export default new Device();