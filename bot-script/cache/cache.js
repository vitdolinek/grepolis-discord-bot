let path = require("path");
let logger = require(path.join(__dirname,"../logger/logger.js"))
let dumpPath = path.join(__dirname,"dump")
let fs = require("fs");
let cache ={};
cache.save =  (data)=>{
    //logger.log(JSON.stringify(data))
    logger.log("Saving to cache");
    fs.writeFileSync(dumpPath,JSON.stringify(data));
}
cache.get = ()=>{
    if(fs.existsSync(dumpPath))
    {
        logger.log("Getting from cache")
        let data = fs.readFileSync(dumpPath);
        try
        {
            data = JSON.parse(data);
            global.guilds = data.guilds;
            global.channels = data.channels;
        }
        catch(E)
        {
            logger.error("Error while parsing dumpfile")
        }
    }
}
module.exports = cache;