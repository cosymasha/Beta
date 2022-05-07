const fs = require('fs');
const discord = require('discord.js');

/**
* @callback InteractionCallback
* @param {discord.MessageContextMenuInteraction} interaction
* @param {...any} [args]
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'} type
*/

module.exports = {
    /**@type {discord.ApplicationCommandData|ContextMenuData} */
    data: {customid: '', type: 'SELECT_MENU'},
    /**@type {InteractionCallback} */
    exec: async (interaction, client) => {
        const { timeoutLog, timeoutLogCh, timeoutDm } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
        const embed = interaction.message.embeds[0];
        if (!embed) return;

        if (interaction.values == 'setting-timeout-1') {
            const select = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                .setCustomId('timeoutSetting')
                .setPlaceholder('ここから選択')
                .addOptions([
                    {label: '全般設定', value: 'setting-timeout-1', emoji: '🌐', default: true},
                    {label: 'ログ機能', description: 'コマンドの実行ログを送信', value: 'setting-timeout-2', emoji: '966588719635267624'},
                    {label: 'DM警告機能', description: 'タイムアウトされた人に警告DMを送信', value: 'setting-timeout-3', emoji: '966588719635267624'}
                ]),
            ]);
            const button = new discord.MessageActionRow().addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-back')
                    .setEmoji('971389898076598322')
                    .setStyle('PRIMARY'),
                new discord.MessageButton()
                    .setCustomId('none')
                    .setLabel('有効な設定はありません')
                    .setStyle('SECONDARY')
                    .setDisabled(true)
            ])
            interaction.update({embeds: [embed], components: [select, button], ephemeral:true});
        }

        if (interaction.values == 'setting-timeout-2') {
            const select = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                .setCustomId('timeoutSetting')
                .setPlaceholder('ここから選択')
                .addOptions([
                    {label: '全般設定', value: 'setting-timeout-1', emoji: '🌐'},
                    {label: 'ログ機能', description: 'コマンドの実行ログを送信', value: 'setting-timeout-2', emoji: '966588719635267624', default: true},
                    {label: 'DM警告機能', description: 'タイムアウトされた人に警告DMを送信', value: 'setting-timeout-3', emoji: '966588719635267624'}
                ]),
            ]);
            const button = new discord.MessageActionRow().addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-back')
                    .setEmoji('971389898076598322')
                    .setStyle('PRIMARY'),
                new discord.MessageButton()
                    .setCustomId('setting-enable')
                    .setLabel('ON')
                    .setStyle('SUCCESS')
                
            ])
            interaction.update({embeds: [embed], components: [select, button], ephemeral:true});
        }
        
    }
}