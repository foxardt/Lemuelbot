module.exports = {
  name: 'quit',
  description: 'Stops the bot and clears the queue!',
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

    queue.delete();

    await interaction.reply({
      content: 'пока Leader!',
    });
  },
};
