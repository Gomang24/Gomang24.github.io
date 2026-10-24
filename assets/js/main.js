/* ==========================================================================
   张三 · 个人主页交互脚本
   1. 深色 / 浅色主题   2. 移动端菜单   3. 滚动状态与高亮
   4. 滚动入场动效       5. 复制邮箱       6. 回到顶部 / 年份
   全部为原生 JavaScript，无任何依赖。
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 主题切换 ---------- */
  var themeBtn = document.getElementById('themeToggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#f6f7fb');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
      themeBtn.setAttribute('title', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
    try { localStorage.setItem('theme', theme); } catch (e) { /* 忽略 */ }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- 2. 移动端菜单 ---------- */
  var menuBtn = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || menuBtn.contains(event.target)) return;
      setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- 3. 滚动状态 + 导航高亮 ---------- */
  var header = document.querySelector('.site-header');
  var toTop = document.getElementById('toTop');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 520);

    // 当前所在区块：取最后一个顶部已越过导航栏的区块
    var offset = y + 120;
    var currentId = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= offset) currentId = section.id;
    });
    // 滚到页面最底部时，强制高亮最后一个区块
    if (window.innerHeight + y >= document.body.offsetHeight - 4 && sections.length) {
      currentId = sections[sections.length - 1].id;
    }
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
    });

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      var behavior = prefersReduced ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior: behavior });
    });
  }

  /* ---------- 4. 滚动入场动效 ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || prefersReduced) {
    Array.prototype.forEach.call(revealItems, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    Array.prototype.forEach.call(revealItems, function (el, index) {
      // 同一屏内的元素依次浮现，最多错开 240ms
      el.style.setProperty('--delay', (index % 4) * 80 + 'ms');
      revealObserver.observe(el);
    });
  }

  /* ---------- 5. 复制邮箱 ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  var copyButtons = document.querySelectorAll('[data-email]');
  Array.prototype.forEach.call(copyButtons, function (button) {
    button.addEventListener('click', function () {
      var email = button.getAttribute('data-email') || '';
      if (!email) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('已复制：' + email);
        }).catch(function () {
          showToast(legacyCopy(email) ? '已复制：' + email : '复制失败，请手动选中邮箱');
        });
      } else {
        showToast(legacyCopy(email) ? '已复制：' + email : '复制失败，请手动选中邮箱');
      }
    });
  });

  /* ---------- 6. 年份 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 平滑滚动（照顾不支持 scroll-behavior 的浏览器） ---------- */
  if (!('scrollBehavior' in document.documentElement.style) && !prefersReduced) {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 84;
        window.scrollTo(0, top);
      });
    });
  }
})();
