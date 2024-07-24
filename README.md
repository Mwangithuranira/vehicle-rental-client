# React + TypeScript + Redux + Redux Persist
## Setting Up the Project
1. Create a Vite project with React and TypeScript:

```bash
pnpm create vite@latest my-redux-app --template react-ts
cd my-redux-app
pnpm install
```

2. Install Redux Toolkit and React-Redux:

``` bash
pnpm add @reduxjs/toolkit react-redux redux-persist
```

## Project Structure


    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── app/
    │   │   ├── store.ts
    │   ├── features/
    │   │   ├── counter/
    │   │   │   ├── counterSlice.ts
    │   │   ├── todo/
    │   │   │   ├── todoSlice.ts
    │   │   │   ├── todoApi.ts
    │   │   │   ├── Todo.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── README.md
