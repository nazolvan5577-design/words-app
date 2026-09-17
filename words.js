// 1. ПОВНИЙ АЛФАВІТ ДЛЯ ДІТЕЙ (A-Z)
const alphabetData = [
    { letter: 'A', word: 'Apple', ua: 'Яблуко 🍏', icon: '🍎' },
    { letter: 'B', word: 'Ball', ua: 'М\'яч ⚽', icon: '⚽' },
    { letter: 'C', word: 'Cat', ua: 'Кіт 🐱', icon: '🐱' },
    { letter: 'D', word: 'Dog', ua: 'Собака 🐶', icon: '🐶' },
    { letter: 'E', word: 'Elephant', ua: 'Слон 🐘', icon: '🐘' },
    { letter: 'F', word: 'Fish', ua: 'Риба 🐟', icon: '🐟' },
    { letter: 'G', word: 'Giraffe', ua: 'Жираф 🦒', icon: '🦒' },
    { letter: 'H', word: 'House', ua: 'Будинок 🏠', icon: '🏠' },
    { letter: 'I', word: 'Ice Cream', ua: 'Морозиво 🍦', icon: '🍦' },
    { letter: 'J', word: 'Juice', ua: 'Сік 🧃', icon: '🧃' },
    { letter: 'K', word: 'Kite', ua: 'Повітряний змій 🪁', icon: '🪁' },
    { letter: 'L', word: 'Lion', ua: 'Лев 🦁', icon: '🦁' },
    { letter: 'M', word: 'Monkey', ua: 'Мавпа 🐒', icon: '🐒' },
    { letter: 'N', word: 'Nest', ua: 'Гніздо 🪹', icon: '🪹' },
    { letter: 'O', word: 'Orange', ua: 'Апельсин 🍊', icon: '🍊' },
    { letter: 'P', word: 'Pencil', ua: 'Олівець ✏️', icon: '✏️' },
    { letter: 'Q', word: 'Queen', ua: 'Королева 👑', icon: '👑' },
    { letter: 'R', word: 'Rabbit', ua: 'Кролик 🐇', icon: '🐇' },
    { letter: 'S', word: 'Sun', ua: 'Сонце ☀️', icon: '☀️' },
    { letter: 'T', word: 'Tree', ua: 'Дерево 🌳', icon: '🌳' },
    { letter: 'U', word: 'Umbrella', ua: 'Парасоля ☂️', icon: '☂️' },
    { letter: 'V', word: 'Violin', ua: 'Скрипка 🎻', icon: '🎻' },
    { letter: 'W', word: 'Water', ua: 'Вода 💧', icon: '💧' },
    { letter: 'X', word: 'Xylophone', ua: 'Ксилофон 🎼', icon: '🎼' },
    { letter: 'Y', word: 'Yacht', ua: 'Яхта 🛥️', icon: '🛥️' },
    { letter: 'Z', word: 'Zebra', ua: 'Зебра 🦓', icon: '🦓' }
];

// 2. ГРАМАТИЧНІ ТЕМИ
const grammarTopics = [
    { id: 'to_be', title: 'Дієслово To Be (Am / Is / Are)', desc: 'Основне дієслово «бути». Опис стану, імені чи професії.', rule: 'I am / He, She, It is / We, You, They are' },
    { id: 'present_simple', title: 'Present Simple (Теперішній простий)', desc: 'Щоденні дії, звички та загальні факти.', rule: 'V1 (для He/She/It додаємо -s/-es). Допоміжні: Do / Does' },
    { id: 'past_simple', title: 'Past Simple (Минулий простий)', desc: 'Дії, які повністю завершилися в минулому.', rule: 'V2 (правильні +ed, неправильні — 2 форма). Допоміжне: Did' },
    { id: 'future_simple', title: 'Future Simple (Майбутній простий)', desc: 'Обіцянки, спонтанні рішення та прогнози.', rule: 'Will + V1' }
];

// 3. ПОВНИЙ КАТАЛОГ ТЕМ (20 СТАБІЛЬНИХ КАТЕГОРІЙ)
const defaultCategories = [
    { id: 'all', name: '🌟 Усі теми та слова', desc: 'Загальна база всіх слів для комплексного тестування.' },
    { id: 'verbs', name: '⚡ Неправильні дієслова', desc: 'Три форми основних неправильних дієслів.' },
    { id: 'kitchen', name: '🍳 Кухня та Готування', desc: 'Посуд, кухонна техніка, спеції та кулінарія.' },
    { id: 'bedroom', name: '🛏️ Спальня та Сон', desc: 'Меблі, білизна та предмети відпочинку.' },
    { id: 'hallway', name: '🚪 Прихожа та Вхід', desc: 'Передпокій, взуття, шафи та вішалки.' },
    { id: 'home', name: '🏠 Дім та Архітектура', desc: 'Кімнати, конструкція будинку, матеріал стін.' },
    { id: 'office', name: '💻 Офіс та Робота', desc: 'Робоче місце, технічні засоби, канцелярія.' },
    { id: 'games', name: '🎮 Ігри та Геймінг', desc: 'Термінологія відеоігор, механіки та залізо.' },
    { id: 'household', name: '🧹 Побут та Прибирання', desc: 'Чистота, домашні справи, побутова хімія.' },
    { id: 'electronics', name: '⚡ Електроніка та Гаджети', desc: 'Комп\'ютерні комплектуючі, девайси, мережа.' },
    { id: 'toys', name: '🧸 Дитячі Іграшки', desc: 'Конструктори, ляльки, розваги для дітей.' },
    { id: 'cars', name: '🚗 Машини та Транспорт', desc: 'Деталі авто, механіка, автодорожній рух.' },
    { id: 'building', name: '🧱 Будівництво та Ремонт', desc: 'Інструменти, матеріали, монтажні роботи.' },
    { id: 'university', name: '🎓 Університет та Наука', desc: 'Лекції, іспити, академічна термінологія.' },
    { id: 'interview', name: '💼 Співбесіда та Кар\'єра', desc: 'Резюме, навички, ділові переговори.' },
    { id: 'tv_films', name: '🎬 Кіно та Серіали', desc: 'Жанри, саундтреки, акторський склад.' },
    { id: 'food', name: '🍎 Їжа та Продукти', desc: 'Фрукти, овочі, м\'ясо, напої та страви.' },
    { id: 'travel', name: '✈️ Подорожі та Готелі', desc: 'Аеропорт, вокзал, туризм, бронювання.' },
    { id: 'health', name: '🏥 Здоров\'я та Медицина', desc: 'Тіло людини, симптоми, аптека, лікарі.' },
    { id: 'emotions', name: '🎭 Емоції та Характер', desc: 'Почуття, риси характеру, настрої.' }
];

// 4. СЛОВНИКОВА БАЗА СЛІВ (ОСНОВА + АВТОНАПОВНЕННЯ)
const baseWords = [
    // Неправильні дієслова
    { en: "Be (was/were, been)", ua: "Бути", category: "verbs" },
    { en: "Begin (began, begun)", ua: "Починати", category: "verbs" },
    { en: "Break (broke, broken)", ua: "Ламати", category: "verbs" },
    { en: "Bring (brought, brought)", ua: "Приносити", category: "verbs" },
    { en: "Buy (bought, bought)", ua: "Купувати", category: "verbs" },
    { en: "Choose (chose, chosen)", ua: "Вибирати", category: "verbs" },
    { en: "Do (did, done)", ua: "Робити", category: "verbs" },
    { en: "Eat (ate, eaten)", ua: "Їсти", category: "verbs" },
    { en: "Find (found, found)", ua: "Знаходити", category: "verbs" },
    { en: "Go (went, gone)", ua: "Йти, їхати", category: "verbs" },
    { en: "Have (had, had)", ua: "Мати", category: "verbs" },
    { en: "Make (made, made)", ua: "Створювати", category: "verbs" },

    // Кухня
    { en: "Refrigerator", ua: "Холодильник", category: "kitchen" },
    { en: "Microwave", ua: "Мікрохвильова піч", category: "kitchen" },
    { en: "Stove", ua: "Плита", category: "kitchen" },
    { en: "Frying pan", ua: "Сковорідка", category: "kitchen" },
    { en: "Kettle", ua: "Чайник", category: "kitchen" },
    { en: "Cutting board", ua: "Обробна дошка", category: "kitchen" },
    { en: "Spoon", ua: "Ложка", category: "kitchen" },
    { en: "Fork", ua: "Виделка", category: "kitchen" },

    // Електроніка та Гаджети
    { en: "Smartphone", ua: "Смартфон", category: "electronics" },
    { en: "Router", ua: "Роутер", category: "electronics" },
    { en: "Graphics card", ua: "Відеокарта", category: "electronics" },
    { en: "Motherboard", ua: "Материнська плата", category: "electronics" },
    { en: "Power supply", ua: "Блок живлення", category: "electronics" },
    { en: "Processor", ua: "Процесор", category: "electronics" },

    // Подорожі
    { en: "Passport control", ua: "Паспортний контроль", category: "travel" },
    { en: "Luggage", ua: "Багаж", category: "travel" },
    { en: "Boarding pass", ua: "Посадковий талон", category: "travel" },
    { en: "Flight attendant", ua: "Бортпровідник", category: "travel" },

    // Здоров'я
    { en: "Headache", ua: "Головний біль", category: "health" },
    { en: "Prescription", ua: "Рецепт на ліки", category: "health" },
    { en: "Appointment", ua: "Запис до лікаря", category: "health" }
];
