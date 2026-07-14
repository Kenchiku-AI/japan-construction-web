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
          報告書は、Kenchiku AIで現場の情報を記録・共有するための基本機能です。音声入力や写真、AIによる情報整理を活用することで、現場で収集した情報を効率よく記録できます。報告書はWebアプリとモバイルアプリのどちらからでも作成・編集でき、プロジェクト全体でリアルタイムに共有されます。
        </p>
      </div>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          報告書とは
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書は、現場で発生した情報を記録・管理するための機能です。日々の作業内容だけでなく、写真や検査結果、安全管理に関する情報など、プロジェクトに関するさまざまな記録をまとめて管理できます。
          </p>

          <p>
            報告書には、例えば次のような内容を記録できます。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>作業内容</li>
            <li>現場の進捗状況</li>
            <li>安全管理に関する記録</li>
            <li>品質管理に関する記録</li>
            <li>各種検査の結果</li>
            <li>現場写真</li>
            <li>その他、プロジェクトに関する情報</li>
          </ul>

          <p>
            モバイルアプリでは音声入力や写真撮影を利用して現場で素早く情報を記録でき、Webアプリでは内容の確認や編集、エクスポートなどを行えます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          テンプレートとの関係
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            すべての報告書は、あらかじめ作成されたテンプレートをもとに作成されます。テンプレートには、報告書に必要な項目や、それぞれの項目に入力する内容が定義されています。
          </p>

          <p>
            テンプレートによって、次のような内容が決まります。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書に表示される項目</li>
            <li>入力する情報の種類</li>
            <li>AIが音声入力を各項目へ振り分ける方法</li>
            <li>報告書全体の構成</li>
          </ul>

          <p>
            適切に設計されたテンプレートを利用することで、報告書の形式を統一できるだけでなく、AIによる情報整理の精度も向上します。
          </p>

          <p>
            テンプレートの作成方法について詳しくは、
            <strong style={{ color: fontColor1 }}>
              「テンプレート」
            </strong>
            のページをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          プロジェクト報告書と会社報告書
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-6">
          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              プロジェクト報告書
            </h3>

            <p>
              プロジェクト報告書は、特定のプロジェクトに紐付く報告書です。現場で発生した作業内容や進捗、検査結果、写真など、そのプロジェクトに関する情報を記録するために使用します。
            </p>

            <p>
              例えば、以下のような報告書が該当します。
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>日報</li>
              <li>工程・進捗報告書</li>
              <li>安全報告書</li>
              <li>検査報告書</li>
            </ul>
          </div>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              会社報告書
            </h3>

            <p>
              会社報告書は、特定のプロジェクトには紐付けず、会社全体で管理する報告書です。複数のプロジェクトで共有する情報や、社内向けの記録を管理する際に利用します。
            </p>

            <p>
              例えば、以下のような報告書が該当します。
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>社内業務の記録</li>
              <li>設備・機器の管理記録</li>
              <li>全社共通の点検・管理記録</li>
              <li>その他、会社全体で管理する文書</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          Webアプリとモバイルアプリ
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書はWebアプリとモバイルアプリのどちらからでも作成・編集できます。それぞれ得意な用途が異なるため、用途に応じて使い分けることをおすすめします。
          </p>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              Webアプリ
            </h3>

            <p>
              主に事務所やオフィスで利用します。
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>報告書の作成・編集</li>
              <li>報告内容の確認</li>
              <li>PDF・Excelへのエクスポート</li>
              <li>写真や添付資料の確認</li>
            </ul>
          </div>

          <div
            className="rounded-lg border p-6 space-y-3"
            style={{ borderColor: fontColor2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: fontColor1 }}>
              モバイルアプリ
            </h3>

            <p>
              主に現場で利用します。
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>音声入力</li>
              <li>写真の撮影・アップロード</li>
              <li>報告書の作成・編集</li>
              <li>現場からリアルタイムで情報を記録</li>
            </ul>
          </div>

          <p>
            一般的には、現場ではモバイルアプリを使って音声入力や写真の撮影を行い、事務所に戻ってからWebアプリで内容を確認・必要に応じて編集する運用がおすすめです。
          </p>

          <p>
            報告書はクラウド上で管理されるため、どちらのアプリで編集した内容も自動的に同期され、常に最新の状態で利用できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          音声入力
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            モバイルアプリでは、キーボードで入力する代わりに、音声で報告内容を入力できます。現場で話した内容はAIによって解析され、テンプレートの各項目へ自動的に振り分けられます。
          </p>

          <p>
            例えば、次のように話しかけるだけで入力できます。
          </p>

          <div
            className="rounded-lg border p-6"
            style={{ borderColor: fontColor2 }}
          >
            <p>
              「本日は曇りでした。作業員は12名です。Bエリアのコンクリート打設を完了しました。安全上の問題はありませんでした。」
            </p>
          </div>

          <p>
            AIはテンプレートに設定された各項目の説明をもとに、天候、作業員数、作業内容、安全に関する情報などを自動で適切な項目へ入力します。
          </p>

          <p>
            手入力の手間を大幅に削減できるため、現場では作業内容を自然に話すだけで効率よく報告書を作成できます。
          </p>

          <p>
            AIが入力した内容は必要に応じて編集できますので、保存前に内容をご確認ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          写真
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真は、モバイルアプリで撮影するか、端末に保存されている写真をアップロードして報告書へ追加できます。撮影した写真は報告書の一部として保存され、プロジェクトメンバーと共有されます。
          </p>

          <p>
            現場では、例えば次のような記録に活用できます。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>工事の進捗状況</li>
            <li>施工後の完成状況</li>
            <li>不具合や是正箇所の記録</li>
            <li>検査・点検の記録</li>
            <li>安全設備や安全対策の確認</li>
            <li>現場全体の状況</li>
          </ul>

          <p>
            写真を追加すると、AIが自動的に内容を解析し、説明文の生成やタグ付けを行います。これらの機能については、次のセクションで詳しく説明します。
          </p>

          <p>
            追加した写真は、必要に応じてPDFやExcelへエクスポートすることもできます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          AIによる写真解析
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真を追加すると、AIが画像の内容を自動的に解析し、写真の説明文を生成します。説明文は報告書とあわせて保存されるため、後から写真の内容を確認しやすくなります。
          </p>

          <p>
            例えば、鉄筋の配筋状況やコンクリート打設、足場の設置状況などが写っている場合は、それらの内容をもとに説明文が自動で作成されます。
          </p>

          <p>
            AIによる説明文には、次のようなメリットがあります。
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>写真の内容を後からすぐに把握できる</li>
            <li>大量の写真の中から目的の写真を見つけやすくなる</li>
            <li>報告書の品質や一貫性の向上につながる</li>
            <li>写真ごとの説明文を手入力する手間を削減できる</li>
          </ul>

          <p>
            自動生成された説明文は必要に応じて編集できますので、保存前に内容をご確認ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          AIによるタグ付け
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真を追加すると、AIが写真の内容を解析し、会社で作成済みのタグの説明と照らし合わせて、該当するタグを自動的に付与します。
          </p>

          <p>
            例えば、会社で次のようなタグを作成している場合、
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>鉄筋工事</li>
            <li>コンクリート工事</li>
            <li>掘削工事</li>
            <li>足場</li>
            <li>安全設備</li>
          </ul>

          <p>
            写真の内容が各タグの説明と一致した場合は、AIが適切なタグを自動的に付与します。
          </p>

          <p>
            タグを活用することで、プロジェクト内の大量の写真を整理しやすくなり、必要な写真も素早く見つけられるようになります。
          </p>

          <p>
            タグは必要に応じて追加・変更・削除できます。タグの作成方法については、「写真とタグ」のセクションをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          報告書の検索
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書ページでは、検索機能を利用して目的の報告書をすばやく見つけることができます。報告書が増えても、必要な情報へ効率よくアクセスできます。
          </p>

          <p>次のような情報をもとに検索できます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書名</li>
            <li>プロジェクト名</li>
            <li>使用しているテンプレート</li>
            <li>報告書の内容</li>
          </ul>

          <p>
            過去の報告書を確認したり、特定の工事や作業内容に関する記録を探したりする際に便利です。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          エクスポート
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            作成した報告書は、いつでもPDFまたはExcel形式でエクスポートできます。用途に応じて、社内での共有や提出資料として活用できます。
          </p>

          <p>利用できるエクスポート形式は次のとおりです。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>PDF</li>
            <li>Excel</li>
          </ul>

          <p>エクスポートした報告書は、例えば次のような用途で利用できます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>施主・発注者への提出</li>
            <li>社内での情報共有</li>
            <li>検査や監査への対応</li>
            <li>プロジェクト記録の保管</li>
            <li>長期的なアーカイブ</li>
          </ul>

          <p>
            エクスポート機能の詳しい使い方については、「エクスポート」のセクションをご参照ください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl" style={{ color: fontColor1 }}>
          報告書の削除
        </div>

        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            不要になった報告書は削除できます。ただし、削除した報告書は復元できませんので、削除する前に内容を十分ご確認ください。
          </p>

          <p>削除する前に、次の点をご確認ください。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>本当に不要な報告書であること</li>
            <li>必要な場合は、事前にPDFまたはExcelでエクスポートしていること</li>
            <li>関係者への共有や確認が完了していること</li>
          </ul>

          <p>
            報告書を削除すると、関連する内容や添付した写真も含めてシステムから完全に削除され、元に戻すことはできません。
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
            報告書は、Kenchiku AIにおける情報管理の中心となる機能です。Webアプリとモバイルアプリのどちらからでも作成・編集でき、現場でもオフィスでも同じ情報をリアルタイムで共有できます。
          </p>

          <p>
            音声入力や写真の追加を行うだけで、AIが情報を整理し、写真の説明文やタグの提案も自動で行います。これにより、手入力の負担を減らしながら、一貫性のある質の高い報告書を効率よく作成できます。
          </p>

          <p>
            日々の現場記録を正確に残すことで、プロジェクトの進捗管理や情報共有がスムーズになり、必要な記録も後から簡単に検索・活用できるようになります。
          </p>
        </div>
      </section>
    </div>
  );
}
