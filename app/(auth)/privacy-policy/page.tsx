import { Logo } from "@/app/ui/Icons";
import { buttonColor } from "@/lib/constants";
import { FC } from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex justify-center mt-8">
          <Logo />
        </div>

        <h1 className="text-3xl font-bold mb-8 mt-12">
          プライバシーポリシー
        </h1>

        <p className="mb-6 leading-relaxed">
          Okapi, LLC（以下「当社」といいます。）は、当社が提供する
          「Kenchiku AI」（以下「本サービス」といいます。）における、
          利用者および本サービスを利用する法人・事業者（以下「利用企業」といいます。）
          から取得する個人情報その他の情報について、以下のとおり取り扱います。
        </p>

        <Section title="1. 取得する情報">
          <p className="mb-4 leading-relaxed">
            当社は、本サービスの提供にあたり、以下の情報を取得する場合があります。
          </p>

          <h3 className="font-semibold mb-2">アカウント情報</h3>
          <ul className="list-disc pl-6 space-y-2 mb-5">
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>電話番号</li>
            <li>ログインおよび認証に関する情報</li>
            <li>所属する会社その他の組織に関する情報</li>
          </ul>

          <h3 className="font-semibold mb-2">会社・業務に関する情報</h3>
          <p className="mb-2 leading-relaxed">
            利用企業が本サービスに登録、入力またはアップロードする情報には、
            以下の情報が含まれる場合があります。
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-5">
            <li>会社情報</li>
            <li>従業員情報</li>
            <li>取引先、顧客および協力会社に関する情報</li>
            <li>案件・プロジェクトに関する情報</li>
            <li>作業員の氏名、所属、資格その他の業務上の情報</li>
            <li>
              本サービス上で利用企業が自由に作成・登録する項目、属性、
              関係情報等（「会社グラフ」を含みます。）
            </li>
            <li>帳票、報告書、その他の文書およびこれらに含まれる情報</li>
          </ul>

          <h3 className="font-semibold mb-2">音声・画像・テキスト等</h3>
          <ul className="list-disc pl-6 space-y-2 mb-5">
            <li>ユーザーが入力またはアップロードした音声データ</li>
            <li>音声データから生成された文字起こし結果</li>
            <li>ユーザーがアップロードまたは撮影した画像および画像に含まれる情報</li>
            <li>ユーザーが入力またはアップロードしたテキスト</li>
            <li>ユーザーがアップロードした帳票その他のファイル</li>
            <li>本サービスにより生成された文章、帳票、画像その他のデータ</li>
          </ul>

          <h3 className="font-semibold mb-2">利用状況・技術情報</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>端末の種類、OS、ブラウザ等の情報</li>
            <li>IPアドレス</li>
            <li>本サービスの利用履歴および操作履歴</li>
            <li>アクセス日時</li>
            <li>エラー、障害およびセキュリティに関するログ情報</li>
          </ul>

          <p className="mt-5 leading-relaxed">
            利用企業が本サービスに入力またはアップロードする情報には、
            利用企業の従業員、顧客、取引先、協力会社その他の第三者に関する
            個人情報が含まれる場合があります。
          </p>
        </Section>

        <Section title="2. 利用目的">
          <p className="mb-4 leading-relaxed">
            当社は、取得した情報を、以下の目的のために利用します。
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>本サービスの提供、運営および維持</li>
            <li>利用者の認証、アカウント管理および利用企業の管理</li>
            <li>
              会社情報、従業員情報、案件情報その他の情報を管理・整理するための
              「会社グラフ」機能の提供
            </li>
            <li>
              利用企業が登録した情報を利用した帳票、報告書その他の文書の
              作成・入力支援
            </li>
            <li>音声データの文字起こし、テキストの整理および要約</li>
            <li>画像の内容の解析および説明文等の生成</li>
            <li>
              AIを利用した情報の抽出、整理、変換および業務支援機能の提供
            </li>
            <li>利用企業からの問い合わせ、サポートおよび連絡への対応</li>
            <li>本サービスの改善、品質向上および新機能の開発</li>
            <li>
              不正利用、セキュリティ上の脅威その他の不正行為の検知、
              防止および対応
            </li>
            <li>本サービスの利用状況の分析および障害・不具合の調査</li>
            <li>法令、規則、行政機関等からの要請への対応</li>
            <li>上記に付随または関連する目的</li>
          </ol>
        </Section>

        <Section title="3. AIおよび外部サービスの利用">
          <p className="mb-4 leading-relaxed">
            本サービスでは、音声の文字起こし、画像の解析、文章の生成、
            帳票への情報入力その他のAI機能を提供するため、第三者が提供する
            AIサービスその他の外部サービスを利用する場合があります。
          </p>

          <p className="mb-4 leading-relaxed">
            当社は、本サービスの機能提供に必要な範囲で、利用者または利用企業が
            入力・アップロードした情報をこれらのサービスに送信する場合があります。
          </p>

          <p className="mb-2 leading-relaxed">
            現在、本サービスではOpenAIが提供するAIサービスを利用しています。
            送信される情報には、利用する機能に応じて、以下が含まれる場合があります。
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-5">
            <li>音声から生成された文字起こし結果</li>
            <li>ユーザーが入力したテキスト</li>
            <li>ユーザーがアップロードまたは撮影した画像</li>
            <li>ユーザーがアップロードした帳票その他の文書</li>
            <li>会社グラフに登録された会社情報、従業員情報その他の情報</li>
            <li>AIによる処理に必要なその他の情報</li>
          </ul>

          <p className="mb-4 leading-relaxed">
            これらの情報は、本サービスにおける文字起こし、画像解析、
            情報抽出、情報整理、文章生成、帳票作成その他のAI機能を提供するために
            必要な範囲で利用されます。
          </p>

          <p className="mb-4 leading-relaxed">
            当社がOpenAIのAPIサービスを利用して送信するデータについては、
            OpenAIとの契約およびOpenAIが定める事業者向けサービスの利用条件に
            従って取り扱われます。
          </p>

          <p className="leading-relaxed">
            AIによる生成結果には誤りが含まれる場合があります。
            利用企業は、生成された情報を業務上利用する前に、その内容を確認するものとします。
          </p>
        </Section>

        <Section title="4. 情報の保存および安全管理">
          <p className="mb-4 leading-relaxed">
            当社は、個人情報およびその他の利用者情報について、漏えい、滅失または
            毀損その他のリスクを考慮し、必要かつ適切な安全管理措置を講じます。
          </p>

          <p className="mb-2 leading-relaxed">
            当社が講じる安全管理措置には、以下のようなものが含まれます。
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-5">
            <li>不正アクセスを防止するためのアクセス制御</li>
            <li>通信および保存データの適切な保護</li>
            <li>利用者および当社管理者の権限管理</li>
            <li>個人情報へのアクセスの適切な管理</li>
            <li>システムおよびサービスの監視・ログ管理</li>
            <li>バックアップおよび障害対策</li>
            <li>従業者および委託先に対する必要な管理・監督</li>
            <li>
              取り扱う情報の性質および量等に応じたその他の必要な安全管理措置
            </li>
          </ul>

          <p className="mb-4 leading-relaxed">
            本サービスにおいて、会社グラフその他の構造化された情報は、
            データベースに保存されます。
            ユーザーが撮影またはアップロードした画像および帳票等のファイルは、
            クラウドストレージに保存される場合があります。
          </p>

          <p className="mb-4 leading-relaxed">
            当社は、利用目的の達成に必要な期間その他合理的な期間を考慮して情報を
            保存し、保存する必要がなくなった情報については、適切な方法により
            削除または廃棄します。
          </p>

          <p className="leading-relaxed">
            本サービスの主要なアプリケーションおよびデータ保存基盤には、
            日本国内（東京）のクラウドインフラストラクチャを利用しています。
            ただし、本サービスの提供に必要な外部サービスについては、
            当該サービス提供者のデータ処理環境において情報が取り扱われる場合があります。
          </p>
        </Section>

        <Section title="5. 第三者提供および業務委託">
          <h3 className="font-semibold mb-2">5-1. 第三者提供</h3>

          <p className="mb-4 leading-relaxed">
            当社は、法令により認められる場合を除き、あらかじめ本人の同意を得ることなく、
            個人データを第三者に提供しません。
          </p>

          <p className="mb-5 leading-relaxed">
            ただし、法令に基づく場合、人の生命、身体または財産の保護のために
            必要がある場合その他個人情報保護法その他の法令により認められる場合には、
            この限りではありません。
          </p>

          <h3 className="font-semibold mb-2">5-2. 業務委託</h3>

          <p className="mb-4 leading-relaxed">
            当社は、本サービスの提供、運営、保守、AI処理、クラウド環境の提供、
            決済その他の業務に必要な範囲で、個人情報の取扱いを第三者に委託する場合があります。
          </p>

          <p className="mb-5 leading-relaxed">
            この場合、当社は、委託先の選定、契約その他必要な方法により、
            委託先に対して必要かつ適切な監督を行います。
          </p>

          <h3 className="font-semibold mb-2">5-3. 外国に所在する事業者の利用</h3>

          <p className="mb-4 leading-relaxed">
            当社は、本サービスの提供に必要な範囲で、外国に所在する事業者が提供する
            AIサービス、クラウドサービスその他の外部サービスを利用する場合があります。
          </p>

          <p className="mb-4 leading-relaxed">
            外国に所在する事業者に個人データの取扱いを委託する場合、
            個人情報保護法その他の適用法令に従い、必要かつ適切な安全管理措置、
            委託先の監督その他必要な措置を講じます。
          </p>

          <p className="leading-relaxed">
            外国に所在する第三者への個人データの提供について本人の同意その他の
            法令上の手続が必要となる場合には、適用法令に従って対応します。
          </p>
        </Section>

        <Section title="6. 利用企業が登録する情報について">
          <p className="mb-4 leading-relaxed">
            利用企業が本サービスに登録、入力またはアップロードする情報には、
            利用企業の従業員、顧客、取引先、協力会社その他の第三者に関する
            個人情報が含まれる場合があります。
          </p>

          <p className="mb-4 leading-relaxed">
            利用企業は、当該情報を本サービスに登録、入力またはアップロードするために
            必要な権限を有すること、および適用される法令に従って当該情報を取り扱うことに
            ついて責任を負うものとします。
          </p>

          <p className="mb-4 leading-relaxed">
            当社は、利用企業から委託を受けた範囲で、利用企業が登録した情報を
            本サービスの提供、保存、処理およびAIを利用した業務支援のために取り扱います。
          </p>

          <p className="leading-relaxed">
            利用企業は、本サービスに個人番号（マイナンバー）その他、
            本サービスの利用に必要のない情報を登録またはアップロードしないものとします。
          </p>
        </Section>

        <Section title="7. 本人からの請求等">
          <p className="mb-4 leading-relaxed">
            当社が保有する保有個人データについて、本人から、個人情報保護法その他の
            適用法令に基づく開示、訂正、追加、削除、利用停止、消去その他の請求を
            受けた場合、当社は、適用法令に従い、適切に対応します。
          </p>

          <p className="leading-relaxed">
            請求またはお問い合わせをご希望の場合は、下記のお問い合わせ先までご連絡ください。
          </p>

          <p className="mt-4 leading-relaxed">
            なお、利用企業を通じて取得または管理されている個人情報について、
            当社が利用企業から委託を受けて取り扱っている場合があります。
            この場合、当該情報に関する請求等について、利用企業へのご連絡を
            お願いする場合があります。
          </p>
        </Section>

        <Section title="8. 個人情報の漏えい等への対応">
          <p className="leading-relaxed">
            当社は、個人情報の漏えい、滅失、毀損その他の個人情報の安全管理に
            関する事故が発生した場合、またはそのおそれを認識した場合には、
            事実関係を確認し、被害の拡大防止、原因の調査、再発防止その他必要な
            対応を行います。
          </p>

          <p className="mt-4 leading-relaxed">
            法令上、個人情報保護委員会への報告または本人への通知等が必要となる場合には、
            適用法令に従って対応します。
          </p>
        </Section>

        <Section title="9. 未成年者について">
          <p className="leading-relaxed">
            本サービスは主として法人および事業者向けのサービスです。
            未成年者が本サービスを利用する場合は、法令に従い、必要に応じて
            親権者その他の法定代理人の同意を得た上で利用するものとします。
          </p>
        </Section>

        <Section title="10. プライバシーポリシーの変更">
          <p className="leading-relaxed">
            当社は、法令の改正、本サービスの変更その他必要に応じて、
            本プライバシーポリシーを変更することがあります。
            変更後の内容は、本サービスまたは当社ウェブサイト上で通知または
            公表します。
          </p>
        </Section>

        <Section title="11. お問い合わせ先">
          <p className="leading-relaxed">
            Okapi, LLC
            <br />
            メールアドレス：
            <a
              href="mailto:support@kenchiku.ai"
              className="underline ml-1"
              style={{ color: buttonColor }}
            >
              support@kenchiku.ai
            </a>
          </p>
        </Section>

        <Section title="12. 法令遵守">
          <p className="leading-relaxed">
            当社は、個人情報の取扱いについて、日本の個人情報の保護に関する法律
            およびその他の関連法令を遵守します。
          </p>
        </Section>

        <footer className="text-sm text-gray-500 mt-12">
          最終更新日：2026年9月
        </footer>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
};

export default PrivacyPolicy;