document.addEventListener('DOMContentLoaded', function () {

  // HEADER
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  var hamburger = document.getElementById('hamburger');
  var nav       = document.getElementById('nav');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('aperto');
    nav.classList.toggle('aperto');
  });

  //Chiude il menu se si clicca fuori
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      hamburger.classList.remove('aperto');
      nav.classList.remove('aperto');
    }
  });


  //Navigazione
  var tabButtons = document.querySelectorAll('.tab-btn');
  var sezioni    = document.querySelectorAll('.sezione');

  function apriSezione(idSezione) {
    tabButtons.forEach(function (btn) {
      btn.classList.toggle('attivo', btn.getAttribute('data-sezione') === idSezione);
    });
    sezioni.forEach(function (sez) {
      sez.classList.toggle('attiva', sez.id === idSezione);
    });
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      apriSezione(btn.getAttribute('data-sezione'));
    });
  });

  var navLinks = document.querySelectorAll('.nav-link[data-sezione]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var sezione = link.getAttribute('data-sezione');

      // Apre la tab corretta
      apriSezione(sezione);

      // Scroll alla sezione menu
      var target = document.getElementById('menu');
      if (target) {
        var offset = header.offsetHeight + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }

      // Chiude il menu mobile
      hamburger.classList.remove('aperto');
      nav.classList.remove('aperto');
    });
  });


  //BOTTONE ORDINA
  document.querySelectorAll('.card-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nome = btn.closest('.prodotto-card').querySelector('.prodotto-nome').textContent;
      mostraToast('Aggiunto: ' + nome);
    });
  });

  function mostraToast(msg) {
    var toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = [
      'position:fixed', 'bottom:1.5rem', 'left:50%',
      'transform:translateX(-50%)',
      'background:#5C2E0E', 'color:#F9F3EA',
      'font-family:Jost,sans-serif', 'font-size:.85rem',
      'padding:.65rem 1.5rem', 'border-radius:8px',
      'box-shadow:0 4px 20px rgba(0,0,0,.25)',
      'z-index:999', 'opacity:0',
      'transition:opacity .25s'
    ].join(';');
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.style.opacity = '1'; });
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 300);
    }, 2200);
  }


  //CONTATTI
  var submitBtn    = document.getElementById('submitBtn');
  var formFeedback = document.getElementById('formFeedback');

  submitBtn.addEventListener('click', function () {
    var nome    = document.querySelector('.contatti-form-wrap input[type="text"]');
    var email   = document.querySelector('.contatti-form-wrap input[type="email"]');
    var msg     = document.querySelector('.contatti-form-wrap textarea');

    formFeedback.textContent = '';
    formFeedback.style.color = '';

    if (!nome.value.trim() || !email.value.trim() || !msg.value.trim()) {
      formFeedback.textContent = 'Per favore compila tutti i campi.';
      formFeedback.style.color = '#A32D2D';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      formFeedback.textContent = 'Inserisci un indirizzo email valido.';
      formFeedback.style.color = '#A32D2D';
      return;
    }

    //INVIO SIMULAZIONE
    submitBtn.textContent = 'Invio in corso...';
    submitBtn.disabled = true;

    setTimeout(function () {
      formFeedback.textContent = '✓ Messaggio inviato! Ti risponderemo al più presto.';
      formFeedback.style.color = '#2E6E12';
      submitBtn.textContent = 'Invia messaggio';
      submitBtn.disabled = false;
      nome.value = ''; email.value = ''; msg.value = '';
    }, 1400);
  });

});
