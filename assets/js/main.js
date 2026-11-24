(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  // scroll reveal
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // counters
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || '', done = false;
    var run = function () {
      if (done) return; done = true;
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.floor(target * p) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, o) {
        if (es[0].isIntersecting) { run(); o.disconnect(); }
      }).observe(el);
    } else { el.textContent = target + suffix; }
  });

  // portfolio filter
  var fb = document.querySelectorAll('.filters button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.dataset.f;
      document.querySelectorAll('.proj').forEach(function (p) {
        p.classList.toggle('hide', f !== 'all' && p.dataset.cat !== f);
      });
    });
  });

  // contact form -> opens email client (swap for Formspree/Netlify Forms when live)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = 'Name: ' + d.get('name') + '\nEmail: ' + d.get('email') + '\nService: ' + d.get('service') + '\n\n' + d.get('message');
      window.location.href = 'mailto:' + form.dataset.to + '?subject=' + encodeURIComponent('Project enquiry from ' + d.get('name')) + '&body=' + encodeURIComponent(body);
      document.getElementById('form-msg').textContent = 'Thanks! Your email app should open with your message.';
    });
  }
})();
