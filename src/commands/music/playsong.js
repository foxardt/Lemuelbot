const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  name: 'playsong',
  description: 'Loads a single song from YouTube!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  options: [
    {
      name: 'url',
      description: "The song's url.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    if (!interaction.member.voice.channel)
      return interaction.reply({
        content:
          'Извини Doctor, You need to be in a voice channel to run this command.',
        ephemeral: true,
      });

    const queue = await client.player.createQueue(interaction.guild, {
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
      searchEngine: QueryType.YOUTUBE_VIDEO,
    });

    if (result.tracks.length === 0)
      return interaction.reply({
        content: 'Извини Doctor, I didn\t get any result.',
        ephemeral: true,
      });

    const song = result.tracks[0];
    await queue.addTrack(song);

    embed
      .setDescription(
        `**${song.title} (${song.url}**) has been added to the Queue`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });

    if (!queue.playing) await queue.play();

    await interaction.reply({
      embeds: [embed],
    });
  },
};
