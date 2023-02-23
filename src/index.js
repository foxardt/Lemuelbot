require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { Player } = require('discord-player');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});

client.player.on('trackStart', (queue, track) => {
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
