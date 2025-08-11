# Clothes Shop - Архитектура проекта

## Структура директорий

Проект использует архитектуру **Vertical Slice / Feature Modules** для лучшей организации кода.

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Корневой layout с Header и Footer
│   ├── page.tsx           # Главная страница
│   └── globals.css        # Глобальные стили
├── components/            # Переиспользуемые UI компоненты
│   └── layout/           # Компоненты макета
│       ├── Header.tsx    # Компонент хедера
│       ├── Footer.tsx    # Компонент футера
│       └── index.ts      # Экспорты модуля
└── features/             # Функциональные модули
    └── products/         # Модуль товаров
        ├── components/   # Компоненты товаров
        │   └── ProductCard.tsx
        └── index.ts      # Экспорты модуля
```

## Принципы архитектуры

### Vertical Slice Architecture

- Каждая feature содержит все необходимые файлы (компоненты, хуки, типы, утилиты)
- Минимальные зависимости между features
- Легкое масштабирование и поддержка

### Feature Modules

- `src/features/` - бизнес-логика, разделенная по доменам
- `src/components/` - переиспользуемые UI компоненты
- Каждый модуль имеет свой `index.ts` для чистых импортов

## Компоненты

### Layout Components (`src/components/layout/`)

- **Header** - Логотип и корзина
- **Footer** - Навигационные ссылки и контакты

### Product Components (`src/features/products/`)

- **ProductCard** - Карточка товара с изображением, названием, ценой и кнопкой покупки

## Стилизация

- **Tailwind CSS 4** для всех стилей
- Адаптивный дизайн (mobile-first)
- Современная типографика с системными шрифтами
- Accessibility-friendly (focus states, semantic HTML)

## Импорты

Используются алиасы для чистых импортов:

```typescript
// Layout components
import { Header, Footer } from '@/components/layout'

// Feature components
import { ProductCard } from '@/features/products'
```

## Технологии

- **Next.js 15.3.4** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS 4** - Стилизация
- **React 19** - UI библиотека
