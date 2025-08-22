import { spawn } from 'child_process';
import { CliOptions } from '../types/index.js';

export interface CliResult {
  success: boolean;
  output: string;
  error?: string;
}

export class CliService {
  private async executeCommand(
    command: string,
    args: string[],
    options: { cwd?: string; timeout?: number } = {}
  ): Promise<CliResult> {
    return new Promise((resolve) => {
      const child = spawn(command, args, {
        cwd: options.cwd || process.cwd(),
        shell: true,
        env: { ...process.env, FORCE_COLOR: '0' }
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        error += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          success: code === 0,
          output,
          error: error || undefined
        });
      });

      child.on('error', (err) => {
        resolve({
          success: false,
          output,
          error: err.message
        });
      });

      // Handle timeout
      if (options.timeout) {
        setTimeout(() => {
          child.kill('SIGTERM');
          resolve({
            success: false,
            output,
            error: 'Command timed out'
          });
        }, options.timeout);
      }
    });
  }

  async init(options: CliOptions = {}): Promise<CliResult> {
    const args = ['shadcn@latest', 'init'];

    if (options.yes) args.push('--yes');
    if (options.defaults) args.push('--defaults');
    if (options.force) args.push('--force');
    if (options.typescript !== undefined) args.push(options.typescript ? '--typescript' : '--no-typescript');
    if (options.style) args.push('--style', options.style);
    if (options.tailwindConfig) args.push('--tailwind-config', options.tailwindConfig);
    if (options.tailwindCss) args.push('--tailwind-css', options.tailwindCss);
    if (options.componentsPath) args.push('--components', options.componentsPath);

    return this.executeCommand('npx', args, { 
      cwd: options.cwd,
      timeout: 120000 // 2 minutes timeout for init
    });
  }

  async add(components: string[], options: CliOptions = {}): Promise<CliResult> {
    const args = ['shadcn@latest', 'add', ...components];

    if (options.yes) args.push('--yes');
    if (options.force) args.push('--force');
    if (options.silent) args.push('--silent');

    return this.executeCommand('npx', args, { 
      cwd: options.cwd,
      timeout: 60000 // 1 minute timeout for add
    });
  }

  async diff(component: string, options: CliOptions = {}): Promise<CliResult> {
    const args = ['shadcn@latest', 'diff', component];

    if (options.yes) args.push('--yes');

    return this.executeCommand('npx', args, { 
      cwd: options.cwd,
      timeout: 30000 // 30 seconds timeout for diff
    });
  }

  async checkDependencies(cwd?: string): Promise<CliResult> {
    // Check if package.json exists
    const checkPackageJson = await this.executeCommand('test', ['-f', 'package.json'], { cwd });
    
    if (!checkPackageJson.success) {
      return {
        success: false,
        output: '',
        error: 'No package.json found. Please run npm init first.'
      };
    }

    // Check if tailwindcss is installed
    const checkTailwind = await this.executeCommand('npm', ['list', 'tailwindcss', '--json'], { cwd });
    
    return checkTailwind;
  }

  async getProjectInfo(cwd?: string): Promise<{
    hasTailwind: boolean;
    hasTypeScript: boolean;
    framework: string | null;
  }> {
    const tailwindCheck = await this.executeCommand('npm', ['list', 'tailwindcss', '--json'], { cwd });
    const hasTailwind = tailwindCheck.success && !tailwindCheck.output.includes('"empty":true');

    const tsCheck = await this.executeCommand('test', ['-f', 'tsconfig.json'], { cwd });
    const hasTypeScript = tsCheck.success;

    // Detect framework
    let framework = null;
    const packageJsonCheck = await this.executeCommand('cat', ['package.json'], { cwd });
    
    if (packageJsonCheck.success) {
      const packageContent = packageJsonCheck.output;
      if (packageContent.includes('"next"')) framework = 'next';
      else if (packageContent.includes('"vite"')) framework = 'vite';
      else if (packageContent.includes('"remix"')) framework = 'remix';
      else if (packageContent.includes('"gatsby"')) framework = 'gatsby';
      else if (packageContent.includes('"astro"')) framework = 'astro';
    }

    return {
      hasTailwind,
      hasTypeScript,
      framework
    };
  }

  parseCliOutput(output: string): {
    installed?: string[];
    skipped?: string[];
    errors?: string[];
  } {
    const lines = output.split('\n');
    const result: {
      installed?: string[];
      skipped?: string[];
      errors?: string[];
    } = {};

    let currentSection: 'installed' | 'skipped' | 'errors' | null = null;

    for (const line of lines) {
      if (line.includes('Installing')) {
        currentSection = 'installed';
        result.installed = [];
      } else if (line.includes('Skipping')) {
        currentSection = 'skipped';
        result.skipped = [];
      } else if (line.includes('Error') || line.includes('Failed')) {
        currentSection = 'errors';
        result.errors = [];
      } else if (currentSection && line.trim().startsWith('-')) {
        const item = line.trim().substring(1).trim();
        if (currentSection === 'installed' && result.installed) {
          result.installed.push(item);
        } else if (currentSection === 'skipped' && result.skipped) {
          result.skipped.push(item);
        } else if (currentSection === 'errors' && result.errors) {
          result.errors.push(item);
        }
      }
    }

    return result;
  }
}