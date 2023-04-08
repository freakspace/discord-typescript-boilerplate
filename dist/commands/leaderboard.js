"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show leaderboard');
async function execute(interaction) {
    await interaction.reply('Leaderboard...');
}
exports.default = {
    data,
    execute,
};
