# Discord.js Boilerplate Project Using TypeScript

This is a boilerplate project for Discord.js bots using TypeScript.

The project supports slash commands, and are loaded dynamically using a folder structure, good for both large and small projects.

## Features

- Slash command support
- Modular command structure
- Extended client to support TypeScript
- Script to deploy slash commands
- Event listener for slash commands

## Prerequisites

- Node.js v16.x.x or higher
- A Discord bot token

## Installation

1. Clone the repository:

```bash
git clone https://git@github.com:freakspace/discord-typescript-boilerplate.git
cd discord-typescript-boilerplate
```

2. Install the required dependencies:
```bash
npm install
```

3. Compile the TypeScript code:
```bash
npm run build
```

## Configuration

2. Create `.env` in the root and add variables `"DISCORD_TOKEN"`, `"CLIENT_ID"` and `"GUILD_ID"`

## Deploying Slash Commands

To deploy your bot's slash commands, run the following command:

```bash
npm run deploy
```

## Usage

To start the bot in production use

```bash
npm run start
```

To start the bot in dev use

```bash
npm run dev
```
