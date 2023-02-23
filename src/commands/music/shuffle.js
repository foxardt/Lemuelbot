module.exports = {
  name: 'shuffle',
  description: 'Suffles the song queue!',
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

    queue.shuffle();

    await interaction.reply({
      content: `The queue of ${queue.tracks.length} songs have been shuffled!`,
    });
  },
};
