let path = require("path");
let logger = require(path.join(__dirname,"logger/logger.js"))
let Bot = require(path.join(__dirname,"discord/bot.js"));
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
    let bot = new Bot(credentials.CLIENT_ID);
    bot.addListeners();
    bot.run();
}
catch(E)
{
    logger.error(E)
}