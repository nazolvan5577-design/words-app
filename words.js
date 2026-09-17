// Повний алфавіт для Першого класу (A-Z)
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

// Правила граматики
const grammarTopics = [
    { id: 'to_be', title: 'Дієслово To Be (Am / Is / Are)', desc: 'Основне дієслово «бути». Вживається для опису стану, імені чи професії.', rule: 'I am / He, She, It is / We, You, They are' },
    { id: 'present_simple', title: 'Present Simple (Теперішній простий)', desc: 'Використовується для щоденних дій, звичок та загальних фактів.', rule: 'V1 (для He/She/It додаємо -s/-es). Допоміжні: Do / Does' },
    { id: 'past_simple', title: 'Past Simple (Минулий простий)', desc: 'Використовується для дій, які завершилися в минулому.', rule: 'V2 (правильні +ed, неправильні — 2 форма). Допоміжне: Did' },
    { id: 'future_simple', title: 'Future Simple (Майбутній простий)', desc: 'Обіцянки, спонтанні рішення або прогнози.', rule: 'Will + V1' }
];

// Базовий список категорій
const defaultCategories = [
    { id: 'all', name: '🌟 Усі теми та слова', desc: 'Виберіть будь-яку тему з бази для тренування.' },
    { id: 'verbs', name: '⚡ Неправильні дієслова', desc: 'Основні неправильні дієслова у трьох формах.' },
    { id: 'kitchen', name: '🍳 Кухня', desc: 'Слова та фрази, пов\'язані з кухонним побутом.' },
    { id: 'bedroom', name: '🛏️ Спальня', desc: 'Предмети інтер\'єру спальної кімнати та сон.' },
    { id: 'hallway', name: '🚪 Прихожа', desc: 'Передпокій, вхідні двері, взуття та вішалки.' },
    { id: 'home', name: '🏠 Дім', desc: 'Загальні поняття про будинок та кімнати.' },
    { id: 'office', name: '💻 Офіс', desc: 'Робоче місце, технічне приладдя та документи.' },
    { id: 'games', name: '🎮 Ігри', desc: 'Геймплей, персонажі та ігрова термінологія.' },
    { id: 'household', name: '🧹 Побут', desc: 'Домашні справи, прибирання та побутова техніка.' },
    { id: 'electronics', name: '⚡ Електроніка', desc: 'Гаджети, розетки, кабелі та деталі ПК.' },
    { id: 'toys', name: '🧸 Іграшки', desc: 'Дитячі іграшки, конструктори та розваги.' },
    { id: 'cars', name: '🚗 Машини', desc: 'Автомобільні деталі, рух та транспорт.' },
    { id: 'building', name: '🧱 Будова', desc: 'Будівельні матеріали та інструменти.' },
    { id: 'university', name: '🎓 Університет', desc: 'Навчання, лекції, студенти та сесії.' },
    { id: 'interview', name: '💼 Інтерв\'ю', desc: 'Співбесіда, резюме та професійні навички.' },
    { id: 'tv_films', name: '🎬 ТБ і фільми', desc: 'Кіно, серіали, жанри та акторський склад.' },
    { id: 'quotes', name: '💬 Цитати з фільмів', desc: 'Популярні фрази та висловлювання з кінематографа.' }
];

// Повний словник (усі слова відновлено)
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

    // Спальня
    { en: "Bed", ua: "Ліжко", category: "bedroom" },
    { en: "Pillow", ua: "Подушка", category: "bedroom" },
    { en: "Blanket", ua: "Ковдра", category: "bedroom" },
    { en: "Wardrobe", ua: "Шафа", category: "bedroom" },

    // Прихожа
    { en: "Hallway", ua: "Прихожа", category: "hallway" },
    { en: "Front door", ua: "Вхідні двері", category: "hallway" },
    { en: "Shoe rack", ua: "Полиця для взуття", category: "hallway" },

    // Дім
    { en: "House", ua: "Будинок", category: "home" },
    { en: "Roof", ua: "Дах", category: "home" },
    { en: "Window", ua: "Вікно", category: "home" },

    // Офіс
    { en: "Desk", ua: "Письмовий стіл", category: "office" },
    { en: "Laptop", ua: "Ноутбук", category: "office" },
    { en: "Printer", ua: "Принтер", category: "office" },

    // Ігри
    { en: "Video game", ua: "Відеогра", category: "games" },
    { en: "Controller", ua: "Геймпад", category: "games" },
    { en: "Quest", ua: "Квест", category: "games" },

    // Побут
    { en: "Vacuum cleaner", ua: "Пилосос", category: "household" },
    { en: "Washing machine", ua: "Пральна машина", category: "household" },
    { en: "Iron", ua: "Праска", category: "household" },

    // Електроніка
    { en: "Smartphone", ua: "Смартфон", category: "electronics" },
    { en: "Router", ua: "Роутер", category: "electronics" },
    { en: "Graphics card", ua: "Відеокарта", category: "electronics" },

    // Іграшки
    { en: "Doll", ua: "Лялька", category: "toys" },
    { en: "Teddy bear", ua: "Ведмедик", category: "toys" },
    { en: "Puzzle", ua: "Пазл", category: "toys" },

    // Машини
    { en: "Engine", ua: "Двигун", category: "cars" },
    { en: "Steering wheel", ua: "Кермо", category: "cars" },
    { en: "Tire", ua: "Шина", category: "cars" },

    // Будова
    { en: "Brick", ua: "Цегла", category: "building" },
    { en: "Concrete", ua: "Бетон", category: "building" },
    { en: "Hammer", ua: "Молоток", category: "building" },

    // Університет
    { en: "Lecture", ua: "Лекція", category: "university" },
    { en: "Professor", ua: "Професор", category: "university" },
    { en: "Exam", ua: "Іспит", category: "university" },

    // Інтерв'ю
    { en: "Resume", ua: "Резюме", category: "interview" },
    { en: "Candidate", ua: "Кандидат", category: "interview" },
    { en: "Skill", ua: "Навичка", category: "interview" },

    // ТБ і фільми
    { en: "Series", ua: "Серіал", category: "tv_films" },
    { en: "Episode", ua: "Епізод", category: "tv_films" },
    { en: "Soundtrack", ua: "Саундтрек", category: "tv_films" },

    // Цитати
    { en: "You're a wizard, Harry.", ua: "Ти чарівник, Гаррі.", category: "quotes" },
    { en: "May the Force be with you.", ua: "Хай прибуде з тобою Сила!", category: "quotes" },
    { en: "I'll be back.", ua: "Я повернусь.", category: "quotes" }
];
