let path = require("path");
let logger = require(path.join(__dirname,"../logger/logger.js"));
let commands = {};
commands["help"] = (message)=>{
    return "help str";
};
commands["startcount"] = (message)=>{
    let channel = message.channel;
    let content = message.content.trim();
    content = content.split(" ");
    content.shift();
    content.shift();
    logger.log(content)
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
        let countItems = [];
        for(let i=0;i<items.length;i++)
        {
            countItems[i] = {
                "name": items[i],
                "count" : 0
            }
        }
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
    logger.log(content)
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
    for(let i=0;i<countItems.length;i++)
    {
        errorReply += countItems[i].name;
        if(i+1!=countItems.length)
        {
            errorReply+=",";
        }
    }
    if(items.length!=countItems.length)
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
                    break;
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
        if(tempCount.length==countItems.length)
        {
            for(let i=0;i<tempCount.length;i++)
            {
                countItems[i].count += tempCount[i];
            }
            let activeCommands = global.channels[channel.id];
            activeCommands["count"] = countItems;
            global.channels[channel.id] = activeCommands;
        }
    }
    return false;
};
commands["endcount"] = (message)=>{
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
    let countReply = "Total count: ";
    for(let i=0;i<countItems.length;i++)
    {
        countReply += `${countItems[i].name}(${countItems[i].count}) `  ;
        if(i+1!=countItems.length)
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
    return countReply;
};
module.exports = commands;