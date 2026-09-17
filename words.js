// Повний алфавіт для розділу «Перший клас» (A-Z)
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

// База правил для розділу «Граматика»
const grammarTopics = [
    { id: 'to_be', title: 'Дієслово To Be (Am / Is / Are)', desc: 'Основне дієслово «бути». Вживається для опису стану, стану чи професії.', rule: 'I am / He, She, It is / We, You, They are' },
    { id: 'present_simple', title: 'Present Simple (Теперішній простий)', desc: 'Використовується для регулярних дій, звичок та загальних фактів.', rule: 'V1 (для He/She/It додаємо -s/-es). Допоміжні: Do / Does' },
    { id: 'past_simple', title: 'Past Simple (Минулий простий)', desc: 'Використовується для дій, які завершилися в минулому.', rule: 'V2 (правильні дієслова +ed, неправильні — 2 форма). Допоміжне: Did' },
    { id: 'future_simple', title: 'Future Simple (Майбутній простий)', desc: 'Обіцянки, спонтанні рішення або прогнози на майбутнє.', rule: 'Will + V1' }
];

// Загальна база слів
const allWords = [
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
    
    // Побут та інтер'єр
    { en: "Refrigerator", ua: "Холодильник", category: "kitchen" },
    { en: "Microwave", ua: "Мікрохвильова піч", category: "kitchen" },
    { en: "Stove", ua: "Плита", category: "kitchen" },
    { en: "Bed", ua: "Ліжко", category: "bedroom" },
    { en: "Pillow", ua: "Подушка", category: "bedroom" },
    { en: "Wardrobe", ua: "Шафа", category: "bedroom" },
    { en: "Vacuum cleaner", ua: "Пилосос", category: "household" },
    { en: "Washing machine", ua: "Пральна машина", category: "household" },
    { en: "Smartphone", ua: "Смартфон", category: "electronics" },
    { en: "Graphics card", ua: "Відеокарта", category: "electronics" },
    { en: "Series", ua: "Серіал", category: "tv_films" },
    { en: "Soundtrack", ua: "Саундтрек", category: "tv_films" }
];