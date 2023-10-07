require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { Player } = require('discord-player');
const mongoose = require('mongoose');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
})();

eventHandler(client);

client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});

client.player.events.on('trackStart', (queue, track) => {
  if (queue.metadata.channel)
    queue.metadata.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`🎶 | Now playing **${track.title}** (${track.url} )!`)
          .setDescription(`Requested by <@${track.requestedBy.id}>`)
          .setThumbnail(track.thumbnail),
      ],
    });
});

client.login(process.env.TOKEN);
