import Divider from "@/app/ui/Divider";
import Link from "next/link";
import Image from "next/image";
import { bgColor5, buttonColor, fontColor1, fontColor2 } from "@/lib/constants";

export default function LineConversationPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          LINEトークの利用方法
        </div>

        <Divider style={{ background: fontColor2 }} />

        <p className="mt-4">
          LINE連携の設定が完了すると、LINEトークの内容をもとに必要な情報を自動で整理・管理できるようになります。
          通常はLINE公式アカウントを含むLINEグループとの連携をおすすめしていますが、LINE公式アカウントとの1対1のトーク（ダイレクトメッセージ）も同じ方法で連携できます。このページでは、抽出する情報の設定方法と、LINEトークをKenchiku AIへ連携する方法をご紹介します。
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
            LINE連携が完了したら、まずLINEトークからどのような情報を抽出するかを設定します。
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

              <Image
                src="/line-docs-screenshot-8.png"
                alt="LINE設定画面のスクリーンショット"
                width={2476}
                height={1304}
                priority
                className="my-10 border"
                style={{ borderColor: bgColor5 }}
              />
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>「名称」</strong>
              と
              <strong style={{ color: fontColor1 }}>「詳細」</strong>
              を入力します。

              <Image
                src="/line-docs-screenshot-9.png"
                alt="LINE設定画面のスクリーンショット"
                width={2474}
                height={1784}
                priority
                className="my-10 border"
                style={{ borderColor: bgColor5 }}
              />
            </li>
          </ol>

          <p>
            <strong style={{ color: fontColor1 }}>「詳細」</strong>
            には、LINEトークからどのような情報を抽出したいかを、できるだけ具体的に記載することをおすすめします。
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
            抽出する情報を作成したら、次はLINEトークに対応するKenchiku AIのトークを作成します。両者は常に1対1で対応します。
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

              <Image
                src="/line-docs-screenshot-10.png"
                alt="LINE設定画面のスクリーンショット"
                width={2476}
                height={1694}
                priority
                className="my-10 border"
                style={{ borderColor: bgColor5 }}
              />
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>「名称」</strong>
              に、対応するLINEトークが分かりやすい名前を入力します。例えば、「お客様」「空調業者」「電気工事」などがおすすめです。

              <Image
                src="/line-docs-screenshot-11.png"
                alt="LINE設定画面のスクリーンショット"
                width={2474}
                height={1782}
                priority
                className="my-10 border"
                style={{ borderColor: bgColor5 }}
              />
            </li>

            <li>
              作成済みの
              <strong style={{ color: fontColor1 }}>
                「トークから抽出する情報」
              </strong>
              の一覧から、このLINEトークで抽出したい情報を選択します。
            </li>
          </ol>

          <p>
            LINEトークごとに抽出したい情報は異なります。例えば、お客様とのトークではスケジュールや図面変更を中心に抽出し、協力会社とのトークでは現場作業や資材・設備に関する情報を抽出する、といった使い分けができます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINEトークと連携する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            トークを作成すると、LINEトークと連携するためのLINE連携コード（例：K-XXXXXX）が表示されます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong style={{ color: fontColor1 }}>
                「LINE連携コードをコピー」
              </strong>
              をクリックしてコードをコピーします。

              <Image
                src="/line-docs-screenshot-12.png"
                alt="LINE設定画面のスクリーンショット"
                width={2474}
                height={1776}
                priority
                className="my-10 border"
                style={{ borderColor: bgColor5 }}
              />
            </li>

            <li>
              パソコンをご利用の場合は、コードをスマートフォンへ簡単にコピーできるQRコードも表示されます。
            </li>

            <li>
              コピーしたコードを、連携したいLINEトークへメッセージとして送信してください。
            </li>
          </ol>

          <p>
            通常は、LINE公式アカウントが参加しているLINEグループをKenchiku AIと連携して利用することをおすすめしています。ただし、LINE公式アカウントとの1対1のトーク（ダイレクトメッセージ）も同じ手順で連携できます。
          </p>

          <p>
            LINE連携コードは、連携したいLINEトークへ送信してください。LINE公式アカウントが参加しているLINEグループ、またはLINE公式アカウントとの1対1のトークで利用できます。コードはLINEトーク内の誰が送信しても問題ありません。LINE公式アカウント自身が送信する必要はなく、参加者のどなたが送信しても連携できます。
          </p>

          <p>
            連携が完了すると、トーク一覧に連携済みであることを示す表示が追加されます。
          </p>

          <p>
            別のLINEトークへ切り替えたい場合は、新しいLINEトークへ同じLINE連携コードを送信してください。また、別のKenchiku AIのトークへ同じLINEトークを連携したい場合は、新しいKenchiku AIのトークのLINE連携コードをそのLINEトークへ送信してください。LINEトークとKenchiku AIのトークは常に1対1で対応するため、再連携を行うと既存の連携は自動的に解除され、新しい組み合わせへ切り替わります。
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
            連携済みのLINEトークでメッセージが送信されると、設定した種類ごとに情報が自動で抽出され、プロジェクトページへ表示されます。抽出された情報は、
            <strong style={{ color: fontColor1 }}>
              「LINE連携」
            </strong>
            ページで作成した
            <strong style={{ color: fontColor1 }}>
              「トークから抽出する情報」
            </strong>
            ごとに、それぞれ別々の一覧として表示されます。
          </p>

          <Image
            src="/line-docs-screenshot-13.png"
            alt="LINE設定画面のスクリーンショット"
            width={2406}
            height={1696}
            priority
            className="my-10 border"
            style={{ borderColor: bgColor5 }}
          />

          <p>
            新しいメッセージが送信されるたびに、一覧に表示されている情報が更新されたり、新しい項目が追加されたりすることがあります。
          </p>

          <p>
            抽出された情報は必要に応じて手動で編集できます。また、LINEから抽出されたものだけでなく、手動で新しい項目を作成することも可能です。
          </p>
        </div>
      </section>
    </div>
  );
}