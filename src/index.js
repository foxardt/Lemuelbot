require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

/*client.on('guildCreate', (guild) => {
  try {
    if (guild.systemChannel)
      guild.systemChannel.send(
        'Привет Doctor, Ursus Student Self-Governing Group Istina reporting in. If you need any help call me with /help'
      );
  } catch (error) {}
});*/

client.login(process.env.TOKEN);
