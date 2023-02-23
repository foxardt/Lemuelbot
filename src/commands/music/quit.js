module.exports = {
  name: 'quit',
  description: 'Stops the bot and clears the queue!',
  // devOnly: Boolean,
  //testOnly: Boolean,
  //options: [],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: 'Извини Doctor, there are no songs in the queue.',
        ephemeral: true,
      });

    queue.destroy();

    await interaction.reply({
      content: 'пока Doctor!',
    });
  },
};
