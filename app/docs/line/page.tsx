import Divider from "@/app/ui/Divider";
import Image from "next/image";
import { bgColor5, buttonColor, fontColor1, fontColor2 } from "@/lib/constants";

export default function LinePage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          LINE連携
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p className="mt-4">
          Kenchiku AIはLINEと連携することで、現場やお客様とのコミュニケーションをプロジェクトごとに管理できます。Kenchiku AIの各プロジェクトはLINEグループと1対1で連携し、AIがLINE上の会話を解析して、プロジェクトに関連するアクション項目を自動で作成します。
        </p>

        <p className="mt-4">
          LINE連携の設定・利用に追加費用はかかりません。LINE公式アカウントをご利用であれば、LINE・Kenchiku AIのいずれからも追加料金なくLINE連携をご利用いただけます。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINE公式アカウントの作成
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIとLINEを連携するには、会社のLINE公式アカウントが必要です。
          </p>

          <p>
            まだLINE公式アカウントを作成していない場合は、先に作成してください。作成方法については、
            <a
              href="https://help.line.me/official_account_jp/web/pc?lang=ja"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: buttonColor, textDecoration: "underline" }}
            >
              LINE公式サポート
            </a>
            をご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          Kenchiku AIとの連携設定
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            LINE公式アカウントを作成したら、以下の手順でKenchiku AIとの連携設定を行ってください。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <a
                href="https://account.line.biz/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: buttonColor, textDecoration: "underline" }}
              >
                LINE Official Account Manager
              </a>
              にログインします。
            </li>

            <li>
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
              LINE Developersへの登録がまだ完了していない場合は、
              <strong style={{ color: fontColor1 }}>名前</strong>
              と
              <strong style={{ color: fontColor1 }}>メールアドレス</strong>
              を入力して登録を行います。すでに登録済みの場合は、この画面は表示されません。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>プロバイダーを作成</strong>
              が表示された場合は、プロバイダー名を入力してプロバイダーを作成します。プロバイダー名には会社名を設定することをおすすめします（プロバイダー名は後から変更できません）。すでにプロバイダーがある場合は、そのまま次へ進んでください。
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
              Kenchiku AIに管理者または管理者権限を持つユーザーでログインし、サイドバーの
              <strong style={{ color: fontColor1 }}>
                「LINE連携」
              </strong>
              を開きます。
              <strong style={{ color: fontColor1 }}>
                Channel secret
              </strong>
              欄にコピーした値を貼り付け、
              <strong style={{ color: fontColor1 }}>
                「保存」
              </strong>
              をクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-3.png"
              alt="LINE設定画面のスクリーンショット"
              width={2564}
              height={968}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

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

            <Image
              src="/line-docs-screenshot-4.png"
              alt="LINE設定画面のスクリーンショット"
              width={2480}
              height={956}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

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

            <Image
              src="/line-docs-screenshot-5.png"
              alt="LINE設定画面のスクリーンショット"
              width={2568}
              height={1512}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

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
              src="/line-docs-screenshot-6.png"
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
              src="/line-docs-screenshot-7.png"
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
          プロジェクトとLINEグループの連携
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            現場ごとに使用しているLINEグループをKenchiku AIのプロジェクトと連携することで、AIがそのグループの会話を対象プロジェクトとして認識できるようになります。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Kenchiku AIのサイドバーから
              <strong style={{ color: fontColor1 }}>
                「プロジェクト」
              </strong>
              を開きます。
            </li>

            <li>
              連携するプロジェクトを一覧から選択します。まだプロジェクトがない場合は、画面右上の
              <strong style={{ color: fontColor1 }}>
                「作成」
              </strong>
              ボタンをクリックして新しいプロジェクトを作成します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「LINE連携コードをコピー」
              </strong>
              をクリックし、プロジェクト連携コード（例：
              <code style={{ color: fontColor1 }}>P-XXXXXX</code>
              ）をコピーします。パソコンからKenchiku AIをご利用の場合は、画面に表示されるQRコードをスマートフォンで読み取ることで、お使いの端末に連携コードをコピーすることもできます。
            </li>

            <Image
              src="/line-docs-screenshot-8.png"
              alt="LINE設定画面のスクリーンショット"
              width={2482}
              height={1274}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

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
            誤ったLINEグループにプロジェクト連携コードを送信した場合でも、正しいLINEグループに同じプロジェクト連携コードを送信することで連携できます。
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
