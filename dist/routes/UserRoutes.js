"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authorization = require("../middlewares/authorization");

var _UserController = require("../controllers/UserController");

var router = (0, _express.Router)();
router.get('/', _authorization.validateToken, _UserController.getUsers);
router.get('/:id', _authorization.validateToken, _UserController.getUser);
router.post('/register', _UserController.createUser);
router.post('/login', _UserController.login);
router.put('/', _UserController.updateUser);
router["delete"]('/:id', _UserController.deleteUser);
var _default = router;
exports["default"] = _default;