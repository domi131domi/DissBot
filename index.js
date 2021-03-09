const Discord = require('discord.js');
//const client = new Discord.Client();
require("dotenv").config()

const intents = new Discord.Intents([
    Discord.Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);
const client = new Discord.Client({ ws: { intents } });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", (msg => {
    if (msg.content.toLowerCase() == "hello dissbot") {
        msg.channel.send(`Hi ${msg.author.username}, nice to meet you! Type "diss help" to find out how to start dissing your friends!`)
    }

    if (msg.content.toLowerCase() == "diss help") {
        msg.channel.send("List of available commands:\ndiss help - list of commands\ndiss fight {nick} - challenge a user!")
    }

    if (msg.content.toLowerCase().startsWith('diss fight')) {
        const nick = msg.content.split('diss fight ')[1];
        msg.guild.members.fetch().then(members => {
            if (members.map(user => user.user.username).includes(nick)) {
                msg.channel.send(`Wake up @${members.find( x => x.user.username === nick).user.toString()}! ${msg.author.toString()} is challenging you to a diss battle!`)
            }
            else {
                msg.channel.send("You drunk? There is no member on this channel with a nick like that!")
            }
        });
    }

}))



client.login(process.env.TOKEN);