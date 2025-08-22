# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Tasks

### Building and Running
```bash
npm install        # Install dependencies
npm run build      # Build TypeScript to JavaScript
npm run dev        # Watch mode for development
npm run lint       # Type check without emitting
npm start          # Run the compiled server
```

### Testing the MCP Server
The server runs on stdio, so it needs to be configured in an MCP client like Claude Desktop:

**Option 1: Using npx (recommended)**
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

**Option 2: Global installation**
```json
{
  "mcpServers": {
    "shadcn-ui": {
      "command": "shadcn-ui-mcp-server"
    }
  }
}
```

**Option 3: Development mode**
```json
{
  "mcpServers": {
    "shadcn-ui": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

## Architecture Overview

### Core Components

1. **MCP Server (`src/index.ts`)**
   - Entry point implementing the MCP protocol
   - Handles all tool requests and responses
   - Uses StdioServerTransport for communication
   - Implements 12 tools for shadcn/ui operations

2. **Data Registries (`src/data/`)**
   - `components.ts`: Registry of 50+ shadcn/ui components with metadata
   - `blocks.ts`: Registry of 25+ pre-built UI blocks
   - Each entry includes name, description, dependencies, and registry URLs

3. **Services (`src/services/`)**
   - `registry.ts`: Fetches component/block source from shadcn/ui registry API
   - `cli.ts`: Executes shadcn/ui CLI commands (init, add, diff)
   - Both services include comprehensive error handling

4. **Utilities (`src/utils/`)**
   - `demos.ts`: Generates demo code for components
   - Provides multiple examples per component
   - Formats code with proper imports

### Key Design Patterns

1. **Tool Input Validation**: All tools use Zod schemas for input validation
2. **Error Handling**: Proper MCP error codes (InvalidRequest, InternalError, etc.)
3. **Async Operations**: All external calls (registry, CLI) are properly async
4. **Type Safety**: Full TypeScript with strict mode enabled

## Adding New Components

To add a new component to the registry:

1. Add entry to `COMPONENTS_REGISTRY` in `src/data/components.ts`:
```typescript
'new-component': {
  name: 'new-component',
  description: 'Description of the component',
  category: 'appropriate-category',
  dependencies: ['@radix-ui/react-something'],
  registryUrl: 'https://ui.shadcn.com/registry/default/ui/new-component.json'
}
```

2. Add demo examples in `src/utils/demos.ts`:
```typescript
'new-component': [
  {
    name: 'Basic Example',
    description: 'Basic usage of new-component',
    imports: ['import { NewComponent } from "@/components/ui/new-component"'],
    code: `<NewComponent>Content</NewComponent>`
  }
]
```

## Adding New Blocks

Add to `BLOCKS_REGISTRY` in `src/data/blocks.ts`:
```typescript
'new-block': {
  name: 'new-block',
  description: 'Description of the block',
  category: 'appropriate-category',
  components: ['list', 'of', 'required', 'components'],
  dependencies: ['external-deps'],
  registryUrl: 'https://ui.shadcn.com/registry/default/block/new-block.json'
}
```

## Important Considerations

1. **Registry API**: The shadcn/ui registry API returns JSON with this structure:
   ```typescript
   {
     files: [{ name: string, content: string }],
     dependencies?: string[],
     devDependencies?: string[],
     registryDependencies?: string[]
   }
   ```

2. **CLI Integration**: The CLI service spawns child processes, so:
   - Always set appropriate timeouts
   - Handle both stdout and stderr
   - Parse CLI output for user-friendly responses

3. **Error Handling**: Always throw `McpError` with appropriate error codes:
   - `ErrorCode.InvalidRequest`: Bad input parameters
   - `ErrorCode.InternalError`: Server/network failures
   - `ErrorCode.MethodNotFound`: Unknown tool name

4. **Performance**: The server caches nothing currently. Consider adding:
   - Registry response caching
   - Component metadata caching
   - CLI command result caching

## Debugging Tips

1. Server logs to stderr: `console.error()` for debug messages
2. Test individual services before integrating into tools
3. Validate against actual shadcn/ui registry responses
4. Check CLI command execution in isolation first