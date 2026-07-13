"use client";

import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { LineLogo, Logo } from "../ui/Icons";
import SignupModal from "./signup/SignupModal";
import { Loader } from "../ui/Loader";
import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";
import { androidUrl, buttonColor, createCompanyInvitationIdKey, iosUrl } from "@/lib/constants";

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

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invitationId, setInvitationId] = useState("");
  const { signupCompany, resendInvite } = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    const invId = sessionStorage.getItem(createCompanyInvitationIdKey);

    if (invId) {
      setInvitationId(invId);
    }
  }, []);

  const resendInvitation = async (id: string) => {
    setLoading(true);

    try {
      await resendInvite(id);

      showModal({
        title: t("sign_up_email_sent"),
        subtitle: t("sign_up_email_sent_description"),
      });
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

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
          <Link href="#line" className={styles.navLink}>LINE連携</Link>
          <Link href="#features" className={styles.navLink}>機能</Link>
          <Link href="#how-it-works" className={styles.navLink}>ご利用の流れ</Link>
          <Link href="#apps" className={styles.navLink}>アプリ</Link>
          <Link href="#roles" className={styles.navLink}>利用対象</Link>
          <Link href="#pricing" className={styles.navLink}>料金</Link>
          <Link href="/docs" className={styles.navLink}>ドキュメント</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={`${styles.btn} ${styles.btnSecondary}`}>ログイン</Link>
          {invitationId && (
            <div
              onClick={() => {
                resendInvitation(invitationId);
              }}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              メールを再送信する
            </div>
          )}
          <div
            onClick={() => {
              setShowSignup(true);
            }}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
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
      </nav >

      {/* Mobile menu drawer */}
      {
        menuOpen && (
          <div className={styles.mobileMenu} role="dialog" aria-label="ナビゲーションメニュー">
            <Link href="#line" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>LINE連携</Link>
            <Link href="#features" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>機能</Link>
            <Link href="#how-it-works" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>ご利用の流れ</Link>
            <Link href="#apps" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>アプリ</Link>
            <Link href="#roles" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>利用対象</Link>
            <Link href="#pricing" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>料金</Link>
            <Link href="/docs" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>ドキュメント</Link>
            <div className={styles.mobileMenuDivider} />
            <div className="flex flex-col gap-2">
              <Link href="/login" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setMenuOpen(false)}>ログイン</Link>
              {invitationId && (
                <div
                  onClick={() => {
                    resendInvitation(invitationId);
                  }}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  メールを再送信する
                </div>
              )}
              <div
                onClick={() => {
                  setShowSignup(true);
                }}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                無料で試してみる →
              </div>
            </div>
          </div>
        )
      }

      {/* ── Hero ── */}
      <header className={styles.hero} role="banner">

        {/* Background photo — replace src with your actual construction site photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image src="/hero-bg.png" alt="" fill priority className={styles.heroBg} aria-hidden />

        {/* Overlay so text is readable over the photo */}
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          {/* ── Left column: text ── */}
          <div className={styles.heroLeft}>
            <span className={styles.heroBadge}>
              書類作成に追われない建設会社へ
            </span>

            <h1 className={styles.heroHeadline}>
              建設会社のバックオフィスを
              <br />
              <span className={styles.heroHeadlineAccent}>
                AIでもっと効率的に
              </span>
            </h1>

            <p className={styles.heroDescription}>
              LINEでのやり取りや現場報告、写真・音声など、日々の情報をAIが整理。
              日報・作業報告書・安全書類・タスク一覧を自動で作成し、書類作成にかかる時間を大幅に削減します。
            </p>

            <div className={styles.heroCta}>
              {invitationId && (
                <div
                  onClick={() => {
                    resendInvitation(invitationId);
                  }}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  メールを再送信する
                </div>
              )}

              <div
                onClick={() => {
                  setShowSignup(true);
                }}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                30日間無料で試す →
              </div>
            </div>
          </div>

          {/* ── Right column: app mockup + callout cards ── */}
          <div className={styles.heroRight}>

            {/* Feature callout cards — top right */}
            <div className={styles.heroCallouts}>
              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.calloutTitle}>LINEグループをAI解析</p>
                  <p className={styles.calloutDesc}>
                    メッセージを自動で整理
                    <br />
                    タスクや進捗を抽出
                  </p>
                </div>
              </div>

              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div>
                  <p className={styles.calloutTitle}>写真をAIで解析</p>
                  <p className={styles.calloutDesc}>
                    説明文を自動生成
                    <br />
                    タグを自動で追加
                  </p>
                </div>
              </div>

              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
                  </svg>
                </div>
                <div>
                  <p className={styles.calloutTitle}>音声をAIで解析</p>
                  <p className={styles.calloutDesc}>
                    文字起こしを自動化
                    <br />
                    要約して書類へ反映
                  </p>
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

      {/* ── LINE ── */}
      <section id="line" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>LINE連携</p>

          <h2 className={styles.sectionTitle}>
            LINEのやり取りをAIで整理。
            業務と締切を見える化。
          </h2>

          <p className={styles.sectionLead}>
            建設会社で日々行われる、お客様・現場担当者・協力会社とのLINEでのやり取りをAIが整理。タスクや締切を見える化するとともに、日報や作業報告書、安全書類などの作成を自動化し、業務の負担を大幅に軽減します。
          </p>

          <div
            className={styles.lineBanner}
            role="region"
            aria-label="LINE連携の説明"
          >
            <div className={styles.lineBannerIcon} aria-hidden="true">
              <LineLogo color="white" size={40} />
            </div>

            <div className={styles.lineBannerBody}>
              <h3>お客様とのLINEから、AIが次のアクションを整理</h3>

              <p>
                プロジェクトに紐づいたLINEグループや担当者とのメッセージをAIが自動で整理。「○○様に見積書を送ってください」「材料は金曜日までに現場へ搬入してください」「設備業者さんと日程調整をお願いします」といった日々のやり取りから、タスクや締切、関係者を自動で抽出し、誰が・何を・いつまでに対応するのかを見える化します。
              </p>

              <p style={{ marginTop: 16 }}>
                LINEグループとプロジェクトをQRコードまたはリンクコードで紐づけるだけで、
                普段どおりLINEを使いながら、AIによる業務サポートを受けられます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>機能</p>
          <h2 className={styles.sectionTitle}>現場報告業務を、AIで圧倒的に効率化</h2>
          <p className={styles.sectionLead}>
            写真を撮る。話す。あとはAIに任せる。
          </p>
          <div className={styles.featuresGrid}>
            {[
              {
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
                title: "LINE連携",
                desc: (
                  <>
                    普段どおりLINEを使うだけ。
                    <div className="mt-3">
                      AIが
                    </div>
                    <ul>
                      <li>お客様とのやり取りを整理</li>
                      <li>アクション項目を自動抽出</li>
                      <li>業務をサポート</li>
                    </ul>
                    新しい使い方を覚える必要はありません。
                  </>
                )
              },
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
      <section id="how-it-works" className={styles.section}>
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
      <section id="apps" className={`${styles.section} ${styles.sectionAlt}`}>
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
                {[
                  "テンプレートの作成・管理",
                  "プロジェクト・ユーザーの管理",
                  "提出済み報告書の閲覧・検索",
                  "PDF・Excelでの出力",
                  "ゲスト招待・権限管理",
                  "LINEグループとの連携設定",
                  "プロジェクトとLINEグループの紐付け",
                  "アクション項目の作成・管理",
                  "LINE連携の各種設定",
                  "会社・プロジェクト情報の管理",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.appScreenshotWrap}>
                {/* <ScreenshotPlaceholder aspectRatio="4/3" label="Webアプリのスクリーンショット" borderRadius={10} /> */}
                <Image
                  src="/web-screenshot.png"
                  alt="Kenchiku AIウェブアプリの管理画面"
                  width={2560}
                  height={1648}
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
              <div className="flex items-center justify-center pt-4 gap-4">
                <a
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={iosUrl}
                >
                  <Image src="/apple.svg" alt="apple" width={120} height={100} />
                </a>
                <a
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={androidUrl}
                >
                  <Image src="/google.svg" alt="google" width={148} height={100} />
                </a>
              </div>
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

      {/* ── Pricing ── */}
      <section id="pricing" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>料金</p>
          <h2 className={styles.sectionTitle}>シンプルな料金プラン</h2>

          <div className={styles.pricingWrap}>

            {/* Early adopter banner */}
            <div className={styles.pricingBanner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />
              </svg>
              早期導入企業募集中 — 現在の料金で継続してご利用いただけます
            </div>

            <div className={styles.pricingCard}>

              {/* Left: plan details */}
              <div className={styles.pricingLeft}>
                <div className={styles.pricingBadge}>30日間無料</div>
                <h3 className={styles.pricingName}>スタータープラン</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.pricingCurrency}>¥</span>
                  <span className={styles.pricingAmount}>19,800</span>
                  <span className={styles.pricingPer}>/月（税込）</span>
                </div>
                <p className={styles.pricingTrialNote}>30日間無料でお試しいただけます</p>

                <div className={styles.pricingMeta}>
                  <span className={styles.pricingMetaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="9 12 11 14 15 10" /><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    初期費用：無料
                  </span>
                  <span className={styles.pricingMetaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    契約期間の縛り：なし
                  </span>
                </div>

                <div className={styles.pricingCta}>
                  <a onClick={async () => {
                    if (invitationId) {
                      resendInvitation(invitationId);
                    } else {
                      setShowSignup(true);
                    }
                  }} className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                    {invitationId ? "メールを再送信する" : "30日間無料で試す →"}
                  </a>
                </div>

                <div className={styles.pricingEarlyAdopter}>
                  <p className={styles.pricingEarlyAdopterTitle}>早期導入企業募集中</p>
                  <p className={styles.pricingEarlyAdopterDesc}>
                    現在、初期導入企業様と一緒にサービスを改善しています。
                    スタータープランは小規模〜中規模の建設会社向けの特別価格です。
                    早期導入企業様は現在の料金で継続してご利用いただけます。
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className={styles.pricingDivider} aria-hidden="true" />

              {/* Right: two columns of features */}
              <div className={styles.pricingRight}>
                <div className={styles.pricingRecommend}>
                  <p className={styles.pricingRecommendTitle}>こんな会社におすすめです</p>
                  <ul className={styles.pricingList}>
                    {[
                      "小規模〜中規模の建設会社向け",
                      "電気・設備・空調・配管・リフォーム工事",
                      "現場の報告書作成を効率化したい会社",
                      "まずは低コストでAI・LINE連携を導入したい会社",
                    ].map((item) => (
                      <li key={item} className={styles.pricingListItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.pricingCheckAlt} aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.pricingFeatures}>
                  <p className={styles.pricingRecommendTitle}>プラン内容</p>
                  <ul className={styles.pricingList}>
                    {[
                      "AI報告書作成",
                      "LINE連携",
                      "音声入力・文字起こし",
                      "写真のAI説明・タグ付け",
                      "カスタム報告書テンプレート",
                      "プロジェクト管理",
                      "ゲストユーザー招待",
                      "AIによるLINEからのタスク抽出",
                      "メールサポート",
                    ].map((item) => (
                      <li key={item} className={styles.pricingListItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.pricingCheck} aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            <div
              style={{
                textAlign: "center",
                background: "#fdfdfd",
                border: "1.5px solid #e4e6e8",
                borderRadius: 20,
                padding: 36,
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                大規模導入をご検討ですか？
              </h3>

              <p
                style={{
                  maxWidth: 700,
                  margin: "0 auto",
                  lineHeight: 1.8,
                  color: "#555",
                }}
              >
                複数拠点・多数のプロジェクト・多くのユーザーでのご利用を予定されている企業様には、
                導入規模に応じたエンタープライズプランをご用意しています。
                ご要望に合わせた最適なプランをご提案いたしますので、お気軽にお問い合わせください。
              </p>

              <div style={{ marginTop: 20 }}>
                <a
                  href="mailto:support@kenchiku.ai?subject=エンタープライズプランについて"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  エンタープライズプランについて問い合わせる
                </a>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* ── CTA band ── */}
      < section id="signup" className={`${styles.section} ${styles.ctaBand}`
      }>
        <div className={styles.sectionInner}>
          <p className={`${styles.sectionEyebrow} ${styles.centered}`}>今すぐ始める</p>
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>現場の報告業務を、今日から変えよう</h2>
          <p className={`${styles.ctaBandLead} ${styles.centered}`}>
            無料でアカウントを作成して、Kenchiku AIをお試しください。<br />
            管理者が招待リンクを発行するだけで、チーム全員がすぐに使えます。
          </p>
          <div className={`${styles.btnGroup} ${styles.centered}`}>
            <div
              onClick={() => {
                setShowSignup(true);
              }}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              無料で試してみる →
            </div>
            <Link href="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
              既存アカウントでログイン
            </Link>
            {invitationId && (
              <div
                onClick={() => {
                  resendInvitation(invitationId);
                }}
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                メールを再送信する
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          ご質問やご意見・ご要望など、どんなことでもお気軽にご連絡ください。<br />
          皆さまからのフィードバックをお待ちしております。<br />
          <div style={{ marginTop: 16 }}>
            <a href="mailto:support@kenchiku.ai" style={{ fontWeight: 600, color: buttonColor }}>
              {" "}support@kenchiku.ai
            </a>
          </div>
        </div>
      </section >

      {/* ── Footer ── */}
      < footer className={styles.footer} role="contentinfo" >
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
          <p className={styles.footerCopy}>© 2026 Kenchiku AI</p>
        </div>
      </footer >

      <SignupModal
        isOpen={showSignup}
        onClose={() => {
          setShowSignup(false);
        }}
        onSubmit={async (request) => {
          setShowSignup(false);

          setLoading(true);

          try {
            const response = await signupCompany(request);
            const invId = response.invitation_id;

            if (invId) {
              sessionStorage.setItem(createCompanyInvitationIdKey, invId);
              setInvitationId(invId);
            }

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