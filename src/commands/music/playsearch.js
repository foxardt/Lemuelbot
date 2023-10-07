const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  name: 'playsearch',
  description: 'Searches for song based on provided keywords!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  options: [
    {
      name: 'searchterms',
      description: 'The search keywords.',
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

    let url = interaction.options.getString('searchterms');
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (result.tracks.length === 0)
      return interaction.reply({
        content: 'Sorry Leader, I didn\t get any result.',
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

    if (!queue.playing) await queue.node.play();

    await interaction.reply({
      embeds: [embed],
    });
  },
};
