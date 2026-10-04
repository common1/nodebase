# Project nodebase

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=365s&pp=0gcJCWMAwfN6Pr3D]
```

## 1 - Setup

```
https://www.youtube.com/watch?v=ED2H_y6dmC8&t=365s
```

### 1.1 Create project

```
npx create-next-app@15.5.4 nodebase
√ Would you like to use TypeScript? ... Yes
√ Which linter would you like to use? » Biome
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack? (recommended) ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No
```

```
cd nodebase
npm approve-scripts sharp
```

### 1.2 Setup Shadcn/UI

```
npx shadcn@3.3.1 init
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS config. Found v4.
✔ Validating import alias.
√ Which color would you like to use as the base color? » Neutral
✔ Writing components.json.
✔ Checking registry.
✔ Updating CSS variables in src\app\globals.css
✔ Updating src\app\globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.ts

Success! Project initialization completed.
You may now add components.
```

### 1.3 Add components

```
npx shadcn@3.3.1 add
....
✔ Checking registry.
✔ Updating CSS variables in src\app\globals.css
✔ Installing dependencies.
✔ Created 62 files:
  - src\components\ui\accordion.tsx
  - src\components\ui\alert.tsx
  - src\components\ui\aspect-ratio.tsx
  - src\components\ui\avatar.tsx
  - src\components\ui\badge.tsx
  - src\components\ui\breadcrumb.tsx
  - src\components\ui\bubble.tsx
  - src\components\ui\button.tsx
  - src\components\ui\card.tsx
  - src\components\ui\checkbox.tsx
  - src\components\ui\collapsible.tsx
  - src\components\ui\context-menu.tsx
  - src\components\ui\dialog.tsx
  - src\components\ui\direction.tsx
  - src\components\ui\drawer.tsx
  - src\components\ui\dropdown-menu.tsx
  - src\components\ui\empty.tsx
  - src\components\ui\hover-card.tsx
  - src\components\ui\input.tsx
  - src\components\ui\input-otp.tsx
  - src\components\ui\kbd.tsx
  - src\components\ui\label.tsx
  - src\components\ui\marker.tsx
  - src\components\ui\menubar.tsx
  - src\components\ui\message.tsx
  - src\components\ui\native-select.tsx
  - src\components\ui\navigation-menu.tsx
  - src\components\ui\popover.tsx
  - src\components\ui\progress.tsx
  - src\components\ui\radio-group.tsx
  - src\components\ui\resizable.tsx
  - src\components\ui\scroll-area.tsx
  - src\components\ui\select.tsx
  - src\components\ui\separator.tsx
  - src\components\ui\sheet.tsx
  - src\components\ui\skeleton.tsx
  - src\components\ui\slider.tsx
  - src\components\ui\sonner.tsx
  - src\components\ui\spinner.tsx
  - src\components\ui\switch.tsx
  - src\components\ui\table.tsx
  - src\components\ui\tabs.tsx
  - src\components\ui\textarea.tsx
  - src\components\ui\toggle.tsx
  - src\components\ui\tooltip.tsx
  - src\hooks\use-mobile.ts
  - src\components\ui\alert-dialog.tsx
  - src\components\ui\attachment.tsx
  - src\components\ui\calendar.tsx
  - src\components\ui\carousel.tsx
  - src\components\ui\message-scroller.tsx
  - src\components\ui\pagination.tsx
  - src\components\ui\chart.tsx
  - src\components\ui\command.tsx
  - src\components\ui\form.tsx
  - src\components\ui\button-group.tsx
  - src\components\ui\field.tsx
  - src\components\ui\item.tsx
  - src\components\ui\input-group.tsx
  - src\components\ui\toggle-group.tsx
  - src\components\ui\sidebar.tsx
  - src\components\ui\combobox.tsx
```

## 2 - Database

```
[https://www.prisma.io/docs/guides/v7/frameworks/nextjs]
```

### 2.1 - Install and Configure Prisma

```
[https://www.prisma.io/docs/guides/v7/frameworks/nextjs#2-install-and-configure-prisma]
```

```
Install dependencies
npm install prisma@prev tsx @types/pg --save-dev
npm install @prisma/client@7 @prisma/adapter-pg dotenv pg
npm approve-scripts @prisma/engines esbuild prisma

Initialize prisma
npx prisma init
```

```
Drop database and user

psql -U postgres
postgres=# DROP DATABASE nodebase_db; 
postgres=# DROP USER nodebase_user; 

```

```
Create database and user

psql -U postgres
postgres=# CREATE DATABASE nodebase_db; 
postgres=# CREATE USER nodebase_user WITH ENCRYPTED PASSWORD 'WXYZ&6789'; 
postgres=# GRANT ALL PRIVILEGES ON DATABASE nodebase_db TO nodebase_user; 
postgres=# \c nodebase_db postgres;
You are now connected to database "nodebase_db" as user "postgres"
nodebase_db=# GRANT ALL ON SCHEMA public TO nodebase_user; 
nodebase_db=# ALTER USER nodebase_user CREATEDB;
```

```
Create DATABASE_URL in .env
DATABASE_URL="postgres://nodebase_user:WXYZ&6789@localhost:5432/nodebase_db"
```

### 2.2 Define your prisma schema

```
[https://www.prisma.io/docs/guides/v7/frameworks/nextjs#22-define-your-prisma-schema]
```

```
In prisma/schema.prisma add the following models

model User { 
  id    Int     @id @default(autoincrement()) 
  email String  @unique
  name  String?
  posts Post[]
} 
model Post { 
  id        Int     @id @default(autoincrement()) 
  title     String
  content   String?
  published Boolean @default(false) 
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id]) 
} 
```

### 2.3 - Add dotenv to prisma7.config.ts

```
import "dotenv/config";
```

### 2.4 Run migrations and generate Prisma Client

```
npx prisma migrate dev --name init
```

```
Generate prisma client
npx prisma generate
```

```
Start prisma studio

npx prisma studio
```

```
Remove all items from the database

npx prisma migrate reset
```