#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { getAllComponents, getComponentByName, getComponentsByCategory, searchComponents } from './data/components.js';
import { getAllBlocks, getBlockByName, getBlocksByCategory, searchBlocks } from './data/blocks.js';
import { RegistryService } from './services/registry.js';
import { CliService } from './services/cli.js';
import { generateComponentDemo, getAllDemosForComponent, formatDemoCode } from './utils/demos.js';
import { ProjectStatus } from './types/index.js';

// Tool input schemas
const ListComponentsSchema = z.object({
  category: z.string().optional(),
});

const GetComponentSchema = z.object({
  name: z.string(),
});

const GetComponentDemoSchema = z.object({
  name: z.string(),
  demoIndex: z.number().optional(),
});

const InstallComponentSchema = z.object({
  components: z.array(z.string()),
  force: z.boolean().optional(),
  cwd: z.string().optional(),
});

const ListBlocksSchema = z.object({
  category: z.string().optional(),
});

const GetBlockSchema = z.object({
  name: z.string(),
});

const InstallBlockSchema = z.object({
  name: z.string(),
  force: z.boolean().optional(),
  cwd: z.string().optional(),
});

const BrowseRepositorySchema = z.object({
  path: z.string().optional(),
});

const SearchRepositorySchema = z.object({
  query: z.string(),
  fileType: z.string().optional(),
});

const InitShadcnSchema = z.object({
  style: z.enum(['default', 'new-york']).optional(),
  typescript: z.boolean().optional(),
  tailwindConfig: z.string().optional(),
  componentsPath: z.string().optional(),
  force: z.boolean().optional(),
  cwd: z.string().optional(),
});

// Initialize services
const registryService = new RegistryService();
const cliService = new CliService();

// Create server instance
const server = new Server(
  {
    name: 'shadcn-ui-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_components',
        description: 'List all available shadcn/ui components with optional category filtering',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category (form, layout, navigation, overlay, feedback, data-display, disclosure, data-entry, typography)',
              enum: ['form', 'layout', 'navigation', 'overlay', 'feedback', 'data-display', 'disclosure', 'data-entry', 'typography']
            },
          },
        },
      },
      {
        name: 'get_component_source',
        description: 'Get the source code for a specific shadcn/ui component',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the component',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_component_metadata',
        description: 'Get metadata for a specific component including dependencies and description',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the component',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_component_demo',
        description: 'Get demo code and usage examples for a specific component',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the component',
            },
            demoIndex: {
              type: 'number',
              description: 'Index of the demo to retrieve (defaults to 0)',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'install_component',
        description: 'Install one or more shadcn/ui components using the CLI',
        inputSchema: {
          type: 'object',
          properties: {
            components: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of component names to install',
            },
            force: {
              type: 'boolean',
              description: 'Force overwrite existing files',
            },
            cwd: {
              type: 'string',
              description: 'Working directory for the command',
            },
          },
          required: ['components'],
        },
      },
      {
        name: 'list_blocks',
        description: 'List all available shadcn/ui blocks with optional category filtering',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category (authentication, dashboard, layout, charts, forms, ecommerce, marketing, application)',
              enum: ['authentication', 'dashboard', 'layout', 'charts', 'forms', 'ecommerce', 'marketing', 'application']
            },
          },
        },
      },
      {
        name: 'get_block_source',
        description: 'Get the complete source code for a shadcn/ui block',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the block',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'install_block',
        description: 'Install a shadcn/ui block with all its dependencies',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the block to install',
            },
            force: {
              type: 'boolean',
              description: 'Force overwrite existing files',
            },
            cwd: {
              type: 'string',
              description: 'Working directory for the command',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'browse_repository',
        description: 'Browse the shadcn/ui repository structure',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Repository path to browse (e.g., "apps/www/components")',
            },
          },
        },
      },
      {
        name: 'search_repository',
        description: 'Search for files or content in the shadcn/ui repository',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
            },
            fileType: {
              type: 'string',
              description: 'Filter by file type (e.g., "tsx", "ts", "css")',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'init_shadcn',
        description: 'Initialize shadcn/ui in a project',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['default', 'new-york'],
              description: 'Which style to use',
            },
            typescript: {
              type: 'boolean',
              description: 'Use TypeScript',
            },
            tailwindConfig: {
              type: 'string',
              description: 'Path to tailwind config',
            },
            componentsPath: {
              type: 'string',
              description: 'Path to components directory',
            },
            force: {
              type: 'boolean',
              description: 'Force init (skip checks)',
            },
            cwd: {
              type: 'string',
              description: 'Working directory',
            },
          },
        },
      },
      {
        name: 'check_project_status',
        description: 'Check the current project status and shadcn/ui configuration',
        inputSchema: {
          type: 'object',
          properties: {
            cwd: {
              type: 'string',
              description: 'Working directory to check',
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_components': {
        const { category } = ListComponentsSchema.parse(args);
        const components = category 
          ? getComponentsByCategory(category)
          : getAllComponents();
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                count: components.length,
                components: components.map(c => ({
                  name: c.name,
                  description: c.description,
                  category: c.category,
                  dependencies: c.dependencies
                }))
              }, null, 2)
            }
          ]
        };
      }

      case 'get_component_source': {
        const { name: componentName } = GetComponentSchema.parse(args);
        const component = getComponentByName(componentName);
        
        if (!component) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Component "${componentName}" not found`
          );
        }

        try {
          const registryItem = await registryService.fetchComponent(componentName);
          const source = registryService.getComponentSource(registryItem);
          
          return {
            content: [
              {
                type: 'text',
                text: source
              }
            ]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InternalError,
            `Failed to fetch component source: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
        }
      }

      case 'get_component_metadata': {
        const { name: componentName } = GetComponentSchema.parse(args);
        const component = getComponentByName(componentName);
        
        if (!component) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Component "${componentName}" not found`
          );
        }

        try {
          const registryItem = await registryService.fetchComponent(componentName);
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  name: component.name,
                  description: component.description,
                  category: component.category,
                  dependencies: registryService.getDependencies(registryItem),
                  devDependencies: registryService.getDevDependencies(registryItem),
                  registryDependencies: registryService.getRegistryDependencies(registryItem),
                  files: registryService.getAllFiles(registryItem).map(f => f.name),
                  tailwindConfig: registryService.getTailwindConfig(registryItem),
                  cssVars: registryService.getCssVars(registryItem)
                }, null, 2)
              }
            ]
          };
        } catch (error) {
          // Fallback to local metadata if registry fetch fails
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  name: component.name,
                  description: component.description,
                  category: component.category,
                  dependencies: component.dependencies,
                  registryUrl: component.registryUrl
                }, null, 2)
              }
            ]
          };
        }
      }

      case 'get_component_demo': {
        const { name: componentName, demoIndex } = GetComponentDemoSchema.parse(args);
        const component = getComponentByName(componentName);
        
        if (!component) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Component "${componentName}" not found`
          );
        }

        const demo = generateComponentDemo(componentName, demoIndex || 0);
        
        if (!demo) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `No demo available for component "${componentName}"`
          );
        }

        const formattedCode = formatDemoCode(demo);
        const allDemos = getAllDemosForComponent(componentName);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                component: componentName,
                currentDemo: demo,
                formattedCode,
                availableDemos: allDemos.length,
                allDemos: allDemos.map(d => ({
                  name: d.name,
                  description: d.description
                }))
              }, null, 2)
            }
          ]
        };
      }

      case 'install_component': {
        const { components, force, cwd } = InstallComponentSchema.parse(args);
        
        // Validate all components exist
        for (const comp of components) {
          if (!getComponentByName(comp)) {
            throw new McpError(
              ErrorCode.InvalidRequest,
              `Component "${comp}" not found`
            );
          }
        }

        const result = await cliService.add(components, { force, cwd, yes: true });
        const parsed = cliService.parseCliOutput(result.output);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: result.success,
                installed: parsed.installed || components,
                skipped: parsed.skipped || [],
                errors: parsed.errors || (result.error ? [result.error] : []),
                output: result.output,
                command: `npx shadcn-ui@latest add ${components.join(' ')}`
              }, null, 2)
            }
          ]
        };
      }

      case 'list_blocks': {
        const { category } = ListBlocksSchema.parse(args);
        const blocks = category 
          ? getBlocksByCategory(category)
          : getAllBlocks();
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                count: blocks.length,
                blocks: blocks.map(b => ({
                  name: b.name,
                  description: b.description,
                  category: b.category,
                  components: b.components,
                  dependencies: b.dependencies
                }))
              }, null, 2)
            }
          ]
        };
      }

      case 'get_block_source': {
        const { name: blockName } = GetBlockSchema.parse(args);
        const block = getBlockByName(blockName);
        
        if (!block) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Block "${blockName}" not found`
          );
        }

        try {
          const registryItem = await registryService.fetchBlock(blockName);
          const files = registryService.getAllFiles(registryItem);
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  name: blockName,
                  description: block.description,
                  files: files.map(f => ({
                    name: f.name,
                    content: f.content
                  })),
                  dependencies: registryService.getDependencies(registryItem),
                  registryDependencies: registryService.getRegistryDependencies(registryItem),
                  components: block.components
                }, null, 2)
              }
            ]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InternalError,
            `Failed to fetch block source: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
        }
      }

      case 'install_block': {
        const { name: blockName, force, cwd } = InstallBlockSchema.parse(args);
        const block = getBlockByName(blockName);
        
        if (!block) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Block "${blockName}" not found`
          );
        }

        // Install required components first
        if (block.components.length > 0) {
          const compResult = await cliService.add(block.components, { force, cwd, yes: true });
          if (!compResult.success) {
            throw new McpError(
              ErrorCode.InternalError,
              `Failed to install required components: ${compResult.error}`
            );
          }
        }

        // Install the block
        const result = await cliService.add([blockName], { force, cwd, yes: true });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: result.success,
                block: blockName,
                installedComponents: block.components,
                output: result.output,
                error: result.error,
                command: `npx shadcn-ui@latest add ${blockName}`
              }, null, 2)
            }
          ]
        };
      }

      case 'browse_repository': {
        const { path } = BrowseRepositorySchema.parse(args);
        
        // Simulated repository structure
        const repoStructure = {
          'apps/www/components': [
            'ui/',
            'examples/',
            'blocks/',
            'docs/',
            'layouts/',
            'lib/'
          ],
          'apps/www/components/ui': getAllComponents().map(c => `${c.name}.tsx`),
          'apps/www/components/blocks': getAllBlocks().map(b => `${b.name}/`),
          'apps/www/registry': [
            'default/',
            'new-york/',
            'index.json'
          ]
        };
        
        const contents = repoStructure[path as keyof typeof repoStructure] || ['File not found'];
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                path: path || '/',
                contents,
                type: 'directory'
              }, null, 2)
            }
          ]
        };
      }

      case 'search_repository': {
        const { query, fileType } = SearchRepositorySchema.parse(args);
        
        // Search components and blocks
        const componentMatches = searchComponents(query);
        const blockMatches = searchBlocks(query);
        
        const results = [
          ...componentMatches.map(c => ({
            path: `apps/www/components/ui/${c.name}.tsx`,
            type: 'component',
            name: c.name,
            description: c.description
          })),
          ...blockMatches.map(b => ({
            path: `apps/www/components/blocks/${b.name}/`,
            type: 'block',
            name: b.name,
            description: b.description
          }))
        ];
        
        // Filter by file type if specified
        const filtered = fileType 
          ? results.filter(r => r.path.endsWith(`.${fileType}`))
          : results;
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                query,
                fileType,
                count: filtered.length,
                results: filtered
              }, null, 2)
            }
          ]
        };
      }

      case 'init_shadcn': {
        const params = InitShadcnSchema.parse(args);
        
        const result = await cliService.init({
          ...params,
          yes: true,
          defaults: true
        });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: result.success,
                output: result.output,
                error: result.error,
                command: 'npx shadcn-ui@latest init'
              }, null, 2)
            }
          ]
        };
      }

      case 'check_project_status': {
        const { cwd } = args as { cwd?: string };
        
        const projectInfo = await cliService.getProjectInfo(cwd);
        
        // Try to read components.json config
        let componentsJson = null;
        try {
          const configCheck = await cliService['executeCommand']('cat', ['components.json'], { cwd });
          if (configCheck.success) {
            componentsJson = JSON.parse(configCheck.output);
          }
        } catch {
          // Config doesn't exist
        }
        
        const status: ProjectStatus = {
          initialized: !!componentsJson,
          framework: projectInfo.framework as any,
          tailwindInstalled: projectInfo.hasTailwind,
          typescript: projectInfo.hasTypeScript,
          componentsInstalled: [],
          blocksInstalled: [],
          style: componentsJson?.style || 'default',
          tailwindConfig: componentsJson?.tailwind?.config,
          tailwindCss: componentsJson?.tailwind?.css,
          aliases: componentsJson?.aliases
        };
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status,
                projectInfo,
                componentsJson,
                recommendation: !status.initialized 
                  ? 'Run init_shadcn to initialize shadcn/ui in this project'
                  : 'Project is ready for shadcn/ui components'
              }, null, 2)
            }
          ]
        };
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    
    if (error instanceof z.ZodError) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      );
    }
    
    throw new McpError(
      ErrorCode.InternalError,
      `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('shadcn/ui MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});