const { SlashCommandBuilder, CommandInteraction  } = require('discord.js');


const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

async function execute(interaction: typeof CommandInteraction) {
  await interaction.reply('Pong! Pong!');
}

export default {
  data,
  execute,
};