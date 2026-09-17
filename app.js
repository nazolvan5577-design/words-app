// ІНІЦІАЛІЗАЦІЯ І ПРОФІЛІ
let currentProfile = localStorage.getItem("activeProfile") || "Nazar";
let currentCategory = 'all';
let currentMode = 'cards';
let activeWords = [];
let cardIndex = 0;
let showingEn = true;

window.onload = function() {
    document.getElementById("profile-select").value = currentProfile;
    loadTeacherTasks();
    renderAlphabet();
    renderGrammar();
    filterWords();
    updateCard();
    initCanvasBg();
};

function changeProfile() {
    currentProfile = document.getElementById("profile-select").value;
    localStorage.setItem("activeProfile", currentProfile);
    loadTeacherTasks();
}

// ВЧИТЕЛЬСЬКА ПАНЕЛЬ
function loadTeacherTasks() {
    const savedTask = localStorage.getItem(`teacherTask_${currentProfile}`);
    const taskBox = document.getElementById("display-tasks");
    const taskInput = document.getElementById("teacher-task-input");
    const defaultTask = `Вітаємо, ${currentProfile}! Виберіть тему ліворуч та пройдіть тренування.`;
    
    taskBox.textContent = savedTask || defaultTask;
    if(taskInput) taskInput.value = savedTask || defaultTask;
}

function saveTeacherTasks() {
    const text = document.getElementById("teacher-task-input").value;
    const targetUser = document.getElementById("target-user-select").value;
    localStorage.setItem(`teacherTask_${targetUser}`, text);
    if(targetUser === currentProfile) loadTeacherTasks();
    alert(`Завдання для ${targetUser} збережено!`);
}

// ПЕРШИЙ КЛАС — ПОВНИЙ АЛФАВІТ
function renderAlphabet() {
    const grid = document.getElementById("alphabet-grid");
    if (!grid) return;
    grid.innerHTML = "";
    alphabetData.forEach(item => {
        const card = document.createElement("div");
        card.className = "alphabet-card";
        card.onclick = () => speakWord(item.word, item.ua, item.letter);
        card.innerHTML = `
            <div class="letter">${item.letter}</div>
            <div class="icon">${item.icon}</div>
            <div class="word">${item.word}</div>
        `;
        grid.appendChild(card);
    });
}

function speakWord(en, ua, letter) {
    document.getElementById("kid-display-box").style.display = "block";
    document.getElementById("kid-display-box").innerHTML = `<b>Буква ${letter}: ${en}</b> — ${ua}`;
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(en);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

// ГРАМАТИКА
function renderGrammar() {
    const container = document.getElementById("grammar-topics-container");
    if(!container) return;
    container.innerHTML = "";
    grammarTopics.forEach(g => {
        const box = document.createElement("div");
        box.style.cssText = "background: rgba(30,30,30,0.8); padding:12px; margin-bottom:10px; border-left:3px solid #3498db; border-radius:6px;";
        box.innerHTML = `<h4 style="color:#3498db; margin:0 0 5px 0;">${g.title}</h4><p style="font-size:12px; margin:0;">${g.desc}</p><code style="color:#2ecc71; font-size:11px;">${g.rule}</code>`;
        container.appendChild(box);
    });
}

// ПЕРЕМИКАННЯ РЕЖИМІВ ТА В'ЮХ
function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${viewName}`).classList.add('active');
}

function selectTopic(category, title, desc) {
    currentCategory = category;
    switchView('practice');
    filterWords();
    updateCard();
}

function filterWords() {
    if (currentCategory === 'all') activeWords = [...allWords];
    else activeWords = allWords.filter(w => w.category === currentCategory);
}

function updateCard() {
    if (activeWords.length === 0) {
        document.getElementById("card-text").textContent = "Немає слів у цій категорії";
        return;
    }
    showingEn = true;
    document.getElementById("card-text").textContent = activeWords[cardIndex].en;
    document.getElementById("card-counter").textContent = `Картка ${cardIndex + 1} з ${activeWords.length}`;
}

function flipCard() {
    if (activeWords.length === 0) return;
    showingEn = !showingEn;
    document.getElementById("card-text").textContent = showingEn ? activeWords[cardIndex].en : activeWords[cardIndex].ua;
}

function nextCard() { if (activeWords.length) { cardIndex = (cardIndex + 1) % activeWords.length; updateCard(); } }
function prevCard() { if (activeWords.length) { cardIndex = (cardIndex - 1 + activeWords.length) % activeWords.length; updateCard(); } }

// АНІМАЦІЯ ФОНУ (СОТИ)
function initCanvasBg() {
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    const hexRadius = 35;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const hexWidth = 2 * hexRadius;
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    window.addEventListener('mousemove', (e) => { mouse.targetX = e.clientX; mouse.targetY = e.clientY; });
    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];

    function drawHexagon(x, y, radius, isClose) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + radius * Math.cos(angle);
            const hy = y + radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(25, 25, 25, 0.7)';
        ctx.fill();
        ctx.strokeStyle = isClose ? '#444' : '#222';
        ctx.stroke();
    }

    function animateBg() {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
        ctx.clearRect(0, 0, width, height);

        const horizDist = hexWidth * 3 / 4;
        const vertDist = hexHeight;
        const cols = Math.ceil(width / horizDist) + 2;
        const rows = Math.ceil(height / vertDist) + 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * horizDist;
                const y = r * vertDist + (c % 2 === 0 ? 0 : vertDist / 2);
                const dx = mouse.x - x; const dy = mouse.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let isClose = dist < 120;
                drawHexagon(x, y, hexRadius - 2, isClose);
            }
        }
        requestAnimationFrame(animateBg);
    }
    animateBg();
}