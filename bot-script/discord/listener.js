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
module.exports = Listener;