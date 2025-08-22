export type ComponentCategory = 
  | 'form' 
  | 'layout' 
  | 'navigation' 
  | 'overlay' 
  | 'feedback' 
  | 'data-display' 
  | 'disclosure'
  | 'data-entry'
  | 'typography';

export interface ComponentMeta {
  name: string;
  description: string;
  dependencies: string[];
  category: ComponentCategory;
  registryUrl: string;
  devDependencies?: string[];
  files?: string[];
}

export interface ComponentFile {
  name: string;
  content: string;
  type: 'component' | 'example' | 'demo';
}

export interface ComponentRegistry {
  name: string;
  type: 'ui' | 'example' | 'block';
  files: ComponentFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  tailwind?: {
    config?: Record<string, any>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}

export interface ComponentDemo {
  name: string;
  description: string;
  code: string;
  preview?: string;
  imports: string[];
}