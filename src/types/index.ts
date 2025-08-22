export * from './components.js';
export * from './blocks.js';

export interface ProjectStatus {
  initialized: boolean;
  framework: 'next' | 'vite' | 'remix' | 'gatsby' | 'laravel' | 'astro' | null;
  tailwindInstalled: boolean;
  componentsInstalled: string[];
  blocksInstalled: string[];
  configPath?: string;
  componentsPath?: string;
  utilsPath?: string;
  typescript: boolean;
  style: 'default' | 'new-york';
  tailwindConfig?: string;
  tailwindCss?: string;
  aliases?: Record<string, string>;
}

export interface CliOptions {
  cwd?: string;
  yes?: boolean;
  defaults?: boolean;
  force?: boolean;
  silent?: boolean;
  typescript?: boolean;
  style?: 'default' | 'new-york';
  tailwindConfig?: string;
  tailwindCss?: string;
  componentsPath?: string;
  utilsPath?: string;
  prefixPath?: string;
}

export interface RegistryItem {
  name: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    name: string;
    content: string;
  }>;
  type: 'ui' | 'block' | 'example';
  tailwind?: {
    config?: Record<string, any>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}