import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import { AllowedMentionsTypes, Client, codeBlock, Colors, EmbedBuilder, Events, GatewayIntentBits, Partials, version } from 'discord.js';
import { DiscordInteractions, DiscordInteractionsErrorCodes, InteractionsError } from '@akki256/discord-interaction';
import { DiscordEvents } from './module/events';
import { guildId, admin } from '../config.json';
import { isBlocked } from './module/functions';
import mongoose from 'mongoose';
import cron from 'node-cron';
import changeVerificationLevel from './cron/changeVerificationLevel';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,         GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,  GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.Channel, Partials.GuildMember,
    Partials.Message, Partials.User,
  ],
  allowedMentions: { parse: [
    AllowedMentionsTypes.Role, AllowedMentionsTypes.User,
  ] },
});

const events = new DiscordEvents(client);
const interactions = new DiscordInteractions(client);
interactions.loadInteractions(path.resolve(__dirname, './interactions'));

client.once(Events.ClientReady, () => {
  console.log('[INFO] BOT ready!');
  console.table({
    'Bot User': client.user?.tag,
    'Guild(s)': `${client.guilds.cache.size} Servers`,
    'Watching': `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`,
    'Discord.js': `v${version}`,
    'Node.js': process.version,
    'Platform': `${process.platform} | ${process.arch}`,
    'Memory': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB | ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB`,
  });

  interactions.registerCommands({ guildId, deleteNoLoad: true });
  events.register(path.resolve(__dirname, './events'));

  cron.schedule('*/30 * * * * *', () => changeVerificationLevel(client));
});

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isRepliable()) return;

  if (isBlocked(interaction.guild)) {
    interaction.reply({
      content: `\`🚫\` このサーバーでの${interaction.client.user.username}の使用は禁止されています。異議申し立ては[こちら](https://discord.gg/fVcjCNn733)`,
      ephemeral: true,
    });
  }

  interactions.run(interaction)
    .catch((err) => {
      if (err instanceof InteractionsError && err.code == DiscordInteractionsErrorCodes.CommandHasCoolTime)
        return interaction.reply({ content: '`⌛` コマンドはクールダウン中です', ephemeral: true });
      console.log(err);
    });
});

process.on('uncaughtException', (err) => {
  console.error(err);

  client.channels.fetch(admin.error).then(channel => {
    if (!channel?.isTextBased()) return;
    channel.send({ embeds: [
      new EmbedBuilder()
        .setTitle('`❌` 例外が発生しました')
        .setDescription(codeBlock(`${err.stack}`))
        .setColor(Colors.Red)
        .setTimestamp(),
    ] });
  });
});

client.login(process.env.BOT_TOKEN);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DBNAME });