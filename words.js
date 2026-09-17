// 1. АБЕТКА ДЛЯ ДІТЕЙ (A-Z)
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

// 2. ГРАМАТИЧНІ ТЕМИ (ДЛЯ МОДАЛЬНОГО ВІКНА)
const grammarTopics = [
    {
        id: 'to_be',
        title: 'Дієслово To Be (Am / Is / Are)',
        shortDesc: 'Основне дієслово «бути, знаходитися, бути кимось».',
        formula: 'I am | He/She/It is | We/You/They are',
        explanation: 'Дієслово To Be використовується, коли в реченні немає динамічної дії (що робити?), а є опис стану, віку, професії чи місцезнаходження.',
        examples: ['I am a student. (Я студент)', 'She is at home. (Вона вдома)', 'They are happy. (Вони щасливі)'],
        signalWords: 'now, today, currently'
    },
    {
        id: 'present_simple',
        title: 'Present Simple (Теперішній простий)',
        shortDesc: 'Регулярні дії, звички, розклад та загальні факти.',
        formula: '[Хто] + V1 (s/es для He/She/It) | Do/Does + [Хто] + V1?',
        explanation: 'Вживається для дій, які відбуваються постійно, періодично або взагалі завжди.',
        examples: ['I drink coffee every morning. (Я п\'ю каву щоранку)', 'He works in an office. (Він працює в офісі)'],
        signalWords: 'always, usually, often, sometimes, never, every day'
    },
    {
        id: 'past_simple',
        title: 'Past Simple (Минулий простий)',
        shortDesc: 'Завершені дії в минулому із чітким вказівником часу.',
        formula: '[Хто] + V2 (або Ved) | Did + [Хто] + V1?',
        explanation: 'Використовується для подій, які відбулися у визначений момент у минулому.',
        examples: ['I watched a movie yesterday. (Я подивився фільм вчора)', 'She bought a car last week. (Вона купила авто минулого тижня)'],
        signalWords: 'yesterday, ago, last week/month/year, in 2020'
    },
    {
        id: 'future_simple',
        title: 'Future Simple (Майбутній простий)',
        shortDesc: 'Спонтанні рішення, обіцянки, передбачення на майбутнє.',
        formula: '[Хто] + Will + V1 | Will + [Хто] + V1?',
        explanation: 'Вживається, коли ми приймаємо рішення в момент мовлення або обіцяємо щось зробити.',
        examples: ['I will help you. (Я допоможу тобі)', 'It will rain tomorrow. (Завтра піде дощ)'],
        signalWords: 'tomorrow, next week/year, soon'
    }
];

// 3. БАЗОВІ КАТЕГОРІЇ
const defaultCategories = [
    { id: 'all', name: '🌟 Усі теми та слова', desc: 'Загальна база всіх слів для комплексного тренування.' },
    { id: 'verbs', name: '⚡ Неправильні дієслова', desc: 'Основні неправильні дієслова у трьох формах.' },
    { id: 'kitchen', name: '🍳 Кухня', desc: 'Слова та фрази, пов\'язані з кухнею.' },
    { id: 'bedroom', name: '🛏️ Спальня', desc: 'Предмети інтер\'єру спальної кімнати.' },
    { id: 'hallway', name: '🚪 Прихожа', desc: 'Передпокій, вхідні двері, взуття.' },
    { id: 'home', name: '🏠 Дім', desc: 'Загальні поняття про будинок.' },
    { id: 'office', name: '💻 Офіс', desc: 'Робоче місце та комп\'ютер.' },
    { id: 'games', name: '🎮 Ігри', desc: 'Геймплей та ігрова термінологія.' },
    { id: 'household', name: '🧹 Побут', desc: 'Домашні справи та побутова техніка.' },
    { id: 'electronics', name: '⚡ Електроніка', desc: 'Гаджети та деталі ПК.' }
];

// 4. ПОВНА БАЗА СЛІВ (НЕ СКОРОЧЕНА)
const baseWords = [
    // Неправильні дієслова
    { en: "Be (was/were, been)", ua: "Бути", category: "verbs" },
    { en: "Begin (began, begun)", ua: "Починати", category: "verbs" },
    { en: "Break (broke, broken)", ua: "Ламати", category: "verbs" },
    { en: "Bring (brought, brought)", ua: "Приносити", category: "verbs" },
    { en: "Buy (bought, bought)", ua: "Купувати", category: "verbs" },
    { en: "Come (came, come)", ua: "Приходити", category: "verbs" },
    { en: "Do (did, done)", ua: "Робити", category: "verbs" },
    { en: "Eat (ate, eaten)", ua: "Їсти", category: "verbs" },
    { en: "Go (went, gone)", ua: "Йти, їхати", category: "verbs" },
    { en: "Have (had, had)", ua: "Мати", category: "verbs" },
    { en: "Make (made, made)", ua: "Створювати", category: "verbs" },
    { en: "Read (read, read)", ua: "Читати", category: "verbs" },

    // Кухня
    { en: "Refrigerator", ua: "Холодильник", category: "kitchen" },
    { en: "Microwave", ua: "Мікрохвильова піч", category: "kitchen" },
    { en: "Stove", ua: "Плита", category: "kitchen" },
    { en: "Frying pan", ua: "Сковорідка", category: "kitchen" },
    { en: "Kettle", ua: "Чайник", category: "kitchen" },
    { en: "Cutting board", ua: "Обробна дошка", category: "kitchen" },
    { en: "Spoon", ua: "Ложка", category: "kitchen" },
    { en: "Fork", ua: "Виделка", category: "kitchen" },

    // Спальня
    { en: "Bed", ua: "Ліжко", category: "bedroom" },
    { en: "Pillow", ua: "Подушка", category: "bedroom" },
    { en: "Blanket", ua: "Ковдра", category: "bedroom" },
    { en: "Wardrobe", ua: "Шафа", category: "bedroom" },
    { en: "Mattress", ua: "Матрац", category: "bedroom" },

    // Прихожа
    { en: "Hallway", ua: "Прихожа", category: "hallway" },
    { en: "Front door", ua: "Вхідні двері", category: "hallway" },
    { en: "Shoe rack", ua: "Полиця для взуття", category: "hallway" },
    { en: "Hanger", ua: "Вішалка", category: "hallway" },

    // Дім
    { en: "House", ua: "Будинок", category: "home" },
    { en: "Roof", ua: "Дах", category: "home" },
    { en: "Window", ua: "Вікно", category: "home" },
    { en: "Wall", ua: "Стіна", category: "home" },
    { en: "Floor", ua: "Підлога", category: "home" },

    // Офіс
    { en: "Desk", ua: "Письмовий стіл", category: "office" },
    { en: "Laptop", ua: "Ноутбук", category: "office" },
    { en: "Printer", ua: "Принтер", category: "office" },
    { en: "Keyboard", ua: "Клавіатура", category: "office" },

    // Ігри
    { en: "Video game", ua: "Відеогра", category: "games" },
    { en: "Controller", ua: "Геймпад", category: "games" },
    { en: "Quest", ua: "Квест", category: "games" },
    { en: "Inventory", ua: "Інвентар", category: "games" },

    // Побут
    { en: "Vacuum cleaner", ua: "Пилосос", category: "household" },
    { en: "Washing machine", ua: "Пральна машина", category: "household" },
    { en: "Iron", ua: "Праска", category: "household" },

    // Електроніка
    { en: "Smartphone", ua: "Смартфон", category: "electronics" },
    { en: "Router", ua: "Роутер", category: "electronics" },
    { en: "Graphics card", ua: "Відеокарта", category: "electronics" }
];
