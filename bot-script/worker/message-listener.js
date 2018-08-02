let path = require("path");
let logger = require(path.join(__dirname,"../logger/logger.js"));
const commands = require("./commands.js");
let messageListener = (message)=>{
    let content = message.content;
    content = content.trim();
    let commandStr = content.toLowerCase();
    let isCommand = commandStr.indexOf("grepo ")==0;
    if(isCommand)
    {
        let command = commandStr.split(" ")[1];
        if(typeof commands[command] == "undefined") command = "help";
        let replyMessage = commands[command](message);
        if(replyMessage)
        {
            message.reply(replyMessage);
        }
    }
}
module.exports = messageListener;