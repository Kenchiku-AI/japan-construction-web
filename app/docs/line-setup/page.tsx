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
          （任意）チャネルアクセストークン設定
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            この設定は任意ですが、
            <strong style={{ color: fontColor1 }}>
              LINEトーク内の画像をKenchiku AIで利用する場合は必須
            </strong>
            です。
          </p>

          <p>
            チャネルアクセストークンを設定すると、LINEのすべてのトークに投稿された画像をKenchiku AIが取得し、AIが画像の説明文と関連タグを自動で生成します。また、
            <strong style={{ color: fontColor1 }}>
              「トークから自動入力」
            </strong>
            を実行した際には、会話中の画像もあわせてレポートへ自動的に追加されます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              LINE Official Account Managerで
              <strong style={{ color: fontColor1 }}>
                「設定 → Messaging API」
              </strong>
              を開きます。画面下部にある
              <strong style={{ color: fontColor1 }}>
                「LINE Developersコンソール」
              </strong>
              のリンクをクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-15.png"
              alt="LINE Developersコンソールへのリンク"
              width={2568}
              height={1512}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              LINE Developersコンソールが開いたら、先ほど作成した
              <strong style={{ color: fontColor1 }}>
                プロバイダー
              </strong>
              をクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-16.png"
              alt="LINE Developersコンソールのプロバイダー一覧"
              width={2566}
              height={1082}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              次に、作成した
              <strong style={{ color: fontColor1 }}>
                Messaging APIチャネル
              </strong>
              をクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-17.png"
              alt="Messaging APIチャネルの選択"
              width={2564}
              height={1626}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              画面上部の
              <strong style={{ color: fontColor1 }}>
                「Messaging API設定」
              </strong>
              タブを選択します。
            </li>

            <Image
              src="/line-docs-screenshot-18.png"
              alt="Messaging API設定タブ"
              width={2562}
              height={1756}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              下へスクロールして
              <strong style={{ color: fontColor1 }}>
                「チャネルアクセストークン」
              </strong>
              の項目を表示し、
              <strong style={{ color: fontColor1 }}>
                「発行」
              </strong>
              ボタンをクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-19.png"
              alt="チャネルアクセストークンの発行"
              width={2562}
              height={1668}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              発行された
              <strong style={{ color: fontColor1 }}>
                チャネルアクセストークン
              </strong>
              の横にあるコピーアイコンをクリックしてコピーします。
            </li>

            <Image
              src="/line-docs-screenshot-20.png"
              alt="チャネルアクセストークンのコピー"
              width={2562}
              height={1668}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />

            <li>
              Kenchiku AIに戻り、
              <strong style={{ color: fontColor1 }}>
                「LINE連携」
              </strong>
              ページを開きます。
              <strong style={{ color: fontColor1 }}>
                「チャネルアクセストークン」
              </strong>
              欄にコピーした値を貼り付け、
              <strong style={{ color: fontColor1 }}>
                「保存」
              </strong>
              をクリックします。
            </li>

            <Image
              src="/line-docs-screenshot-21.png"
              alt="Kenchiku AIでチャネルアクセストークンを設定"
              width={2566}
              height={1356}
              priority
              className="my-10 border"
              style={{ borderColor: bgColor5 }}
            />
          </ol>

          <p>
            以上でチャネルアクセストークンの設定は完了です。以降はLINEトーク内の画像も自動的に取得・解析され、
            <strong style={{ color: fontColor1 }}>
              「トークから自動入力」
            </strong>
            を実行した際に、会話中の画像がレポートへ自動的に追加されます。
          </p>
        </div>
      </section>
    </div>
  );
}
