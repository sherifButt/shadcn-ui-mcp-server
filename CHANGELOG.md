# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.0.6] - 2025-08-22

### Fixed
- 🔧 Updated CLI integration to use `shadcn@latest` instead of deprecated `shadcn-ui@latest`
- ✅ Resolves installation errors for components and blocks
- 📚 Updated documentation to reflect new CLI package name

### Background
The official shadcn CLI package changed from `shadcn-ui` to `shadcn`, causing installation failures when the server tried to use the old deprecated package.

## [1.0.5] - 2025-08-22

### Improved
- 🔍 Better error messages for install_component when component not found
- 💡 Suggests matching blocks when user tries to install a block as component
- 🎯 Example: "sidebar" now suggests "sidebar-01, sidebar-02, sidebar-03"

## [1.0.4] - 2025-08-22

### Updated
- README.md added rules instructions
- README.md added UX_Structure_Planpo.md and UX_Structure_Plan.md prompts

## [1.0.3] - 2025-08-22

### Updated
- README.md claude-code -> claude

## [1.0.2] - 2025-08-22

### Fixed
- 🔧 Binary path configuration in package.json (was causing "command not found" error)
- ✅ npx command now works correctly: `npx @sherifbutt/shadcn-ui-mcp-server`

## [1.0.1] - 2025-08-22

### Added
- 🎥 Demo section with example interactions in README
- ❓ FAQ section answering common questions
- 📝 CHANGELOG.md for tracking updates
- 🔧 Claude Code CLI integration instructions

### Improved
- 📚 Enhanced documentation with better examples
- 🎯 Clearer setup instructions for different installation methods
- 🔍 Better troubleshooting guidance
- 📋 More comprehensive usage examples

### Fixed
- 🐛 Repository URL formatting in package.json
- 🔧 Binary path configuration for npm

## [1.0.0] - 2025-08-22

### Added
- 🎉 Initial release of shadcn/ui MCP Server
- 📦 50+ shadcn/ui components with full metadata
- 🏗️ 25+ pre-built UI blocks (authentication, dashboard, etc.)
- 🔧 12 MCP tools for comprehensive shadcn/ui integration
- ⚡ CLI integration for installing components and blocks
- 🎨 Demo code generation for all components
- 📋 Registry API integration for live source code fetching
- 🔍 Repository browsing and search capabilities
- 🛠️ Project management tools (init, status check)
- 📚 Comprehensive documentation and examples
- 🔒 TypeScript support with full type safety
- 🌐 npm package published as `@sherifbutt/shadcn-ui-mcp-server`

### Features
- **Component Tools**: list, get source, metadata, demo, install
- **Block Tools**: list, get source, install
- **Repository Tools**: browse, search
- **Project Tools**: init, status check
- **CLI Integration**: Full shadcn/ui CLI support
- **Error Handling**: Comprehensive MCP error codes
- **Documentation**: README, examples, troubleshooting guide