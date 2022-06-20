const discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const discord_player = require('discord-player');

/**
* @callback InteractionCallback
* @param {discord.ButtonInteraction} interaction
* @param {...any} [args]
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'|'MODAL'} type
*/

module.exports = {
    /** @type {discord.ApplicationCommandData|ContextMenuData} */
    data: { customid: 'music-prev', type: 'BUTTON' },
    /** @type {InteractionCallback} */
    exec: async (interaction, client, Configs, player) => {
        /** @type {discord_player.Queue} */
        const queue = player.getQueue(interaction.guildId);
        const content = interaction.message.content;
        const button = interaction.message.components[0];
        const config = await Configs.findOne({ where: { serverId: interaction.guild.id } });
        const dj = config.get('dj');
        const djRole = config.get('djRole');

        if (dj && !interaction.member.roles.cache.has(djRole) && !interaction.member.permissions.has('ADMINISTRATOR')) {
            const embed = new discord.MessageEmbed()
                .setDescription(`❌ この機能は${discord.Formatters.roleMention(djRole)}を持つメンバーのみが使用できます!`)
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        if (!queue) {
            const embed = new discord.MessageEmbed()
                .setDescription('❌ 現在キューはありません!')
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        if (!interaction.member.voice.channelId) {
            const embed = new discord.MessageEmbed()
                .setDescription('❌ ボイスチャンネルに参加してください!')
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            const embed = new discord.MessageEmbed()
                .setDescription('❌ 現在再生中のボイスチャンネルに参加してください!')
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const currintTrack = queue.current;
        await queue.back()
            .then(async () => {
                interaction.update({ content: content, components: [button] });
                queue.insert(currintTrack, 0);

                // eslint-disable-next-line no-empty-function
                await queue.metadata.channel.send('⏮️ 一つ前の音楽を再生します').catch(() => {});
            })
            .catch(() => {
                const embed = new discord.MessageEmbed()
                    .setDescription('❌ これより前に再生した曲がありません!')
                    .setColor('RED');
                interaction.reply({ embeds: [embed], ephemeral: true });
            });
    },
};