document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // Nav active state — anchor tags only (excludes the Help toggle button)
  const navLinks = document.querySelectorAll('a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('nav-link--active'));
      link.classList.add('nav-link--active');
    });
  });

  // Help section collapse / expand — handles both v1 and v2 instances
  document.querySelectorAll('.nav-help-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      const content = document.getElementById(toggle.getAttribute('aria-controls'));
      if (content) {
        content.classList.toggle('is-open', !expanded);
        content.setAttribute('aria-hidden', String(expanded));
      }
    });
  });

  // Option 2 — expandable parent rows (Communication, Learning & Compliance)
  document.querySelectorAll('.nav-expand-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      const items = document.getElementById(toggle.getAttribute('aria-controls'));
      if (items) {
        items.classList.toggle('is-open', !expanded);
        items.setAttribute('aria-hidden', String(expanded));
      }
    });
  });

  // Navigation variant switcher
  const navV1 = document.getElementById('nav-v1');
  const navV3 = document.getElementById('nav-v3');
  const navV4 = document.getElementById('nav-v4');
  const allNavs = [navV1, navV3, navV4];
  const initializedNavs = new Set(['v1']);
  // Chat icon in topbar: shown for Options 2 (v4) and 3 (v3) where Chat
  // lives inside the expandable Communication group rather than top-level
  const topbarChatBtn = document.getElementById('topbar-chat-btn');

  document.querySelectorAll('.nav-switcher__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-switcher__btn').forEach(b => b.classList.remove('nav-switcher__btn--active'));
      btn.classList.add('nav-switcher__btn--active');
      const variant = btn.dataset.nav;
      allNavs.forEach(n => { if (n) n.hidden = true; });
      const target = document.getElementById('nav-' + variant);
      if (target) {
        target.hidden = false;
        if (!initializedNavs.has(variant)) {
          lucide.createIcons();
          initializedNavs.add(variant);
        }
      }
      // Show chat shortcut when Chat is hidden inside a collapsed group
      if (topbarChatBtn) topbarChatBtn.hidden = (variant === 'v1');
    });
  });

  // User menu dropdown
  const userMenuTrigger = document.getElementById('user-menu-trigger');
  const userDropdown = document.getElementById('user-dropdown');
  if (userMenuTrigger && userDropdown) {
    userMenuTrigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = userDropdown.classList.toggle('is-open');
      userDropdown.setAttribute('aria-hidden', String(!isOpen));
    });
    document.addEventListener('click', () => {
      userDropdown.classList.remove('is-open');
      userDropdown.setAttribute('aria-hidden', 'true');
    });
    userDropdown.addEventListener('click', e => e.stopPropagation());
  }

  // Leaderboard tabs
  const tabs = document.querySelectorAll('.leaderboard-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('leaderboard-tab--active'));
      tab.classList.add('leaderboard-tab--active');
    });
  });
});
