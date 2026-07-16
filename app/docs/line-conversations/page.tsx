import Divider from "@/app/ui/Divider";
import Link from "next/link";
import { buttonColor, fontColor1, fontColor2 } from "@/lib/constants";

export default function LineConversationPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          LINEトークの利用方法
        </div>

        <Divider style={{ background: fontColor2 }} />

        <p className="mt-4">
          LINE連携の設定が完了すると、LINEグループごとに必要な情報を自動で整理・管理できるようになります。
          このページでは、抽出する情報の設定方法と、LINEグループをKenchiku AIへ連携する方法をご紹介します。
        </p>

        <p className="mt-4">
          まだLINE連携の設定が完了していない場合は、
          <Link
            href="/docs/line-setup"
            style={{ color: buttonColor, textDecoration: "underline" }}
          >
            LINE連携ガイド
          </Link>
          を先にご確認ください。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          トークから抽出する情報を設定する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            LINE連携が完了したら、まずLINEの会話からどのような情報を抽出するかを設定します。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバーの
              <strong style={{ color: fontColor1 }}>「LINE連携」</strong>
              を開きます。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「トークから抽出する情報」
              </strong>
              セクションで、
              <strong style={{ color: fontColor1 }}>「作成」</strong>
              をクリックします。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>「名称」</strong>
              と
              <strong style={{ color: fontColor1 }}>「詳細」</strong>
              を入力します。
            </li>
          </ol>

          <p>
            <strong style={{ color: fontColor1 }}>「詳細」</strong>
            には、LINEメッセージからどのような情報を抽出したいかを、できるだけ具体的に記載することをおすすめします。
            AIはこの内容をもとに情報を整理するため、詳しく記載するほど目的に合った結果になりやすくなります。
          </p>

          <p>
            抽出する情報は複数作成できます。それぞれ独立して管理されるため、必要な種類ごとに作成してください。
          </p>

          <div
            className="rounded border p-4 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <strong style={{ color: fontColor1 }}>例1</strong>
              <p className="mt-2">
                <strong>名称：</strong>現場作業
              </p>
              <p>
                <strong>詳細：</strong>
                現場で実施する必要がある作業や対応事項を抽出してください。施工、修理、設置、交換、点検、清掃、片付けなど、作業員が現場で行うべき作業を管理します。
              </p>
            </div>

            <div>
              <strong style={{ color: fontColor1 }}>例2</strong>
              <p className="mt-2">
                <strong>名称：</strong>図面変更
              </p>
              <p>
                <strong>詳細：</strong>
                図面や設計内容の変更・修正・追加・削除に関する情報を抽出してください。変更理由や変更内容も含めて管理します。
              </p>
            </div>

            <div>
              <strong style={{ color: fontColor1 }}>例3</strong>
              <p className="mt-2">
                <strong>名称：</strong>スケジュール
              </p>
              <p>
                <strong>詳細：</strong>
                工程、作業予定、納期、搬入日、作業日程、完了予定など、スケジュールに関する情報を抽出してください。
              </p>
            </div>

            <div>
              <strong style={{ color: fontColor1 }}>例4</strong>
              <p className="mt-2">
                <strong>名称：</strong>資材・設備
              </p>
              <p>
                <strong>詳細：</strong>
                資材や設備に関する情報を抽出してください。発注、納品、在庫、搬入予定、機器情報などを管理します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINEトークを作成する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            抽出する情報を作成したら、次はLINEグループと対応するトークを作成します。
            Kenchiku AIのトークは、LINEグループと1対1で対応します。
          </p>

          <p>
            プロジェクトをまだ作成していない場合は、
            <Link
              href="/docs/projects"
              style={{ color: buttonColor, textDecoration: "underline" }}
            >
              プロジェクトガイド
            </Link>
            を先にご確認ください。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>対象のプロジェクトを開きます。</li>

            <li>
              <strong style={{ color: fontColor1 }}>「トーク」</strong>
              セクションで、
              <strong style={{ color: fontColor1 }}>
                「トークを作成」
              </strong>
              をクリックします。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>「名称」</strong>
              に、このトークに対応するLINEグループが分かる名前を入力します。
              例えば、「お客様」「空調業者」「電気工事」などがおすすめです。
            </li>

            <li>
              作成済みの
              <strong style={{ color: fontColor1 }}>
                「トークから抽出する情報」
              </strong>
              の一覧から、このLINEグループで抽出したい情報を選択します。
            </li>
          </ol>

          <p>
            LINEグループによって必要な情報は異なります。例えば、お客様とのグループではスケジュールや図面変更を中心に抽出し、協力会社とのグループでは現場作業や資材・設備に関する情報を抽出する、といった使い分けができます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINEグループと連携する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            トークを作成すると、LINEグループと連携するためのコードが表示されます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong style={{ color: fontColor1 }}>
                「LINE連携コードをコピー」
              </strong>
              をクリックしてコードをコピーします。
            </li>

            <li>
              パソコンをご利用の場合は、コードをスマートフォンへ簡単にコピーできるQRコードも表示されます。
            </li>

            <li>
              コピーしたコードを、連携したいLINEグループへメッセージとして送信してください。
            </li>
          </ol>

          <p>
            LINE連携を行うには、
            <Link
              href="/docs/line-setup"
              style={{ color: buttonColor, textDecoration: "underline" }}
            >
              LINE連携ガイド
            </Link>
            で設定したLINE公式アカウントが、そのLINEグループに参加している必要があります。
          </p>

          <p>
            連携が完了すると、トーク一覧に連携済みであることを示す表示が追加されます。
          </p>

          <p>
            誤ったLINEグループへ連携してしまった場合でも問題ありません。同じ連携コードを正しいLINEグループへ再度送信するだけで、新しいグループへ切り替わります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          抽出された情報を確認する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            連携済みのLINEグループでメッセージが送信されると、設定した種類ごとに情報が自動で抽出され、プロジェクトページへ表示されます。
          </p>

          <p>
            新しいメッセージが送信されるたびに、既存の情報が更新されたり、新しい情報が追加されたりすることがあります。
          </p>

          <p>
            抽出された情報は必要に応じて手動で編集できます。また、LINEから抽出されたものだけでなく、手動で新しい項目を作成することも可能です。
          </p>
        </div>
      </section>
    </div>
  );
}