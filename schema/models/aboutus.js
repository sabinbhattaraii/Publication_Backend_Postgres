import  Sequelize, {DataTypes} from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres";

export const AboutUs = sequelize.define(
    "AboutUs",
    {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
        }
    },
    { freezeTableName : true }
);