import Divider from "@/app/ui/Divider";
import Image from "next/image";
import { bgColor2, bgColor5, buttonColor, fontColor1, fontColor2 } from "@/lib/constants";

export default function LinePage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          LINE連携
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p>
          Kenchiku AIはLINEと連携することで、現場からのメッセージを報告書に自動反映できます。LINEのダイレクトメッセージやグループチャットで送信したテキストがAIによって解析され、該当するフィールドに書き込まれます。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINE公式アカウントの作成・連携設定
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            LINE連携を利用するには、LINE公式アカウントの設定とKenchiku AIとの連携設定が必要です。以下の手順に沿って設定してください。
          </p>

          <p>
            まだLINE公式アカウントを作成していない場合は、
            <a
              href="https://account.line.biz/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: buttonColor, textDecoration: "underline" }}
            >
              LINE公式アカウント
            </a>
            から作成してください。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              LINE Official Account Managerで
              <strong style={{ color: fontColor1 }}>
                「設定 → Messaging API」
              </strong>
              を開き、
              <strong style={{ color: fontColor1 }}>
                「Messaging APIを利用する」
              </strong>
              ボタンをクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-1.png"
              alt="LINE設定画面のスクリーンショット"
              width={2592}
              height={1190}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              LINE Developersアカウントをまだ作成していない場合は、
              <strong style={{ color: fontColor1 }}>名前</strong>
              と
              <strong style={{ color: fontColor1 }}>メールアドレス</strong>
              を入力してLINE Developersアカウントを作成します。すでに作成済みの場合は、この手順は表示されません。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>プロバイダーを作成</strong>
              が表示された場合は、プロバイダー名を入力してプロバイダーを作成します。すでにプロバイダーがある場合は、そのまま次へ進んでください。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                プライバシーポリシー
              </strong>
              と
              <strong style={{ color: fontColor1 }}>
                利用規約
              </strong>
              は設定しなくても問題ありません。そのまま次へ進んでください。
            </li>

            <li>
              Messaging APIチャネルの作成が完了すると、
              <strong style={{ color: fontColor1 }}>
                Channel secret
              </strong>
              が表示されます。この値をコピーしてください。
            </li>

            <Image
              src="/line-docs-screenshot-2.png"
              alt="LINE設定画面のスクリーンショット"
              width={2590}
              height={1514}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              Kenchiku AIに管理者または管理者権限を持つユーザーでログインし、
              <strong style={{ color: fontColor1 }}>
                「LINE連携」
              </strong>
              ページを開きます。
              <strong style={{ color: fontColor1 }}>
                Channel secret
              </strong>
              欄にコピーした値を貼り付け、
              <strong style={{ color: fontColor1 }}>
                「保存」
              </strong>
              をクリックします。
            </li>

            <li>
              引き続きKenchiku AIの
              <strong style={{ color: fontColor1 }}>
                「LINE連携」
              </strong>
              ページで、
              <strong style={{ color: fontColor1 }}>
                「Webhook URLをコピー」
              </strong>
              ボタンをクリックしてWebhook URLをコピーします。
            </li>

            <li>
              LINE Official Account Managerに戻り、
              <strong style={{ color: fontColor1 }}>
                「設定 → Messaging API」
              </strong>
              を開きます。
              <strong style={{ color: fontColor1 }}>
                Webhook URL
              </strong>
              欄にコピーしたURLを貼り付け、
              <strong style={{ color: fontColor1 }}>
                「保存」
              </strong>
              をクリックします。
            </li>

            <li>
              LINE Official Account Managerで
              <strong style={{ color: fontColor1 }}>
                「設定 → 応答設定」
              </strong>
              を開きます。
              <strong style={{ color: fontColor1 }}>
                「Webhook」
              </strong>
              の設定が
              <strong style={{ color: fontColor1 }}>
                有効
              </strong>
              になっていることを確認してください。
            </li>

            <Image
              src="/line-docs-screenshot-3.png"
              alt="LINE設定画面のスクリーンショット"
              width={2562}
              height={1388}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              最後に、
              <strong style={{ color: fontColor1 }}>
                「設定 → アカウント設定」
              </strong>
              を開きます。
              <strong style={{ color: fontColor1 }}>
                「トークへの参加」
              </strong>
              の設定で、
              <strong style={{ color: fontColor1 }}>
                「グループ・複数人トークへの参加を許可する」
              </strong>
              が有効になっていることを確認してください。
            </li>

            <Image
              src="/line-docs-screenshot-4.png"
              alt="LINE設定画面のスクリーンショット"
              width={2560}
              height={1648}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />
          </ol>

          <p>
            以上で、LINE公式アカウントとKenchiku AIの連携設定は完了です。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINEグループとプロジェクトの連携
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            LINEグループをKenchiku AIのプロジェクトと連携すると、そのグループが対象プロジェクトと連携されます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Kenchiku AIのプロジェクト画面を開きます。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「LINE連携コードをコピー」
              </strong>
              をクリックし、プロジェクト連携コード（例：
              <code style={{ color: fontColor1 }}>P-XXXXXX</code>
              ）をコピーします。
            </li>

            <li>
              連携するLINEグループで、コピーしたコードをメッセージとして送信します。
            </li>
          </ol>

          <p>
            プロジェクト連携コードは、対象のプロジェクトを閲覧できるユーザーであれば誰でも送信できます。
          </p>

          <p>
            連携するLINEグループには、会社のLINE公式アカウントが参加している必要があります。
          </p>

          <p>
            別のプロジェクトへ連携先を変更する場合は、新しいプロジェクトの連携コードを同じLINEグループに送信してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          ユーザーアカウントの連携
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            LINEからKenchiku AIを利用するには、まず自分のLINEアカウントとKenchiku AIのユーザーアカウントを連携します。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Kenchiku AIのユーザー画面を開きます。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「LINE連携コードをコピー」
              </strong>
              をクリックし、表示された連携コード（例：
              <code style={{ color: fontColor1 }}>U-XXXXXX</code>
              ）をコピーします。
            </li>

            <li>
              ご自身のLINEアカウントから、会社のLINE公式アカウントとの1対1のトーク、または会社のLINE公式アカウントが参加しているLINEグループへ、コピーしたコードを送信します。
            </li>
          </ol>

          <p>
            コードを送信すると、LINEアカウントとKenchiku AIのユーザーアカウントの連携が完了します。
          </p>
        </div>
      </section>

    </div>
  );
}
