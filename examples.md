# @sherifbutt/shadcn-ui-mcp-server - Example Usage

This document provides detailed examples of how to use the shadcn/ui MCP server with AI assistants.

## Basic Component Operations

### 1. List All Form Components
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "list_components",
    "arguments": {
      "category": "form"
    }
  }
}

// Response
{
  "count": 13,
  "components": [
    {
      "name": "button",
      "description": "Displays a button or a component that looks like a button",
      "category": "form",
      "dependencies": ["@radix-ui/react-slot"]
    },
    {
      "name": "checkbox",
      "description": "A control that allows the user to toggle between checked and not checked",
      "category": "form",
      "dependencies": ["@radix-ui/react-checkbox"]
    }
    // ... more components
  ]
}
```

### 2. Get Button Component Source Code
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "get_component_source",
    "arguments": {
      "name": "button"
    }
  }
}

// Response contains the full TypeScript source:
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 3. Get Component Demo Code
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "get_component_demo",
    "arguments": {
      "name": "card",
      "demoIndex": 1
    }
  }
}

// Response
{
  "component": "card",
  "currentDemo": {
    "name": "Card with Form",
    "description": "Card containing a form",
    "imports": [
      "import { Card, CardContent, CardDescription, CardHeader, CardTitle } from \"@/components/ui/card\"",
      "import { Input } from \"@/components/ui/input\"",
      "import { Label } from \"@/components/ui/label\"",
      "import { Button } from \"@/components/ui/button\""
    ],
    "code": "..."
  },
  "formattedCode": "// Full formatted component code with imports",
  "availableDemos": 2,
  "allDemos": [
    { "name": "Basic Card", "description": "A simple card with header, content, and footer" },
    { "name": "Card with Form", "description": "Card containing a form" }
  ]
}
```

## Block Operations

### 4. List Dashboard Blocks
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "list_blocks",
    "arguments": {
      "category": "dashboard"
    }
  }
}

// Response
{
  "count": 7,
  "blocks": [
    {
      "name": "dashboard-01",
      "description": "A dashboard with cards displaying key metrics",
      "category": "dashboard",
      "components": ["card", "tabs", "button"],
      "dependencies": []
    },
    {
      "name": "dashboard-03",
      "description": "A dashboard with charts and data tables",
      "category": "dashboard",
      "components": ["card", "chart", "table", "tabs"],
      "dependencies": ["recharts"]
    }
    // ... more blocks
  ]
}
```

### 5. Get Authentication Block Source
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "get_block_source",
    "arguments": {
      "name": "authentication-01"
    }
  }
}

// Response
{
  "name": "authentication-01",
  "description": "A simple login form with email and password",
  "files": [
    {
      "name": "login-form.tsx",
      "content": "// Full component source code"
    }
  ],
  "dependencies": [],
  "registryDependencies": ["button", "card", "input", "label"],
  "components": ["button", "card", "input", "label"]
}
```

## Installation Operations

### 6. Install Multiple Components
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "install_component",
    "arguments": {
      "components": ["dialog", "form", "input", "button"],
      "cwd": "/Users/me/my-next-project"
    }
  }
}

// Response
{
  "success": true,
  "installed": ["dialog", "form", "input", "button"],
  "skipped": [],
  "errors": [],
  "output": "✔ Installing dialog...\n✔ Installing form...\n✔ Installing input...\n✔ Installing button...\n✔ Done.",
  "command": "npx shadcn-ui@latest add dialog form input button"
}
```

### 7. Initialize shadcn/ui in a Project
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "init_shadcn",
    "arguments": {
      "style": "default",
      "typescript": true,
      "tailwindConfig": "./tailwind.config.ts",
      "cwd": "/Users/me/my-new-project"
    }
  }
}

// Response
{
  "success": true,
  "output": "✔ Writing components.json...\n✔ Initializing project...\n✔ Installing dependencies...\n\nSuccess! Project has been initialized.",
  "command": "npx shadcn-ui@latest init"
}
```

## Project Management

### 8. Check Project Status
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "check_project_status",
    "arguments": {
      "cwd": "/Users/me/my-project"
    }
  }
}

// Response
{
  "status": {
    "initialized": true,
    "framework": "next",
    "tailwindInstalled": true,
    "typescript": true,
    "componentsInstalled": ["button", "card", "input"],
    "blocksInstalled": [],
    "style": "default",
    "tailwindConfig": "./tailwind.config.ts",
    "aliases": {
      "@": "./src"
    }
  },
  "projectInfo": {
    "hasTailwind": true,
    "hasTypeScript": true,
    "framework": "next"
  },
  "componentsJson": {
    "style": "default",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "src/app/globals.css",
      "baseColor": "slate",
      "cssVariables": true
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils"
    }
  },
  "recommendation": "Project is ready for shadcn/ui components"
}
```

## Repository Exploration

### 9. Browse Repository Structure
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "browse_repository",
    "arguments": {
      "path": "apps/www/components/ui"
    }
  }
}

// Response
{
  "path": "apps/www/components/ui",
  "contents": [
    "accordion.tsx",
    "alert-dialog.tsx",
    "alert.tsx",
    "aspect-ratio.tsx",
    "avatar.tsx",
    "badge.tsx",
    "button.tsx",
    "calendar.tsx",
    "card.tsx",
    // ... all component files
  ],
  "type": "directory"
}
```

### 10. Search Repository
```json
// Request
{
  "method": "tools/call",
  "params": {
    "name": "search_repository",
    "arguments": {
      "query": "calendar",
      "fileType": "tsx"
    }
  }
}

// Response
{
  "query": "calendar",
  "fileType": "tsx",
  "count": 2,
  "results": [
    {
      "path": "apps/www/components/ui/calendar.tsx",
      "type": "component",
      "name": "calendar",
      "description": "A date picker component"
    },
    {
      "path": "apps/www/components/ui/date-picker.tsx",
      "type": "component",
      "name": "date-picker",
      "description": "A date picker component with calendar popup"
    }
  ]
}
```

## Common Workflows

### Building a Login Page
```typescript
// 1. First, check what's needed
await call("list_blocks", { category: "authentication" })

// 2. Get the block source
await call("get_block_source", { name: "authentication-01" })

// 3. Install the block and dependencies
await call("install_block", { 
  name: "authentication-01",
  cwd: "/my-project" 
})

// 4. Customize with additional components if needed
await call("install_component", { 
  components: ["checkbox", "separator"],
  cwd: "/my-project" 
})
```

### Creating a Dashboard
```typescript
// 1. Initialize shadcn/ui if not already done
await call("check_project_status", { cwd: "/my-project" })

// 2. Install a dashboard block
await call("install_block", { 
  name: "dashboard-03",
  cwd: "/my-project" 
})

// 3. Get chart component demos
await call("get_component_demo", { name: "chart" })

// 4. Install additional components
await call("install_component", { 
  components: ["skeleton", "badge", "dropdown-menu"],
  cwd: "/my-project" 
})
```

## Error Handling

The server provides detailed error messages:

```json
// Invalid component name
{
  "error": {
    "code": "InvalidRequest",
    "message": "Component \"invalid-component\" not found"
  }
}

// Missing required parameters
{
  "error": {
    "code": "InvalidParams",
    "message": "Invalid parameters: name: Required"
  }
}

// Network/Registry errors
{
  "error": {
    "code": "InternalError",
    "message": "Failed to fetch component source: Network error"
  }
}
```

## Tips for AI Assistants

1. **Always check component existence** before trying to install or fetch source
2. **Use demos** to show users how to implement components
3. **Check project status** before running install commands
4. **Install blocks** for complete features instead of individual components
5. **Use category filtering** to help users discover relevant components
6. **Combine multiple operations** for complex tasks (e.g., init + install + demo)