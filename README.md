# shadcn/ui MCP Server

A powerful MCP (Model Context Protocol) server that provides AI assistants with comprehensive tools to work with shadcn/ui v4 components. This server acts as a bridge between AI assistants and the shadcn/ui ecosystem, offering source code access, demos, blocks support, and CLI integration.

## Quick Start

```bash
# Use directly with npx (no installation needed)
npx @sherifbutt/shadcn-ui-mcp-server

# Or install globally for faster startup
npm install -g @sherifbutt/shadcn-ui-mcp-server
shadcn-ui-mcp-server

# 
```

Then configure it in Claude Desktop (see detailed setup below).

## 🎥 Demo

Once configured, try these example interactions:

- **"List all shadcn/ui form components"** - See all available form-related components
- **"Get the Button component source code"** - Fetch the latest TypeScript implementation
- **"Show me how to create a card with form"** - Get demo code with examples
- **"Install dialog and form components in my project"** - Use CLI integration
- **"What dashboard blocks are available?"** - Browse pre-built layouts

## Features

- **📦 Component Source Code Access** - Fetch latest shadcn/ui v4 TypeScript source code
- **🎨 Component Demos** - Generate usage examples and demo code for all components  
- **🏗️ Blocks Support** - Access complete block implementations (dashboards, forms, etc.)
- **📋 Metadata Access** - Get dependencies, descriptions, and configuration details
- **🔍 Repository Browsing** - Explore the shadcn/ui repository structure
- **⚡ CLI Integration** - Install and manage components via shadcn/ui CLI
- **🔧 Project Management** - Initialize and check project status

## Installation

### System Requirements
- **Node.js 18+** (check with `node --version`)
- **npm** or **yarn** package manager
- **Claude Desktop** or another MCP-compatible client

### Option 1: Use with npx (Recommended)

No installation required! Use directly with npx:

```bash
# First time usage - downloads and runs automatically
npx @sherifbutt/shadcn-ui-mcp-server

# Subsequent uses - uses cached version unless updated
npx @sherifbutt/shadcn-ui-mcp-server@latest
```

**Pros:** Always gets the latest version, no disk space used
**Cons:** Slightly slower startup on first run

### Option 2: Install Globally

```bash
# Install once, use anywhere
npm install -g @sherifbutt/shadcn-ui-mcp-server

# Run from anywhere
shadcn-ui-mcp-server
```

**Pros:** Fastest startup time
**Cons:** Takes disk space, manual updates needed

### Option 3: Install in Project

```bash
# Install in your project
npm install @sherifbutt/shadcn-ui-mcp-server

# Run from project directory
npx @sherifbutt/shadcn-ui-mcp-server
```

**Pros:** Version pinned to project
**Cons:** Separate installation per project

### Option 4: Development Setup

```bash
# Clone and build from source
git clone https://github.com/sherifButt/shadcn-ui-mcp-server.git
cd shadcn-ui-mcp-server

# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run locally
npm start
```

**Use case:** Contributing to the project or customization

## Getting Started Guide

### Step 1: Prerequisites
- **Node.js 18+** installed on your system
- **Claude Desktop** or another MCP-compatible client
- Basic familiarity with shadcn/ui components

### Step 2: Installation & Setup

1. **Choose your installation method:**
   ```bash
   # Option 1: Use directly with npx (no installation needed)
   npx @sherifbutt/shadcn-ui-mcp-server
   
   # Option 2: Install globally for faster startup
   npm install -g @sherifbutt/shadcn-ui-mcp-server
   ```

2. **Configure Claude Desktop:**
   - Open Claude Desktop
   - Go to Settings → MCP Servers (or locate the config file manually)
   - Add the server configuration (see detailed steps below)

3. **Test the connection:**
   - Restart Claude Desktop
   - Look for the 🔌 MCP connection indicator
   - Try asking: "List all shadcn/ui form components"

### Step 3: CLAUDE.md / roles.md

```md
## Front End Roles

When a task requires building or modifying a user interface, you must use the tools available in the shadcn-ui MCP server.

### Planning Rule

When planning a UI build using shadcn :

1. Discover Assets: First, use `list_components()` and `list_blocks()` to see all available assets in the MCP server.
2. Map Request to Assets: Analyse the user's request and map the required UI elements to the available components and blocks.
3. Prioritise Blocks: You should prioritise using blocks ( `get_block` ) wherever possible for common, complex UI patterns (e.g., login pages, calendars, dashboards). Blocks provide more structure and accelerate development. Use individual components ( `get_component` ) for smaller, more specific needs.

### Implementation Rule

When implementing the UI:
1. Get a Demo First: Before using a component, you must call the `get_component_demo(component_name)` tool. This is critical for understanding how the
component is used, its required props, and its structure.

2. Retrieve the Code:
- For a single component, call get_component(component_name) .
- For a composite block, call get_block(block_name) .

3. Implement Correctly: Integrate the retrieved code into the application, customising it with the necessary props and logic to fulfil the user's request.
```

### Step 4: files setup

```Prompt
Please act as a Lead UX Architect. Your task is to create a detailed UX Structure Plan for the above web application. The final output must be a single Markdown (UX_Structure_Planpo.md) file. The structure of this file is critical: it must use a hierarchical, indented list with box-drawing characters (like ├── and └──) to create a clear tree structure, exactly like the provided reference style.
```

```Prompt
Please look at the @UX_Structure_Plan.md and make an ui-implementation using shaden ui as to what components will be used in the ui structure and where. And you should only write the name of the appropriate components to be used. Not the code.
```

```Prompt
Please act as a Lead Backend Architect. Your task is to create a detailed Backend Structure Plan for the above web application. The final output must be a single Markdown (.md) file. The structure of this file is critical: it must use a hierarchical, indented list with box-drawing characters (like ├── and └──) to create a clear tree structure, exactly like the provided reference style.
```

### Step 3: First Commands

Try these commands to get started:

```
"Show me all available shadcn/ui components"
"Get the source code for the Button component"
"Install form components for a login page"
"Show me dashboard blocks"
"Get demo code for the Card component"
```

### Step 4: Working with Your Project

1. **Initialize shadcn/ui in your project:**
   ```
   "Initialize shadcn/ui in my project at /path/to/project"
   ```

2. **Install components:**
   ```
   "Install button, input, and form components"
   ```

3. **Get implementation help:**
   ```
   "Show me how to create a login form with validation"
   "Get demo code for a data table"
   ```

## MCP Client Configuration

### Claude Desktop Setup

1. **Locate your Claude Desktop config file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add the shadcn-ui MCP server to your configuration:**

   **Option A: Using npx (recommended)**
   ```json
   {
     "mcpServers": {
       "shadcn-ui": {
         "command": "npx",
         "args": ["@sherifbutt/shadcn-ui-mcp-server"]
       }
     }
   }
   ```

   **Option B: If installed globally**
   ```json
   {
     "mcpServers": {
       "shadcn-ui": {
         "command": "shadcn-ui-mcp-server"
       }
     }
   }
   ```

   **Option C: Development setup**
   ```json
   {
     "mcpServers": {
       "shadcn-ui": {
         "command": "node",
         "args": ["/absolute/path/to/shadcn-ui-mcp-server/dist/index.js"]
       }
     }
   }
   ```

3. **Claude code CLI**:

  ```bash
  # Add the MCP server
  claude mcp add shadcn-ui npx @sherifbutt/shadcn-ui-mcp-server
  ```
  
  ```bash
  # List configured MCP servers
  claude mcp list
  ```

  ```bash
  # Remove an MCP server (if needed)
  claude mcp remove shadcn-ui
  ```

4. **Restart Claude Desktop** for the changes to take effect.

5. **Verify the connection:** Look for the 🔌 icon in Claude Desktop indicating MCP servers are connected.

### Other MCP Clients

For other MCP-compatible clients, use the same command configurations:
- **Command**: `npx` or `shadcn-ui-mcp-server`
- **Args**: `["shadcn-ui-mcp-server"]` (for npx)
- **Transport**: stdio

### Troubleshooting

**Server not connecting?**
- Ensure Node.js 18+ is installed: `node --version`
- Test the server manually: `npx @sherifbutt/shadcn-ui-mcp-server` (should run without errors)
- Check Claude Desktop config file syntax with a JSON validator
- Restart Claude Desktop after config changes

**Installation issues?**
- Clear npm cache: `npm cache clean --force`
- Try global installation: `npm install -g @sherifbutt/shadcn-ui-mcp-server`
- For development, ensure build completed: `npm run build`

**Permission errors?**
- On Unix systems, ensure executable permissions: `chmod +x dist/index.js`
- Try running with explicit node: `node dist/index.js`

### Available Tools

The server provides the following tools:

#### Component Tools

1. **`list_components`** - List all components with optional category filtering
   ```json
   {
     "category": "form" // optional: form, layout, navigation, overlay, feedback, etc.
   }
   ```

2. **`get_component_source`** - Get the TypeScript source code for a component
   ```json
   {
     "name": "button" // required: component name
   }
   ```

3. **`get_component_metadata`** - Get component dependencies and configuration
   ```json
   {
     "name": "dialog" // required: component name
   }
   ```

4. **`get_component_demo`** - Get usage examples and demo code
   ```json
   {
     "name": "card",
     "demoIndex": 0 // optional: which demo to retrieve
   }
   ```

5. **`install_component`** - Install components using the CLI
   ```json
   {
     "components": ["button", "card", "dialog"],
     "force": false, // optional: overwrite existing files
     "cwd": "/path/to/project" // optional: working directory
   }
   ```

#### Block Tools

6. **`list_blocks`** - List available blocks with optional category filtering
   ```json
   {
     "category": "dashboard" // optional: authentication, dashboard, layout, charts, forms
   }
   ```

7. **`get_block_source`** - Get complete block implementation
   ```json
   {
     "name": "dashboard-01" // required: block name
   }
   ```

8. **`install_block`** - Install a block with all dependencies
   ```json
   {
     "name": "authentication-01",
     "force": false,
     "cwd": "/path/to/project"
   }
   ```

#### Repository & Discovery

9. **`browse_repository`** - Explore repository structure
   ```json
   {
     "path": "apps/www/components/ui" // optional: repository path
   }
   ```

10. **`search_repository`** - Search for files and content
    ```json
    {
      "query": "button",
      "fileType": "tsx" // optional: filter by file extension
    }
    ```

#### Project Management

11. **`init_shadcn`** - Initialize shadcn/ui in a project
    ```json
    {
      "style": "default", // optional: default or new-york
      "typescript": true,
      "tailwindConfig": "./tailwind.config.js",
      "componentsPath": "./components",
      "force": false,
      "cwd": "/path/to/project"
    }
    ```

12. **`check_project_status`** - Check project configuration
    ```json
    {
      "cwd": "/path/to/project" // optional: working directory
    }
    ```

## Supported Components (50+)

The server includes metadata and demos for all shadcn/ui components:

### Form Components
- Button, Checkbox, Form, Input, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group

### Layout Components
- Accordion, Aspect Ratio, Card, Collapsible, Resizable, Scroll Area, Separator, Tabs

### Navigation Components
- Breadcrumb, Command, Dropdown Menu, Menubar, Navigation Menu, Pagination

### Overlay Components
- Alert Dialog, Context Menu, Dialog, Drawer, Hover Card, Popover, Sheet, Tooltip

### Data Display Components
- Avatar, Calendar, Carousel, Chart, Data Table, Table

### Feedback Components
- Alert, Badge, Progress, Skeleton, Sonner, Toast

### And many more...

## Supported Blocks (25+)

The server provides access to complete block implementations:

### Authentication Blocks
- Login forms, Sign-up forms, Social authentication

### Dashboard Blocks
- Analytics dashboards, Admin panels, Metrics displays

### Layout Blocks
- Sidebars with navigation, Responsive layouts

### Chart Blocks
- Bar charts, Line charts, Pie charts, Area charts

### Form Blocks
- Settings forms, Profile forms, Complex forms with validation

## Example Usage

Here are some example interactions with the server:

### Get Button Component Source
```javascript
// Request
{
  "tool": "get_component_source",
  "arguments": { "name": "button" }
}

// Response includes full TypeScript source code
```

### Install Form Components
```javascript
// Request
{
  "tool": "install_component",
  "arguments": {
    "components": ["form", "input", "label", "button"],
    "cwd": "/my-project"
  }
}

// Executes: npx shadcn-ui@latest add form input label button
```

### Get Dashboard Block
```javascript
// Request
{
  "tool": "get_block_source",
  "arguments": { "name": "dashboard-01" }
}

// Response includes all files and dependencies for the dashboard
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Run type checking
npm run lint

# Clean build directory
npm run clean
```

## Architecture

The server is built with:
- TypeScript for type safety
- `@modelcontextprotocol/sdk` for MCP protocol implementation
- Modular architecture with separate services for registry, CLI, and demos
- Comprehensive error handling with proper MCP error codes

### Project Structure
```
src/
├── index.ts              # Main MCP server implementation
├── types/                # TypeScript type definitions
├── data/                 # Component and block registries
├── services/             # External service integrations
│   ├── registry.ts       # shadcn/ui registry API client
│   └── cli.ts           # CLI command execution
└── utils/               # Utility functions
    └── demos.ts         # Demo code generation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## FAQ

### Q: How do I know if the MCP server is working?
A: Look for the 🔌 icon in Claude Desktop indicating MCP servers are connected. You can also ask "List all shadcn/ui components" to test.

### Q: Can I use this with my existing React project?
A: Yes! The server works with any project. Use the `init_shadcn` and `install_component` tools to set up shadcn/ui in your project.

### Q: Do I need to install anything globally?
A: No! Using `npx @sherifbutt/shadcn-ui-mcp-server` requires no global installation.

### Q: What's the difference between components and blocks?
A: Components are individual UI elements (button, input, etc.). Blocks are complete implementations (login pages, dashboards, etc.).

### Q: How often is the component registry updated?
A: The server fetches live data from the official shadcn/ui registry, so you always get the latest versions.

### Q: Can I use this with TypeScript and JavaScript projects?
A: Yes! The server supports both TypeScript and JavaScript projects. Components are provided in TypeScript but work in both.

## Acknowledgments

This project integrates with [shadcn/ui](https://ui.shadcn.com/) by [@shadcn](https://twitter.com/shadcn).