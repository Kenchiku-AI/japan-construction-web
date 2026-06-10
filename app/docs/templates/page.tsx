import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function TemplatesPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          テンプレート
        </div>
        <Divider />
        <p className="mt-4">
          テンプレートは、報告書の構成だけでなく、AIがどのように情報を整理して各項目へ入力するかを決定する重要な設定です。
          Kenchiku
          AIを効果的に活用するためには、まず適切なテンプレートを設計することが重要です。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートとは
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>すべての報告書はテンプレートから作成されます。</p>

          <p>
            テンプレートでは、報告書に表示される項目や、収集する情報、AIによる情報整理の方法を定義します。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書に表示される項目</li>
            <li>収集する情報</li>
            <li>各項目の入力ルール</li>
            <li>AIが情報を解釈する方法</li>
            <li>報告書の全体構成</li>
          </ul>

          <p>報告書を作成する前に、少なくとも1つのテンプレートが必要です。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートの種類
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              プロジェクトテンプレート
            </h3>

            <p className="mt-2">
              特定のプロジェクト専用のテンプレートです。
              このテンプレートから作成された報告書は、そのプロジェクトに属します。
            </p>

            <p className="mt-2">
              プロジェクト固有の報告要件がある場合に適しています。
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              会社テンプレート
            </h3>

            <p className="mt-2">
              会社全体で利用できるテンプレートです。
              このテンプレートから作成された報告書は会社に属し、特定のプロジェクトには紐付きません。
            </p>

            <p className="mt-2">
              日報や安全報告書など、複数のプロジェクトで共通して利用する報告書に適しています。
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートを作成できるユーザー
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートの作成および管理は、管理者または管理者権限を持つユーザーのみ実行できます。
          </p>

          <p>
            ユーザーやゲストは、既存のテンプレートを利用して報告書を作成します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          なぜテンプレートが重要なのか
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>テンプレートは単なる報告書のレイアウトではありません。</p>

          <p>
            AIはテンプレート内の各項目説明を参照し、ユーザーの発話や入力内容から必要な情報を抽出します。
          </p>

          <p>
            そのため、テンプレートの品質はAIによる報告書作成の品質に直接影響します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          AIと項目説明の関係
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>Kenchiku AIでは、すべての項目が実質的には自由入力項目です。</p>

          <p>
            AIは各項目の説明を参照し、ユーザーの発話から適切な値を抽出して入力します。
          </p>

          <p>
            そのため重要なのは項目名ではなく、項目説明をどれだけ具体的に記載するかです。
          </p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                例：作業員数
              </div>

              <p className="mt-2">
                当日現場で作業した人数を記録してください。
                数字のみを入力してください。
                単位や追加説明は含めないでください。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                発話例
              </div>

              <p className="mt-2">本日は15名で作業を行いました。</p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                AIによる入力結果
              </div>

              <p className="mt-2">15</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          良い項目説明と悪い項目説明
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: fontColor2 }}
          >
            <div className="font-semibold mb-2" style={{ color: fontColor1 }}>
              良くない例
            </div>

            <div className="space-y-2">
              <p>
                <strong>項目名：</strong>天候
              </p>
              <p>
                <strong>説明：</strong>今日の天候を記録してください。
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border p-6"
            style={{ borderColor: fontColor2 }}
          >
            <div className="font-semibold mb-2" style={{ color: fontColor1 }}>
              良い例
            </div>

            <div className="space-y-2">
              <p>
                <strong>項目名：</strong>天候
              </p>
              <p>
                <strong>説明：</strong>
                当日の天候を記録してください。
                「晴れ」「曇り」「雨」「雪」のいずれかのみを入力してください。
                その他の表現は使用しないでください。
              </p>
            </div>
          </div>

          <p>
            AIが期待する形式を明確に理解できるよう、できるだけ具体的に説明を記載してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレート設計の例
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div
          className="rounded-lg border p-6 space-y-6"
          style={{ borderColor: fontColor2 }}
        >
          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              天候
            </h3>
            <p className="mt-2">
              当日の天候を記録してください。「晴れ」「曇り」「雨」「雪」のいずれかのみを入力してください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              作業員数
            </h3>
            <p className="mt-2">
              当日現場で作業した人数を記録してください。数字のみを入力してください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              作業時間
            </h3>
            <p className="mt-2">
              作業開始時刻と終了時刻を記録してください。「08:00–17:00」の形式で入力してください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              実施作業
            </h3>
            <p className="mt-2">
              当日完了した作業内容のみを記録してください。今後予定している作業は含めないでください。
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートを作成する
        </div>
        <Divider style={{ background: fontColor2 }} />

        <ol className="list-decimal pl-6 space-y-2">
          <li>テンプレート画面を開く</li>
          <li>「テンプレート作成」を選択する</li>
          <li>テンプレート名を入力する</li>
          <li>項目を追加する</li>
          <li>各項目の説明を設定する</li>
          <li>保存する</li>
        </ol>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          項目の並び順
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>項目はドラッグ＆ドロップで自由に並び替えることができます。</p>

          <p>
            現場で情報を収集する順番に並べることで、報告書の作成や確認がしやすくなります。
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>天候</li>
            <li>作業員数</li>
            <li>作業時間</li>
            <li>実施作業</li>
            <li>安全事項</li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートを更新する
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>テンプレートはいつでも更新できます。</p>

          <p>
            AIの結果が期待どおりでない場合は、まず項目説明を見直すことをおすすめします。
          </p>

          <p>
            項目説明を改善することは、AIの精度を向上させる最も効果的な方法のひとつです。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ベストプラクティス
        </div>
        <Divider style={{ background: fontColor2 }} />

        <ul className="list-disc pl-6 space-y-3">
          <li>項目説明はできるだけ具体的に記載する</li>
          <li>期待するフォーマットを明確に記載する</li>
          <li>入力してほしくない内容も明記する</li>
          <li>実際の現場データでテストする</li>
          <li>定期的に項目説明を見直して改善する</li>
          <li>現場で実際に使われる用語を使用する</li>
        </ul>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          テンプレートは単なる報告書のレイアウトではありません。
          AIが情報を理解し、整理し、適切な項目へ入力するための重要な設定です。
          質の高いテンプレートを作成することが、より正確で一貫性のある報告書作成につながります。
        </p>
      </section>
    </div>
  );
}
