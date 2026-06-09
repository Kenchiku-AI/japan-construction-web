import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function ReportsPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          報告書
        </div>
        <Divider />
        <p className="mt-4">
          報告書は Kenchiku AI
          の中心となる機能です。すべての報告書はテンプレートから作成され、プロジェクトまたは会社に関連付けられます。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          報告書とは
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>報告書は、現場で収集した情報を記録・管理するためのものです。</p>
          <p>
            日々の作業内容や安全事項、進捗状況、検査結果などを一元的に管理できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートとの関係
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p>
          すべての報告書はテンプレートから作成されます。テンプレートによって収集する情報やAIの整理方法が決まります。
        </p>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクト報告書と会社報告書
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            <strong>プロジェクト報告書</strong>
            は特定のプロジェクトに関連付けられます。
          </p>
          <p>
            <strong>会社報告書</strong>
            は特定のプロジェクトに紐付かない会社全体の報告書です。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Webアプリとモバイルアプリ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            報告書は Web
            アプリとモバイルアプリの両方から作成および編集できます。
          </p>
          <p>
            現場では主にモバイルアプリを利用して音声入力や写真撮影を行い、その後
            Web アプリから内容を確認・修正する運用が一般的です。
          </p>
          <p>
            Web
            アプリでは、現場で入力された内容を確認し、各項目の値を編集したり、報告書全体を管理したりできます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          音声文字起こし
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            モバイルアプリでは、現場の状況を自然な言葉で話すだけで報告書を作成できます。
          </p>
          <p>
            AIはテンプレートの項目説明を参照し、発話内容から適切な情報を抽出して各項目へ入力します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          写真
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            写真はモバイルアプリで撮影することも、既存の写真をアップロードすることもできます。
          </p>
          <p>
            写真は報告書の一部として保存され、進捗状況や施工状況、検査結果などの記録に利用できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          AIによる写真解析
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            写真を撮影またはアップロードすると、AIが自動的に画像を解析します。
          </p>
          <p>解析結果に基づき、写真の説明文が自動生成されます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          AIによるタグ付け
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>
            写真を撮影またはアップロードすると、AIは会社で設定されたタグとの一致も確認します。
          </p>
          <p>
            写真の内容がタグの説明に一致する場合、そのタグが自動的に適用されることがあります。
          </p>
          <p>タグの詳細については「タグ」ページを参照してください。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          報告書の検索
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p>報告書一覧では検索機能を利用できます。</p>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          エクスポート
        </div>
        <Divider style={{ background: fontColor2 }} />
        <div className="space-y-4">
          <p>報告書はいつでも PDF または Excel 形式でエクスポートできます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          報告書の削除
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p>
          不要になった報告書は削除できます。削除された報告書は復元できません。
        </p>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />
        <p>
          報告書は Kenchiku AI
          における情報管理の中心です。AIによる情報整理、写真説明の生成、自動タグ付けにより、効率的かつ一貫性のある記録を作成できます。
        </p>
      </section>
    </div>
  );
}
