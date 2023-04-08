import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';
import fs from 'fs';
import { resolve } from 'path';

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
const commandFiles = fs
  .readdirSync(resolve(__dirname, 'commands'))
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(resolve(__dirname, 'commands', file)).default;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    if (guildId) {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );
      console.log(`Successfully registered application commands for Guild: ${guildId}`);
    } else {
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
      );
      console.log('Successfully registered application commands globally.');
    }

    console.log('Finished refreshing application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
