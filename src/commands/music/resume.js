module.exports = {
  name: 'resume',
  description: 'Resumes the music!',
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

    queue.setPaused(false);

    await interaction.reply({
      content: 'Music has been resumed Doctor!',
    });
  },
};
