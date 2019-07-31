import UserModel from '../models/UserModel';
import { response } from '../middlewares/response';

export function getUsers(req, res) {
    UserModel.findAll().then(users => {
        if (!users) {
            return response(res, 500, 'No hay datos para mostrar');
        }
        response(res, 200, users);
    });
}

export function getUsersPaginate(req, res) {

    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    limit = Number(limit);
    offset = Number(offset);

    UserModel.findAndCountAll({
        where: {
            active: true
        },
        order: [ ['firstname', 'ASC'] ],
        offset: offset,
        limit: limit
    }).then(result => {
        res.json({
            data: result.rows,
            count: result.count
        });
    });
    

}

export function getUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ where: { id: id } }).then(user => {
        if (!user) {
            return response(res, 500, 'El id solicitado no existe');
        }
        
        response(res, 200, user);
    });
}
