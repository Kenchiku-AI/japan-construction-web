import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { Logo } from "../ui/Icons";

// ── Export this from your page.tsx (or wherever you mount this component) ──
export const metadata: Metadata = {
  title: "Kenchiku AI｜建設業向けAI報告書プラットフォーム",
  description:
    "Kenchiku AIは、建設現場の報告業務をAIで効率化するクラウドプラットフォームです。音声入力・写真管理・LINE連携・PDF/Excelエクスポートに対応。現場とオフィスをつなぐ次世代の施工管理ツール。",
  keywords: [
    "建設業", "報告書", "AI", "施工管理", "現場管理", "クラウド",
    "LINE連携", "音声入力", "PDF出力", "Excel出力", "construction management Japan",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kenchiku.ai/" },
  openGraph: {
    type: "website",
    url: "https://kenchiku.ai/",
    title: "Kenchiku AI｜建設業向けAI報告書プラットフォーム",
    description:
      "建設現場の報告業務をAIで自動化。音声・写真・LINEから報告書を生成し、PDF・Excelで出力。チーム全体の生産性を向上させるクラウドツール。",
    images: [{ url: "https://kenchiku.ai/og-image.png", width: 1200, height: 630 }],
    locale: "ja_JP",
    siteName: "Kenchiku AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenchiku AI｜建設業向けAI報告書プラットフォーム",
    description: "建設現場の報告業務をAIで自動化。音声・写真・LINEから報告書を生成。",
    images: ["https://kenchiku.ai/og-image.png"],
  },
};

const structuredDataApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kenchiku AI",
  url: "https://kenchiku.ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "建設業向けAI報告書プラットフォーム。現場での音声入力・写真管理・LINE連携に対応し、PDF・Excelエクスポートが可能なクラウドSaaS。",
  offers: {
    "@type": "Offer",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@type": "Organization", name: "Kenchiku AI", url: "https://kenchiku.ai" },
  inLanguage: "ja",
};

const structuredDataOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kenchiku AI",
  url: "https://kenchiku.ai",
  logo: "https://kenchiku.ai/icon.svg",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["Japanese", "English"],
  },
};

// ── Placeholder (swap for next/image when you have real screenshots) ─────────
function ScreenshotPlaceholder({
  aspectRatio = "16/9",
  label,
  borderRadius = 16,
}: {
  aspectRatio?: string;
  label: string;
  borderRadius?: number;
}) {
  return (
    <div
      className={styles.screenshotPlaceholder}
      style={{ aspectRatio, borderRadius }}
      role="img"
      aria-label={label}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <span>Screenshot placeholder<br />（ここに差し替えてください）</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      {/* Structured data */}
      <Script
        id="structured-data-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataApp) }}
      />
      <Script
        id="structured-data-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataOrg) }}
      />

      {/* ── Nav ── */}
      <nav className={styles.nav} aria-label="メインナビゲーション">
        <Link href="/" className={styles.navLogo} aria-label="Kenchiku AI ホームへ">
          <Logo size={36} />
          <span className={styles.navLogoText}>Kenchiku AI</span>
        </Link>
        <div className={styles.navActions}>
          <Link href="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
            ログイン
          </Link>
          <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
            無料で始める
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className={styles.hero} role="banner">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroLogo}>
            <Logo />
          </div>
          <p className={styles.heroEyebrow}>建設業向け AI プラットフォーム</p>
          <h1 className={styles.heroHeadline}>
            現場の声を、<br />
            <span className={styles.heroHeadlineAccent}>報告書</span>に変える。
          </h1>
          <p className={styles.heroSubJp}>Construction Report Automation</p>
          <p className={styles.heroDescription}>
            Kenchiku AIは、音声入力・写真・LINEメッセージからAIが情報を整理し、統一された報告書を自動生成するクラウドプラットフォームです。現場とオフィスをリアルタイムでつなぎます。
          </p>
          <div className={styles.heroCta}>
            <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
              無料アカウントを作成
            </Link>
            <Link href="/docs" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLg}`}>
              ドキュメントを見る
            </Link>
          </div>
        </div>
        <div className={styles.heroScrollHint} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          scroll
        </div>
      </header>

      {/* ── Hero screenshot ── */}
      <div className={styles.screenshotWrap} aria-hidden="true">
        <ScreenshotPlaceholder label="Kenchiku AIウェブアプリのスクリーンショット" />
      </div>

      {/* ── Features ── */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>機能</p>
          <h2 className={styles.sectionTitle}>現場で必要なものが、すべて揃っています</h2>
          <p className={styles.sectionSub}>Features designed for Japanese construction workflows</p>
          <p className={styles.sectionLead}>
            施工管理の現場で本当に必要な機能だけを、使いやすい形で提供します。複雑な設定なしに、すぐに使い始めることができます。
          </p>
          <div className={styles.featuresGrid}>
            {[
              {
                icon: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" /></>,
                sub: "音声入力 / Voice Input",
                title: "話すだけで記録完了",
                desc: "現場で手が離せないときでも、音声で情報を入力できます。AIが自動で内容を整理し、適切なフィールドに振り分けます。",
              },
              {
                icon: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
                sub: "写真管理 / Photo Management",
                title: "写真・タグで現場を記録",
                desc: "現場写真をモバイルアプリで撮影し、タグを付けて整理。報告書に自動的に紐付けられ、PDF・Excelにも出力されます。",
              },
              {
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
                sub: "LINE連携 / LINE Integration",
                title: "LINEから報告書を作成",
                desc: "LINEのDMやグループで送信したメッセージをAIが解析し、自動で報告書に反映。現場担当者が使い慣れたLINEを活かせます。",
              },
              {
                icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
                sub: "エクスポート / Export",
                title: "PDF・Excelで即出力",
                desc: "完成した報告書はワンクリックでPDFまたはExcel形式にエクスポート。発注者や協力会社への提出もスムーズです。",
              },
              {
                icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
                sub: "テンプレート / Templates",
                title: "自社フォーマットに対応",
                desc: "報告書のテンプレートを自由に設計できます。日常点検・安全管理・品質検査など、用途に合わせたフォームを作成可能です。",
              },
              {
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
                sub: "ゲストアクセス / Guest Access",
                title: "協力会社・発注者と共有",
                desc: "社外のゲストを特定プロジェクトに招待できます。権限を限定した安全な情報共有で、関係者全員が最新情報にアクセスできます。",
              },
            ].map((f) => (
              <article key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {f.icon}
                  </svg>
                </div>
                <p className={styles.featureSub}>{f.sub}</p>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>利用の流れ</p>
          <h2 className={styles.sectionTitle}>シンプルな5ステップで報告書が完成</h2>
          <p className={styles.sectionSub}>From field to finished report in minutes</p>
          <p className={styles.sectionLead}>
            テンプレートを一度作成すれば、現場担当者はすぐに報告書の作成を開始できます。
          </p>
          <div className={styles.steps} role="list">
            {[
              { title: "テンプレートを作成", desc: "管理者がWebアプリでフォームを設計します。" },
              { title: "現場で情報を収集", desc: "音声・写真・LINE・直接入力で記録。" },
              { title: "AIが自動整理", desc: "入力内容をAIが解析し各項目に反映。" },
              { title: "内容を確認・保存", desc: "必要があれば修正してそのまま保存。" },
              { title: "PDF・Excelで出力", desc: "提出用ファイルをワンクリックで生成。" },
            ].map((s, i) => (
              <div key={s.title} className={styles.step} role="listitem">
                <div className={styles.stepNum} aria-hidden="true">{i + 1}</div>
                <div>
                  <p className={styles.stepTitle}>{s.title}</p>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Web + Mobile ── */}
      <section id="apps" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Webアプリ &amp; モバイルアプリ</p>
          <h2 className={styles.sectionTitle}>オフィスでも現場でも使えるツール</h2>
          <p className={styles.sectionSub}>Seamless across web and mobile</p>
          <p className={styles.sectionLead}>
            Webアプリは管理・確認に、モバイルアプリは現場での入力に。両方がリアルタイムで同期します。
          </p>
          <div className={styles.twoCol}>
            <div className={styles.appCard}>
              <p className={styles.appCardLabel}>Web Application</p>
              <h3 className={styles.appCardTitle}>Webアプリ</h3>
              <p className={styles.appCardIntro}>オフィス・事務所での管理業務に</p>
              <ul className={styles.appCardList}>
                {["テンプレートの作成・管理", "プロジェクトとユーザーの管理", "提出済み報告書の閲覧", "PDF・Excelダウンロード", "ゲスト招待・権限管理", "LINE連携の設定"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.appScreenshotWrap} aria-hidden="true">
                <ScreenshotPlaceholder aspectRatio="4/3" label="Webアプリのスクリーンショット" borderRadius={10} />
              </div>
            </div>

            <div className={styles.appCard}>
              <p className={styles.appCardLabel}>Mobile Application (iOS / Android)</p>
              <h3 className={styles.appCardTitle}>モバイルアプリ</h3>
              <p className={styles.appCardIntro}>現場での情報収集に</p>
              <ul className={styles.appCardList}>
                {["報告書の新規作成・編集", "音声入力による記録", "写真の撮影・アップロード", "AIによる内容自動整理", "現場からのリアルタイム更新"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.mobileScreenshotWrap} aria-hidden="true">
                <div className={styles.mobilePlaceholder}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                  <span>Mobile screenshot<br />（ここに差し替え）</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LINE ── */}
      <section id="line" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>LINE連携</p>
          <h2 className={styles.sectionTitle}>使い慣れたLINEが、そのまま現場ツールに</h2>
          <p className={styles.sectionSub}>LINE Messaging API integration for field teams</p>
          <p className={styles.sectionLead}>
            現場担当者がわざわざアプリを覚え直す必要はありません。日常的に使っているLINEから報告書を作成できます。
          </p>
          <div className={styles.lineBanner} role="region" aria-label="LINE連携の説明">
            <div className={styles.lineBannerIcon} aria-hidden="true">L</div>
            <div className={styles.lineBannerBody}>
              <h3>LINEのメッセージが、そのまま報告書の項目になる</h3>
              <p>
                LINEのダイレクトメッセージやグループチャットで送ったテキストを、AIがリアルタイムで解析。「天候：晴れ、作業員：12名、進捗：基礎工事完了」のような自然なメッセージが、自動的に報告書の各フィールドに入力されます。QRコードやリンクコードで現場グループとプロジェクトを紐付けるだけで、設定は完了です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section id="roles" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>対象ユーザー</p>
          <h2 className={styles.sectionTitle}>建設現場のすべての関係者へ</h2>
          <p className={styles.sectionSub}>Designed for every role on the job site</p>
          <p className={styles.sectionLead}>
            Kenchiku AIは、施工管理者から協力会社まで、プロジェクトに関わるすべての立場の方が使えるよう設計されています。
          </p>
          <div className={styles.rolesGrid}>
            {[
              { title: "施工管理者・現場監督", sub: "Field Supervisors", items: ["音声・写真でその場で記録", "LINEからの簡単入力", "リアルタイムで提出"] },
              { title: "管理者・PM", sub: "Project Managers", items: ["テンプレート設計・管理", "全報告書の一元管理", "ユーザー・権限の管理"] },
              { title: "協力会社", sub: "Subcontractors", items: ["ゲストとして招待を受ける", "担当プロジェクトへアクセス", "進捗・状況をリアルタイム共有"] },
              { title: "発注者・検査担当者", sub: "Clients & Inspectors", items: ["報告書の閲覧・確認", "写真・記録へのアクセス", "PDFでの公式書類受領"] },
            ].map((r) => (
              <div key={r.title} className={styles.roleCard}>
                <h3 className={styles.roleCardTitle}>{r.title}</h3>
                <p className={styles.roleCardSub}>{r.sub}</p>
                <ul className={styles.roleCardList}>
                  {r.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section id="signup" className={`${styles.section} ${styles.ctaBand}`}>
        <div className={styles.sectionInner}>
          <p className={`${styles.sectionEyebrow} ${styles.centered}`}>今すぐ始める</p>
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>現場の報告業務を、今日から変えよう</h2>
          <p className={`${styles.ctaBandLead} ${styles.centered}`}>
            無料でアカウントを作成して、Kenchiku AIをお試しください。<br />
            管理者が招待リンクを発行するだけで、チーム全員がすぐに使えます。
          </p>
          <div className={`${styles.btnGroup} ${styles.centered}`}>
            <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
              無料アカウントを作成
            </Link>
            <Link href="/login" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLg}`}>
              既存アカウントでログイン
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <Link href="/" className={styles.footerBrand} aria-label="Kenchiku AI トップへ">
            <Logo size={22} />
            Kenchiku AI
          </Link>
          <nav className={styles.footerLinks} aria-label="フッターナビゲーション">
            <Link href="/docs">ドキュメント</Link>
            <Link href="/docs/quick-start">クイックスタート</Link>
            <Link href="/login">ログイン</Link>
            <Link href="/signup">新規登録</Link>
          </nav>
          <p className={styles.footerCopy}>© 2025 Kenchiku AI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
