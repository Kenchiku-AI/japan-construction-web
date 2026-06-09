import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function AdminPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          管理者向け
        </div>
        <Divider />
        <p className="mt-4">
          管理者はKenchiku AIの環境全体を管理します。ユーザーの招待、プロジェクトの作成、テンプレートとタグの管理など、他のユーザーが利用するための基盤を整える役割を担います。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          役割の種類
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <p>Kenchiku AIには3種類の役割があります。</p>

          <div
            className="rounded-lg border p-6 space-y-6"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                管理者
              </div>
              <p className="mt-1">
                会社環境のすべての機能にアクセスできます。ユーザーの招待・削除、プロジェクトの作成・ステータス変更、テンプレートの作成・編集・共有、タグの作成・編集・削除、すべての報告書の閲覧・編集が可能です。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                マネージャー
              </div>
              <p className="mt-1">
                日常的な運用業務を担います。ユーザーの招待、プロジェクト内の報告書の作成・編集、テンプレートの作成・編集、ゲストの管理が可能です。会社設定やプロジェクトのステータス変更は管理者のみ実行できます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                一般ユーザー
              </div>
              <p className="mt-1">
                進行中のプロジェクトで報告書を作成・編集できます。テンプレート・タグ・ユーザー管理などの設定機能へはアクセスできません。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ユーザーの招待
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            新しいユーザーを会社環境に招待できます。管理者とマネージャーが実行できます。
          </p>

          <p>ユーザーを招待する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>会社画面を開く</li>
            <li>「ユーザーを招待」を選択する</li>
            <li>招待するユーザーのメールアドレスを入力する</li>
            <li>役割を選択する（マネージャーまたは一般ユーザー）</li>
            <li>「招待」を選択する</li>
          </ol>

          <p>
            招待されたユーザーにはメールが送信されます。ユーザーはメール内のリンクからアカウントを有効化し、ログインできるようになります。
          </p>

          <p>
            なお、マネージャーが招待できる役割は「マネージャー」と「一般ユーザー」のみです。管理者を招待できるのは管理者のみです。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ユーザーの役割変更
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            既存ユーザーの役割は、ユーザー詳細画面から変更できます。管理者はすべてのユーザーの役割を変更できます。マネージャーは管理者以外のユーザーの役割を変更できます。
          </p>

          <p>役割を変更する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>会社画面のユーザー一覧から対象のユーザーを選択する</li>
            <li>役割のドロップダウンから新しい役割を選択する</li>
            <li>「ユーザーを更新」を選択する</li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          ユーザーの削除
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            会社からユーザーを削除すると、そのユーザーはログインできなくなります。管理者とマネージャーが実行できます。ただし、マネージャーは管理者を削除できません。
          </p>

          <p>ユーザーを削除する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>会社画面のユーザー一覧から対象のユーザーを探す</li>
            <li>削除アイコンを選択する</li>
            <li>確認画面で「削除」を選択する</li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートの管理
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートの作成・編集は管理者とマネージャーが行えます。ただし、Anthropicが提供するグローバルテンプレートは管理者のみ編集できます。
          </p>

          <p>
            管理者は他の会社へテンプレートを共有する機能も利用できます。共有されたテンプレートは受け取った会社でも利用できます。
          </p>

          <p>テンプレートの設計について詳しくは、テンプレートのセクションをご参照ください。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          タグの管理
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            タグの作成・編集・削除は管理者のみ実行できます。タグは会社単位で管理され、すべてのプロジェクトの写真に対して利用できます。
          </p>

          <p>タグの管理は会社画面から行います。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>新しいタグの作成</li>
            <li>既存タグの名前・説明の編集</li>
            <li>不要なタグの削除</li>
          </ul>

          <p>タグの活用方法について詳しくは、写真とタグのセクションをご参照ください。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクトの管理
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>プロジェクトの作成とステータス変更は管理者のみ実行できます。</p>

          <p>
            工事が完了したプロジェクトは「完了」ステータスに変更することを推奨します。完了済みのプロジェクトでは一般ユーザーとゲストが報告書を編集できなくなるため、記録の改ざんを防ぐことができます。
          </p>

          <p>プロジェクトの詳細については、プロジェクトのセクションをご参照ください。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          自分のアカウント設定
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            すべてのユーザーは自分のアカウント情報（氏名・メールアドレス）を変更できます。ユーザー詳細画面から編集し、「ユーザーを更新」を選択して保存します。
          </p>

          <p>
            ログアウトもユーザー詳細画面から行えます。「ログアウト」を選択すると確認画面が表示されます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          管理者は会社環境の基盤を整える役割を担います。テンプレートとタグを適切に設定しておくことで、現場担当者が一貫性のある報告書を効率よく作成できるようになります。ユーザーとプロジェクトの管理を適切に行い、必要な関係者だけが必要な情報にアクセスできる環境を維持してください。
        </p>
      </section>
    </div>
  );
}
