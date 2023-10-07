const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const queue = require('./queue');

module.exports = {
  name: 'skipto',
  description: 'Skips to a certain track #!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  options: [
    {
      name: 'tracknumber',
      description: 'The track to skip to.',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const queue = client.player.nodes.get(interaction.guildId);
    const trackNum = interaction.options.getNumber('tracknumber');
    if (trackNum > queue.tracks.length)
      return interaction.reply({
        content: 'Sorry Leader, invalid track number.',
        ephemeral: true,
      });

    queue.node.skipTo(trackNum - 1);

    interaction.reply({
      content: `Skipped ahead to track number${trackNum}`,
    });
  },
};
