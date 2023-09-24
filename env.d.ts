/// <reference types="vite/client" />

interface ImportMeta {
  // for TypeScript - to understand the properties that Vite adds to `import.meta` - for router
  env: {
    [key: string]: string;
    BASE_URL: string;
    url: string;
  };
}
