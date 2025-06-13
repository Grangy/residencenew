# 🏋️ The Residence — Next.js Landing Page

**The Residence** — это адаптивный лендинг фитнес-клуба, созданный с помощью **Next.js 13+ (App Router)** и **Tailwind CSS**.

Проект реализован с упором на производительность, масштабируемость и чистую архитектуру, легко расширяется и подходит для интеграции с ИИ (например, для генерации новых секций, страниц, компонентов).

---

## 📌 Технологии

✅ **Next.js 13+ (App Router)** — серверный рендеринг, маршрутизация.\
✅ **React 18+** — компонентный подход.\
✅ **Tailwind CSS** — быстрая стилизация.\
✅ **Lucide React Icons** — иконки.\
✅ **Google Fonts (Geist, Geist Mono)** — кастомные шрифты.\
✅ **TypeScript** — строгая типизация.

---

## 📂 Структура проекта

```
.
├── app/
│   ├── layout.tsx         // Корневой макет (шрифты, meta, <html>)
│   ├── page.tsx           // Главная страница (подключение секций)
│
├── components/
│   ├── Header.tsx         // Верхняя навигация с меню и попапами
│   ├── Footer.tsx         // Низ страницы
│   ├── Popup.tsx          // Модальные окна (формы, сообщения)
│
├── sections/
│   ├── Hero.tsx           // Первая секция с изображением
│   ├── Hero2.tsx          // Вторая секция с описанием
│   ├── HeroVideo.tsx      // Секция с видеофоном и текстом
│
├── public/
│   ├── logo2.png          // Логотип
│   ├── hero.jpg           // Изображение для Hero
│   ├── hero2.jpg          // Изображение для Hero2
│   ├── video.webm         // Видео для HeroVideo
│
├── styles/
│   └── globals.css        // Tailwind + глобальные стили
```

---

## ⚙️ Установка и запуск

```bash
npm install        # Установка зависимостей
npm run dev        # Запуск локального сервера (http://localhost:3000)
npm run build      # Сборка production версии
npm run start      # Запуск production сборки
```

---

## 🚀 Туториал по расширению проекта

### 📌 Добавление новой страницы

1️⃣ Создайте файл в `app/`:

```tsx
// app/newpage.tsx
export default function NewPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Новая страница</h1>
    </main>
  )
}
```

2️⃣ Добавьте ссылку в навигацию (`components/Header.tsx`):

```tsx
{ label: 'НОВАЯ', href: '/newpage' }
```

---

### 📌 Добавление новой секции

1️⃣ Создайте файл в `sections/`, например `HeroNew.tsx`.\
2️⃣ Оформляйте по примеру других секций:

- Фон (image, video, gradient)
- Текст с Tailwind-стилями
- Кнопки с skew, градиентами
- Popup (если нужен)

3️⃣ Подключите в `app/page.tsx`:

```tsx
import HeroNew from '@/sections/HeroNew'
...
<HeroNew />
```

---

### 📌 Стандарты промтов для ИИ (для генерации новых секций/компонентов)

> 💡 **Промт для ChatGPT / ИИ**
>
> Напиши новый React-компонент для Next.js 13 App Router (TypeScript + Tailwind CSS).\
> Он должен:
>
> - быть размещён в `sections/`
> - быть адаптивным (mobile-first, min-h-screen или h-screen)
> - включать фон (image / video / gradient)
> - содержать текстовый блок с заголовком и подзаголовком
> - иметь call-to-action кнопку в стиле проекта (skew, border, hover)
> - при клике открывать Popup (форма с валидацией имени и телефона)
> - использовать только Tailwind классы (без внешних CSS)
> - анимации: плавные, с использованием transition / transform / opacity
>
> Пример вызова Popup:
>
> ```tsx
> const [popupOpen, setPopupOpen] = useState(false)
> <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
> ```

---

## 🛠 Рекомендации по технологиям

🔹 **React + TypeScript** — строго типизированные компоненты.\
🔹 **Tailwind CSS** — для стилизации всего интерфейса (без отдельного CSS).\
🔹 **Next.js App Router** — структура `app/`, без папки `pages/`.\
🔹 **Vercel** — для деплоя.\
🔹 **Lucide-react** — для иконок.\
🔹 **Google Fonts** — подключение шрифтов через `next/font/google`.

---

## 🌐 Деплой

```bash
npm run build
npm run start
```

Или воспользуйтесь **Vercel**, привязав репозиторий.

---

## 📝 Лицензия

MIT

---

## 👑 Автор

Проект разработан с целью демонстрации современных практик фронтенда.\
Контрибьютинг приветствуется!

