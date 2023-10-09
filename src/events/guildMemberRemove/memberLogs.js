const { Client, GuildMember } = require('discord.js');
const MemberLogs = require('../../models/MemberLogs');

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
  try {
    let guild = member.guild;
    if (!guild) return;

    const channel = await MemberLogs.findOne({ guildId: guild.id });
    if (!channel) return;

    let logChannel = await guild.channels.fetch(channel.channelId);

    logChannel.send(`${member.user.tag} just left the server...`);
  } catch (error) {
    console.log(`Error logging member leaving server: ${error}`);
  }
};
