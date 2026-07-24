/* ==========================================================================
   DAPEA — Lógica e Interactividad JavaScript
   Estándar de Animación GSAP & WPO — Promptend
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initMethodologyTabs();
  initFaqAccordion();
  initDiagnosticWizard();
  initCounterAnimation();
  initGsapAnimations();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Scroll Effects
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Metodología Ciclo DAPEA — Tab Switcher
   -------------------------------------------------------------------------- */
function initMethodologyTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  if (!tabBtns.length || !tabPanels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
        if (window.gsap) {
          gsap.fromTo(activePanel, 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');

      // Cerrar todos
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      // Abrir el seleccionado si no estaba activo
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Diagnostic Quiz Wizard (7 Módulos de Autoevaluación)
   -------------------------------------------------------------------------- */
const quizQuestions = [
  // Módulo 1: Finanzas
  { cat: "Finanzas", q: "¿Llevas un registro diario de tus ingresos y egresos de manera digital?" },
  { cat: "Finanzas", q: "¿Conoces tus costos fijos y variables mensuales?" },
  { cat: "Finanzas", q: "¿Separas tus finanzas personales de las del negocio?" },
  { cat: "Finanzas", q: "¿Tienes un presupuesto mensual de tu actividad laboral?" },
  { cat: "Finanzas", q: "¿Revisas tus finanzas al menos una vez por semana?" },

  // Módulo 2: Operación
  { cat: "Operaciones", q: "¿Tienes procesos claros y documentados para entregar tu producto o servicio?" },
  { cat: "Operaciones", q: "¿Tienes control sobre inventarios, materiales, tiempos de producción o entrega?" },
  { cat: "Operaciones", q: "¿Revisas y mejoras regularmente tus procesos operativos?" },

  // Módulo 3: Clientes
  { cat: "Atención al Cliente", q: "¿Das seguimiento a tus clientes después de la venta?" },
  { cat: "Atención al Cliente", q: "¿Cuentas con una base de datos de tus clientes?" },
  { cat: "Atención al Cliente", q: "¿Mides el nivel de satisfacción del cliente?" },

  // Módulo 4: Marketing y Ventas
  { cat: "Marketing", q: "¿Tienes una estrategia clara para atraer nuevos clientes?" },
  { cat: "Marketing", q: "¿Utilizas redes sociales o medios digitales activamente (3+ veces por semana)?" },
  { cat: "Marketing", q: "¿Tienes identificadas las características de tu cliente ideal?" },
  { cat: "Marketing", q: "¿Tienes un proceso definido para cerrar ventas o dar seguimiento?" },

  // Módulo 5: Digitalización
  { cat: "Digitalización", q: "¿Usas herramientas digitales (hojas de cálculo, CRM, etc.) para el control?" },
  { cat: "Digitalización", q: "¿Cuentas con respaldo de la información de tu empresa en la nube?" },

  // Módulo 6: Formalización
  { cat: "Formalización", q: "¿Tu negocio está registrado legalmente / ante Hacienda?" },
  { cat: "Formalización", q: "¿Emites facturas o recibos oficiales a tus clientes?" },
  { cat: "Formalización", q: "¿Tienes contratos o políticas claras con clientes y proveedores?" },

  // Módulo 7: Planeación
  { cat: "Planeación", q: "¿Tienes metas mensuales y a mediano/largo plazo claramente definidas?" },
  { cat: "Planeación", q: "¿Tomas decisiones basadas en datos duros y no solo en intuición?" }
];

let currentQuizIndex = 0;
let userAnswers = [];

function initDiagnosticWizard() {
  const openBtns = document.querySelectorAll('.open-diagnostic-modal');
  const modalOverlay = document.getElementById('diagnosticModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const quizBody = document.getElementById('quizBody');

  if (!modalOverlay || !quizBody) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      startQuiz();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

function startQuiz() {
  currentQuizIndex = 0;
  userAnswers = [];
  renderStep0();
}

function renderStep0() {
  const quizBody = document.getElementById('quizBody');
  const progressFill = document.getElementById('quizProgressFill');
  if (progressFill) progressFill.style.width = '5%';

  quizBody.innerHTML = `
    <div class="quiz-step-container active">
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="preview-badge">Módulo 0: Información Inicial</span>
        <h3 style="font-size: 1.8rem; margin-top: 0.5rem;">Autoevaluación Empresarial DAPEA</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">
          Descubre en menos de 3 minutos la madurez operativa y financiera de tu empresa.
        </p>
      </div>

      <form id="step0Form">
        <div class="form-group">
          <label>Tu Nombre Completo *</label>
          <input type="text" id="quizUserName" class="form-control" placeholder="Ej. Carlos Mendoza" required />
        </div>
        <div class="form-group">
          <label>Nombre de tu Negocio / Emprendimiento *</label>
          <input type="text" id="quizBusinessName" class="form-control" placeholder="Ej. Soluciones Logísticas MX" required />
        </div>
        <div class="form-group">
          <label>WhatsApp / Teléfono de contacto *</label>
          <input type="tel" id="quizPhone" class="form-control" placeholder="Ej. 962 123 4567" required />
        </div>
        <div class="form-group">
          <label>Tiempo de Operación de tu Empresa</label>
          <select id="quizTimeOperating" class="form-control">
            <option value="Menos de 6 meses">Menos de 6 meses</option>
            <option value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</option>
            <option value="1 a 3 años">1 a 3 años</option>
            <option value="Más de 3 años">Más de 3 años</option>
          </select>
        </div>
        <button type="submit" class="btn btn-accent" style="width: 100%; margin-top: 1rem;">
          Comenzar Diagnóstico <i class="fas fa-arrow-right"></i>
        </button>
      </form>
    </div>
  `;

  document.getElementById('step0Form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.quizUserData = {
      name: document.getElementById('quizUserName').value,
      business: document.getElementById('quizBusinessName').value,
      phone: document.getElementById('quizPhone').value,
      time: document.getElementById('quizTimeOperating').value
    };
    currentQuizIndex = 0;
    renderQuestionStep();
  });
}

function renderQuestionStep() {
  const quizBody = document.getElementById('quizBody');
  const progressFill = document.getElementById('quizProgressFill');

  if (currentQuizIndex >= quizQuestions.length) {
    renderQuizResults();
    return;
  }

  const qObj = quizQuestions[currentQuizIndex];
  const pct = Math.round(((currentQuizIndex + 1) / quizQuestions.length) * 100);
  if (progressFill) progressFill.style.width = `${pct}%`;

  quizBody.innerHTML = `
    <div class="quiz-step-container active">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span class="preview-badge">${qObj.cat}</span>
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Pregunta ${currentQuizIndex + 1} de ${quizQuestions.length}</span>
      </div>

      <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem;">${qObj.q}</h3>

      <div class="options-group">
        <button class="option-radio-btn" onclick="selectAnswer(true)">
          <i class="fas fa-check-circle" style="color: var(--color-accent); font-size: 1.2rem;"></i>
          <strong>SÍ</strong> — Cuento con este control / proceso en mi negocio.
        </button>
        <button class="option-radio-btn" onclick="selectAnswer(false)">
          <i class="fas fa-times-circle" style="color: var(--color-danger); font-size: 1.2rem;"></i>
          <strong>NO</strong> — Aún no lo implemento o se realiza de forma empírica.
        </button>
      </div>
    </div>
  `;
}

window.selectAnswer = function(answerBool) {
  userAnswers.push({
    q: quizQuestions[currentQuizIndex].q,
    cat: quizQuestions[currentQuizIndex].cat,
    ans: answerBool
  });
  currentQuizIndex++;
  renderQuestionStep();
};

function renderQuizResults() {
  const quizBody = document.getElementById('quizBody');
  const progressFill = document.getElementById('quizProgressFill');
  if (progressFill) progressFill.style.width = '100%';

  const positiveCount = userAnswers.filter(a => a.ans === true).length;
  const total = userAnswers.length;
  const scorePct = Math.round((positiveCount / total) * 100);

  let statusText = "";
  let statusClass = "";

  if (scorePct >= 75) {
    statusText = "Sólida Estructura Operativa. ¡Excelente base para escalar!";
    statusClass = "color: var(--color-success);";
  } else if (scorePct >= 45) {
    statusText = "Madurez Intermedia. Existen cuellos de botella críticos en Finanzas y Estrategia.";
    statusClass = "color: var(--color-warning);";
  } else {
    statusText = "Riesgo de Estancamiento. Alta vulnerabilidad por falta de procesos y datos duros.";
    statusClass = "color: var(--color-danger);";
  }

  const userData = window.quizUserData || { name: 'Empresario', business: 'Mi Empresa' };

  quizBody.innerHTML = `
    <div class="quiz-step-container active" style="text-align: center;">
      <div class="preview-badge" style="margin-bottom: 1rem;">Resultado del Diagnóstico</div>
      <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">¡Felicidades, ${userData.name}!</h3>
      <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 2rem;">
        Hemos analizado los 7 pilares de tu negocio: <strong>${userData.business}</strong>
      </p>

      <div style="background: rgba(13, 33, 58, 0.8); border: 1px solid var(--color-accent); border-radius: var(--radius-md); padding: 2rem; margin-bottom: 2rem;">
        <div style="font-size: 3.5rem; font-weight: 800; color: var(--color-accent); font-family: var(--font-heading); line-height: 1;">
          ${scorePct}%
        </div>
        <div style="font-size: 0.9rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 0.25rem;">
          Índice de Control y Preparación Operativa
        </div>
        <p style="${statusClass} font-weight: 700; margin-top: 1rem; font-size: 1.05rem;">
          ${statusText}
        </p>
      </div>

      <p style="font-size: 0.95rem; color: var(--color-text-main); margin-bottom: 1.5rem;">
        ¿Deseas recibir tu reporte detallado y agendar tu sesión de retroalimentación sin costo con nuestro equipo consultor?
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button onclick="sendQuizToWhatsapp()" class="btn btn-accent">
          <i class="fab fa-whatsapp"></i> Enviar Resultados a WhatsApp DAPEA
        </button>
        <button onclick="location.reload()" class="btn btn-outline">
          Reiniciar Test
        </button>
      </div>
    </div>
  `;
}

window.sendQuizToWhatsapp = function() {
  const userData = window.quizUserData || { name: 'Cliente', business: 'Empresa' };
  const positiveCount = userAnswers.filter(a => a.ans === true).length;
  const total = userAnswers.length;
  const scorePct = Math.round((positiveCount / total) * 100);

  const text = `Hola, DAPEA. Mi nombre es *${userData.name}* de la empresa *${userData.business}* (Operación: ${userData.time}).%0A%0AAcabo de realizar la *Autoevaluación Empresarial DAPEA* en su sitio web:%0A- *Puntuación de Control:* ${scorePct}% (${positiveCount} de ${total} controles activos).%0A%0AMe gustaría recibir la retroalimentación y conocer cómo su metodología me puede ayudar a crecer.`;

  window.open(`https://wa.me/529621422830?text=${text}`, '_blank');
};

/* --------------------------------------------------------------------------
   6. Counter Animation
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        let count = 0;
        const speed = target / 40;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            el.innerText = Math.ceil(count) + (el.getAttribute('data-suffix') || '');
            setTimeout(updateCount, 30);
          } else {
            el.innerText = target + (el.getAttribute('data-suffix') || '');
          }
        };

        updateCount();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   7. GSAP Animations (Estándar Promptend)
   -------------------------------------------------------------------------- */
function initGsapAnimations() {
  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Animations
  const tlHero = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tlHero.from('.gsap-hero-anim .hero-badge', { opacity: 0, y: -20, duration: 0.6 })
        .from('.gsap-hero-anim .hero-title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
        .from('.gsap-hero-anim .hero-description', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.gsap-hero-anim .hero-cta-group', { opacity: 0, scale: 0.95, duration: 0.5 }, '-=0.4')
        .from('.gsap-card-anim', { opacity: 0, x: 40, duration: 1 }, '-=0.8');

  // ScrollReveal for Sections
  if (window.ScrollTrigger) {
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }
}
