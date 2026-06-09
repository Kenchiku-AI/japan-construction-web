import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";

export default function PhotosAndTagsPage() {
  return (
    <div className="max-w-4xl space-y-12" style={{ color: "#7a7e82" }}>
      <div>
        <div className="text-3xl" style={{ color: fontColor1 }}>
          写真とタグ
        </div>
        <Divider />
        <p className="mt-4">
          写真は報告書の重要な記録手段です。タグを活用することで、大量の写真を工種や状況ごとに整理し、必要な写真を素早く見つけることができます。
        </p>
      </div>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          写真のアップロード
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真は報告書に直接アップロードできます。モバイルアプリケーションではカメラで撮影した写真をそのままアップロードすることも可能です。
          </p>

          <p>写真をアップロードする手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>報告書を開く</li>
            <li>「写真をアップロード」を選択する</li>
            <li>写真を選択または撮影する</li>
            <li>アップロードが完了するまで待つ</li>
          </ol>

          <p>
            アップロード後、AIが自動的に画像を解析して説明文を生成し、該当するタグを自動的に適用します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          写真の説明文
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真をアップロードすると、AIが自動的に画像の内容を分析し、説明文を生成します。
          </p>

          <p>
            例えば、鉄筋の配筋状況やコンクリート打設作業、足場の設置状況などが写っている場合、その内容が説明文として保存されます。
          </p>

          <p>説明文は以下の用途に活用されます。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>写真の内容を後から素早く把握する</li>
            <li>PDFおよびExcelエクスポートへの記載</li>
            <li>過去の記録の検索・参照</li>
          </ul>

          <p>
            自動生成された説明文は確認のうえ、必要に応じて修正してください。写真の詳細画面から編集できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          写真の一括ダウンロード
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書内の写真はすべてまとめてダウンロードできます。タグでフィルタリングしている場合は、そのタグが付いた写真のみをダウンロードすることも可能です。
          </p>

          <p>ダウンロードされる写真はZIPファイルにまとめられます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          タグとは
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            タグは写真を工種や状況ごとに分類するためのラベルです。会社単位で作成・管理します。
          </p>

          <p>タグには名前と説明を設定します。</p>

          <div
            className="rounded-lg border p-6 space-y-4"
            style={{ borderColor: fontColor2 }}
          >
            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                タグの例：鉄筋工事
              </div>
              <p className="mt-2">
                鉄筋の配筋・組立・検査に関する写真。鉄筋の種類、配置、結束状況などが含まれる。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                タグの例：コンクリート工事
              </div>
              <p className="mt-2">
                コンクリートの打設・養生・仕上げに関する写真。打設状況、養生シート、表面仕上げなどが含まれる。
              </p>
            </div>

            <div>
              <div className="font-semibold" style={{ color: fontColor1 }}>
                タグの例：安全設備
              </div>
              <p className="mt-2">
                安全帯、ヘルメット、安全ネット、防護フェンスなど、現場の安全管理に関する設備・装備の写真。
              </p>
            </div>
          </div>

          <p>
            説明文をできるだけ具体的に記載することで、AIによる自動タグ付けの精度が向上します。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          タグの作成
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>タグは管理者のみ作成・編集・削除できます。</p>

          <p>
            タグの管理はサイドバーの「タグ」画面から行います。ここで作成したタグは会社全体で利用され、すべての報告書の写真に適用できます。
          </p>

          <p>タグを作成する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>サイドバーから「タグ」を開く</li>
            <li>「タグを作成」を選択する</li>
            <li>タグ名を入力する</li>
            <li>説明文を入力する</li>
            <li>保存する</li>
          </ol>

          <p>
            説明文には、そのタグを付与したい写真の内容を具体的に記載してください。説明が具体的であるほど、AIによる自動タグ付けの精度が向上します。
          </p>

          <p>作成したタグはすべての報告書の写真に対して利用できます。</p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          AIによる自動タグ付け
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            写真をアップロードすると、AIが会社で設定されているタグの説明と写真の内容を照合し、一致するタグを自動的に適用します。
          </p>

          <p>
            自動タグ付けはあくまで補助機能です。AIが付与したタグは確認のうえ、必要に応じて手動で追加・削除してください。
          </p>

          <p>
            タグの説明文を具体的に記載するほど、AIが写真の内容を正しく判断しやすくなります。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          手動でのタグ追加・削除
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>写真の詳細画面から、タグを手動で追加・削除できます。</p>

          <p>タグを追加する手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>報告書内の写真をタップする</li>
            <li>「タグを追加」を選択する</li>
            <li>追加するタグを選択する</li>
          </ol>

          <p>
            すでに適用されているタグは写真の詳細画面に表示されます。不要なタグはタグ名の横にある「×」から削除できます。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          タグによるフィルタリング
        </div>
        <Divider style={{ background: fontColor2 }} />

        <div className="space-y-4">
          <p>
            報告書の写真一覧はタグでフィルタリングできます。特定の工種や状況に関する写真だけを表示したい場合に便利です。
          </p>

          <p>フィルタリングする手順は以下のとおりです。</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>報告書を開く</li>
            <li>「タグでフィルター」を選択する</li>
            <li>表示したいタグを選択する</li>
          </ol>

          <p>
            フィルタリング中は、選択したタグが付いた写真のみが表示されます。フィルタを解除するには、タグの選択を外してください。
          </p>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold" style={{ color: fontColor1 }}>
          まとめ
        </div>
        <Divider style={{ background: fontColor2 }} />

        <p>
          写真とタグを活用することで、現場記録の品質と検索性を大幅に向上させることができます。AIが説明文の生成とタグの自動付与を補助するため、現場での記録作業の負担を軽減しながら、一貫性のある写真管理が実現できます。タグの説明文は具体的に記載するほどAIの精度が向上します。
        </p>
      </section>
    </div>
  );
}
