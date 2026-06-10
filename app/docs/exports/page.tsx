import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function ExportsPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          エクスポート
        </div>
        <Divider />
        <p className="mt-4">
          報告書はPDFまたはExcel形式でエクスポートできます。発注者への提出、社内保管、法令対応など、さまざまな用途に活用できます。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          PDFエクスポート
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            個々の報告書をPDF形式でダウンロードできます。PDFには報告書の全項目と写真が含まれます。
          </p>

          <p>PDFをダウンロードする手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>報告書を開く</li>
            <li>「PDFダウンロード」を選択する</li>
            <li>ダウンロードが完了するまで待つ</li>
          </ol>

          <p>PDFに含まれる情報は以下のとおりです。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>報告書名・作成日</li>
            <li>プロジェクト名（プロジェクト報告書の場合）</li>
            <li>各項目の入力値</li>
            <li>写真</li>
            <li>写真の説明文</li>
            <li>写真に付与されたタグ</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          Excelエクスポート
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            複数の報告書をまとめてExcel形式でダウンロードできます。同じテンプレートから作成された報告書を一覧表形式で出力するのに適しています。
          </p>

          <p>
            例えば、1か月分の日報をまとめて1つのExcelファイルとして出力したり、プロジェクト内のすべての検査報告書を一覧化したりする場合に便利です。
          </p>

          <p>Excelをダウンロードする手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>プロジェクト画面または報告書一覧を開く</li>
            <li>「エクスポート」を選択する</li>
            <li>テンプレートを選択する</li>
            <li>必要に応じてプロジェクトを選択する</li>
            <li>「ダウンロード」を選択する</li>
          </ol>

          <p>
            選択したテンプレートから作成された報告書が、1行1報告書の形式でExcelに出力されます。各列はテンプレートの項目に対応します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          エクスポートの対象範囲
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>Excelエクスポートでは、テンプレートとプロジェクトの組み合わせで対象を絞り込めます。</p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                プロジェクトを指定しない場合
              </div>
              <p className="mt-1">
                選択したテンプレートから作成されたすべての報告書が対象になります。複数プロジェクトにまたがる集計に適しています。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                プロジェクトを指定する場合
              </div>
              <p className="mt-1">
                選択したテンプレートかつ選択したプロジェクトに属する報告書のみが対象になります。特定の現場の記録をまとめる場合に適しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          写真の一括ダウンロード
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書内の写真はZIPファイルとして一括ダウンロードできます。タグでフィルタリングしている場合は、そのタグが付いた写真のみをダウンロードすることも可能です。
          </p>

          <p>写真をダウンロードする手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>報告書を開く</li>
            <li>必要に応じてタグでフィルタリングする</li>
            <li>「すべてダウンロード」または対象タグの「写真をダウンロード」を選択する</li>
          </ol>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          エクスポートの活用例
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>エクスポート機能は以下のような場面で活用できます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>月次の日報を発注者へ提出する</li>
            <li>検査結果をまとめて社内に報告する</li>
            <li>完工書類として安全報告書を保管する</li>
            <li>工事写真帳として写真をまとめてPDFで提出する</li>
            <li>プロジェクト全体の作業記録をExcelで整理する</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          PDFエクスポートは個別の報告書を提出・保管する際に、Excelエクスポートは複数の報告書を集計・一覧化する際に活用してください。写真の一括ダウンロードと組み合わせることで、工事記録の一式をまとめて出力することができます。
        </p>
      </section>
    </div>
  );
}
