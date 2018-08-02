let log = require("debug")("bot:log");
log.enabled = true;
let error = require("debug")("bot:error");
error.enabled = true;
let Logger = {}
Logger.log = log;
Logger.error = error;
module.exports = Logger;