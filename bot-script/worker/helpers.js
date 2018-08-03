let core = {};
core["getActiveGuildChannels"] =(guildId,callback)=>{
    let guilds = global.guilds;
    if(typeof guilds[guildId] != "undefined")
    {
        callback(null,guilds[guildId]);
    }
    else
    {
        callback(new Error("GUILD NOT FOUND"));
    }
};
core["addActiveGuildChannels"] =(guildId,channelId,callback)=>{
    let guilds = global.guilds;
    let channels = [];
    if(typeof guilds[guildId] != "undefined")
    {
        channels = guilds[guildId];
        if(channels.indexOf(channelId)==-1)
        {
            channels.push(channelId);
        }
    }
    else
    {
        channels.push(channelId);
    }
    guilds[guildId] = channels;
    global.guilds = guilds;
    callback(null,channels);
};
core["removeActiveGuild"] = (guildId,callback)=>{
    let guilds = global.guilds;
    if(typeof guilds[guildId] != "undefined")
    {
        let channels = guilds[guildId]; 
        for(let i=0;i<channels.length;i++)
        {
            let channelId = channels[i];
            if(typeof global.channels[channelId] !="undefined")
            {
                delete global.channels[channelId];
            }
        }
        delete guilds[guildId];
        global.guilds = guilds;
        callback();
    }
    else
    {
        callback(new Error("GUILD NOT FOUND"));
    }
};

core["removeActiveGuildChannel"] = (guildId,channelId,callback)=>{
    let guilds = global.guilds;
    if(typeof guilds[guildId] != "undefined")
    {
        let channels = guilds[guildId];
        let channelIndex = channels.indexOf(channelId);
        if(channelIndex==-1)
        {
            callback(new Error("Channel NOT FOUND"));
        }
        else
        {
            channels = channels.splice(channelIndex,1);
            guilds[guildId] = channels;
            global.guilds = guilds;
            if(typeof global.channels[channelId] !="undefined")
            {
                delete global.channels[channelId];
            }
            callback(null,channels);
        }
    }
    else
    {
        callback(new Error("GUILD NOT FOUND"));
    }
}

module.exports = core;