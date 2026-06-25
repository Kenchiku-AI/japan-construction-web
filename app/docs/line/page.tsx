import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function LinePage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          LINE連携
        </div>
        <Divider />
        <p className="mt-4">
          Kenchiku AIはLINEと連携することで、現場からのメッセージを報告書に自動反映できます。LINEのダイレクトメッセージやグループチャットで送信したテキストがAIによって解析され、該当するフィールドに書き込まれます。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          事前準備：LINEビジネスアカウントの作成
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            LINE連携を利用するには、会社としてのLINE公式アカウントが必要です。まだお持ちでない場合は、<a href="https://account.line.biz/" target="_blank" rel="noopener noreferrer" style={{ color: fontColor1, textDecoration: "underline" }}>LINE公式アカウントページ</a>からアカウントを作成してください。
          </p>
          <p>
            公式アカウントを作成したら、Messaging APIチャネルを設定します。LINEの公式アカウント管理画面から「設定 → Messaging API」を開き、Messaging APIを有効にしてください。詳細な手順は<a href="https://developers.line.biz/ja/docs/messaging-api/getting-started/" target="_blank" rel="noopener noreferrer" style={{ color: fontColor1, textDecoration: "underline" }}>LINE Developers公式ドキュメント</a>をご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Kenchiku AIへのLINE設定
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>Messaging APIを有効にしたら、以下の手順でKenchiku AIと連携します。</p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              LINE公式アカウント管理画面の「設定 → Messaging API」を開き、<strong style={{ color: fontColor1 }}>チャネルシークレット</strong>をコピーする
            </li>
            <li>
              Kenchiku AIに管理者または管理者権限のあるユーザーとしてログインし、会社のホーム画面にある「LINE連携」ボタンをクリックする
            </li>
            <li>
              コピーしたチャネルシークレットをテキストフィールドに貼り付けて保存する
            </li>
            <li>
              保存後、ホーム画面に「LINE Webhook URLをコピー」ボタンが表示されるので、クリックしてWebhook URLをコピーする
            </li>
            <li>
              LINE公式アカウント管理画面の「設定 → Messaging API」に戻り、コピーしたURLを<strong style={{ color: fontColor1 }}>Webhook URL</strong>フィールドに貼り付けて保存する
            </li>
          </ol>

          <p>
            以上でKenchiku AIとLINEの基本接続が完了します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ユーザーアカウントの連携
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            LINEメッセージを報告書に反映するには、各ユーザーが自分のKenchiku AIアカウントとLINEアカウントを紐付ける必要があります。連携は会社ごとに行います。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Kenchiku AIのユーザー画面を開く
            </li>
            <li>
              「LINE連携コードをコピー」ボタンをクリックし、表示されたコード（例：<code style={{ color: fontColor1 }}>U-XXXX</code>）をコピーする
            </li>
            <li>
              LINEアプリから会社のLINE公式アカウントにダイレクトメッセージでそのコードを送信する
            </li>
          </ol>

          <p>
            送信が完了すると、登録済みのメールアドレスに確認メールが届きます。複数の会社のLINEチャネルを利用する場合は、会社ごとにこの手順を繰り返してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          LINEグループとプロジェクトの連携
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            現場ごとにLINEグループを使っている場合、グループとKenchiku AIのプロジェクトを紐付けることで、グループ内のメッセージが自動的に正しいプロジェクトの報告書に反映されます。
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Kenchiku AIのプロジェクト画面を開く
            </li>
            <li>
              「LINE連携コードをコピー」ボタンをクリックし、プロジェクトコード（例：<code style={{ color: fontColor1 }}>P-XXXX</code>）をコピーする
            </li>
            <li>
              対象のLINEグループにそのコードをメッセージとして送信する
            </li>
          </ol>
          <p>
            このコードは、Kenchiku AIのプロジェクトとLINEグループ両方にアクセスできるユーザーであれば誰でも送信できます。グループの連携先プロジェクトを変更したい場合は、新しいプロジェクトコードを同じグループに再度送信してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          LINEメッセージから報告書を更新する仕組み
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            アカウント連携が完了したユーザーがLINEでテキストメッセージを送信すると、Kenchiku AIが自動的に内容を解析して報告書のフィールドを更新します。処理の流れは以下のとおりです。
          </p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                1. 対象報告書の特定
              </div>
              <p className="mt-1">
                メッセージが届くと、送信者のアカウントと紐付いたプロジェクトの中から、ステータスが「オープン」の報告書を最大10件取得します。AIがメッセージの内容と各報告書のフィールド情報を照合し、最も関連性の高い報告書を自動的に選択します。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                2. フィールドの抽出・書き込み
              </div>
              <p className="mt-1">
                対象報告書が特定されると、AIがメッセージから関連するフィールドの値を抽出し、該当フィールドに書き込みます。たとえば「今日の作業員数は8名」と送ると、作業員数フィールドが自動更新されます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                グループメッセージの場合
              </div>
              <p className="mt-1">
                プロジェクトと連携済みのLINEグループからメッセージが届いた場合、そのプロジェクトで最新のオープン報告書が対象になります。送信者のLINEアカウントもKenchiku AIと連携している必要があります。
              </p>
            </div>
          </div>

          <p>
            処理はバックグラウンドで行われます。更新結果はKenchiku AIのWebアプリまたはモバイルアプリで確認してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          注意事項
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              LINEメッセージで更新できるのは、ステータスが「オープン」の報告書のみです。クローズ済みの報告書は更新されません。
            </li>
            <li>
              送信したメッセージのどのフィールドにも一致する内容がない場合、報告書は更新されません。
            </li>
            <li>
              LINEグループからのメッセージを反映するには、送信者のLINEアカウントがKenchiku AIアカウントと連携していることと、グループがプロジェクトと連携していることの両方が必要です。
            </li>
            <li>
              チャネルシークレットは安全に管理してください。不正なメッセージが報告書に書き込まれることを防ぐため、第三者への共有はお控えください。
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p>
          LINE連携を活用することで、現場のメンバーがKenchiku AIを直接操作しなくても、普段使いのLINEから報告書を更新できます。グループ連携とユーザー連携を組み合わせることで、より正確に情報を管理できます。
        </p>
      </section>
    </div>
  );
}
