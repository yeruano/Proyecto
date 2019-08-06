"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.getUsersPaginate = getUsersPaginate;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserModel = _interopRequireDefault(require("../models/UserModel"));

var _response = require("../middlewares/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getUsers(req, res) {
  _UserModel["default"].findAll().then(function (users) {
    if (!users) {
      return (0, _response.response)(res, 500, 'No hay datos para mostrar');
    }

    (0, _response.response)(res, 200, users);
  });
}

function getUser(req, res) {
  var id = req.params.id;

  _UserModel["default"].findOne({
    where: {
      id: id
    }
  }).then(function (user) {
    if (!user) {
      return (0, _response.response)(res, 500, 'El id solicitado no existe');
    }

    (0, _response.response)(res, 200, user);
  });
}

function getUsersPaginate(req, res) {
  var limit = req.query.limit || 10;
  var offset = req.query.offset || 0;
  limit = Number(limit);
  offset = Number(offset);

  _UserModel["default"].findAndCountAll({
    where: {
      active: true
    },
    order: [['firstname', 'ASC']],
    offset: offset,
    limit: limit
  }).then(function (result) {
    var data = {
      records: result.rows,
      count: result.count
    };
    (0, _response.response)(res, 200, data);
  });
}

function createUser(req, res) {
  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      role_id = _req$body.role_id,
      username = _req$body.username,
      password = _req$body.password,
      active = _req$body.active;

  _UserModel["default"].findOne({
    where: {
      username: username
    }
  }).then(function (user) {
    if (user) {
      return (0, _response.response)(res, 500, 'El usuario ya existe en la BD');
    }

    _UserModel["default"].create({
      firstname: firstname,
      lastname: lastname,
      role_id: role_id,
      username: username,
      password: _bcrypt["default"].hashSync(password, 10),
      active: active
    }).then(function (user) {
      (0, _response.response)(res, 200, generateToken(user));
    });
  });
}

function updateUser(req, res) {
  var _req$body2 = req.body,
      id = _req$body2.id,
      firstname = _req$body2.firstname,
      lastname = _req$body2.lastname,
      role_id = _req$body2.role_id,
      username = _req$body2.username,
      password = _req$body2.password,
      active = _req$body2.active;

  _UserModel["default"].update({
    firstname: firstname,
    lastname: lastname,
    role_id: role_id,
    username: username,
    password: _bcrypt["default"].hashSync(password, 10),
    active: active
  }, {
    returning: true,
    where: {
      id: id // fields: ['firstname', 'lastname', 'role_id', 'username', 'password', 'active'], // En tal caso que se desee actualizar solo unos campos

    }
  }).then(function (updated) {
    return updated;
  }).spread(function (affectedCount, affectedRows) {
    (0, _response.response)(res, 200, affectedRows);
  });
}

function deleteUser(req, res) {
  var id = req.body.id;

  _UserModel["default"].destroy({
    returning: true,
    where: {
      id: id
    }
  }).then(function (deleted) {
    (0, _response.response)(res, 200, deleted); // return deleted;
  }); // .
  // spread((affectedCount, affectedRows) => {
  // });

}

function login(req, res) {
  var _req$body3 = req.body,
      username = _req$body3.username,
      password = _req$body3.password;

  _UserModel["default"].findOne({
    // attributes: ['firstname', 'lastname', 'role_id', 'username', 'active', 'password'],
    where: {
      username: username
    }
  }).then(function (user) {
    if (!user) {
      return (0, _response.response)(res, 500, '(Usuario) o contraseña incorrectos');
    }

    if (!_bcrypt["default"].compareSync(password, user.password)) {
      return (0, _response.response)(res, 500, 'Usuario o (contraseña) incorrectos');
    }

    (0, _response.response)(res, 200, generateToken(user));
  });
}

function generateToken(user) {
  var data = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    role_id: user.role_id,
    active: user.active
  };
  return {
    user: data,
    expiresIn: process.env.EXPIRED_TOKEN,
    token: _jsonwebtoken["default"].sign(data, process.env.PRIVATE_KEY, {
      expiresIn: process.env.EXPIRED_TOKEN
    })
  };
}