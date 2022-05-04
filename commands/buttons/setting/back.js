const fs = require('fs');
const discord = require('discord.js');

/**
* @callback InteractionCallback
* @param {discord.MessageContextMenuInteraction} interaction
* @param {discord.Client} client
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'} type
*/

module.exports = {
    /**@type {discord.ApplicationCommandData|ContextMenuData} */
    data: {customid: 'setting-control-back', type: 'BUTTON'},
    /**@type {InteractionCallback} */
    exec: async (interaction) => {
        const embed = new discord.MessageEmbed()
            .setTitle('🛠 NoNICK.js - 設定')
            .setDescription('NoNICK.jsのコントロールパネルへようこそ!\nここではこのBOTの設定を変更することができます!' + discord.Formatters.codeBlock("markdown", "セレクトメニューから閲覧・変更したい設定を選択しよう!"))
            .setColor('GREEN');
        const button = new discord.MessageActionRow().addComponents(
            new discord.MessageButton()
                .setCustomId('setting-control-whatsnew')
                .setLabel("What's New")
                .setEmoji('966588719643631666')
                .setStyle('PRIMARY'),
            new discord.MessageButton()
                .setCustomId('setting-control-laungage')
                .setEmoji('🌐')
                .setStyle('SECONDARY')
        );
        const select = new discord.MessageActionRow().addComponents(
            new discord.MessageSelectMenu()
                .setCustomId('setting-control-select')
                .setPlaceholder('ここから選択')
                .addOptions([
                    { label: '入退室ログ', value: 'setting-control-welcomemessage', emoji: '966596708458983484'},
                    { label: '通報機能', value: 'setting-control-report', emoji: '966596708458983484' },
                    { label: '/timeout コマンド', value: 'setting-control-timeout', emoji: '966596708484149289'},
                    { label: '/ban コマンド', value: 'setting-control-ban', emoji: '966596708484149289'}
                ]),
        );
        interaction.update({embeds: [embed], components: [select, button], ephemeral: true});
    }
}