import { ComponentMeta } from '../types/components.js';

export const COMPONENTS_REGISTRY: Record<string, ComponentMeta> = {
  // Layout & Structure
  'accordion': {
    name: 'accordion',
    description: 'A vertically stacked set of interactive headings that reveal content',
    category: 'disclosure',
    dependencies: ['@radix-ui/react-accordion'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/accordion.json'
  },
  'aspect-ratio': {
    name: 'aspect-ratio',
    description: 'Displays content within a desired ratio',
    category: 'layout',
    dependencies: ['@radix-ui/react-aspect-ratio'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/aspect-ratio.json'
  },
  'card': {
    name: 'card',
    description: 'Displays content in a card container',
    category: 'layout',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/card.json'
  },
  'collapsible': {
    name: 'collapsible',
    description: 'An interactive component which expands/collapses a content area',
    category: 'disclosure',
    dependencies: ['@radix-ui/react-collapsible'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/collapsible.json'
  },
  'resizable': {
    name: 'resizable',
    description: 'A component that allows resizing of panels',
    category: 'layout',
    dependencies: ['react-resizable-panels'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/resizable.json'
  },
  'scroll-area': {
    name: 'scroll-area',
    description: 'Augments native scroll functionality with custom styling',
    category: 'layout',
    dependencies: ['@radix-ui/react-scroll-area'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/scroll-area.json'
  },
  'separator': {
    name: 'separator',
    description: 'Visually or semantically separates content',
    category: 'layout',
    dependencies: ['@radix-ui/react-separator'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/separator.json'
  },
  'tabs': {
    name: 'tabs',
    description: 'A set of layered sections of content, known as tab panels',
    category: 'disclosure',
    dependencies: ['@radix-ui/react-tabs'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/tabs.json'
  },

  // Form Components
  'button': {
    name: 'button',
    description: 'Displays a button or a component that looks like a button',
    category: 'form',
    dependencies: ['@radix-ui/react-slot'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/button.json'
  },
  'checkbox': {
    name: 'checkbox',
    description: 'A control that allows the user to toggle between checked and not checked',
    category: 'form',
    dependencies: ['@radix-ui/react-checkbox'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/checkbox.json'
  },
  'form': {
    name: 'form',
    description: 'Building forms with React Hook Form and Zod',
    category: 'form',
    dependencies: ['@radix-ui/react-label', '@radix-ui/react-slot', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/form.json'
  },
  'input': {
    name: 'input',
    description: 'Displays a form input field',
    category: 'form',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/input.json'
  },
  'input-otp': {
    name: 'input-otp',
    description: 'One-time password input component',
    category: 'form',
    dependencies: ['input-otp'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/input-otp.json'
  },
  'label': {
    name: 'label',
    description: 'Renders an accessible label associated with controls',
    category: 'form',
    dependencies: ['@radix-ui/react-label'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/label.json'
  },
  'radio-group': {
    name: 'radio-group',
    description: 'A set of checkable buttons where no more than one can be checked',
    category: 'form',
    dependencies: ['@radix-ui/react-radio-group'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/radio-group.json'
  },
  'select': {
    name: 'select',
    description: 'Displays a list of options for the user to pick from',
    category: 'form',
    dependencies: ['@radix-ui/react-select'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/select.json'
  },
  'slider': {
    name: 'slider',
    description: 'An input where the user selects a value from within a given range',
    category: 'form',
    dependencies: ['@radix-ui/react-slider'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/slider.json'
  },
  'switch': {
    name: 'switch',
    description: 'A control that allows the user to toggle between on and off',
    category: 'form',
    dependencies: ['@radix-ui/react-switch'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/switch.json'
  },
  'textarea': {
    name: 'textarea',
    description: 'Displays a form textarea field',
    category: 'form',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/textarea.json'
  },
  'toggle': {
    name: 'toggle',
    description: 'A two-state button that can be either on or off',
    category: 'form',
    dependencies: ['@radix-ui/react-toggle'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/toggle.json'
  },
  'toggle-group': {
    name: 'toggle-group',
    description: 'A set of two-state buttons that can be toggled on or off',
    category: 'form',
    dependencies: ['@radix-ui/react-toggle-group'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/toggle-group.json'
  },

  // Navigation
  'breadcrumb': {
    name: 'breadcrumb',
    description: 'Displays the path to the current resource',
    category: 'navigation',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/breadcrumb.json'
  },
  'command': {
    name: 'command',
    description: 'Fast, composable command menu',
    category: 'navigation',
    dependencies: ['cmdk'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/command.json'
  },
  'dropdown-menu': {
    name: 'dropdown-menu',
    description: 'Displays a menu to the user triggered by a button',
    category: 'navigation',
    dependencies: ['@radix-ui/react-dropdown-menu'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/dropdown-menu.json'
  },
  'menubar': {
    name: 'menubar',
    description: 'A visually persistent menu common in desktop applications',
    category: 'navigation',
    dependencies: ['@radix-ui/react-menubar'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/menubar.json'
  },
  'navigation-menu': {
    name: 'navigation-menu',
    description: 'A collection of links for navigating websites',
    category: 'navigation',
    dependencies: ['@radix-ui/react-navigation-menu'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/navigation-menu.json'
  },
  'pagination': {
    name: 'pagination',
    description: 'Component to navigate between pages',
    category: 'navigation',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/pagination.json'
  },

  // Overlays
  'alert-dialog': {
    name: 'alert-dialog',
    description: 'A modal dialog that interrupts interaction',
    category: 'overlay',
    dependencies: ['@radix-ui/react-alert-dialog'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/alert-dialog.json'
  },
  'context-menu': {
    name: 'context-menu',
    description: 'Displays a menu triggered by right-click',
    category: 'overlay',
    dependencies: ['@radix-ui/react-context-menu'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/context-menu.json'
  },
  'dialog': {
    name: 'dialog',
    description: 'A window overlaid on the primary window',
    category: 'overlay',
    dependencies: ['@radix-ui/react-dialog'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/dialog.json'
  },
  'drawer': {
    name: 'drawer',
    description: 'A drawer component that slides in from the edge of the screen',
    category: 'overlay',
    dependencies: ['vaul'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/drawer.json'
  },
  'hover-card': {
    name: 'hover-card',
    description: 'Displays content on hover',
    category: 'overlay',
    dependencies: ['@radix-ui/react-hover-card'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/hover-card.json'
  },
  'popover': {
    name: 'popover',
    description: 'Displays rich content in a portal',
    category: 'overlay',
    dependencies: ['@radix-ui/react-popover'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/popover.json'
  },
  'sheet': {
    name: 'sheet',
    description: 'Extends the dialog component with slide-in animation',
    category: 'overlay',
    dependencies: ['@radix-ui/react-dialog'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/sheet.json'
  },
  'tooltip': {
    name: 'tooltip',
    description: 'A popup that displays information on hover',
    category: 'overlay',
    dependencies: ['@radix-ui/react-tooltip'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/tooltip.json'
  },

  // Feedback
  'alert': {
    name: 'alert',
    description: 'Displays a callout for user attention',
    category: 'feedback',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/alert.json'
  },
  'badge': {
    name: 'badge',
    description: 'Displays a small badge or status indicator',
    category: 'feedback',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/badge.json'
  },
  'progress': {
    name: 'progress',
    description: 'Displays an indicator showing completion progress',
    category: 'feedback',
    dependencies: ['@radix-ui/react-progress'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/progress.json'
  },
  'skeleton': {
    name: 'skeleton',
    description: 'Use to show a placeholder while content is loading',
    category: 'feedback',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/skeleton.json'
  },
  'sonner': {
    name: 'sonner',
    description: 'An opinionated toast component',
    category: 'feedback',
    dependencies: ['sonner'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/sonner.json'
  },
  'toast': {
    name: 'toast',
    description: 'A notification that appears at the corner of the screen',
    category: 'feedback',
    dependencies: ['@radix-ui/react-toast'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/toast.json'
  },
  'toaster': {
    name: 'toaster',
    description: 'The toaster component for displaying toasts',
    category: 'feedback',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/toaster.json'
  },

  // Data Display
  'avatar': {
    name: 'avatar',
    description: 'An image element with a fallback',
    category: 'data-display',
    dependencies: ['@radix-ui/react-avatar'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/avatar.json'
  },
  'calendar': {
    name: 'calendar',
    description: 'A date picker component',
    category: 'data-entry',
    dependencies: ['react-day-picker', 'date-fns'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/calendar.json'
  },
  'carousel': {
    name: 'carousel',
    description: 'A carousel component for cycling through content',
    category: 'data-display',
    dependencies: ['embla-carousel-react'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/carousel.json'
  },
  'chart': {
    name: 'chart',
    description: 'Beautiful and responsive charts using Recharts',
    category: 'data-display',
    dependencies: ['recharts'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/chart.json'
  },
  'combobox': {
    name: 'combobox',
    description: 'Autocomplete input with a dropdown list',
    category: 'data-entry',
    dependencies: ['@radix-ui/react-popover', 'cmdk'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/combobox.json'
  },
  'data-table': {
    name: 'data-table',
    description: 'Powerful data table with sorting, filtering, and pagination',
    category: 'data-display',
    dependencies: ['@tanstack/react-table'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/data-table.json'
  },
  'date-picker': {
    name: 'date-picker',
    description: 'A date picker component with calendar popup',
    category: 'data-entry',
    dependencies: ['react-day-picker', 'date-fns', '@radix-ui/react-popover'],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/date-picker.json'
  },
  'table': {
    name: 'table',
    description: 'Displays data in a table format',
    category: 'data-display',
    dependencies: [],
    registryUrl: 'https://ui.shadcn.com/registry/default/ui/table.json'
  }
};

export function getComponentByName(name: string): ComponentMeta | undefined {
  return COMPONENTS_REGISTRY[name];
}

export function getComponentsByCategory(category: string): ComponentMeta[] {
  return Object.values(COMPONENTS_REGISTRY).filter(
    component => component.category === category
  );
}

export function getAllComponents(): ComponentMeta[] {
  return Object.values(COMPONENTS_REGISTRY);
}

export function searchComponents(query: string): ComponentMeta[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(COMPONENTS_REGISTRY).filter(
    component => 
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.category.toLowerCase().includes(lowerQuery)
  );
}