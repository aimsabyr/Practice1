# Менеджер задач

## Описание проекта

**Менеджер задач** — это одностраничное веб-приложение (SPA), разработанное с использованием **Angular Standalone Components** и **Firebase**.

Приложение позволяет пользователям регистрироваться, входить в систему, создавать задачи, редактировать их, удалять, выполнять поиск, фильтровать задачи по статусу, а также просматривать статистику и аналитику.

---

# Используемые технологии

* Angular 21
* TypeScript
* Angular Material
* Firebase Authentication
* Cloud Firestore
* Angular Router
* Reactive Forms
* RxJS
* Standalone Components

---

# Основные возможности

* Регистрация пользователя
* Авторизация пользователя
* Выход из системы
* Создание задач
* Редактирование задач
* Удаление задач
* Просмотр списка личных задач
* Поиск задач по названию
* Фильтрация задач по статусу
* Панель управления (Dashboard)
* Страница аналитики
* Защита маршрутов (Route Guards)
* Централизованное управление задачами с помощью RxJS Store

---

# Структура проекта

```text
task-manager/
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   └── services/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── analytics/
│   │   │   └── tasks/
│   │   │
│   │   ├── models/
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   │
│   ├── environments/
│   ├── styles.css
│   └── main.ts
│
├── angular.json
├── package.json
└── README.md
```

---

# Установка проекта

Клонируйте репозиторий:

```bash
git clone <repository-url>
```

Установите зависимости:

```bash
npm install
```

---

# Настройка Firebase

1. Создайте проект в Firebase.
2. Включите Authentication (Email/Password).
3. Создайте базу данных Cloud Firestore.
4. Получите конфигурацию Firebase.
5. Добавьте её в файл:

```text
src/environments/environment.ts
```

Пример:

```ts
export const environment = {
  firebase: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  }
};
```

---

# Запуск проекта

Запустите приложение командой:

```bash
ng serve
```

После запуска откройте браузер и перейдите по адресу:

```text
http://localhost:4200
```

---

# Используемое хранилище данных

Отдельный сервер (Backend) в проекте не используется.

В качестве сервиса аутентификации используется **Firebase Authentication**, а для хранения данных — **Cloud Firestore**.

---

# Модель задачи

```ts
export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  createdAt: Date;
  userId: string;
}
```

---

# Авторизация

Пользователь может:

* зарегистрироваться;
* войти в систему;
* выйти из системы.

Неавторизованные пользователи не имеют доступа к следующим разделам:

* Панель управления;
* Список задач;
* Аналитика.

---

# Аналитика

На странице аналитики отображаются:

* Общее количество задач;
* Количество новых задач;
* Количество задач в процессе выполнения;
* Количество выполненных задач;
* Процент выполненных задач.

---

