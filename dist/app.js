"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _IndexRoutes = _interopRequireDefault(require("./routes/IndexRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// Environment variables
if (process.env.NODE_ENV !== 'production') {
  var result = _dotenv["default"].config();

  if (result.error) {
    throw result.error;
  }

  console.log(result.parsed);
} // Importing all routes


// Initialization
var app = (0, _express["default"])(); // Archivos publicos

app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../public/dist/client'))); // Middlewares

app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
})); // Routes

app.use(_IndexRoutes["default"]);
var _default = app;
exports["default"] = _default;