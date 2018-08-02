let path = require("path");
let logger = require(path.join(__dirname,"logger/logger.js"))
let Bot = require(path.join(__dirname,"discord/bot.js"));
let channels = require(path.join(__dirname,"discord/channels.js"))
let credentials;
try
{
    credentials = require(path.join(__dirname,"credentials/credentials.json"));
}
catch(E)
{
    logger.error("No local credentials");
}
try
{
    logger.log("Starting bot")
    let bot;
    if(credentials)
    {
        bot = new Bot(credentials.CLIENT_ID);
    }
    else
    {
        bot = new Bot();
    }
    bot.addListeners();
    bot.run();
}
catch(E)
{
    logger.error(E)
}