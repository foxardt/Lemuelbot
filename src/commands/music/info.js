const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'info',
  description: 'Displays info about the currently playing song!',
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

    let bar = queue.createProgressBar({
      queue: false,
      lenght: 19,
    });

    const song = queue.current;

    console.log(song);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Currently Playing [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    });
  },
};
