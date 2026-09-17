let currentProfile = localStorage.getItem("activeProfile") || "Nazar";
let categories = [];
let allWords = [];
let currentCategory = 'all';
let currentMode = 'cards';
let activeWords = [];
let cardIndex = 0;
let showingEn = true;

let testIndex = 0;
let testScore = 0;
let answered = false;

let selectedGameCard = null;
let matchedPairsCount = 0;
let totalPairsInGame = 0;

window.onload = function() {
    initCategoriesAndWords();
    document.getElementById("profile-select").value = currentProfile;
    loadTeacherTasks();
    renderTopicsSidebar();
    renderCategoryDropdown();
    renderAlphabet();
    renderGrammar();
    filterWords();
    updateCard();
    initCanvasBg();
};

function initCategoriesAndWords() {
    // Завантаження категорій
    const customCats = JSON.parse(localStorage.getItem("customCategories") || "[]");
    categories = [...defaultCategories, ...customCats];

    // Завантаження слів
    const customWords = JSON.parse(localStorage.getItem("customWords") || "[]");
    allWords = [...baseWords, ...customWords];
}

function changeProfile() {
    currentProfile = document.getElementById("profile-select").value;
    localStorage.setItem("activeProfile", currentProfile);
    loadTeacherTasks();
}

// ВЧИТЕЛЬСЬКА ПАНЕЛЬ: Завдання
function loadTeacherTasks() {
    const savedTask = localStorage.getItem(`teacherTask_${currentProfile}`);
    const taskBox = document.getElementById("display-tasks");
    const taskInput = document.getElementById("teacher-task-input");
    const defaultTask = `Вітаємо, ${currentProfile}! 🌟\nОберіть тему ліворуч та виконайте тренування.`;
    
    taskBox.textContent = savedTask || defaultTask;
    if(taskInput) taskInput.value = savedTask || defaultTask;
}

function saveTeacherTasks() {
    const text = document.getElementById("teacher-task-input").value;
    const targetUser = document.getElementById("target-user-select").value;
    localStorage.setItem(`teacherTask_${targetUser}`, text);
    if(targetUser === currentProfile) loadTeacherTasks();
    alert(`Завдання для "${targetUser}" збережено!`);
}

// ВЧИТЕЛЬСЬКА ПАНЕЛЬ: Створення нової теми
function createNewTopic() {
    const nameInput = document.getElementById("new-topic-name");
    const topicName = nameInput.value.trim();
    if (!topicName) { alert("Введіть назву нової теми!"); return; }

    const topicId = "custom_" + Date.now();
    const newCat = {
        id: topicId,
        name: "📁 " + topicName,
        desc: `Авторська тема: ${topicName}`
    };

    let customCats = JSON.parse(localStorage.getItem("customCategories") || "[]");
    customCats.push(newCat);
    localStorage.setItem("customCategories", JSON.stringify(customCats));

    categories.push(newCat);
    renderTopicsSidebar();
    renderCategoryDropdown();
    nameInput.value = "";
    alert(`Тему "${topicName}" успішно створено! Вона з'явилася у списку.`);
}

// ВЧИТЕЛЬСЬКА ПАНЕЛЬ: Додавання слів
function addBulkWords() {
    const text = document.getElementById("bulk-text").value.trim();
    const category = document.getElementById("bulk-cat").value;
    if (!text) { alert("Вставте список слів!"); return; }

    const lines = text.split("\n");
    let addedCount = 0;
    let customList = JSON.parse(localStorage.getItem("customWords") || "[]");

    lines.forEach(line => {
        let parts = line.split(/[-–:]/);
        if (parts.length >= 2) {
            let en = parts[0].trim();
            let ua = parts.slice(1).join(" ").trim();
            if (en && ua) {
                const newEntry = { en: en, ua: ua, category: category };
                allWords.push(newEntry);
                customList.push(newEntry);
                addedCount++;
            }
        }
    });

    if (addedCount > 0) {
        localStorage.setItem("customWords", JSON.stringify(customList));
        document.getElementById("bulk-text").value = "";
        alert(`Додано слів: ${addedCount}!`);
        filterWords();
        if (currentMode === 'cards') updateCard();
        else if (currentMode === 'test') startTest();
        else if (currentMode === 'game') startMatchingGame();
    } else {
        alert("Помилка формату. Використовуйте: Слово - Переклад");
    }
}

// РЕНДЕР СИСТЕМИ ТЕМ
function renderTopicsSidebar() {
    const container = document.getElementById("sidebar-topics");
    if (!container) return;
    container.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `topic-btn ${cat.id === currentCategory ? 'active' : ''}`;
        btn.textContent = cat.name;
        btn.onclick = () => selectTopic(cat.id, cat.name, cat.desc, btn);
        container.appendChild(btn);
    });
}

function renderCategoryDropdown() {
    const select = document.getElementById("bulk-cat");
    if (!select) return;
    select.innerHTML = "";

    categories.filter(c => c.id !== 'all').forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        select.appendChild(opt);
    });
}

function selectTopic(categoryId, title, desc, btnElement) {
    currentCategory = categoryId;
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    document.getElementById('grammar-title').textContent = title;
    document.getElementById('grammar-desc').textContent = desc;

    switchView('practice');
    filterWords();
    if (currentMode === 'cards') { cardIndex = 0; updateCard(); }
    else if (currentMode === 'test') { startTest(); }
    else if (currentMode === 'game') { startMatchingGame(); }
}

function filterWords() {
    if (currentCategory === 'all') activeWords = [...allWords];
    else activeWords = allWords.filter(w => w.category === currentCategory);
}

function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${viewName}`).classList.add('active');
}

// ПЕРШИЙ КЛАС
function renderAlphabet() {
    const grid = document.getElementById("alphabet-grid");
    if (!grid) return;
    grid.innerHTML = "";
    alphabetData.forEach(item => {
        const card = document.createElement("div");
        card.className = "alphabet-card";
        card.onclick = () => speakWord(item.word, item.ua, item.letter);
        card.innerHTML = `<div class="letter">${item.letter}</div><div class="icon">${item.icon}</div><div class="word">${item.word}</div>`;
        grid.appendChild(card);
    });
}

function speakWord(en, ua, letter) {
    const box = document.getElementById("kid-display-box");
    box.style.display = "block";
    box.innerHTML = `<b>✨ Буква ${letter}: ${en}</b> — ${ua}`;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
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
        box.style.cssText = "background: rgba(30, 30, 30, 0.9); padding: 14px; margin-bottom: 12px; border-left: 4px solid #3498db; border-radius: 8px;";
        box.innerHTML = `<h4 style="color:#3498db; margin:0 0 6px 0;">${g.title}</h4><p style="font-size:13px; color:#ddd; margin:0 0 8px 0;">${g.desc}</p><div style="background:rgba(0,0,0,0.4); padding:6px; font-family:monospace; color:#2ecc71; font-size:12px;">📌 ${g.rule}</div>`;
        container.appendChild(box);
    });
}

// РЕЖИМИ ТРЕНУВАННЯ
function switchMode(mode) {
    currentMode = mode;
    document.getElementById('btn-cards').classList.toggle('active', mode === 'cards');
    document.getElementById('btn-test').classList.toggle('active', mode === 'test');
    document.getElementById('btn-game').classList.toggle('active', mode === 'game');
    
    document.getElementById('cards-section').style.display = (mode === 'cards') ? 'block' : 'none';
    document.getElementById('test-section').style.display = (mode === 'test') ? 'block' : 'none';
    document.getElementById('game-section').style.display = (mode === 'game') ? 'block' : 'none';

    if (mode === 'cards') { cardIndex = 0; updateCard(); }
    else if (mode === 'test') { startTest(); }
    else if (mode === 'game') { startMatchingGame(); }
}

function updateCard() {
    if (activeWords.length === 0) {
        document.getElementById("card-text").textContent = "Немає слів у цій категорії";
        document.getElementById("card-counter").textContent = "0 з 0";
        return;
    }
    showingEn = true;
    document.getElementById("card-text").textContent = activeWords[cardIndex].en;
    document.getElementById("flashcard").style.backgroundColor = "rgba(30, 30, 30, 0.9)";
    document.getElementById("card-counter").textContent = `Картка ${cardIndex + 1} з ${activeWords.length}`;
}

function flipCard() {
    if (activeWords.length === 0) return;
    showingEn = !showingEn;
    document.getElementById("card-text").textContent = showingEn ? activeWords[cardIndex].en : activeWords[cardIndex].ua;
    document.getElementById("flashcard").style.backgroundColor = showingEn ? "rgba(30, 30, 30, 0.9)" : "rgba(20, 50, 40, 0.9)";
}

function nextCard() { if (activeWords.length) { cardIndex = (cardIndex + 1) % activeWords.length; updateCard(); } }
function prevCard() { if (activeWords.length) { cardIndex = (cardIndex - 1 + activeWords.length) % activeWords.length; updateCard(); } }

function startTest() {
    testIndex = 0; testScore = 0;
    if (activeWords.length === 0) {
        document.getElementById("test-section").innerHTML = `<div class="test-word">Немає слів для тесту!</div>`;
        return;
    }
    activeWords.sort(() => Math.random() - 0.5);
    loadTestQuestion();
}

function loadTestQuestion() {
    answered = false;
    document.getElementById("test-result").textContent = "";
    document.getElementById("next-test-btn").style.display = "none";
    document.getElementById("test-counter").textContent = `Питання ${testIndex + 1} з ${activeWords.length}`;

    const currentObj = activeWords[testIndex];
    document.getElementById("test-question-word").textContent = currentObj.en;

    let options = [currentObj.ua];
    while (options.length < 4 && options.length < allWords.length) {
        let randomWord = allWords[Math.floor(Math.random() * allWords.length)].ua;
        if (!options.includes(randomWord)) options.push(randomWord);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById("options-container");
    container.innerHTML = "";
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option, currentObj.ua);
        container.appendChild(btn);
    });
}

function checkAnswer(btn, selected, correct) {
    if (answered) return;
    answered = true;
    document.querySelectorAll(".option-btn").forEach(b => {
        if (b.textContent === correct) b.classList.add("correct");
        if (b.textContent === selected && selected !== correct) b.classList.add("wrong");
    });
    if (selected === correct) { document.getElementById("test-result").textContent = "Правильно! 🎉"; testScore++; }
    else { document.getElementById("test-result").textContent = "Помилка! ❌"; }
    document.getElementById("next-test-btn").style.display = "block";
}

function nextTestQuestion() {
    testIndex++;
    if (testIndex < activeWords.length) { loadTestQuestion(); }
    else {
        document.getElementById("test-section").innerHTML = `
            <div class="test-word">Тест завершено! 🎯</div>
            <div style="font-size: 18px; margin-bottom: 20px; text-align: center; color:#2ecc71;">Результат: ${testScore} з ${activeWords.length}</div>
            <button class="action-btn" style="width: 100%;" onclick="switchMode('test')">Пройти знову</button>
        `;
    }
}

function startMatchingGame() {
    const gridContainer = document.getElementById("game-grid-container");
    const resultMsg = document.getElementById("game-result");
    const restartBtn = document.getElementById("restart-game-btn");
    gridContainer.innerHTML = "";
    resultMsg.textContent = "";
    restartBtn.style.display = "none";
    selectedGameCard = null;
    matchedPairsCount = 0;

    if (activeWords.length < 4) {
        gridContainer.innerHTML = "<div style='grid-column: span 2; text-align:center; color:#888;'>Потрібно мінімум 4 слова. Виберіть «Усі теми».</div>";
        return;
    }

    let shuffled = [...activeWords].sort(() => Math.random() - 0.5).slice(0, 4);
    totalPairsInGame = shuffled.length;
    document.getElementById("game-counter").textContent = `Знайдіть пари (Залишилось: ${totalPairsInGame})`;

    let items = [];
    shuffled.forEach((item, index) => {
        items.push({ text: item.en, type: 'en', pairId: index });
        items.push({ text: item.ua, type: 'ua', pairId: index });
    });
    items.sort(() => Math.random() - 0.5);

    items.forEach(elem => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.textContent = elem.text;
        card.dataset.pairId = elem.pairId;
        card.dataset.type = elem.type;
        card.onclick = () => handleGameCardClick(card);
        gridContainer.appendChild(card);
    });
}

function handleGameCardClick(card) {
    if (card.classList.contains('matched') || card.classList.contains('selected')) return;

    if (!selectedGameCard) {
        selectedGameCard = card;
        card.classList.add('selected');
    } else {
        const firstCard = selectedGameCard;
        const secondCard = card;

        if (firstCard.dataset.pairId === secondCard.dataset.pairId && firstCard.dataset.type !== secondCard.dataset.type) {
            firstCard.classList.remove('selected');
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            selectedGameCard = null;
            matchedPairsCount++;

            document.getElementById("game-counter").textContent = `Знайдіть пари (Залишилось: ${totalPairsInGame - matchedPairsCount})`;

            if (matchedPairsCount === totalPairsInGame) {
                document.getElementById("game-result").textContent = "Чудово! Усі пари знайдено! 🏆";
                document.getElementById("restart-game-btn").style.display = "block";
            }
        } else {
            secondCard.classList.add('selected');
            setTimeout(() => {
                firstCard.classList.remove('selected');
                secondCard.classList.remove('selected');
                selectedGameCard = null;
            }, 500);
        }
    }
}

// АНІМАЦІЯ СОТ
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
    window.addEventListener('touchmove', (e) => { if (e.touches.length > 0) { mouse.targetX = e.touches[0].clientX; mouse.targetY = e.touches[0].clientY; } });

    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];

    function drawHexagon(x, y, radius, fillColor, strokeColor) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + radius * Math.cos(angle);
            const hy = y + radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
        if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = 1.5; ctx.stroke(); }
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
                let offsetX = 0, offsetY = 0, isClose = dist < 120;

                if (isClose) {
                    const force = (120 - dist) / 120;
                    offsetX = -(dx / dist) * force * 15;
                    offsetY = -(dy / dist) * force * 15;
                }

                const currentX = x + offsetX;
                const currentY = y + offsetY;

                drawHexagon(currentX, currentY, hexRadius - 2, 'rgba(25, 25, 25, 0.7)', isClose ? '#444' : '#222');

                if (isClose) {
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const hx = currentX + (hexRadius - 2) * Math.cos(angle);
                        const hy = currentY + (hexRadius - 2) * Math.sin(angle);
                        
                        if (i % 2 === 0) {
                            ctx.beginPath();
                            ctx.arc(hx, hy, 3, 0, Math.PI * 2);
                            ctx.fillStyle = colors[(r + c + i) % colors.length];
                            ctx.shadowBlur = 8;
                            ctx.shadowColor = ctx.fillStyle;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        }
                    }
                }
            }
        }
        requestAnimationFrame(animateBg);
    }
    animateBg();
}
