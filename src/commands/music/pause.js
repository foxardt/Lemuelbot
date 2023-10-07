module.exports = {
  name: 'pause',
  description: 'Pauses the music!',
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

    queue.setPaused(true);

    await interaction.reply({
      content: "Music has been paused Leader! Use '/resume' to resume",
    });
  },
};
