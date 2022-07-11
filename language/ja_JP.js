const discord = require('discord.js');
const languageData = {
    'BLACKLIST_MESSAGE': (username) => `🚫 このサーバーでの**${username}**の使用は開発者により禁止されています。禁止された理由や詳細は\`nonick-mc#1017\`までお問い合わせください。`,

    // infoコマンド
    'INFO_DESCRIPTION': '「使いやすい」をモットーにした**完全無料の多機能BOT!**\n誰でも簡単にBOTを使えるような開発をしています!\n\n🔹**搭載中の機能**\n`入退室ログ` `通報機能` `リアクションロール` `音楽再生機能` `timeoutコマンド` `banコマンド`',
    'INFO_FOOTER_TEXT': '開発者・nonick-mc#1017',
    'INFO_BUTTON_LABEL': 'サポートサーバー',

    // settingコマンド
    'SETTING_PERMISSION_ERROR': '❌ **あなたにはこれを実行する権限がありません！**\n必要な権限: `サーバー管理`',
    'SETTING_DISABLE': `${discord.Formatters.formatEmoji('758380151238033419')} 無効`,
    'SETTING_ENABLE': `${discord.Formatters.formatEmoji('758380151544217670')} 有効`,
    'SETTING_CHANNEL_ENABLE': (ch) => `${discord.Formatters.formatEmoji('758380151544217670')} 有効 (<#${ch}>)`,
    'SETTING_ROLE_ENABLE': (role) => `${discord.Formatters.formatEmoji('758380151544217670')} 有効 (<@&${role}>)`,
    'SETTING_BUTTON_ENABLE': '有効化',
    'SETTING_BUTTON_DISABLE': '無効化',
    'SETTING_BUTTON_CH': '送信先',
    'SETTING_BUTTON_MESSAGE': 'メッセージ',
    'SETTING_BUTTON_ROLE': 'ロール',
    'SETTING_NONE': '__設定されていません__',
    'SETTING_CH_SUCCESS_DESCRIPTION': (name) => `✅ **${name}**がここに送信されます!`,
    'SETTING_ERROR_TITLE': 'エラー!',
    'SETTING_ERROR_NOTPERMISSION': '⚠️ **BOTの権限が不足しています!**\n必要な権限: `チャンネルを見る` `メッセージを送信` `埋め込みリンク`',
    'SETTING_ERROR_CHANNELNOTFOUND': (name) => `⚠️ ${discord.Formatters.inlineCode(name)}という名前のチャンネルは存在しません!`,
    'SETTING_ERROR_ROLENOTFOUND': (name) => `⚠️ ${discord.Formatters.inlineCode(name)}という名前のロールは存在しません!`,
    'SETTING_HOME_TITLE': (username) => `🛠 ${username} - 設定`,
    'SETTING_HOME_DESCRIPTION': (username) => `${username}のコントロールパネルへようこそ!\nここではこのBOTの設定を変更することができます!\n\`\`\`セレクトメニューから閲覧・変更したい設定を選択しよう!\`\`\``,

    'SETTING_WELCOMEMESSAGE': '入退室ログ',
    'SETTING_WELCOMEMESSAGE_EMBED_TITLE': '🛠 設定 - 入退室ログ',
    'SETTING_WELCOMEMESSAGE_EMBED_DESCRIPTION': '```サーバーに新しくメンバーが参加した時や退室した時に通知してくれる機能です。メッセージを設定することで参加した人に見てもらいたい情報を送信できます。```\n**【現在の設定】**',
    'SETTING_WELCOMEMESSAGE_EMBED_FIELD_1': '入室ログ',
    'SETTING_WELCOMEMESSAGE_EMBED_FIELD_2': '退室ログ',
    'SETTING_WELCOMEMESSAGE_EMBED_FIELD_3': '入室ログメッセージ',
    'SETTING_WELCOMEMESSAGE_WELCOME_MODAL_TITLE': '入室ログ',
    'SETTING_WELCOMEMESSAGE_WELCOME_MODAL_LABEL': '送信先のチャンネル名',
    'SETTING_WELCOMEMESSAGE_LEAVE_MODAL_TITLE': '退室ログ',
    'SETTING_WELCOMEMESSAGE_LEAVE_MODAL_LABEL': 'チャンネル名',
    'SETTING_WELCOMEMESSAGE_WELCOMEMESSAGE_MODAL_TITLE': 'Welcomeメッセージ',
    'SETTING_WELCOMEMESSAGE_WELCOMEMESSAGE_MODAL_LABEL': '入室ログに表示するメッセージを入力してください。',
    'SETTING_WELCOMEMESSAGE_WELCOMEMESSAGE_MODAL_PLACEHOLDER': '<#チャンネルID>や<@ユーザーID>、<@&ロールID> と入力することでそれぞれメンションが可能です!',
    'SETTING_WELCOMEMESSAGE_SELECT_TITLE_1': '入室ログ',
    'SETTING_WELCOMEMESSAGE_SELECT_DESCRIPTION_1': 'メンバー参加時にメッセージを送信',
    'SETTING_WELCOMEMESSAGE_SELECT_TITLE_2': '退室ログ',
    'SETTING_WELCOMEMESSAGE_SELECT_DESCRIPTION_2': 'メンバー退室時にメッセージを送信',

    'SETTING_REPORT': '通報機能',
    'SETTING_REPORT_EMBED_TITLE': '🛠 設定 - 通報機能',
    'SETTING_REPORT_EMBED_DESCRIPTION': '**Tips**: コンテキストメニュー自体の機能をOFFにしたい場合は、`サーバー設定→連携サービス→NoNICK.js`から変更できます。```メンバーがサーバールール等に違反しているメッセージを通報できる機能です。モデレーターがメッセージを監視する必要がなくなるため、運営の負担を減らせます。```\n**【現在の設定】**',
    'SETTING_REPORT_EMBED_FIELD_1': '通報の送信先',
    'SETTING_REPORT_EMBED_FIELD_2': 'ロールメンション',
    'SETTING_REPORT_SELECT_TITLE_1': '全般設定',
    'SETTING_REPORT_SELECT_TITLE_2': 'ロールメンション機能',
    'SETTING_REPORT_SELECT_DESCRIPTION_2': '通報受け取り時にロールをメンション',
    'SETTING_REPORT_REPORTCH_MODAL_TITLE': '送信先',
    'SETTING_REPORT_REPORTCH_MODAL_LABEL': 'チャンネル名',
    'SETTING_REPORT_REPORTROLE_MODAL_TITLE': 'ロールメンション',
    'SETTING_REPORT_REPORTROLE_MODAL_LABEL': 'ロール名',

    'SETTING_MESSAGELINKEXPANSION': 'リンク展開',
    'SETTING_MESSAGELINKEXPANSION_EMBED_TITLE': '🛠 設定 - リンク展開',
    'SETTING_MESSAGELINKEXPANSION_EMBED_DESCRIPTION': '```Discordのメッセージリンクを送信した際にリンク先のメッセージを表示してくれる機能です。\n流れてしまったメッセージや過去のメッセージをチャットに出したい時に便利です。```\n**【現在の設定】**',
    'SETTING_MESSAGELINKEXPANSION_EMBED_FIELD_1': 'リンク展開',
    'SETTING_MESSAGELINKEXPANSION_SELECT_TITLE_1': '全般設定',

    'SETTING_MUSIC': '音楽再生',
    'SETTING_MUSIC_EMBED_TITLE': '🛠 設定 - 音楽再生',
    'SETTING_MUSIC_EMBED_DESCRIPTION': '**Tips**: スラッシュコマンド自体の機能をOFFにしたい場合は、`サーバー設定→連携サービス→NoNICK.js`から変更できます。```YoutubeやSpotify、SoundCloudにある音楽をVCで再生することができます。ボイスチャット内で音楽を再生させたい時に便利です。```\n**【現在の設定】**',
    'SETTING_MUSIC_EMBED_FIELD_1': 'DJモード',
    'SETTING_MUSIC_EMBED_FIELD_2': '❓DJモードとは',
    'SETTING_MUSIC_EMBED_FIELD_2_VALUE': 'musicコマンドや再生パネルの使用を、指定したロールを持つメンバーと管理者権限をもつメンバーのみ許可します。\n大規模なサーバーで使用する場合やVC荒らしを防止するために、**この設定を有効にすることをおすすめします。**',
    'SETTING_MUSIC_SELECT_TITLE_1': 'DJモード',
    'SETTING_MUSIC_DJROLE_MODAL_TITLE': 'DJモード',
    'SETTING_MUSIC_DJROLE_MODAL_LABEL': 'ロール名',
    'SETTING_LANGUAGE_TITLE': '🌐 言語設定',
    'SETTING_LANGUAGE_DESCRIPTION': '使用する言語を選択してください。',

    // ConnectionError
    'CONNECTIONERROR_EMBED_TITLE': 'エラー!',

    // GuidlMemberAdd
    'GUILDMEMBERADD_BOT_TITLE': (name) => `${name} が導入されました!`,
    'GUILDMEMBERADD_MEMBER_DESCRIPTION': (array) => `${array[0]} **(${array[1]})** さん\n**${array[2]}** へようこそ!\n${array[3]}\n\n現在のメンバー数: **${array[4]}**`,

    // GuildMemverRemove
    'GUILDMEMBERREMOVE_BOT_TITLE': (name) => `${name} が廃止されました`,
    'GUILDMEMBERREMOVE_MEMBER': (name) => `**${name}** さんがサーバーを退出しました👋`,

    // TrackStart
    'TRACKSTART_PLAYING': '再生中',

    // MessageCreate
    'MESSAGECREATE_MESSAGELINKEXPANSION_CONTENTEMBED_TITLE': 'メッセージ展開',
    'MESSAGECREATE_MESSAGELINKEXPANSION_CONTENTEMBED_FIELD': 'メッセージの内容',
    'MESSAGECREATE_MESSAGELINKEXPANSION_ERROR_TITLE': 'エラー!',

    // 通報機能
    'REPORT_NOT_SETTING': '⚠️ **この機能を使用するには追加で設定が必要です。**\nBOTの設定権限を持っている人に連絡してください。',
    'REPORT_NOT_SETTING_ADMIN': '⚠️ **この機能を使用するには追加で設定が必要です。**\n`/setting`で通報機能の設定を開き、通報を受け取るチャンネルを設定してください。',
    'REPORT_NOT_SETTING_ADMIN_IMAGE': 'https://cdn.discordapp.com/attachments/958791423161954445/976117804879192104/unknown.png',
    'REPORT_MEMBER_UNDEFINED': '❌ そのユーザーはこのサーバーにいません!',
    'REPORT_MYSELF': '僕を通報しても意味ないよ。',
    'REPORT_BOT': '❌ BOT、Webhook、システムメッセージを通報することはできません!',
    'REPORT_YOURSELF': '自分自身を通報していますよ...',
    'REPORT_ADMIN': '❌ このコマンドでサーバー運営者を通報することはできません!',
    'REPORT_SUCCESS': '✅ **報告ありがとうございます!** 通報をサーバー運営に送信しました!',
    'REPORT_ERROR': '❌ 通報の送信中に問題が発生しました。',
    'REPORT_BUTTON_LABEL': '通報',
    'REPORT_MODAL_LABEL': '通報内容',
    'REPORT_MODAL_PLACEHOLDER': 'できる限り詳しく入力してください',

    'REPORT_MESSAGE_EMBED_TITLE': '⚠️ メッセージを通報',
    'REPORT_MESSAGE_EMBED_DESCRIPTION': 'このメッセージを通報してもよろしいですか?```通報はこのサーバーの運営にのみ送信され、Discordには送信されません。```',
    'REPORT_MESSAGE_EMBED_FIELD_1': '投稿者',
    'REPORT_MESSAGE_EMBED_FIELD_2': '投稿先',
    'REPORT_MESSAGE_EMBED_FIELD_2_VALUE': (ch, url) => `${ch} [リンク](${url})`,
    'REPORT_MESSAGE_EMBED_FIELD_3': 'メッセージ',
    'REPORT_MESSAGE_MODAL_TITLE': 'メッセージを通報',
    'REPORT_MESSAGE_SLAVE_EMBED_TITLE': '⚠️ 通報 (メッセージ)',
    'REPORT_MESSAGE_SLAVE_EMBED_FOOTER': (tag) => `通報者: ${tag}`,
    'REPORT_USER_EMBED_TITLE': '⚠️ ユーザーを通報',
    'REPORT_USER_EMBED_DESCRIPTION': 'このユーザーを通報してもよろしいですか?```通報はこのサーバーの運営にのみ送信され、Discordには送信されません。```',
    'REPORT_USER_EMBED_FIELD_1': '対象者',
    'REPORT_USER_MODAL_TITLE': 'メンバーを通報',
    'REPORT_USER_SLAVE_EMBED_TITLE': '⚠️ 通報 (ユーザー)',
    'REPORT_USER_SLAVE_EMBED_FOOTER': (tag) => `通報者: ${tag}`,

    // userinfoコンテキストメニュー
    'USERINFO_NONE': '__なし__',
    'USERINFO_NICKNAME': (name) => `${discord.Formatters.formatEmoji('973880625566212126')} ニックネーム: **${name}**`,
    'USERINFO_USERID': (id) => `${discord.Formatters.formatEmoji('973880625641705522')} ユーザーID: ${id}`,
    'USERINFO_CREATETIME': 'アカウント作成日',
    'USERINFO_JOINTIME': 'サーバー参加日',
    'USERINFO_ROLE': 'ロール',
    'USERINFO_BOOSTTIME': (time) => `最後にブーストした日: ${discord.Formatters.time(time, 'D')}`,

    // timeoutコマンド
    'TIMEOUT_PERMISSION_ERROR': '❌ あなたにはこのコマンドを使用する権限がありません！\n必要な権限: `メンバーをタイムアウト`',
    'TIMEOUT_REASON_NONE': '理由が入力されていません',
    'TIMEOUT_MEMBER_UNDEFINED': '❌ そのユーザーはこのサーバーにいません!',
    'TIMEOUT_ROLE_ERROR': '❌ 最上位の役職が自分より上か同じメンバーをタイムアウトさせることはできません!',
    'TIMEOUT_MYSELF': '代わりに君をタイムアウトしようかな?',

    'TIMEOUT_RESULT': (array) => `⛔ ${array[0]}を**\`${array[1]}\`日\`${array[2]}\`分**タイムアウトしました。`,
    'TIMEOUT_ERROR': (id) => `❌ <@${id}> (\`${id}\`)のタイムアウトに失敗しました。\nBOTより上の権限を持っているか、サーバーの管理者です。`,
    'TIMEOUT_LOG_EMBED_TITLE': '⛔タイムアウト',
    'TIMEOUT_LOG_EMBED_FIELD_1': '処罰を受けた人',
    'TIMEOUT_LOG_EMBED_FIELD_2': 'タイムアウトが解除される時間',
    'TIMEOUT_LOG_EMBED_FIELD_3': 'タイムアウトした理由',
    'TIMEOUT_LOG_EMBED_FOOTER': (tag) => `コマンド使用者: ${tag}`,
    'TIMEOUT_DM_EMBED_TITLE': '⛔タイムアウト',
    'TIMEOUT_DM_DESCRIPTION': (guild) => `あなたは**${guild}**からタイムアウトされました。`,
    'TIMEOUT_DM_EMBED_FIELD_1': 'タイムアウトが解除される時間',
    'TIMEOUT_DM_EMBED_FIELD_2': 'タイムアウトされた理由',
    'TIMEOUT_DM_SEND_ERROR': '⚠️ タイムアウトした人への警告DMに失敗しました。メッセージ受信を拒否しています。',

    // 音楽再生機能
    'MUSIC_DJROLE': (role) => `❌ この機能は<@${role}>を持つメンバーのみが使用できます!`,
    'MUSIC_VC_NOTJOIN': '❌ ボイスチャンネルに参加してください!',
    'MUSIC_PLAYINGVC_NOTJOIN': '❌ 現在再生中のボイスチャンネルに参加してください!',
    'MUSIC_NULLQUEUE': '❌ キューがありません!',

    'MUSIC_PLAY_ERROR': '❌ ボイスチャンネルにアクセスできません!',
    'MUSIC_PLAY_URLERROR': (query) => `❌ ${query} が見つかりません!\n正しいURLを入力してください。`,
    'MUSIC_ADDQUEUE': 'キューに追加されました!',
    'MUSIC_STOP_SUCCESS': '⏹ プレイヤーを停止しました',
    'MUSIC_QUEUE_NULL': 'なし',
    'MUSIC_QUEUE_PLAYMODE_1': '▶️ 通常再生',
    'MUSIC_QUEUE_PLAYMODE_2': '🔂 1曲ループ再生',
    'MUSIC_QUEUE_PLAYMODE_3': '🔁 キューループ再生',
    'MUSIC_QUEUE_EMBED_FIELD_1': 'キュー',
    'MUSIC_QUEUEDELETE_ERROR': '❌ 無効な値が送信されました!',
    'MUSIC_QUEUEDELETE_SUCCESS': (number) => `🗑️ ${number}つ先の音楽をキューから削除しました。`,
    'MUSIC_SKIP_SUCCESS': (title) => `⏯ **${title}** をスキップしました`,
    'MUSIC_LOOP_PLAYMODE_1': '▶️ キューのループ再生を**オフ**にしました',
    'MUSIC_LOOP_PLAYMODE_2': '🔂 1曲ループ再生を**オン**にしました',
    'MUSIC_LOOP_PLAYMODE_3': '🔁 キューループ再生を**オン**にしました',
    'MUSIC_LOOP_BUTTON_PLAYMODE_2': (loopmode) => `🔂 1曲ループ再生を**${loopmode == 0 ? 'オフ' : 'オン' }**にしました`,
    'MUSIC_LOOP_BUTTON_PLAYMODE_3': (loopmode) => `🔁 ループ再生を**${loopmode == 0 ? 'オフ' : 'オン' }**にしました`,
    'MUSIC_VOLUME_ERROR': '❌ 音量は`1`から`200`までの間で指定してください!',
    'MUSIC_VOLUME_MODAL_TITLE': '音量設定',
    'MUSIC_VOLUME_MODAL_LABEL': (volume) => `現在の音量: ${volume}`,
    'MUSIC_VOLUME_MODAL_PLACEHOLDER': '0~200までの値で指定してください',
    'MUSIC_VOLUME_SUCCESS': (amount) => `🔊 音量を\`${amount}\`に変更しました`,
    'MUSIC_PAUSE_SUCCESS': (paused) => `${paused ? '⏸️' : '▶️' } 音楽を**${paused ? '一時停止' : '再生' }**しました`,
    'MUSIC_PREV_SUCCESS': '⏮️ 一つ前の音楽を再生します',
    'MUSIC_PREV_ERROR': '❌ これより前に再生した曲がありません!',
    'MUSIC_10SECAGO_SUCCESS': '⏪ `10`秒巻き戻しました',
    'MUSIC_10SECSKIP_SUCCESS': '⏩ `10`秒スキップしました',
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (!translation) return '<language error>';
    if (typeof translation === 'function') return translation(args);
    else return translation;
};

module.exports = translate;