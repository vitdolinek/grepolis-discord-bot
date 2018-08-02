const Discord = require("discord.js");
const Listener = require("./listener.js")
class Bot{
    constructor(CLIENT_ID)
    {
        this.bot = new Discord.Client();
        this.CLIENT_ID = process.env.DISCORD_BOT_ID?process.env.DISCORD_BOT_ID:CLIENT_ID;
        return this;
    }
    run()
    {
        this.bot.login(this.CLIENT_ID)
        return this;
    }
    addListeners()
    {
        new Listener(bot)
    }
};
module.exports = Bot;