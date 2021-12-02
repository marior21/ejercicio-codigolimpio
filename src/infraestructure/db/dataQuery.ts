import Db from './index';

export default class DataQuery {
    public static getConfigurations(): Promise<any> {
        return Db.query('SELECT * FROM scheduler_configurations', null);
    }
};