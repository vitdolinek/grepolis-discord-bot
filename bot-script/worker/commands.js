let path = require("path");
let logger = require(path.join(__dirname,"../logger/logger.js"));
let core = require(path.join(__dirname,"../worker/helpers.js"));
let commands = {};
commands["help"] = (message)=>{
    return "help str";
};
commands["startcount"] = (message)=>{
    let channel = message.channel;
    let content = message.content.trim();
    let guild = message.guild;
    content = content.split(" ");
    content.shift();
    content.shift();
    content = content.join(" ");
    //removed commands
    let items = content.trim().split(",");
    for(let i = 0;i<items.length;i++)
    {
      if(items[i]=='')
      {
          items.pop(items[i]);
      }
    }
    if(typeof global.channels[channel.id] != "undefined")
    {
        let activeCommands = global.channels[channel.id];
        if(typeof activeCommands["count"] != "undefined")
        {
            return "This channel already has an active count.\nUse \"grepo endcount\" to stop current count";
        }
    }
    if(items.length==0)
    {
        return "Please give items to count.\ngrepo startcount <item1>,<item2>";
    }
    else
    {
        let countItems = {};
        countItems.items = items;
        countItems.responses = {};
        if(typeof global.channels[channel.id] != "undefined")
        {
            let activeCommands = global.channels[channel.id];
            activeCommands["count"] = countItems;
            global.channels[channel.id] = activeCommands;
        }
        else
        {
            let activeCommands = 
            {
                "count" : countItems
            }
            global.channels[channel.id] = activeCommands;
        }
        let guildId = guild.id;
        core.addActiveGuildChannels(guildId,channel.id,(err,channels)=>{
            if(err)
            {
                logger.error(err);
            }
            else
            {
                logger.log("Added new active channel." + channels);
            }
        });
        logger.log("Count started in channel: " + channel.id);
        return "Count has started for: " + items.join(",").trim();
    }
};
commands["count"] = (message)=>{
    let channel = message.channel;
    let countItems;
    if(typeof global.channels[channel.id] != "undefined")
    {
        let activeCommands = global.channels[channel.id];
        if(typeof activeCommands["count"] != "undefined")
        {
            let activeCommands = global.channels[channel.id];
            countItems = activeCommands["count"];
        }
    }
    else
    {
        return "This channel does not have an active count.\nUse \"grepo startcount <item1>,<item2>\" to start a new count";
    }
    let content = message.content.trim();
    content = content.split(" ");
    content.shift();
    content.shift();
    content = content.join(" ");
    //removed commands
    let items = content.trim().split(",");
    for(let i = 0;i<items.length;i++)
    {
      if(items[i]=='')
      {
          items.pop(items[i]);
      }
    }
    let errorReply = "Count pattern not matched. Please give count in numbers(including 0) as: ";
    for(let i=0;i<countItems.items.length;i++)
    {
        errorReply += countItems.items[i].name;
        if(i+1!=countItems.items.length)
        {
            errorReply+=",";
        }
    }
    if(items.length!=countItems.items.length)
    {
        return errorReply;
    }
    else
    {
        let tempCount = [];
        try
        {  
            for(let i=0;i<items.length;i++)
            {
            
                let count = parseInt(items[i]);
                if(isNaN(count))
                {
                    throw Error("Not a number");
                }
                else
                {
                    tempCount[i] = count;
                }
            
            }
        }
        catch(e)
        {
           return errorReply;
        }
        if(tempCount.length==countItems.items.length)
        {
            let responses = countItems.responses;
            let member = message.member;
            responses[member.id] = tempCount;
            let activeCommands = global.channels[channel.id];
            activeCommands["count"] = countItems;
            global.channels[channel.id] = activeCommands;
        }
    }
    return false;
};
commands["endcount"] = (message)=>{
    let channel = message.channel;
    let guild = message.guild;
    let countItems;
    if(typeof global.channels[channel.id] != "undefined")
    {
        let activeCommands = global.channels[channel.id];
        if(typeof activeCommands["count"] != "undefined")
        {
            let activeCommands = global.channels[channel.id];
            countItems = activeCommands["count"];
        }
    }
    else
    {
        return "This channel does not have an active count.\nUse \"grepo startcount <item1>,<item2>\" to start a new count";
    }
    let countReply = "Total count: ";
    let memberIds = Object.keys(countItems.responses);
    let itemsCount = [];
    for(let i = 0;i<memberIds.length;i++)
    {
        let items = countItems.responses[memberIds[i]];
        if(itemsCount.length==0)
        {
            itemsCount = items;
        }
        else
        {
            for(let j=0;j<itemsCount.length;j++)
            {
                itemsCount[j] += items[j];
            }
        }
    }
    for(let i=0;i<countItems.items.length;i++)
    {
        if(typeof itemsCount[i]== "undefined")
        {
            itemsCount[i] = 0;
        }
        countReply += `${countItems.items[i]}(${itemsCount[i]}) `  ;
        if(i+1!=countItems.items.length)
        {
            countReply+=",";
        }
    }

    let activeCommands = global.channels[channel.id];
    if(Object.keys(activeCommands).length==1)
    {
        delete  global.channels[channel.id];
    }
    else
    {
        delete activeCommands["count"];
        global.channels[channel.id] = activeCommands;
    }
    let guildId = guild.id;
    core.removeActiveGuildChannel(guildId,channel.id,(err,channels)=>{
        if(err)
        {
            logger.error(err);
        }
        else
        {
            logger.log("Removed active channel." + channels);
        }
    });
    logger.log("Count ended in channel: " + channel.id);
    return countReply;
};
module.exports = commands;