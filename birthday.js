/* ========================================
   BIRTHDAY WEBSITE - JAVASCRIPT
   ======================================== */

// ========== AUDIO PLAYER SETUP ==========
const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("birthday-audio");

// ========== MUSIC BUTTON HANDLER ==========
musicBtn.addEventListener("click", () => {
  try {
    if (audio.paused) {
      audio.play();
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = '<span class="icon">🎵</span> Stop Music';
      console.log("✓ Music playing!");
    } else {
      audio.pause();
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = '<span class="icon">🎵</span> Play Music';
      console.log("⏸ Music paused!");
    }
  } catch (error) {
    console.error("Error playing audio:", error);
    alert(
      "Error: Could not play audio. Make sure the file exists in the same folder."
    );
  }
});

// Reset button state when audio ends
audio.addEventListener("ended", () => {
  musicBtn.classList.remove("playing");
  musicBtn.innerHTML = '<span class="icon">🎵</span> Play Music';
});

// Handle audio errors
audio.addEventListener("error", (error) => {
  console.error("Audio error:", error);
  alert(
    "Error loading audio file. Check if the file exists in the same folder."
  );
  musicBtn.classList.remove("playing");
  musicBtn.innerHTML = '<span class="icon">🎵</span> Play Music';
});

// ========== SURPRISE REVEAL HANDLERS ==========
const surpriseBtns = document.querySelectorAll(".surprise-btn");

surpriseBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const content = document.querySelector(`.surprise-content-${index + 1}`);
    if (content) {
      content.classList.remove("hidden");
      createConfetti(); // Celebrate the reveal!
      // small balloon burst on reveal
      if (typeof createBalloons === "function") createBalloons(10);
    }
  });
});

// Close surprise when clicking outside
document.querySelectorAll(".surprise-content").forEach((content) => {
  content.addEventListener("click", (e) => {
    if (e.target === content) {
      content.classList.add("hidden");
    }
  });
});

// ========== EXPANDED PHOTO UPLOAD ==========
// (Removed - photos are now pre-loaded from folder)

function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["#ff6b9d", "#ffd700", "#4ecdc4", "#667eea", "#f5576c"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    confetti.style.opacity = Math.random();

    container.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 3500);
  }
}

// Create floating balloons that rise up and disappear
function createBalloons(count = 8) {
  const container =
    document.getElementById("confetti-container") || document.body;
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "balloon color-" + ((i % 5) + 1);
    // random horizontal start position
    b.style.left = Math.max(5, Math.random() * 90) + "%";
    // random delay and duration
    const delay = Math.random() * 0.6;
    const duration = 5 + Math.random() * 4;
    b.style.animationDelay = delay + "s";
    b.style.animationDuration = duration + "s";
    // slight scale variation
    b.style.transform = `translateY(0) scale(${0.9 + Math.random() * 0.3})`;

    document.body.appendChild(b);

    // remove after animation ends
    setTimeout(() => {
      b.remove();
    }, (delay + duration) * 1000 + 200);
  }
}

// Trigger confetti on page load
window.addEventListener("load", () => {
  createConfetti();
  // Create confetti again every 5 seconds
  setInterval(createConfetti, 5000);
});

// ========== PHOTO UPLOAD ==========
// (Photos now pre-loaded from folder)

// ========== CHARACTER COUNT ==========
const customMsg = document.getElementById("custom-msg");
const charCount = document.getElementById("char-count");

customMsg.addEventListener("input", () => {
  charCount.textContent = customMsg.value.length;
});

// ========== BLOW CANDLES ==========
const blowBtn = document.getElementById("blow-btn");

blowBtn.addEventListener("click", () => {
  blowBtn.classList.add("blown");

  // Create wind effect confetti
  const container = document.getElementById("confetti-container");
  const windColors = ["#fff9e6", "#ffe6f0", "#e6f7ff"];

  for (let i = 0; i < 50; i++) {
    const windParticle = document.createElement("div");
    windParticle.classList.add("confetti");
    windParticle.style.left = Math.random() * 100 + "%";
    windParticle.style.background =
      windColors[Math.floor(Math.random() * windColors.length)];
    windParticle.style.animationDuration = 1 + Math.random() * 0.8 + "s";
    windParticle.style.opacity = Math.random() * 0.7;

    container.appendChild(windParticle);

    setTimeout(() => {
      windParticle.remove();
    }, 2500);
  }

  // Show birthday message after candles blow out
  setTimeout(() => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("birthday-message");
    messageDiv.textContent = "Happy Birthday\nKaleem Sahab! 🎉";
    document.body.appendChild(messageDiv);

    // Create celebration confetti after message appears
    setTimeout(() => {
      // spawn balloons as part of the celebration
      if (typeof createBalloons === "function") createBalloons(14);
      const colors = ["#ff6b9d", "#ffd700", "#4ecdc4", "#667eea", "#f5576c"];
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = 2 + Math.random() * 1.5 + "s";
        confetti.style.opacity = Math.random();

        container.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 3500);
      }
    }, 300);

    // Remove message after animation
    setTimeout(() => {
      messageDiv.remove();
      blowBtn.classList.remove("blown");
    }, 2500);
  }, 800);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation =
        entry.target.style.animation || "slideUp 0.8s ease";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// ========== ADD INTERACTIVE TOUCHES ==========
// Add click animation to wish items
document.querySelectorAll(".wish-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.animation = "popIn 0.4s ease";
    setTimeout(() => {
      this.style.animation = "";
    }, 400);
  });
});

// ========== PARTICLE EFFECT ON MESSAGE BOX ==========
const messageBox = document.querySelector(".message-box");
if (messageBox) {
  messageBox.addEventListener("mouseenter", function () {
    createConfetti();
  });
}

// ========== RESPONSIVE TOUCH ==========
// Improve touch experience on mobile
if (window.matchMedia("(max-width: 768px)").matches) {
  document.body.style.fontSize = "14px";

  // Add touch-friendly optimizations
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.style.touchAction = "manipulation";
    btn.style.WebkitTapHighlightColor = "transparent";
  });

  // Optimize surprise buttons for touch
  const surpriseBtns = document.querySelectorAll(".surprise-btn");
  surpriseBtns.forEach((btn) => {
    btn.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-8px) scale(1.05)";
    });
    btn.addEventListener("touchend", function () {
      this.style.transform = "";
    });
  });

  // Optimize photo cards for touch
  const photoPlaceholders = document.querySelectorAll(".photo-placeholder");
  photoPlaceholders.forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)";
    });
    card.addEventListener("touchend", function () {
      this.style.transform = "";
    });
  });
}

// ========== PAGE VISIBILITY MANAGEMENT ==========
document.addEventListener("visibilitychange", () => {
  if (document.hidden && !audio.paused) {
    audio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.innerHTML = '<span class="icon">🎵</span> Play Music';
  }
});

// ========== INTRO OVERLAY REVEAL HANDLER ==========
const introOverlay = document.getElementById("intro-overlay");
const revealBtn = document.getElementById("reveal-btn");
// blur main initially so background is obscured until reveal
const mainEl = document.querySelector("main");
if (mainEl) mainEl.classList.add("blurred");
if (revealBtn) {
  revealBtn.addEventListener("click", () => {
    // hide overlay
    if (introOverlay) introOverlay.classList.add("hidden");

    // remove blur so content becomes clear
    if (mainEl) mainEl.classList.remove("blurred");

    // play audio as user-initiated action
    try {
      audio.play();
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = '<span class="icon">🎵</span> Stop Music';
    } catch (err) {
      console.warn("Audio play blocked or failed", err);
    }

    // small reveal animations for sections with stagger
    const secs = Array.from(document.querySelectorAll("section"));
    secs.forEach((sec, i) => {
      sec.style.animation = `scaleIn 0.6s ease ${i * 120}ms both`;
    });

    // trigger confetti for celebration
    createConfetti();
  });
}

console.log("🎉 Birthday website loaded successfully! Have fun! 🎂");
