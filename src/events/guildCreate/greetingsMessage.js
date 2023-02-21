module.exports = (client, guild) => {
  if (guild.systemChannel)
    guild.systemChannel.send(
      'Привет Doctor, Ursus Student Self-Governing Group Istina reporting in. If you need any help call me with /help'
    );
};
