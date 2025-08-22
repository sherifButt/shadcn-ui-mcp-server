export type BlockCategory = 
  | 'authentication'
  | 'dashboard'
  | 'layout'
  | 'charts'
  | 'forms'
  | 'ecommerce'
  | 'marketing'
  | 'application';

export interface BlockMeta {
  name: string;
  description: string;
  category: BlockCategory;
  components: string[];
  dependencies: string[];
  registryUrl: string;
  preview?: string;
  code?: string;
}

export interface BlockFile {
  path: string;
  content: string;
  target?: string;
}

export interface BlockRegistry {
  name: string;
  type: 'block';
  description: string;
  dependencies: string[];
  devDependencies?: string[];
  registryDependencies: string[];
  files: BlockFile[];
  categories: BlockCategory[];
  tailwind?: {
    config?: Record<string, any>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}