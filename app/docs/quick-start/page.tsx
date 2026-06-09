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
          Kenchiku AIの基本的な利用方法をご紹介します。初めて利用する方は、まずこのページをご確認ください。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Kenchiku AIへようこそ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            Kenchiku AIは、報告業務の管理を行うWebアプリケーションと、現場での情報収集を行うモバイルアプリケーションを組み合わせた建設業向け報告プラットフォームです。
          </p>
          <p>
            AIを活用することで、現場で収集した情報を効率的かつ統一された形式で報告書としてまとめることができます。
          </p>
          <p>
            現場監督、施工管理者、検査担当者、協力会社、発注者など、さまざまな立場の利用者が同じ情報を効率的に共有できるよう設計されています。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          利用を開始する前に
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            Kenchiku AIを利用するには、管理者から招待を受ける必要があります。
          </p>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              会社ユーザーとして招待される場合
            </h3>
            <p className="mt-1">
              所属会社のKenchiku AI環境に招待されます。ログイン後は、担当するプロジェクトへアクセスできます。
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              ゲストとして招待される場合
            </h3>
            <p className="mt-1">
              他社が管理する特定のプロジェクトへ招待されます。ゲストは招待されたプロジェクトのみ利用できます。
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          アカウントの有効化
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>招待メールを受信したら、以下の手順で利用を開始してください。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>招待メールを開く</li>
            <li>アクティベーションリンクをクリックする</li>
            <li>パスワードを設定する</li>
            <li>ログインする</li>
          </ol>

          <p>ログイン後、割り当てられたプロジェクトを確認できます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Webアプリとモバイルアプリ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            Kenchiku AIはWebアプリとモバイルアプリの両方を提供しています。それぞれ利用する場面が異なります。
          </p>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              Webアプリ
            </h3>
            <p>主に事務所やオフィスで利用します。</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>テンプレートの作成・管理</li>
              <li>プロジェクト情報の管理</li>
              <li>ユーザー・ゲストの管理</li>
              <li>提出済み報告書の確認</li>
              <li>PDFダウンロード・Excelダウンロード</li>
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
            <p>主に現場で利用します。</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>報告書の作成</li>
              <li>音声入力による記録</li>
              <li>写真の撮影・アップロード</li>
              <li>AIによる内容整理</li>
              <li>現場での情報更新</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          基本的な利用の流れ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>はじめて利用する場合、以下の流れで進めてください。</p>

          <div
            className="rounded-lg border p-6 text-center space-y-2"
            style={{ borderColor: fontColor2 }}
          >
            <p style={{ color: fontColor1 }}>テンプレートを作成する</p>
            <p>↓</p>
            <p style={{ color: fontColor1 }}>プロジェクトを開く</p>
            <p>↓</p>
            <p style={{ color: fontColor1 }}>報告書を作成する</p>
            <p>↓</p>
            <p style={{ color: fontColor1 }}>音声入力・写真を追加する</p>
            <p>↓</p>
            <p style={{ color: fontColor1 }}>AI結果を確認する</p>
            <p>↓</p>
            <p style={{ color: fontColor1 }}>保存する</p>
            <p>↓</p>
            <p style={{ color: fontColor1 }}>PDF・Excelでダウンロードする</p>
          </div>

          <p>
            テンプレートは管理者またはマネージャーが事前に作成します。テンプレートが用意されていれば、現場担当者はすぐに報告書の作成を開始できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          次のステップ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>各機能の詳細については、以下のページをご参照ください。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>テンプレートの設計方法 → テンプレート</li>
            <li>報告書の作成・写真・エクスポート → 報告書</li>
            <li>写真の整理・タグの活用 → 写真とタグ</li>
            <li>ゲストの招待方法 → ゲスト</li>
            <li>ユーザーと権限の管理 → 管理者向け</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
