const discord = require('discord.js');

/** @type {import('@djs-tools/interactions').ButtonRegister} */
const ping_command = {
    data: {
        customId: 'setting-back',
        type: 'BUTTON',
    },
    exec: async (interaction) => {
        const embed = new discord.EmbedBuilder()
            .setTitle('🛠 設定')
            .setDescription([
                `**${interaction.client.user.username}**のコントロールパネルへようこそ！`,
                'ここではこのBOTの設定を変更することができます。[詳細はこちら](https://nonick.gitbook.io/nonick.js/introduction/setting)',
                '```セレクトメニューから設定を閲覧・変更したい機能を選択しよう！```',
            ].join('\n'))
            .setColor('Green');
        const button = new discord.ActionRowBuilder().addComponents(
            new discord.ButtonBuilder()
                .setCustomId('setting-whatsNew')
                .setLabel('What\'s New')
                .setEmoji('966588719643631666')
                .setStyle(discord.ButtonStyle.Primary),
        );
        const select = new discord.ActionRowBuilder().addComponents(
            new discord.SelectMenuBuilder()
                .setCustomId('setting-featureCategory')
                .addOptions([
                    { label: '入退室ログ機能', value: 'setting-welcomeMessage', emoji: '🚪' },
                    { label: '通報機能', value: 'setting-report', emoji: '📢' },
                    { label: 'リンク展開機能', value: 'setting-messageExpansion', emoji: '🔗' },
                    { label: 'ログ機能', value: 'setting-log', emoji: '📑' },
                    { label: '認証レベル自動変更機能', value: 'setting-verification', emoji: '✅' },
                ]),
        );

        interaction.update({ embeds: [embed], components: [select, button] });
    },
};
module.exports = [ ping_command ];