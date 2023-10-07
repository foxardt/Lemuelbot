const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Skips the current song!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  //options: [],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: 'Sorry Leader, there are no songs in the queue.',
        ephemeral: true,
      });

    const currentSong = queue.current;

    queue.node.skip();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${currentSong.title} has been skipped!`)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
