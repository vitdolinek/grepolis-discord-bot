let path = require("path");
let logger = require(path.join(__dirname,"../logger/logger.js"));
let messageListener = require(path.join(__dirname,"../worker/message-listener.js"));
class Listener
{
    constructor(Bot)
    {
        Bot.on("message",messageListener);//Message from some channel
        Bot.on("ready",startupListener);//Bot startup
        Bot.on("reconnecting",reconnectionListener);//Websocket reconnecting
        Bot.on("resume",resumeListener);//websocket resumed
        Bot.on("debug",debugListener);//websocket debug info
        Bot.on("error",errorListener);//websocket error info
        Bot.on("guildCreate",guildCreateListener);//Bot added to server
        Bot.on("guildDelete",guildDeleteListener);//Bot removed from server
        Bot.on("warn",warningListener);//Discord warnings
    }
}
let startupListener = (param)=>{
    logger.log("Bot logged in")
};
let reconnectionListener = (param)=>{
    logger.log("Bot reconnecting : " + param)
};
let resumeListener =(param)=>{
    logger.log("Bot resuming : " + param)
};
let debugListener =(param)=>{
    logger.log("Bot debug : " + param)
}
let errorListener =(param)=>{
    logger.log("Bot error : " + param)
}
let guildCreateListener =(param)=>{
    logger.log("Bot joined guild : " + param)
}
let guildDeleteListener =(param)=>{
    logger.log("Bot removed from guild : " + param)
}
let warningListener =(param)=>{
    logger.log("Bot warning : " + param)
}

module.exports = Listener;