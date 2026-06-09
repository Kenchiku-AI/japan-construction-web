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
          報告書はKenchiku AIの中心となる機能です。すべての報告書はテンプレートから作成され、プロジェクトまたは会社に属します。報告書はWebアプリケーションとモバイルアプリケーションの両方から作成・編集できます。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          報告書とは
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>報告書は、現場での作業内容や状況を記録するための主要な手段です。</p>

          <p>報告書は以下の情報を記録するために使用されます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>日々の作業内容</li>
            <li>現場の状況</li>
            <li>安全管理に関する事項</li>
            <li>進捗状況</li>
            <li>各種検査の記録</li>
            <li>品質管理に関する記録</li>
            <li>その他プロジェクト関連情報</li>
          </ul>

          <p>
            報告書はWebアプリケーションとモバイルアプリケーションの両方から作成・編集できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          テンプレートとの関係
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>すべての報告書はテンプレートから作成されます。</p>

          <p>テンプレートを選択することで、以下が決まります。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書に表示される項目</li>
            <li>収集する情報の種類</li>
            <li>AIによる情報整理の方法</li>
            <li>報告書全体の構成</li>
          </ul>

          <p>
            そのため、テンプレートの品質が報告書の品質と一貫性に直接影響します。テンプレートの設計について詳しくは、テンプレートのセクションをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          プロジェクト報告書と会社報告書
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              プロジェクト報告書
            </h3>

            <p className="mt-2">
              プロジェクト報告書は特定のプロジェクトに属します。特定のプロジェクトで実施された作業を記録するために使用されます。
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>日報</li>
              <li>検査報告書</li>
              <li>安全報告書</li>
              <li>進捗報告書</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: fontColor1 }}>
              会社報告書
            </h3>

            <p className="mt-2">
              会社報告書は特定のプロジェクトではなく、会社全体に属します。特定のプロジェクトに紐付かない情報を記録する際に便利です。
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>社内管理記録</li>
              <li>機器・設備報告書</li>
              <li>全社共通記録</li>
              <li>一般ドキュメント</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Webアプリとモバイルアプリ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書はWebアプリケーションとモバイルアプリケーションの両方から作成・編集できます。ただし、現場でのデータ収集はモバイルアプリケーションを使用するのが一般的です。
          </p>

          <p>モバイルアプリケーションは現場での利用を想定して設計されており、以下の機能をサポートします。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>音声文字起こし</li>
            <li>写真撮影</li>
            <li>写真アップロード</li>
            <li>報告書の編集</li>
            <li>リアルタイム更新</li>
          </ul>

          <p>
            一般的なワークフローとして、現場でモバイルアプリケーションを使用して報告書を作成・更新し、後からWebアプリケーションで内容を確認・修正するという流れが多く見られます。
          </p>

          <p>
            どちらのアプリで変更を行っても、もう一方のアプリに即座に反映されます。
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
            音声文字起こしを使用することで、各項目を手入力する代わりに、作業内容を自然な言葉で話すだけで報告書を作成できます。
          </p>

          <p>例えば、</p>

          <div
            className="rounded-lg border p-6"
            style={{ borderColor: fontColor2 }}
          >
            <p>
              「本日は曇りでした。作業員は12名です。Bエリアのコンクリート打設を完了しました。安全上の問題はありませんでした。」
            </p>
          </div>

          <p>
            のように話すだけで、AIがテンプレートの項目説明を参照しながら、それぞれの情報を適切な項目へ自動的に振り分けます。
          </p>

          <p>
            これにより、現場での手入力作業を大幅に削減できます。AIによる整理結果は必ず確認し、必要に応じて修正してください。
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
            写真はモバイルアプリケーションのカメラで撮影するか、直接報告書へアップロードすることができます。
          </p>

          <p>写真は以下の記録に活用されます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>作業の進捗状況</li>
            <li>完了した工事内容</li>
            <li>不具合・欠陥の記録</li>
            <li>各種検査の状況</li>
            <li>安全管理の状況</li>
            <li>現場の状況</li>
          </ul>

          <p>
            写真は報告書の一部として保存され、PDFおよびExcelエクスポートに含まれる場合があります。
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
            写真を撮影またはアップロードすると、AIが自動的に画像の内容を分析します。
          </p>

          <p>分析結果に基づき、写真の説明文が自動生成されます。</p>

          <p>
            例えば、鉄筋の配筋状況やコンクリート打設作業、足場の設置状況などが写っている場合、その内容が説明文として保存されます。
          </p>

          <p>この機能により、以下のメリットがあります。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>写真の内容を後から素早く把握できる</li>
            <li>過去の記録を効率よく検索できる</li>
            <li>報告書の品質向上につながる</li>
            <li>手作業による説明文の入力を削減できる</li>
          </ul>

          <p>自動生成された説明文は確認のうえ、必要に応じて修正してください。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          AIによるタグ付け
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真を撮影またはアップロードすると、AIが会社で作成済みのタグと写真の内容を照合し、該当するタグを自動的に適用します。
          </p>

          <p>例えば、以下のようなタグを作成している場合、</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>鉄筋工事</li>
            <li>コンクリート工事</li>
            <li>掘削工事</li>
            <li>足場</li>
            <li>安全設備</li>
          </ul>

          <p>
            写真の内容がタグの説明と一致した場合、AIが自動的にそのタグを付与します。
          </p>

          <p>
            タグを活用することで、大量の写真の中から目的の写真を素早く見つけることができます。タグと写真の整理について詳しくは、写真とタグのセクションをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          報告書の検索
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書ページには検索機能があり、既存の報告書を素早く見つけることができます。
          </p>

          <p>以下の情報を使用して検索できます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書名</li>
            <li>プロジェクト名</li>
            <li>使用テンプレート</li>
            <li>報告書の内容</li>
          </ul>

          <p>この機能により、過去の報告書やプロジェクト記録を効率よく参照できます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          エクスポート
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>報告書はいつでもエクスポートできます。</p>

          <p>利用可能なエクスポート形式は以下のとおりです。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>PDF</li>
            <li>Excel</li>
          </ul>

          <p>エクスポートは以下の用途に活用できます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>発注者・施主への提出</li>
            <li>社内資料の作成</li>
            <li>法令・規制への対応</li>
            <li>プロジェクト記録の保管</li>
            <li>長期アーカイブ</li>
          </ul>

          <p>エクスポートの詳細については、エクスポートのセクションをご参照ください。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          報告書の削除
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>不要になった報告書は削除できます。</p>

          <p>削除する前に以下を確認してください。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書が不要であることを確認する</li>
            <li>必要なエクスポートを事前に生成しておく</li>
            <li>関係者への周知を行う</li>
          </ul>

          <p>
            削除した報告書はシステムから完全に削除され、元に戻すことはできません。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          報告書はKenchiku AIにおける情報収集・記録の中心です。Webアプリケーションとモバイルアプリケーションのどちらからでも作成・編集できますが、現場でのデータ収集はモバイルアプリケーションを使用するのが一般的です。AIが音声入力の内容を各項目へ振り分け、写真の説明文を自動生成し、関連するタグを自動的に付与することで、一貫性のある質の高い報告書を効率よく作成できます。
        </p>
      </section>
    </div>
  );
}
