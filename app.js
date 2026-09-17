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
    const customCats = JSON.parse(localStorage.getItem("customCategories") || "[]");
    categories = [...defaultCategories, ...customCats];
    const customWords = JSON.parse(localStorage.getItem("customWords") || "[]");
    allWords = [...baseWords, ...customWords];
}

function changeProfile() {
    currentProfile = document.getElementById("profile-select").value;
    localStorage.setItem("activeProfile", currentProfile);
    loadTeacherTasks();
}

// 1. РЕНДЕР ГРАМАТИКИ ТА МОДАЛЬНЕ ВІКНО
function renderGrammar() {
    const container = document.getElementById("grammar-topics-container");
    if(!container) return;
    container.innerHTML = "";
    grammarTopics.forEach(g => {
        const item = document.createElement("div");
        item.className = "grammar-card-item";
        item.onclick = () => openGrammarModal(g.id);
        item.innerHTML = `
            <h4>📖 ${g.title}</h4>
            <p>${g.shortDesc}</p>
            <div style="font-size: 11px; color: #3498db; margin-top: 8px; font-weight: bold;">Натисніть для повного розбору 🔍</div>
        `;
        container.appendChild(item);
    });
}

function openGrammarModal(topicId) {
    const topic = grammarTopics.find(t => t.id === topicId);
    if (!topic) return;

    document.getElementById("modal-title").textContent = topic.title;
    document.getElementById("modal-formula").textContent = "📌 Формула: " + topic.formula;
    document.getElementById("modal-explanation").textContent = topic.explanation;
    document.getElementById("modal-signals").textContent = topic.signalWords;

    const list = document.getElementById("modal-examples");
    list.innerHTML = "";
    topic.examples.forEach(ex => {
        const li = document.createElement("li");
        li.textContent = ex;
        list.appendChild(li);
    });

    document.getElementById("grammar-modal").classList.add("active");
}

function closeGrammarModal() {
    document.getElementById("grammar-modal").classList.remove("active");
}

// 2. РЕЖИМИ НАВЧАННЯ (КАРТКИ, ТЕСТ, ГРА)
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

// 3. ЛОГІКА ТЕСТІВ
function startTest() {
    testIndex = 0; testScore = 0;
    const testSec = document.getElementById("test-section");
    
    if (activeWords.length === 0) {
        testSec.innerHTML = `<div class="test-word">Немає слів для тесту!</div>`;
        return;
    }
    
    // Відновлюємо HTML структуру тесту, якщо її було замінено фінальним екраном
    testSec.innerHTML = `
        <div class="counter" id="test-counter">Питання 1 з 0</div>
        <div class="test-word" id="test-question-word">Word</div>
        <div id="options-container"></div>
        <div class="result-message" id="test-result"></div>
        <button class="action-btn" id="next-test-btn" style="width: 100%; margin-top: 10px; display: none;" onclick="nextTestQuestion()">Наступне питання</button>
    `;

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
            <button class="action-btn" style="width: 100%;" onclick="startTest()">Пройти знову</button>
        `;
    }
}

// 4. ЛОГІКА ГРИ (ПОШУК ПАР)
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

// 5. ВЧИТЕЛЬСЬКА ПАНЕЛЬ
function loadTeacherTasks() {
    const savedTask = localStorage.getItem(`teacherTask_${currentProfile}`);
    const taskBox = document.getElementById("display-tasks");
    const taskInput = document.getElementById("teacher-task-input");
    const defaultTask = `Вітаємо, ${currentProfile}! 🌟\nОберіть потрібний розділ ліворуч для навчання.`;
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

function createNewTopic() {
    const topicName = document.getElementById("new-topic-name").value.trim();
    if (!topicName) { alert("Введіть назву теми!"); return; }
    const topicId = "custom_" + Date.now();
    const newCat = { id: topicId, name: "📁 " + topicName, desc: `Авторська тема: ${topicName}` };
    
    let customCats = JSON.parse(localStorage.getItem("customCategories") || "[]");
    customCats.push(newCat);
    localStorage.setItem("customCategories", JSON.stringify(customCats));
    categories.push(newCat);
    
    renderTopicsSidebar();
    renderCategoryDropdown();
    document.getElementById("new-topic-name").value = "";
    alert(`Тему "${topicName}" створено!`);
}

function addBulkWords() {
    const text = document.getElementById("bulk-text").value.trim();
    const category = document.getElementById("bulk-cat").value;
    if (!text) return;
    const lines = text.split("\n");
    let addedCount = 0;
    let customList = JSON.parse(localStorage.getItem("customWords") || "[]");

    lines.forEach(line => {
        let parts = line.split(/[-–:]/);
        if (parts.length >= 2) {
            let en = parts[0].trim();
            let ua = parts.slice(1).join(" ").trim();
            if (en && ua) {
                const newEntry = { en, ua, category };
                allWords.push(newEntry);
                customList.push(newEntry);
                addedCount++;
            }
        }
    });

    if (addedCount > 0) {
        localStorage.setItem("customWords", JSON.stringify(customList));
        document.getElementById("bulk-text").value = "";
        alert(`Додано слів: ${addedCount}`);
        filterWords();
        updateCard();
    }
}

// 6. ДОПОМІЖНІ ФУНКЦІЇ НАВІГАЦІЇ
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
        opt.value = cat.id; opt.textContent = cat.name;
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
    if (currentMode === 'cards') updateCard();
    else if (currentMode === 'test') startTest();
    else if (currentMode === 'game') startMatchingGame();
}

function filterWords() {
    if (currentCategory === 'all') activeWords = [...allWords];
    else activeWords = allWords.filter(w => w.category === currentCategory);
}

function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${viewName}`).classList.add('active');
}

function renderAlphabet() {
    const grid = document.getElementById("alphabet-grid");
    if (!grid) return;
    grid.innerHTML = "";
    alphabetData.forEach(item => {
        const card = document.createElement("div");
        card.className = "alphabet-card";
        card.onclick = () => speakWord(item.word, item.ua, item.letter);
        card.innerHTML = `<div class="letter">${item.letter}</div><div class="icon">${item.icon}</div><div>${item.word}</div>`;
        grid.appendChild(card);
    });
}

function speakWord(en, ua, letter) {
    const box = document.getElementById("kid-display-box");
    box.style.display = "block";
    box.innerHTML = `<b>Буква ${letter}: ${en}</b> — ${ua}`;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(en);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

function updateCard() {
    if (activeWords.length === 0) {
        document.getElementById("card-text").textContent = "Немає слів у цій категорії";
        document.getElementById("card-counter").textContent = "0 з 0";
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

function initCanvasBg() {
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    function animate() {
        ctx.clearRect(0, 0, width, height);
        requestAnimationFrame(animate);
    }
    animate();
}
