import { AttachmentBuilder, AuditLogEvent, Colors, EmbedBuilder, Events, formatEmoji, GuildBasedChannel, Message, time, User } from 'discord.js';
import { Emojis, Fields } from '../../module/constant';
import { DiscordEventBuilder } from '../../module/events';
import { isBlocked } from '../../module/functions';
import { getServerSetting } from '../../module/mongo/middleware';
import axios from 'axios';
import admZip from 'adm-zip';


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
		.setDescription(Fields.multiLine(
			Fields.channelName(message.channel),
			Fields.memberTag(message.author, { text: '送信者' }),
			Fields.memberTag(executer ?? '送信者自身', { text: '削除者' }),
			Fields.schedule(message.createdAt, { text: '送信時刻' }),
		))
		.setColor(Colors.White)
		.setThumbnail(message.author?.avatarURL() ?? null)
		.setFields({ name: 'メッセージ', value: message.content || 'なし' });

	if (message.attachments.size) {
		const zip = new admZip();
		for await (const attachment of message.attachments.values()) {
			const res = await axios.get(attachment.url, { responseType: 'arraybuffer' }).catch(() => null);
			if (!res) continue;
			zip.addFile(attachment.name, res.data);
		}
		const attachment = new AttachmentBuilder(zip.toBuffer(), { name: 'attachments.zip' });
		channel.send({ embeds: [embed], files: [attachment] });
	}
	else {
		channel.send({ embeds: [embed] });
	}
}

export default [selfDeleteLog, deleteLog];