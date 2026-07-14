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
          テンプレートは、Kenchiku AIで報告書を作成するための土台となる設定です。報告書に表示される項目だけでなく、AIがどのように情報を理解し、各項目へ振り分けるかもテンプレートによって決まります。
        </p>

        <p className="mt-4">
          AIを効果的に活用するためには、現場で収集したい情報や入力ルールをテンプレートで適切に定義することが重要です。テンプレートを工夫することで、より正確で一貫性のある報告書を効率よく作成できるようになります。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートとは
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            すべての報告書はテンプレートをもとに作成されます。報告書の種類ごとにテンプレートを用意することで、必要な情報を統一された形式で収集できます。
          </p>

          <p>
            テンプレートでは、報告書の構成だけでなく、AIが各項目へどのように情報を入力するかも定義します。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書に表示する項目</li>
            <li>収集する情報の種類</li>
            <li>各項目の説明や入力ルール</li>
            <li>AIが情報を判断・整理するための基準</li>
            <li>報告書全体の構成</li>
          </ul>

          <p>
            そのため、テンプレートは単なる報告書のレイアウトではなく、
            <strong style={{ color: fontColor1 }}>
              AIへ「どのような情報を、どのような形式で記録してほしいか」を伝えるための設計図
            </strong>
            と考えると分かりやすいでしょう。
          </p>

          <p>
            報告書を作成するには、あらかじめ少なくとも1つのテンプレートを作成しておく必要があります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          なぜテンプレートが重要なのか
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートは、報告書の見た目を決めるだけではありません。Kenchiku AIが現場の情報を正しく理解し、適切な項目へ整理するための基準となります。
          </p>

          <p>
            音声入力や手入力された内容は、各項目に設定された説明をもとにAIが解析し、それぞれの項目へ自動で振り分けられます。
          </p>

          <p>
            そのため、テンプレートの設計が曖昧だと、AIが情報を正しく判断できず、期待どおりの結果にならないことがあります。一方で、各項目の目的や入力ルールを具体的に記載することで、より正確で一貫性のある報告書を作成できるようになります。
          </p>

          <p>
            AIの精度を高めるために最も重要なのは、テンプレートの項目説明を分かりやすく、具体的に記述することです。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートの種類
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <p>
            Kenchiku AIでは、テンプレートを
            <strong style={{ color: fontColor1 }}>プロジェクト単位</strong>
            または
            <strong style={{ color: fontColor1 }}>会社単位</strong>
            で作成できます。用途に応じて使い分けることで、より効率的に報告書を管理できます。
          </p>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <div className="text-lg font-semibold" style={{ color: fontColor1 }}>
              プロジェクトテンプレート
            </div>

            <p>
              特定のプロジェクト専用のテンプレートです。このテンプレートから作成した報告書は、そのプロジェクトに紐付けられます。
            </p>

            <p>
              現場ごとに報告内容や記録項目が異なる場合や、工事固有の帳票を作成したい場合に適しています。
            </p>
          </div>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <div className="text-lg font-semibold" style={{ color: fontColor1 }}>
              会社テンプレート
            </div>

            <p>
              会社全体で利用できる共通テンプレートです。このテンプレートから作成した報告書は会社に属し、特定のプロジェクトには紐付けられません。
            </p>

            <p>
              日報や安全点検、機材点検など、複数のプロジェクトで共通して利用する報告書に適しています。
            </p>
          </div>

          <p>
            共通の帳票は会社テンプレートとして管理し、現場ごとに必要な帳票はプロジェクトテンプレートとして作成すると、管理しやすくなります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートを作成できるユーザー
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートの作成・編集・削除は、
            <strong style={{ color: fontColor1 }}>
              管理者
            </strong>
            または
            <strong style={{ color: fontColor1 }}>
              システム管理者
            </strong>
            のみが行えます。
          </p>

          <p>
            一般ユーザーやゲストはテンプレートを変更できませんが、作成済みのテンプレートを使用して報告書を作成できます。
          </p>

          <p>
            テンプレートは会社全体の報告書の品質やAIの動作に影響するため、管理者が運用ルールに合わせて管理することをおすすめします。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          AIと項目説明の関係
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIでは、AIが各項目の
            <strong style={{ color: fontColor1 }}>
              項目説明
            </strong>
            を読み取り、音声入力やテキスト入力の内容を解析して、それぞれの項目へ自動的に振り分けます。
          </p>

          <p>
            そのため、AIが判断の基準として利用するのは項目名ではなく、
            <strong style={{ color: fontColor1 }}>
              項目説明に記載された内容
            </strong>
            です。項目説明が具体的であるほど、AIはより正確に情報を理解できます。
          </p>

          <p>
            項目説明には、「何を記録する項目なのか」だけでなく、「どのような形式で入力してほしいか」や「含めてほしくない情報」も記載することをおすすめします。
          </p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                項目名
              </div>

              <p className="mt-2">作業員数</p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                項目説明
              </div>

              <p className="mt-2">
                当日現場で作業した人数を記録してください。数字のみを入力してください。単位（「人」など）や補足説明は入力しないでください。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                発話例
              </div>

              <p className="mt-2">
                本日は15名で作業を行いました。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                AIによる入力結果
              </div>

              <p className="mt-2">15</p>
            </div>
          </div>

          <p>
            このように、項目説明を具体的に記載することで、AIは入力内容をより正確に理解し、期待どおりの形式で報告書へ反映できるようになります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          良い項目説明と悪い項目説明
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            AIの精度を高めるためには、項目説明をできるだけ具体的に記載することが重要です。
            何を記録するのかだけでなく、期待する入力形式や含めてほしくない内容まで明記することで、
            AIはより正確に情報を判断できます。
          </p>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <div
              className="font-semibold"
              style={{ color: fontColor1 }}
            >
              良くない例
            </div>

            <div>
              <strong>項目名：</strong>天候
            </div>

            <div>
              <strong>項目説明：</strong>
              今日の天候を記録してください。
            </div>

            <p className="mt-2">
              この説明だけでは、AIはどのような表現を期待しているのか判断できません。
              「晴天」「晴れ」「快晴」など、さまざまな表現が入力される可能性があります。
            </p>
          </div>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <div
              className="font-semibold"
              style={{ color: fontColor1 }}
            >
              良い例
            </div>

            <div>
              <strong>項目名：</strong>天候
            </div>

            <div>
              <strong>項目説明：</strong>
              当日の天候を記録してください。
              入力できる値は
              「晴れ」「曇り」「雨」「雪」
              のいずれかのみとし、それ以外の表現は使用しないでください。
            </div>

            <p className="mt-2">
              入力できる値を明確に指定することで、AIは期待する形式を理解し、
              一貫したデータとして記録できます。
            </p>
          </div>

          <p>
            このように、AIへ具体的な指示を与えるほど、入力結果のばらつきが少なくなり、
            検索や集計もしやすくなります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレート設計の例
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            以下は、日報テンプレートの項目説明の一例です。AIが正確に情報を整理できるよう、各項目には何を記録するかだけでなく、期待する入力形式も記載しています。
          </p>

          <div
            className="rounded-lg border p-6 space-y-6"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <h3 className="font-semibold" style={{ color: fontColor1 }}>
                天候
              </h3>
              <p className="mt-2">
                当日の天候を記録してください。
                「晴れ」「曇り」「雨」「雪」のいずれかのみを入力してください。
              </p>
            </div>

            <div>
              <h3 className="font-semibold" style={{ color: fontColor1 }}>
                作業員数
              </h3>
              <p className="mt-2">
                当日現場で作業した人数を記録してください。
                数字のみを入力し、「人」などの単位は含めないでください。
              </p>
            </div>

            <div>
              <h3 className="font-semibold" style={{ color: fontColor1 }}>
                作業時間
              </h3>
              <p className="mt-2">
                作業開始時刻と終了時刻を記録してください。
                「08:00～17:00」のような形式で入力してください。
              </p>
            </div>

            <div>
              <h3 className="font-semibold" style={{ color: fontColor1 }}>
                実施作業
              </h3>
              <p className="mt-2">
                当日実施した作業内容のみを記録してください。
                翌日以降の予定や未実施の作業は含めないでください。
              </p>
            </div>

            <div>
              <h3 className="font-semibold" style={{ color: fontColor1 }}>
                安全事項
              </h3>
              <p className="mt-2">
                当日の安全に関する出来事や注意事項を記録してください。
                問題がなかった場合は「特になし」と入力してください。
              </p>
            </div>
          </div>

          <p>
            このように、各項目の目的や入力ルールを明確にしておくことで、AIは現場で収集した情報をより正確に整理し、一貫性のある報告書を作成できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートを作成する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            新しいテンプレートは、管理者またはシステム管理者が作成できます。
            テンプレートは会社全体で利用することも、特定のプロジェクト専用として作成することもできます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバーから
              <strong style={{ color: fontColor1 }}>
                「テンプレート」
              </strong>
              を選択します。
            </li>

            <li>
              画面右上の
              <strong style={{ color: fontColor1 }}>
                「作成」
              </strong>
              をクリックします。
            </li>

            <li>
              テンプレート名を入力し、会社テンプレートまたはプロジェクトテンプレートを選択します。
            </li>

            <li>
              必要な項目を追加し、それぞれの
              <strong style={{ color: fontColor1 }}>
                項目説明
              </strong>
              を設定します。
            </li>

            <li>
              内容を確認し、
              <strong style={{ color: fontColor1 }}>
                「保存」
              </strong>
              をクリックします。
            </li>
          </ol>

          <p>
            テンプレートを保存すると、そのテンプレートを利用して新しい報告書を作成できるようになります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          項目の並び順
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレート内の項目は、ドラッグ＆ドロップで自由に並び替えることができます。
            現場で情報を確認・入力する順番に合わせて配置することで、報告書をよりスムーズに作成できます。
          </p>

          <p>例えば、次のような順番にすると入力しやすくなります。</p>

          <div
            className="rounded-lg border p-6"
            style={{ borderColor: fontColor2 }}
          >
            <ol className="list-decimal pl-6 space-y-2">
              <li>天候</li>
              <li>作業員数</li>
              <li>作業時間</li>
              <li>実施作業</li>
              <li>安全事項</li>
            </ol>
          </div>

          <p>
            現場での作業の流れに合わせて項目を配置することで、入力漏れを防ぎ、報告書の作成時間を短縮できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートを更新する
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートは、運用を開始した後でも必要に応じて更新できます。
            現場で利用しながら改善を重ねることで、より使いやすく、精度の高い報告書を作成できるようになります。
          </p>

          <p>
            AIの入力結果が期待どおりでない場合は、まず
            <strong style={{ color: fontColor1 }}>
              項目説明
            </strong>
            を見直すことをおすすめします。AIは項目説明をもとに入力内容を判断するため、説明をより具体的にすることで精度が向上する場合があります。
          </p>

          <p>
            項目名を変更するよりも、期待する内容や入力形式、含める情報・含めない情報を項目説明に詳しく記載することが重要です。
          </p>

          <p>
            テンプレートを更新した後は、実際の現場データでAIの入力結果を確認し、必要に応じて継続的に改善していくことをおすすめします。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          ベストプラクティス
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートの品質は、報告書の品質やAIによる入力精度に大きく影響します。
            以下のポイントを意識して設計することで、より正確で一貫性のある報告書を作成しやすくなります。
          </p>

          <div
            className="rounded-lg border p-6"
            style={{ borderColor: fontColor2 }}
          >
            <ul className="list-disc pl-6 space-y-3">
              <li>項目説明はできるだけ具体的に記載する</li>
              <li>期待する入力形式や単位を明確に指定する</li>
              <li>入力してほしくない内容がある場合は、その内容も説明に記載する</li>
              <li>現場で実際に使用している用語や表現を使用する</li>
              <li>実際の現場データでAIの入力結果を確認し、必要に応じて項目説明を改善する</li>
              <li>テンプレートは一度作成して終わりではなく、継続的に見直して改善する</li>
            </ul>
          </div>

          <p>
            少しずつテンプレートを改善していくことで、AIの精度も向上し、現場での入力作業や報告書作成の負担を大幅に軽減できます。
          </p>
        </div>
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
