const {
  ApplicationCommandOptionType,
  Client,
  Interaction,
  PermissionFlagsBits,
} = require('discord.js');
const MemberLogs = require('../../models/MemberLogs');

module.exports = {
  name: 'memberlogs-enable',
  description:
    'Configure the channel to log members joining and leaving the server.',
  options: [
    {
      name: 'channel',
      description: 'The channel you want the logs in.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  setDefaultMemberPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply('You can only run this command inside a server.');
      return;
    }

    const targetChannelId = interaction.options.get('channel').value;

    try {
      await interaction.deferReply();

      let memberLogs = await MemberLogs.findOne({
        guildId: interaction.guild.id,
      });

      if (memberLogs) {
        if (memberLogs.channelId === targetChannelId) {
          interaction.editReply(
            'Member logs are already aneble in this server. To disable run `/memberlogs-disable`'
          );
          return;
        }

        memberLogs.channelId = targetChannelId;
      } else {
        memberLogs = new MemberLogs({
          guildId: interaction.guild.id,
          channelId: targetChannelId,
        });
      }

      await memberLogs.save();
      interaction.editReply(
        'Member logs have now been configured. To disable run `/memberlogs-disable`'
      );
    } catch (error) {
      console.log(error);
    }
  },
};
