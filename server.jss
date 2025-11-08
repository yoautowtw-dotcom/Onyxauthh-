// server.js - Minimal Luarmor-style Discord Bot

const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Event: Bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Bot receives a message
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore bots

  const msg = message.content.toLowerCase();

  // Simple ping command
  if (msg === '!ping') {
    message.reply('Pong!');
  }

  // Echo command
  else if (msg.startsWith('!say ')) {
    const text = message.content.slice(5);
    message.channel.send(text);
  }

  // Fun command: random number
  else if (msg === '!roll') {
    const roll = Math.floor(Math.random() * 100) + 1;
    message.reply(`You rolled a ${roll}! 🎲`);
  }

  // Fun command: insult (just for fun, gentle)
  else if (msg === '!roastme') {
    const roasts = [
      "You're like a cloud. When you disappear, it's a beautiful day.",
      "You bring everyone so much joy… when you leave the room.",
      "You're proof that even evolution takes a break sometimes."
    ];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    message.reply(roast);
  }

  // Help command
  else if (msg === '!help') {
    message.reply('Commands: !ping, !say <text>, !roll, !roastme, !help');
  }
});

// Login using Render environment variable
client.login(process.env.DISCORD_TOKEN);
