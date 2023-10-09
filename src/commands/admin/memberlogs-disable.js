const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const MemberLogs = require('../../models/MemberLogs');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  name: 'memberlogs-disable',
  description: 'Disable member logs in this server.',
  setDefaultMemberPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      if (!(await MemberLogs.exists({ guildId: interaction.guild.id }))) {
        interaction.editReply(
          'Member logs have not been configured for this server. Use `/memberlogs-configure` to set it up.'
        );
        return;
      }

      await MemberLogs.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.editReply(
        'Member logs have been disabled for this server. Use `/memberlogs-configure` to set it up again.'
      );
    } catch (error) {
      console.log(error);
    }
  },
};
