"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = validateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = require("./response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function validateToken(req, res, next) {
  var token = req.headers['authorization'];

  if (!token) {
    return (0, _response.response)(res, 500, 'Es Token es necesario');
  }

  token = token.split(' ')[1];

  _jsonwebtoken["default"].verify(token, process.env.PRIVATE_KEY, function (err, userToken) {
    if (err) {
      return (0, _response.response)(res, 500, 'Token invalido');
    }

    req.user = userToken;
    console.log(req.user);
    next();
  });
}