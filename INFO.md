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
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=3375s]
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

## 3 tRPC Setup

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=3375s]
[https://cwa.run/node-trpc]
```

### 3.1 Add tRPC to existing projects

```
[https://trpc.io/docs/client/tanstack-react-query/server-components#add-trpc-to-existing-projects]
```

```
1. Install deps

[https://trpc.io/docs/client/tanstack-react-query/server-components#1-install-deps]

npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query@latest zod client-only server-only
```

```
2. Create a tRPC router

[https://trpc.io/docs/client/tanstack-react-query/server-components#2-create-a-trpc-router]
```


```
3. Create a Query Client factory

[https://trpc.io/docs/client/tanstack-react-query/server-components#3-create-a-query-client-factory]
```

```
4. Create a tRPC client for Client Components

[https://trpc.io/docs/client/tanstack-react-query/server-components#4-create-a-trpc-client-for-client-components]
```

```
5. Create a tRPC caller for Server Components

[https://trpc.io/docs/client/tanstack-react-query/server-components#5-create-a-trpc-caller-for-server-components]
```

## 4 Authentication

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=5721s]
[https://cwa.run/node-auth]
[https://better-auth.com/docs/installation]
```

### 4.1 Install the Package

```
[https://better-auth.com/docs/installation#install-the-package]

npm install better-auth@1.7.12
```

### 4.2 Set Environment Variables

```
[https://better-auth.com/docs/installation#set-environment-variables]

1. Secret Key 
File: .env
BETTER_AUTH_SECRET="VnUjh1azLcyXDshzHo9aytVWGZayymSp"

2. Set Base URL
File: .env
BETTER_AUTH_URL="http://localhost:3000"
```

### 4.3 Create A Better Auth Instance

```
[https://better-auth.com/docs/installation#create-a-better-auth-instance]

File: src/lib/auth.ts
```

### 4.4 Configure Database

```
[https://better-auth.com/docs/installation#configure-database]

File: src/lib/auth.ts
```

### 4.5 Create Database Tables

```
[https://better-auth.com/docs/installation]

Generate
npx auth generate

Migrate
prisma migrate dev

Check
prisma studio
```

## 5 Theme & Styling

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=9444s]
[https://cwa.run/tweakcn]
[https://cwa.run/logoipsum]
[https://github.com/antonioerdeljac/nodebase-assets]

```

## 6 Background Jobs

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=10505s]
[https://cwa.run/mprocs]

File: schema.prisma
...
model WorkFlow {
  id   String @id @default(cuid())
  name String
}
...

npx prisma migrate dev
npx prisma generate

[https://www.inngest.com/docs/getting-started/nextjs-quick-start]

1. Install Inngest
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#1-install-inngest]

npm install inngest@3.44.1

2. Run the Inngest Dev Server
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#2-run-the-inngest-dev-server]

npx inngest-cli@1.12.1 dev

3. Create an Inngest client
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#3-create-an-inngest-client]

File: src/inngest/client.ts

File: src/app/api/inngest/route.ts

4. Write your first Inngest function
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#4-write-your-first-function]

File: src/inngest/functions.ts
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}` };
  },
);

File: src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld
  ],
});

5. Trigger your function
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#5-trigger-your-function]

From the dev server
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#from-the-dev-server]

From your app
[https://www.inngest.com/docs/getting-started/nextjs-quick-start#from-your-app]

File: src/trpc/routers/_app.ts

```

```
Run Website
npm run dev *

Runn Inngest
npx inngest-cli@1.12.1 dev *
```

## 7 AI Providers
 
```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=12489s]
[https://cwa.run/ai-sdk]
[https://ai-sdk.dev/providers/ai-sdk-providers/google]
[https://aistudio.google.com/api-keys]
[https://cwa.run/google-ai]

npm install ai@5.0.60

Free
npm install @ai-sdk/google@2.0.17

Payed
npm install @ai-sdk/openai@4.0.103
npm install @ai-sdk/anthropic@4.0.89
```

## 8 Error Tracking

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=14513s]

NIY
```

## 9 Sidebar Layout

```
[https://www.youtube.com/watch?v=ED2H_y6dmC8&t=16074s]
```

