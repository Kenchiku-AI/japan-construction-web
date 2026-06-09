import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          プロジェクト
        </div>
        <Divider />
        <p className="mt-4">
          プロジェクトは報告書とゲストをまとめて管理するための単位です。現場ごとや工事ごとにプロジェクトを作成して利用します。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクトとは
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトは特定の工事や現場に紐付いた作業単位です。プロジェクトに属する報告書はそのプロジェクト内で管理されます。
          </p>

          <p>プロジェクトでは以下を管理します。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>プロジェクト名・説明</li>
            <li>報告書の一覧</li>
            <li>ゲストの管理</li>
            <li>ステータス（進行中・完了）</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクトの作成
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>プロジェクトの作成は管理者のみ実行できます。</p>

          <p>プロジェクトを作成する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>会社画面を開く</li>
            <li>「プロジェクト作成」を選択する</li>
            <li>プロジェクト名を入力する</li>
            <li>説明を入力する（任意）</li>
            <li>保存する</li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクトの編集
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクト名と説明はプロジェクト画面から編集できます。管理者とマネージャーが編集できます。ただし、完了済みのプロジェクトは管理者のみ編集できます。
          </p>

          <p>
            変更を保存するには、編集後に「更新」を選択してください。変更を破棄する場合は「キャンセル」を選択してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクトのステータス
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>プロジェクトには以下のステータスがあります。</p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                進行中
              </div>
              <p className="mt-1">
                通常の利用状態です。報告書の作成・編集が可能で、ゲストもアクセスできます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                完了
              </div>
              <p className="mt-1">
                工事が完了したプロジェクトに設定します。完了済みのプロジェクトでは、一般ユーザーとゲストは報告書を編集できなくなります。管理者は引き続き閲覧・操作が可能です。
              </p>
            </div>
          </div>

          <p>ステータスの変更は管理者のみ実行できます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクト内の報告書
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクト画面では、そのプロジェクトに属する報告書の一覧を確認できます。最新の5件が表示され、それ以上ある場合は「すべて表示」から全件を確認できます。
          </p>

          <p>プロジェクト画面から直接報告書を作成することもできます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Excelエクスポート
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクト画面から、そのプロジェクトの報告書をまとめてExcelでエクスポートできます。テンプレートを選択してダウンロードすると、該当するすべての報告書が1つのExcelファイルにまとめられます。
          </p>

          <p>
            エクスポートの詳細については、エクスポートのセクションをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          プロジェクトは報告書とゲストをひとまとめに管理するための単位です。工事の進捗に合わせてステータスを管理し、完了後は編集を制限することで記録の正確性を維持できます。
        </p>
      </section>
    </div>
  );
}
