let path = require("path");
let logger = require(path.join(__dirname,"logger/logger.js"))
let Bot = require(path.join(__dirname,"discord/bot.js"));
let channels = require(path.join(__dirname,"discord/channels.js"))
let guilds = require(path.join(__dirname,"discord/guilds.js"))
let cache = require(path.join(__dirname,"cache/cache.js"))
cache.get();
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
//Cache active channels and guilds

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup)
    { 
        let cacheData = {
            "guilds" : global.guilds?global.guilds:{},
            "channels" : global.channels?global.channels:{},
        }
        cache.save(cacheData);
        process.exit();  
    };
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));