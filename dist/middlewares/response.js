"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.response = response;

function response(res, status, content) {
  if (status === 200) {
    return res.status(status).json({
      ok: true,
      data: content
    });
  }

  res.status(status).json({
    ok: false,
    message: content
  });
}