const express = require("express");

exports.success = (res, data, message) => {
  res.status(200).jsonp({
    code: 200,
    message: message ? message : "Success",
    data: data
  });
};

exports.notFound = (res, message) => {
  res.status(404).jsonp({
    code: 404,
    message: message ? message : "Not Found"
  });
};

exports.badRequest = (res, message) => {
  res.status(400).jsonp({
    code: 400,
    message: message ? message : "Bad request"
  });
};
