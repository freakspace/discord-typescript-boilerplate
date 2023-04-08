import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Command } from "./../typings"
import { readdirSync } from 'fs';
import { resolve } from 'path';


const intents = [   
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.Guilds
] 

class ExtendedClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({intents: intents});
    this.commands = new Collection();
  }

  public async loadCommands() {
    const commandFiles = readdirSync(resolve(__dirname, 'commands')).filter((file) =>
      file.endsWith('.ts') || file.endsWith('.js'),
    );

    for (const file of commandFiles) {
      const command = (await import(resolve(__dirname, 'commands', file))).default as Command;
      this.commands.set(command.data.name, command);
    }
  }
}

export { ExtendedClient };
