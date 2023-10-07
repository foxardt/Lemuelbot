const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');
const moment = require('moment');

module.exports = {
  name: 'playlist',
  description: 'Loads a playlist of songs from YouTube!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  options: [
    {
      name: 'url',
      description: "The playlist's url.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    if (!interaction.member.voice.channel)
      return interaction.reply({
        content:
          'Sorry Leader, You need to be in a voice channel to run this command.',
        ephemeral: true,
      });

    const queue = await client.player.nodes.create(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new EmbedBuilder();

    let url = interaction.options.getString('url');
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
    });

    if (result.tracks.length === 0)
      return interaction.reply({
        content: 'Sorry Leader, I didn\t get any result.',
        ephemeral: true,
      });

    const playlist = result.playlist;

    let duration = 0;

    for (const track of playlist) {
      let ms = track.duration.split(':');
      if (ms.length === 2) {
        duration += moment(track.duration, 'mm:ss');
      } else {
        duration += moment(track.duration, 'HH:mm:ss');
      }
    }

    duration = moment(duration).format('HH:mm:ss');

    await queue.addTracks(result.tracks);

    embed
      .setDescription(
        `**${result.tracks.length} songs from ${playlist.title} (${playlist.url}**) have been added to the Queue`
      )
      .setThumbnail(playlist.thumbnail.url)
      .setFooter({ text: `Duration: ${duration}` });

    if (!queue.playing) await queue.node.play();

    await interaction.reply({
      embeds: [embed],
    });
  },
};
