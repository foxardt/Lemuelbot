const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'queue',
  description: 'Displays the current song queue!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  options: [
    {
      name: 'page',
      description: 'The page number of the queue.',
      type: ApplicationCommandOptionType.Number,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const queue = client.player.nodes.get(interaction.guildId);
    if (!queue || !queue.playing)
      return interaction.reply({
        content: 'Sorry Leader, there are no songs in the queue.',
        ephemeral: true,
      });

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
    const page = (interaction.options.getNumber('page') || 1) - 1;

    if (page > totalPages)
      return interaction.reply({
        content: `Sorry Leader, Invalid page. There are only ${totalPages} of songs`,
        ephemeral: true,
      });

    const queueString = queue.tracks
      .slice(page * 10, page * 10 + 10)
      .map((song, i) => {
        return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${
          song.title
        } -- <@${song.requestedBy.id}>`;
      })
      .join('\n');

    const currentSong = queue.current;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**Currently Playing** \n` +
              (currentSong
                ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>`
                : 'None') +
              `\n\n**Queue**\n${queueString}`
          )
          .setFooter({ text: `Page ${page + 1} of ${totalPages}` })
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
