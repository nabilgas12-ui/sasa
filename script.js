// تخصيص الموقع: غيّر تاريخ بداية العلاقة بصيغة YYYY-MM-DD.
// مثال: "2024-11-03". التاريخ الحالي تجريبي ويجب استبداله بتاريخكما الحقيقي.
const SETTINGS = {
  startDate: "2025-02-14",
  musicFile: "assets/soft-music.mp3"
};

const $ = (selector) => document.querySelector(selector);
const dateLabel = $("#todayDate");
dateLabel.textContent = new Intl.DateTimeFormat("ar-DZ", {
  day: "numeric", month: "long", year: "numeric"
}).format(new Date());

function updateTimer() {
  const start = new Date(`${SETTINGS.startDate}T00:00:00`);
  const now = new Date();
  if (Number.isNaN(start.getTime()) || start > now) {
    ["days", "hours", "minutes", "seconds"].forEach(id => $("#" + id).textContent = "—");
    return;
  }
  let remaining = Math.floor((now - start) / 1000);
  const days = Math.floor(remaining / 86400); remaining %= 86400;
  const hours = Math.floor(remaining / 3600); remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  $("#days").textContent = days.toLocaleString("ar-DZ");
  $("#hours").textContent = hours.toLocaleString("ar-DZ");
  $("#minutes").textContent = minutes.toLocaleString("ar-DZ");
  $("#seconds").textContent = seconds.toLocaleString("ar-DZ");
}
updateTimer();
setInterval(updateTimer, 1000);

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 3200);
}

function rainPetals(count = 55) {
  const layer = $("#petalLayer");
  if (!layer) return;
  const symbols = ["🌸", "🌷", "❀", "✿", "♥", "♡", "🌹"];
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    // توزيع عشوائي على عرض الشاشة كاملة (من الحافة إلى الحافة).
    petal.style.left = (2 + Math.random() * 96) + "vw";
    petal.style.setProperty("--sway", (Math.random() * 80 - 40) + "px");
    petal.style.fontSize = (16 + Math.random() * 25) + "px";
    petal.style.color = ["#d95e83", "#f0a1b8", "#e7b8c8", "#c88a9f", "#f4b6c9"][Math.floor(Math.random() * 5)];
    petal.style.animationDuration = (6 + Math.random() * 4) + "s";
    petal.style.animationDelay = (Math.random() * 3.5) + "s";
    layer.appendChild(petal);
    setTimeout(() => petal.remove(), 14500);
  }
}

function centerBloom() { // اسم قديم: الآن تتوزع الورود على كامل الشاشة
  const layer = $("#petalLayer");
  if (!layer) return;
  const flowers = ["🌹", "🌸", "🌷", "✿", "❀", "💗"];
  for (let i = 0; i < 28; i++) {
    const bloom = document.createElement("span");
    bloom.className = "center-bloom";
    bloom.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    bloom.style.left = (2 + Math.random() * 96) + "vw";
    bloom.style.animationDelay = (Math.random() * 3) + "s";
    bloom.style.fontSize = (20 + Math.random() * 22) + "px";
    bloom.style.setProperty("--sway", (Math.random() * 120 - 60) + "px");
    layer.appendChild(bloom);
    setTimeout(() => bloom.remove(), 11500);
  }
}

function heartBurst(count = 55) {
  const symbols = ["♥", "♡", "✿", "❀", "🌸", "✨"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "confetti-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = (10 + Math.random() * 80) + "vw";
    heart.style.top = (28 + Math.random() * 48) + "vh";
    heart.style.fontSize = (18 + Math.random() * 28) + "px";
    heart.style.color = ["#d95e83", "#f0a1b8", "#c88a9f", "#f2c4d2", "#b83e6b"][Math.floor(Math.random() * 5)];
    heart.style.setProperty("--dx", (Math.random() * 620 - 310) + "px");
    heart.style.setProperty("--dy", (Math.random() * 600 - 360) + "px");
    heart.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2700);
  }
}

function magicMoment() {
  const flash = document.createElement("div");
  flash.className = "magic-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1000);
  heartBurst(100);
  rainPetals(65);
  centerBloom();
}

$("#secretToggle").addEventListener("click", () => {
  const message = $("#secretMessage");
  const opening = message.hidden;
  message.hidden = !opening;
  $("#secretToggle").setAttribute("aria-expanded", String(opening));
  $("#secretToggle").innerHTML = opening
    ? "احتفظي بهذا السرّ في قلبكِ ♡"
    : "هناك سرّ صغير لكِ… اضغطي هنا <span>✧</span>";
  if (opening) { magicMoment(); showToast("هذه الكلمات لكِ وحدكِ يا صبرينة 🌷"); }
});

$("#surpriseButton").addEventListener("click", () => {
  const message = $("#surpriseText");
  const opening = message.hidden;
  message.hidden = !opening;
  $("#surpriseButton").innerHTML = opening ? "مفاجأة من القلب وصلت ♥" : "اضغطي للمفاجأة الأخيرة <span>♡</span>";
  if (opening) {
    magicMoment();
    showToast("إلى صبرينة… أرسلت لكِ بحرًا من الورد 💗");
  }
});

$("#sprinkleBtn").addEventListener("click", () => {
  magicMoment();
  showToast("كل هذه الورود تليق بكِ يا صبرينة 🌸");
});

// الموسيقى اختيارية: ضعي ملف MP3 تملكين حق استخدامه في assets/soft-music.mp3.
// لا يبدأ الصوت تلقائيًا احترامًا لاختيارات الزائر وسياسات المتصفحات.
const music = $("#backgroundMusic");
const musicButton = $("#musicToggle");
music.src = SETTINGS.musicFile;
music.volume = 0.35;
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.setAttribute("aria-pressed", "true");
      $("#musicIcon").textContent = "♫";
      $("#musicLabel").textContent = "أوقفي الموسيقى";
      showToast("أصبحت الأجواء أكثر دفئًا ♡");
    } catch (error) {
      showToast("أضيفي ملف assets/soft-music.mp3 لتشغيل الموسيقى.");
    }
  } else {
    music.pause();
    musicButton.setAttribute("aria-pressed", "false");
    $("#musicLabel").textContent = "شغّل الأجواء";
    showToast("أُوقفت الموسيقى");
  }
});

// يبدأ الموقع بلمسة وردية، ثم يمكنها تشغيل المطر وقتما تحب.
setTimeout(() => { rainPetals(40); centerBloom(); }, 700);
setTimeout(() => { rainPetals(28); centerBloom(); }, 5200);


// عدّاد عيد ميلاد صبرينة: 25 أكتوبر من كل عام.
function updateBirthdayCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 9, 25, 0, 0, 0);
  if (now > new Date(now.getFullYear(), 9, 25, 23, 59, 59)) {
    target = new Date(now.getFullYear() + 1, 9, 25, 0, 0, 0);
  }
  const birthdayDay = now.getMonth() === 9 && now.getDate() === 25;
  const message = $("#birthdayMessage");
  if (birthdayDay) {
    ["bDays", "bHours", "bMinutes", "bSeconds"].forEach(id => $("#" + id).textContent = "♥");
    message.textContent = "عيد ميلاد سعيد يا صبرينة! كل عام وأنتِ فرحة هذا العالم ووردة القلب 🌷";
    return;
  }
  let secondsLeft = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(secondsLeft / 86400); secondsLeft %= 86400;
  const hours = Math.floor(secondsLeft / 3600); secondsLeft %= 3600;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  $("#bDays").textContent = days.toLocaleString("ar-DZ");
  $("#bHours").textContent = hours.toLocaleString("ar-DZ");
  $("#bMinutes").textContent = minutes.toLocaleString("ar-DZ");
  $("#bSeconds").textContent = seconds.toLocaleString("ar-DZ");
}
updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);

// ظهور تدريجي للأقسام عند التمرير، مع احترام إعداد تقليل الحركة.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".section-heading, .letter-card, .reason-card, .gallery-item, .timer-cell, .promise-card, .final-content, .reveal").forEach(el => {
    el.classList.add("will-reveal");
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  document.querySelectorAll(".will-reveal").forEach(el => revealObserver.observe(el));
}


// تهيئة إمكانات التثبيت والعمل دون اتصال بعد فتح الموقع من استضافة HTTPS.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
