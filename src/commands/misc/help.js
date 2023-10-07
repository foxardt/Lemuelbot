const getLocalCommands = require('../../utils/getLocalCommands');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Lists all the commands available',
  // devOnly: Boolean,
  //testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const localCommands = getLocalCommands();

    let embed = new EmbedBuilder()
      .setTitle('Lemuel command list')
      .setDescription("This is the list of Lemuel's commands:")
      .setColor(0x95bcdd);
    for (const localCommand of localCommands) {
      if (!localCommand.deleted)
        embed.addFields({
          name: localCommand.name,
          value: localCommand.description,
        });
    }
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
