const discord = require('discord.js');
const cron = require('node-cron');
const Sequelize = require('sequelize');
const { DiscordInteractions } = require('@djs-tools/interactions');
const { guildId, guildCommand, blackList_guild, blackList_user } = require('./config.json');
require('dotenv').config();

const client = new discord.Client({
    intents: Object.values(discord.GatewayIntentBits),
    allowedMentions: { parse:['roles'] },
    partials: [
        discord.Partials.Channel,
        discord.Partials.GuildMember,
        discord.Partials.GuildScheduledEvent,
        discord.Partials.Message,
        discord.Partials.Reaction,
        discord.Partials.User,
    ],
});
const sequelize = new Sequelize({ host: 'localhost', dialect: 'sqlite', logging: false, storage: 'sql/config.sqlite' });

const interactions = new DiscordInteractions(client);
interactions.loadInteractions('./commands');

const basicConfigs = sequelize.define('basic', {
	serverId: { type: Sequelize.STRING, unique: true },
    welcome: { type: Sequelize.BOOLEAN, defaultValue: false },
    welcomeCh: { type: Sequelize.STRING, defaultValue: null },
    welcomeMessage: { type: Sequelize.TEXT, defaultValue: 'まずはルールを確認しよう!' },
    leave: { type: Sequelize.BOOLEAN, defaultValue: false },
    leaveCh: { type: Sequelize.STRING, defaultValue: null },
    reportCh: { type: Sequelize.STRING, defaultValue: null },
    reportRoleMention: { type: Sequelize.BOOLEAN, defaultValue: false },
    reportRole: { type: Sequelize.STRING, defaultValue: null },
    linkOpen: { type: Sequelize.BOOLEAN, defaultValue: false },
    log: { type: Sequelize.BOOLEAN, defaultValue: false },
    logCh: { type: Sequelize.STRING, defaultValue: null },
    verification: { type: Sequelize.BOOLEAN, defaultValue: false },
}, { timestamps: false, createdAt: false, updatedAt: false });

const logConfigs = sequelize.define('log', {
	serverId: { type: Sequelize.STRING, unique: true },
    botLog: { type: Sequelize.BOOLEAN, defaultValue: false },
    timeout: { type: Sequelize.BOOLEAN, defaultValue: false },
    kick: { type: Sequelize.BOOLEAN, defaultValue: false },
    ban: { type: Sequelize.BOOLEAN, defaultValue: false },
}, { timestamps: false, createdAt: false, updatedAt: false });

const verificationConfig = sequelize.define('verification', {
	serverId: { type: Sequelize.STRING, unique: true },
    oldLevel: { type: Sequelize.NUMBER, defaultValue: null },
    newLevel: { type: Sequelize.NUMBER, defaultValue: null },
    startChangeTime: { type: Sequelize.NUMBER, defaultValue: null },
    endChangeTime: { type: Sequelize.NUMBER, defaultValue: null },
}, { timestamps: false, createdAt: false, updatedAt: false });

client.on('ready', () => {
    basicConfigs.sync({ alter: true });
    logConfigs.sync({ alter: true });
    verificationConfig.sync({ alter: true });

    console.log(`[${new Date().toLocaleTimeString('ja-JP')}][INFO]ready!`);
    console.table({
        'Bot User': client.user.tag,
        'Guild(s)': `${client.guilds.cache.size} Servers`,
        'Watching': `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`,
        'Discord.js': `v${discord.version}`,
        'Node.js': process.version,
        'Plattform': `${process.platform} | ${process.arch}`,
        'Memory': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB | ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB`,
    });
    client.user.setActivity(`/info | ${client.guilds.cache.size} servers `);
    if (guildCommand) interactions.registerCommands(guildId);
    else interactions.registerCommands();

    cron.schedule('0 * * * * *', date => {
        client.db_config = basicConfigs;
        client.db_logConfig = logConfigs;
        client.db_verificationConfig = verificationConfig;

        require('./cron/verificationChange/index').execute(client, date);
    }, { timezone: 'Japan' });
});

client.on('guildCreate', () => client.user.setActivity(`/info | ${client.guilds.cache.size} servers`));
client.on('guildDelete', guild => {
    client.user.setActivity(`/info | ${client.guilds.cache.size} servers`);
    basicConfigs.destroy({ where:{ serverId: guild.id } });
});

client.on('guildBanAdd', ban => moduleExecute(ban, undefined, require('./events/guildBanAdd/index')));
client.on('guildBanRemove', member => moduleExecute(member, undefined, require('./events/guildBanRemove/index')));
client.on('guildMemberAdd', member => moduleExecute(member, undefined, require('./events/guildMemberAdd/index')));
client.on('guildMemberRemove', member => moduleExecute(member, undefined, require('./events/guildMemberRemove/index')));
client.on('guildMemberUpdate', (oldMember, newMember) => moduleExecute(oldMember, newMember, require('./events/guildMemberUpdate/index')));
client.on('messageCreate', message => moduleExecute(message, undefined, require('./events/messageCreate/index')));

client.on('interactionCreate', async interaction => {
    if (blackList_guild.includes(interaction.guild.id) || blackList_user.includes(interaction.guild.ownerId)) {
        const embed = new discord.EmbedBuilder()
            .setDescription(`🚫 このサーバーでの**${client.user.username}**の使用は開発者により禁止されています。禁止された理由や詳細は\`nonick-mc#1017\`までお問い合わせください。`)
            .setColor('Red');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    await basicConfigs.findOrCreate({ where: { serverId: interaction.guildId } });
    await logConfigs.findOrCreate({ where: { serverId: interaction.guildId } });
    await verificationConfig.findOrCreate({ where: { serverId: interaction.guildId } });

    interaction.db_config = basicConfigs;
    interaction.db_logConfig = logConfigs;
    interaction.db_verificationConfig = verificationConfig;
    interactions.run(interaction).catch(console.warn);
});

async function moduleExecute(param, param2, module) {
    if (blackList_guild.includes(param.guild.id) || blackList_user.includes(param.guild.ownerId)) return;

    await basicConfigs.findOrCreate({ where:{ serverId: param.guild.id } });
    await logConfigs.findOrCreate({ where:{ serverId: param.guild.id } });
    await verificationConfig.findOrCreate({ where: { serverId: param.guild.id } });

    param.db_config = basicConfigs;
    param.db_logConfig = logConfigs;
    param.db_verificationConfig = verificationConfig;
    module.execute(param, param2);
}

client.login(process.env.BOT_TOKEN);