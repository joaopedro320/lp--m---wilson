/* Wilson Mármores e Granitos | LP QH4 Growth */
(function () {
  'use strict';

  /* ===== Configuração: troque aqui antes de publicar ===== */
  var GTM_ID = 'GTM-XXXXXXX';           // ID do container do Google Tag Manager
  var WHATSAPP = '5584988292372';       // número que recebe os leads (briefing)
  var APPS_SCRIPT_URL = '';             // opcional: URL do Web App do Google Apps Script (planilha de leads)
  /* ======================================================== */

  window.__wm = true;
  window.dataLayer = window.dataLayer || [];
  function evento(nome, dados) {
    var e = { event: nome };
    for (var k in dados || {}) e[k] = dados[k];
    window.dataLayer.push(e);
  }

  // GTM só carrega quando o ID real for informado
  if (/^GTM-[A-Z0-9]+$/.test(GTM_ID) && GTM_ID !== 'GTM-XXXXXXX') {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(g);
  }

  var doc = document;
  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  /* ----- Cliques rastreados ----- */
  doc.addEventListener('click', function (ev) {
    var a = ev.target.closest('[data-wa]');
    if (a) evento('clique_whatsapp', { origem: a.getAttribute('data-wa') });
    var b = ev.target.closest('[data-evento]');
    if (b) evento(b.getAttribute('data-evento'));
  });

  /* ----- Topo ----- */
  var topo = $('.topo');
  var botaoMenu = $('.topo__menu');
  var menu = $('#menu');
  function fechaMenu() {
    if (!menu) return;
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
  }
  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', function () {
      var abre = !menu.classList.contains('aberto');
      menu.classList.toggle('aberto', abre);
      botaoMenu.setAttribute('aria-expanded', String(abre));
      botaoMenu.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', function (ev) { if (ev.target.closest('a')) fechaMenu(); });
    doc.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fechaMenu(); });
  }

  /* ----- Rolagem: topo e parallax leve do hero ----- */
  var camadas = $$('[data-parallax]');
  var parallaxAtivo = !semMovimento && window.matchMedia('(min-width: 901px)').matches && camadas.length;
  var agendado = false;
  function aoRolar() {
    agendado = false;
    var y = window.scrollY || 0;
    if (topo) topo.classList.toggle('rolou', y > 12);
    if (parallaxAtivo && y < window.innerHeight * 1.2) {
      camadas.forEach(function (el) {
        el.style.translate = '0 ' + (y * parseFloat(el.getAttribute('data-parallax'))).toFixed(1) + 'px';
      });
    }
  }
  window.addEventListener('scroll', function () {
    if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  aoRolar();

  /* ----- Revelar ao rolar ----- */
  var alvos = $$('[data-revela]');
  function mostraTudo() { alvos.forEach(function (el) { el.classList.add('visto'); }); }
  if (!('IntersectionObserver' in window) || semMovimento) {
    mostraTudo();
  } else {
    // escalona irmãos que entram juntos
    alvos.forEach(function (el) {
      var irmaos = $$(':scope > [data-revela]', el.parentElement);
      var i = irmaos.indexOf(el);
      if (i > 0) el.style.setProperty('--atraso', Math.min(i * 0.07, 0.42) + 's');
    });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    alvos.forEach(function (el) { io.observe(el); });
  }

  /* ----- Abas de materiais ----- */
  $$('[data-abas]').forEach(function (bloco) {
    var abas = $$('[role="tab"]', bloco);
    function ativa(aba, foca) {
      abas.forEach(function (t) {
        var sel = t === aba;
        t.setAttribute('aria-selected', String(sel));
        t.tabIndex = sel ? 0 : -1;
        var p = doc.getElementById(t.getAttribute('aria-controls'));
        p.hidden = !sel;
        p.classList.remove('troca');
        if (sel) { void p.offsetWidth; p.classList.add('troca'); }
      });
      if (foca) aba.focus();
      evento('aba_material', { material: aba.textContent.trim() });
    }
    abas.forEach(function (aba, i) {
      aba.addEventListener('click', function () { ativa(aba); });
      aba.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowRight') ativa(abas[(i + 1) % abas.length], true);
        if (ev.key === 'ArrowLeft') ativa(abas[(i - 1 + abas.length) % abas.length], true);
      });
    });
  });

  /* ----- Galeria: setas, arrasto, barra de progresso ----- */
  var galeria = $('#galeria');
  var itens = galeria ? $$('.galeria__item', galeria) : [];
  if (galeria) {
    var barra = $('#galeria-barra');
    var ant = $('[data-galeria="ant"]');
    var prox = $('[data-galeria="prox"]');
    var atualiza = function () {
      var max = galeria.scrollWidth - galeria.clientWidth;
      var visivel = galeria.clientWidth / galeria.scrollWidth;
      var p = max > 0 ? galeria.scrollLeft / max : 0;
      if (barra) {
        barra.style.width = (visivel * 100).toFixed(2) + '%';
        barra.style.transform = 'translateX(' + (p * (1 / visivel - 1) * 100).toFixed(2) + '%)';
      }
      if (ant) ant.disabled = galeria.scrollLeft < 4;
      if (prox) prox.disabled = galeria.scrollLeft > max - 4;
    };
    galeria.addEventListener('scroll', function () { requestAnimationFrame(atualiza); }, { passive: true });
    window.addEventListener('resize', atualiza);
    window.addEventListener('load', atualiza);
    atualiza();
    var passo = function (dir) {
      galeria.scrollBy({ left: dir * galeria.clientWidth * 0.7, behavior: semMovimento ? 'auto' : 'smooth' });
    };
    if (ant) ant.addEventListener('click', function () { passo(-1); });
    if (prox) prox.addEventListener('click', function () { passo(1); });

    // arrasto com mouse
    var arrasto = null;
    var arrastou = false;
    galeria.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType !== 'mouse' || ev.button !== 0) return;
      arrasto = { x: ev.clientX, inicio: galeria.scrollLeft };
      arrastou = false;
    });
    window.addEventListener('pointermove', function (ev) {
      if (!arrasto) return;
      var dx = ev.clientX - arrasto.x;
      if (!arrastou && Math.abs(dx) > 6) { arrastou = true; galeria.classList.add('arrastando'); }
      if (arrastou) galeria.scrollLeft = arrasto.inicio - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!arrasto) return;
      arrasto = null;
      galeria.classList.remove('arrastando');
      setTimeout(function () { arrastou = false; }, 0);
    });
    galeria.addEventListener('click', function (ev) {
      if (arrastou) { ev.preventDefault(); ev.stopPropagation(); return; }
      var item = ev.target.closest('.galeria__item');
      if (item) abreLuz(itens.indexOf(item));
    }, true);
  }

  /* ----- Lightbox ----- */
  var luz = $('#luz');
  var luzImg = $('#luz-img');
  var luzLegenda = $('#luz-legenda');
  var luzConta = $('#luz-conta');
  var atual = 0;
  var voltaFoco = null;
  function mostra(i) {
    atual = (i + itens.length) % itens.length;
    var item = itens[atual];
    luzImg.style.animation = 'none'; void luzImg.offsetWidth; luzImg.style.animation = '';
    luzImg.src = item.getAttribute('data-cheia');
    luzImg.alt = $('img', item).alt;
    luzLegenda.textContent = item.getAttribute('data-legenda');
    luzConta.textContent = (atual + 1) + ' de ' + itens.length;
  }
  function abreLuz(i) {
    if (!luz) return;
    voltaFoco = doc.activeElement;
    luz.hidden = false;
    doc.body.style.overflow = 'hidden';
    mostra(i);
    $('.luz__fechar', luz).focus();
    evento('galeria_ampliar', { foto: itens[atual].getAttribute('data-legenda') });
  }
  function fechaLuz() {
    luz.hidden = true;
    doc.body.style.overflow = '';
    if (voltaFoco) voltaFoco.focus();
  }
  if (luz) {
    $('.luz__fechar', luz).addEventListener('click', fechaLuz);
    $('.luz__ant', luz).addEventListener('click', function () { mostra(atual - 1); });
    $('.luz__prox', luz).addEventListener('click', function () { mostra(atual + 1); });
    luz.addEventListener('click', function (ev) { if (ev.target === luz || ev.target.tagName === 'FIGURE') fechaLuz(); });
    doc.addEventListener('keydown', function (ev) {
      if (luz.hidden) return;
      if (ev.key === 'Escape') fechaLuz();
      if (ev.key === 'ArrowLeft') mostra(atual - 1);
      if (ev.key === 'ArrowRight') mostra(atual + 1);
      if (ev.key === 'Tab') { // mantém o foco dentro do lightbox
        var f = $$('button', luz);
        var i = f.indexOf(doc.activeElement);
        ev.preventDefault();
        f[(i + (ev.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    var toqueX = null;
    luz.addEventListener('touchstart', function (ev) { toqueX = ev.touches[0].clientX; }, { passive: true });
    luz.addEventListener('touchend', function (ev) {
      if (toqueX === null) return;
      var dx = ev.changedTouches[0].clientX - toqueX;
      if (Math.abs(dx) > 50) mostra(atual + (dx < 0 ? 1 : -1));
      toqueX = null;
    });
  }

  /* ----- Dúvidas: abre e fecha com altura animada ----- */
  $$('.duvidas__lista details').forEach(function (d) {
    var s = $('summary', d);
    var r = $('.resp', d);
    if (semMovimento || !r.animate) return;
    s.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (d.dataset.animando) return;
      d.dataset.animando = '1';
      var abrindo = !d.open;
      if (abrindo) d.open = true;
      var h = r.scrollHeight;
      var a = r.animate(
        [{ height: (abrindo ? 0 : h) + 'px', opacity: abrindo ? 0 : 1 }, { height: (abrindo ? h : 0) + 'px', opacity: abrindo ? 1 : 0 }],
        { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
      a.onfinish = a.oncancel = function () {
        if (!abrindo) d.open = false;
        delete d.dataset.animando;
      };
      if (abrindo) evento('duvida_aberta', { pergunta: s.textContent.trim() });
    });
  });

  /* ----- Formulário ----- */
  var form = $('#form-orcamento');
  if (form) {
    var enviar = $('.form__enviar', form);
    var aviso = $('#form-aviso');
    var tel = $('#f-whats');

    tel.addEventListener('input', function () {
      var n = tel.value.replace(/\D/g, '').slice(0, 11);
      var v = n;
      if (n.length > 2) v = '(' + n.slice(0, 2) + ') ' + n.slice(2);
      if (n.length > 6) {
        var meio = n.length > 10 ? 7 : 6;
        v = '(' + n.slice(0, 2) + ') ' + n.slice(2, meio) + '-' + n.slice(meio);
      }
      tel.value = v;
    });

    var confere = function () {
      var ok = form.checkValidity();
      enviar.disabled = !ok;
      aviso.textContent = ok ? 'Tudo certo. Ao enviar, o WhatsApp abre com a mensagem pronta.' : 'Preencha os campos para liberar o envio.';
    };
    form.addEventListener('input', confere);
    form.addEventListener('change', confere);
    form.addEventListener('focusout', function (ev) {
      if (ev.target.matches('input, select, textarea')) ev.target.classList.add('tocado');
    });
    var iniciou = false;
    form.addEventListener('focusin', function () {
      if (!iniciou) { iniciou = true; evento('formulario_inicio'); }
    });
    confere();

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { confere(); return; }
      var d = {
        nome: form.nome.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        cidade: form.cidade.value.trim(),
        peca: form.peca.value,
        material: form.material.value,
        detalhes: form.detalhes.value.trim()
      };
      var msg;
      if (APPS_SCRIPT_URL) {
        // Com planilha: os dados vão para o Apps Script e o WhatsApp recebe a mensagem padrão
        try {
          var corpo = new URLSearchParams(d);
          corpo.append('origem', location.href);
          corpo.append('data', new Date().toISOString());
          fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: corpo, keepalive: true });
        } catch (e) { /* segue para o WhatsApp mesmo assim */ }
        msg = 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.';
      } else {
        // Sem planilha: a mensagem leva todos os campos preenchidos
        msg = 'Olá, vim pelo site e quero um orçamento.\n\n' +
          '*Nome:* ' + d.nome + '\n' +
          '*WhatsApp:* ' + d.whatsapp + '\n' +
          '*Cidade e bairro:* ' + d.cidade + '\n' +
          '*O que preciso:* ' + d.peca + '\n' +
          '*Material:* ' + d.material +
          (d.detalhes ? '\n*Detalhes:* ' + d.detalhes : '');
      }
      var link = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
      evento('formulario_enviado', { peca: d.peca, material: d.material });
      enviar.disabled = true;
      aviso.textContent = 'Abrindo o WhatsApp...';
      try {
        sessionStorage.setItem('wm_wa', link);
        location.href = 'obrigado.html';
      } catch (e) {
        location.href = link; // sem sessionStorage (navegação privada): vai direto para o WhatsApp
      }
    });
  }
})();
