module.exports = (client, guild) => {
  if (guild.systemChannel)
    guild.systemChannel.send(
      "Are you our client? You can call me Exusiai. I'm always down for some fun! If you need any help call me with /help"
    );
};
