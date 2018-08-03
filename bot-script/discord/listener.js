let path = require("path");
let logger = require(path.join(__dirname,"../logger/logger.js"));
let messageListener = require(path.join(__dirname,"../worker/message-listener.js"));
let core = require(path.join(__dirname,"../worker/helpers.js"));
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
let startupListener = (...params)=>{
    logger.log("Bot logged in")
    //logger.log(params);//blank
};
let reconnectionListener = (...params)=>{
    logger.log("Bot reconnecting : ");
    logger.log(params);
};
let resumeListener =(...params)=>{
    logger.log("Bot resuming : ");
    logger.log(params);
};
let debugListener =(...params)=>{
    logger.log("Bot debug : " + params );
  //  logger.log(params);//prints heartbeat / websocket logs
}
let errorListener =(...params)=>{
    logger.log("Bot error : ")
    logger.log(params);
}
let guildCreateListener =(guild)=>{
    logger.log("Bot joined guild : " + guild.id)
}
let guildDeleteListener =(guild)=>{
    logger.log("Bot removed from guild : " + guild.id);
    core.removeActiveGuild(guild.id,(err)=>{
        if(err)
        {
            logger.error(err)
        }
        else
        {
            logger.log("Active guild removed: " +  guild.name);
        }
    })
}
let warningListener =(...params)=>{
    logger.log("Bot warning : " + params)
    logger.log(params)
}

module.exports = Listener;