"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const discord_js_1 = require("discord.js");
const extendedClient_1 = require("./extendedClient");
dotenv.config();
const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('CLIENT_ID and TOKEN are required.');
    process.exit(1);
}
const client = new extendedClient_1.ExtendedClient();
client.commands = new discord_js_1.Collection();
client.once('ready', async () => {
    console.log('Bot is online and ready!');
    await client.loadCommands(); // Load the commands
});
// Interaction event listener for slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const commandName = interaction.commandName;
    // Check if the command exists in the commands collection
    const command = client.commands.get(commandName);
    if (!command) {
        console.log(`Command not found: ${commandName}`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(`Error executing command: ${commandName}`, error);
        await interaction.reply({
            content: 'There was an error while executing this command.',
            ephemeral: true,
        });
    }
});
client.login(token);
