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
          プロジェクトは、工事や現場ごとの情報をまとめて管理するための単位です。報告書や写真、LINE連携、ゲストユーザーなど、プロジェクトに関する情報を一元管理できるため、関係者全員が同じ情報を共有しながら業務を進めることができます。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクトとは
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            Kenchiku AIでは、工事や現場ごとにプロジェクトを作成して管理します。報告書や写真、LINEグループとの連携など、関連する情報はすべてプロジェクト単位で管理されます。
          </p>

          <p>
            プロジェクトでは、主に次の情報を管理できます。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>プロジェクト名・説明</li>
            <li>報告書</li>
            <li>LINEグループとの連携</li>
            <li>ゲストユーザー</li>
            <li>プロジェクトのステータス（進行中・完了）</li>
          </ul>

          <p>
            工事ごとにプロジェクトを作成することで、必要な情報を整理しやすくなり、過去の記録も後から簡単に確認できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクトの作成
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトの作成は、管理者または管理者権限を持つユーザーのみ実行できます。
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              サイドバーから
              <strong style={{ color: fontColor1 }}>
                「プロジェクト」
              </strong>
              を選択します。
            </li>

            <li>
              画面右上の
              <strong style={{ color: fontColor1 }}>
                「作成」
              </strong>
              ボタンをクリックします。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                プロジェクト名
              </strong>
              を入力します。
            </li>

            <li>
              必要に応じて、
              <strong style={{ color: fontColor1 }}>
                説明
              </strong>
              を入力します。
            </li>

            <li>
              <strong style={{ color: fontColor1 }}>
                「保存」
              </strong>
              をクリックすると、プロジェクトが作成されます。
            </li>
          </ol>

          <p>
            プロジェクトを作成すると、報告書の作成やLINEグループとの連携、ゲストユーザーの招待などを行えるようになります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクトの編集
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトの
            <strong style={{ color: fontColor1 }}>
              名前
            </strong>
            と
            <strong style={{ color: fontColor1 }}>
              説明
            </strong>
            は、プロジェクト画面からいつでも編集できます。
          </p>

          <p>
            進行中のプロジェクトは、管理者または管理者権限を持つユーザーが編集できます。完了済みのプロジェクトは、管理者のみ編集できます。
          </p>

          <p>
            編集内容を保存するには
            <strong style={{ color: fontColor1 }}>
              「保存」
            </strong>
            をクリックします。変更を破棄する場合は、
            <strong style={{ color: fontColor1 }}>
              「キャンセル」
            </strong>
            をクリックしてください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクトのステータス
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトにはステータスがあり、工事の進捗に応じて管理できます。ステータスを適切に設定することで、編集可能なプロジェクトと完了したプロジェクトを区別できます。
          </p>

          <div
            className="rounded-lg border p-6 space-y-6"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                アクティブ
              </div>

              <p className="mt-2">
                工事が進行中のプロジェクトです。報告書の作成・編集や、LINE連携など、すべての機能を通常どおり利用できます。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                完了
              </div>

              <p className="mt-2">
                工事が完了したプロジェクトです。一般ユーザーおよびゲストユーザーは報告書を編集できなくなりますが、管理者は引き続き内容の確認や管理を行えます。
              </p>
            </div>
          </div>

          <p>
            プロジェクトのステータスは、管理者のみ変更できます。工事が完了したら「完了」に変更しておくことで、記録の誤編集を防ぐことができます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクト内の報告書
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクト画面では、そのプロジェクトに属するすべての報告書を管理できます。現場で作成された報告書や過去の記録も、プロジェクトごとにまとめて確認できます。
          </p>

          <p>
            最新の5件の報告書が表示されます。さらに報告書がある場合は、
            <strong style={{ color: fontColor1 }}>
              「すべて表示」
            </strong>
            をクリックすると一覧を確認できます。
          </p>

          <p>
            また、プロジェクト画面から新しい報告書を作成することもできます。作成した報告書は自動的に現在のプロジェクトへ紐付けられます。
          </p>

          <p>
            報告書の作成方法やAI機能について詳しくは、
            <strong style={{ color: fontColor1 }}>
              「報告書」
            </strong>
            のセクションをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          まとめ
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            プロジェクトは、Kenchiku AIにおける工事・現場管理の中心となる機能です。報告書や写真、LINE連携、ゲストユーザーなど、プロジェクトに関する情報を一元管理できます。
          </p>

          <p>
            工事ごとにプロジェクトを作成することで、関係者全員が同じ情報を共有しながら業務を進められます。また、工事の完了後にプロジェクトを「完了」へ変更することで、記録の正確性を維持しながら過去の情報を保管できます。
          </p>

          <p>
            プロジェクトを適切に管理することで、日々の報告業務だけでなく、情報共有や進捗管理、過去の記録の検索・活用まで、より効率的に行えるようになります。
          </p>
        </div>
      </section>
    </div>
  );
}
