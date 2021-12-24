const help = require('../utils/get-commands.js');
module.exports = {
    name: 'help',
    description: ': shows all the available commands.',
    execute(msg) {
        msg.reply(help.helpCommand(msg));
    },
  };

