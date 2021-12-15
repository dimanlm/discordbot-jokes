module.exports = {
    name: 'ping',
    description: 'Ping - pong command :)',
    execute(msg, args) {
        msg.reply('pong');
    },
  };