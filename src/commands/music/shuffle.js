module.exports = {
  name: 'shuffle',
  description: 'Suffles the song queue!',
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

    queue.tracks.shuffle();

    await interaction.reply({
      content: `The queue of ${queue.tracks.length} songs have been shuffled!`,
    });
  },
};
