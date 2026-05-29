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

        <h1 className="text-3xl font-bold mb-8 mt-12">プライバシーポリシー</h1>

        <p className="mb-6 leading-relaxed">
          本プライバシーポリシーは、<strong>Okapi, LLC（以下「当社」）</strong>
          が提供するモバイルアプリ（以下「本アプリ」）におけるユーザー情報の取扱いについて説明するものです。
        </p>

        <Section title="1. 取得する情報">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>音声データ：</strong>
              ユーザーが入力した音声（現場記録、メモ等）
            </li>
            <li>
              <strong>テキストデータ：</strong>
              音声から変換された文字情報（文字起こし結果）
            </li>
            <li>
              <strong>画像データ：</strong>
              ユーザーがアップロードした写真およびそれに付随する情報
            </li>
            <li>
              <strong>自動生成データ：</strong>
              AIにより生成された文章（キャプション、レポート案など）
            </li>
            <li>
              <strong>デバイス情報：</strong>端末種類、OSバージョン等
            </li>
          </ul>
        </Section>

        <Section title="2. 利用目的">
          <ul className="list-disc pl-6 space-y-2">
            <li>音声の文字起こし機能の提供</li>
            <li>画像に対する説明文（キャプション）の生成</li>
            <li>作業記録・報告書作成支援機能の提供</li>
            <li>サービスの改善および品質向上</li>
            <li>不正利用の防止</li>
          </ul>
        </Section>

        <Section title="3. AIおよび外部サービス（OpenAI）の利用">
          <p className="mb-4">
            本アプリでは、機能提供のためにOpenAIのAIサービスを利用します。
          </p>

          <p className="mb-2">以下の情報がOpenAIに送信されることがあります：</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>音声から変換されたテキストデータ（文字起こし結果）</li>
            <li>ユーザーがアップロードした画像データ</li>
          </ul>

          <p className="mt-4">
            これらの情報は、以下の目的のためにのみ利用されます：
            <br />
            ・文字起こし結果の整形および報告書作成支援
            <br />
            ・画像内容の説明生成および報告書への反映
          </p>

          <p className="mt-4">
            OpenAIは、これらのデータを本アプリの機能提供以外の目的（広告・マーケティング等）に使用しません。
          </p>
        </Section>

        <Section title="4. 情報の保存および管理">
          <ul className="list-disc pl-6 space-y-2">
            <li>ユーザー情報は、安全な方法で管理されます。</li>
            <li>必要な期間に限り保存し、その後は適切に削除します。</li>
            <li>
              不正アクセス、漏洩、改ざん等を防止するための合理的な安全対策を講じます。
            </li>
          </ul>
        </Section>

        <Section title="5. 第三者提供">
          <p className="mb-4">
            当社は、以下の場合を除き、ユーザー情報を第三者に提供しません。
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>サービス提供に必要な範囲で業務委託先に提供する場合</li>
          </ul>
        </Section>

        <Section title="6. ユーザーの権利">
          <p>
            ユーザーは、自身の情報について開示、訂正、削除を請求することができます。
            ご希望の場合は、下記お問い合わせ先までご連絡ください。
          </p>
        </Section>

        <Section title="7. 未成年の利用について">
          <p>
            未成年者が本アプリを利用する場合は、保護者の同意を得た上で利用するものとします。
          </p>
        </Section>

        <Section title="8. プライバシーポリシーの変更">
          <p>
            当社は、必要に応じて本ポリシーを変更することがあります。
            変更後の内容は、本アプリまたは当社ウェブサイト上で通知します。
          </p>
        </Section>

        <Section title="9. お問い合わせ先">
          <p>
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

        <Section title="10. 法令遵守">
          <p>
            当社は、個人情報の取扱いについて、日本の個人情報保護法および関連法令を遵守します。
          </p>
        </Section>

        <footer className="text-sm text-gray-500 mt-12">
          最終更新日：2026年5月
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
