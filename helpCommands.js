module.exports.hi_cmd = (msg) => {
    msg.channel.send(`Hi ${msg.author.username}, nice to meet you! Type "diss help" to find out how to start dissing your friends!`)
}

module.exports.help_cmd = (msg) => {
        msg.channel.send("List of available commands:\ndiss help - list of commands\ndiss fight {nick} - challenge a user!")
}