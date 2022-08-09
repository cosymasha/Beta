const discord = require('discord.js');
const languageData = {

    NULL: 'なし',
    Common: {
        BlackList: (username) => `🚫 このサーバーでの**${username}**の使用は開発者により禁止されています。禁止された理由や詳細は\`nonick-mc#1017\`までお問い合わせください。`,
    },

    Info: {
        Embed: {
            Description: [
                '「使いやすい」をモットーにした**完全無料の多機能BOT!**',
                '誰でも簡単にBOTを使えるような開発をしています!\n',
                '🔹**搭載中の機能**',
                '`入退室ログ` `通報機能` `リアクションロール` `timeoutコマンド` `banコマンド`'].join('\n'),
            Fotter: {
                Text: '開発者・nonick-mc#1017',
            },
        },
        Button: {
            Label: 'サポートサーバー',
        },
    },

    Setting: {
        Error: {
            Permission: '❌ **あなたにはこれを実行する権限がありません！**\n必要な権限: `サーバー管理`',
            ChNotfound: (name) => `⚠️ ${discord.Formatters.inlineCode(name)}という名前のチャンネルは存在しません!`,
            RoleNotfound: (name) => `⚠️ ${discord.Formatters.inlineCode(name)}という名前のロールは存在しません!`,
            WhatsNew: '⚠️ データの取得に失敗しました。\nしばらく待ってから再度お試しください。',
        },
        Common: {
            Button: {
                Enable: '有効化',
                Disable: '無効化',
                Ch: '送信先',
                Role: 'ロール',
                Message: 'メッセージ',
            },
            Embed: {
                None: '__設定されていません__',
                Enable: `${discord.Formatters.formatEmoji('758380151544217670')} 有効`,
                Ch_Enable: (ch) => `${discord.Formatters.formatEmoji('758380151544217670')} 有効 (<#${ch}>)`,
                Role_Enable: (role) => `${discord.Formatters.formatEmoji('758380151544217670')} 有効 (<@&${role}>)`,
                Disable: `${discord.Formatters.formatEmoji('758380151238033419')} 無効`,
                Channel: {
                    Success: (name) => `✅ **${name}**がここに送信されます!`,
                    Error: '⚠️ **BOTの権限が不足しています!**\n必要な権限: `チャンネルを見る` `メッセージを送信` `埋め込みリンク`',
                },
            },
        },
        Home: {
            Embed: {
                Title: (username) => `🛠 ${username} - 設定`,
                Description: (username) => [
                    `${username}のコントロールパネルへようこそ!`,
                    'ここではこのBOTの設定を変更することができます!',
                    '```セレクトメニューから閲覧・変更したい設定を選択しよう!```',
                ].join('\n'),
            },
            Select: {
                Option: {
                    Label_1: '入退室ログ',
                    Label_2: '通報機能',
                    Label_3: 'リンク展開',
                },
            },
        },
        Language: {
            Embed: {
                Title: '🌐 言語設定',
                Description: '使用する言語を選択してください。',
            },
        },
        WelcomeMessage: {
            Embed: {
                Title: '🛠 設定 - 入退室ログ',
                Description: '```サーバーに新しくメンバーが参加した時や退室した時に通知してくれる機能です。メッセージを設定することで参加した人に見てもらいたい情報を送信できます。```\n**【現在の設定】**',
                Field: {
                    Name_1: '入室ログ',
                    Name_2: '退室ログ',
                    Name_3: '入室ログメッセージ',
                },
            },
            Modal: {
                WelcomeCh: {
                    Title: '入室ログ',
                    Label: 'チャンネル名',
                },
                LeaveCh: {
                    Title: '退室ログ',
                    Label: 'チャンネル名',
                },
                WelcomeMessage: {
                    Title: 'Welcomeメッセージ',
                    Label: 'Message',
                    Placeholder: '<#チャンネルID>や<@ユーザーID>、<@&ロールID> と入力することでそれぞれメンションが可能です',
                },
            },
            Select: {
                Option: {
                    Label_1: '入室ログ',
                    Label_2: '退室ログ',
                    Description_1: 'メンバー参加時にメッセージを送信',
                    Description_2: 'メンバー退室時にメッセージを送信',
                },
            },
        },
        Report: {
            Embed: {
                Title: '🛠 設定 - 通報機能',
                Description: '**Tips**: コンテキストメニュー自体の機能をOFFにしたい場合は、`サーバー設定→連携サービス→NoNICK.js`から変更できます。```メンバーがサーバールール等に違反しているメッセージを通報できる機能です。モデレーターがメッセージを監視する必要がなくなるため、運営の負担を減らせます。```\n**【現在の設定】**',
                Field: {
                    Name_1: '通報の送信先',
                    Name_2: 'ロールメンション',
                },
            },
            Select: {
                Option: {
                    Label_1: '全般設定',
                    Label_2: 'ロールメンション機能',
                    Description_2: '通報受け取り時にロールをメンション',
                },
            },
            Modal: {
                ReportCh: {
                    Title: '通報の送信先',
                    Label: 'チャンネル名',
                },
                ReportRole: {
                    Title: 'ロールメンション',
                    Label: 'ロール名',
                },
            },
        },
        MessageExpansion: {
            Embed: {
                Title: '🛠 設定 - リンク展開',
                Description: '```Discordのメッセージリンクを送信した際にリンク先のメッセージを表示してくれる機能です。\n流れてしまったメッセージや過去のメッセージをチャットに出したい時に便利です。```\n**【現在の設定】**',
                Field: {
                    Name_1: 'リンク展開',
                },
            },
            Select: {
                Option: {
                    Label_1: '全般設定',
                },
            },
        },
    },

    Report: {
        Common: {
            Embed: {
                NotSetting: '⚠️ **この機能を使用するには追加で設定が必要です。**\nBOTの設定権限を持っている人に連絡してください。',
                NotSetting_Admin: '⚠️ **この機能を使用するには追加で設定が必要です。**\n`/setting`で通報機能の設定を開き、通報を受け取るチャンネルを設定してください。',
                NotSetting_Admin_Image: 'https://cdn.discordapp.com/attachments/958791423161954445/976117804879192104/unknown.png',
                Report: {
                    User_Undef: '❌ そのユーザーは削除されています!',
                    Message_Undef: '❌ 通報しようとしているメッセージは削除されました。',
                    Myself: '僕を通報しても意味ないよ。',
                    Yourself: '自分自身を通報していますよ...',
                    Sys: '❌ Webhookやシステムメッセージを通報することはできません!',
                    Admin: '❌ このコマンドでサーバー運営者を通報することはできません!',
                },
                Success: '✅ **報告ありがとうございます!** 通報をサーバー運営に送信しました!',
                Error: '❌ 通報の送信中に問題が発生しました。',
            },
            Modal: {
                Label: '通報理由',
                Placeholder: 'できる限り詳しく入力してください',
            },
        },
        MessageSlave: {
            Embed: {
                Title: '⚠️ 通報 (メッセージ)',
                Field: {
                    Name_1: '投稿者',
                    Name_2: '投稿先',
                    Name_3: 'メッセージ',
                    Value_2: (array) => `${array[0]} [リンク](${array[1]})`,
                },
                Footer: (tag) => `通報者: ${tag}`,
            },
            Modal: {
                Title: 'メッセージを通報',
            },
        },
        UserSlave: {
            Embed: {
                Title: '⚠️ 通報 (メンバー)',
                Field: {
                    Name_1: '対象者',
                },
                Footer: (tag) => `通報者: ${tag}`,
            },
            Modal: {
                Title: 'メンバーを通報',
            },
        },
    },

    UserInfo: {
        Embed: {
            None: '__なし__',
            Member_Undef: '**このユーザーはサーバーにいません**',
            NickName: (name) => `${discord.Formatters.formatEmoji('973880625566212126')} ニックネーム: **${name}**`,
            UserId: (id) => `${discord.Formatters.formatEmoji('973880625641705522')} ユーザーID: \`${id}\``,
            CreateTime: 'アカウント作成日',
            JoinTime: 'サーバー参加日',
            BoostTime: (time) => `ブーストを開始した日: ${discord.Formatters.time(time, 'D')}`,
            Role: 'ロール',
        },
    },

    // ConnectionError
    CONNECTIONERROR_EMBED_TITLE: 'エラー!',

    // GuidlMemberAdd
    GUILDMEMBERADD_BOT_TITLE: (name) => `${name} が導入されました!`,
    GUILDMEMBERADD_MEMBER_DESCRIPTION: (array) => `${array[0]} **(${array[1]})** さん\n**${array[2]}** へようこそ!\n${array[3]}\n\n現在のメンバー数: **${array[4]}**`,

    // GuildMemverRemove
    GUILDMEMBERREMOVE_BOT_TITLE: (name) => `${name} が廃止されました`,
    GUILDMEMBERREMOVE_MEMBER: (name) => `**${name}** さんがサーバーを退出しました👋`,

    // TrackStart
    TRACKSTART_PLAYING: '再生中',

    // MessageCreate
    MESSAGECREATE_MESSAGELINKEXPANSION_CONTENTEMBED_TITLE: 'メッセージ展開',
    MESSAGECREATE_MESSAGELINKEXPANSION_CONTENTEMBED_FIELD: 'メッセージの内容',
    MESSAGECREATE_MESSAGELINKEXPANSION_ERROR_TITLE: 'エラー!',


    // timeoutコマンド
    TIMEOUT_PERMISSION_ERROR: '❌ あなたにはこのコマンドを使用する権限がありません！\n必要な権限: `メンバーをタイムアウト`',
    TIMEOUT_REASON_NONE: '理由が入力されていません',
    TIMEOUT_MEMBER_UNDEFINED: '❌ そのユーザーはこのサーバーにいません!',
    TIMEOUT_ROLE_ERROR: '❌ 最上位の役職が自分より上か同じメンバーをタイムアウトさせることはできません!',
    TIMEOUT_MYSELF: '代わりに君をタイムアウトしようかな?',
    TIMEOUT_RESULT: (array) => `⛔ ${array[0]}を**\`${array[1]}\`日\`${array[2]}\`分**タイムアウトしました。`,
    TIMEOUT_ERROR: (id) => `❌ <@${id}> (\`${id}\`)のタイムアウトに失敗しました。\nBOTより上の権限を持っているか、サーバーの管理者です。`,
    TIMEOUT_LOG_EMBED_TITLE: '⛔タイムアウト',
    TIMEOUT_LOG_EMBED_FIELD_1: '処罰を受けた人',
    TIMEOUT_LOG_EMBED_FIELD_2: 'タイムアウトが解除される時間',
    TIMEOUT_LOG_EMBED_FIELD_3: 'タイムアウトした理由',
    TIMEOUT_LOG_EMBED_FOOTER: (tag) => `コマンド使用者: ${tag}`,
    TIMEOUT_DM_EMBED_TITLE: '⛔タイムアウト',
    TIMEOUT_DM_DESCRIPTION: (guild) => `あなたは**${guild}**からタイムアウトされました。`,
    TIMEOUT_DM_EMBED_FIELD_1: 'タイムアウトが解除される時間',
    TIMEOUT_DM_EMBED_FIELD_2: 'タイムアウトされた理由',
    TIMEOUT_DM_SEND_ERROR: '⚠️ タイムアウトした人への警告DMに失敗しました。メッセージ受信を拒否しています。',

    // Reactionコマンド
    REACTION_PERMISSION_ERROR: '❌ あなたにはこのコマンドを使用する権限がありません!\n必要な権限: `ロールを管理`',
    REACTION_ROLE_UNDEF: '❌ その名前のロールは存在しません!',
    REACTION_EMOJI_UNDEF: '❌ その名前の絵文字は存在しません!',
    REACTION_MODAL_TITLE: 'リアクションロールパネル',
    REACTION_MODAL_LABEL_1: 'タイトル',
    REACTION_MODAL_LABEL_2: '説明',
    REACTION_MODAL_PLACEHOLDER_2: 'このリアクションロールについて説明しよう',
    REACTION_MODAL_LABEL_3: '画像URL',
    REACTION_MODAL_PLACEHOLDER_3: 'http(s):// から始まるURLのみ対応しています。',
    REACTION_BUTTON_2: '追加',
    REACTION_BUTTON_3: '削除',
    REACTION_BUTTON_4_SINGLE: '単一選択',
    REACTION_BUTTON_4_MULTI: '複数選択',
    REACTION_BUTTON_5: '送信',
    REACTION_BUTTON_6: '編集',
    REACTION_CONTENT: '**プレビューモード**\n「送信」ボタンを押すとこのチャンネルにパネルを送信します。',
    REACTION_CONTENT_EDIT: '**プレビューモード**\n「編集」ボタンを押すとパネルの編集を終了します。',
    REACTION_SUCCESS: '✅ ロールを更新しました!',
    REACTION_ERROR: `${discord.Formatters.formatEmoji('968351750434193408')} 一部ロールが付与できませんでした。サーバーの管理者にお問い合わせください。`,
    REACTION_ERROR_ADMIM: (name) => `${discord.Formatters.formatEmoji('968351750434193408')} 一部ロールが付与できませんでした。以下を確認してください。\n・${name}に\`ロール管理\`権限が付与されているか。\n・パネルにある役職よりも上に${name}が持つ役職があるか。\n・ロールが存在しているか。`,
    REACTION_ADDROLE_ERROR: '❌ これ以上ロールを追加できません!',
    REACTION_ADDROLE_MODAL_TITLE: 'ロールを追加',
    REACTION_ADDROLE_MODAL_LABEL_1: 'ロールの名前',
    REACTION_ADDROLE_MODAL_LABEL_2: '表示名',
    REACTION_ADDROLE_MODAL_LABEL_3: '説明',
    REACTION_ADDROLE_MODAL_LABEL_4: 'カスタム絵文字',
    REACTION_ADDROLE_MODAL_PLACEHOLDER_4: '絵文字名で入力してください',
    REACTION_DELETEROLE_ERROR: '❌ まだ1つもロールを追加していません!',
    REACTION_DELETEROLE_ROLE_NOTINCLUDE: '❌ このロールはパネルに追加されていません!',
    REACTION_DELETEROLE_MODAL_TITLE: 'ロール削除',
    REACTION_DELETEROLE_MODAL_LABEL: 'ロールの名前',
    REACTION_EDITEMBED_MODAL_TITLE: 'パネルの編集',
    REACTION_MODE_ERROR: '❌ まずはロールを追加してください!',
    REACTION_SEND_SUCCESS: '✅ パネルを作成しました!',
    REACTION_SEND_ERROR: '❌ このチャンネルに送信する権限がありません!',
    REACTION_EDIT_SEND: '✅ 元のパネルが見つからないため、新たにパネルを送信しました!',
    REACTION_EDIT_SUCCESS: '✅ パネルを編集しました!',

    EDITPANEL_NOTPANEL: '❌ それはリアクションロールパネルではありません!',

};

/**
 * @callback translateCallback
 * @param {string} key
 */

/** @type {translateCallback} */
const translate = (key, args) => {

    const properties = key.split('.');
    let translation = languageData[properties[0]];

    for (let i = 1; i <= properties.length - 1; i++) {
        if (!translation) return '<language error>';
        translation = translation[properties[i]];
    }

    if (typeof translation === 'function') return translation(args);
    else return translation;
};

module.exports = translate;