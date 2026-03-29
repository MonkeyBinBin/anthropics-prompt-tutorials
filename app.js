// 章節定義
const chapters = [
  { id: "ch00", num: "00", title: "教學指南", section: "intro" },
  { id: "ch01", num: "01", title: "基本提示詞結構", section: "core" },
  { id: "ch02", num: "02", title: "清晰與直接", section: "core" },
  { id: "ch03", num: "03", title: "角色指派", section: "core" },
  { id: "ch04", num: "04", title: "分離資料與指令", section: "core" },
  { id: "ch05", num: "05", title: "格式化輸出與預填回應", section: "core" },
  { id: "ch06", num: "06", title: "預思考（逐步思考）", section: "core" },
  { id: "ch07", num: "07", title: "使用範例（Few-Shot）", section: "core" },
  { id: "ch08", num: "08", title: "避免幻覺", section: "core" },
  { id: "ch09", num: "09", title: "從零建構複雜提示詞", section: "core" },
  { id: "ch10_1", num: "10.1", title: "提示詞鏈接", section: "appendix" },
  { id: "ch10_2", num: "10.2", title: "工具使用", section: "appendix" },
  { id: "ch10_3", num: "10.3", title: "搜尋與檢索", section: "appendix" },
];

let currentChapter = "ch00";

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  setupMenuToggle();

  // 從 URL hash 或 localStorage 還原
  const hash = window.location.hash.replace("#", "");
  if (hash && chapters.find((c) => c.id === hash)) {
    navigateTo(hash);
  } else {
    const saved = localStorage.getItem("current-chapter");
    if (saved && chapters.find((c) => c.id === saved)) {
      navigateTo(saved);
    } else {
      navigateTo("ch00");
    }
  }
});

function buildNav() {
  const nav = document.getElementById("sidebar-nav");
  let html = "";
  let currentSection = "";

  chapters.forEach((ch) => {
    if (ch.section !== currentSection) {
      currentSection = ch.section;
      const labels = {
        intro: "開始",
        core: "核心章節",
        appendix: "附錄",
      };
      html += `<div class="nav-section-label">${labels[currentSection]}</div>`;
    }
    html += `
      <div class="nav-item" data-id="${ch.id}" onclick="navigateTo('${ch.id}')">
        <span class="nav-number">${ch.num}</span>
        <span>${ch.title}</span>
      </div>`;
  });

  nav.innerHTML = html;
  updateProgress();
}

function navigateTo(id) {
  currentChapter = id;
  window.location.hash = id;
  localStorage.setItem("current-chapter", id);

  // 更新側邊欄
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === id);
  });

  // 顯示對應內容
  document.querySelectorAll(".chapter").forEach((el) => {
    el.style.display = el.id === id ? "block" : "none";
  });

  // 關閉行動選單
  closeMobileMenu();

  // 標記已讀
  markRead(id);
  updateProgress();

  // 捲動到頂部
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function markRead(id) {
  const read = JSON.parse(localStorage.getItem("read-chapters") || "[]");
  if (!read.includes(id)) {
    read.push(id);
    localStorage.setItem("read-chapters", JSON.stringify(read));
  }

  // 標記已完成的章節
  const readSet = new Set(read);
  document.querySelectorAll(".nav-item").forEach((el) => {
    if (readSet.has(el.dataset.id) && el.dataset.id !== currentChapter) {
      el.classList.add("completed");
    }
  });
}

function updateProgress() {
  const read = JSON.parse(localStorage.getItem("read-chapters") || "[]");
  const pct = Math.round((read.length / chapters.length) * 100);
  const fill = document.getElementById("progress-fill");
  const text = document.getElementById("progress-text");
  if (fill) fill.style.width = pct + "%";
  if (text) text.textContent = `已閱讀 ${read.length} / ${chapters.length} 章`;
}

function setupMenuToggle() {
  const toggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  toggle?.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });

  overlay?.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById("sidebar")?.classList.remove("open");
  document.getElementById("sidebar-overlay")?.classList.remove("show");
}

// 複製程式碼
function copyCode(btn) {
  const pre = btn.closest(".code-block").querySelector("pre");
  const text = pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 已複製';
    setTimeout(() => {
      btn.innerHTML = original;
    }, 1500);
  });
}

// 提示摺疊
function toggleHint(btn) {
  const content = btn.nextElementSibling;
  btn.classList.toggle("open");
  content.classList.toggle("show");
}

// 章節導覽
function goNext() {
  const idx = chapters.findIndex((c) => c.id === currentChapter);
  if (idx < chapters.length - 1) {
    navigateTo(chapters[idx + 1].id);
  }
}

function goPrev() {
  const idx = chapters.findIndex((c) => c.id === currentChapter);
  if (idx > 0) {
    navigateTo(chapters[idx - 1].id);
  }
}

// 鍵盤導覽
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "ArrowLeft" || e.key === "p") goPrev();
  if (e.key === "ArrowRight" || e.key === "n") goNext();
});
