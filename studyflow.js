    const _IC = {
      close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      settings: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
      ext: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
      aiClaude: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>',
      aiGemini: '<path d="m12 3-1.9 5.8-6 2.1 6 2.1L12 18.7l1.9-5.8 6-2.1-6-2.1L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
      aiGroq: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      presetTwitter: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      presetInstagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
      presetFacebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
      presetYoutube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 9 15 12 10 15 10 9" fill="currentColor" stroke="none"/>',
      presetTiktok: '<path d="M9 18V5l12-2v13.5"/><path d="M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M18 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>',
      presetReddit: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5"/>',
      presetNetflix: '<rect width="20" height="15" x="2" y="5" rx="2"/><path d="M12 5v15"/><path d="M2 10h20"/>',
      presetPoki: '<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="12" y2="12"/><rect width="20" height="12" x="2" y="6" rx="2"/>',
      presetTwitch: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m11 9 4 3-4 3V9Z"/>',
      presetDiscord: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/>',
      presetSnapchat: '<path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L18 21l3-3V10a8 8 0 0 0-8-8z"/>',
      presetPinterest: '<path d="M12 22s8-6 8-11a8 8 0 1 0-16 0c0 5 8 11 8 11"/><circle cx="12" cy="10" r="3"/>',
      esc1: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
      esc2: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
      esc3: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
      esc4: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
      esc5: '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>',
      esc6: '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z"/><path d="m15 9-6 6M9 9l6 6"/>',
      mileSprout: '<path d="M12 22v-5"/><path d="M9 17c-2-3-1-7 3-10"/><path d="M15 17c2-3 1-7-3-10"/>',
      mileBolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      mileFlame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 12 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
      mileGem: '<path d="M6 3h12l4 6-10 13L2 9l4-6z"/><path d="M11 3 8 9l4 13 4-13-3-6"/>',
      mileCrown: '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
      themeMidnight: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
      themeSakura: '<path d="M12 8c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4Z"/><path d="M12 2v3M12 19v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M2 12h3M19 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
      themeOcean: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
      themeSunset: '<path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/><path d="M4 20h16"/>',
      themeForest: '<path d="M12 22v-8"/><path d="M8 18h8"/><path d="m10 10 2-8 2 8"/><path d="M8 14h8"/>',
      themeY2k: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
      themeLatte: '<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>',
      themeGalaxy: '<path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/><path d="m5.6 5.6.7.7"/><path d="m17.7 17.7.7.7"/><path d="m18.4 5.6-.7.7"/><path d="M6.3 17.7l-.7.7"/><circle cx="12" cy="12" r="4"/>',
      themeSlate: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
      themeEmber: '<path d="M8.5 14.5A2.5 2.5 0 0 0 12 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
      themeMint: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
      themeNoir: '<path d="M6 4h12"/><path d="M6 4a2 2 0 0 0-2 2v11a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a2 2 0 0 0-2-2"/><path d="M6 4v4a6 6 0 0 0 12 0V4"/>'
    };
    function svgIcon(name, w, h, c) {
      w = w || 16; h = h || 16;
      const cls = c ? (' ' + c) : '';
      const inner = _IC[name] || _IC.check;
      const sw = (w + h) <= 28 ? 1.75 : 2;
      return '<svg class="ico' + cls + '" width="' + w + '" height="' + h + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
    }
    const PAL = ['#63ff88', '#ff4757', '#ffa502', '#18dcff', '#a855f7', '#ff6b9d', '#ffd32a', '#4ade80'];

    const MODES = {
      pomodoro: { study: 25, break: 5 },
      short: { study: 15, break: 3 },
      long: { study: 50, break: 10 },
      custom: { study: 45, break: 10 }
    };

    // Cursive label variants for the timer
    const FOCUS_LABELS = ['stay in the flow', 'deep work mode', 'you\'ve got this', 'lock in', 'make it count', 'one thing at a time'];
    const BREAK_LABELS = ['breathe easy', 'rest well', 'take a moment', 'you earned it', 'recharge'];

    // AI providers
    const AI_PROVIDERS = {
      claude: {
        id: 'claude', name: 'Claude', icon: 'aiClaude',
        color: 'var(--violet)',
        desc: 'Anthropic\'s Claude — witty, sharp, and genuinely helpful.',
        model: 'claude-sonnet-4-20250514',
        placeholder: 'sk-ant-api03-…',
        keyLabel: 'Anthropic API Key',
        hint: 'Get a free key at <a href="https://console.anthropic.com" target="_blank" style="color:var(--sky)">console.anthropic.com</a>',
        accentA: 'rgba(168,85,247,0.15)', accentB: 'rgba(168,85,247,0.3)', accentC: 'var(--violet)',
        setupSteps: [
          'Go to <b>console.anthropic.com</b> and sign up / log in.',
          'Click <b>API Keys</b> in the sidebar.',
          'Click <b>Create Key</b>, name it anything.',
          'Copy the key (starts with <code>sk-ant-</code>) and paste it below.',
          'The free tier includes enough credits to use StudyFlow daily.'
        ]
      },
      gemini: {
        id: 'gemini', name: 'Gemini', icon: 'aiGemini',
        color: 'var(--sky)',
        desc: 'Google Gemini — fast, capable, generous free tier.',
        model: 'gemini-2.0-flash',
        placeholder: 'AIza…',
        keyLabel: 'Google AI API Key',
        hint: 'Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--sky)">aistudio.google.com</a>',
        accentA: 'rgba(24,220,255,0.1)', accentB: 'rgba(24,220,255,0.25)', accentC: 'var(--sky)',
        setupSteps: [
          'Go to <b>aistudio.google.com/app/apikey</b> and sign in with Google.',
          'Click <b>Create API key</b>.',
          'Copy the key (starts with <code>AIza</code>) and paste it below.',
          'Gemini 2.0 Flash is free with generous limits — perfect for daily use.'
        ]
      },
      groq: {
        id: 'groq', name: 'Groq', icon: 'aiGroq',
        color: 'var(--amber)',
        desc: 'Groq — ultra-fast inference, generous free tier, open models.',
        model: 'llama-3.3-70b-versatile',
        placeholder: 'gsk_…',
        keyLabel: 'Groq API Key',
        hint: 'Get a free key at <a href="https://console.groq.com/keys" target="_blank" style="color:var(--sky)">console.groq.com</a>',
        accentA: 'rgba(255,165,2,0.12)', accentB: 'rgba(255,165,2,0.3)', accentC: 'var(--amber)',
        setupSteps: [
          'Go to <b>console.groq.com</b> and sign up / log in.',
          'Click <b>API Keys</b> in the sidebar.',
          'Click <b>Create API Key</b>, name it anything.',
          'Copy the key (starts with <code>gsk_</code>) and paste it below.',
          'Groq offers a generous free tier — great for daily StudyFlow use.'
        ]
      }
    };

    // Block presets
    const BLOCK_PRESETS = [
      { id: 'twitter', label: 'Twitter / X', domain: 'twitter.com', icon: 'presetTwitter' },
      { id: 'instagram', label: 'Instagram', domain: 'instagram.com', icon: 'presetInstagram' },
      { id: 'facebook', label: 'Facebook', domain: 'facebook.com', icon: 'presetFacebook' },
      { id: 'youtube', label: 'YouTube', domain: 'youtube.com', icon: 'presetYoutube' },
      { id: 'tiktok', label: 'TikTok', domain: 'tiktok.com', icon: 'presetTiktok' },
      { id: 'reddit', label: 'Reddit', domain: 'reddit.com', icon: 'presetReddit' },
      { id: 'netflix', label: 'Netflix', domain: 'netflix.com', icon: 'presetNetflix' },
      { id: 'poki', label: 'Poki Games', domain: 'poki.com', icon: 'presetPoki' },
      { id: 'twitch', label: 'Twitch', domain: 'twitch.tv', icon: 'presetTwitch' },
      { id: 'discord', label: 'Discord', domain: 'discord.com', icon: 'presetDiscord' },
      { id: 'snapchat', label: 'Snapchat', domain: 'snapchat.com', icon: 'presetSnapchat' },
      { id: 'pinterest', label: 'Pinterest', domain: 'pinterest.com', icon: 'presetPinterest' },
    ];

    const ESC_DATA = [
      ['esc1', 'Excuse me?', "You literally just started. The tab's still warm."],
      ['esc2', 'Really? REALLY?', "That's attempt #2. The material isn't going to learn itself, you know."],
      ['esc3', "You've got to be kidding me.", "Three times. You've tried to leave three times. Your exam doesn't care about your attention span."],
      ['esc4', "Bro. Come on.", "Four escape attempts in one session. This is a cry for help. The help is: stay and study."],
      ['esc5', "I genuinely don't know what to say.", "Five. You've tried to leave five times. I've seen goldfish with better focus. Please."],
      ['esc6', "You know what? Fine.", "Six attempts. I give up. You clearly hate yourself. Click 'Leave (coward)' and rethink your life choices."],
    ];

    const LOCK_QUOTES = [
      { q: "You're still here! I'm actually shocked.", a: "— Flux, genuinely surprised" },
      { q: "The internet will still be there after this session. Shocking, I know.", a: "— Flux" },
      { q: "Your future self is watching. They look disappointed.", a: "— Flux, being honest" },
      { q: "Fun fact: the person who's most distracted usually needs to study the most.", a: "— Flux" },
      { q: "That YouTube video? It'll still be there in 25 minutes. I promise.", a: "— Flux, reluctantly" },
      { q: "Every minute you spend here is a minute your grades don't drop. Math.", a: "— Flux" },
      { q: "This is uncomfortable. Good. Being comfortable wasn't getting you anywhere.", a: "— Flux" },
    ];

    // ─── STATE ────────────────────────────────────
    let DB = {
      name: '', aiProvider: 'claude', apiKeys: { claude: '', gemini: '', groq: '' }, theme: 'midnight',
      sessions: [], subjects: [],
      streak: 0, lastStudyDate: null, studiedDates: [],
      blockedSites: [], setupDone: false,
      eduYoutubeEnabled: true,
      eduYoutubeExtra: [],
      parental: null
    };

    const PARENTAL_DEFAULTS = {
      enabled: false,
      passwordHash: '',
      lockTimer: true,
      features: {
        ai: false,
        web: false,
        stats: false,
        streak: false,
        block: false,
        settings: false,
        subjects: false,
        timerModes: false
      }
    };

    const PARENTAL_FEATURE_DEFS = [
      { key: 'ai', label: 'Flux AI chat', tab: 'ai' },
      { key: 'web', label: 'Web browser', tab: 'web' },
      { key: 'stats', label: 'Stats & charts', tab: 'stats' },
      { key: 'streak', label: 'Streak page', tab: 'streak' },
      { key: 'block', label: 'Edit block list', tab: 'block' },
      { key: 'settings', label: 'Settings & themes' },
      { key: 'subjects', label: 'Add or edit subjects' },
      { key: 'timerModes', label: 'Change timer mode (Pomodoro, Custom, etc.)' }
    ];

    let pendingParentalAction = null;
    // Legacy migration: DB.apiKey → DB.apiKeys.claude
    function loadDB() {
      try {
        const d = localStorage.getItem('sf5');
        if (d) {
          const parsed = JSON.parse(d);
          DB = { ...DB, ...parsed };
          // migrate old single key
          if (parsed.apiKey && !parsed.apiKeys) {
            DB.apiKeys = { claude: parsed.apiKey || '', gemini: '', groq: '' };
            delete DB.apiKey;
          }
          if (!DB.apiKeys) DB.apiKeys = { claude: '', gemini: '', groq: '' };
          if (!DB.apiKeys.groq) DB.apiKeys.groq = '';
          if (DB.eduYoutubeEnabled === undefined) DB.eduYoutubeEnabled = true;
          if (!DB.eduYoutubeExtra) DB.eduYoutubeExtra = [];
          if (DB.theme === 'azure') DB.theme = 'midnight';
        }
      } catch (e) { }
      if (!DB.parental) DB.parental = JSON.parse(JSON.stringify(PARENTAL_DEFAULTS));
    }

    function getParental() {
      if (!DB.parental) DB.parental = JSON.parse(JSON.stringify(PARENTAL_DEFAULTS));
      if (!DB.parental.features) DB.parental.features = { ...PARENTAL_DEFAULTS.features };
      return DB.parental;
    }

    async function hashParentalPw(pw) {
      const text = String(pw ?? '').trim();
      if (!crypto?.subtle) throw new Error('crypto_unavailable');
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    function isParentalOn() {
      const p = getParental();
      return !!p.enabled && !!p.passwordHash;
    }

    function isParentalFeatureOn(key) {
      if (!isParentalOn()) return true;
      return getParental().features[key] === true;
    }

    function isParentalTimerLocked() {
      return isParentalOn() && getParental().lockTimer !== false && isRun;
    }

    function requestParentalPassword(title, hint, onSuccess) {
      pendingParentalAction = onSuccess;
      showModal(`
        <div class="mtop"><div class="mttl">${title}</div><button class="mclose" data-action="close-modal">✕</button></div>
        <p class="parental-hint">${hint}</p>
        <div class="mfield"><div class="mflbl">Parent password</div>
          <input class="inp" id="parentalPwInp" type="password" autocomplete="off" placeholder="Enter password"></div>
        <div id="parentalPwErr" class="warn-pw-err"></div>
        <button type="button" class="go-btn" style="width:100%" data-action="parental-confirm-password">Unlock</button>
      `);
      setTimeout(() => document.getElementById('parentalPwInp')?.focus(), 80);
    }

    async function verifyParentalPassword(pw) {
      const hash = await hashParentalPw(pw);
      const stored = String(getParental().passwordHash || '');
      return !!stored && hash === stored;
    }

    async function confirmParentalPassword() {
      const errEl = document.getElementById('parentalPwErr');
      const pwInp = document.getElementById('parentalPwInp');
      const pw = (pwInp?.value || '').trim();
      if (!pw) {
        if (errEl) errEl.textContent = 'Enter the password.';
        return;
      }
      try {
        if (!(await verifyParentalPassword(pw))) {
          if (errEl) errEl.textContent = 'Wrong password — try again.';
          showToast('Wrong password');
          return;
        }
      } catch (_) {
        if (errEl) errEl.textContent = 'Could not verify password.';
        showToast('Could not verify password');
        return;
      }
      if (errEl) errEl.textContent = '';
      const fn = pendingParentalAction;
      pendingParentalAction = null;
      closeModal();
      if (fn) {
        try { fn(); } catch (e) { console.error(e); showToast('Action failed — try again.'); }
      }
    }

    function guardParentalTimer(hint, fn) {
      if (!isParentalTimerLocked()) {
        fn();
        return;
      }
      requestParentalPassword('Parent password required', hint, fn);
    }

    function parentalChecksHtml() {
      const feats = getParental().features;
      return PARENTAL_FEATURE_DEFS.map((f) => `
        <label class="parental-check">
          <input type="checkbox" data-parental-feat="${f.key}" ${feats[f.key] ? 'checked' : ''}>
          <span>Allow: ${f.label}</span>
        </label>
      `).join('');
    }

    function readParentalChecksFromModal() {
      const feats = { ...PARENTAL_DEFAULTS.features };
      document.querySelectorAll('[data-parental-feat]').forEach((inp) => {
        feats[inp.dataset.parentalFeat] = inp.checked;
      });
      return feats;
    }

    function openParentalGate() {
      if (!isParentalOn()) {
        openParentalSetupModal(false);
        return;
      }
      requestParentalPassword('Parental mode', 'Enter the parent password to change settings or turn off parental mode.', () => {
        openParentalSetupModal(true);
      });
    }

    function openParentalSetupModal(unlocked) {
      const p = getParental();
      const hasPw = !!p.passwordHash;
      showModal(`
        <div class="mtop"><div class="mttl">Parental mode</div><button class="mclose" data-action="close-modal">✕</button></div>
        <p class="parental-hint">Parents set a password and choose what the student can use. While the timer is running, pause, reset, and skip require the password.</p>
        ${!hasPw || !unlocked ? `
        <div class="mfield"><div class="mflbl">Create parent password</div>
          <input class="inp" id="parentalNewPw" type="password" autocomplete="new-password" placeholder="At least 4 characters"></div>
        <div class="mfield"><div class="mflbl">Confirm password</div>
          <input class="inp" id="parentalNewPw2" type="password" autocomplete="new-password" placeholder="Confirm password"></div>
        ` : `
        <div class="mfield"><div class="mflbl">Change password (optional)</div>
          <input class="inp" id="parentalNewPw" type="password" autocomplete="new-password" placeholder="Leave blank to keep current"></div>
        <div class="mfield"><div class="mflbl">Confirm new password</div>
          <input class="inp" id="parentalNewPw2" type="password" autocomplete="new-password" placeholder="Confirm if changing"></div>
        `}
        <label class="parental-lock-row">
          <input type="checkbox" id="parentalLockTimer" ${p.lockTimer !== false ? 'checked' : ''}>
          <span>Require password to pause, reset, skip, or end timer</span>
        </label>
        <div class="mflbl" style="margin-bottom:8px">Allow these features (unchecked = hidden &amp; blocked)</div>
        <div class="parental-checks">${parentalChecksHtml()}</div>
        <div id="parentalSaveErr" class="warn-pw-err"></div>
        <button type="button" class="go-btn" style="width:100%;margin-bottom:8px" data-action="parental-save">${isParentalOn() ? 'Save parental settings' : 'Turn on parental mode'}</button>
        ${isParentalOn() ? '<button type="button" class="go-btn" style="width:100%;background:var(--s2);color:var(--dim);border:1px solid var(--bd)" data-action="parental-disable">Turn off parental mode</button>' : ''}
      `);
    }

    function setParentalSaveErr(msg) {
      const el = document.getElementById('parentalSaveErr');
      if (el) el.textContent = msg || '';
      if (msg) showToast(msg);
    }

    async function saveParentalSettings() {
      const errEl = document.getElementById('parentalSaveErr');
      if (errEl) errEl.textContent = '';
      const p = getParental();
      const pw1 = (document.getElementById('parentalNewPw')?.value || '').trim();
      const pw2 = (document.getElementById('parentalNewPw2')?.value || '').trim();
      try {
        if (!p.passwordHash) {
          if (pw1.length < 4) { setParentalSaveErr('Password must be at least 4 characters.'); return; }
          if (pw1 !== pw2) { setParentalSaveErr('Passwords do not match.'); return; }
          p.passwordHash = await hashParentalPw(pw1);
        } else if (pw1) {
          if (pw1.length < 4) { setParentalSaveErr('New password must be at least 4 characters.'); return; }
          if (pw1 !== pw2) { setParentalSaveErr('New passwords do not match.'); return; }
          p.passwordHash = await hashParentalPw(pw1);
        }
        p.lockTimer = document.getElementById('parentalLockTimer')?.checked !== false;
        p.features = readParentalChecksFromModal();
        p.enabled = true;
        saveDB();
        applyParentalUI();
        closeModal();
        showToast('Parental settings saved.');
      } catch (_) {
        setParentalSaveErr('Could not save — try again.');
      }
    }

    function disableParentalFromSettings() {
      getParental().enabled = false;
      saveDB();
      applyParentalUI();
      closeModal();
      showToast('Parental mode turned off');
    }

    function applyParentalUI() {
      const on = isParentalOn();
      const badge = document.getElementById('parentalOnBadge');
      if (badge) badge.style.display = on ? 'inline-flex' : 'none';

      const tabMap = { ai: 'ai', web: 'web', stats: 'stats', streak: 'streak', block: 'block' };
      Object.entries(tabMap).forEach(([tab, key]) => {
        const show = isParentalFeatureOn(key);
        ['sb-' + tab, 'mnb-' + tab].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.style.display = show ? '' : 'none';
        });
      });

      document.querySelectorAll('[data-action="open-settings"], [data-action="open-theme-picker"]').forEach((el) => {
        el.style.display = isParentalFeatureOn('settings') ? '' : 'none';
      });
      document.querySelectorAll('.chip[data-action="set-mode"]').forEach((el) => {
        el.style.display = isParentalFeatureOn('timerModes') ? '' : 'none';
      });
      const addSub = document.querySelector('[data-action="open-add-sub"]');
      if (addSub) addSub.style.display = isParentalFeatureOn('subjects') ? '' : 'none';

      if (on) {
        const activeView = document.querySelector('.view.active');
        const id = activeView?.id?.replace('view-', '') || 'timer';
        const key = tabMap[id];
        if (key && !isParentalFeatureOn(key)) showTab('timer', document.getElementById('sb-timer'), true);
      }
    }

    function saveDB() {
      localStorage.setItem('sf5', JSON.stringify(DB));
      syncShield();
      pushBlockedDomainsToBackground();
    }

    // ─── Chrome extension bridge (real browser blocking) ───
    function extAvailable() {
      return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
    }

    function desktopAvailable() {
      return typeof studyflowDesktop !== 'undefined' && studyflowDesktop && studyflowDesktop.isDesktop;
    }

    async function syncShield() {
      const payload = {
        active: isRun && !isBreak,
        running: isRun,
        onBreak: isBreak,
        domains: DB.blockedSites || []
      };
      if (desktopAvailable()) {
        try { await studyflowDesktop.syncShield(payload); } catch (_) { }
        return;
      }
      if (!extAvailable()) return;
      try {
        await chrome.runtime.sendMessage({ type: 'SYNC_SHIELD', ...payload });
      } catch (_) { }
    }

    async function pushBlockedDomainsToBackground() {
      if (desktopAvailable()) {
        try {
          await studyflowDesktop.setBlockedDomains(DB.blockedSites || []);
          await studyflowDesktop.syncShield({
            active: isRun && !isBreak,
            running: isRun,
            onBreak: isBreak,
            domains: DB.blockedSites || []
          });
        } catch (_) { }
        return;
      }
      if (!extAvailable()) {
        if (webExtBridgeReady) {
          try {
            await webExtSendMessage({ type: 'SET_BLOCKED_DOMAINS', domains: DB.blockedSites || [] });
            await webExtSendMessage({
              type: 'SYNC_EDU_YOUTUBE',
              enabled: DB.eduYoutubeEnabled !== false,
              extra: DB.eduYoutubeExtra || []
            });
            await webExtSendMessage({ type: 'REGISTER_STUDY_TAB' });
          } catch (_) { }
        }
        return;
      }
      try {
        await chrome.runtime.sendMessage({
          type: 'SET_BLOCKED_DOMAINS',
          domains: DB.blockedSites || []
        });
        await chrome.runtime.sendMessage({
          type: 'SYNC_EDU_YOUTUBE',
          enabled: DB.eduYoutubeEnabled !== false,
          extra: DB.eduYoutubeExtra || []
        });
        await chrome.runtime.sendMessage({ type: 'REGISTER_STUDY_TAB' });
      } catch (_) { }
    }

    function youtubeHubUrl(refresh) {
      let url = extAvailable() ? chrome.runtime.getURL('youtube-study.html') : 'youtube-study.html';
      if (desktopAvailable()) {
        try { url = new URL('youtube-study.html', window.location.href).href; } catch (_) {}
      }
      if (refresh) url += (url.includes('?') ? '&' : '?') + '_=' + Date.now();
      return url;
    }

    function isYoutubePageUrl(url) {
      if (!url || url.includes('youtube-study.html')) return false;
      try {
        const h = new URL(url).hostname.replace(/^www\./, '');
        return h === 'youtube.com' || h === 'youtu.be' || h === 'm.youtube.com';
      } catch (_) { return false; }
    }

    function normalizeYoutubeEntryUrl(url) {
      if (!url || !isEduYoutubeEnabled() || typeof EduYoutube === 'undefined') return url;
      const p = EduYoutube.parseYoutube(url);
      if (!p.isYoutube) return url;
      if (p.pathType === 'home') return youtubeHubUrl();
      return url;
    }

    function isEduYoutubeEnabled() {
      return DB.eduYoutubeEnabled !== false && typeof EduYoutube !== 'undefined';
    }

    function checkYoutubeForWeb(url) {
      return new Promise((resolve) => {
        if (!isEduYoutubeEnabled()) {
          resolve({ allowed: true });
          return;
        }
        const hub = youtubeHubUrl();
        const sync = EduYoutube.checkUrlSync(url, DB.eduYoutubeExtra, hub);
        if (sync.decided) {
          resolve(sync);
          return;
        }
        if (webExtActive()) {
          webExtSendMessage({ type: 'CHECK_YOUTUBE_URL', url }).then((res) => {
            resolve(res || { allowed: false, reason: 'Could not verify channel.' });
          });
          return;
        }
        EduYoutube.checkUrlAsync(url, DB.eduYoutubeExtra || [], hub)
          .then(resolve)
          .catch(() => resolve({ allowed: false, reason: 'Could not verify this video.' }));
      });
    }

    async function applyYoutubeGuardResult(yt, frame) {
      if (!yt || yt.allowed) return true;
      if (yt.redirect) {
        await webLoadUrl(yt.redirect, { push: false, displayInBar: 'Study YouTube', skipYoutubeCheck: true });
        return false;
      }
      showYoutubeBlocked(yt.reason, yt.channelName, yt.redirect);
      return false;
    }

    function guardWebviewYoutubeNavigateSync(url) {
      if (!url || url.includes('youtube-study.html')) return true;
      if (!isEduYoutubeEnabled() || !isYoutubePageUrl(url)) return true;
      const sync = EduYoutube.checkUrlSync(url, DB.eduYoutubeExtra, youtubeHubUrl());
      if (!sync.decided) return true;
      return !!sync.allowed;
    }

    async function guardWebviewYoutubeUrl(url, frame) {
      if (!url || url.includes('youtube-study.html')) return true;
      if (!isEduYoutubeEnabled() || !isYoutubePageUrl(url)) return true;
      const yt = await checkYoutubeForWeb(url);
      return applyYoutubeGuardResult(yt, frame);
    }

    let webLoadSafetyTimer = null;
    function armWebLoadSafetyTimer() {
      if (webLoadSafetyTimer) clearTimeout(webLoadSafetyTimer);
      webLoadSafetyTimer = setTimeout(() => {
        webLoadSafetyTimer = null;
        setWebLoading(false);
      }, 12000);
    }

    async function syncWebviewStudyData(wv) {
      if (!isWebViewEl(wv)) return;
      try {
        const payload = JSON.stringify(DB);
        await wv.executeJavaScript(
          'try { localStorage.setItem("sf5", ' + JSON.stringify(payload) + '); } catch (e) {}',
          true
        );
        if ((wv.getURL() || '').includes('youtube-study.html')) {
          wv.executeJavaScript(
            'window.dispatchEvent(new MessageEvent("message",{data:{type:"SF_EDU_YT_SYNC",extra:'
            + JSON.stringify(DB.eduYoutubeExtra || [])
            + '}}));'
          ).catch(() => {});
        }
      } catch (_) {}
    }

    let webviewGuardInjecting = false;
    async function injectWebviewYoutubeGuard(wv) {
      if (!isWebViewEl(wv) || !isEduYoutubeEnabled() || webviewGuardInjecting) return;
      const url = wv.getURL() || '';
      if (!isYoutubePageUrl(url) || url.includes('youtube-study.html')) return;
      try {
        const installed = await wv.executeJavaScript('!!window.__sfYtGuardInstalled', true);
        if (installed) return;
        webviewGuardInjecting = true;
        const scriptUrl = new URL('youtube-web-guard.js', window.location.href).href;
        const res = await fetch(scriptUrl);
        if (!res.ok) return;
        const code = await res.text();
        await wv.executeJavaScript(code + ';window.__sfYtGuardInstalled=true;');
      } catch (_) {
      } finally {
        webviewGuardInjecting = false;
      }
    }

    function registerStudyTab() {
      const payload = { type: 'REGISTER_STUDY_TAB', domains: DB.blockedSites || [] };
      if (extAvailable()) {
        chrome.runtime.sendMessage(payload).catch(() => {});
        return;
      }
      if (webExtBridgeReady) void webExtSendMessage(payload);
    }

    let pageFocusPollId = null;
    let lastFocusPingAt = 0;
    let fullscreenGuardId = null;
    let lastFullscreenReentryAt = 0;

    function isFocusLocked() {
      return isRun && !isBreak && !enforcementPaused;
    }

    function isWebTabActive() {
      return document.getElementById('view-web')?.classList.contains('active') === true;
    }

    function shouldReportFocusLost() {
      if (!isFocusLocked()) return false;
      if (isWebTabActive()) return false;
      return true;
    }

    let lastAppSwitchWarnAt = 0;

    function handleAppSwitchAttempt() {
      if (!isFocusLocked() || isWebTabActive()) return;
      const now = Date.now();
      if (now - lastAppSwitchWarnAt < 1200) return;
      lastAppSwitchWarnAt = now;
      escCount++;
      silentRelockFullscreen();
      showEscWarn(false);
    }

    async function isInFocusFullscreen() {
      if (document.fullscreenElement) return true;
      if (!extAvailable()) return false;
      try {
        const win = await chrome.windows.getCurrent();
        return win?.state === 'fullscreen';
      } catch (_) {
        return false;
      }
    }

    async function requestStudyFullscreen() {
      if (extAvailable()) {
        try {
          const win = await chrome.windows.getCurrent();
          if (win?.id) {
            await chrome.windows.update(win.id, { state: 'fullscreen', focused: true });
            return;
          }
        } catch (_) { }
      }
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (!req) return;
      try {
        await req.call(el, { navigationUI: 'hide' });
      } catch (_) {
        try { await req.call(el); } catch (__) { }
      }
    }

    async function exitStudyFullscreen() {
      if (extAvailable()) {
        try {
          const win = await chrome.windows.getCurrent();
          if (win?.id && win.state === 'fullscreen') {
            await chrome.windows.update(win.id, { state: 'maximized', focused: true });
          }
        } catch (_) { }
      }
      try {
        if (document.fullscreenElement) await document.exitFullscreen?.();
      } catch (_) { }
    }

    function startFullscreenGuard() {
      stopFullscreenGuard();
      fullscreenGuardId = setInterval(() => {
        if (!isFocusLocked()) return;
        isInFocusFullscreen().then(ok => { if (!ok) requestStudyFullscreen(); });
      }, 350);
    }

    function stopFullscreenGuard() {
      if (fullscreenGuardId) clearInterval(fullscreenGuardId);
      fullscreenGuardId = null;
    }

    function silentRelockFullscreen() {
      if (!isFocusLocked()) return;
      const now = Date.now();
      if (now - lastFullscreenReentryAt < 400) return;
      lastFullscreenReentryAt = now;
      isInFocusFullscreen().then(ok => { if (!ok) requestStudyFullscreen(); });
    }

    function onFullscreenChange() {
      silentRelockFullscreen();
    }

    function enterChromeFocusMode() {
      registerStudyTab();
      hideEscWarn();
      document.documentElement.classList.add('sf-focus-locked');
      requestStudyFullscreen();
      startPageFocusPoll();
      if (isFocusLocked()) startFullscreenGuard();
    }

    function exitChromeFocusMode(force) {
      if (!force && isFocusLocked()) return;
      stopFullscreenGuard();
      stopPageFocusPoll();
      document.documentElement.classList.remove('sf-focus-locked');
      exitStudyFullscreen();
    }

    function applyFocusSessionLock() {
      hideLockSilent();
      hideEscWarn();
      enterChromeFocusMode();
    }

    async function forcePcUnlock() {
      if (desktopAvailable()) {
        try { await studyflowDesktop.forceUnlock(); } catch (_) { }
        return;
      }
      if (!extAvailable()) return;
      for (let i = 0; i < 8; i++) {
        try {
          await chrome.runtime.sendMessage({ type: 'FORCE_PC_UNLOCK' });
          const st = await chrome.runtime.sendMessage({ type: 'GET_PC_LOCK_STATUS' });
          if (!st?.locked) return;
        } catch (_) { }
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    async function downloadPcLockRepairKit() {
      const files = [
        'Repair-StudyFlow-Lock.bat',
        'Repair-StudyFlow-Lock.ps1',
        'StudyFlowLockHost.exe',
        'Compile-StudyFlowLock.ps1',
        'StudyFlowLockHost.cs'
      ];
      try {
        for (const name of files) {
          const blob = await fetchExtensionAsset('native-lock/' + name);
          triggerBlobDownload(blob, name);
          await new Promise((r) => setTimeout(r, 350));
        }
        showToast('Saved repair kit to Downloads — run Repair-StudyFlow-Lock.bat, then reload extension.');
      } catch (e) {
        showToast('Repair download failed — open native-lock folder and run Repair-StudyFlow-Lock.bat');
      }
    }

    async function emergencyUnlockAltTab() {
      await forcePcUnlock();
      try {
        const res = await fetch(chrome.runtime.getURL('native-lock/unlock-now.bat'));
        if (res.ok) {
          triggerBlobDownload(await res.blob(), 'Unlock-AltTab-NOW.bat');
        }
      } catch (_) { }
      updatePcLockStatus();
      showToast('Try Alt+Tab now. If stuck, run Unlock-AltTab-NOW.bat from Downloads.');
    }

    function releaseFocusSessionLock() {
      enforcementPaused = true;
      stopFullscreenGuard();
      hideLockSilent();
      hideEscWarn();
      exitChromeFocusMode(true);
      syncShield();
      setTimeout(() => { enforcementPaused = false; }, 400);
    }

    function blockFocusEscape(actionLabel) {
      if (!isFocusLocked()) return false;
      escCount++;
      requestStudyFullscreen();
      showEscWarn(false);
      showToast(actionLabel || 'Focus is locked until the timer ends.');
      return true;
    }

    function notifyChromeFocusLost() {
      if (!shouldReportFocusLost()) return;
      const now = Date.now();
      if (now - lastFocusPingAt < 200) return;
      lastFocusPingAt = now;
      if (extAvailable()) {
        chrome.runtime.sendMessage({ type: 'CHROME_FOCUS_LOST' }).catch(() => {});
      } else {
        handleAppSwitchAttempt();
      }
    }

    function startPageFocusPoll() {
      stopPageFocusPoll();
      pageFocusPollId = setInterval(() => {
        if (!isRun || isBreak) {
          stopPageFocusPoll();
          return;
        }
        if (!document.hasFocus() && shouldReportFocusLost()) notifyChromeFocusLost();
      }, 200);
    }

    function stopPageFocusPoll() {
      if (pageFocusPollId) clearInterval(pageFocusPollId);
      pageFocusPollId = null;
    }

    function resolveGoogleRedirectUrl(url) {
      if (!url) return url;
      try {
        const u = new URL(url);
        const host = u.hostname.replace(/^www\./, '');
        if (host !== 'google.com' && !host.endsWith('.google.com')) return url;
        if (u.pathname === '/url' || u.pathname.startsWith('/url')) {
          const dest = u.searchParams.get('q') || u.searchParams.get('url');
          if (dest) {
            if (/^https?:\/\//i.test(dest)) return dest;
            try { return new URL(dest, 'https://').href; } catch (_) {}
          }
        }
        if (u.pathname === '/aclk') {
          const adurl = u.searchParams.get('adurl');
          if (adurl && /^https?:\/\//i.test(adurl)) return adurl;
        }
      } catch (_) {}
      return url;
    }

    async function handleWebFrameNav(url) {
      const resolved = resolveGoogleRedirectUrl(url);
      if (!resolved || !/^https?:\/\//i.test(resolved)) return;
      const viewWeb = document.getElementById('view-web');
      if (!viewWeb?.classList.contains('active')) {
        pendingWebNavUrl = resolved;
        return;
      }
      pendingWebNavUrl = '';
      const frame = getWebBrowserEl();
      if (frame && !isWebViewEl(frame)) {
        try {
          const cur = frame.contentWindow?.location?.href;
          if (cur && webNavUrlsEqual(unwrapWebEmbedUrl(cur), resolved)) return;
        } catch (_) {}
      }
      const domain = hostnameFromUrl(resolved);
      if (isBlockedDomain(domain)) {
        webLastNavUrl = resolved;
        handleWebFrameBlocked(domain);
        return;
      }
      if (isEduYoutubeEnabled() && isYoutubePageUrl(resolved)) {
        const yt = await checkYoutubeForWeb(resolved);
        if (!yt.allowed) {
          if (yt.redirect) {
            webLoadUrl(yt.redirect, { push: true, displayInBar: 'Study YouTube', skipYoutubeCheck: true });
            return;
          }
          showYoutubeBlocked(yt.reason, yt.channelName, yt.redirect);
          return;
        }
      }
      if (webNavUrlsEqual(webCurrentUrl, resolved)) return;
      webLoadUrl(resolved, { push: true, displayInBar: resolved });
    }

    function initExtensionBridge() {
      if (!extAvailable()) return;
      try { window.__SF_WEB_EMBED_BASE = chrome.runtime.getURL('web-embed.html'); } catch (_) {}
      webExtBridgeReady = true;
      updateWebEmbedHint();
      registerStudyTab();
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg.type === 'WEB_FRAME_NAV' && msg.url) {
          handleWebFrameNav(msg.url);
          return;
        }
        if (msg.type === 'WEB_YOUTUBE_BLOCKED') {
          showYoutubeBlocked(msg.reason, msg.channelName, msg.redirect);
          return;
        }
        if (msg.type === 'WEB_FRAME_BLOCKED' && msg.domain) {
          handleWebFrameBlocked(msg.domain);
          return;
        }
        if (msg.type === 'APP_SWITCH_ATTEMPT') {
          if (!isWebTabActive()) handleAppSwitchAttempt();
          return;
        }
        if (msg.type !== 'SITE_BLOCKED') return;
        if (!isRun || isBreak) return;
        try {
          localStorage.setItem('sf_blocked_crumb', JSON.stringify({ domain: msg.domain, ts: Date.now() }));
        } catch (_) { }
        if (!msg.domain || msg.domain === lastCaughtDomain) return;
        lastCaughtDomain = msg.domain;
        blockedHitCount++;
        escCount++;
        if (document.visibilityState === 'visible') {
          triggerBlockedRoast(msg.domain, 0);
        }
      });
      registerStudyTab();
      syncShield();
      pushBlockedDomainsToBackground();
    }

    // timer
    let curMode = 'pomodoro', isRun = false, isBreak = false;
    let totalSec = 1500, rem = 1500, tickId = null, pomoC = 0, sessStart = null;
    let timerStartedAt = null, timerRemAtStart = 1500;
    let escCount = 0, lockVis = false, enforcementPaused = false;
    let escWarnMode = 'escape'; // 'escape' = tab/distraction, 'quit' = user stopped focus
    let chatHist = [], selColor = PAL[0];
    let setupBlocks = [], setupSubs = [], setupPresetSel = new Set();
    let setupSelectedProvider = 'claude';
    let setupSelectedTheme = 'midnight';

    // ─── SETUP DEFAULTS ───────────────────────────
    const DEF_SUBS = [
      { name: 'General', color: '#63ff88' }, { name: 'Math', color: '#18dcff' },
      { name: 'Science', color: '#a855f7' }, { name: 'English', color: '#ffa502' }
    ];

    // ─── BOOT (initUIEvents runs at end of file) ───
    loadDB();
    function boot() {
      if (DB.setupDone) { launchApp(); }
      else { initSetup(); }
    }

    // ─── SETUP ────────────────────────────────────

    function initSetup() {
      setupSubs = [...DEF_SUBS];
      renderSetupSubs();
      renderSetupPresets();
      renderSetupAiGrid();
      updateSetupKeyArea('claude');
      renderSetupThemeGrid();
    }

    function renderSetupThemeGrid() {
      const g = document.getElementById('setupThemeGrid');
      if (!g) return;
      g.innerHTML = THEMES.map(t => `
    <div data-action="select-setup-theme" data-theme="${t.id}" style="
      display:flex;align-items:center;gap:7px;
      padding:8px 12px;border-radius:11px;cursor:pointer;
      background:${setupSelectedTheme === t.id ? 'var(--s3)' : 'var(--s2)'};
      border:1.5px solid ${setupSelectedTheme === t.id ? 'var(--lime)' : 'var(--bd)'};
      font-size:12px;font-weight:700;color:${setupSelectedTheme === t.id ? 'var(--text)' : 'var(--dim)'};
      transition:all 0.18s;">
      <span class="setup-theme-ico">${svgIcon(t.icon, 15, 15)}</span>${t.name}
    </div>`).join('');
    }
    function selectSetupTheme(id, el) {
      setupSelectedTheme = id;
      applyTheme(id); // live preview!
      renderSetupThemeGrid();
    }

    function renderSetupSubs() {
      document.getElementById('subList').innerHTML = setupSubs.map((s, i) => `
    <div class="sub-item">
      <div class="sub-color" style="background:${s.color}" title="Change color" data-action="cycle-sub-color" data-sub-index="${i}"></div>
      <input class="sub-inp" type="text" value="${s.name}" placeholder="Subject name" data-sub-index="${i}">
      <button type="button" class="sdel" data-action="remove-sub" data-sub-index="${i}" aria-label="Remove">${svgIcon('close', 13, 13)}</button>
    </div>`).join('');
    }
    function cycleSubColor(i, el) {
      const cur = PAL.indexOf(setupSubs[i].color);
      setupSubs[i].color = PAL[(cur + 1) % PAL.length];
      el.style.background = setupSubs[i].color;
    }
    function addSubRow() {
      setupSubs.push({ name: '', color: PAL[setupSubs.length % PAL.length] });
      renderSetupSubs();
      setTimeout(() => { const ins = document.querySelectorAll('.sub-inp'); if (ins.length) ins[ins.length - 1].focus(); }, 60);
    }

    function renderSetupPresets() {
      const grid = document.getElementById('setupPresetGrid');
      if (!grid) return;
      grid.innerHTML = BLOCK_PRESETS.map(p => `
    <div class="preset-tag ${setupPresetSel.has(p.domain) ? 'sel' : ''}" data-action="toggle-setup-preset" data-domain="${p.domain}">
      <span class="preset-ico">${svgIcon(p.icon, 13, 13)}</span>${p.label}
    </div>`).join('');
    }
    function toggleSetupPreset(domain, el) {
      if (setupPresetSel.has(domain)) {
        setupPresetSel.delete(domain);
        el.classList.remove('sel');
      } else {
        setupPresetSel.add(domain);
        el.classList.add('sel');
      }
    }

    function addSetupBlock() {
      const inp = document.getElementById('setupBlockInp');
      const val = cleanDomain(inp.value);
      if (!val) return;
      if (setupBlocks.includes(val) || setupPresetSel.has(val)) { showToast('Already in the list'); return; }
      setupBlocks.push(val); renderSetupBtags(); inp.value = '';
    }
    function renderSetupBtags() {
      document.getElementById('setupBtags').innerHTML = setupBlocks.map((s, i) =>
        `<div class="btag">${s}<button type="button" data-action="remove-setup-block" data-index="${i}" aria-label="Remove">${svgIcon('close', 12, 12)}</button></div>`
      ).join('');
    }

    // ── SETUP AI PROVIDER ──
    function renderSetupAiGrid() {
      const grid = document.getElementById('setupAiGrid');
      if (!grid) return;
      grid.innerHTML = Object.values(AI_PROVIDERS).map(p => `
    <div class="ai-provider-card ${setupSelectedProvider === p.id ? 'selected' : ''}" data-action="select-setup-provider" data-provider="${p.id}">
      <div class="aip-icon" style="background:${p.accentA}">${svgIcon(p.icon, 20, 20)}</div>
      <div>
        <div class="aip-name">${p.name}</div>
        <div class="aip-desc">${p.desc}</div>
      </div>
    </div>`).join('');
    }
    function selectSetupProvider(id) {
      setupSelectedProvider = id;
      renderSetupAiGrid();
      updateSetupKeyArea(id);
      // Show info popup on first click for each provider
      const inp = document.getElementById('setupApiKey');
      if (inp && !inp.value.trim()) {
        // gently remind them how to get a key
        document.getElementById('setupKeyHint').innerHTML =
          AI_PROVIDERS[id].hint +
          ' &nbsp;·&nbsp; <span data-action="provider-setup-info" data-provider="' + id + '" style="color:var(--sky);cursor:pointer;text-decoration:underline;font-size:11px;display:inline-flex;align-items:center;gap:4px">Step-by-step guide ' + svgIcon('ext', 11, 11) + '</span>';
      }
    }
    function updateSetupKeyArea(id) {
      const p = AI_PROVIDERS[id];
      const lbl = document.getElementById('setupKeyLabel');
      const inp = document.getElementById('setupApiKey');
      const hint = document.getElementById('setupKeyHint');
      if (lbl) lbl.textContent = p.keyLabel;
      if (inp) { inp.placeholder = p.placeholder; }
      if (hint) hint.innerHTML = p.hint;
    }
    function showProviderSetupInfo(id) {
      const p = AI_PROVIDERS[id];
      showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div style="font-size:16px;font-weight:800">How to get a ${p.name} key</div>
      <button type="button" data-action="close-modal" class="modal-close" aria-label="Close">${svgIcon('close', 14, 14)}</button>
    </div>
    <div style="margin-bottom:16px">
      ${p.setupSteps.map((s, i) => `
        <div style="display:flex;gap:10px;margin-bottom:10px;align-items:flex-start">
          <div style="width:22px;height:22px;border-radius:50%;background:${p.accentA};border:1px solid ${p.accentB};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;color:${p.accentC};margin-top:1px">${i + 1}</div>
          <div style="font-size:13px;color:var(--dim);line-height:1.55">${s}</div>
        </div>`).join('')}
    </div>
    <div style="padding:12px 14px;background:var(--s2);border:1px solid var(--bd);border-radius:10px;font-size:11px;color:var(--mut);line-height:1.6;margin-bottom:14px;display:flex;gap:10px;align-items:flex-start">
      <span style="flex-shrink:0;margin-top:2px;color:var(--dim)">${svgIcon('lock', 14, 14)}</span>
      <span>Your API key is stored <strong style="color:var(--dim)">only on this device</strong> in localStorage. It is never sent anywhere except directly to ${p.name}'s API.</span>
    </div>
    <button data-action="close-modal" style="width:100%;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--lime),var(--lime2));border:none;color:#000;font-family:var(--font);font-size:14px;font-weight:900;cursor:pointer">Got it</button>
  `);
    }

    function finishSetup() {
      const name = (document.getElementById('setupName').value.trim()) || 'Student';
      const apiKeyVal = (document.getElementById('setupApiKey').value.trim()) || '';
      const subs = setupSubs.filter(s => s.name.trim());
      const allBlocks = [...setupPresetSel, ...setupBlocks];
      DB.name = name;
      DB.aiProvider = setupSelectedProvider || 'claude';
      DB.theme = setupSelectedTheme || 'midnight';
      if (!DB.apiKeys) DB.apiKeys = { claude: '', gemini: '', groq: '' };
      DB.apiKeys[DB.aiProvider] = apiKeyVal;
      DB.subjects = subs.length ? subs : [...DEF_SUBS];
      DB.blockedSites = allBlocks;
      DB.setupDone = true;
      saveDB();
      launchApp();
    }

    // ─── APP LAUNCH ───────────────────────────────
    function launchApp() {
      if (DB.theme === 'azure') DB.theme = 'midnight';
      if (!DB.theme) DB.theme = 'midnight';
      applyTheme(DB.theme);
      showScreen('s-app');
      document.getElementById('tbAv').textContent = DB.name[0]?.toUpperCase() || 'S';
      document.getElementById('tbName').textContent = DB.name;
      syncSubSel(); renderSubGrid(); updateQS(); renderBlockList();
      initEnforcement(); initChat(); updDisp();
      updateModelBadge();
      initExtensionBridge();
      initWebExtensionBridgeListener();
      registerStudyTab();
      probeExtensionBridge();
      if (!extAvailable()) {
        let bridgeProbeCount = 0;
        const bridgeProbeId = setInterval(() => {
          probeExtensionBridge();
          bridgeProbeCount++;
          if (webExtActive() || bridgeProbeCount > 20) clearInterval(bridgeProbeId);
        }, 500);
      }
      applyParentalUI();
      if ('Notification' in window) Notification.requestPermission();
    }

    function updateModelBadge() {
      const p = AI_PROVIDERS[DB.aiProvider || 'claude'] || AI_PROVIDERS.claude;
      const dot = document.getElementById('modelDot');
      const lbl = document.getElementById('modelLabel');
      const aiAv = document.getElementById('aiAv');
      const aiNm = document.getElementById('aiNm');
      const colorMap = { claude: 'var(--violet)', gemini: 'var(--sky)', groq: 'var(--amber)' };
      if (dot) dot.style.background = colorMap[p.id] || 'var(--lime)';
      if (lbl) lbl.textContent = p.name;
      if (aiAv) { const inner = aiAv.querySelector('.ai-av-inner'); if (inner) inner.innerHTML = svgIcon(p.icon, 18, 18); }
      if (aiNm) aiNm.textContent = 'Flux · ' + p.name;
    }

    // ─── AI PICKER MODAL ──────────────────────────
    function openAiPicker() {
      const prov = AI_PROVIDERS;
      const cur = DB.aiProvider || 'claude';
      const cards = Object.values(prov).map(p => {
        const hasKey = !!(DB.apiKeys?.[p.id]);
        return `
    <div class="ai-provider-card ${cur === p.id ? 'selected' : ''}" data-action="switch-ai-provider" data-provider="${p.id}" style="cursor:pointer">
      <div class="aip-icon" style="background:${p.accentA}">${svgIcon(p.icon, 20, 20)}</div>
      <div style="flex:1">
        <div class="aip-name">${p.name}</div>
        <div class="aip-desc">${p.desc}</div>
        <div class="aip-status ${hasKey ? 'ok' : 'no'}">${hasKey ? '<span style="display:inline-flex;align-items:center;gap:5px">' + svgIcon('check', 11, 11) + '<span>API key saved</span></span>' : 'No key — tap to add'}</div>
      </div>
    </div>`;
      }).join('');
      showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div style="font-size:16px;font-weight:800">Choose AI Assistant</div>
      <button type="button" data-action="close-modal" class="modal-close" aria-label="Close">${svgIcon('close', 14, 14)}</button>
    </div>
    <div class="ai-provider-grid" style="margin-bottom:14px">${cards}</div>
    <div style="font-size:11px;color:var(--mut);text-align:center">Tap a provider to switch. Use the key icons in Settings to manage API keys.</div>
  `);
    }
    function switchAiProvider(id) {
      const p = AI_PROVIDERS[id];
      const hasKey = !!(DB.apiKeys?.[id]);
      if (!hasKey) {
        // Show setup instructions first
        closeModal();
        setTimeout(() => showKeySetupModal(id), 180);
        return;
      }
      DB.aiProvider = id; saveDB();
      closeModal();
      updateModelBadge();
      document.getElementById('chatMsgs').innerHTML = '';
      chatHist = [];
      const qrow = document.getElementById('qrow');
      if (qrow) { qrow.style.display = 'flex'; qrow.style.opacity = '1'; }
      initChat();
      showToast('Switched to ' + p.name);
    }
    function showKeySetupModal(id) {
      const p = AI_PROVIDERS[id];
      showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
      <div style="font-size:16px;font-weight:800;display:flex;align-items:center;gap:8px">${svgIcon(p.icon, 18, 18)} Set up ${p.name}</div>
      <button type="button" data-action="close-modal" class="modal-close" aria-label="Close">${svgIcon('close', 14, 14)}</button>
    </div>
    <div style="font-size:13px;color:var(--dim);margin-bottom:16px;line-height:1.5">${p.desc}</div>
    <div style="background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:14px;margin-bottom:14px">
      ${p.setupSteps.map((s, i) => `
        <div style="display:flex;gap:10px;margin-bottom:${i < p.setupSteps.length - 1 ? '10' : '0'}px;align-items:flex-start">
          <div style="width:20px;height:20px;border-radius:50%;background:${p.accentA};border:1px solid ${p.accentB};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;color:${p.accentC};margin-top:2px">${i + 1}</div>
          <div style="font-size:12px;color:var(--dim);line-height:1.55">${s}</div>
        </div>`).join('')}
    </div>
    <div style="margin-bottom:10px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--mut);margin-bottom:6px">${p.keyLabel}</div>
      <input id="newProviderKey" type="password" placeholder="${p.placeholder}" style="width:100%;background:var(--s2);border:1px solid var(--bd);border-radius:10px;color:var(--text);font-family:var(--mono);font-size:13px;padding:11px 14px;outline:none">
    </div>
    <div style="padding:10px 12px;background:rgba(99,255,136,0.04);border:1px solid rgba(99,255,136,0.1);border-radius:10px;font-size:11px;color:var(--mut);line-height:1.6;margin-bottom:14px;display:flex;gap:10px;align-items:flex-start">
      <span style="flex-shrink:0;margin-top:1px;color:var(--dim)">${svgIcon('lock', 14, 14)}</span>
      <span>Stored locally on this device only. Never transmitted to StudyFlow servers.</span>
    </div>
    <div style="display:flex;gap:8px">
      <button data-action="close-modal" style="flex:1;height:46px;border-radius:12px;background:var(--s2);border:1px solid var(--bd);color:var(--dim);font-family:var(--font);font-size:14px;font-weight:700;cursor:pointer">Cancel</button>
      <button data-action="save-new-provider-key" data-provider="${id}" style="flex:1;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--lime),var(--lime2));border:none;color:#000;font-family:var(--font);font-size:14px;font-weight:900;cursor:pointer">Save & Switch</button>
    </div>
  `);
    }
    function saveNewProviderKey(id) {
      const val = (document.getElementById('newProviderKey')?.value || '').trim();
      if (!val) { showToast('Enter a key first'); return; }
      if (!DB.apiKeys) DB.apiKeys = { claude: '', gemini: '', groq: '' };
      DB.apiKeys[id] = val;
      DB.aiProvider = id;
      saveDB();
      closeModal();
      updateModelBadge();
      document.getElementById('chatMsgs').innerHTML = ''; chatHist = [];
      const qrow = document.getElementById('qrow');
      if (qrow) { qrow.style.display = 'flex'; qrow.style.opacity = '1'; }
      initChat();
      showToast(AI_PROVIDERS[id].name + ' activated');
    }

    // ─── TIMER ────────────────────────────────────
    function syncCustomModeFromInputs() {
      const studyEl = document.getElementById('cStudy');
      const breakEl = document.getElementById('cBreak');
      const study = Math.max(1, Math.min(180, +(studyEl?.value) || 45));
      const brk = Math.max(1, Math.min(60, +(breakEl?.value) || 10));
      if (studyEl) studyEl.value = String(study);
      if (breakEl) breakEl.value = String(brk);
      MODES.custom.study = study;
      MODES.custom.break = brk;
      if (curMode === 'custom' && !isRun) {
        totalSec = study * 60;
        rem = totalSec;
        updDisp();
        updRing(1);
      }
      return { study, break: brk };
    }

    function setMode(m, el) {
      if (!isParentalFeatureOn('timerModes')) {
        showToast('Changing timer mode is disabled in parental mode.');
        return;
      }
      curMode = m;
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('customGrid').style.display = m === 'custom' ? 'grid' : 'none';
      if (m === 'custom') syncCustomModeFromInputs();
      if (!isRun) resetTimer();
    }
    function resetTimerCore() {
      const wasRunning = isRun;
      clearInterval(tickId); tickId = null; isRun = false; isBreak = false; sessStart = null;
      timerStartedAt = null; timerRemAtStart = 0;
      totalSec = MODES[curMode].study * 60; rem = totalSec;
      updDisp(); updRing(1); setPlayBtn(false);
      document.getElementById('ringWrap').classList.remove('running');
      document.getElementById('rlbl').textContent = 'Focus';
      setCursiveLabel(false);
      setTopbarStatus('idle');
      if (wasRunning) releaseFocusSessionLock();
      else {
        hideLockSilent();
        exitChromeFocusMode();
        forcePcUnlock();
        syncShield();
      }
      renderBlockList();
    }
    function resetTimer() {
      if (blockFocusEscape('Reset is disabled during focus — finish the timer first.')) return;
      guardParentalTimer('Enter the parent password to reset the timer.', resetTimerCore);
    }
    function pauseTimerCore() {
      clearInterval(tickId); isRun = false;
      timerStartedAt = null;
      document.getElementById('ringWrap').classList.remove('running');
      setPlayBtn(false);
      if (sessStart && !isBreak) { const e = Math.floor((Date.now() - sessStart) / 1000); if (e >= 60) logSess(e); sessStart = null; }
      setTopbarStatus('idle');
      releaseFocusSessionLock();
    }
    function startTimerCore() {
      if (curMode === 'custom') syncCustomModeFromInputs();
      if (!isBreak) {
        totalSec = MODES[curMode].study * 60;
        if (!isRun && (rem <= 0 || rem > totalSec)) rem = totalSec;
      }
      if (!isBreak) requestStudyFullscreen();
      isRun = true;
      timerStartedAt = Date.now(); timerRemAtStart = rem;
      if (!isBreak) sessStart = Date.now(); escCount = 0; blockedHitCount = 0; lastCaughtDomain = '';
      document.getElementById('ringWrap').classList.add('running');
      setPlayBtn(true);
      setTopbarStatus(isBreak ? 'break' : 'focus');
      if (!isBreak) applyFocusSessionLock();
      else enterChromeFocusMode();
      setCursiveLabel(isBreak);
      tickId = setInterval(tick, 500);
      syncShield();
      renderBlockList();
    }
    function toggleTimer() {
      if (isRun) {
        if (!isBreak && isFocusLocked()) {
          showQuitConfirm();
          return;
        }
        guardParentalTimer('Enter the parent password to pause or stop the timer.', pauseTimerCore);
      } else {
        startTimerCore();
      }
    }
    function tick() {
      if (timerStartedAt !== null) {
        const elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
        rem = Math.max(0, timerRemAtStart - elapsed);
      }
      updDisp(); updRing(rem / totalSec);
      if (lockVis) document.getElementById('lockTime').textContent = fmt(rem);
      if (rem <= 0) {
        clearInterval(tickId); isRun = false;
        document.getElementById('ringWrap').classList.remove('running');
        if (!isBreak) {
          const actualDur = sessStart ? Math.floor((Date.now() - sessStart) / 1000) : MODES[curMode].study * 60;
          logSess(actualDur); sessStart = null;
          pomoC = Math.min(pomoC + 1, 4); updPomo();
          if (pomoC >= 4) { pomoC = 0; updPomo(); showToast('4 Pomodoros done! Legend.'); }
          else showToast('Session done. Break time.');
          notify('StudyFlow', 'Focus session complete! Take a break.');
          isBreak = true; totalSec = MODES[curMode].break * 60; rem = totalSec;
          timerStartedAt = Date.now(); timerRemAtStart = rem;
          document.getElementById('rlbl').textContent = 'Break';
          setCursiveLabel(true);
          setPlayBtn(true, true); setTopbarStatus('break');
          stopFullscreenGuard();
          exitChromeFocusMode();
          hideLockSilent();
          document.getElementById('ringWrap').classList.add('running');
          tickId = setInterval(tick, 500); isRun = true;
          syncShield();
          renderBlockList();
        } else {
          isBreak = false; totalSec = MODES[curMode].study * 60; rem = totalSec;
          document.getElementById('rlbl').textContent = 'Focus';
          setCursiveLabel(false);
          setPlayBtn(false); updDisp(); updRing(1);
          notify('StudyFlow', 'Break over. Back to work!');
          showToast("Break's over. Back to it.");
          setTopbarStatus('idle'); releaseFocusSessionLock();
          syncShield();
          renderBlockList();
        }
      }
    }
    const FOCUS_SUBS = ['one session at a time', 'breathe and focus', 'make it count', 'no distractions', 'lock in now'];
    const BREAK_SUBS = ['you earned this', 'stretch a little', 'back soon', 'recharge fully'];

    function setCursiveLabel(isBreakMode) {
      const el = document.getElementById('cursiveFocusLabel');
      const sub = document.getElementById('cursiveSubLabel');
      if (!el) return;
      const arr = isBreakMode ? BREAK_LABELS : FOCUS_LABELS;
      const subarr = isBreakMode ? BREAK_SUBS : FOCUS_SUBS;
      el.textContent = arr[Math.floor(Math.random() * arr.length)];
      el.style.color = isBreakMode ? 'var(--lime)' : 'rgba(99,255,136,0.7)';
      if (sub) {
        sub.textContent = subarr[Math.floor(Math.random() * subarr.length)];
        sub.style.color = isBreakMode ? 'rgba(99,255,136,0.5)' : 'rgba(242,242,250,0.3)';
      }
    }
    function skipPhaseCore() {
      clearInterval(tickId);
      if (isRun && sessStart && !isBreak) { const e = Math.floor((Date.now() - sessStart) / 1000); if (e >= 60) logSess(e); sessStart = null; }
      isRun = false; document.getElementById('ringWrap').classList.remove('running');
      isBreak = !isBreak;
      totalSec = isBreak ? MODES[curMode].break * 60 : MODES[curMode].study * 60; rem = totalSec;
      document.getElementById('rlbl').textContent = isBreak ? 'Break' : 'Focus';
      setCursiveLabel(isBreak);
      setPlayBtn(false); updDisp(); updRing(1); setTopbarStatus('idle'); releaseFocusSessionLock();
      syncShield();
      renderBlockList();
    }
    function skipPhase() {
      if (blockFocusEscape('Skip is disabled during focus — finish the timer first.')) return;
      guardParentalTimer('Enter the parent password to skip this phase.', skipPhaseCore);
    }
    function updDisp() {
      document.getElementById('rtime').textContent = fmt(rem);
      document.title = fmt(rem) + ' · StudyFlow';
    }
    function updRing(r) { document.getElementById('rt').style.strokeDashoffset = 527.8 * (1 - r); }
    function fmt(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
    function setPlayBtn(run, brk = false) {
      const btn = document.getElementById('btnPlay');
      const ico = document.getElementById('playIco');
      const txt = document.getElementById('playTxt');
      if (run) {
        btn.classList.add('stop');
        ico.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
        txt.textContent = brk ? 'Breaking…' : 'Pause';
      } else {
        btn.classList.remove('stop');
        ico.innerHTML = '<polygon points="5 3 19 12 5 21 5 3" fill="black"/>';
        txt.textContent = isBreak ? 'Resume Break' : 'Start Focus';
      }
    }
    function updPomo() { document.querySelectorAll('.pd').forEach((d, i) => d.classList.toggle('lit', i < pomoC)); }
    function setTopbarStatus(state) {
      const w = document.getElementById('tbStatWrap');
      const statuses = {
        idle: '<div class="ts">Ready when you are</div>',
        focus: '<div class="focus-pill"><span class="dot"></span>Focus Active</div>',
        break: '<div class="focus-pill" style="background:rgba(99,255,136,0.08);border-color:rgba(99,255,136,0.2);color:var(--lime)"><span class="dot" style="background:var(--lime)"></span>On Break</div>'
      };
      w.innerHTML = statuses[state] || statuses.idle;
    }

    // ─── SESSION LOG ──────────────────────────────
    function logSess(dur) {
      const sub = document.getElementById('subSel').value;
      const now = new Date();
      DB.sessions.unshift({ id: Date.now(), subject: sub, duration: dur, date: now.toISOString(), hour: now.getHours() });
      if (DB.sessions.length > 200) DB.sessions = DB.sessions.slice(0, 200);
      updateStreak(now); saveDB(); updateQS(); renderSubGrid();
    }
    function updateStreak(now) {
      const t = now.toDateString();
      if (DB.lastStudyDate === t) return;
      const y = new Date(now); y.setDate(y.getDate() - 1);
      DB.streak = DB.lastStudyDate === y.toDateString() ? DB.streak + 1 : 1;
      DB.lastStudyDate = t;
      if (!DB.studiedDates.includes(t)) DB.studiedDates.push(t);
      if (DB.studiedDates.length > 90) DB.studiedDates = DB.studiedDates.slice(-90);
    }
    function updateQS() {
      const t = new Date().toDateString();
      const ts = DB.sessions.filter(s => new Date(s.date).toDateString() === t);
      document.getElementById('qs-min').textContent = Math.round(ts.reduce((a, s) => a + s.duration, 0) / 60);
      document.getElementById('qs-sess').textContent = ts.length;
      document.getElementById('qs-streak').textContent = DB.streak;
      const big = document.getElementById('bigStreak');
      if (big) big.textContent = DB.streak;
    }

    // ─── SUBJECT UI ───────────────────────────────
    function syncSubSel() {
      const sel = document.getElementById('subSel'); sel.innerHTML = '';
      DB.subjects.forEach(s => { const o = document.createElement('option'); o.value = s.name; o.textContent = s.name; sel.appendChild(o); });
    }
    function renderSubGrid() {
      const g = document.getElementById('subGrid');
      const t = new Date().toDateString();
      const tm = {};
      DB.sessions.filter(s => new Date(s.date).toDateString() === t).forEach(s => { tm[s.subject] = (tm[s.subject] || 0) + Math.round(s.duration / 60); });
      const mx = Math.max(...Object.values(tm), 1);
      if (!DB.subjects.length) { g.innerHTML = '<div class="empty" style="grid-column:1/-1"><svg viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/></svg>No subjects</div>'; return; }
      g.innerHTML = DB.subjects.map((s, si) => {
        const m = tm[s.name] || 0, p = Math.round((m / mx) * 100);
        return `<div class="stile2" data-action="select-subject" data-subject-index="${si}">
      <div class="sdot" style="background:${s.color}"></div>
      <div class="sname2">${escHtml(s.name)}</div>
      <div class="stime2">${m > 0 ? m + ' min today' : 'No sessions'}</div>
      <div class="sbar" style="background:${s.color};width:${p}%"></div>
    </div>`;
      }).join('');
    }
    function openAddSub() {
      if (!isParentalFeatureOn('subjects')) {
        showToast('Adding subjects is disabled in parental mode.');
        return;
      }
      selColor = PAL[0];
      const swatchHtml = PAL.map((c, i) =>
        `<div data-action="pick-sub-color" data-color="${c}" style="width:28px;height:28px;border-radius:50%;background:${c};cursor:pointer;border:${i === 0 ? '3px solid white' : '2px solid transparent'};transition:all 0.15s;flex-shrink:0"></div>`
      ).join('');
      showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div style="font-size:16px;font-weight:800">Add Subject</div>
      <button type="button" data-action="close-modal" class="modal-close" aria-label="Close">${svgIcon('close', 14, 14)}</button>
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--mut);margin-bottom:6px">Subject Name</div>
      <input id="nSubName" type="text" placeholder="e.g. Physics" autofocus style="width:100%;background:var(--s2);border:1px solid var(--bd);border-radius:10px;color:var(--text);font-family:var(--font);font-size:15px;padding:12px 14px;outline:none">
    </div>
    <div style="margin-bottom:18px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--mut);margin-bottom:8px">Color</div>
      <div id="nSwatches" style="display:flex;gap:8px;flex-wrap:wrap">${swatchHtml}</div>
    </div>
    <div style="display:flex;gap:8px">
      <button data-action="close-modal" style="flex:1;height:46px;border-radius:12px;background:var(--s2);border:1px solid var(--bd);color:var(--dim);font-family:var(--font);font-size:14px;font-weight:700;cursor:pointer">Cancel</button>
      <button data-action="add-subject" style="flex:1;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--lime),var(--lime2));border:none;color:#000;font-family:var(--font);font-size:14px;font-weight:900;cursor:pointer">Add Subject</button>
    </div>
  `);
      setTimeout(() => document.getElementById('nSubName')?.focus(), 80);
    }
    function selectSubject(i) {
      const sub = DB.subjects[i];
      if (!sub) return;
      document.getElementById('subSel').value = sub.name;
      showToast(sub.name + ' selected');
    }
    function escHtml(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function pickSubColor(c, el) {
      selColor = c;
      const container = document.getElementById('nSwatches');
      if (container) container.querySelectorAll('div').forEach(s => { s.style.border = '2px solid transparent'; });
      el.style.border = '3px solid white';
    }
    function addSubject() {
      const inp = document.getElementById('nSubName');
      if (!inp) { showToast('Modal error — try again'); return; }
      const name = inp.value.trim();
      if (!name) { showToast('Name it first'); return; }
      if (DB.subjects.find(s => s.name.toLowerCase() === name.toLowerCase())) { showToast('Already exists'); return; }
      DB.subjects.push({ name, color: selColor });
      saveDB(); syncSubSel(); renderSubGrid(); closeModal(); showToast('Added: ' + name);
    }

    // ─── STATS ────────────────────────────────────
    function renderStats() {
      const wrap = document.getElementById('weekBars');
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const now = new Date(); const td = (now.getDay() + 6) % 7;
      const mins = days.map((_, i) => { const d = new Date(now); d.setDate(d.getDate() - (td - i)); return DB.sessions.filter(s => new Date(s.date).toDateString() === d.toDateString()).reduce((a, s) => a + s.duration / 60, 0); });
      const mx = Math.max(...mins, 1);
      wrap.innerHTML = days.map((day, i) => { const h = Math.round((mins[i] / mx) * 84); return `<div class="bc"><div class="bf${i === td ? ' today' : ''}" style="height:${h}px"></div><div class="bl">${day}</div></div>`; }).join('');
      const list = document.getElementById('sessList');
      if (!DB.sessions.length) { list.innerHTML = '<div class="empty"><svg viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/></svg>Nothing yet. Start studying.</div>'; return; }
      list.innerHTML = DB.sessions.slice(0, 20).map(s => {
        const sub = DB.subjects.find(x => x.name === s.subject) || { color: '#63ff88' };
        const dur = s.duration >= 60 ? Math.round(s.duration / 60) + 'm' : s.duration + 's';
        const d = new Date(s.date);
        const dl = d.toDateString() === new Date().toDateString() ? 'Today' : d.toDateString() === new Date(Date.now() - 86400000).toDateString() ? 'Yesterday' : d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        return `<div class="si"><div class="ss" style="background:${sub.color}"></div><div class="sinf"><div class="ssub">${s.subject}</div><div class="smeta">${dl} · ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div><div class="sdur">${dur}</div></div>`;
      }).join('');
    }

    // ─── STREAK ───────────────────────────────────
    function renderStreak() {
      document.getElementById('bigStreak').textContent = DB.streak;
      const wrap = document.getElementById('wcells');
      const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const now = new Date(); const td = (now.getDay() + 6) % 7;
      wrap.innerHTML = days.map((d, i) => { const dt = new Date(now); dt.setDate(dt.getDate() - (td - i)); const done = DB.studiedDates.includes(dt.toDateString()); const today = i === td; return `<div class="wc${done ? ' done' : ''}${today ? ' today' : ''}"><div class="wclbl">${d}</div><div class="wcpip"></div></div>`; }).join('');
      const ms = [
        { d: 1, bg: 'rgba(99,255,136,0.08)', s: '#63ff88', icon: 'mileSprout', l: 'First Step', t: 'Started, at least' },
        { d: 3, bg: 'rgba(255,165,2,0.08)', s: '#ffa502', icon: 'mileBolt', l: '3-Day Streak', t: 'Habit forming' },
        { d: 7, bg: 'rgba(255,211,42,0.08)', s: '#ffd32a', icon: 'mileFlame', l: 'One Week', t: 'Actually consistent' },
        { d: 14, bg: 'rgba(24,220,255,0.08)', s: '#18dcff', icon: 'mileGem', l: 'Two Weeks', t: 'Suspiciously dedicated' },
        { d: 30, bg: 'rgba(168,85,247,0.08)', s: '#a855f7', icon: 'mileCrown', l: '30-Day Legend', t: "Okay, we're impressed" },
      ];
      document.getElementById('mList').innerHTML = ms.map(m => { const done = DB.streak >= m.d; return `<div class="mitem" style="opacity:${done ? 1 : 0.32}"><div class="micon" style="background:${m.bg}">${svgIcon(m.icon, 20, 20)}</div><div><div class="mtitle">${m.l}${done ? '<span class="m-ok">' + svgIcon('check', 12, 12) + '</span>' : ' · ' + (m.d - DB.streak) + ' to go'}</div><div class="mdesc">${m.t}</div></div></div>`; }).join('');
    }

    // ─── BLOCK LIST ───────────────────────────────
    function renderEduYoutubeSection() {
      const grid = document.getElementById('eduYtGrid');
      const toggle = document.getElementById('eduYtToggle');
      if (toggle) toggle.checked = DB.eduYoutubeEnabled !== false;
      if (!grid) return;
      let list = [];
      if (typeof EduYoutube !== 'undefined') {
        list = EduYoutube.mergeList(DB.eduYoutubeExtra);
      }
      if (!list.length) {
        grid.innerHTML = '<div class="edu-yt-chip"><span class="edu-yt-name">Reload extension</span><span class="edu-yt-tag">Channels</span></div>';
        return;
      }
      const customKeys = new Set(
        (DB.eduYoutubeExtra || []).map((e) => (e.id || '') + '|' + EduYoutube.norm(e.handle))
      );
      grid.innerHTML = list.map(c => {
        const key = (c.id || '') + '|' + EduYoutube.norm(c.handle);
        const isCustom = customKeys.has(key);
        const rm = isCustom
          ? `<button type="button" class="edu-yt-rm" data-action="remove-edu-youtube" data-handle="${escHtml(c.handle)}" title="Remove" aria-label="Remove">×</button>`
          : '';
        return `
        <div class="edu-yt-chip${isCustom ? ' custom' : ''}" title="@${escHtml(c.handle)}">
          ${rm}
          <span class="edu-yt-name">${escHtml(c.name)}</span>
          <span class="edu-yt-tag">${escHtml(c.tag || 'Study')}</span>
        </div>`;
      }).join('');
    }

    function toggleEduYoutube(enabled) {
      DB.eduYoutubeEnabled = enabled;
      saveDB();
      showToast(enabled ? 'Study YouTube filter ON' : 'Study YouTube filter OFF');
    }

    async function addEduYoutubeChannel() {
      const inp = document.getElementById('eduYtInp');
      const text = (inp?.value || '').trim();
      if (!text) return;
      if (typeof EduYoutube === 'undefined') {
        showToast('Reload the extension and try again');
        return;
      }
      const btn = document.querySelector('[data-action="add-edu-youtube"]');
      if (btn) btn.disabled = true;
      showToast('Verifying channel…');
      try {
        let resolved;
        if (extAvailable()) {
          resolved = await chrome.runtime.sendMessage({ type: 'RESOLVE_EDU_YT_CHANNEL', input: text });
        } else {
          resolved = await EduYoutube.resolveChannelFromInput(text);
        }
        if (!resolved?.ok) {
          showToast(resolved?.error || 'Could not add channel');
          return;
        }
        const ch = resolved.channel;
        if (!DB.eduYoutubeExtra) DB.eduYoutubeExtra = [];
        if (EduYoutube.isChannelListed(ch, DB.eduYoutubeExtra)) {
          showToast('Channel already listed');
          return;
        }
        DB.eduYoutubeExtra.push(ch);
        saveDB();
        inp.value = '';
        renderEduYoutubeSection();
        const wv = document.getElementById('webView');
        if (desktopAvailable() && wv) syncWebviewStudyData(wv);
        showToast('Added ' + (ch.name || '@' + ch.handle));
      } catch (_) {
        showToast('Could not add channel');
      } finally {
        if (btn) btn.disabled = false;
      }
    }

    function removeEduYoutubeChannel(handle) {
      if (typeof EduYoutube === 'undefined' || !handle) return;
      const h = EduYoutube.norm(handle);
      DB.eduYoutubeExtra = (DB.eduYoutubeExtra || []).filter(
        (c) => EduYoutube.norm(c.handle) !== h && (c.id || '') !== handle
      );
      saveDB();
      renderEduYoutubeSection();
      const wv = document.getElementById('webView');
      if (desktopAvailable() && wv) syncWebviewStudyData(wv);
      showToast('Removed channel');
    }

    function renderBlockList() {
      // Preset grid
      const pg = document.getElementById('blockPresetGrid');
      if (pg) {
        pg.innerHTML = BLOCK_PRESETS.map(p => {
          const blocked = DB.blockedSites.includes(p.domain);
          return `<div class="bpreset ${blocked ? 'blocked' : ''}" data-action="toggle-preset" data-domain="${p.domain}">
        <span class="bpico">${svgIcon(p.icon, 14, 14)}</span>${p.label}
      </div>`;
        }).join('');
      }
      // Custom list
      const list = document.getElementById('bList');
      if (!list) return;
      const custom = DB.blockedSites.filter(s => !BLOCK_PRESETS.find(p => p.domain === s));
      if (!custom.length) {
        list.innerHTML = '<div class="empty"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>No custom sites blocked yet.</div>';
      } else {
        list.innerHTML = custom.map((s) => {
          const idx = DB.blockedSites.indexOf(s);
          return `<div class="bsite"><div class="bfav"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></div><div class="bdom">${s}</div><button class="bdel" data-action="remove-block" data-index="${idx}"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>`;
        }).join('');
      }
      // Status badge
      const st = document.getElementById('bStatus');
      if (st) {
        if (isRun && !isBreak) {
          const caughtStr = blockedHitCount > 0 ? ` · <span style="color:var(--red);font-weight:800">${blockedHitCount} caught 😭</span>` : '';
          st.className = 'bstatus active';
          st.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Shield ACTIVE — ' + DB.blockedSites.length + ' sites blocked' + caughtStr;
        } else {
          st.className = 'bstatus idle';
          st.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Shield idle — start a session to activate';
        }
      }
      updateWebShieldBadge();
      renderEduYoutubeSection();
      updatePcLockStatus();
    }

    const PC_LOCK_SETUP_FILE = 'StudyFlow-Lock-Setup.exe';
    let pcLockInstallPollId = null;

    function triggerBlobDownload(blob, filename) {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 8000);
    }

    async function fetchExtensionAsset(filename) {
      const url = chrome.runtime.getURL(filename);
      const res = await fetch(url);
      if (!res.ok) throw new Error('missing_' + filename);
      return res.blob();
    }

    async function downloadPcLockInstallerFiles(extId) {
      const exeBlob = await fetchExtensionAsset(PC_LOCK_SETUP_FILE);
      if (exeBlob.size < 30000) {
        throw new Error('installer_corrupt');
      }
      triggerBlobDownload(exeBlob, PC_LOCK_SETUP_FILE);
      await new Promise((r) => setTimeout(r, 400));
      triggerBlobDownload(new Blob([extId + '\n'], { type: 'text/plain' }), 'studyflow-lock.id');
    }

    function stopPcLockInstallPoll() {
      if (pcLockInstallPollId) clearInterval(pcLockInstallPollId);
      pcLockInstallPollId = null;
    }

    function startPcLockInstallPoll() {
      stopPcLockInstallPoll();
      let tries = 0;
      pcLockInstallPollId = setInterval(async () => {
        tries++;
        await updatePcLockStatus();
        const st = document.getElementById('pcLockStatus');
        if (st?.classList.contains('ready')) {
          stopPcLockInstallPoll();
          showToast('PC Lock is connected and running.');
          return;
        }
        if (tries >= 40) stopPcLockInstallPoll();
      }, 3000);
    }

    async function installPcLockFromSite() {
      if (!extAvailable()) {
        showToast('Open StudyFlow as a Chrome extension first.');
        return;
      }
      const inp = document.getElementById('pcLockExtIdInput');
      const extId = (inp?.value || chrome.runtime.id || '').trim().toLowerCase();
      if (!/^[a-p]{32}$/.test(extId)) {
        showToast('Extension ID not ready — reload StudyFlow.');
        return;
      }
      const btn = document.querySelector('[data-action="pc-lock-install"]');
      if (btn) btn.disabled = true;
      try {
        await downloadPcLockInstallerFiles(extId);
        await copyTextToClipboard(extId);
        const hint = document.getElementById('pcLockAfterDl');
        if (hint) hint.hidden = false;
        showToast('Saved to Downloads — double-click StudyFlow-Lock-Setup.exe');
        startPcLockInstallPoll();
      } catch (e) {
        const err = String(e && e.message ? e.message : e);
        if (err.includes('missing')) {
          showToast('Installer not in extension — run native-lock/build-exe.ps1, reload extension.');
        } else if (err.includes('corrupt')) {
          showToast('Installer file is incomplete — rebuild with build-exe.ps1.');
        } else {
          showToast('Download failed: ' + err);
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    }

    async function copyTextToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (__) { }
        document.body.removeChild(ta);
        return ok;
      }
    }

    function setPcLockInstallUi(connected) {
      const box = document.getElementById('pcLockInstallBox');
      const btn = document.getElementById('pcLockInstallBtn');
      if (box) box.classList.toggle('is-connected', !!connected);
      if (btn) btn.textContent = connected ? 'Reinstall PC Lock' : 'Install PC Lock';
    }

    async function updatePcLockStatus() {
      const el = document.getElementById('pcLockStatus');
      const inp = document.getElementById('pcLockExtIdInput');
      const afterDl = document.getElementById('pcLockAfterDl');
      const installBox = document.getElementById('pcLockInstallBox');
      if (desktopAvailable()) {
        if (installBox) installBox.style.display = 'none';
        if (!el) return;
        try {
          const res = await studyflowDesktop.getPcLockStatus();
          if (res?.installed && res?.ok) {
            el.className = 'pc-lock-status ready';
            el.textContent = isRun && !isBreak && res.locked
              ? 'StudyFlow App — Alt+Tab block is ACTIVE.'
              : 'StudyFlow App — Alt+Tab blocks automatically when you start focus.';
            setPcLockInstallUi(true);
          } else {
            el.className = 'pc-lock-status missing';
            el.textContent = 'Desktop lock helper missing — rebuild with Build-Desktop.ps1.';
            setPcLockInstallUi(false);
          }
        } catch (_) {
          el.className = 'pc-lock-status ready';
          el.textContent = 'StudyFlow App — no Chrome or extension needed.';
          setPcLockInstallUi(true);
        }
        return;
      }
      if (installBox) installBox.style.display = '';
      if (inp && extAvailable()) inp.value = chrome.runtime.id;
      if (!el) return;
      if (!extAvailable()) {
        el.className = 'pc-lock-status missing';
        el.textContent = 'Open StudyFlow from chrome://extensions — or use StudyFlow-App.exe (no Chrome).';
        setPcLockInstallUi(false);
        return;
      }
      el.textContent = 'Checking…';
      try {
        const res = await chrome.runtime.sendMessage({ type: 'GET_PC_LOCK_STATUS' });
        const stored = await chrome.storage.local.get('pcLockLastResult');
        const last = stored?.pcLockLastResult;
        const extId = chrome.runtime.id;
        if (res?.installed && res?.ok) {
          el.className = 'pc-lock-status ready';
          let txt = 'Connected — Alt+Tab blocks when you start a focus session.';
          if (isRun && !isBreak && last?.locked) {
            txt = 'Alt+Tab block is ACTIVE right now.';
          } else if (last?.locked === false && last?.ok === true) {
            txt = 'Helper ready — start a focus session to activate Alt+Tab block.';
          }
          if (last && last.ok === false) {
            txt += ' Last error: ' + (last.detail || last.error || 'lock failed');
          }
          el.textContent = txt;
          setPcLockInstallUi(true);
        } else {
          el.className = 'pc-lock-status missing';
          const err = res?.error ? String(res.error) : '';
          let msg = 'Not connected — click Install PC Lock, run Setup.exe, then Check connection.';
          if (/host not found|specified native messaging host/i.test(err)) {
            msg = 'Extension ID changed — reinstall PC Lock (Block tab) using ID: ' + extId;
          }
          el.textContent = msg + (err && !/host not found/i.test(err) ? ' (' + err + ')' : '');
          setPcLockInstallUi(false);
          if (afterDl) afterDl.hidden = true;
        }
      } catch (_) {
        el.className = 'pc-lock-status missing';
        el.textContent = 'Not connected — Install PC Lock below.';
        setPcLockInstallUi(false);
        if (afterDl) afterDl.hidden = true;
      }
    }
    function togglePreset(domain) {
      if (DB.blockedSites.includes(domain)) {
        DB.blockedSites = DB.blockedSites.filter(s => s !== domain);
        showToast('Unblocked: ' + domain);
      } else {
        DB.blockedSites.push(domain);
        showToast('Blocked: ' + domain);
      }
      saveDB(); renderBlockList();
    }
    function addBlock() {
      const inp = document.getElementById('bInp');
      const val = cleanDomain(inp.value);
      if (!val) return;
      if (DB.blockedSites.includes(val)) { showToast('Already blocked'); return; }
      DB.blockedSites.push(val); saveDB(); renderBlockList(); inp.value = ''; showToast('Blocked: ' + val);
    }
    function removeBlock(i) { DB.blockedSites.splice(i, 1); saveDB(); renderBlockList(); }
    function cleanDomain(s) { return s.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, ''); }

    // ─── FOCUS ENFORCEMENT + SITE BLOCKER ────────
    let enforcementInited = false;
    let tabHiddenAt = 0;           // timestamp when tab was hidden
    let blockedHitCount = 0;       // times caught on a blocked site this session
    let lastCaughtDomain = '';     // which blocked domain they fled to

    // ── roast pool: {emoji, title, lines[]} ──────
    const ROASTS = [
      {
        e: '💀', t: 'Caught in 4K.', lines: [
          'You switched to {d} like I wouldn\'t notice. Bold strategy, zero payoff.',
          '{d}?? During a focus session? Your textbook is sobbing.',
          'Tab switcher detected. Domain: {d}. Shame: immeasurable.',
        ]
      },
      {
        e: '😭', t: 'The audacity.', lines: [
          'You lasted {s} seconds before fleeing to {d}. That\'s a personal worst.',
          'BREAKING: local student abandons session for {d}. Grade unsurprised.',
          'I watched you leave in real time. {d}. Really.',
        ]
      },
      {
        e: '🤡', t: 'Peak focus. Amazing.', lines: [
          '{d}? Truly the peak of academic discipline.',
          'Ah yes, {d} — famous study resource. Very educational.',
          'Nothing says "I want to pass" like a quick {d} detour.',
        ]
      },
      {
        e: '🔥', t: 'Your future is watching.', lines: [
          '{d} will exist after your exam. Your grade will not recover after your exam.',
          'Every second on {d} is a second your rival is studying. Sleep on that.',
          'Future you just saw the {d} switch. Future you is not impressed.',
        ]
      },
      {
        e: '🫠', t: 'Bro really did that.', lines: [
          'Distraction #{n} this session. At this point {d} is your major.',
          '#{n} times. You\'ve fled to distractions {n} times. I genuinely don\'t know what to say.',
          'We are on distraction #{n}. {d} is winning. You are not.',
        ]
      },
      {
        e: '😤', t: 'I\'m not even mad.', lines: [
          'Actually I am mad. {d}? Come on.',
          'You know what, go ahead. Stare at {d}. See if it writes your essay.',
          'The {d} tab is open. Your notes are not. This is fine. Everything is fine.',
        ]
      },
    ];

    function pickRoast(domain, secs) {
      const r = ROASTS[Math.floor(Math.random() * ROASTS.length)];
      const line = r.lines[Math.floor(Math.random() * r.lines.length)]
        .replace(/\{d\}/g, domain)
        .replace(/\{s\}/g, secs)
        .replace(/\{n\}/g, blockedHitCount);
      return { emoji: r.e, title: r.t, msg: line };
    }

    function cleanDomain(s) {
      return s.trim().toLowerCase()
        .replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
    }

    function isBlockedDomain(domain) {
      if (!domain || !DB.blockedSites || !DB.blockedSites.length) return false;
      const d = domain.toLowerCase().replace(/^www\./, '');
      return DB.blockedSites.some(s => {
        const b = s.toLowerCase().replace(/^www\./, '');
        return d === b || d.endsWith('.' + b) || b.endsWith('.' + d);
      });
    }

    function readBlockedCrumb() {
      return new Promise((resolve) => {
        let found = null;
        try {
          const crumb = localStorage.getItem('sf_blocked_crumb');
          if (crumb) {
            const obj = JSON.parse(crumb);
            if (Date.now() - obj.ts < 30000 && isBlockedDomain(obj.domain)) found = obj.domain;
            localStorage.removeItem('sf_blocked_crumb');
          }
        } catch (_) { }
        if (found || !extAvailable() || !chrome.storage) return resolve(found);
        chrome.storage.local.get('sf_blocked_crumb', (data) => {
          const obj = data.sf_blocked_crumb;
          if (obj && Date.now() - obj.ts < 30000 && isBlockedDomain(obj.domain)) found = obj.domain;
          chrome.storage.local.remove('sf_blocked_crumb');
          resolve(found);
        });
      });
    }

    // ── When tab comes back, figure out where user was ──
    async function onTabReturn() {
      if (!isRun || isBreak || enforcementPaused) return;

      const awayMs = Date.now() - tabHiddenAt;

      let caughtDomain = '';
      try {
        const ref = document.referrer;
        if (ref) {
          const u = new URL(ref);
          const d = u.hostname.replace(/^www\./, '');
          if (isBlockedDomain(d)) caughtDomain = d;
        }
      } catch (_) { }

      if (!caughtDomain) caughtDomain = await readBlockedCrumb() || '';

      if (caughtDomain && caughtDomain !== lastCaughtDomain) {
        lastCaughtDomain = caughtDomain;
        blockedHitCount++;
        escCount++;
        const secs = Math.round(awayMs / 1000);
        triggerBlockedRoast(caughtDomain, secs);
      } else if (!extAvailable() && awayMs > 1200 && shouldReportFocusLost()) {
        handleAppSwitchAttempt();
      }
    }

    function triggerBlockedRoast(domain, secs) {
      escWarnMode = 'escape';
      const { emoji, title, msg } = pickRoast(domain, secs);

      // populate the existing esc-warn overlay with roast content
      const idx = Math.min(escCount - 1, ESC_DATA.length - 1);
      const iconKey = ESC_DATA[idx] ? ESC_DATA[idx][0] : 'esc1';
      document.getElementById('wEmoji').innerHTML = `<span style="font-size:52px;line-height:1">${emoji}</span>`;
      document.getElementById('wTitle').textContent = title;
      document.getElementById('wMsg').innerHTML =
        `<span style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,71,87,0.08);border:1px solid rgba(255,71,87,0.18);border-radius:8px;padding:3px 10px;font-size:11px;font-weight:700;color:var(--red);letter-spacing:1px;margin-bottom:8px">🚫 BLOCKED SITE DETECTED</span><br>${msg}`;
      const pct = Math.min((escCount / ESC_DATA.length) * 100, 100);
      document.getElementById('wFill').style.width = pct + '%';
      document.getElementById('wFill').style.background = 'var(--red)';
      document.getElementById('wCount').textContent = `${blockedHitCount} blocked escape${blockedHitCount !== 1 ? 's' : ''}`;

      const leaveBtn = document.querySelector('.wbtn-leave');
      const stayBtn = document.querySelector('.wbtn-stay');
      stayBtn.textContent = 'Back to Studying 📚';
      if (blockedHitCount >= 4) leaveBtn.textContent = 'Give up (embarrassing)';
      else if (blockedHitCount >= 2) leaveBtn.textContent = 'End Session (quitter)';
      else leaveBtn.textContent = 'End Session (really?)';

      document.getElementById('esc-warn').classList.add('active');
      // shake the page
      document.body.style.animation = 'blockShake 0.4s ease';
      setTimeout(() => { document.body.style.animation = ''; }, 400);

      notify('🚫 Caught!', `You just visited ${domain} during a focus session. Get back to work.`);
      renderBlockList();
    }

    function initEnforcement() {
      if (enforcementInited) return;
      enforcementInited = true;

      window.addEventListener('pagehide', () => {
        if (isRun && !isBreak) forcePcUnlock();
      });

      document.addEventListener('fullscreenchange', onFullscreenChange);
      document.addEventListener('webkitfullscreenchange', onFullscreenChange);

      document.addEventListener('keydown', (e) => {
        if (!isFocusLocked()) return;
        if (e.code === 'Escape' || e.code === 'F11' || (e.altKey && e.code === 'Enter')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          silentRelockFullscreen();
        }
      }, true);

      // ── Tab return → only react if user visited a blocked site ──
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          tabHiddenAt = Date.now();
          if (shouldReportFocusLost()) notifyChromeFocusLost();
        } else {
          registerStudyTab();
          if (isRun && !isBreak && !enforcementPaused) onTabReturn();
          if (isRun && tickId !== null) tick();
        }
      });

      window.addEventListener('blur', () => {
        if (!shouldReportFocusLost()) return;
        tabHiddenAt = Date.now();
        notifyChromeFocusLost();
      });

      // ── Prevent accidental close during locked focus ─────────────
      window.addEventListener('beforeunload', e => {
        if (isParentalTimerLocked()) {
          e.preventDefault();
          e.returnValue = 'Parental mode: enter the parent password in StudyFlow to stop the timer.';
          return;
        }
        if (isFocusLocked()) {
          e.preventDefault();
          e.returnValue = 'Focus session is locked — finish the timer before leaving StudyFlow.';
        }
      });

      // ── Block any link click that goes to a blocked domain ────
      document.addEventListener('click', e => {
        if (!isRun || isBreak || enforcementPaused) return;
        const a = e.target.closest('a[href]');
        if (!a || !a.href) return;
        try {
          const d = new URL(a.href).hostname.replace(/^www\./, '');
          if (isBlockedDomain(d)) {
            e.preventDefault(); e.stopImmediatePropagation();
            blockedHitCount++; escCount++; lastCaughtDomain = d;
            triggerBlockedRoast(d, 0);
          }
        } catch (_) { }
      }, true);
    }

    function deactivateLock() { hideLockSilent(); }
    function showLock() {
      lockVis = true;
      const el = document.getElementById('focus-lock');
      el.classList.add('active'); el.style.display = 'flex';
      document.getElementById('lockTime').textContent = fmt(rem);
      document.getElementById('lockTime').className = 'lock-timer-big';
      document.getElementById('lockPhase').textContent = isBreak ? 'BREAK TIME' : 'FOCUS TIME';
      const q = LOCK_QUOTES[Math.floor(Math.random() * LOCK_QUOTES.length)];
      document.getElementById('lockQuote').textContent = '"' + q.q + '"';
      document.getElementById('lockAttr').textContent = q.a;
      const lc = document.getElementById('lockCursive');
      if (lc) {
        const arr = isBreak ? BREAK_LABELS : FOCUS_LABELS;
        lc.textContent = arr[Math.floor(Math.random() * arr.length)];
        lc.style.color = isBreak ? 'var(--lime)' : 'rgba(99,255,136,0.55)';
      }
      const ec = document.getElementById('lockEscCount');
      if (escCount > 0) { ec.classList.remove('hide'); document.getElementById('lockEscTxt').textContent = escCount + ' escape attempt' + (escCount > 1 ? 's' : ''); }
      else ec.classList.add('hide');
      document.getElementById('lockIcon').style.background = isBreak ? 'rgba(99,255,136,0.1)' : 'rgba(255,71,87,0.12)';
      document.getElementById('lockIcon').style.borderColor = isBreak ? 'rgba(99,255,136,0.25)' : 'rgba(255,71,87,0.3)';
      document.getElementById('lockBreakArea').classList.toggle('show', isBreak);
      document.getElementById('lockReturnBtn').style.display = 'none';
      const lockHint = document.getElementById('lockFocusHint');
      if (lockHint) lockHint.style.display = isBreak ? 'none' : 'block';
    }
    function showBreakInLock() {
      if (!lockVis) return;
      document.getElementById('lockPhase').textContent = 'BREAK TIME';
      document.getElementById('lockTime').className = 'lock-timer-big breaking';
      document.getElementById('lockBreakArea').classList.add('show');
      document.getElementById('lockReturnBtn').style.display = 'none';
      const lockHint = document.getElementById('lockFocusHint');
      if (lockHint) lockHint.style.display = 'none';
      document.getElementById('lockQuote').textContent = '"Okay, you actually did it. Rest."';
      document.getElementById('lockAttr').textContent = '— Flux, mildly impressed';
      const lc = document.getElementById('lockCursive');
      if (lc) { lc.textContent = 'well deserved'; lc.style.color = 'var(--lime)'; }
    }
    function hideLockSilent() {
      lockVis = false;
      const el = document.getElementById('focus-lock');
      el.classList.remove('active'); el.style.display = 'none';
    }
    function hideLock() {
      if (isFocusLocked()) {
        silentRelockFullscreen();
        return;
      }
      lockVis = false; enforcementPaused = true;
      const el = document.getElementById('focus-lock');
      el.classList.remove('active'); el.style.display = 'none';
      stopFullscreenGuard();
      document.documentElement.classList.remove('sf-focus-locked');
      try { if (document.fullscreenElement) document.exitFullscreen?.(); } catch (e) { }
      setTimeout(() => { enforcementPaused = false; }, 1000);
    }
    function showQuitConfirm() {
      escWarnMode = 'quit';
      document.getElementById('wFill').style.background = '';
      document.getElementById('wEmoji').innerHTML = svgIcon('lock', 44, 44);
      document.getElementById('wTitle').textContent = 'End focus session?';
      const needsPw = isParentalTimerLocked();
      document.getElementById('wMsg').textContent = needsPw
        ? 'Enter the parent password below, then tap Stop focus.'
        : 'Are you sure you want to quit? The timer will stop and fullscreen will turn off.';
      document.getElementById('wFill').style.width = '100%';
      document.getElementById('wCount').textContent = fmt(rem) + ' left on the clock';
      const leaveBtn = document.querySelector('.wbtn-leave');
      const stayBtn = document.querySelector('.wbtn-stay');
      const pwRow = document.getElementById('wParentalRow');
      const pwErr = document.getElementById('wQuitPwErr');
      const pwInp = document.getElementById('wQuitPwInp');
      if (pwRow) pwRow.hidden = !needsPw;
      if (pwErr) pwErr.textContent = '';
      if (pwInp) pwInp.value = '';
      if (stayBtn) stayBtn.textContent = 'Keep studying';
      if (leaveBtn) leaveBtn.textContent = needsPw ? 'Stop focus' : 'Yes, quit';
      document.getElementById('esc-warn').classList.add('active');
      if (needsPw) setTimeout(() => pwInp?.focus(), 120);
    }

    function showEscWarn(isBlockedSite) {
      escWarnMode = 'escape';
      // Reset button text & meter color
      document.getElementById('wFill').style.background = '';
      const idx = Math.min(Math.max(escCount - 1, 0), ESC_DATA.length - 1);
      const [iconKey, title, msg] = ESC_DATA[idx];
      document.getElementById('wEmoji').innerHTML = svgIcon(iconKey, 44, 44);
      document.getElementById('wTitle').textContent = isBlockedSite ? title : (isFocusLocked() ? 'Nice try.' : title);
      document.getElementById('wMsg').textContent = isBlockedSite ? msg : (isFocusLocked()
        ? 'You can\'t switch to other apps during focus — Alt+Tab, Win+Tab, and clicking away will pull Chrome back to fullscreen.'
        : msg);
      const pct = Math.min((escCount / ESC_DATA.length) * 100, 100);
      document.getElementById('wFill').style.width = pct + '%';
      document.getElementById('wCount').textContent = escCount + ' attempt' + (escCount > 1 ? 's' : '');
      const leaveBtn = document.querySelector('.wbtn-leave');
      const stayBtn = document.querySelector('.wbtn-stay');
      stayBtn.textContent = 'OK Fine, I\'ll Study';
      if (escCount >= 6) leaveBtn.textContent = 'Fine, I give up (shame)';
      else if (escCount >= 4) leaveBtn.textContent = 'Leave (seriously?)';
      else leaveBtn.textContent = 'Leave (coward)';
      document.getElementById('esc-warn').classList.add('active');
    }
    function hideEscWarn() {
      escWarnMode = 'escape';
      document.getElementById('esc-warn').classList.remove('active');
      // reset fill color in case roast painted it red
      document.getElementById('wFill').style.background = '';
      const leaveBtn = document.querySelector('.wbtn-leave');
      const stayBtn = document.querySelector('.wbtn-stay');
      if (stayBtn) stayBtn.textContent = 'OK Fine, I\'ll Study';
      if (leaveBtn) leaveBtn.textContent = 'Leave (coward)';
    }
    function stayFocused() {
      hideEscWarn();
      lastCaughtDomain = '';
    }

    async function confirmQuitFocus() {
      const pwErr = document.getElementById('wQuitPwErr');
      const pwInp = document.getElementById('wQuitPwInp');
      if (isParentalTimerLocked()) {
        const pw = (pwInp?.value || '').trim();
        if (!pw) {
          if (pwErr) pwErr.textContent = 'Enter the parent password.';
          pwInp?.focus();
          return;
        }
        try {
          if (!(await verifyParentalPassword(pw))) {
            if (pwErr) pwErr.textContent = 'Wrong password — try again.';
            showToast('Wrong password');
            pwInp?.focus();
            return;
          }
        } catch (_) {
          if (pwErr) pwErr.textContent = 'Could not verify password.';
          return;
        }
        if (pwInp) pwInp.value = '';
      }
      if (pwErr) pwErr.textContent = '';
      hideEscWarn();
      pauseTimerCore();
      showToast('Focus session stopped.');
    }
    function confirmLeaveCore() {
      hideEscWarn();
      if (sessStart) { const e = Math.floor((Date.now() - sessStart) / 1000); if (e >= 60) { logSess(e); } sessStart = null; }
      clearInterval(tickId); tickId = null;
      isRun = false; isBreak = false; timerStartedAt = null;
      totalSec = MODES[curMode].study * 60; rem = totalSec;
      updDisp(); updRing(1);
      document.getElementById('ringWrap').classList.remove('running');
      document.getElementById('rlbl').textContent = 'Focus';
      setCursiveLabel(false);
      setPlayBtn(false); setTopbarStatus('idle'); releaseFocusSessionLock();
      blockedHitCount = 0; lastCaughtDomain = '';
      syncShield();
      renderBlockList();
      showToast('Session ended. The blocked site won. Reflect on that.');
    }
    function confirmLeave() {
      if (escWarnMode === 'quit') {
        confirmQuitFocus();
        return;
      }
      guardParentalTimer('Enter the parent password to end this session.', confirmLeaveCore);
    }

    // ─── AI / FLUX ────────────────────────────────
    function getActiveKey() {
      const prov = DB.aiProvider || 'claude';
      return (DB.apiKeys && DB.apiKeys[prov]) || '';
    }
    function initChat() {
      const key = getActiveKey();
      const prov = AI_PROVIDERS[DB.aiProvider || 'claude'] || AI_PROVIDERS.claude;
      if (!key) {
        appendMsg('ai', 'Hey ' + escHtml(DB.name) + "! I'm Flux — your AI study coach.<br><br>I need an API key to work. Tap the <strong>model badge</strong> in the header to set up " + prov.name + ', or open <strong>Settings</strong> using the ' + svgIcon('settings', 12, 12) + ' icon in the top bar.');
        document.getElementById('aiSt').textContent = 'Needs API key — tap model badge';
        return;
      }
      const name = DB.name || 'Student';
      const greeting = 'Oh good, you opened the AI tab instead of actually studying. Bold strategy, ' + escHtml(name) + '.<br><br>I\'m Flux — part study coach, part scheduler, part person who will absolutely call you out. I have your stats. I can see everything. What do you need?';
      appendMsg('ai', greeting);
      chatHist = [];
    }

    function buildSys() {
      const t = new Date().toDateString();
      const ts = DB.sessions.filter(s => new Date(s.date).toDateString() === t);
      const todMin = Math.round(ts.reduce((a, s) => a + s.duration, 0) / 60);
      const wkMin = Math.round(DB.sessions.filter(s => (Date.now() - new Date(s.date)) < 7 * 86400000).reduce((a, s) => a + s.duration / 60, 0));
      const st = {}; DB.sessions.forEach(s => { st[s.subject] = (st[s.subject] || 0) + s.duration; });
      const topS = Object.entries(st).sort((a, b) => b[1] - a[1])[0];
      const subTimes = DB.subjects.map(s => ({ name: s.name, mins: Math.round((st[s.name] || 0) / 60) }));
      const avgSess = DB.sessions.length ? Math.round(DB.sessions.reduce((a, s) => a + s.duration, 0) / DB.sessions.length / 60) : 0;
      const now = new Date();
      return `You are Flux, a sarcastic but genuinely helpful AI study assistant embedded in StudyFlow, a focus enforcement app.

STUDENT PROFILE:
- Name: ${DB.name}
- Current time: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
- Today: ${todMin} min studied, ${ts.length} sessions
- This week: ${wkMin} min total
- Current streak: ${DB.streak} days
- Average session length: ${avgSess} min
- Top subject: ${topS ? topS[0] + ' (' + Math.round(topS[1] / 60) + ' min total)' : 'none yet'}
- All subjects: ${subTimes.map(s => s.name + ': ' + s.mins + 'min').join(', ') || 'none'}
- Blocked sites: ${DB.blockedSites.join(', ') || 'none (brave)'}
- Timer status: ${isRun ? (isBreak ? 'on break (' + fmt(rem) + ' left)' : 'in focus session — ' + fmt(rem) + ' remaining') : 'idle'}
- Total escape attempts this session: ${escCount}

PERSONALITY & RULES:
- You are sarcastic, witty, and dry — like a brilliant friend who refuses to coddle you
- You keep it REAL. If their stats are bad, say so (humorously but honestly)
- You are NEVER mean-spirited — the sarcasm is affectionate, not cruel
- Short punchy responses by default (3-5 sentences). Longer ONLY when explaining a concept
- When asked to plan a study schedule, output a concrete timetable with subjects, durations, and short breaks
- You never say "I understand" or "Great question" — those are banned phrases
- Occasionally reference their actual stats to make points hit harder`;
    }

    async function sendMsg() {
      const inp = document.getElementById('chatInp');
      const msg = inp.value.trim();
      if (!msg) return;
      const key = getActiveKey();
      if (!key) {
        appendMsg('ai', 'No API key. Tap the model badge in the header to add one.');
        return;
      }
      inp.value = ''; inp.style.height = 'auto';
      appendMsg('user', msg);
      chatHist.push({ role: 'user', content: msg });
      showTyping();
      const prov = DB.aiProvider || 'claude';
      try {
        let reply;
        if (prov === 'gemini') {
          reply = await sendGemini(key, msg);
        } else if (prov === 'groq') {
          reply = await sendGroq(key);
        } else {
          reply = await sendClaude(key);
        }
        hideTyping();
        chatHist.push({ role: 'assistant', content: reply });
        appendMsg('ai', reply);
      } catch (e) {
        hideTyping();
        if (chatHist.length && chatHist[chatHist.length - 1].role === 'user') chatHist.pop();
        appendMsg('ai', 'Error: ' + e.message + '. Check your API key in Settings.');
      }
    }

    async function sendClaude(key) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          system: buildSys(),
          messages: chatHist.slice(-16)
        })
      });
      let data;
      try { data = await res.json(); } catch (e) { throw new Error("Couldn't parse response (HTTP " + res.status + ")"); }
      if (!res.ok || data.error) {
        const m = data?.error?.message || 'HTTP ' + res.status;
        let hint = '';
        if (res.status === 401) hint = ' — API key looks wrong.';
        else if (res.status === 429) hint = ' — Rate limited. Wait 30s.';
        throw new Error(m + hint);
      }
      if (!data.content || !data.content[0]) throw new Error('Empty response from Claude.');
      return data.content[0].text;
    }

    async function sendGemini(key, userMsg) {
      const sys = buildSys();
      const history = chatHist.slice(-16);
      // Build contents: inject system prompt into first user turn, then append current user message
      const contents = history.map((m, i) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: i === 0 && m.role === 'user' ? sys + '\n\n' + m.content : m.content }]
      }));
      // Always append the current user message at the end
      contents.push({ role: 'user', parts: [{ text: history.length === 0 ? sys + '\n\n' + userMsg : userMsg }] });
      const model = AI_PROVIDERS.gemini.model;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 800 } })
      });
      let data;
      try { data = await res.json(); } catch (e) { throw new Error("Couldn't parse Gemini response (HTTP " + res.status + ")"); }
      if (!res.ok || data.error) {
        const m = data?.error?.message || 'HTTP ' + res.status;
        let hint = '';
        if (res.status === 400) hint = ' — Check your Gemini API key.';
        if (res.status === 429) hint = ' — Rate limited. Wait a moment.';
        throw new Error(m + hint);
      }
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini.');
      return text;
    }

    async function sendGroq(key) {
      const messages = [{ role: 'system', content: buildSys() }, ...chatHist.slice(-16)];
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({ model: AI_PROVIDERS.groq.model, max_tokens: 800, messages })
      });
      let data;
      try { data = await res.json(); } catch (e) { throw new Error("Couldn't parse Groq response (HTTP " + res.status + ")"); }
      if (!res.ok || data.error) {
        const m = data?.error?.message || 'HTTP ' + res.status;
        let hint = '';
        if (res.status === 401) hint = ' — Check your Groq API key.';
        if (res.status === 429) hint = ' — Rate limited. Wait a moment.';
        throw new Error(m + hint);
      }
      const text = data?.choices?.[0]?.message?.content;
      if (!text) throw new Error('Empty response from Groq.');
      return text;
    }

    function qsend(msg) {
      document.getElementById('chatInp').value = msg;
      sendMsg();
      const qrow = document.getElementById('qrow');
      if (qrow && getActiveKey()) qrow.style.opacity = '0.4';
    }
    function chatKey(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); return; }
      setTimeout(() => {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
      }, 0);
    }
    let typingEl = null;
    function showTyping() {
      typingEl = document.createElement('div'); typingEl.className = 'msg ai';
      typingEl.innerHTML = '<div class="mav">F</div><div class="mbbl"><div class="td"><span></span><span></span><span></span></div></div>';
      document.getElementById('chatMsgs').appendChild(typingEl);
      scrollChat();
    }
    function hideTyping() { if (typingEl) { typingEl.remove(); typingEl = null; } }
    function appendMsg(role, text) {
      const w = document.getElementById('chatMsgs');
      const d = document.createElement('div'); d.className = 'msg ' + role;
      const init = role === 'ai' ? 'F' : (DB.name[0]?.toUpperCase() || 'S');
      const formatted = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      d.innerHTML = `<div class="mav">${init}</div><div class="mbbl">${formatted}</div>`;
      w.appendChild(d); scrollChat();
    }
    function scrollChat() { const c = document.getElementById('chatMsgs'); c.scrollTop = c.scrollHeight; }

    // ─── THEMES ───────────────────────────────────
    const THEMES = [
      { id: 'midnight', name: 'Midnight', icon: 'themeMidnight', desc: 'Original dark', preview: ['#09090e', '#63ff88', '#a855f7'] },
      { id: 'sakura', name: 'Sakura', icon: 'themeSakura', desc: 'Soft pink blossoms', preview: ['#1a0f14', '#ff69b4', '#cc4488'] },
      { id: 'ocean', name: 'Ocean', icon: 'themeOcean', desc: 'Deep sea blues', preview: ['#050d18', '#00d4ff', '#818cf8'] },
      { id: 'sunset', name: 'Sunset', icon: 'themeSunset', desc: 'Warm orange & violet', preview: ['#120a0a', '#ff7f50', '#c77dff'] },
      { id: 'forest', name: 'Forest', icon: 'themeForest', desc: 'Earthy moss & pine', preview: ['#080f09', '#69d46e', '#80cbc4'] },
      { id: 'y2k', name: 'Y2K', icon: 'themeY2k', desc: 'Neon chrome cyber', preview: ['#000008', '#00ffff', '#ff00ff'] },
      { id: 'latte', name: 'Latte', icon: 'themeLatte', desc: 'Warm coffeeshop', preview: ['#f5ede4', '#a0522d', '#5c8a6e'] },
      { id: 'galaxy', name: 'Galaxy', icon: 'themeGalaxy', desc: 'Deep purple cosmos', preview: ['#070514', '#c77dff', '#7eb8f7'] },
      { id: 'slate', name: 'Slate', icon: 'themeSlate', desc: 'Clean minimal cool', preview: ['#f8fafc', '#6366f1', '#0ea5e9'] },
      { id: 'ember', name: 'Ember', icon: 'themeEmber', desc: 'Deep red & rust', preview: ['#0f0704', '#ff6b35', '#ffd700'] },
      { id: 'mint', name: 'Mint', icon: 'themeMint', desc: 'Fresh cool greens', preview: ['#f0fff4', '#10b981', '#06b6d4'] },
      { id: 'noir', name: 'Noir', icon: 'themeNoir', desc: 'Black & gold luxury', preview: ['#0a0a0a', '#d4af37', '#e8c96e'] },
    ];

    function applyTheme(id) {
      document.documentElement.setAttribute('data-theme', id === 'midnight' ? '' : id);
      DB.theme = id;
      saveDB();
      // Update orb colors to match theme
      const orbs = document.querySelectorAll('.orb');
      // just let CSS vars handle colors
    }

    /** Avoid nested double-quotes inside onclick="..." (they break the HTML attribute). */
    function pickTheme(id) {
      applyTheme(id);
      closeModal();
      const t = THEMES.find(x => x.id === id);
      showToast((t ? t.name : 'Theme') + ' applied!');
    }

    function openThemePicker() {
      if (!isParentalFeatureOn('settings')) {
        showToast('Themes are disabled in parental mode.');
        return;
      }
      const cur = DB.theme || 'midnight';
      showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:16px;font-weight:800">Choose Theme</div>
      <button type="button" data-action="close-modal" class="modal-close" aria-label="Close">${svgIcon('close', 14, 14)}</button>
    </div>
    <div class="theme-grid">
      ${THEMES.map(t => `
        <div class="theme-swatch ${cur === t.id ? 'active' : ''}" role="button" tabindex="0" data-action="pick-theme" data-theme="${t.id}">
          <div class="theme-preview" style="background:${t.preview[0]}">
            <div class="tp-dot" style="background:${t.preview[1]}"></div>
            <div class="tp-bar" style="background:${t.preview[2]};height:60%;align-self:flex-end"></div>
            <div class="tp-dot" style="background:${t.preview[1]};opacity:0.5"></div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;line-height:1.2">
            <span style="display:inline-flex;align-items:center;vertical-align:middle">${svgIcon(t.icon, 14, 14)}</span>
            <span style="font-size:11px;font-weight:700">${t.name}</span>
          </div>
          <div style="font-size:9px;color:var(--mut);line-height:1.2">${t.desc}</div>
        </div>`).join('')}
    </div>
    <div style="font-size:11px;color:var(--mut);text-align:center;margin-top:4px">Tap a theme to apply instantly.</div>
  `);
    }

    // ─── SETTINGS ────────────────────────────────
    function openSettings() {
      if (!isParentalFeatureOn('settings')) {
        showToast('Settings are disabled in parental mode.');
        return;
      }
      const keys = DB.apiKeys || {};
      showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div style="font-size:16px;font-weight:800">Settings</div>
      <button type="button" data-action="close-modal" class="modal-close" aria-label="Close">${svgIcon('close', 14, 14)}</button>
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--mut);margin-bottom:6px">Your Name</div>
      <input id="sName" type="text" value="${escHtml(DB.name)}" style="width:100%;background:var(--s2);border:1px solid var(--bd);border-radius:10px;color:var(--text);font-family:var(--font);font-size:14px;padding:11px 14px;outline:none">
    </div>
    <div style="margin-bottom:6px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--mut);margin-bottom:8px">API Keys</div>
      ${Object.values(AI_PROVIDERS).map(p => `
        <div style="margin-bottom:8px">
          <div style="font-size:11px;font-weight:600;color:var(--dim);margin-bottom:4px;display:flex;align-items:center;gap:6px">
            <span style="display:inline-flex;align-items:center;gap:5px">${svgIcon(p.icon, 13, 13)}<span>${p.name}</span></span>
            <span data-action="provider-setup-info" data-provider="${p.id}" style="font-size:10px;color:var(--sky);cursor:pointer;text-decoration:underline;font-weight:500">How to get key?</span>
          </div>
          <input id="sKey_${p.id}" type="password" value="${escHtml(keys[p.id] || '')}" placeholder="${p.placeholder}" style="width:100%;background:var(--s2);border:1px solid var(--bd);border-radius:10px;color:var(--text);font-family:var(--mono);font-size:12px;padding:10px 14px;outline:none">
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:8px;margin-bottom:12px;margin-top:10px">
      <button data-action="close-modal" style="flex:1;height:46px;border-radius:12px;background:var(--s2);border:1px solid var(--bd);color:var(--dim);font-family:var(--font);font-size:14px;font-weight:700;cursor:pointer">Cancel</button>
      <button data-action="save-settings" style="flex:1;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--lime),var(--lime2));border:none;color:#000;font-family:var(--font);font-size:14px;font-weight:900;cursor:pointer">Save</button>
    </div>
    <button data-action="reset-all" style="width:100%;height:40px;border-radius:12px;background:rgba(255,71,87,0.08);border:1px solid rgba(255,71,87,0.18);color:var(--red);font-family:var(--font);font-size:13px;font-weight:700;cursor:pointer">Nuke All Data</button>
  `);
    }
    function saveSettings() {
      const newName = (document.getElementById('sName')?.value.trim()) || DB.name;
      const nameChanged = newName !== DB.name;
      DB.name = newName;
      if (!DB.apiKeys) DB.apiKeys = { claude: '', gemini: '', groq: '' };
      let keyChanged = false;
      Object.keys(AI_PROVIDERS).forEach(id => {
        const inp = document.getElementById('sKey_' + id);
        if (inp) {
          const val = inp.value.trim();
          if (val !== DB.apiKeys[id]) { DB.apiKeys[id] = val; keyChanged = true; }
        }
      });
      saveDB();
      document.getElementById('tbAv').textContent = DB.name[0]?.toUpperCase() || 'S';
      document.getElementById('tbName').textContent = DB.name;
      closeModal(); showToast('Saved.');
      if (keyChanged || nameChanged) {
        document.getElementById('chatMsgs').innerHTML = ''; chatHist = [];
        const qrow = document.getElementById('qrow');
        if (qrow) { qrow.style.display = 'flex'; qrow.style.opacity = '1'; }
        updateModelBadge(); initChat();
      }
    }
    function resetAll() { localStorage.removeItem('sf5'); location.reload(); }

    // ─── WEB BROWSER (Google home + any site, blocklist enforced) ─────
    const GOOGLE_HOME = 'https://www.google.com/webhp?igu=1';
    let webInited = false;
    let webExtBridgeReady = false;
    let webviewNavFromApp = false;
    let pendingWebNavUrl = '';

    function webExtActive() {
      return extAvailable() || webExtBridgeReady;
    }

    function probeExtensionBridge() {
      if (extAvailable()) {
        try { window.__SF_WEB_EMBED_BASE = chrome.runtime.getURL('web-embed.html'); } catch (_) {}
        if (!webExtBridgeReady) onWebExtensionBridgeReady(window.__SF_WEB_EMBED_BASE || '');
        updateWebEmbedHint();
        return;
      }
      try { window.postMessage({ type: 'SF_EXT_PROBE' }, '*'); } catch (_) {}
    }

    function getWebEmbedBaseUrl() {
      if (extAvailable()) {
        try { return chrome.runtime.getURL('web-embed.html'); } catch (_) {}
      }
      return window.__SF_WEB_EMBED_BASE || '';
    }

    function unwrapWebEmbedUrl(url) {
      if (!url) return url;
      try {
        const u = new URL(url);
        if (!/\/web-embed\.html/i.test(u.pathname)) return url;
        const inner = u.searchParams.get('u') || u.searchParams.get('url');
        if (!inner) return url;
        try { return decodeURIComponent(inner); } catch (_) { return inner; }
      } catch (_) { return url; }
    }

    /** Desktop EXE: direct loadURL — extension uses the same direct iframe src. */
    function webFrameTargetUrl(url) {
      if (!url || !/^https?:\/\//i.test(url)) return url;
      return normalizeGoogleEmbedUrl(url);
    }

    function hideWebLoadFail() {
      const el = document.getElementById('webLoadFail');
      if (el) el.classList.remove('active');
    }

    function showWebLoadFail(url) {
      const el = document.getElementById('webLoadFail');
      const label = document.getElementById('webLoadFailUrl');
      if (label) {
        try { label.textContent = new URL(url).hostname.replace(/^www\./, ''); } catch (_) { label.textContent = url || 'This site'; }
      }
      if (el) {
        el.dataset.url = url || '';
        el.classList.add('active');
      }
      setWebLoading(false);
    }

    function webOpenExternalFallback() {
      const url = document.getElementById('webLoadFail')?.dataset?.url || webCurrentUrl;
      if (!url) return;
      if (extAvailable()) chrome.tabs.create({ url, active: true });
      else window.open(url, '_blank', 'noopener');
    }

    function ensureWebEmbedRules() {
      const domains = DB.blockedSites || [];
      return new Promise((resolve) => {
        if (extAvailable()) {
          chrome.runtime.sendMessage({ type: 'REGISTER_STUDY_TAB', domains }, () => {
            void chrome.runtime.lastError;
            setTimeout(resolve, 100);
          });
          return;
        }
        if (webExtBridgeReady) {
          webExtSendMessage({ type: 'REGISTER_STUDY_TAB', domains }).then(() => resolve());
          return;
        }
        resolve();
      });
    }

    function webExtSendMessage(msg) {
      return new Promise((resolve) => {
        if (extAvailable()) {
          chrome.runtime.sendMessage(msg, (res) => {
            void chrome.runtime.lastError;
            resolve(res);
          });
          return;
        }
        if (!webExtBridgeReady) {
          resolve(null);
          return;
        }
        const reqId = 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        const onReply = (e) => {
          if (e.source !== window || !e.data || e.data.type !== 'SF_EXT_REPLY' || e.data.reqId !== reqId) return;
          window.removeEventListener('message', onReply);
          resolve(e.data.response);
        };
        window.addEventListener('message', onReply);
        window.postMessage({ type: 'SF_EXT_SEND', reqId, msg }, '*');
        setTimeout(() => {
          window.removeEventListener('message', onReply);
          resolve(null);
        }, 12000);
      });
    }

    function onWebExtensionBridgeReady(embedBase) {
      if (embedBase) window.__SF_WEB_EMBED_BASE = embedBase;
      else if (extAvailable()) {
        try { window.__SF_WEB_EMBED_BASE = chrome.runtime.getURL('web-embed.html'); } catch (_) {}
      }
      const wasReady = webExtBridgeReady;
      webExtBridgeReady = true;
      updateWebEmbedHint();
      registerStudyTab();
      pushBlockedDomainsToBackground();
      const onWeb = document.getElementById('view-web')?.classList.contains('active');
      if (!onWeb) return;
      const reload = webCurrentUrl || pendingWebNavUrl;
      if (!wasReady && reload) {
        const u = pendingWebNavUrl || webCurrentUrl;
        pendingWebNavUrl = '';
        const bar = document.getElementById('webUrlInp')?.value;
        void webLoadUrl(u, { push: false, displayInBar: bar != null ? bar : u, skipYoutubeCheck: false });
        return;
      }
      if (!wasReady && !webCurrentUrl) openGoogleHome();
    }

    function initWebExtensionBridgeListener() {
      if (window.__sfWebBridgeListener) return;
      window.__sfWebBridgeListener = true;
      window.addEventListener('message', (e) => {
        if (e.source !== window || !e.data) return;
        if (e.data.type === 'SF_EXT_BRIDGE_READY') {
          onWebExtensionBridgeReady(e.data.embedBase || '');
          return;
        }
        if (e.data.type !== 'SF_EXT_PUSH' || !e.data.msg) return;
        const msg = e.data.msg;
        if (msg.type === 'WEB_FRAME_NAV' && msg.url) {
          handleWebFrameNav(msg.url);
          return;
        }
        if (msg.type === 'WEB_YOUTUBE_BLOCKED') {
          showYoutubeBlocked(msg.reason, msg.channelName, msg.redirect);
          return;
        }
        if (msg.type === 'WEB_FRAME_BLOCKED' && msg.domain) {
          handleWebFrameBlocked(msg.domain);
        }
      });
    }

    function isWebViewEl(el) {
      return el && el.tagName && el.tagName.toLowerCase() === 'webview';
    }

    /** Desktop app uses <webview> (iframes show blank for Google/sites). */
    function getWebBrowserEl() {
      const iframe = document.getElementById('webFrame');
      const wv = document.getElementById('webView');
      if (desktopAvailable() && wv) {
        if (iframe) iframe.classList.add('hidden');
        wv.classList.remove('hidden');
        return wv;
      }
      if (wv) {
        wv.classList.add('hidden');
        try { wv.stop(); } catch (_) {}
        wv.removeAttribute('src');
      }
      if (iframe) iframe.classList.remove('hidden');
      return iframe;
    }
    let webHistory = [];
    let webHistIdx = -1;
    let webCurrentUrl = '';
    let webLastNavUrl = '';

    function webBlockedPageUrl(domain) {
      const q = '?domain=' + encodeURIComponent(domain || 'blocked site') + '&embed=1';
      if (extAvailable()) return chrome.runtime.getURL('blocked.html') + q;
      try { return new URL('blocked.html' + q, window.location.href).href; } catch (_) { return ''; }
    }

    function webLoadBlockedPage(domain) {
      const url = webBlockedPageUrl(domain);
      hideWebBlockedOverlay();
      hideYoutubeBlocked();
      if (!url) {
        showWebBlockedOverlay(domain);
        return;
      }
      webLastNavUrl = url;
      webLoadUrl(url, { push: false, displayInBar: domain, skipYoutubeCheck: true });
    }

    function isGoogleUrl(url) {
      try {
        const h = new URL(url).hostname.replace(/^www\./, '');
        return h === 'google.com' || h.endsWith('.google.com');
      } catch (_) { return false; }
    }

    /** Keep Google in embedded (igu=1) mode so result links work in-app. */
    function normalizeGoogleEmbedUrl(url) {
      if (!url || !isGoogleUrl(url)) return url;
      try {
        const u = new URL(url);
        if (!u.searchParams.has('igu')) u.searchParams.set('igu', '1');
        return u.href;
      } catch (_) { return url; }
    }

    function googleSearchUrl(query) {
      return 'https://www.google.com/search?igu=1&q=' + encodeURIComponent(query);
    }

    function webNavUrlsEqual(a, b) {
      return unwrapWebEmbedUrl(a) === unwrapWebEmbedUrl(b);
    }

    function routeWebviewNav(url, wv) {
      const resolved = resolveGoogleRedirectUrl(url);
      if (!resolved) return;
      if (isGoogleUrl(resolved)) {
        void webLoadUrl(normalizeGoogleEmbedUrl(resolved), { push: true, displayInBar: '' });
        return;
      }
      if (isEduYoutubeEnabled() && isYoutubePageUrl(resolved)) {
        if (!guardWebviewYoutubeNavigateSync(resolved)) {
          const sync = EduYoutube.checkUrlSync(resolved, DB.eduYoutubeExtra, youtubeHubUrl());
          void applyYoutubeGuardResult(sync, wv);
        } else {
          void webLoadUrl(resolved, { push: true, displayInBar: resolved });
        }
        return;
      }
      void webLoadUrl(resolved, { push: true, displayInBar: resolved });
    }

    function youtubeSearchUrl(query) {
      return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    }

    function isYoutubeWebContext(url) {
      if (!url) return false;
      if (url.includes('youtube-study.html')) return true;
      try {
        const h = new URL(url).hostname.replace(/^www\./, '');
        return h === 'youtube.com' || h === 'youtu.be' || h === 'm.youtube.com';
      } catch (_) { return false; }
    }

    function resolveWebInput(raw) {
      const q = (raw || '').trim();
      if (!q) return null;
      const hasProtocol = /^https?:\/\//i.test(q);
      const looksLikeUrl = hasProtocol || (/^[\w-]+(\.[\w-]+)+/.test(q) && !/\s/.test(q) && q.includes('.'));
      if (looksLikeUrl) {
        const href = hasProtocol ? q : 'https://' + q;
        try { return new URL(href).href; } catch (_) { return null; }
      }
      if (isYoutubeWebContext(webCurrentUrl)) return youtubeSearchUrl(q);
      return googleSearchUrl(q);
    }

    function updateWebUrlFieldForContext(url) {
      const inp = document.getElementById('webUrlInp');
      if (!inp) return;
      if (isYoutubeWebContext(url)) {
        inp.placeholder = 'Search YouTube (study videos only on play)';
      } else {
        inp.placeholder = 'Search or URL (e.g. tata.com)';
      }
    }

    function hostnameFromUrl(url) {
      try { return new URL(url).hostname.replace(/^www\./, ''); } catch (_) { return ''; }
    }

    function updateWebShieldBadge() {
      const el = document.getElementById('webShieldBadge');
      if (!el) return;
      const n = (DB.blockedSites || []).length;
      if (n > 0) {
        el.textContent = n + ' blocked';
        el.classList.add('on');
      } else {
        el.textContent = 'No blocks';
        el.classList.remove('on');
      }
    }

    function updateWebEmbedHint() {
      const hint = document.getElementById('webEmbedHint');
      if (!hint) return;
      const needsBridge = !desktopAvailable() && !webExtActive();
      hint.classList.toggle('hidden', !needsBridge);
      if (needsBridge) {
        hint.innerHTML = 'Install &amp; enable the <strong>StudyFlow Chrome extension</strong>, then open StudyFlow from the extension icon (not only this web page). Reload the extension at <code>chrome://extensions</code>. You can still use <strong>↗ Open in new tab</strong>.';
      }
    }

    function updateWebNavButtons() {
      const back = document.getElementById('webBack');
      const fwd = document.getElementById('webForward');
      const el = document.getElementById('webView') && desktopAvailable() ? getWebBrowserEl() : null;
      const canBack = webHistIdx > 0 || (el && isWebViewEl(el) && el.canGoBack && el.canGoBack());
      const canFwd = (webHistIdx >= 0 && webHistIdx < webHistory.length - 1) || (el && isWebViewEl(el) && el.canGoForward && el.canGoForward());
      if (back) back.disabled = !canBack;
      if (fwd) fwd.disabled = !canFwd;
    }

    function webOpenInNewTab() {
      const raw = document.getElementById('webUrlInp')?.value;
      const url = resolveWebInput(raw) || webCurrentUrl;
      if (!url) { showToast('Enter a URL first'); return; }
      const domain = hostnameFromUrl(url);
      if (isBlockedDomain(domain)) {
        handleWebFrameBlocked(domain);
        return;
      }
      if (!extAvailable()) {
        window.open(url, '_blank', 'noopener');
        return;
      }
      chrome.tabs.create({ url, active: true });
    }

    function setWebLoading(show) {
      const el = document.getElementById('webLoading');
      if (el) el.classList.toggle('hidden', !show);
    }

    function hideWebBlockedOverlay() {
      const blocked = document.getElementById('webBlocked');
      if (blocked) blocked.classList.remove('active');
    }

    function showWebBlockedOverlay(domain) {
      const blocked = document.getElementById('webBlocked');
      const label = document.getElementById('webBlockedDomain');
      if (label) label.textContent = domain;
      if (blocked) blocked.classList.add('active');
      setWebLoading(false);
    }

    function handleWebFrameBlocked(domain) {
      if (!domain) return;
      webLoadBlockedPage(domain);
      if (isRun && !isBreak && !enforcementPaused) {
        if (domain !== lastCaughtDomain) {
          lastCaughtDomain = domain;
          blockedHitCount++;
          escCount++;
          triggerBlockedRoast(domain, 0);
        }
      } else {
        showToast('Blocked: ' + domain);
      }
    }

    function openGoogleHome() {
      pendingWebNavUrl = '';
      webLoadUrl(GOOGLE_HOME, { push: true, displayInBar: '' });
      registerStudyTab();
      pushBlockedDomainsToBackground();
    }

    function webNavigateFromInput(raw) {
      const url = resolveWebInput(raw);
      if (!url) { showToast('Enter a URL or search term'); return; }
      const domain = hostnameFromUrl(url);
      if (isBlockedDomain(domain)) {
        handleWebFrameBlocked(domain);
        return;
      }
      const display = (raw || '').trim();
      webLoadUrl(url, { push: true, displayInBar: looksLikeUrlInput(display) ? url : display });
    }

    function looksLikeUrlInput(raw) {
      const q = (raw || '').trim();
      return /^https?:\/\//i.test(q) || (/^[\w-]+(\.[\w-]+)+/.test(q) && q.includes('.'));
    }

    function showYoutubeBlocked(reason, channelName, redirect) {
      hideWebBlockedOverlay();
      const el = document.getElementById('webYoutubeBlocked');
      const msg = document.getElementById('webYoutubeBlockedMsg');
      const name = document.getElementById('webYoutubeBlockedChannel');
      if (msg) msg.textContent = reason || 'Only approved study channels are allowed on YouTube.';
      if (name) {
        name.textContent = channelName ? channelName : '';
        name.style.display = channelName ? 'inline-block' : 'none';
      }
      if (el) {
        el.classList.add('active');
        el.dataset.redirect = redirect || youtubeHubUrl();
      }
      setWebLoading(false);
      const frame = getWebBrowserEl();
      if (frame && !isWebViewEl(frame)) {
        frame.classList.add('hidden');
        frame.removeAttribute('src');
      } else if (frame) {
        frame.classList.remove('hidden');
      }
    }

    function hideYoutubeBlocked() {
      const el = document.getElementById('webYoutubeBlocked');
      if (el) el.classList.remove('active');
      const frame = getWebBrowserEl();
      if (frame) frame.classList.remove('hidden');
    }

    function openYoutubeHub() {
      hideYoutubeBlocked();
      webLoadUrl(youtubeHubUrl(true), { push: true, displayInBar: 'Study YouTube', skipYoutubeCheck: true });
    }

    /** Browser iframe hub (same origin) — direct open; webview uses ipc preload instead */
    function wireHubIframe(frame) {
      if (!frame || isWebViewEl(frame)) return;
      const src = frame.src || frame.getAttribute('src') || '';
      if (!/youtube-study\.html/i.test(src)) return;
      try {
        const win = frame.contentWindow;
        if (!win) return;
        const openFn = function (url) {
          if (!url) return;
          hideYoutubeBlocked();
          webLoadUrl(url, { push: true, displayInBar: url, skipYoutubeCheck: false });
        };
        win.__studyflowOpenYoutube = openFn;
        win.openChannel = openFn;
      } catch (_) {}
    }

    async function webLoadUrl(url, opts) {
      url = normalizeYoutubeEntryUrl(url);
      url = normalizeGoogleEmbedUrl(url);
      const push = !opts || opts.push !== false;
      const domain = hostnameFromUrl(url);
      if (isBlockedDomain(domain)) {
        webLastNavUrl = url;
        handleWebFrameBlocked(domain);
        return;
      }
      if (!opts?.skipYoutubeCheck && isEduYoutubeEnabled()) {
        const yt = await checkYoutubeForWeb(url);
        if (!(await applyYoutubeGuardResult(yt, null))) return;
      }
      hideWebBlockedOverlay();
      hideYoutubeBlocked();
      hideWebLoadFail();
      setWebLoading(true);
      armWebLoadSafetyTimer();
      const frame = getWebBrowserEl();
      const targetUrl = webFrameTargetUrl(url);
      if (!isWebViewEl(frame) && (extAvailable() || webExtBridgeReady)) await ensureWebEmbedRules();
      if (isWebViewEl(frame)) await syncWebviewStudyData(frame);
      const urlInp = document.getElementById('webUrlInp');
      const barVal = opts && opts.displayInBar !== undefined ? opts.displayInBar : url;
      if (urlInp) urlInp.value = barVal;
      if (frame) {
        frame.classList.remove('hidden');
        if (isWebViewEl(frame)) {
          webviewNavFromApp = true;
          try { frame.loadURL(targetUrl); } catch (_) { frame.src = targetUrl; }
        } else {
          frame.src = targetUrl;
          if (/youtube-study\.html/i.test(url)) {
            frame.addEventListener('load', function wireHubOnce() {
              wireHubIframe(frame);
            }, { once: true });
          }
        }
      }
      if (isWebViewEl(frame) && isYoutubePageUrl(url)) {
        frame.addEventListener('dom-ready', function onYtReady() {
          injectWebviewYoutubeGuard(frame);
          syncWebviewStudyData(frame);
        }, { once: true });
      }
      webCurrentUrl = unwrapWebEmbedUrl(url);
      webLastNavUrl = url;
      updateWebUrlFieldForContext(webCurrentUrl);
      if (push) {
        if (webHistIdx < webHistory.length - 1) webHistory = webHistory.slice(0, webHistIdx + 1);
        if (webHistory[webHistIdx] !== webCurrentUrl) {
          webHistory.push(webCurrentUrl);
          webHistIdx = webHistory.length - 1;
        }
      }
      updateWebNavButtons();
    }

    function webGoBack() {
      if (webHistIdx > 0) {
        webHistIdx--;
        const url = webHistory[webHistIdx];
        if (isBlockedDomain(hostnameFromUrl(url))) {
          handleWebFrameBlocked(hostnameFromUrl(url));
          return;
        }
        webLoadUrl(url, { push: false });
        return;
      }
      const frame = getWebBrowserEl();
      if (!frame) return;
      if (isWebViewEl(frame) && frame.canGoBack()) {
        frame.goBack();
        updateWebNavButtons();
        return;
      }
      try {
        frame.contentWindow.history.back();
        frame.dataset.canForward = '1';
        updateWebNavButtons();
      } catch (_) { showToast('Back unavailable for this page'); }
    }

    function webGoForward() {
      if (webHistIdx < webHistory.length - 1) {
        webHistIdx++;
        const url = webHistory[webHistIdx];
        if (isBlockedDomain(hostnameFromUrl(url))) {
          handleWebFrameBlocked(hostnameFromUrl(url));
          return;
        }
        webLoadUrl(url, { push: false });
        return;
      }
      const frame = getWebBrowserEl();
      if (!frame) return;
      if (isWebViewEl(frame) && frame.canGoForward()) {
        frame.goForward();
        updateWebNavButtons();
        return;
      }
      try {
        frame.contentWindow.history.forward();
        updateWebNavButtons();
      } catch (_) { }
    }

    function webReload() {
      if (!webCurrentUrl) {
        openGoogleHome();
        return;
      }
      if (isBlockedDomain(hostnameFromUrl(webCurrentUrl))) {
        handleWebFrameBlocked(hostnameFromUrl(webCurrentUrl));
        return;
      }
      hideWebBlockedOverlay();
      setWebLoading(true);
      const frame = getWebBrowserEl();
      if (!frame) return;
      if (isWebViewEl(frame)) {
        try { frame.reload(); } catch (_) { frame.loadURL(webCurrentUrl); }
        return;
      }
      try {
        frame.contentWindow.location.reload();
      } catch (_) {
        frame.src = webFrameTargetUrl(webCurrentUrl);
      }
    }

    async function onWebFrameLoad() {
      const frame = getWebBrowserEl();
      if (!frame) return;
      if (webLoadSafetyTimer) {
        clearTimeout(webLoadSafetyTimer);
        webLoadSafetyTimer = null;
      }
      setWebLoading(false);
      if (isWebViewEl(frame)) frame.classList.remove('hidden');
      let href = '';
      if (isWebViewEl(frame)) {
        try { href = frame.getURL() || ''; } catch (_) { href = ''; }
      } else {
        try { href = frame.contentWindow.location.href; } catch (_) {
          const pending = webLastNavUrl || webCurrentUrl;
          const pendingDomain = hostnameFromUrl(pending);
          if (pendingDomain && isBlockedDomain(pendingDomain)) {
            handleWebFrameBlocked(pendingDomain);
          }
          updateWebNavButtons();
          return;
        }
      }
      if (!href || href === 'about:blank') return;

      const displayHref = unwrapWebEmbedUrl(href);

      if (href.includes('blocked.html')) {
        hideWebBlockedOverlay();
        hideYoutubeBlocked();
        webCurrentUrl = displayHref;
        updateWebNavButtons();
        return;
      }

      const domain = hostnameFromUrl(displayHref);
      if (domain && isBlockedDomain(domain)) {
        handleWebFrameBlocked(domain);
        return;
      }

      if (href.includes('youtube-study.html') && !isWebViewEl(frame)) {
        wireHubIframe(frame);
      }
      if (isEduYoutubeEnabled() && isYoutubePageUrl(displayHref)) {
        const yt = await checkYoutubeForWeb(displayHref);
        if (!(await applyYoutubeGuardResult(yt, frame))) return;
        if (isWebViewEl(frame)) injectWebviewYoutubeGuard(frame);
      }
      if (isWebViewEl(frame) && href.includes('youtube-study.html')) {
        syncWebviewStudyData(frame);
      }

      hideWebBlockedOverlay();
      hideYoutubeBlocked();
      hideWebLoadFail();
      if (webBlankCheckTimer) {
        clearTimeout(webBlankCheckTimer);
        webBlankCheckTimer = null;
      }
      webCurrentUrl = displayHref;
      updateWebUrlFieldForContext(displayHref);
      const urlInp = document.getElementById('webUrlInp');
      if (urlInp) {
        if (isGoogleUrl(displayHref)) {
          try {
            const q = new URL(displayHref).searchParams.get('q');
            urlInp.value = q || displayHref;
          } catch (_) {
            urlInp.value = displayHref;
          }
        } else {
          urlInp.value = displayHref;
        }
      }
      if (webHistIdx < 0 || !webNavUrlsEqual(webHistory[webHistIdx], displayHref)) {
        if (webHistIdx < webHistory.length - 1) webHistory = webHistory.slice(0, webHistIdx + 1);
        webHistory.push(displayHref);
        webHistIdx = webHistory.length - 1;
      }
      updateWebNavButtons();
    }

    function ensureWebviewPreload(wv) {
      if (!wv || !desktopAvailable() || wv.dataset.preloadReady === '1') return;
      const apply = (fileUrl) => {
        if (!fileUrl) return;
        wv.setAttribute('preload', fileUrl);
        wv.dataset.preloadReady = '1';
      };
      if (window.__SF_WEBVIEW_PRELOAD) {
        apply(window.__SF_WEBVIEW_PRELOAD);
        return;
      }
      if (studyflowDesktop.getWebviewPreloadPath) {
        studyflowDesktop.getWebviewPreloadPath().then((p) => {
          if (p) apply('file:///' + String(p).replace(/\\/g, '/'));
        }).catch(() => {});
      }
    }

    function initWebBrowser() {
      if (webInited) return;
      webInited = true;
      initWebExtensionBridgeListener();
      updateWebEmbedHint();
      const frame = document.getElementById('webFrame');
      const wv = document.getElementById('webView');
      ensureWebviewPreload(wv);
      if (frame) frame.addEventListener('load', onWebFrameLoad);
      if (wv) {
        wv.addEventListener('ipc-message', (e) => {
          if (e.channel === 'sf-open-youtube' && e.args && e.args[0]) {
            hideYoutubeBlocked();
            webLoadUrl(String(e.args[0]), { push: true, displayInBar: e.args[0], skipYoutubeCheck: false });
          }
        });
        wv.addEventListener('will-navigate', (e) => {
          if (!e.url || e.url.includes('youtube-study.html')) return;
          if (webviewNavFromApp) {
            webviewNavFromApp = false;
            return;
          }
          const resolved = resolveGoogleRedirectUrl(e.url);
          if (isGoogleUrl(resolved)) return;
          if (isEduYoutubeEnabled() && isYoutubePageUrl(resolved)) {
            if (!guardWebviewYoutubeNavigateSync(resolved)) {
              e.preventDefault();
              const sync = EduYoutube.checkUrlSync(resolved, DB.eduYoutubeExtra, youtubeHubUrl());
              void applyYoutubeGuardResult(sync, wv);
            }
            return;
          }
          e.preventDefault();
          routeWebviewNav(resolved, wv);
        });
        wv.addEventListener('new-window', (e) => {
          if (e.preventDefault) e.preventDefault();
          if (e.url) routeWebviewNav(e.url, wv);
        });
        wv.addEventListener('did-finish-load', onWebFrameLoad);
        wv.addEventListener('did-navigate', onWebFrameLoad);
        wv.addEventListener('did-navigate-in-page', onWebFrameLoad);
        wv.addEventListener('dom-ready', () => {
          setWebLoading(false);
          wv.classList.remove('hidden');
          injectWebviewYoutubeGuard(wv);
          if ((wv.getURL() || '').includes('youtube-study.html')) syncWebviewStudyData(wv);
        });
        wv.addEventListener('did-fail-load', (e) => {
          if (e.isMainFrame === false) return;
          if (webLoadSafetyTimer) {
            clearTimeout(webLoadSafetyTimer);
            webLoadSafetyTimer = null;
          }
          setWebLoading(false);
          wv.classList.remove('hidden');
          if (e.errorCode === -3) return;
          if (e.errorCode === -106 || e.errorDescription === 'ERR_INTERNET_DISCONNECTED') {
            showToast('No internet — check your Wi‑Fi, then tap Reload.');
          } else if (e.errorCode && e.errorCode !== -2) {
            showToast('Page failed to load (' + e.errorCode + '). Tap Reload.');
          }
        });
      }
      getWebBrowserEl();
      window.addEventListener('message', async (e) => {
        if (e.data?.type === 'SF_OPEN_YOUTUBE' && e.data.url) {
          hideYoutubeBlocked();
          await webLoadUrl(e.data.url, { push: true, displayInBar: e.data.url, skipYoutubeCheck: false });
          try {
            if (e.source && e.source.postMessage) {
              e.source.postMessage({ type: 'SF_OPEN_YOUTUBE_ACK' }, '*');
            }
          } catch (_) {}
          return;
        }
        if (e.data?.type === 'SF_YT_GUARD_CHECK' && e.data.url) {
          const yt = await checkYoutubeForWeb(e.data.url);
          const target = e.source;
          if (target && target.postMessage) {
            target.postMessage({ type: 'SF_YT_GUARD_RESULT', reqId: e.data.reqId, result: yt }, '*');
          }
        }
      });
      updateWebShieldBadge();
    }

    // ─── NAVIGATION ──────────────────────────────
    function showTab(name, tabEl, isSidebar) {
      const featByTab = { ai: 'ai', web: 'web', stats: 'stats', streak: 'streak', block: 'block' };
      if (featByTab[name] && !isParentalFeatureOn(featByTab[name])) {
        showToast('This section is disabled in parental mode.');
        return;
      }
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById('view-' + name).classList.add('active');
      // mobile bottom nav
      document.querySelectorAll('.mnb').forEach(b => b.classList.remove('active'));
      const mnb = document.getElementById('mnb-' + name);
      if (mnb) mnb.classList.add('active');
      // desktop sidebar
      document.querySelectorAll('.sb-btn').forEach(b => b.classList.remove('active'));
      const sbBtn = document.getElementById('sb-' + name);
      if (sbBtn) sbBtn.classList.add('active');
      if (name === 'stats') renderStats();
      if (name === 'streak') renderStreak();
      if (name === 'block') { renderBlockList(); updatePcLockStatus(); }
      if (name === 'web') {
        hideEscWarn();
        initWebBrowser();
        updateWebEmbedHint();
        updateWebShieldBadge();
        registerStudyTab();
        pushBlockedDomainsToBackground();
        setTimeout(() => {
          registerStudyTab();
          pushBlockedDomainsToBackground();
        }, 300);
        if (pendingWebNavUrl) {
          const u = pendingWebNavUrl;
          pendingWebNavUrl = '';
          void webLoadUrl(u, { push: true, displayInBar: u });
        } else {
          openGoogleHome();
        }
      }
      syncWebTabActiveFlag(name === 'web');
    }

    function syncWebTabActiveFlag(active) {
      if (!webExtActive()) return;
      if (active) {
        registerStudyTab();
        void ensureWebEmbedRules();
      }
      webExtSendMessage({ type: 'WEB_TAB_ACTIVE', active: !!active });
    }

    // ─── MODALS ───────────────────────────────────
    function showModal(html) {
      document.getElementById('MODAL_BOX').innerHTML = html;
      const m = document.getElementById('MODAL');
      m.style.display = 'flex';
      enforcementPaused = true;
    }
    function closeModal() {
      document.getElementById('MODAL').style.display = 'none';
      document.getElementById('MODAL_BOX').innerHTML = '';
      pendingParentalAction = null;
      setTimeout(() => { enforcementPaused = false; }, 300);
    }
    function closeM(id) { closeModal(); }
    function showScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); }

    // ─── MISC ─────────────────────────────────────
    let toastT;
    function showToast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }
    function notify(title, body) { if ('Notification' in window && Notification.permission === 'granted') try { new Notification(title, { body }); } catch (e) { } }

    function initUIEvents() {
      document.addEventListener('click', (e) => {
        const modal = e.target.closest('[data-action="modal-overlay-close"]');
        if (modal && e.target === modal) { closeModal(); return; }

        const el = e.target.closest('[data-action]');
        if (!el) return;
        const action = el.dataset.action;
        const idx = el.dataset.index !== undefined ? +el.dataset.index : undefined;
        const subIdx = el.dataset.subIndex !== undefined ? +el.dataset.subIndex : undefined;

        switch (action) {
          case 'toggle-setup-preset': toggleSetupPreset(el.dataset.domain, el); break;
          case 'add-setup-block': addSetupBlock(); break;
          case 'remove-setup-block': setupBlocks.splice(idx, 1); renderSetupBtags(); break;
          case 'add-sub-row': addSubRow(); break;
          case 'cycle-sub-color': cycleSubColor(subIdx, el); break;
          case 'remove-sub': setupSubs.splice(subIdx, 1); renderSetupSubs(); break;
          case 'select-setup-provider': selectSetupProvider(el.dataset.provider); break;
          case 'select-setup-theme': selectSetupTheme(el.dataset.theme, el); break;
          case 'finish-setup': finishSetup(); break;
          case 'provider-setup-info': showProviderSetupInfo(el.dataset.provider); break;
          case 'show-tab': showTab(el.dataset.tab, el, el.dataset.sidebar === '1'); break;
          case 'open-theme-picker': openThemePicker(); break;
          case 'open-settings': openSettings(); break;
          case 'set-mode': setMode(el.dataset.mode, el); break;
          case 'toggle-timer': toggleTimer(); break;
          case 'reset-timer': resetTimer(); break;
          case 'skip-phase': skipPhase(); break;
          case 'open-add-sub': openAddSub(); break;
          case 'open-ai-picker': openAiPicker(); break;
          case 'send-msg': sendMsg(); break;
          case 'add-block': addBlock(); break;
          case 'toggle-preset': togglePreset(el.dataset.domain); break;
          case 'remove-block': removeBlock(idx); break;
          case 'hide-lock': hideLock(); break;
          case 'stay-focused': stayFocused(); break;
          case 'confirm-leave': confirmLeave(); break;
          case 'close-modal': closeModal(); break;
          case 'switch-ai-provider': switchAiProvider(el.dataset.provider); break;
          case 'save-new-provider-key': saveNewProviderKey(el.dataset.provider); break;
          case 'select-subject': selectSubject(+el.dataset.subjectIndex); break;
          case 'pick-sub-color': pickSubColor(el.dataset.color, el); break;
          case 'add-subject': addSubject(); break;
          case 'pick-theme': pickTheme(el.dataset.theme); break;
          case 'save-settings': saveSettings(); break;
          case 'reset-all': if (confirm('Nuke everything?')) resetAll(); break;
          case 'qsend': qsend(el.dataset.msg); break;
          case 'web-back': webGoBack(); break;
          case 'web-forward': webGoForward(); break;
          case 'web-reload': webReload(); break;
          case 'web-home': openGoogleHome(); break;
          case 'web-go': webNavigateFromInput(document.getElementById('webUrlInp')?.value); break;
          case 'web-open-tab': webOpenInNewTab(); break;
          case 'web-open-external': webOpenExternalFallback(); break;
          case 'web-youtube-hub': openYoutubeHub(); break;
          case 'add-edu-youtube': addEduYoutubeChannel(); break;
          case 'remove-edu-youtube': removeEduYoutubeChannel(el.dataset.handle); break;
          case 'pc-lock-retry':
            stopPcLockInstallPoll();
            updatePcLockStatus().then(() => {
              const st = document.getElementById('pcLockStatus');
              showToast(st?.classList.contains('ready') ? 'PC Lock is running.' : 'Not connected yet — run StudyFlow-Lock-Setup.exe from Downloads.');
            });
            break;
          case 'pc-lock-emergency-unlock':
            emergencyUnlockAltTab();
            break;
          case 'pc-lock-repair':
            downloadPcLockRepairKit();
            break;
          case 'pc-lock-install': installPcLockFromSite(); break;
          case 'open-parental-setup': openParentalGate(); break;
          case 'parental-confirm-password': confirmParentalPassword(); break;
          case 'parental-save': saveParentalSettings(); break;
          case 'parental-disable': disableParentalFromSettings(); break;
        }
      });

      document.addEventListener('change', (e) => {
        const inp = e.target;
        if (inp.id === 'eduYtToggle') {
          toggleEduYoutube(inp.checked);
          return;
        }
        if (inp.id === 'cStudy' || inp.id === 'cBreak') {
          syncCustomModeFromInputs();
          return;
        }
        if (inp.classList?.contains('sub-inp') && inp.dataset.subIndex !== undefined) {
          setupSubs[+inp.dataset.subIndex].name = inp.value.trim();
        }
      });

      document.addEventListener('input', (e) => {
        if (e.target.id === 'cStudy' || e.target.id === 'cBreak') syncCustomModeFromInputs();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.id === 'setupBlockInp') { e.preventDefault(); addSetupBlock(); return; }
        if (e.key === 'Enter' && e.target.id === 'bInp') { e.preventDefault(); addBlock(); return; }
        if (e.key === 'Enter' && e.target.id === 'webUrlInp') { e.preventDefault(); webNavigateFromInput(e.target.value); return; }
        if (e.key === 'Enter' && e.target.id === 'eduYtInp') { e.preventDefault(); addEduYoutubeChannel(); return; }
        if (e.key === 'Enter' && e.target.id === 'parentalPwInp') { e.preventDefault(); confirmParentalPassword(); return; }
        if (e.key === 'Enter' && e.target.id === 'wQuitPwInp') { e.preventDefault(); confirmQuitFocus(); return; }
        if (e.target.id === 'chatInp') { chatKey(e); return; }
        const themeEl = e.target.closest('[data-action="pick-theme"]');
        if (themeEl && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          pickTheme(themeEl.dataset.theme);
          return;
        }
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
          e.preventDefault();
          if (DB.setupDone) toggleTimer();
        }
        if (e.code === 'Escape') {
          if (isFocusLocked()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            silentRelockFullscreen();
            return;
          }
          if (lockVis && isBreak) hideLock();
        }
        if (isFocusLocked() && (e.code === 'F11' || (e.altKey && e.code === 'Enter'))) {
          e.preventDefault();
          e.stopImmediatePropagation();
          silentRelockFullscreen();
        }
      });
    }

    initUIEvents();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
