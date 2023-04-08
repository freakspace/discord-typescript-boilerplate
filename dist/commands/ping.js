"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');
async function execute(interaction) {
    await interaction.reply('Pong! Pong!');
}
exports.default = {
    data,
    execute,
};
