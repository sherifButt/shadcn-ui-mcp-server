import { RegistryItem } from '../types/index.js';

const REGISTRY_BASE_URL = 'https://ui.shadcn.com/registry';
const DEFAULT_STYLE = 'default';

export interface RegistryConfig {
  style?: 'default' | 'new-york';
  baseUrl?: string;
}

export class RegistryService {
  private style: string;
  private baseUrl: string;

  constructor(config: RegistryConfig = {}) {
    this.style = config.style || DEFAULT_STYLE;
    this.baseUrl = config.baseUrl || REGISTRY_BASE_URL;
  }

  async fetchComponent(name: string): Promise<RegistryItem> {
    const url = `${this.baseUrl}/${this.style}/ui/${name}.json`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch component ${name}: ${response.statusText}`);
      }
      
      const data = await response.json() as RegistryItem;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching component ${name}: ${error.message}`);
      }
      throw error;
    }
  }

  async fetchBlock(name: string): Promise<RegistryItem> {
    const url = `${this.baseUrl}/${this.style}/block/${name}.json`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch block ${name}: ${response.statusText}`);
      }
      
      const data = await response.json() as RegistryItem;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching block ${name}: ${error.message}`);
      }
      throw error;
    }
  }

  async fetchExample(name: string): Promise<RegistryItem> {
    const url = `${this.baseUrl}/${this.style}/example/${name}.json`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch example ${name}: ${response.statusText}`);
      }
      
      const data = await response.json() as RegistryItem;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching example ${name}: ${error.message}`);
      }
      throw error;
    }
  }

  async fetchIndex(): Promise<Array<{ name: string; type: string; registryDependencies?: string[] }>> {
    const url = `${this.baseUrl}/${this.style}/index.json`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch registry index: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching registry index: ${error.message}`);
      }
      throw error;
    }
  }

  getComponentSource(registryItem: RegistryItem): string {
    if (!registryItem.files || registryItem.files.length === 0) {
      throw new Error('No files found in registry item');
    }
    
    // Find the main component file (usually the first one)
    const mainFile = registryItem.files[0];
    return mainFile.content;
  }

  getAllFiles(registryItem: RegistryItem): Array<{ name: string; content: string }> {
    return registryItem.files || [];
  }

  getDependencies(registryItem: RegistryItem): string[] {
    const deps: string[] = [];
    
    if (registryItem.dependencies) {
      deps.push(...registryItem.dependencies);
    }
    
    return deps;
  }

  getDevDependencies(registryItem: RegistryItem): string[] {
    return registryItem.devDependencies || [];
  }

  getRegistryDependencies(registryItem: RegistryItem): string[] {
    return registryItem.registryDependencies || [];
  }

  getTailwindConfig(registryItem: RegistryItem): Record<string, any> | undefined {
    return registryItem.tailwind?.config;
  }

  getCssVars(registryItem: RegistryItem): { light?: Record<string, string>; dark?: Record<string, string> } | undefined {
    return registryItem.cssVars;
  }
}