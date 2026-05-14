(function () {
  const MAX = 100;
  const MIN = 0;
  const WIN_THRESHOLD = 70;

  const stages = [
    {
      situation:
        "Entre clases tienes una hora libre. Quieres avanzar sin quemarte.",
      prompt: "¿Por cuál senda inviertes ese tiempo?",
      paths: [
        {
          fork: "edu",
          kicker: "Camino del estudio",
          text: "Repasar lo visto y enlazar ideas con un mapa mental breve.",
          edu: 12,
          dev: 6,
          gro: 4,
        },
        {
          fork: "dev",
          kicker: "Camino de la práctica",
          text: "Montar un mini experimento o borrador de proyecto concreto.",
          edu: 4,
          dev: 14,
          gro: 10,
        },
        {
          fork: "gro",
          kicker: "Camino del ritmo sano",
          text: "Caminar, respirar y anotar una sola duda para resolver luego.",
          edu: 6,
          dev: 8,
          gro: 12,
        },
      ],
    },
    {
      situation:
        "Un compañero atasca con un tema que tú ya entiendes bastante bien.",
      prompt: "¿Cómo compartes lo que sabes sin absorberte todo el día?",
      paths: [
        {
          fork: "edu",
          kicker: "Enseñar con claridad",
          text: "Explicar con un ejemplo cotidiano y preguntar qué probó ya.",
          edu: 14,
          dev: 8,
          gro: 6,
        },
        {
          fork: "dev",
          kicker: "Investigar juntos",
          text: "Buscar en dos fuentes confiables y contrastar en voz alta.",
          edu: 10,
          dev: 10,
          gro: 8,
        },
        {
          fork: "gro",
          kicker: "Límite con respeto",
          text: "Acordar 15 minutos de ayuda y dejar un recurso para que siga.",
          edu: 6,
          dev: 6,
          gro: 10,
        },
      ],
    },
    {
      situation:
        "Llega un comentario difícil de digerir: señala un hueco real en tu trabajo.",
      prompt: "¿Qué haces con esa información?",
      paths: [
        {
          fork: "dev",
          kicker: "Convertir en plan",
          text: "Escuchar, preguntar y bajar tres acciones medibles a la semana.",
          edu: 8,
          dev: 16,
          gro: 10,
        },
        {
          fork: "edu",
          kicker: "Profundizar",
          text: "Leer o ver un recurso recomendado antes de responder.",
          edu: 12,
          dev: 8,
          gro: 6,
        },
        {
          fork: "gro",
          kicker: "Pausa inteligente",
          text: "No responder al calor; anotar y retomar con calma al día siguiente.",
          edu: 10,
          dev: 10,
          gro: 8,
        },
      ],
    },
    {
      situation:
        "Se acerca una entrega importante y sientes presión en el pecho.",
      prompt: "¿Cómo organizas la recta final?",
      paths: [
        {
          fork: "dev",
          kicker: "Constancia",
          text: "Bloques cortos diarios, lista de verificación y cero maratón de una noche.",
          edu: 12,
          dev: 14,
          gro: 8,
        },
        {
          fork: "edu",
          kicker: "Repaso activo",
          text: "Autoevaluación con tarjetas y explicar en voz alta como si enseñaras.",
          edu: 14,
          dev: 10,
          gro: 6,
        },
        {
          fork: "gro",
          kicker: "Cuidado emocional",
          text: "Dormir lo razonable y pedir apoyo; ajustar alcance si hace falta.",
          edu: 6,
          dev: 8,
          gro: 14,
        },
      ],
    },
    {
      situation:
        "En una reunión te corrigen con datos y tenías un dato desactualizado.",
      prompt: "¿Qué construyes en ese momento frente a los demás?",
      paths: [
        {
          fork: "gro",
          kicker: "Integridad",
          text: "Agradecer la corrección, asumir el error y proponer verificar ya.",
          edu: 6,
          dev: 12,
          gro: 14,
        },
        {
          fork: "edu",
          kicker: "Curiosidad",
          text: "Pedir la fuente y ofrecer un breve seguimiento con lo actualizado.",
          edu: 10,
          dev: 12,
          gro: 8,
        },
        {
          fork: "dev",
          kicker: "Sistema",
          text: "Proponer un checklist para que no vuelva a pasar en el equipo.",
          edu: 8,
          dev: 14,
          gro: 8,
        },
      ],
    },
    {
      situation:
        "Piensas en tu vida dentro de un año: quieres sentir que avanzaste de verdad.",
      prompt: "¿Qué tipo de ruta te comprometes a sostener?",
      paths: [
        {
          fork: "dev",
          kicker: "Hábitos",
          text: "Metas pequeñas, revisión mensual y ajuste según lo que enseña la data.",
          edu: 10,
          dev: 14,
          gro: 12,
        },
        {
          fork: "edu",
          kicker: "Aprendizaje",
          text: "Un tema profundo por trimestre con notas y proyectos cortos.",
          edu: 14,
          dev: 10,
          gro: 8,
        },
        {
          fork: "gro",
          kicker: "Comunidad",
          text: "Grupo de estudio o mentoría: crecer acompañado y con feedback.",
          edu: 10,
          dev: 10,
          gro: 14,
        },
      ],
    },
    {
      situation:
        "Una semana caótica: tareas encimadas, poco sueño y el barco tambalea.",
      prompt: "¿Cómo capeas la tormenta sin abandonar el timón del aprendizaje?",
      paths: [
        {
          fork: "gro",
          kicker: "Ancla emocional",
          text: "Priorizar sueño mínimo viable y una sola victoria pequeña por día.",
          edu: 4,
          dev: 8,
          gro: 16,
        },
        {
          fork: "dev",
          kicker: "Corte quirúrgico",
          text: "Eliminar lo prescindible y proteger bloques innegociables de estudio.",
          edu: 8,
          dev: 14,
          gro: 6,
        },
        {
          fork: "edu",
          kicker: "Mapa claro",
          text: "Reescribir la lista en tres niveles: urgente, importante, puede esperar.",
          edu: 14,
          dev: 10,
          gro: 4,
        },
      ],
    },
    {
      situation:
        "Conoces a alguien que domina justo lo que te falta: podrías aprender mucho.",
      prompt: "¿Cómo acercas a esa “tripulación rival” sin perder tu orgullo sano?",
      paths: [
        {
          fork: "edu",
          kicker: "Curiosidad noble",
          text: "Preguntar técnica concreta y ofrecer algo útil a cambio (logística, diseño…).",
          edu: 14,
          dev: 8,
          gro: 8,
        },
        {
          fork: "gro",
          kicker: "Alianza",
          text: "Proponer un reto conjunto corto donde ambos salgan ganando experiencia.",
          edu: 8,
          dev: 10,
          gro: 14,
        },
        {
          fork: "dev",
          kicker: "Réplica propia",
          text: "Clonar su método en mini y medir resultados una semana, sin copiar sin pensar.",
          edu: 10,
          dev: 14,
          gro: 6,
        },
      ],
    },
  ];

  const TOTAL_ROUNDS = stages.length;

  const state = {
    education: 50,
    development: 50,
    growth: 50,
    round: 0,
    finished: false,
    combo: 1,
    duelUsed: false,
  };

  const el = {
    shake: document.getElementById("app-shake"),
    fx: document.getElementById("fx-root"),
    toast: document.getElementById("toast-strip"),
    trail: document.getElementById("trail"),
    barEdu: document.getElementById("bar-edu"),
    barDev: document.getElementById("bar-dev"),
    barGro: document.getElementById("bar-gro"),
    valEdu: document.getElementById("val-edu-num"),
    valDev: document.getElementById("val-dev-num"),
    valGro: document.getElementById("val-gro-num"),
    round: document.getElementById("round"),
    situation: document.getElementById("situation"),
    prompt: document.getElementById("prompt"),
    choices: document.getElementById("choices"),
    message: document.getElementById("message"),
    restart: document.getElementById("restart"),
    combo: document.getElementById("combo-display"),
    streakFlash: document.getElementById("streak-flash"),
    loot: document.getElementById("loot-row"),
    minigame: document.getElementById("minigame"),
    chest: document.getElementById("chest-hit"),
    miniMeter: document.getElementById("mini-meter"),
    miniScore: document.getElementById("mini-score"),
    miniSkip: document.getElementById("mini-skip"),
    duelBtn: document.getElementById("duel-btn"),
    duelOverlay: document.getElementById("duel-overlay"),
    duelHit: document.getElementById("duel-hit"),
    duelStatus: document.getElementById("duel-status"),
    duelScore: document.getElementById("duel-score"),
    duelClose: document.getElementById("duel-close"),
  };

  const YELLS = [
    "¡BUM! ¡Rumbo fijado!",
    "¡Cañonazo de foco!",
    "¡La tripulación aplaude!",
    "¡Beris de experiencia a bordo!",
    "¡Ese golpe sí se sintió!",
    "¡Nada nos detiene!",
  ];

  let miniTimerId = null;
  let miniResolve = null;
  let miniFinished = false;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(n) {
    return Math.max(MIN, Math.min(MAX, n));
  }

  function buildTrail() {
    el.trail.innerHTML = "";
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const li = document.createElement("li");
      li.dataset.index = String(i);
      const dot = document.createElement("span");
      dot.className = "trail-dot";
      dot.setAttribute("aria-hidden", "true");
      const lab = document.createElement("span");
      lab.className = "trail-label";
      lab.textContent = "Isla " + (i + 1);
      li.appendChild(dot);
      li.appendChild(lab);
      el.trail.appendChild(li);
    }
  }

  function buildLoot() {
    el.loot.innerHTML = "";
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const s = document.createElement("span");
      s.className = "loot-chest";
      s.title = "Cofre " + (i + 1);
      s.setAttribute("aria-hidden", "true");
      el.loot.appendChild(s);
    }
  }

  function updateLoot() {
    const chests = el.loot.querySelectorAll(".loot-chest");
    chests.forEach(function (c, i) {
      c.classList.toggle("loot-chest--open", i < state.round);
    });
  }

  function updateTrail() {
    const items = el.trail.querySelectorAll("li");
    items.forEach(function (li, i) {
      li.classList.remove("active", "done");
      if (i < state.round) li.classList.add("done");
      else if (i === state.round) li.classList.add("active");
    });
    updateLoot();
  }

  function renderBars() {
    el.barEdu.style.width = state.education + "%";
    el.barDev.style.width = state.development + "%";
    el.barGro.style.width = state.growth + "%";
    el.valEdu.textContent = String(Math.round(state.education));
    el.valDev.textContent = String(Math.round(state.development));
    el.valGro.textContent = String(Math.round(state.growth));
  }

  function averageScore() {
    return (state.education + state.development + state.growth) / 3;
  }

  function shakeScreen(ms, className) {
    const c = className || "shake-hard";
    el.shake.classList.add(c);
    window.setTimeout(function () {
      el.shake.classList.remove(c);
    }, ms || 520);
  }

  function flashScreen() {
    const d = document.createElement("div");
    d.className = "flash-burst";
    el.fx.appendChild(d);
    window.setTimeout(function () {
      d.remove();
    }, 320);
  }

  function spawnExplosion(x, y, scale) {
    const host = document.createElement("div");
    host.className = "boom-host";
    host.style.left = x + "px";
    host.style.top = y + "px";
    const sc = scale != null ? scale : 1;
    host.style.setProperty("--boom-scale", String(sc));

    const core = document.createElement("div");
    core.className = "explosion-core";
    const ring = document.createElement("div");
    ring.className = "explosion-ring";
    const puff = document.createElement("div");
    puff.className = "smoke-puff";

    host.appendChild(core);
    host.appendChild(ring);
    host.appendChild(puff);
    el.fx.appendChild(host);

    const n = 14;
    for (let i = 0; i < n; i++) {
      const sp = document.createElement("span");
      sp.className = "spark";
      const ang = (i / n) * Math.PI * 2;
      const dist = rand(40, 120) * sc;
      sp.style.setProperty("--sx", String(Math.cos(ang) * dist));
      sp.style.setProperty("--sy", String(Math.sin(ang) * dist));
      sp.style.background =
        i % 3 === 0 ? "#ffeb3b" : i % 3 === 1 ? "#ff7043" : "#fff";
      host.appendChild(sp);
    }

    window.setTimeout(function () {
      host.remove();
    }, 700);
  }

  function floatDelta(x, y, lines) {
    const box = document.createElement("div");
    box.className = "float-delta";
    box.style.left = x + "px";
    box.style.top = y + "px";
    lines.forEach(function (line) {
      const span = document.createElement("span");
      span.textContent = line;
      box.appendChild(span);
    });
    el.fx.appendChild(box);
    window.setTimeout(function () {
      box.remove();
    }, 1100);
  }

  function toast(msg, kind) {
    const t = document.createElement("div");
    t.className = "toast" + (kind ? " toast--" + kind : "");
    t.textContent = msg;
    el.toast.appendChild(t);
    window.requestAnimationFrame(function () {
      t.classList.add("toast--in");
    });
    window.setTimeout(function () {
      t.classList.remove("toast--in");
      t.classList.add("toast--out");
    }, 2200);
    window.setTimeout(function () {
      t.remove();
    }, 2800);
  }

  function pathPower(p) {
    return p.edu + p.dev + p.gro;
  }

  function updateCombo(deltaSum) {
    if (deltaSum >= 24) {
      state.combo = Math.min(5, state.combo + 1);
      el.streakFlash.classList.remove("hidden");
      window.setTimeout(function () {
        el.streakFlash.classList.add("hidden");
      }, 600);
    } else if (deltaSum < 8) {
      state.combo = Math.max(1, state.combo - 1);
    }
    el.combo.textContent = "Combo ×" + state.combo;
  }

  function confettiBurst() {
    const colors = ["#ff7043", "#ffeb3b", "#26c6da", "#ab47bc", "#66bb6a", "#fff"];
    const left = window.innerWidth / 2;
    const top = window.innerHeight * 0.35;
    for (let i = 0; i < 72; i++) {
      const bit = document.createElement("span");
      bit.className = "confetti";
      bit.style.left = left + "px";
      bit.style.top = top + "px";
      bit.style.background = colors[i % colors.length];
      const ang = rand(0, Math.PI * 2);
      const dist = rand(120, 420);
      bit.style.setProperty("--cx", String(Math.cos(ang) * dist));
      bit.style.setProperty("--cy", String(Math.sin(ang) * dist - rand(40, 180)));
      bit.style.setProperty("--rot", String(rand(-540, 540)) + "deg");
      bit.style.animationDelay = rand(0, 0.25) + "s";
      el.fx.appendChild(bit);
      window.setTimeout(function () {
        bit.remove();
      }, 2400);
    }
  }

  function maybeWindBonus() {
    if (Math.random() < 0.18) {
      state.education = clamp(state.education + 2);
      state.development = clamp(state.development + 2);
      state.growth = clamp(state.growth + 2);
      renderBars();
      toast("¡Brisa a favor! +2 en todas las velas", "gold");
      spawnExplosion(window.innerWidth * 0.5, window.innerHeight * 0.25, 0.85);
    }
  }

  function endGame() {
    state.finished = true;
    el.choices.innerHTML = "";
    el.restart.classList.remove("hidden");
    el.prompt.setAttribute("hidden", "");

    const avg = averageScore();
    const strong =
      state.education >= WIN_THRESHOLD &&
      state.development >= WIN_THRESHOLD &&
      state.growth >= WIN_THRESHOLD;

    el.message.classList.remove("win", "lose");

    if (strong) {
      el.message.classList.add("win");
      el.message.textContent =
        "¡Recompensa de capitán! Cruzaste el Grand Line del saber con tripulación equilibrada: " +
        "educación, desarrollo y crecimiento navegan al unísono. Siguen abriendo nuevas rutas.";
      confettiBurst();
      shakeScreen(900, "shake-epic");
      flashScreen();
    } else if (avg >= 62) {
      el.message.classList.add("win");
      el.message.textContent =
        "Buen viaje, navegante. Refuerza la isla más débil en tu mapa interior: " +
        "cada tramo corto suma beris de experiencia real.";
      if (avg >= 68) confettiBurst();
    } else {
      el.message.classList.add("lose");
      el.message.textContent =
        "La marea bajó, pero el mapa sigue ahí: zarpa otra vez mezclando estudio, práctica " +
        "y cuidado del ánimo, con brújula abierta al feedback.";
    }
  }

  function applyPath(p) {
    const mult = 1 + (state.combo - 1) * 0.06;
    const edu = Math.round(p.edu * mult);
    const dev = Math.round(p.dev * mult);
    const gro = Math.round(p.gro * mult);
    state.education = clamp(state.education + edu);
    state.development = clamp(state.development + dev);
    state.growth = clamp(state.growth + gro);
    renderBars();
    return { edu: edu, dev: dev, gro: gro };
  }

  function closeMinigame() {
    el.minigame.classList.add("hidden");
    el.chest.classList.remove("chest-hit--pulse");
    el.chest.onclick = null;
    el.miniSkip.onclick = null;
    if (miniTimerId) {
      window.clearInterval(miniTimerId);
      miniTimerId = null;
    }
  }

  function runChestMinigame(done) {
    miniFinished = false;
    miniResolve = done;
    el.minigame.classList.remove("hidden");
    let score = 0;
    const goal = 12;
    const duration = 4500;
    let elapsed = 0;

    el.miniScore.textContent = String(score);
    el.miniMeter.style.width = "100%";

    function tick() {
      elapsed += 50;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      el.miniMeter.style.width = pct + "%";
      if (elapsed >= duration) {
        finish();
      }
    }

    function finish() {
      if (miniFinished) return;
      miniFinished = true;
      if (miniTimerId) {
        window.clearInterval(miniTimerId);
        miniTimerId = null;
      }
      if (score >= goal) {
        state.education = clamp(state.education + 5);
        state.development = clamp(state.development + 5);
        state.growth = clamp(state.growth + 5);
        toast("¡Cofre reventado! +5 en todo", "gold");
        spawnExplosion(window.innerWidth / 2, window.innerHeight / 2, 1.2);
        shakeScreen(700, "shake-hard");
      } else {
        const bump = score >= 6 ? 3 : 2;
        state.education = clamp(state.education + bump);
        toast("Bonus parcial: +" + bump + " educación", "sea");
      }
      renderBars();
      flashScreen();
      const done = miniResolve;
      miniResolve = null;
      closeMinigame();
      if (done) window.setTimeout(done, 80);
    }

    function onChest(ev) {
      score++;
      el.miniScore.textContent = String(score);
      const rect = el.chest.getBoundingClientRect();
      spawnExplosion(rect.left + rect.width / 2, rect.top + rect.height / 3, 0.55);
      el.chest.classList.remove("chest-hit--pulse");
      void el.chest.offsetWidth;
      el.chest.classList.add("chest-hit--pulse");
    }

    el.chest.onclick = onChest;
    el.miniSkip.onclick = function () {
      finish();
    };

    miniTimerId = window.setInterval(tick, 50);
  }

  function scheduleAfterChoice(p, clientX, clientY) {
    const lines = [];
    if (p.edu) lines.push((p.edu > 0 ? "+" : "") + p.edu + " edu");
    if (p.dev) lines.push((p.dev > 0 ? "+" : "") + p.dev + " dev");
    if (p.gro) lines.push((p.gro > 0 ? "+" : "") + p.gro + " cre");
    floatDelta(clientX, clientY - 28, lines);

    const power = Math.abs(p.edu) + Math.abs(p.dev) + Math.abs(p.gro);
    spawnExplosion(clientX, clientY, power > 28 ? 1.05 : 0.75);
    if (power > 32) {
      shakeScreen(420, "shake-hard");
      toast(YELLS[(Math.random() * YELLS.length) | 0], "boom");
    } else {
      toast(YELLS[(Math.random() * YELLS.length) | 0], "sea");
    }

    updateCombo(p.edu + p.dev + p.gro);
    maybeWindBonus();

    const nextRound = state.round + 1;
    if (nextRound >= TOTAL_ROUNDS) {
      window.setTimeout(function () {
        state.round = nextRound;
        updateTrail();
        endGame();
      }, 480);
      return;
    }

    function advance() {
      state.round = nextRound;
      updateTrail();
      if (nextRound % 3 === 0) {
        runChestMinigame(function () {
          window.setTimeout(showStage, 200);
        });
      } else {
        window.setTimeout(showStage, 420);
      }
    }

    window.setTimeout(advance, 380);
  }

  function renderForkButton(p) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-fork fork--" + p.fork;
    const rail = document.createElement("span");
    rail.className = "fork-rail";
    rail.setAttribute("aria-hidden", "true");
    const body = document.createElement("span");
    body.className = "fork-body";
    const kick = document.createElement("span");
    kick.className = "fork-kicker";
    kick.textContent = p.kicker;
    const tx = document.createElement("span");
    tx.className = "fork-text";
    tx.textContent = p.text;
    body.appendChild(kick);
    body.appendChild(tx);
    btn.appendChild(rail);
    btn.appendChild(body);
    return btn;
  }

  function showStage() {
    if (state.round >= TOTAL_ROUNDS) {
      updateTrail();
      endGame();
      return;
    }

    const st = stages[state.round];
    el.round.textContent = "Etapa " + (state.round + 1) + " de " + TOTAL_ROUNDS;
    el.situation.textContent = st.situation;
    el.prompt.textContent = st.prompt;
    el.prompt.removeAttribute("hidden");

    updateTrail();

    el.choices.innerHTML = "";
    st.paths.forEach(function (p) {
      const btn = renderForkButton(p);
      btn.addEventListener("click", function (ev) {
        if (state.finished) return;
        Array.from(el.choices.children).forEach(function (b) {
          b.disabled = true;
        });
        const applied = applyPath(p);
        const cx = ev.clientX || window.innerWidth / 2;
        const cy = ev.clientY || window.innerHeight / 2;
        scheduleAfterChoice(applied, cx, cy);
      });
      el.choices.appendChild(btn);
    });
  }

  function reset() {
    state.education = 50;
    state.development = 50;
    state.growth = 50;
    state.round = 0;
    state.finished = false;
    state.combo = 1;
    state.duelUsed = false;
    el.message.textContent = "";
    el.message.classList.remove("win", "lose");
    el.restart.classList.add("hidden");
    el.combo.textContent = "Combo ×1";
    el.duelBtn.disabled = false;
    el.fx.innerHTML = "";
    el.toast.innerHTML = "";
    renderBars();
    updateTrail();
    showStage();
  }

  /* —— Duelo relámpago (reacción) —— */
  let duelTimer = null;
  let duelPhase = "idle";
  let duelHits = 0;
  let duelRound = 0;

  function closeDuel() {
    el.duelOverlay.classList.add("hidden");
    el.duelHit.disabled = true;
    if (duelTimer) {
      window.clearTimeout(duelTimer);
      duelTimer = null;
    }
    duelPhase = "idle";
  }

  function startDuelRound() {
    el.duelHit.disabled = true;
    el.duelStatus.textContent = "Espera la señal…";
    duelPhase = "wait";
    const wait = 600 + Math.random() * 1400;
    duelTimer = window.setTimeout(function () {
      duelPhase = "go";
      el.duelStatus.innerHTML = "<strong class=\"duel-go\">¡YA!</strong>";
      el.duelHit.disabled = false;
      const limit = 550;
      duelTimer = window.setTimeout(function () {
        if (duelPhase === "go") {
          duelPhase = "miss";
          el.duelHit.disabled = true;
          el.duelStatus.textContent = "Tarde… racha a cero.";
          duelHits = 0;
          el.duelScore.textContent = "Aciertos: 0 / 3";
          window.setTimeout(startDuelRound, 900);
        }
      }, limit);
    }, wait);
  }

  function openDuel() {
    if (state.duelUsed) return;
    el.duelOverlay.classList.remove("hidden");
    duelHits = 0;
    duelRound = 0;
    el.duelScore.textContent = "Aciertos: 0 / 3";
    startDuelRound();
  }

  el.duelHit.addEventListener("click", function () {
    if (duelPhase !== "go") return;
    if (duelTimer) window.clearTimeout(duelTimer);
    duelPhase = "idle";
    el.duelHit.disabled = true;
    duelHits++;
    el.duelScore.textContent = "Aciertos: " + duelHits + " / 3";
    spawnExplosion(
      el.duelHit.getBoundingClientRect().left + 40,
      el.duelHit.getBoundingClientRect().top + 20,
      0.9
    );
    shakeScreen(280, "shake-hard");
    if (duelHits >= 3) {
      state.education = clamp(state.education + 5);
      state.development = clamp(state.development + 5);
      state.growth = clamp(state.growth + 5);
      renderBars();
      toast("¡Duelo ganado! +5 en todo", "gold");
      confettiBurst();
      state.duelUsed = true;
      el.duelBtn.disabled = true;
      el.duelStatus.textContent = "¡Tripulación enardecida!";
      window.setTimeout(closeDuel, 1200);
      return;
    }
    el.duelStatus.textContent = "¡Bien! siguiente…";
    window.setTimeout(startDuelRound, 500);
  });

  el.duelBtn.addEventListener("click", openDuel);
  el.duelClose.addEventListener("click", closeDuel);

  el.restart.addEventListener("click", reset);

  buildTrail();
  buildLoot();
  renderBars();
  updateTrail();
  showStage();
})();
