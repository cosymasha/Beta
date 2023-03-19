import { AuditLogEvent, Colors, EmbedBuilder, Events, formatEmoji, GuildBasedChannel, Message, time, User } from 'discord.js';
import { GrayEmojies } from '../../module/emojies';
import { DiscordEventBuilder } from '../../module/events';
import { isBlocked } from '../../module/functions';
import { getServerSetting } from '../../module/mongo/middleware';

const selfDeleteLog = new DiscordEventBuilder({
	type: Events.MessageDelete,
	execute: async (message) => {
		if (!message.inGuild()) return;
		if (isBlocked(message.guild)) return;
		const setting = await getServerSetting(message.guildId, 'log');
		if (!setting?.delete.enable || !setting.delete.channel) return;
		const logCh = await message.guild.channels.fetch(setting.delete.channel).catch(() => undefined);
		sendDeleteLog(message, logCh);
	},
});

const deleteLog = new DiscordEventBuilder({
	type: Events.GuildAuditLogEntryCreate,
	execute: async (auditLog, guild) => {
		if (isBlocked(guild)) return;
		if (auditLog.action !== AuditLogEvent.MessageDelete || !(auditLog.target instanceof Message)) return;
		if (!auditLog.target.inGuild()) return;

		const setting = await getServerSetting(guild.id, 'log');
		if (!setting?.delete.enable || !setting.delete.channel) return;
		const logCh = await guild.channels.fetch(setting.delete.channel).catch(() => undefined);
		sendDeleteLog(auditLog.target, logCh, auditLog.executor);
	},
});

async function sendDeleteLog(message: Message<true>, channel?: GuildBasedChannel | null, executer?: User | null) {
	if (!message.channel || !message.author) return;
	if (!channel?.isTextBased()) return;
	const beforeMessage = (await message.channel.messages.fetch({ before: message.id, limit: 1 })).first();

	const embed = new EmbedBuilder()
		.setTitle('`💬` メッセージ削除')
		.setURL(beforeMessage?.url ?? null)
		.setDescription([
			`${formatEmoji(GrayEmojies.channel)} **チャンネル:** ${message.channel} [\`${message.channel.name}\`]`,
			`${formatEmoji(GrayEmojies.member)} **送信者:** ${message.author} [\`${message.author.tag}\`]`,
			`${formatEmoji(GrayEmojies.member)} **削除者:** ${executer ? `${executer} [\`${executer.tag}\`]` : '送信者自身'}`,
			`${formatEmoji(GrayEmojies.schedule)} **送信時刻:** ${time(message.createdAt)}`,
		].join('\n'))
		.setColor(Colors.White)
		.setThumbnail(message.author?.avatarURL() ?? null)
		.setFields({ name: 'メッセージ', value: message.content || 'なし' });

	channel.send({ embeds: [embed] });
}

module.exports = [selfDeleteLog, deleteLog];