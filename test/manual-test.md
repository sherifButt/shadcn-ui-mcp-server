# Manual Testing Guide

This guide helps you manually test the shadcn/ui MCP server functionality.

## Prerequisites

1. Build the project:
```bash
npm install
npm run build
```

2. Configure in Claude Desktop or your MCP client

## Test Scenarios

### 1. Component Listing
Test that all components are properly registered:
- List all components (should return 50+ components)
- List components by each category
- Verify each category has the expected components

### 2. Component Source Fetching
Test fetching source code:
- Get source for `button` component
- Get source for `dialog` component
- Get source for `data-table` component
- Try invalid component name (should error gracefully)

### 3. Component Metadata
Test metadata retrieval:
- Get metadata for `form` (should include react-hook-form, zod dependencies)
- Get metadata for `calendar` (should include date-fns dependency)
- Verify all metadata fields are populated

### 4. Demo Generation
Test demo code generation:
- Get demo for `button` (multiple demos available)
- Get demo for `card` with demoIndex: 1
- Get demo for `form` (complex demo with validation)
- Get demo for component without specific demos

### 5. Block Operations
Test block functionality:
- List all blocks
- List authentication blocks
- Get source for `dashboard-01`
- Get source for `authentication-02`
- Verify block includes all required files

### 6. Repository Operations
Test repository browsing:
- Browse root path
- Browse `apps/www/components/ui`
- Search for "button"
- Search for "chart" with fileType "tsx"

### 7. CLI Integration (Requires Project)
Test in an actual project directory:
- Check project status
- Initialize shadcn/ui
- Install single component
- Install multiple components
- Install a block

## Expected Behaviors

### Success Cases
- All tools return properly formatted JSON
- Component sources include full TypeScript code
- Demos include imports and formatted code
- CLI operations show command output

### Error Cases
- Invalid component names return InvalidRequest error
- Missing parameters return InvalidParams error
- Network failures return InternalError with details
- CLI failures include error output

## Verification Checklist

- [ ] Server starts without errors
- [ ] All 12 tools are listed
- [ ] Component registry has 50+ components
- [ ] Block registry has 25+ blocks
- [ ] Source fetching works (requires internet)
- [ ] Demo generation works for all components
- [ ] Error handling provides helpful messages
- [ ] CLI integration works (if testing with project)

## Common Issues

1. **Registry fetch fails**: Check internet connection
2. **CLI commands fail**: Ensure npm/npx is available
3. **TypeScript errors**: Run `npm run lint` to check
4. **Module not found**: Ensure `npm run build` completed

## Performance Notes

- First registry fetch may be slow (no caching)
- CLI operations depend on npm speed
- Large block sources may take time to fetch