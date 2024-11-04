/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TASK_API_BASE_URL: string;
    // Add other API base URLs as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }