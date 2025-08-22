import { BlockMeta } from '../types/blocks.js';

export const BLOCKS_REGISTRY: Record<string, BlockMeta> = {
  // Authentication Blocks
  'authentication-01': {
    name: 'authentication-01',
    description: 'A simple login form with email and password',
    category: 'authentication',
    components: ['button', 'card', 'input', 'label'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/authentication-01.json'
  },
  'authentication-02': {
    name: 'authentication-02',
    description: 'A login form with email, password, and social login options',
    category: 'authentication',
    components: ['button', 'card', 'input', 'label', 'separator'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/authentication-02.json'
  },
  'authentication-03': {
    name: 'authentication-03',
    description: 'A sign-up form with name, email, and password',
    category: 'authentication',
    components: ['button', 'card', 'input', 'label'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/authentication-03.json'
  },
  'authentication-04': {
    name: 'authentication-04',
    description: 'A login page with a split layout',
    category: 'authentication',
    components: ['button', 'input', 'label'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/authentication-04.json'
  },

  // Dashboard Blocks
  'dashboard-01': {
    name: 'dashboard-01',
    description: 'A dashboard with cards displaying key metrics',
    category: 'dashboard',
    components: ['card', 'tabs', 'button'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-01.json'
  },
  'dashboard-02': {
    name: 'dashboard-02',
    description: 'A dashboard with sidebar navigation',
    category: 'dashboard',
    components: ['card', 'sheet', 'button', 'nav'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-02.json'
  },
  'dashboard-03': {
    name: 'dashboard-03',
    description: 'A dashboard with charts and data tables',
    category: 'dashboard',
    components: ['card', 'chart', 'table', 'tabs'],
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-03.json'
  },
  'dashboard-04': {
    name: 'dashboard-04',
    description: 'An analytics dashboard with multiple chart types',
    category: 'dashboard',
    components: ['card', 'chart', 'select', 'button'],
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-04.json'
  },
  'dashboard-05': {
    name: 'dashboard-05',
    description: 'A responsive dashboard with collapsible sidebar',
    category: 'dashboard',
    components: ['card', 'sheet', 'button', 'badge', 'dropdown-menu'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-05.json'
  },
  'dashboard-06': {
    name: 'dashboard-06',
    description: 'A dashboard with dark mode support',
    category: 'dashboard',
    components: ['card', 'button', 'switch', 'tabs'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-06.json'
  },
  'dashboard-07': {
    name: 'dashboard-07',
    description: 'A minimal dashboard with key performance indicators',
    category: 'dashboard',
    components: ['card', 'progress', 'badge'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/dashboard-07.json'
  },

  // Chart Blocks
  'chart-01': {
    name: 'chart-01',
    description: 'A simple bar chart with responsive container',
    category: 'charts',
    components: ['card', 'chart'],
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/chart-01.json'
  },
  'chart-02': {
    name: 'chart-02',
    description: 'A line chart with multiple data series',
    category: 'charts',
    components: ['card', 'chart'],
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/chart-02.json'
  },
  'chart-03': {
    name: 'chart-03',
    description: 'A pie chart with custom colors',
    category: 'charts',
    components: ['card', 'chart'],
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/chart-03.json'
  },
  'chart-04': {
    name: 'chart-04',
    description: 'An area chart with gradient fill',
    category: 'charts',
    components: ['card', 'chart'],
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/chart-04.json'
  },

  // Sidebar Layouts
  'sidebar-01': {
    name: 'sidebar-01',
    description: 'A collapsible sidebar with navigation links',
    category: 'layout',
    components: ['button', 'sheet', 'scroll-area'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-01.json'
  },
  'sidebar-02': {
    name: 'sidebar-02',
    description: 'A sidebar with nested navigation',
    category: 'layout',
    components: ['accordion', 'button', 'sheet'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-02.json'
  },
  'sidebar-03': {
    name: 'sidebar-03',
    description: 'A sidebar with user profile section',
    category: 'layout',
    components: ['avatar', 'button', 'dropdown-menu', 'sheet'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-03.json'
  },
  'sidebar-04': {
    name: 'sidebar-04',
    description: 'A minimal sidebar with icon navigation',
    category: 'layout',
    components: ['button', 'tooltip', 'sheet'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-04.json'
  },
  'sidebar-05': {
    name: 'sidebar-05',
    description: 'A sidebar with search functionality',
    category: 'layout',
    components: ['input', 'button', 'command', 'sheet'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-05.json'
  },
  'sidebar-06': {
    name: 'sidebar-06',
    description: 'A responsive sidebar that converts to bottom nav on mobile',
    category: 'layout',
    components: ['button', 'sheet'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-06.json'
  },
  'sidebar-07': {
    name: 'sidebar-07',
    description: 'A sidebar with pinnable sections',
    category: 'layout',
    components: ['button', 'separator', 'sheet'],
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/sidebar-07.json'
  },

  // Settings Forms
  'settings-01': {
    name: 'settings-01',
    description: 'A settings page with tabs for different sections',
    category: 'forms',
    components: ['form', 'tabs', 'card', 'button', 'input', 'label'],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/settings-01.json'
  },
  'settings-02': {
    name: 'settings-02',
    description: 'A profile settings form',
    category: 'forms',
    components: ['form', 'card', 'button', 'input', 'textarea', 'label', 'avatar'],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/settings-02.json'
  },
  'settings-03': {
    name: 'settings-03',
    description: 'Account settings with password change',
    category: 'forms',
    components: ['form', 'card', 'button', 'input', 'label'],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/settings-03.json'
  },
  'settings-04': {
    name: 'settings-04',
    description: 'Notification preferences settings',
    category: 'forms',
    components: ['form', 'card', 'switch', 'label'],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    registryUrl: 'https://ui.shadcn.com/r/styles/default/settings-04.json'
  }
};

export function getBlockByName(name: string): BlockMeta | undefined {
  return BLOCKS_REGISTRY[name];
}

export function getBlocksByCategory(category: string): BlockMeta[] {
  return Object.values(BLOCKS_REGISTRY).filter(
    block => block.category === category
  );
}

export function getAllBlocks(): BlockMeta[] {
  return Object.values(BLOCKS_REGISTRY);
}

export function searchBlocks(query: string): BlockMeta[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(BLOCKS_REGISTRY).filter(
    block => 
      block.name.toLowerCase().includes(lowerQuery) ||
      block.description.toLowerCase().includes(lowerQuery) ||
      block.category.toLowerCase().includes(lowerQuery) ||
      block.components.some(comp => comp.toLowerCase().includes(lowerQuery))
  );
}