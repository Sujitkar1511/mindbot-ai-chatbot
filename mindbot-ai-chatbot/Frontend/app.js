// ====================================================================
// SECTION 1: DOM ELEMENTS
// ====================================================================
const messagesEl = document.getElementById("messages");
const welcomeEl = document.getElementById("welcome");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("send-btn");
const glowEl = document.querySelector(".center-glow");

const modeToggle = document.getElementById("mode-toggle");
const modeBtns = document.querySelectorAll(".mode-btn");
const modeSlider = document.getElementById("mode-slider");

// Default mode
let currentMode = "without-memory";


// ====================================================================
// SECTION 2: MODE SWITCHER (Without Memory / With Memory)
// ====================================================================

// Move the sliding pill background to the active button
function updateModeSlider(targetBtn) {
  if (!modeSlider || !targetBtn) return;
  modeSlider.style.width = `${targetBtn.offsetWidth}px`;
  modeSlider.style.transform = `translateX(${targetBtn.offsetLeft}px)`;
}

// Handle mode button clicks
modeBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    // If user clicked the already active mode, do nothing
    if (currentMode === btn.dataset.mode) return;

    //Update active button UI
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    updateModeSlider(btn);

    //Reset UI (clear messages and show welcome screen)
    messagesEl.innerHTML = "";
    welcomeEl.classList.remove("hidden");
    glowEl.classList.remove("top");
    inputEl.value = "";
    sendBtn.disabled = true;

    // 3. Reset backend memory in Python
    try {
      await fetch("http://127.0.0.1:8000/reset", { method: "POST" });
    } catch (err) {
      console.error("Backend reset error:", err);
    }
  });
});

// Position the slider correctly after fonts and page load
function initModeSlider() {
  const activeBtn = document.querySelector(".mode-btn.active");
  if (activeBtn) updateModeSlider(activeBtn);
}

if (document.fonts) {
  document.fonts.ready.then(initModeSlider);
}
requestAnimationFrame(initModeSlider);
window.addEventListener("resize", initModeSlider);


// ====================================================================
// SECTION 3: INPUT & EVENT LISTENERS
// ====================================================================

// Enable send button only when there is typed text
inputEl.addEventListener("input", () => {
  sendBtn.disabled = !inputEl.value.trim();
});


inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

// Click send button
sendBtn.addEventListener("click", send);


// ====================================================================
// SECTION 4: SEND MESSAGE & BACKEND COMMUNICATION
// ====================================================================

async function send() {
  const text = inputEl.value.trim();
  if (!text) return;

  // 1. Hide welcome screen & move top glow
  welcomeEl.classList.add("hidden");
  glowEl.classList.add("top");

  // 2. Display user message
  appendMessage("user", text);

  // 3. Clear input & disable button
  inputEl.value = "";
  sendBtn.disabled = true;

  // 4. Show typing animation
  const typing = showTyping();

  // 5. Send message to Python FastAPI backend
  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        mode: currentMode,
      }),
    });

    const data = await response.json();

    // Remove typing dots and show bot response
    typing.remove();
    appendMessage("bot", data.message);
  } catch (error) {
    typing.remove();
    appendMessage("bot", "Sorry, something went wrong.");
    console.error("Chat error:", error);
  }
}


// ====================================================================
// SECTION 5: UI HELPER FUNCTIONS
// ====================================================================

// Add message bubble to chat screen
function appendMessage(role, text) {
  const wrap = document.createElement("div");
  wrap.className = role === "user" ? "user-msg-wrap" : "bot-msg-wrap";

  const bubble = document.createElement("div");
  bubble.className = role === "user" ? "msg user-msg" : "msg bot-msg";
  bubble.innerHTML = escapeHtml(text);

  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);

  // Auto scroll to bottom
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Show 3 bouncing dots while bot is thinking
function showTyping() {
  const wrap = document.createElement("div");
  wrap.className = "typing-wrap";
  wrap.innerHTML = `
    <div class="typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return wrap;
}

// Security: Prevent HTML injection / XSS attacks
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

// Focus cursor on input on startup
inputEl.focus();
