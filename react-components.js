/* ============================================
   OTAKU VERSE — react-components.js
   React components (no JSX, uses React.createElement)
   ============================================ */

const { useState, useEffect, useRef } = React;

// ── CHARACTER DATA ─────────────────────────────
const characters = [
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    nameJp: 'モンキー・D・ルフィ',
    series: 'One Piece',
    img: 'images/luffy.jpg',
    bio: 'The future King of the Pirates. After eating the Gomu Gomu no Mi — revealed to be the Hito Hito no Mi, Model: Nika — Luffy awakened a power that makes him the most dangerous man in the world. His Gear 5 transformation embodies the sun god himself.',
    abilities: ['Gear 5', 'Haki', 'Gomu Gomu', 'Sun God Nika', 'Conquerors Haki'],
    score: '9.8',
    scoreLabel: 'Community Score'
  },
  {
    id: 'gojo',
    name: 'Satoru Gojo',
    nameJp: '五条 悟',
    series: 'Jujutsu Kaisen',
    img: 'images/gojo.jpg',
    bio: 'The strongest jujutsu sorcerer in history. Gojo\'s Six Eyes grant him perfect perception of cursed energy while his Infinity — an automatic barrier making every attack infinitely slow — renders him effectively untouchable. He once stated he could take on the entire jujutsu world alone.',
    abilities: ['Infinity', 'Six Eyes', 'Domain Expansion', 'Red / Blue', 'Hollow Purple'],
    score: '9.5',
    scoreLabel: 'Community Score'
  },
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    nameJp: '竈門 炭治郎',
    series: 'Demon Slayer',
    img: 'images/tanjiro-fire.jpg',
    bio: 'A young demon slayer who carries the weight of his slaughtered family and the burden of his demon sister Nezuko. Tanjiro mastered Total Concentration Breathing and ultimately unlocked the lost Sun Breathing style — the original form that all other breathing techniques descend from.',
    abilities: ['Sun Breathing', 'Water Breathing', 'Hinokami Kagura', 'Total Concentration', 'Demon Slayer Mark'],
    score: '9.4',
    scoreLabel: 'Community Score'
  },
  {
    id: 'kaneki',
    name: 'Ken Kaneki',
    nameJp: '金木 研',
    series: 'Tokyo Ghoul',
    img: 'images/tokyo-ghoul-2.jpg',
    bio: 'Once a timid bookworm, Ken Kaneki became the most powerful ghoul in existence after a series of brutal transformations. His Kakuja form — the Dragon — threatened to destroy all of Tokyo. A being caught between two worlds, belonging fully to neither.',
    abilities: ['Kakuja', 'Rinkaku Kagune', 'Regeneration', 'Dragon Form', 'Centipede Mode'],
    score: '9.1',
    scoreLabel: 'Community Score'
  },
  {
    id: 'mikasa',
    name: 'Mikasa Ackerman',
    nameJp: 'ミカサ・アッカーマン',
    series: 'Attack on Titan',
    img: 'images/mikasa.png',
    bio: 'The last descendant of the Shogunate\'s bloodline in Paradis and humanity\'s greatest soldier. The Ackerman bloodline grants her a superhuman awakening — unlocking power beyond any normal human limit. She scored at the top of her cadet class in every single category.',
    abilities: ['Ackerman Power', 'ODM Mastery', 'Thunder Spears', 'Combat Instinct', 'Anti-Titan'],
    score: '9.3',
    scoreLabel: 'Community Score'
  }
];

// ── CHARACTER TABS COMPONENT ───────────────────
function CharacterTabs() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const char = characters[active];

  function switchChar(idx) {
    if (idx === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 250);
  }

  return React.createElement('div', { className: 'char-component' },

    // Tabs
    React.createElement('div', { className: 'char-tabs' },
      characters.map((c, i) =>
        React.createElement('button', {
          key: c.id,
          className: `char-tab${i === active ? ' active' : ''}`,
          onClick: () => switchChar(i)
        }, c.series)
      )
    ),

    // Panel
    React.createElement('div', {
      className: 'char-panel',
      style: { opacity: animating ? 0 : 1, transition: 'opacity .25s ease' }
    },

      // Image
      React.createElement('div', { className: 'char-panel-img' },
        React.createElement('img', {
          src: char.img,
          alt: char.name,
          style: { objectPosition: char.id === 'mikasa' ? 'top' : 'center' }
        }),
        React.createElement('div', { className: 'char-panel-img-overlay' })
      ),

      // Info
      React.createElement('div', { className: 'char-panel-info' },
        React.createElement('div', { className: 'char-series-label' }, char.series),
        React.createElement('h3', { className: 'char-name' }, char.name),
        React.createElement('div', { className: 'char-name-jp' }, char.nameJp),
        React.createElement('p', { className: 'char-bio' }, char.bio),

        React.createElement('div', { className: 'char-abilities' },
          char.abilities.map(a =>
            React.createElement('span', { key: a, className: 'char-ability' }, a)
          )
        ),

        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: '10px' } },
          React.createElement('span', { className: 'char-score' }, '★ ' + char.score),
          React.createElement('span', { style: { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)', fontFamily: 'var(--font-ui)', fontWeight: 700 } }, char.scoreLabel)
        )
      )
    )
  );
}

// ── LIVE STATS TICKER COMPONENT ────────────────
function StatsTicker() {
  const stats = [
    { label: 'Members Online', value: '12,847', live: true },
    { label: 'Episodes Tracked', value: '1.2M+', live: false },
    { label: 'New This Season', value: '38 Series', live: true },
  ];

  const [counts, setCounts] = useState(stats.map(s => s.value));

  useEffect(() => {
    // Simulate live fluctuation on "online" stat
    const interval = setInterval(() => {
      setCounts(prev => prev.map((v, i) => {
        if (!stats[i].live) return v;
        const base = 12000 + Math.floor(Math.random() * 2000);
        return base.toLocaleString();
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return React.createElement('div', { className: 'stats-ticker' },
    stats.map((s, i) =>
      React.createElement('div', { key: i, className: 'ticker-item' },
        s.live && React.createElement('span', { className: 'ticker-dot' }),
        React.createElement('span', null, s.label + ': '),
        React.createElement('span', { style: { color: 'var(--white)', marginLeft: '4px' } }, counts[i])
      )
    )
  );
}

// ── MOUNT COMPONENTS ──────────────────────────
const charRoot = document.getElementById('react-characters');
if (charRoot) {
  ReactDOM.createRoot(charRoot).render(React.createElement(CharacterTabs));
}

const statsRoot = document.getElementById('react-stats');
if (statsRoot) {
  ReactDOM.createRoot(statsRoot).render(React.createElement(StatsTicker));
}
