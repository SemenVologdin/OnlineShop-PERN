import sequelize from "../db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

export const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

export const CartDevice = sequelize.define('cart_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

export const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
});

export const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

export const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

export const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    rate: {type: DataTypes.INTEGER, allowNull: false, unique: true}
});

export const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
});

export const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne( Cart );
Cart.belongsTo( User );

User.hasMany( Rating );
Rating.belongsTo( User );

Cart.hasMany( CartDevice );
CartDevice.belongsTo( Cart );

Type.hasMany( Device );
Device.belongsTo( Type );

Brand.hasMany( Device );
Device.belongsTo( Brand );

Device.hasMany( Rating );
Rating.belongsTo( Device );

Device.hasMany( CartDevice );
CartDevice.belongsTo( Device );

Device.hasMany( DeviceInfo, {as: 'info'} );
DeviceInfo.belongsTo( Device );

Type.belongsToMany( Brand, { through: TypeBrand } );
Brand.belongsToMany( Type, { through: TypeBrand } );

