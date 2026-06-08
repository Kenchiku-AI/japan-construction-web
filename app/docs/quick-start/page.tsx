export default function QuickStartPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold">クイックスタート</h1>
        <p className="mt-4 text-muted-foreground">
          Kenchiku AIの基本的な利用方法をご紹介します。初めて利用する方は、
          まずこのページをご確認ください。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Kenchiku AIへようこそ</h2>

        <p>
          Kenchiku AIは、報告業務の管理を行うWebアプリケーションと、
          現場での情報収集を行うモバイルアプリケーションを組み合わせた
          建設業向け報告プラットフォームです。
        </p>

        <p>
          AIを活用することで、現場で収集した情報を効率的かつ統一された形式で
          報告書としてまとめることができます。
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>報告書の作成</li>
          <li>写真の管理</li>
          <li>音声入力による現場記録</li>
          <li>AIによる情報整理</li>
          <li>PDFおよびExcel形式での出力</li>
          <li>関係者との情報共有</li>
        </ul>

        <p>
          現場監督、施工管理者、検査担当者、協力会社、発注者など、
          さまざまな立場の利用者が同じ情報を効率的に共有できるよう設計されています。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">利用を開始する前に</h2>

        <p>Kenchiku AIを利用するには、管理者から招待を受ける必要があります。</p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">会社ユーザーとして招待される場合</h3>
            <p className="mt-1">
              所属会社のKenchiku AI環境に招待されます。
              ログイン後は、担当するプロジェクトへアクセスできます。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">ゲストとして招待される場合</h3>
            <p className="mt-1">
              他社が管理する特定のプロジェクトへ招待されます。
              ゲストは招待されたプロジェクトのみ利用できます。
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">アカウントの有効化</h2>

        <p>招待メールを受信したら、以下の手順で利用を開始してください。</p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>招待メールを開く</li>
          <li>アクティベーションリンクをクリックする</li>
          <li>パスワードを設定する</li>
          <li>ログインする</li>
        </ol>

        <p>ログイン後、割り当てられたプロジェクトを確認できます。</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Webアプリとモバイルアプリ</h2>

        <p>
          Kenchiku AIは、Webアプリとモバイルアプリの両方を提供しています。
          それぞれ利用する場面が異なります。
        </p>

        <div className="rounded-lg border p-6 space-y-3">
          <h3 className="text-lg font-semibold">Webアプリ</h3>

          <p>主に事務所やオフィスで利用します。</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>テンプレートの作成・管理</li>
            <li>プロジェクト情報の管理</li>
            <li>ユーザー・ゲストの管理</li>
            <li>提出済み報告書の確認</li>
            <li>PDFダウンロード・Excelダウンロード</li>
            <li>タグの管理</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6 space-y-3">
          <h3 className="text-lg font-semibold">モバイルアプリ</h3>

          <p>主に現場で利用します。</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>報告書の作成</li>
            <li>音声入力による記録</li>
            <li>写真の撮影・アップロード</li>
            <li>AIによる内容整理</li>
            <li>現場での情報更新</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">テンプレートについて</h2>

        <p>報告書を作成する前に、まずテンプレートを作成する必要があります。</p>

        <p>
          テンプレートは報告書の構成だけでなく、
          AIがどのように情報を整理するかも決定します。
        </p>

        <p>テンプレートでは以下を定義します。</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>報告書に表示される項目</li>
          <li>収集する情報</li>
          <li>情報の整理方法</li>
          <li>各項目の入力ルール</li>
          <li>AIによる情報の解釈方法</li>
        </ul>

        <p>テンプレートの例：</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>日報</li>
          <li>安全報告書</li>
          <li>品質管理報告書</li>
          <li>検査報告書</li>
          <li>進捗報告書</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">AIとテンプレートの関係</h2>

        <p>
          AIは各項目の説明を参照し、
          ユーザーの発話から適切な値を抽出して各項目へ入力します。
        </p>

        <p>
          そのため、各項目の説明には、
          入力してほしい内容やフォーマットをできるだけ具体的に記載することが重要です。
        </p>

        <div className="rounded-lg border p-6 space-y-6">
          <div>
            <h3 className="font-semibold">天候</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              当日の天候を記録してください。
              以下のいずれかのみを入力してください。
              「晴れ」「曇り」「雨」「雪」
            </p>
          </div>

          <div>
            <h3 className="font-semibold">作業員数</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              当日現場で作業した人数を記録してください。
              数字のみを入力してください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">作業時間</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              作業開始時刻と終了時刻を記録してください。
              「08:00–17:00」の形式で入力してください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">実施作業</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              当日完了した作業内容を記録してください。
              今後予定している作業は含めないでください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">安全事項</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              安全に関する指摘事項や問題点を記録してください。
              問題がない場合は「安全上の問題なし」と入力してください。
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">音声入力の例</h2>

        <div className="rounded-lg border p-6 space-y-4">
          <div>
            <h3 className="font-semibold">入力内容</h3>

            <p className="mt-2">
              本日は晴れでした。作業時間は8時から17時です。 作業員は12名でした。
              Bエリアでコンクリート打設を実施し、
              Cエリアで鉄筋組立を完了しました。 安全上の問題はありませんでした。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">AIによる整理結果</h3>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <strong>天候：</strong> 晴れ
              </div>
              <div>
                <strong>作業員数：</strong> 12
              </div>
              <div>
                <strong>作業時間：</strong> 08:00–17:00
              </div>
              <div>
                <strong>実施作業：</strong>
                Bエリアでコンクリート打設を実施した。
                Cエリアで鉄筋組立を完了した。
              </div>
              <div>
                <strong>安全事項：</strong>
                安全上の問題なし
              </div>
            </div>
          </div>
        </div>

        <p>
          このように、利用者は現場の状況を自然に話すだけで、
          AIが適切な項目へ情報を整理します。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">報告書を作成する</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>プロジェクトを開く</li>
          <li>「報告書を作成」を選択する</li>
          <li>テンプレートを選択する</li>
          <li>項目内容を確認する</li>
          <li>音声入力または手入力で情報を登録する</li>
          <li>保存する</li>
        </ol>

        <p>
          テンプレートによって表示される項目や、 AIによる整理方法が決まります。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">写真を追加する</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>報告書を開く</li>
          <li>写真をアップロードする</li>
          <li>写真を確認する</li>
          <li>保存する</li>
        </ol>

        <p>AIは写真の内容を分析し、説明やタグの候補を提案できます。</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">PDF・Excelダウンロード</h2>

        <p>完成した報告書はPDFまたはExcel形式でダウンロードできます。</p>

        <p>出力内容には以下が含まれる場合があります。</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>報告書情報</li>
          <li>入力済み項目</li>
          <li>写真</li>
          <li>写真説明</li>
          <li>タグ情報</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">利用のポイント</h2>

        <ul className="list-disc pl-6 space-y-3">
          <li>テンプレートの項目説明はできるだけ具体的に記載してください。</li>
          <li>現場の状況は詳細に記録するほどAIの精度が向上します。</li>
          <li>音声入力は自然な文章で話すことをおすすめします。</li>
          <li>AIによる結果は必ず確認してください。</li>
          <li>写真は鮮明に撮影するとより良い結果が得られます。</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基本的な利用の流れ</h2>

        <div className="rounded-lg border p-6 text-center space-y-2">
          <p>テンプレートを作成</p>
          <p>↓</p>
          <p>プロジェクトを開く</p>
          <p>↓</p>
          <p>報告書を作成</p>
          <p>↓</p>
          <p>音声入力・写真追加</p>
          <p>↓</p>
          <p>AI結果を確認</p>
          <p>↓</p>
          <p>保存</p>
          <p>↓</p>
          <p>PDF・Excelダウンロード</p>
        </div>
      </section>
    </div>
  );
}
