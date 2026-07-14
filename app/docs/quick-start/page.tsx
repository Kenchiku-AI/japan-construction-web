import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          クイックスタート
        </div>

        <Divider />

        <p className="mt-4">
          Kenchiku AIへようこそ。このページでは、Kenchiku AIの基本的な使い方と、利用開始までの流れをご紹介します。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          Kenchiku AIとは
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIは、建設業向けのAI業務支援プラットフォームです。お客様や協力会社とのLINEでのやり取り、現場での音声メモ、写真などの情報をAIが整理し、日々の業務を効率化します。
          </p>

          <p>
            Webアプリでは、プロジェクトやテンプレート、ユーザーの管理、報告書の確認などを行えます。モバイルアプリでは、現場から音声入力や写真の撮影・アップロードを行い、その場で情報を記録できます。
          </p>

          <p>
            LINE連携を利用すると、プロジェクトごとにLINEグループを連携できます。AIがお客様や協力会社との会話を解析し、対応が必要な内容をアクション項目として自動で整理するため、対応漏れの防止や事務作業の効率化につながります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          利用を開始する前に
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIを利用するには、管理者から招待を受ける必要があります。招待方法には、
            <strong style={{ color: fontColor1 }}>会社ユーザー</strong>
            と
            <strong style={{ color: fontColor1 }}>ゲスト</strong>
            の2種類があります。
          </p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                会社ユーザー
              </div>

              <p className="mt-1">
                自社のKenchiku AI環境へ招待されます。ログイン後は、権限に応じて担当するプロジェクトへアクセスできます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                ゲスト
              </div>

              <p className="mt-1">
                他社が管理する特定のプロジェクトへ招待されます。アクセスできるのは、招待されたプロジェクトのみです。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          LINE連携
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIのおすすめ機能の一つが、LINEとの連携です。各プロジェクトをLINEグループと連携することで、お客様や協力会社との日々のやり取りをAIが解析し、対応が必要な内容を自動でアクション項目として整理します。
          </p>

          <p>
            LINEを普段どおり利用するだけで、対応漏れの防止や事務作業の効率化につながります。現場担当者が新しいツールを覚える必要もありません。
          </p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                LINE連携でできること
              </div>

              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>プロジェクトごとにLINEグループを連携</li>
                <li>AIがお客様や協力会社との会話を自動で解析</li>
                <li>対応が必要な内容をアクション項目として自動作成</li>
                <li>対応漏れや確認漏れを防止</li>
                <li>LINEをそのまま利用できるため、新しい運用は不要</li>
              </ul>
            </div>
          </div>

          <p>
            LINE連携の設定方法については、
            <strong style={{ color: fontColor1 }}>
              「LINE連携」
            </strong>
            のページをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          アカウントの設定
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            招待メールを受信したら、以下の手順でアカウントの設定を完了してください。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              招待メールを開きます。
            </li>

            <li>
              メール内の
              <strong style={{ color: fontColor1 }}>
                「アカウントを設定」
              </strong>
              ボタンをクリックします。
            </li>

            <li>
              パスワードを設定します。
            </li>

            <li>
              Kenchiku AIへログインします。
            </li>
          </ol>

          <p>
            ログインすると、招待されたプロジェクトや利用できる機能を確認できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          Webアプリとモバイルアプリ
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIは、Webアプリとモバイルアプリの両方を提供しています。事務所ではWebアプリ、現場ではモバイルアプリを利用することで、場所を問わず効率的に業務を進められます。
          </p>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              Webアプリ
            </h3>

            <p>
              主に事務所やオフィスで利用します。
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>プロジェクトの管理</li>
              <li>テンプレートの作成・管理</li>
              <li>LINE連携の設定</li>
              <li>ユーザー・ゲストの管理</li>
              <li>報告書の確認・編集</li>
              <li>PDF・Excelの出力</li>
              <li>タグの管理</li>
            </ul>
          </div>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              モバイルアプリ
            </h3>

            <p>
              主に現場で利用します。
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>報告書の作成・編集</li>
              <li>音声入力</li>
              <li>写真の撮影・アップロード</li>
              <li>AIによる音声・写真の整理</li>
              <li>現場からリアルタイムで情報を更新</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          基本的な利用の流れ
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIを利用する際の一般的な流れは以下のとおりです。
          </p>

          <div
            className="rounded-lg border p-6 text-center space-y-2"
            style={{ borderColor: fontColor2 }}
          >
            <p style={{ color: fontColor1 }}>プロジェクトを作成する</p>
            <p>↓</p>

            <p style={{ color: fontColor1 }}>LINEグループを連携する</p>
            <p>↓</p>

            <p style={{ color: fontColor1 }}>現場で音声入力や写真を追加する</p>
            <p>↓</p>

            <p style={{ color: fontColor1 }}>
              AIがLINE・音声・写真の情報を整理する
            </p>
            <p>↓</p>

            <p style={{ color: fontColor1 }}>
              アクション項目や報告内容を確認する
            </p>
            <p>↓</p>

            <p style={{ color: fontColor1 }}>
              必要に応じてPDF・Excelで出力する
            </p>
          </div>

          <p>
            テンプレートは管理者が事前に作成します。テンプレートが用意されていれば、現場担当者はすぐにプロジェクトで作業を開始できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          次のステップ
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            各機能の詳しい使い方については、以下のページをご参照ください。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              LINEグループとの連携方法 →
              <strong style={{ color: fontColor1 }}>LINE連携</strong>
            </li>

            <li>
              プロジェクトの管理方法 →
              <strong style={{ color: fontColor1 }}>プロジェクト</strong>
            </li>

            <li>
              テンプレートの作成・管理 →
              <strong style={{ color: fontColor1 }}>テンプレート</strong>
            </li>

            <li>
              報告書の作成・編集・エクスポート →
              <strong style={{ color: fontColor1 }}>報告書</strong>
            </li>

            <li>
              写真の管理とタグの活用 →
              <strong style={{ color: fontColor1 }}>写真とタグ</strong>
            </li>

            <li>
              ゲストの招待・管理 →
              <strong style={{ color: fontColor1 }}>ゲスト</strong>
            </li>

            <li>
              ユーザーや権限の管理 →
              <strong style={{ color: fontColor1 }}>管理者向け</strong>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
