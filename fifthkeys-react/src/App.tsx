import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Globe, BellRing, CheckCircle2, ArrowRight,
  Bot, Check, Loader2, Mail, Database, Cpu, Radio,
  TrendingUp, Zap, X, Activity, BarChart3, ChevronRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = 'en' | 'jp';
type TrustStep = 0 | 1 | 2;
type GridColor = 'blue' | 'indigo' | 'violet' | 'cyan' | 'teal' | 'emerald' | 'amber' | null;

// ─── i18n ─────────────────────────────────────────────────────────────────────

const i18n = {
  en: {
    nav: { features: 'How It Works', pricing: 'Pricing', cta: 'Apply for Beta' },
    hero: {
      badge: 'AI-Native Hotel & Ryokan Agent',
      title1: 'Your hotel.',
      title2: 'Always staffed.',
      sub: 'Lumi is the AI coworker that never sleeps. It monitors rates, answers guests, and updates your PMS — 24 / 7, in Japanese.',
      cta: 'Apply for Beta Access',
      ctaSub: 'Accepting 5 properties per month',
    },
    trust: {
      sectionBadge: 'Trust by Design',
      title: 'You decide.',
      titleGold: 'Lumi executes.',
      sub: 'Lumi never acts unilaterally. Every revenue-impacting action requires one tap from you.',
      steps: ['Suggest', 'Approve', 'Execute'],
      lumiAlert: 'Golden Week demand rising.',
      suggestion: 'Suggesting ¥5,000 ADR increase across all OTAs.',
      rationale1: 'Competitors raised rates +12% in the last 3 hours.',
      rationale2: 'Your current occupancy: 87%.',
      reviewBtn: 'Review Suggestion →',
      approveBtn: 'Approve & Deploy',
      rejectBtn: 'Reject',
      deployed: 'Rates Updated',
      platforms: ['Rakuten Travel', 'Jalan', 'Direct Booking'],
      resetBtn: 'Try Again',
    },
    tetris: {
      sectionBadge: 'Revenue Intelligence',
      title: 'Dead space is',
      titleGold: 'lost revenue.',
      sub: 'Lumi sees the inefficiencies your calendar can\'t. One tap re-optimizes your entire grid — grouped by housekeeping route.',
      beforeLabel: 'Before Lumi',
      afterLabel: 'After Lumi',
      optimizeBtn: 'Lumi: Optimize Now',
      optimizing: 'Analyzing grid…',
      statsRevenue: '+¥240,000 recovered',
      statsHk: 'Housekeeping efficiency +38%',
      resetBtn: 'Reset Demo',
    },
    roster: {
      sectionBadge: 'Architecture',
      title: 'Three minds.',
      titleGold: 'One AI coworker.',
      sub: 'Lumi isn\'t a single chatbot. Three specialized agents work in concert — each with distinct tools and integrations.',
      agents: [
        {
          id: 'data', Icon: Database,
          name: 'Data Agent', role: 'Reads & Analyzes',
          color: 'cyan' as const,
          caps: ['Scrapes competitor OTA rates hourly', 'Monitors local events & demand signals', 'Reads your PMS in real-time', 'Tracks review sentiment across platforms'],
          integrations: ['Rakuten', 'Jalan', 'OTA Insight'],
        },
        {
          id: 'ops', Icon: Cpu,
          name: 'Operations Agent', role: 'Acts & Executes',
          color: 'indigo' as const,
          caps: ['Updates rates across all OTAs instantly', 'Assigns rooms & activates smart keys', 'Creates and routes maintenance tickets', 'Manages inventory blocks and holds'],
          integrations: ['LINE', 'Remo', 'Stripe'],
        },
        {
          id: 'comms', Icon: Radio,
          name: 'Comms Agent', role: 'Speaks & Responds',
          color: 'violet' as const,
          caps: ['Replies to guest messages 24 / 7', 'Sends personalized pre-arrival messages', 'Handles complaint recovery with empathy', 'Translates JP ↔ EN seamlessly'],
          integrations: ['WhatsApp', 'WeChat', 'Email'],
        },
      ],
    },
    waitlist: {
      sectionBadge: 'Beta Program',
      title: 'Accepting 5 properties',
      titleGold: 'per month.',
      sub: 'We onboard slowly. Every property receives white-glove support from our team before going live.',
      counter: 'Next cohort opens:',
      nextMonth: 'March 2026',
      spotsLeft: '3 spots remaining',
      placeholder: 'Your work email',
      cta: 'Apply for Beta Access',
      disclaimer: 'No credit card. No commitment. Cancel anytime.',
      successTitle: 'Application received.',
      successSub: 'We\'ll review your property and be in touch within 48 hours.',
    },
    pricing: {
      sectionBadge: 'Pricing',
      title: '¥0 to start.',
      titleGold: 'Pay only when Lumi earns.',
      sub: 'We succeed only when you succeed. No monthly fee, no setup cost.',
      items: [
        { label: 'Setup Fee', value: '¥0', highlight: false },
        { label: 'Monthly Fee', value: '¥0', highlight: false },
        { label: 'OTA Booking Processing', value: '$1.50 / booking', highlight: false },
        { label: 'Direct Booking Commission', value: '2.5%', highlight: true },
      ],
      note: 'Commission applies to direct bookings only. OTA bookings at flat rate regardless of booking value.',
    },
    footer: {
      tagline: 'The AI coworker for modern hospitality.',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  jp: {
    nav: { features: '機能', pricing: '料金', cta: 'ベータ版に申し込む' },
    hero: {
      badge: 'AIネイティブ・ホテル＆旅館エージェント',
      title1: 'あなたのホテルに、',
      title2: 'AIスタッフを。',
      sub: 'Lumiは眠らないAIスタッフです。料金の監視、ゲスト対応、PMSの更新を24時間365日、日本語で行います。',
      cta: 'ベータ版に申し込む',
      ctaSub: '毎月5施設まで受付中',
    },
    trust: {
      sectionBadge: '信頼設計',
      title: '決めるのはあなた。',
      titleGold: 'Lumiが実行する。',
      sub: 'Lumiは一切自己判断しません。収益に影響するすべてのアクションは、あなたの承認が必要です。',
      steps: ['提案', '承認', '実行'],
      lumiAlert: 'ゴールデンウィークの需要が上昇中です。',
      suggestion: '全OTAで¥5,000のADR引き上げを提案します。',
      rationale1: '過去3時間で競合他社が平均+12%値上げしました。',
      rationale2: '現在の稼働率：87%。',
      reviewBtn: '提案を確認 →',
      approveBtn: '承認して反映',
      rejectBtn: '却下',
      deployed: '料金更新完了',
      platforms: ['楽天トラベル', 'じゃらん', '自社サイト'],
      resetBtn: 'もう一度試す',
    },
    tetris: {
      sectionBadge: '収益インテリジェンス',
      title: '空き部屋は',
      titleGold: '機会損失。',
      sub: 'Lumiはカレンダーでは見えない非効率を発見します。ワンタップで清掃ルートを考慮した予約グリッドの最適化が完了します。',
      beforeLabel: '最適化前',
      afterLabel: '最適化後',
      optimizeBtn: 'Lumi: 今すぐ最適化',
      optimizing: 'グリッドを分析中…',
      statsRevenue: '+¥240,000 回収',
      statsHk: '清掃ルート効率 +38%',
      resetBtn: 'デモをリセット',
    },
    roster: {
      sectionBadge: 'アーキテクチャ',
      title: '3つの頭脳。',
      titleGold: '1人のAIスタッフ。',
      sub: 'Lumiは単一のチャットボットではありません。それぞれ専用のツールと連携を持つ3つのエージェントが協調して動作します。',
      agents: [
        {
          id: 'data', Icon: Database,
          name: 'データエージェント', role: '読み取り・分析',
          color: 'cyan' as const,
          caps: ['競合OTA料金を毎時スクレイピング', '地域イベント・需要シグナルを監視', 'PMSをリアルタイムで参照', '各プラットフォームのレビューセンチメントを追跡'],
          integrations: ['楽天', 'じゃらん', 'OTA Insight'],
        },
        {
          id: 'ops', Icon: Cpu,
          name: 'オペレーションエージェント', role: '実行・操作',
          color: 'indigo' as const,
          caps: ['全OTAの料金を即時更新', '客室の割り当てとスマートキーの有効化', 'メンテナンス票の作成とルーティング', '在庫ブロックとホールドの管理'],
          integrations: ['LINE', 'Remo', 'Stripe'],
        },
        {
          id: 'comms', Icon: Radio,
          name: 'コミュニケーションエージェント', role: '会話・対応',
          color: 'violet' as const,
          caps: ['ゲストメッセージに24時間対応', 'パーソナライズされたチェックイン前メッセージを送信', 'クレームへの共感ある対応と回復', '日英の双方向シームレス翻訳'],
          integrations: ['WhatsApp', 'WeChat', 'メール'],
        },
      ],
    },
    waitlist: {
      sectionBadge: 'ベータプログラム',
      title: '毎月5施設まで',
      titleGold: '受付中。',
      sub: 'すべての施設に白手袋サポートをご提供するため、慎重にオンボーディングしています。',
      counter: '次のコホート開始：',
      nextMonth: '2026年3月',
      spotsLeft: '残り3枠',
      placeholder: 'ビジネスメールアドレス',
      cta: 'ベータ版に申し込む',
      disclaimer: 'クレジットカード不要。コミットメント不要。いつでもキャンセル可能。',
      successTitle: '申込みを受け付けました。',
      successSub: '施設を確認後、48時間以内にご連絡いたします。',
    },
    pricing: {
      sectionBadge: '料金',
      title: '¥0で始める。',
      titleGold: 'Lumiが稼いだときだけ支払う。',
      sub: '私たちはあなたが成功したときだけ成功します。月額固定費も初期費用も一切不要。',
      items: [
        { label: '初期費用', value: '¥0', highlight: false },
        { label: '月額費用', value: '¥0', highlight: false },
        { label: 'OTA予約処理', value: '$1.50 / 予約', highlight: false },
        { label: '直販予約コミッション', value: '2.5%', highlight: true },
      ],
      note: 'コミッションは直販予約のみに適用されます。OTA予約は予約額に関わらず定額料金です。',
    },
    footer: {
      tagline: 'モダンなホスピタリティのためのAIスタッフ。',
      rights: '無断複写・転載を禁じます。',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
    },
  },
} as const;

// ─── Grid constants ───────────────────────────────────────────────────────────

const ROOM_CSS: Record<NonNullable<GridColor>, string> = {
  blue:    '#3B82F6',
  indigo:  '#6366F1',
  violet:  '#8B5CF6',
  cyan:    '#06B6D4',
  teal:    '#14B8A6',
  emerald: '#10B981',
  amber:   '#F59E0B',
};

const ROOMS = ['101', '102', '103', '104', '201', '202', '203', '204'];
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_JP = ['月', '火', '水', '木', '金', '土', '日'];

const BEFORE_GRID: GridColor[][] = [
  [null,      'blue',    'blue',    null,    null,      'violet',  'violet' ],
  ['cyan',    'cyan',    null,      null,    'amber',   'amber',   'amber'  ],
  [null,      null,      'indigo',  'indigo',null,      null,      'teal'   ],
  ['blue',    null,      null,      'teal',  'teal',    null,      'violet' ],
  [null,      'emerald', null,      null,    'cyan',    'cyan',    null     ],
  ['indigo',  null,      'amber',   null,    null,      'blue',    'blue'   ],
  [null,      'teal',    'teal',    null,    'emerald', null,      null     ],
  ['violet',  'violet',  null,      'cyan',  null,      null,      'indigo' ],
];

const AFTER_GRID: GridColor[][] = [
  ['blue',    'blue',    'blue',    null,    null,      'violet',  'violet' ],
  ['cyan',    'cyan',    'cyan',    null,    'amber',   'amber',   'amber'  ],
  [null,      null,      'indigo',  'indigo','indigo',  null,      'teal'   ],
  [null,      null,      null,      'teal',  'teal',    null,      'violet' ],
  ['emerald', 'emerald', null,      null,    'cyan',    'cyan',    null     ],
  ['indigo',  'indigo',  'amber',   null,    null,      'blue',    'blue'   ],
  ['teal',    'teal',    'teal',    null,    'emerald', null,      null     ],
  ['violet',  'violet',  null,      'cyan',  'cyan',    null,      'indigo' ],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

const BRAND_COLORS: Record<string, string> = {
  LINE: '#00B900', Remo: '#FF6B35', WhatsApp: '#25D366', WeChat: '#07C160',
  Stripe: '#635BFF', Rakuten: '#BF0000', Jalan: '#E8380D',
  '楽天': '#BF0000', 'じゃらん': '#E8380D', 'メール': '#94A3B8',
  Email: '#94A3B8', 'OTA Insight': '#6366F1',
};

const IntegrationBadge: React.FC<{ name: string }> = ({ name }) => {
  const color = BRAND_COLORS[name] ?? '#4A5568';
  return (
    <span
      className="px-2.5 py-1 rounded-full text-xs font-semibold border"
      style={{ backgroundColor: `${color}22`, borderColor: `${color}55`, color }}
    >
      {name}
    </span>
  );
};

const SectionBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
    {label}
  </div>
);

// ─── TrustBuilderWidget ───────────────────────────────────────────────────────

interface TrustBuilderProps { t: typeof i18n['en']['trust'] }

const TrustBuilderWidget: React.FC<TrustBuilderProps> = ({ t }) => {
  const [step, setStep] = useState<TrustStep>(0);
  const [deployIdx, setDeployIdx] = useState(-1);

  const handleReview = () => setStep(1);

  const handleApprove = useCallback(() => {
    setStep(2);
    t.platforms.forEach((_, i) => {
      setTimeout(() => setDeployIdx(i), i * 700);
    });
  }, [t.platforms]);

  const handleReset = () => { setStep(0); setDeployIdx(-1); };

  const stepColors = ['cyan', 'amber', 'emerald'] as const;
  const stepBg: Record<number, string> = {
    0: 'bg-cyan-400/20 border-cyan-400/40 text-cyan-400',
    1: 'bg-amber-400/20 border-amber-400/40 text-amber-400',
    2: 'bg-emerald-400/20 border-emerald-400/40 text-emerald-400',
  };

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 max-w-xl w-full mx-auto shadow-2xl shadow-black/40">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {t.steps.map((label, i) => (
          <React.Fragment key={i}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 ${i === step ? stepBg[i] : 'bg-white/5 border-white/10 text-white/30'}`}>
              <span className={`w-1.5 h-1.5 rounded-full transition-all ${i === step ? 'bg-current animate-pulse' : 'bg-white/20'}`} />
              {label}
            </div>
            {i < 2 && <ChevronRight size={14} className="text-white/20 shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        {/* ── Step 0: Suggest ── */}
        {step === 0 && (
          <motion.div key="suggest"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-4 p-5 bg-cyan-500/[0.08] border border-cyan-500/20 rounded-2xl mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Lumi</p>
                <p className="text-white/90 text-sm font-medium mb-2">{t.lumiAlert}</p>
                <p className="text-white/60 text-sm leading-relaxed">{t.suggestion}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-xl">
                <p className="text-xs text-white/40 mb-1 flex items-center gap-1.5"><TrendingUp size={12}/> Competitor Signal</p>
                <p className="text-white/90 text-sm font-medium">{t.rationale1}</p>
              </div>
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-xl">
                <p className="text-xs text-white/40 mb-1 flex items-center gap-1.5"><Activity size={12}/> Occupancy</p>
                <p className="text-white/90 text-sm font-medium">{t.rationale2}</p>
              </div>
            </div>

            <button
              onClick={handleReview}
              className="w-full py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              {t.reviewBtn}
            </button>
          </motion.div>
        )}

        {/* ── Step 1: Approve ── */}
        {step === 1 && (
          <motion.div key="approve"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="p-4 bg-white/[0.04] border border-white/10 rounded-xl text-center">
              <p className="text-white/50 text-xs mb-1">Pending action</p>
              <p className="text-white font-medium text-sm">{t.suggestion}</p>
            </div>

            {/* Big pulsing approve button */}
            <motion.button
              onClick={handleApprove}
              className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg rounded-2xl transition-colors duration-200 flex items-center justify-center gap-3 shadow-2xl"
              animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.3)', '0 0 50px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.3)'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Check size={22} /> {t.approveBtn}
            </motion.button>

            <button onClick={handleReset} className="w-full py-3 text-white/30 text-sm hover:text-white/60 transition-colors">
              {t.rejectBtn}
            </button>
          </motion.div>
        )}

        {/* ── Step 2: Execute ── */}
        {step === 2 && (
          <motion.div key="execute"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
          >
            <div className="space-y-3 mb-6">
              {t.platforms.map((platform, i) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, x: -16 }}
                  animate={deployIdx >= i ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-center justify-between p-4 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl"
                >
                  <span className="text-white/90 text-sm font-medium">{platform}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-sm font-bold">¥15,000</span>
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <Check size={12} className="text-emerald-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {deployIdx >= t.platforms.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-4"
              >
                <p className="text-emerald-400 font-bold text-lg mb-1">{t.deployed}</p>
                <p className="text-white/40 text-xs">All platforms synchronized</p>
              </motion.div>
            )}

            <button onClick={handleReset} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/50 text-sm font-medium transition-colors">
              {t.resetBtn}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── RoomTetrisVisualizer ─────────────────────────────────────────────────────

interface TetrisProps { t: typeof i18n['en']['tetris']; lang: Lang }

const RoomTetrisVisualizer: React.FC<TetrisProps> = ({ t, lang }) => {
  const [revealedCols, setRevealedCols] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [done, setDone] = useState(false);
  const sweepControls = useAnimation();
  const DAYS = lang === 'jp' ? DAYS_JP : DAYS_EN;

  const handleOptimize = useCallback(async () => {
    if (isAnimating || done) return;
    setIsAnimating(true);
    sweepControls.set({ left: '-4px', opacity: 1 });
    for (let col = 0; col <= 7; col++) {
      await sleep(220);
      setRevealedCols(col + 1);
    }
    await sweepControls.start({ opacity: 0, transition: { duration: 0.4 } });
    setDone(true);
    setIsAnimating(false);
  }, [isAnimating, done, sweepControls]);

  const handleReset = () => { setRevealedCols(0); setDone(false); setIsAnimating(false); };

  const cellColor = (row: number, col: number): string => {
    const color = col < revealedCols ? AFTER_GRID[row][col] : BEFORE_GRID[row][col];
    if (!color) return 'rgba(255,255,255,0.04)';
    return ROOM_CSS[color];
  };

  const sweepX = `${(revealedCols / 7) * 100}%`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Grid */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        {/* Sweep line */}
        {isAnimating && (
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 z-10 pointer-events-none"
            style={{
              left: sweepX,
              background: 'linear-gradient(to bottom, transparent, #06B6D4, #6366F1, transparent)',
              boxShadow: '0 0 12px 3px rgba(6,182,212,0.5)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        )}

        {/* Day headers */}
        <div className="grid grid-cols-[56px_repeat(7,1fr)] gap-1.5 mb-2">
          <div />
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs text-white/30 font-medium py-1">{d}</div>
          ))}
        </div>

        {/* Room rows */}
        {ROOMS.map((room, rIdx) => (
          <div key={room} className="grid grid-cols-[56px_repeat(7,1fr)] gap-1.5 mb-1.5">
            <div className="flex items-center">
              <span className="text-xs text-white/30 font-mono">{room}</span>
            </div>
            {Array.from({ length: 7 }, (_, cIdx) => (
              <motion.div
                key={cIdx}
                className="h-8 rounded-md"
                animate={{ backgroundColor: cellColor(rIdx, cIdx) }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
        <div className="flex gap-4">
          {done ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold">{t.statsRevenue}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <Zap size={14} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold">{t.statsHk}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-sm bg-white/10" />
              <span className="text-xs text-white/30">{t.beforeLabel}</span>
              <span className="w-3 h-3 rounded-sm bg-cyan-500/60" />
              <span className="text-xs text-white/50">{t.afterLabel}</span>
            </div>
          )}
        </div>

        {done ? (
          <button onClick={handleReset} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/50 text-sm font-medium transition-colors">
            {t.resetBtn}
          </button>
        ) : (
          <motion.button
            onClick={handleOptimize}
            disabled={isAnimating}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl text-sm flex items-center gap-2 disabled:opacity-60 transition-opacity"
            whileHover={!isAnimating ? { scale: 1.03 } : {}}
            whileTap={!isAnimating ? { scale: 0.97 } : {}}
          >
            {isAnimating ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
            {isAnimating ? t.optimizing : t.optimizeBtn}
          </motion.button>
        )}
      </div>
    </div>
  );
};

// ─── AgentRoster ──────────────────────────────────────────────────────────────

interface AgentRosterProps { t: typeof i18n['en']['roster'] }

const AGENT_GLOW: Record<string, string> = {
  cyan:   'from-cyan-500/20 to-transparent',
  indigo: 'from-indigo-500/20 to-transparent',
  violet: 'from-violet-500/20 to-transparent',
};
const AGENT_BORDER: Record<string, string> = {
  cyan:   'border-cyan-500/30 hover:border-cyan-500/60',
  indigo: 'border-indigo-500/30 hover:border-indigo-500/60',
  violet: 'border-violet-500/30 hover:border-violet-500/60',
};
const AGENT_ICON_BG: Record<string, string> = {
  cyan:   'from-cyan-500 to-blue-600 shadow-cyan-500/30',
  indigo: 'from-indigo-500 to-blue-600 shadow-indigo-500/30',
  violet: 'from-violet-500 to-purple-600 shadow-violet-500/30',
};
const AGENT_TEXT: Record<string, string> = {
  cyan: 'text-cyan-400', indigo: 'text-indigo-400', violet: 'text-violet-400',
};

const AgentRoster: React.FC<AgentRosterProps> = ({ t }) => (
  <div className="grid md:grid-cols-3 gap-6">
    {t.agents.map((agent, idx) => {
      const { Icon } = agent;
      return (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.12 }}
          className={`relative bg-white/[0.04] border rounded-3xl p-8 overflow-hidden group transition-all duration-300 ${AGENT_BORDER[agent.color]}`}
        >
          {/* Glow */}
          <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${AGENT_GLOW[agent.color]} pointer-events-none`} />

          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AGENT_ICON_BG[agent.color]} flex items-center justify-center mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={26} className="text-white" />
          </div>

          {/* Label */}
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 relative z-10 ${AGENT_TEXT[agent.color]}`}>{agent.role}</p>
          <h3 className="text-xl font-semibold text-white mb-6 relative z-10 leading-tight">{agent.name}</h3>

          {/* Capabilities */}
          <ul className="space-y-3 mb-8 relative z-10">
            {agent.caps.map((cap, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${AGENT_TEXT[agent.color]}`} />
                {cap}
              </li>
            ))}
          </ul>

          {/* Integration badges */}
          <div className="flex flex-wrap gap-2 relative z-10">
            {agent.integrations.map(name => <IntegrationBadge key={name} name={name} />)}
          </div>
        </motion.div>
      );
    })}
  </div>
);

// ─── FadeIn utility ───────────────────────────────────────────────────────────

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}
const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hiddenMap = { up: 'opacity-0 translate-y-10', down: 'opacity-0 -translate-y-10', left: 'opacity-0 translate-x-10', right: 'opacity-0 -translate-x-10' };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 translate-x-0' : hiddenMap[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = i18n[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormState('loading');
    await sleep(1500);
    setFormState('success');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#020B18] text-white font-sans overflow-x-hidden">

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#020B18]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">F</div>
            <span className="font-semibold text-lg tracking-tight">FifthKeys</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm text-white/50 hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">{t.nav.pricing}</a>
            <div className="w-px h-4 bg-white/20" />
            <button onClick={() => setLang(l => l === 'en' ? 'jp' : 'en')} className="flex items-center gap-1.5 text-xs font-bold text-white/40 hover:text-white transition-colors">
              <Globe size={13} /> {lang === 'en' ? 'EN / JP' : 'JP / EN'}
            </button>
            <a href="#waitlist" className="bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-300 transition-colors">
              {t.nav.cta}
            </a>
          </nav>

          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={22} /> : <BarChart3 size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden absolute top-full left-0 w-full bg-[#020B18]/95 backdrop-blur-xl border-b border-white/10 p-4 space-y-2"
            >
              <a href="#how" onClick={() => setMenuOpen(false)} className="block p-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors text-sm">{t.nav.features}</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="block p-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors text-sm">{t.nav.pricing}</a>
              <a href="#waitlist" onClick={() => setMenuOpen(false)} className="block text-center p-3 bg-amber-400 text-black rounded-xl font-bold text-sm">{t.nav.cta}</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
          {/* Background radial glows */}
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05] mb-6"
            >
              <span className="text-white">{t.hero.title1}</span><br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#waitlist"
                className="flex items-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-base hover:bg-amber-300 hover:scale-105 transition-all duration-200 shadow-2xl shadow-amber-500/20"
              >
                {t.hero.cta} <ArrowRight size={18} />
              </a>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.hero.ctaSub}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Trust Builder ─────────────────────────────────────────────────── */}
        <section id="how" className="py-28 border-t border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <SectionBadge label={t.trust.sectionBadge} />
                <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-5 leading-tight">
                  {t.trust.title}<br />
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{t.trust.titleGold}</span>
                </h2>
                <p className="text-lg text-white/50 leading-relaxed">{t.trust.sub}</p>
              </FadeIn>
              <FadeIn direction="left" delay={150}>
                <TrustBuilderWidget t={t.trust} />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Room Tetris ───────────────────────────────────────────────────── */}
        <section className="py-28 border-t border-white/5 bg-[#040D1A]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge label={t.tetris.sectionBadge} />
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
                {t.tetris.title}<br />
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">{t.tetris.titleGold}</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">{t.tetris.sub}</p>
            </FadeIn>
            <FadeIn delay={100}>
              <RoomTetrisVisualizer t={t.tetris} lang={lang} />
            </FadeIn>
          </div>
        </section>

        {/* ── Agent Roster ──────────────────────────────────────────────────── */}
        <section className="py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge label={t.roster.sectionBadge} />
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
                {t.roster.title}<br />
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{t.roster.titleGold}</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">{t.roster.sub}</p>
            </FadeIn>
            <AgentRoster t={t.roster} />
          </div>
        </section>

        {/* ── Waitlist CTA ──────────────────────────────────────────────────── */}
        <section id="waitlist" className="py-28 border-t border-white/5 bg-[#040D1A] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <FadeIn>
              <SectionBadge label={t.waitlist.sectionBadge} />
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
                {t.waitlist.title}<br />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{t.waitlist.titleGold}</span>
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">{t.waitlist.sub}</p>

              {/* Urgency counter */}
              <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/[0.04] border border-white/10 rounded-2xl mb-10 backdrop-blur-md">
                <div className="text-left">
                  <p className="text-xs text-white/40 font-medium">{t.waitlist.counter}</p>
                  <p className="text-white font-bold">{t.waitlist.nextMonth}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-left">
                  <p className="text-xs text-white/40 font-medium">Capacity</p>
                  <p className="text-amber-400 font-bold">{t.waitlist.spotsLeft}</p>
                </div>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={24} className="text-emerald-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{t.waitlist.successTitle}</h3>
                    <p className="text-white/50">{t.waitlist.successSub}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={formState === 'loading'}
                        placeholder={t.waitlist.placeholder}
                        className="w-full pl-11 pr-4 py-4 bg-white/[0.06] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-400/60 transition-colors"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-amber-400 text-black font-bold rounded-xl text-base flex items-center justify-center gap-2 hover:bg-amber-300 transition-colors disabled:opacity-60 shadow-2xl shadow-amber-500/20"
                    >
                      {formState === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                      {formState === 'loading' ? '…' : t.waitlist.cta}
                    </motion.button>
                    <p className="text-xs text-white/30">{t.waitlist.disclaimer}</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────────── */}
        <section id="pricing" className="py-28 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn className="text-center mb-14">
              <SectionBadge label={t.pricing.sectionBadge} />
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
                {t.pricing.title}<br />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{t.pricing.titleGold}</span>
              </h2>
              <p className="text-lg text-white/50">{t.pricing.sub}</p>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden">
                {t.pricing.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-8 py-6 ${i < t.pricing.items.length - 1 ? 'border-b border-white/5' : ''} ${item.highlight ? 'bg-amber-400/5' : ''}`}
                  >
                    <span className="text-white/70 text-sm font-medium">{item.label}</span>
                    <span className={`font-bold text-lg ${item.highlight ? 'text-amber-400' : 'text-white'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 text-center mt-5 leading-relaxed">{t.pricing.note}</p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-14 bg-[#010810]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">F</div>
            <div>
              <span className="font-semibold text-lg tracking-tight block leading-none">FifthKeys</span>
              <span className="text-white/30 text-xs">{t.footer.tagline}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <button
              onClick={() => setLang(l => l === 'en' ? 'jp' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50"
            >
              <Globe size={12} /> {lang === 'en' ? '日本語' : 'English'}
            </button>
          </div>

          <p className="text-xs text-white/20">© {new Date().getFullYear()} FifthKeys. {t.footer.rights}</p>
        </div>
      </footer>

      {/* Custom global styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.2); }
      `}} />
    </div>
  );
}
