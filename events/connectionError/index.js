const discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const discord_player = require('discord-player');

/**
 * @callback connectionErrorCallback
 * @param {discord.Client} client
 * @param {discord_player.Queue} queue
 * @param {Error} error
 */

module.exports = {
    async execute(client, queue, error) {
        const embed = new discord.MessageEmbed()
            .setTitle('エラー!')
            .setDescription(discord.Formatters.codeBlock(error))
            .setColor('RED');
        queue.metadata.channel.send({ embeds: [embed] }).catch();
    },
};