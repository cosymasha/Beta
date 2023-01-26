import { ActionRowBuilder, ApplicationCommandOptionType, AttachmentBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, GuildMemberRoleManager, PermissionFlagsBits } from 'discord.js';
import { ChatInput, Button } from '@akki256/discord-interaction';
import Captcha from '@haileybot/captcha-generator';

let currentVerifyUsers: string[] = [];

const verifyCommand = new ChatInput(
  {
    name: 'verify',
    description: 'ロールを使用した認証パネルを作成',
    options: [
      {
        name: 'type',
        description: '認証タイプ',
        choices: [
          { name: 'ボタン', value: 'button' },
          { name: '画像', value: 'image' },
        ],
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'role',
        description: '認証成功時に付与するロール',
        type: ApplicationCommandOptionType.Role,
        required: true,
      },
      {
        name: 'description',
        description: '埋め込みの説明文 (半角スペース2つで改行)',
        type: ApplicationCommandOptionType.String,
        maxLength: 4096,
      },
      {
        name: 'color',
        description: '埋め込みの色',
        type: ApplicationCommandOptionType.Number,
        choices: [
          { name: '🔴赤色', value: Colors.Red },
          { name: '🟠橙色', value: Colors.Orange },
          { name: '🟡黄色', value: Colors.Yellow },
          { name: '🟢緑色', value: Colors.Green },
          { name: '🔵青色', value: Colors.Blue },
          { name: '🟣紫色', value: Colors.Purple },
          { name: '⚪白色', value: Colors.White },
          { name: '⚫黒色', value: Colors.DarkButNotBlack },
        ],
      },
      {
        name: 'image',
        description: '画像',
        type: ApplicationCommandOptionType.Attachment,
      },
    ],
    defaultMemberPermissions: PermissionFlagsBits.ManageRoles | PermissionFlagsBits.ManageChannels,
    dmPermission: false,
  },
  { coolTime: 600_000 },
  async (interaction): Promise<void> => {
    if (!interaction.inCachedGuild()) return;

    const verifyType = interaction.options.getString('type')!;
    const role = interaction.options.getRole('role')!;

    const verifyTypeName = new Map([
      ['button', 'ボタン'],
      ['image', '画像'],
    ]);

    if (!interaction.guild.members.me?.permissions.has(PermissionFlagsBits.ManageRoles)) {
      interaction.reply({ content: `\`❌\` **${interaction.user.username}**に\`ロールを管理\`権限を付与してください！`, ephemeral: true });
      return;
    }
    else if ((interaction.guild.members.me?.roles.highest.position || 251) < role.position) {
      interaction.reply({ content: '`❌` そのロールはBOTより高い位置にあるため、認証に使用することはできません', ephemeral: true });
      return;
    }
    else if (role.managed) {
      interaction.reply({ content: '`❌` そのロールは外部サービスによって管理されているため、認証に使用することはできません', ephemeral: true });
      return;
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`\`✅\` 認証 - ${verifyTypeName.get(verifyType)!}`)
          .setDescription(interaction.options.getString('description')?.replace('  ', '\n') || null)
          .setColor(interaction.options.getNumber('color') ?? Colors.Green)
          .setImage(interaction.options.getAttachment('image')?.url || null)
          .setFields({ name: '付与されるロール', value: role.toString() }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().setComponents(
          new ButtonBuilder()
            .setCustomId(`nonick-js:verify-${verifyType}`)
            .setLabel('認証')
            .setStyle(ButtonStyle.Success),
        ),
      ],
    });
  },
);

const buttonTypeButton = new Button(
  { customId: 'nonick-js:verify-button' },
  async (interaction): Promise<void> => {
    if (!interaction.inCachedGuild()) return;

    const roleId = interaction.message.embeds[0]?.fields[0]?.value?.match(/(?<=<@&)\d+(?=>)/)?.[0];
    const roles = (await interaction.member.fetch()).roles;

    if (!roleId) {
      interaction.reply({ content: '`❌` 認証中に問題が発生しました。', ephemeral: true });
      return;
    }
    else if (!(roles instanceof GuildMemberRoleManager)) {
      interaction.reply({ content: '`❌` このチャンネルでは利用できません。',  ephemeral: true });
      return;
    }
    else if (roles.cache.has(roleId)) {
      interaction.reply({ content: '`✅` 既に認証されています。', ephemeral: true });
      return;
    }

    roles.add(roleId, '認証')
      .then(() => interaction.reply({ content: '`✅` 認証に成功しました！', ephemeral: true }))
      .catch(() => interaction.reply({ content: '`❌` ロールを付与できませんでした。サーバーの管理者にご連絡ください', ephemeral: true }));
  },
);

const imageTypeButton = new Button(
  { customId: 'nonick-js:verify-image' },
  async (interaction): Promise<void> => {
    if (!interaction.inCachedGuild()) {
      return;
    }
    else if (currentVerifyUsers.includes(interaction.user.id)) {
      interaction.reply({ content: '`❌` 現在別の認証を行っています。認証が終了するまで新たな認証を行うことはできません。', ephemeral: true });
      return;
    }

    const roleId = interaction.message.embeds[0]?.fields[0]?.value?.match(/(?<=<@&)\d+(?=>)/)?.[0];
    const roles = (await interaction.member.fetch()).roles;

    if (!roleId) {
      interaction.reply({ content: '`❌` 認証中に問題が発生しました。', ephemeral: true });
      return;
    }
    else if (!(roles instanceof GuildMemberRoleManager)) {
      interaction.reply({ content: '`❌` このチャンネルでは利用できません。',  ephemeral: true });
      return;
    }
    else if (roles.cache.has(roleId)) {
      interaction.reply({ content: '`✅` 既に認証されています。', ephemeral: true });
      return;
    }

    await interaction.deferReply({ ephemeral: true });
    const captcha = new Captcha(250);

    interaction.user
      .send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name} - 画像認証`, iconURL: interaction.guild.iconURL() ?? undefined })
            .setDescription([
              '下の画像に表示された一意の文字列をこのDMに送信してください。',
              '> ⚠️一定時間経過したり、複数回間違えると新しい認証を発行する必要があります。',
            ].join('\n'))
            .setColor(Colors.Blurple)
            .setImage('attachment://nonick-js-captcha.png')
            .setFooter({ text: 'NoNICK.jsはパスワードやQRコードの読み取りを要求することは決してありません' }),
        ],
        files: [new AttachmentBuilder(captcha.PNGStream, { name: 'nonick-js-captcha.png' })],
      })
      .then(() => {
        currentVerifyUsers.push(interaction.user.id);
        interaction.followUp({ content: '`📨` DMで認証を続けてください' });

        let tryLimit = 3;
        const collector = interaction.user.dmChannel!.createMessageCollector({ filter: v => v.author.id == interaction.user.id, time: 60_000 });

        collector.on('collect', tryMessage => {
          if (!(tryMessage.content === captcha.value)) {
            tryLimit--;
            if (tryLimit == 0) collector.stop();
            return;
          }

          roles.add(roleId)
            .then(() => interaction.user.send('`✅` 認証に成功しました！'))
            .catch(() => interaction.user.send('`❌` 認証に成功しましたが、ロールを付与できませんでした。サーバーの管理者にご連絡ください。'))
            .finally(() => collector.stop());
        });

        collector.on('end', () => {
          if (tryLimit == 0) {
            interaction.user.send({ content: '`❌` 試行回数を超えて認証に失敗しました。次回の認証は`5分後`から可能になります。' });
            setTimeout(() => currentVerifyUsers = currentVerifyUsers.filter(v => v !== interaction.user.id), 300_000);
          }
          else {
            currentVerifyUsers = currentVerifyUsers.filter(v => v !== interaction.user.id);
          }
        });
      })
      .catch(() => {
        interaction.followUp({ content: '`❌` この認証を行うにはBOTからDMを受け取れるように設定する必要があります', ephemeral: true });
      });
  },
);

module.exports = [verifyCommand, buttonTypeButton, imageTypeButton];