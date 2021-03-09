let queue = {  };
let queueId = 0;
const maxQueues = 1000;
//todo : co w przypadku gdy mamy wiecej niz 1000 kolejek w jendym momencie, trzeba update kolejek?

module.exports = (msg) => {
    const nick = msg.content.split(' ')[2];
    msg.guild.members.fetch().then(members => {
        if (members.map(user => user.user.username).includes(nick)) {
            const p1 = members.find(x => x.user.username === nick).user;
            msg.channel.send(`Wake up @${p1.toString()}! ${msg.author.toString()} is challenging you to a diss battle!\n Type "diss accept" to start a fight!`);
            const collector = msg.channel.createMessageCollector(m => m.content.startsWith("diss ") && m.author.username == nick, { time: 60000 });
            const qId = getQueueId();
            queue.insert()
            collector.on('collect', m => checkFight(m, p1, msg.author, qId));
        }
        else {
            msg.channel.send("You drunk? There is no member on this channel with a nick like that!")
        }
    });
}

const checkFight = (msg, player1, player2, qId) => {
    if(msg.content == "diss accept")
    {
        msg.channel.send("Challenge accepted!");
    }
}

const getQueueId = () => {
    queueId += 1;
    if(queueId != maxQueues)
        queueId = 0;
    return queueId;
}