"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const dotenv = require('dotenv');
dotenv.config();
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; // If you want to deploy the commands to a specific guild
const token = process.env.DISCORD_TOKEN;
if (!clientId || !token) {
    console.error('CLIENT_ID and TOKEN are required.');
    process.exit(1);
}
const commands = [];
const commandFiles = fs_1.default
    .readdirSync((0, path_1.resolve)(__dirname, 'commands'))
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require((0, path_1.resolve)(__dirname, 'commands', file)).default;
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: '9' }).setToken(token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        if (guildId) {
            await rest.put(v9_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands });
            console.log(`Successfully registered application commands for Guild: ${guildId}`);
        }
        else {
            await rest.put(v9_1.Routes.applicationCommands(clientId), { body: commands });
            console.log('Successfully registered application commands globally.');
        }
        console.log('Finished refreshing application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
})();
