import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { response } from '../middlewares/response';

export function getUsers(req, res) {

    UserModel.
    findAll().
    then(users => {
        if (!users) {
            return response(res, 500, 'No hay datos para mostrar');
        }
        response(res, 200, users);
    });

}

export function getUser(req, res) {
    
    const { id } = req.params;
    
    UserModel.
    findOne({ where: { id: id } }).
    then(user => {
        if (!user) {
            return response(res, 500, 'El id solicitado no existe');
        }
        
        response(res, 200, user);
    });

}

export function getUsersPaginate(req, res) {

    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    limit = Number(limit);
    offset = Number(offset);

    UserModel.
    findAndCountAll({
        where: {
            active: true
        },
        order: [ ['firstname', 'ASC'] ],
        offset: offset,
        limit: limit
    }).
    then(result => {
        const data = {
            records: result.rows,
            count: result.count
        };
        response(res, 200, data);
    });
    

}

export function createUser(req, res) {

    const { firstname, lastname, role_id, username, password, active } = req.body;

    UserModel.
    findOne({ where: { username: username } }).
    then(user => {
        if (user) {
            return response(res, 500, 'El usuario ya existe en la BD');
        }

        UserModel.
        create({
            firstname: firstname,
            lastname: lastname,
            role_id: role_id,
            username: username,
            password: bcrypt.hashSync(password, 10),
            active: active
        }).
        then(user => {
            response(res, 200, generateToken(user));
        });
        
    });

}

export function updateUser(req, res) {

    const { id, firstname, lastname, role_id, username, password, active } = req.body;

    UserModel.
    update({
        firstname: firstname,
        lastname: lastname,
        role_id: role_id,
        username: username,
        password: bcrypt.hashSync(password, 10),
        active: active
    }, {
        returning: true,
        where: { id: id }
        // fields: ['firstname', 'lastname', 'role_id', 'username', 'password', 'active'], // En tal caso que se desee actualizar solo unos campos
    }).
    then((updated) => {
        return updated;
    }).
    spread((affectedCount, affectedRows) => {
        response(res, 200,  affectedRows);
    });

}

export function deleteUser(req, res) {
    
    const { id } = req.body;

    UserModel.
    destroy({
        returning:  true,
        where: { id: id }
    }).
    then(deleted => {
        response(res, 200,  deleted);
        // return deleted;
    });
    // .
    // spread((affectedCount, affectedRows) => {
    // });
    
}

export function login(req, res) {

    const { username, password } = req.body;

    UserModel.
    findOne({
        // attributes: ['firstname', 'lastname', 'role_id', 'username', 'active', 'password'],
        where: { username: username }
    }).
    then(user => {

        if (!user) {
            return response(res, 500, '(Usuario) o contraseña incorrectos');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return response(res, 500, 'Usuario o (contraseña) incorrectos')
        }

        response(res, 200, generateToken(user));

    });

}

function generateToken(user) {

    const data = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role_id: user.role_id,
        active: user.active
    };

    return {
        user: data,
        expiresIn: process.env.EXPIRED_TOKEN,
        token: jwt.sign(data, process.env.PRIVATE_KEY, {
            expiresIn: process.env.EXPIRED_TOKEN
        })
    };

}

