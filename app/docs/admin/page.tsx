import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function AdminPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          管理者向け
        </div>

        <Divider style={{ background: fontColor2 }} />

        <p className="mt-4">
          管理者は、ユーザーやプロジェクト、テンプレート、タグなど、会社全体の設定を管理できます。このページでは、管理者向けの主な機能と操作方法について説明します。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          権限の種類
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <p>
            Kenchiku AIでは、ユーザーごとに以下の3種類の権限を設定できます。
          </p>

          <div
            className="rounded-lg border p-6 space-y-6"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                システム管理者
              </div>

              <p className="mt-1">
                会社内のすべての機能を利用できます。ユーザー管理、プロジェクト管理、テンプレートやタグの管理など、すべての管理機能にアクセスできます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                管理者
              </div>

              <p className="mt-1">
                日常的な運用を担当する権限です。ユーザーの招待や報告書の管理、テンプレートの作成・編集などを行えます。一部の会社設定やプロジェクトのステータス変更は、システム管理者のみ行えます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                ユーザー
              </div>

              <p className="mt-1">
                プロジェクト内で報告書の作成・編集を行えます。テンプレートやタグ、ユーザー管理などの管理機能にはアクセスできません。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          ユーザーの招待
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            新しいユーザーを会社へ招待できます。この操作はシステム管理者と管理者が行えます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバーから
              <strong style={{ color: fontColor1 }}>
                「会社」
              </strong>
              を開きます。
            </li>

            <li>
              画面右上の
              <strong style={{ color: fontColor1 }}>
                「ユーザーを招待」
              </strong>
              をクリックします。
            </li>

            <li>
              招待するユーザーのメールアドレスを入力します。
            </li>

            <li>
              ユーザーに付与する権限を選択します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「招待」
              </strong>
              をクリックします。
            </li>
          </ol>

          <p>
            招待メールが送信されます。受信したユーザーは、メール内のリンクからアカウント登録を完了すると、Kenchiku AIを利用できるようになります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          ユーザー権限の変更
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            ユーザーの権限は、ユーザー詳細画面から変更できます。システム管理者はすべてのユーザーの権限を変更できます。管理者は、システム管理者以外のユーザーの権限を変更できます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバーから
              <strong style={{ color: fontColor1 }}>
                「会社」
              </strong>
              を開きます。
            </li>

            <li>
              権限を変更するユーザーを一覧から選択します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「権限」
              </strong>
              から新しい権限を選択します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「ユーザーを更新」
              </strong>
              をクリックします。
            </li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          ユーザーの削除
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            ユーザーを会社から削除すると、そのユーザーは会社のKenchiku AIへアクセスできなくなります。この操作はシステム管理者と管理者が行えます。ただし、管理者はシステム管理者を削除できません。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバーから
              <strong style={{ color: fontColor1 }}>
                「会社」
              </strong>
              を開きます。
            </li>

            <li>
              削除するユーザーを一覧から選択します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「削除」
              </strong>
              をクリックします。
            </li>

            <li>
              確認画面で
              <strong style={{ color: fontColor1 }}>
                「削除」
              </strong>
              をクリックします。
            </li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートの管理
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            テンプレートの作成・編集は、システム管理者と管理者が行えます。テンプレートを活用することで、会社で使用する報告書のフォーマットを統一できます。
          </p>

          <p>
            システム管理者は、作成したテンプレートを他の会社と共有することもできます。共有されたテンプレートは、共有先の会社でも利用できます。
          </p>

          <p>
            テンプレートの作成方法や各項目の設定については、
            <strong style={{ color: fontColor1 }}>
              「テンプレート」
            </strong>
            のページをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          タグの管理
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            タグは会社ごとに管理され、すべてのプロジェクトで共通して利用できます。タグの作成・編集・削除は、システム管理者と管理者が行えます。
          </p>

          <p>
            タグの管理は、サイドバーから
            <strong style={{ color: fontColor1 }}>
              「タグ」
            </strong>
            を開いて行います。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>新しいタグを作成する</li>
            <li>既存のタグ名や説明を編集する</li>
            <li>不要になったタグを削除する</li>
          </ul>

          <p>
            タグの使い方や写真への設定方法については、
            <strong style={{ color: fontColor1 }}>
              「写真とタグ」
            </strong>
            のページをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクトの管理
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトの作成やステータスの変更は、システム管理者のみ行えます。
          </p>

          <p>
            新しいプロジェクトを作成するには、サイドバーから
            <strong style={{ color: fontColor1 }}>
              「プロジェクト」
            </strong>
            を開き、画面右上の
            <strong style={{ color: fontColor1 }}>
              「作成」
            </strong>
            をクリックします。
          </p>

          <p>
            工事が完了したら、プロジェクトのステータスを
            <strong style={{ color: fontColor1 }}>
              「完了」
            </strong>
            に変更することをおすすめします。完了したプロジェクトでは、報告書の編集ができなくなるため、記録を安全に保管できます。
          </p>

          <p>
            プロジェクトの作成方法や管理方法について詳しくは、
            <strong style={{ color: fontColor1 }}>
              「プロジェクト」
            </strong>
            のページをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          アカウント設定
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            すべてのユーザーは、自分の氏名やメールアドレスなどのアカウント情報を変更できます。また、この画面からログアウトすることもできます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバー下部の
              <strong style={{ color: fontColor1 }}>
                ユーザーアイコン
              </strong>
              をクリックします。
            </li>

            <li>
              必要に応じて氏名やメールアドレスを変更します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「ユーザーを更新」
              </strong>
              をクリックして保存します。
            </li>
          </ol>

          <p>
            ログアウトする場合は、同じ画面で
            <strong style={{ color: fontColor1 }}>
              「ログアウト」
            </strong>
            をクリックしてください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          まとめ
        </div>

        <Divider style={{ background: fontColor2 }} />

        <p>
          システム管理者と管理者は、ユーザー、プロジェクト、テンプレート、タグを適切に管理することで、現場のメンバーがKenchiku AIをスムーズに利用できる環境を整えられます。運用開始時に必要な設定を済ませておくことで、日々の業務をより効率的に進められます。
        </p>
      </section>
    </div>
  );
}
