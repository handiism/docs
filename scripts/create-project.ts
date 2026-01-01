#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to convert to kebab-case
function toKebabCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Layer configuration
interface LayerConfig {
  name: string;
  prefix: string;
  description: string;
}

const AVAILABLE_LAYERS: LayerConfig[] = [
  { name: 'Planning', prefix: '00', description: 'PRD, TRD, Research' },
  { name: 'Web Frontend', prefix: '10', description: 'Web Applications' },
  { name: 'Mobile App', prefix: '10', description: 'Mobile Applications' },
  { name: 'Backend', prefix: '20', description: 'Backend Services' },
  { name: 'Infrastructure', prefix: '30', description: 'Infrastructure & DevOps' },
  { name: 'Testing', prefix: '40', description: 'Testing & QA' },
  { name: 'Incidents', prefix: '99', description: 'Post-Mortems' },
];

async function main() {
  console.log('\n🚀 Techave Docs - Project Scaffolding Tool\n');

  // Prompt for project name
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      validate: (input: string) => {
        if (!input.trim()) {
          return 'Project name cannot be empty';
        }
        return true;
      },
    },
  ]);

  const projectSlug = toKebabCase(projectName);
  console.log(`\n✓ Project slug: ${projectSlug}\n`);

  // Prompt for layers
  const { selectedLayers } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedLayers',
      message: 'Which layers does your project need?',
      choices: AVAILABLE_LAYERS.map((layer) => ({
        name: `${layer.name} (${layer.description})`,
        value: layer,
        checked: ['Planning', 'Incidents'].includes(layer.name), // Default selections
      })),
      validate: (choices: LayerConfig[]) => {
        if (choices.length === 0) {
          return 'You must select at least one layer';
        }
        return true;
      },
    },
  ]);

  // Count backend services if backend is selected
  let backendCount = 1;
  const hasBackend = selectedLayers.some((layer: LayerConfig) => layer.name === 'Backend');
  
  if (hasBackend) {
    const { count } = await inquirer.prompt([
      {
        type: 'number',
        name: 'count',
        message: 'How many backend services?',
        default: 1,
        validate: (input: number) => {
          if (input < 1) {
            return 'Must have at least 1 backend service';
          }
          return true;
        },
      },
    ]);
    backendCount = count;
  }

  // Get backend service names if multiple
  let backendServices: string[] = ['core'];
  if (hasBackend && backendCount > 1) {
    const { services } = await inquirer.prompt([
      {
        type: 'input',
        name: 'services',
        message: `Enter ${backendCount} backend service names (comma-separated):`,
        default: 'core,auth,api',
        validate: (input: string) => {
          const names = input.split(',').map(s => s.trim()).filter(Boolean);
          if (names.length !== backendCount) {
            return `Please provide exactly ${backendCount} service names`;
          }
          return true;
        },
      },
    ]);
    backendServices = services.split(',').map((s: string) => toKebabCase(s.trim()));
  }

  // Confirm before creating
  console.log('\n📋 Project Summary:');
  console.log(`   Name: ${projectName}`);
  console.log(`   Slug: ${projectSlug}`);
  console.log(`   Layers: ${selectedLayers.map((l: LayerConfig) => l.name).join(', ')}`);
  if (hasBackend) {
    console.log(`   Backend Services: ${backendServices.join(', ')}`);
  }
  console.log('');

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Create this project?',
      default: true,
    },
  ]);

  if (!confirm) {
    console.log('\n❌ Project creation cancelled\n');
    return;
  }

  // Create project structure
  const projectPath = path.join(__dirname, '..', 'docs', 'projects', projectSlug);

  if (await fs.pathExists(projectPath)) {
    console.log(`\n❌ Error: Project "${projectSlug}" already exists at ${projectPath}\n`);
    return;
  }

  console.log('\n🔨 Creating project structure...\n');

  // Create project root
  await fs.ensureDir(projectPath);

  // Create folders for each selected layer
  const folderStructure: { path: string; name: string; description: string }[] = [];

  for (const layer of selectedLayers) {
    if (layer.name === 'Backend' && backendCount > 0) {
      // Create multiple backend folders
      for (const serviceName of backendServices) {
        const folderName = `${layer.prefix}-backend-${serviceName}`;
        const folderPath = path.join(projectPath, folderName);
        await fs.ensureDir(folderPath);
        
        // Create index.md for each backend service
        const indexContent = `# Backend - ${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}

This section contains documentation for the ${serviceName} backend service.

## Contents

- API documentation
- Database schema
- Service architecture
- Deployment guides
`;
        await fs.writeFile(path.join(folderPath, 'index.md'), indexContent);
        
        folderStructure.push({
          path: folderName,
          name: `Backend - ${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}`,
          description: `${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} backend service`,
        });
        
        console.log(`   ✓ Created ${folderName}/`);
      }
    } else {
      // Create single folder for other layers
      const folderName = `${layer.prefix}-${toKebabCase(layer.name)}`;
      const folderPath = path.join(projectPath, folderName);
      await fs.ensureDir(folderPath);

      // Create index.md for the layer
      const indexContent = `# ${layer.name}

This section contains ${layer.description.toLowerCase()}.

## Contents

Add your documentation here.
`;
      await fs.writeFile(path.join(folderPath, 'index.md'), indexContent);

      folderStructure.push({
        path: folderName,
        name: layer.name,
        description: layer.description,
      });

      console.log(`   ✓ Created ${folderName}/`);

      // Special handling for incidents folder
      if (layer.name === 'Incidents') {
        // Create _category_.yml
        const categoryYml = `label: 'Incidents'
position: 99
link:
  type: generated-index
  title: 'Incident Reports'
  description: 'A list of all incident reports for ${projectName}.'
  slug: '/projects/${projectSlug}/incidents'
`;
        await fs.writeFile(path.join(folderPath, '_category_.yml'), categoryYml);
        console.log(`   ✓ Created ${folderName}/_category_.yml`);

        // Copy incident template
        const templateSource = path.join(__dirname, '..', 'docs', 'projects', 'project-a-superapp', '99-incidents', 'template-incident.md');
        const templateDest = path.join(folderPath, 'template-incident.md');
        
        if (await fs.pathExists(templateSource)) {
          await fs.copy(templateSource, templateDest);
          console.log(`   ✓ Created ${folderName}/template-incident.md`);
        }
      }
    }
  }

  // Create project index.md with table
  const tableRows = folderStructure
    .map((folder) => `| [${folder.name}](./${folder.path}/index.md) | ${folder.description} |`)
    .join('\n');

  const projectIndexContent = `# ${projectName}

Welcome to the **${projectName}** documentation.

## Project Structure

| Section | Description |
|---------|-------------|
${tableRows}

## Overview

This documentation is organized into numbered sections that control the sidebar order:
- \`00-\` prefix: Planning and specifications
- \`10-\` prefix: Frontend applications
- \`20-\` prefix: Backend services
- \`30-\` prefix: Infrastructure and DevOps
- \`40-\` prefix: Testing and QA
- \`99-\` prefix: Incidents and post-mortems

Navigate using the sidebar to explore each section in detail.
`;

  await fs.writeFile(path.join(projectPath, 'index.md'), projectIndexContent);
  console.log(`   ✓ Created index.md`);

  console.log('\n✅ Project created successfully!\n');
  console.log('📝 Next steps:');
  console.log(`   1. Add your project to the navbar in docusaurus.config.ts:`);
  console.log(`      {`);
  console.log(`        label: '${projectName}',`);
  console.log(`        to: '/docs/projects/${projectSlug}',`);
  console.log(`      }`);
  console.log(`   2. Start the dev server: pnpm run start`);
  console.log(`   3. Navigate to: http://localhost:3000/docs/projects/${projectSlug}`);
  console.log('');
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
