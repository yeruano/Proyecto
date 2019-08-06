"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../database/database"));

var _RoleModel = _interopRequireDefault(require("./RoleModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserModel = _database["default"].define('users', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  lastname: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  role_id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  },
  username: {
    type: _sequelize["default"].TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  active: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

UserModel.belongsTo(_RoleModel["default"], {
  foreignKey: 'role_id'
}); // roleId

var _default = UserModel;
exports["default"] = _default;