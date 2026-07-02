"use client";

import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { LineLogo, Logo } from "../ui/Icons";
import SignupModal from "./signup/SignupModal";
import { Loader } from "../ui/Loader";
import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";

// ── Move this metadata export to your layout.tsx or a separate metadata.ts ──
// export const metadata: Metadata = { ... }

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

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signupCompany } = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <Script id="structured-data-app" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataApp) }} />
      <Script id="structured-data-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataOrg) }} />

      {/* ── Nav ── */}
      <nav className={styles.nav} aria-label="メインナビゲーション">
        <Link href="/" className={styles.navLogo} aria-label="Kenchiku AI ホームへ">
          <Logo size={36} />
          <span className={styles.navLogoText}>Kenchiku AI</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="#features" className={styles.navLink}>機能</Link>
          <Link href="#how-it-works" className={styles.navLink}>ご利用の流れ</Link>
          <Link href="#apps" className={styles.navLink}>アプリ</Link>
          <Link href="#line" className={styles.navLink}>LINE連携</Link>
          <Link href="#roles" className={styles.navLink}>利用対象</Link>
          <Link href="/docs" className={styles.navLink}>ドキュメント</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.navLoginLink}>ログイン</Link>
          <div onClick={() => {
            setShowSignup(true);
          }} className={`${styles.btn} ${styles.btnPrimary}`}>
            無料で試してみる →
          </div>
          {/* Hamburger — mobile only */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="ナビゲーションメニュー">
          <Link href="#features" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>機能</Link>
          <Link href="#how-it-works" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>ご利用の流れ</Link>
          <Link href="#apps" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>アプリ</Link>
          <Link href="#line" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>LINE連携</Link>
          <Link href="#roles" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>利用対象</Link>
          <Link href="/docs" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>ドキュメント</Link>
          <div className={styles.mobileMenuDivider} />
          <Link href="/login" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>ログイン</Link>
          <div onClick={() => {
            setShowSignup(true);
          }} className={`${styles.btn} ${styles.btnPrimary}`}>
            無料で試してみる →
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <header className={styles.hero} role="banner">

        {/* Background photo — replace src with your actual construction site photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className={styles.heroBg}
        />

        {/* Overlay so text is readable over the photo */}
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          {/* ── Left column: text ── */}
          <div className={styles.heroLeft}>
            <span className={styles.heroBadge}>建設現場の報告業務を、AIで自動化</span>

            <h1 className={styles.heroHeadline}>
              音声と写真だけで<br />
              現場レポートを<br />
              <span className={styles.heroHeadlineAccent}>AIが自動生成。</span>
            </h1>

            <p className={styles.heroDescription}>
              現場での写真撮影や音声メモだけで、日報・作業報告書・<br />
              安全管理記録などをAIが自動で作成。<br />
              手間を削減し、ミスを防ぎ、もっと「建設」に集中できる時間へ。
            </p>

            <div className={styles.heroCta}>
              <div onClick={() => {
                setShowSignup(true);
              }} className={`${styles.btn} ${styles.btnPrimary}`}>
                無料で試してみる →
              </div>
              {/* <Link href="/docs" className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                3分でわかる Kenchiku AI
              </Link> */}
            </div>
          </div>

          {/* ── Right column: app mockup + callout cards ── */}
          <div className={styles.heroRight}>

            {/* Feature callout cards — top right */}
            <div className={styles.heroCallouts}>
              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div>
                  <p className={styles.calloutTitle}>写真を撮るだけ</p>
                  <p className={styles.calloutDesc}>現場の写真を撮影するだけで<br />AIが内容を解析します</p>
                </div>
              </div>
              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
                  </svg>
                </div>
                <div>
                  <p className={styles.calloutTitle}>話すだけで記録</p>
                  <p className={styles.calloutDesc}>音声で状況をメモすれば<br />文字起こし&amp;要約します</p>
                </div>
              </div>
              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8" />
                  </svg>
                </div>
                <div>
                  <p className={styles.calloutTitle}>AIがレポートを自動生成</p>
                  <p className={styles.calloutDesc}>必要な項目を整理し<br />見やすいレポートを自動作成</p>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className={styles.phoneMockup}>
              <Image
                src="/mobile-screenshot-1.png"
                alt="Kenchiku AIモバイルアプリの画面"
                width={220}
                height={476}
                priority
                style={{ borderRadius: 40, width: "100%", height: "auto" }}
              />
            </div>

          </div>
        </div>

        {/* Stats bar */}
        <div className={styles.heroStats} role="list">
          {[
            { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, label: "作業時間を", value: "最大 70% 削減" },
            { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8" /></>, label: "転記ミス・", value: "報告漏れを防止" },
            { icon: <><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></>, label: "クラウドで", value: "どこでも共有" },
            { icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>, label: "万全の", value: "セキュリティ" },
          ].map((s) => (
            <div key={s.value} className={styles.statItem} role="listitem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statIcon} aria-hidden="true">
                {s.icon}
              </svg>
              <div>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statValue}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

      </header>

      {/* ── Features ── */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>機能</p>
          <h2 className={styles.sectionTitle}>現場報告業務を、AIで圧倒的に効率化</h2>
          <p className={styles.sectionLead}>
            写真を撮る。話す。あとはAIに任せる。
          </p>
          <div className={styles.featuresGrid}>
            {[
              {
                icon: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" /></>,
                // sub: "音声入力 / Voice Input",
                title: "話すだけで記録完了",
                desc: "現場で手が離せないときでも、音声で情報を入力できます。AIが自動で内容を整理し、適切なフィールドに振り分けます。",
              },
              {
                icon: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
                // sub: "写真管理 / Photo Management",
                title: "写真解析",
                desc: (
                  <>
                    現場写真をアップロードすると、AIが工事内容や進捗状況を自動解析。
                    <ul>
                      <li>配筋</li>
                      <li>型枠</li>
                      <li>コンクリート打設</li>
                      <li>内装工事</li>
                      <li>外構工事</li>
                    </ul>
                    などを自動判別。
                  </>
                ),
              },
              {
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
                // sub: "LINE連携 / LINE Integration",
                title: "LINE連携",
                desc: (
                  <>
                    LINEからそのまま報告。現場スタッフは新しいアプリを覚える必要なし。
                    <div className="mt-3">
                      LINEで
                    </div>
                    <ul>
                      <li>写真送信</li>
                      <li>音声送信</li>
                    </ul>
                    するだけでAIがレポート生成。
                  </>
                )
              },
              {
                icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
                // sub: "エクスポート / Export",
                title: "AIレポート生成",
                desc: (
                  <>
                    日報・週報・報告書を自動作成
                    <ul>
                      <li>工事日報</li>
                      <li>安全報告書</li>
                      <li>作業報告書</li>
                      <li>写真台帳</li>
                    </ul>
                    を数秒で作成。Excel・PDF形式で簡単に出力できます。
                  </>
                ),
              },
              {
                icon: <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /><circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" /><circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" /><circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" /></>,
                // sub: "テンプレート / Templates",
                title: "柔軟なカスタマイズ",
                desc: (
                  <>
                    建設会社ごとに業務や運用は異なります。
                    <div className="mt-3">
                      Kenchiku AIでは
                    </div>
                    <ul>
                      <li>独自帳票</li>
                      <li>承認フロー</li>
                      <li>社内システム連携</li>
                      <li>API連携</li>
                    </ul>

                    など、御社の業務に合わせたカスタマイズや開発にも対応しています。
                  </>
                )
              },
              {
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
                // sub: "ゲストアクセス / Guest Access",
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
                {/* <p className={styles.featureSub}>{f.sub}</p> */}
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <div className={styles.featureDesc}>{f.desc}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>ご利用の流れ</p>
          <h2 className={styles.sectionTitle}>たった5ステップで報告書を作成</h2>
          <p className={styles.sectionLead}>
            テンプレートを一度作るだけ。現場担当者はすぐに報告書を作成できます。
          </p>
          <div className={styles.steps} role="list">
            {[
              { title: "テンプレートを作成", desc: "管理者が入力フォームを作成します。" },
              { title: "現場で情報を収集", desc: "音声・写真・LINE・手入力で記録。" },
              { title: "AIが自動整理", desc: "AIが入力内容を整理し、各項目へ自動入力。" },
              { title: "内容を確認・保存", desc: "必要に応じて修正し、そのまま保存。" },
              { title: "PDF・Excelで出力", desc: "提出用のPDF・Excelをワンクリックで出力。" },
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
          <p className={styles.sectionEyebrow}>アプリ</p>
          <h2 className={styles.sectionTitle}>オフィスでも現場でも使えるツール</h2>
          <p className={styles.sectionLead}>
            Webアプリは管理・確認に、モバイルアプリは現場での入力に。両方がリアルタイムで同期します。
          </p>
          <div className={styles.twoCol}>
            <div className={styles.appCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statIcon} aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
              </svg>
              {/* <p className={styles.appCardLabel}>Web Application</p> */}
              <h3 className={styles.appCardTitle}>Webアプリ</h3>
              <p className={styles.appCardIntro}>オフィス・事務所での管理業務に</p>
              <ul className={styles.appCardList}>
                {["テンプレートの作成・管理", "プロジェクトとユーザーの管理", "提出済み報告書の閲覧", "PDF・Excelダウンロード", "ゲスト招待・権限管理", "LINE連携の設定"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.appScreenshotWrap}>
                {/* <ScreenshotPlaceholder aspectRatio="4/3" label="Webアプリのスクリーンショット" borderRadius={10} /> */}
                <Image
                  src="/desktop-screenshot.png"
                  alt="Kenchiku AIウェブアプリの管理画面"
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "auto", borderRadius: 10, border: "1.5px solid var(--border-color)" }}
                />
              </div>
            </div>
            <div className={styles.appCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statIcon} aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
              </svg>
              {/* <p className={styles.appCardLabel}>Mobile Application (iOS / Android)</p> */}
              <h3 className={styles.appCardTitle}>iOS・Androidアプリ</h3>
              <p className={styles.appCardIntro}>現場での情報収集に</p>
              <ul className={styles.appCardList}>
                {["報告書の新規作成・編集", "音声入力による記録", "写真の撮影・アップロード", "AIによる内容自動整理", "現場からのリアルタイム更新"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.mobileScreenshotWrap}>
                <Image
                  src="/mobile-screenshot-2.png"
                  alt="Kenchiku AIモバイルアプリの画面"
                  width={400}
                  height={711}
                  style={{ width: "100%", maxWidth: 200, height: "auto", borderRadius: 24, border: "1.5px solid var(--border-color)" }}
                />
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
          {/* <p className={styles.sectionSub}>LINE Messaging API integration for field teams</p> */}
          <p className={styles.sectionLead}>
            現場担当者がわざわざアプリを覚え直す必要はありません。日常的に使っているLINEから報告書を作成できます。
          </p>
          <div className={styles.lineBanner} role="region" aria-label="LINE連携の説明">
            <div className={styles.lineBannerIcon} aria-hidden="true">
              <LineLogo color="white" size={40} />
            </div>
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
          <p className={styles.sectionEyebrow}>利用対象</p>
          <h2 className={styles.sectionTitle}>建設現場のすべての関係者へ</h2>
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
                {/* <p className={styles.roleCardSub}>{r.sub}</p> */}
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
            <div onClick={() => {
              setShowSignup(true);
            }} className={`${styles.btn} ${styles.btnPrimary}`}>
              無料で試してみる →
            </div>
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
          <p className={styles.footerCopy}>© 2026 Kenchiku AI. All rights reserved.</p>
        </div>
      </footer>

      <SignupModal
        isOpen={showSignup}
        onClose={() => {
          setShowSignup(false);
        }}
        onSubmit={async (request) => {
          setShowSignup(false);

          setLoading(true);

          try {
            await signupCompany(request);

            setLoading(false);
            setShowSignup(false);
            showModal({
              title: t("sign_up_email_sent"),
              subtitle: t("sign_up_email_sent_description"),
            });
          } catch (err) {
            setLoading(false);
            setShowSignup(false);
            showModal({
              title: t("error"),
              subtitle: t("sign_up_error"),
            });
          }
        }}
      />
      {loading && <Loader />}
    </>
  );
}
