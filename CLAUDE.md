# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development Tasks
```bash
npm install        # Install dependencies
npm run build      # Build TypeScript to JavaScript (required before running)
npm run dev        # Watch mode for development
npm run lint       # Type check without emitting files
npm start          # Run the compiled MCP server
npm run clean      # Remove dist/ directory
```

### Publishing Workflow
```bash
npm run build      # Build first
npm run lint       # Ensure no type errors
git add .          # Stage changes
git commit -m "description"  # Commit changes
npm version patch|minor|major  # Increment version
npm publish --access public   # Publish to npm
```

### Testing the MCP Server
The server is a stdio-based MCP server. Test configurations:

**Claude Code MCP Integration:**
```bash
# Add MCP server to Claude Code
claude mcp add shadcn-ui npx @sherifbutt/shadcn-ui-mcp-server

# List configured servers
claude mcp list

# Remove if needed
claude mcp remove shadcn-ui
```

**Manual Testing:**
```bash
# Direct execution (will run and wait for MCP messages)
npx @sherifbutt/shadcn-ui-mcp-server

# Development mode
./dist/index.js
```

## Project Architecture

### MCP Server Structure
This is a **Model Context Protocol (MCP) server** that provides 12 tools for working with shadcn/ui components:

**Component Tools:** list_components, get_component_source, get_component_metadata, get_component_demo, install_component

**Block Tools:** list_blocks, get_block_source, install_block

**Repository Tools:** browse_repository, search_repository  

**Project Tools:** init_shadcn, check_project_status

### Core Modules

1. **`src/index.ts`** - Main MCP server implementation
   - Uses StdioServerTransport for MCP communication
   - All tools use Zod schemas for input validation
   - Comprehensive error handling with proper MCP error codes

2. **`src/data/`** - Static registries with metadata
   - `components.ts`: 50+ shadcn/ui components with categories, dependencies, registry URLs
   - `blocks.ts`: 25+ pre-built blocks (auth, dashboard, forms, etc.)

3. **`src/services/`** - External integrations
   - `registry.ts`: Fetches live source code from ui.shadcn.com/registry API
   - `cli.ts`: Executes shadcn/ui CLI commands with proper process handling

4. **`src/utils/`** - Code generation
   - `demos.ts`: Generates formatted demo code with imports and examples

### Key Technical Patterns

- **Registry API Integration**: Fetches live TypeScript source from official shadcn/ui registry
- **CLI Process Management**: Spawns child processes with timeout/error handling
- **Zod Input Validation**: All MCP tool inputs validated with schemas
- **Type-Safe Error Handling**: Uses MCP error codes (InvalidRequest, InternalError, etc.)
- **Demo Code Generation**: Provides multiple usage examples per component

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

## Development Guidelines

### Registry API Integration
The official shadcn/ui registry returns JSON with this structure:
```typescript
{
  files: [{ name: string, content: string }],
  dependencies?: string[],
  devDependencies?: string[],
  registryDependencies?: string[]
}
```

### CLI Integration Patterns
- Use `CliService.executeCommand()` for all shadcn CLI operations
- Always set timeouts (default: 30s for commands, 120s for init)
- Handle both stdout/stderr and parse output for user-friendly responses
- Commands run in user-specified `cwd` or current directory

### MCP Error Handling
Always throw `McpError` with proper error codes:
- `ErrorCode.InvalidRequest`: Invalid parameters or component not found
- `ErrorCode.InternalError`: Network failures, CLI errors, or server issues  
- `ErrorCode.MethodNotFound`: Unknown tool name

### Performance Considerations
- No caching implemented - registry calls and CLI operations run fresh each time
- Registry fetches are async and may be slow on first use
- CLI operations depend on npm/internet speed

### Debugging
- Server logs to stderr with `console.error()`
- Test individual services in isolation before tool integration
- MCP protocol expects JSON responses - malformed responses will fail silently
- Use `npm run lint` to catch type errors before runtime