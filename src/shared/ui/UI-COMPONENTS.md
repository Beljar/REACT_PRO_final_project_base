# Централизованные UI-компоненты

В проекте выделены три основных переиспользуемых компонента, которые вынесены в `src/shared/ui`:

## 1. Button - Компонент кнопки

Универсальный компонент кнопки со встроенной поддержкой различных вариантов стилизации.

### Использование

```tsx
import { Button } from '@/shared/ui';

// Базовое использование
<Button onClick={handleClick}>Нажми меня</Button>

// С вариантами
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Ghost</Button>

// С размерами
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// С состояниями
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button>
<Button fullWidth>Full Width</Button>
```

### Props

- `variant?: 'primary' | 'secondary' | 'danger' | 'ghost'` - Стиль кнопки
- `size?: 'small' | 'medium' | 'large'` - Размер кнопки
- `fullWidth?: boolean` - Растянуть на всю ширину
- `isLoading?: boolean` - Показать состояние загрузки
- `disabled?: boolean` - Отключить кнопку
- `children: React.ReactNode` - Содержимое кнопки
- Все стандартные HTML атрибуты `<button>`

---

## 2. Input - Компонент поля ввода

Универсальный компонент для ввода текста с поддержкой ошибок, иконок и разных размеров.

### Использование

```tsx
import { Input } from '@/shared/ui';

// Базовое использование
<Input 
  type="text" 
  placeholder="Введите текст"
  onChange={(e) => setValue(e.target.value)}
/>

// С лейблом и ошибкой
<Input 
  label="Email" 
  type="email"
  placeholder="your@email.com"
  error="Неверный формат email"
/>

// С иконкой
<Input 
  type="search" 
  placeholder="Поиск"
  icon={<SearchIcon />}
  iconPosition="left"
/>

// С разными размерами
<Input size="small" placeholder="Small" />
<Input size="medium" placeholder="Medium" />
<Input size="large" placeholder="Large" />

// На всю ширину
<Input fullWidth placeholder="Full width" />
```

### Props

- `label?: string` - Лейбл для поля
- `error?: string` - Текст ошибки (если есть)
- `type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'` - Тип поля
- `size?: 'small' | 'medium' | 'large'` - Размер
- `fullWidth?: boolean` - На всю ширину
- `icon?: React.ReactNode` - Иконка в поле
- `iconPosition?: 'left' | 'right'` - Позиция иконки
- Все стандартные HTML атрибуты `<input>`

---

## 3. Loader - Компонент загрузки

Компонент для отображения индикатора загрузки.

### Использование

```tsx
import { Loader } from '@/shared/ui';

// Базовое использование
<Loader />

// С разными размерами
<Loader size="small" />
<Loader size="medium" />
<Loader size="large" />

// С разными вариантами
<Loader variant="default" />   // Точечный загрузчик
<Loader variant="circle" />    // Круговой загрузчик

// С дополнительным классом
<Loader className="my-custom-class" />
```

### Props

- `size?: 'small' | 'medium' | 'large'` - Размер загрузчика
- `variant?: 'default' | 'circle'` - Вид загрузчика
- `className?: string` - Дополнительный CSS класс

---

## Миграция существующего кода

При замене старых компонентов на новые, учитывайте:

1. **Стилизация**: Новые компоненты имеют встроенные стили. Если нужна дополнительная настройка, используйте `className` prop.

2. **Типизация**: Все компоненты полностью типизированы на TypeScript.

3. **Доступность**: Компоненты поддерживают стандартные HTML атрибуты доступности.

### Примеры замены

#### Старый код (Button)
```tsx
<button 
  onClick={handleClick}
  className={classNames(s['button'], s['button--primary'])}>
  Click me
</button>
```

#### Новый код
```tsx
import { Button } from '@/shared/ui';

<Button onClick={handleClick} variant="primary">
  Click me
</Button>
```

---

#### Старый код (Input)
```tsx
<input
  type="text"
  className={s['input']}
  placeholder="Enter name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

#### Новый код
```tsx
import { Input } from '@/shared/ui';

<Input
  type="text"
  placeholder="Enter name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

## Импорты

Импортируйте компоненты прямо из `src/shared/ui`:

```tsx
// Одновременно несколько компонентов
import { Button, Input, Loader } from '@/shared/ui';

// Или отдельно с типами
import { Button, type ButtonVariant } from '@/shared/ui';
import { Input, type InputSize } from '@/shared/ui';
import { Loader, type LoaderVariant } from '@/shared/ui';
```

---

## Кастомизация

Компоненты используют CSS Modules, поэтому для кастомизации:

1. Используйте `className` prop для добавления дополнительных стилей
2. Переопределяйте CSS переменные, если нужна глобальная кастомизация
3. Используйте inline styles для быстрых изменений

```tsx
<Button 
  className={s['custom-button']}
  style={{ backgroundColor: 'red' }}>
  Custom Button
</Button>
```
