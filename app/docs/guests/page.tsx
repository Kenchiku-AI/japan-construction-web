import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function GuestsPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          ゲスト
        </div>
        <Divider />
        <p className="mt-4">
          ゲストは特定のプロジェクトへのみアクセスできる外部ユーザーです。発注者や協力会社など、社外の関係者と情報を共有する際に利用します。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ゲストとは
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            ゲストは自社の会社環境には属さず、招待された特定のプロジェクトのみにアクセスできます。
          </p>

          <p>ゲストが利用できる機能は以下のとおりです。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>招待されたプロジェクトの報告書の閲覧・編集</li>
            <li>報告書への写真のアップロード</li>
            <li>PDFダウンロード</li>
          </ul>

          <p>ゲストが利用できない機能は以下のとおりです。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>会社設定へのアクセス</li>
            <li>テンプレートの作成・編集</li>
            <li>タグの作成・編集</li>
            <li>他のプロジェクトへのアクセス</li>
            <li>ユーザーの管理</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          会社ユーザーとの違い
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                会社ユーザー
              </div>
              <p className="mt-1">
                会社環境に所属するユーザーです。役割に応じて、会社全体のプロジェクト・テンプレート・タグ・ユーザー管理などにアクセスできます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                ゲスト
              </div>
              <p className="mt-1">
                招待された特定のプロジェクトのみにアクセスできます。会社の設定や他のプロジェクトは参照できません。発注者や協力会社など、社外の関係者を想定しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ゲストの招待
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            ゲストの招待は管理者またはマネージャーが行います。招待はプロジェクト単位で行います。
          </p>

          <p>新しいゲストを招待する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>対象のプロジェクト画面を開く</li>
            <li>「ゲストを追加」を選択する</li>
            <li>姓・名・メールアドレスを入力する</li>
            <li>「ゲストを追加」を選択する</li>
          </ol>

          <p>
            招待されたゲストにはメールが送信されます。ゲストはメール内のリンクからアカウントを有効化し、ログインできるようになります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          既存ゲストの別プロジェクトへの追加
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            すでに別のプロジェクトに招待済みのゲストは、新たに情報を入力することなく追加できます。
          </p>

          <p>既存ゲストをプロジェクトに追加する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>対象のプロジェクト画面を開く</li>
            <li>「ゲストを追加」を選択する</li>
            <li>既存ゲストの一覧から対象のゲストを選択する</li>
            <li>「既存のゲストを追加」を選択する</li>
          </ol>

          <p>
            既存ゲストには再度招待メールは送信されません。次回ログイン時から新しいプロジェクトにアクセスできるようになります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ゲストの削除
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトからゲストを削除すると、そのゲストはプロジェクトへアクセスできなくなります。ゲスト本人も自分でプロジェクトから離脱することができます。
          </p>

          <p>ゲストを削除する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>対象のプロジェクト画面を開く</li>
            <li>ゲスト一覧から対象のゲストを探す</li>
            <li>削除アイコンを選択する</li>
            <li>確認画面で「削除」を選択する</li>
          </ol>

          <p>
            削除できるのは管理者、マネージャー、およびゲスト本人です。削除してもゲストのアカウント自体は残ります。別のプロジェクトへ招待する際は既存ゲストとして追加できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          ゲスト機能を使うことで、社外の発注者や協力会社に対して特定のプロジェクトのみへのアクセスを安全に提供できます。ゲストは招待されたプロジェクト以外にはアクセスできないため、会社全体の情報を共有することなく、必要な記録だけを関係者と共有することができます。
        </p>
      </section>
    </div>
  );
}
