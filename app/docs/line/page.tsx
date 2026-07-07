import Divider from "@/app/ui/Divider";
import Image from "next/image";
import { bgColor2, bgColor5, fontColor1, fontColor2 } from "@/lib/constants";

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
              style={{ color: fontColor1, textDecoration: "underline" }}
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
              alt="Line Docsのスクリーンショット1"
              width={2592}
              height={1190}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              <strong style={{ color: fontColor1 }}>名前</strong>
              と
              <strong style={{ color: fontColor1 }}>メールアドレス</strong>
              を入力し、Developerアカウントを作成します。
            </li>

            <li>
              続いて、
              <strong style={{ color: fontColor1 }}>
                プロバイダーを作成
              </strong>
              でプロバイダー名を入力し、プロバイダーを作成します。
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
              アカウント作成を完了すると、
              <strong style={{ color: fontColor1 }}>
                Channel secret
              </strong>
              が表示されます。この値をコピーしてください。
            </li>

            <Image
              src="/line-docs-screenshot-2.png"
              alt="Line Docsのスクリーンショット2"
              width={2590}
              height={1514}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              Kenchiku AIに管理者、または管理者権限を持つユーザーでログインし、
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
              <a
                href="https://developers.line.biz/console/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: fontColor1, textDecoration: "underline" }}
              >
                LINE Developersコンソール
              </a>
              を開き、作成したプロバイダーをクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-3.png"
              alt="Line Docsのスクリーンショット3"
              width={2630}
              height={1332}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              <strong style={{ color: fontColor1 }}>
                「チャネル設定」
              </strong>
              タブが選択されていることを確認し、Messaging APIチャネルをクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-4.png"
              alt="Line Docsのスクリーンショット4"
              width={2630}
              height={1622}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              <strong style={{ color: fontColor1 }}>
                「Messaging API設定」
              </strong>
              タブを開き、
              <strong style={{ color: fontColor1 }}>
                Webhook
              </strong>
              の設定項目までスクロールします。
              <strong style={{ color: fontColor1 }}>
                「Webhookの利用」
              </strong>
              が有効になっていることを確認してください。
            </li>

            <p>
              ※「Webhookの利用」が表示されない場合は、Webhook URLが入力されていることを確認し、保存してください。
            </p>

            <Image
              src="/line-docs-screenshot-5.png"
              alt="Line Docsのスクリーンショット5"
              width={2630}
              height={1480}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <Image
              src="/line-docs-screenshot-6.png"
              alt="Line Docsのスクリーンショット6"
              width={2630}
              height={1294}
              priority
              className="10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              最後にLINE Official Account Managerに戻り、
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
              が選択されていることを確認します。
            </li>

            <Image
              src="/line-docs-screenshot-7.png"
              alt="Line Docsのスクリーンショット7"
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
          ユーザーアカウントの連携
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            LINEから報告書を更新するには、各ユーザーが自分のKenchiku AIアカウントとLINEアカウントを連携する必要があります。この設定は会社ごとに行います。
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
              <code style={{ color: fontColor1 }}>U-XXXX</code>
              ）をコピーします。
            </li>

            <li>
              LINEで会社のLINE公式アカウントとの1対1のトークを開き、コピーしたコードを送信します。
            </li>
          </ol>

          <p>
            コードを送信すると、登録済みのメールアドレスに確認メールが届きます。メール内の案内に従って手続きを完了してください。
          </p>

          <p>
            複数の会社でKenchiku AIを利用している場合は、会社ごとに同じ手順でアカウントを連携してください。
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
            現場ごとにLINEグループを利用している場合は、LINEグループとKenchiku AIのプロジェクトを連携することで、グループ内のメッセージを自動的に該当するプロジェクトの報告書へ反映できます。
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
              <code style={{ color: fontColor1 }}>P-XXXX</code>
              ）をコピーします。
            </li>

            <li>
              連携するLINEグループで、コピーしたコードをメッセージとして送信します。
            </li>
          </ol>

          <p>
            このコードは、対象のプロジェクトとLINEグループの両方にアクセスできるユーザーであれば送信できます。
          </p>

          <p>
            別のプロジェクトへ連携先を変更する場合は、新しいプロジェクトの連携コードを同じLINEグループに送信してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINEメッセージによる報告書の更新
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            アカウント連携が完了したユーザーがLINEでメッセージを送信すると、Kenchiku AIが内容を解析し、該当する報告書を自動的に更新します。更新の流れは以下のとおりです。
          </p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                1. 更新対象の報告書を特定
              </div>

              <p className="mt-1">
                メッセージを受信すると、送信者に関連付けられたプロジェクト内の「オープン」の報告書を最大10件検索します。AIがメッセージの内容と各報告書の情報をもとに、最も適した報告書を自動的に選択します。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                2. 報告書を更新
              </div>

              <p className="mt-1">
                AIがメッセージの内容を解析し、該当する項目を自動的に更新します。例えば、「今日の作業員数は8名」と送信すると、作業員数の項目が更新されます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                LINEグループから送信した場合
              </div>

              <p className="mt-1">
                プロジェクトと連携済みのLINEグループでは、そのプロジェクトの最新の「オープン」の報告書が更新対象になります。なお、メッセージを送信したユーザーもKenchiku AIとLINEアカウントを連携している必要があります。
              </p>
            </div>
          </div>

          <p>
            更新は自動的に行われます。反映後は、Kenchiku AIのWebアプリまたはモバイルアプリで内容をご確認ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          注意事項
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              LINEから更新できるのは、ステータスが「オープン」の報告書のみです。クローズ済みの報告書は更新されません。
            </li>

            <li>
              メッセージの内容が報告書内のどの項目にも該当しない場合、報告書は更新されません。
            </li>

            <li>
              LINEグループからメッセージを反映するには、送信者のLINEアカウントがKenchiku AIと連携済みであり、LINEグループがプロジェクトと連携済みである必要があります。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>Channel secret</strong>
              は安全に管理してください。第三者に知られると、不正なリクエストが送信されるおそれがあります。
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          LINE連携を利用することで、現場のメンバーはKenchiku AIを直接操作しなくても、普段使っているLINEから報告書を更新できます。さらに、ユーザーアカウントとLINEグループの両方を設定することで、現場ごとの報告内容をより正確に管理できます。
        </p>
      </section>
    </div>
  );
}
