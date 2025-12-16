#!/usr/bin/env node
/**
 * Azure Blob Storage Setup Script
 * 
 * This script helps you set up Azure Blob Storage for your application.
 * It creates a storage account, container, and generates the connection string.
 * 
 * Prerequisites:
 * - Azure CLI installed (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
 * - Azure subscription
 * 
 * Usage:
 *   node azure/azureBlobSetup.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function executeCommand(command, description) {
  console.log(`\n📋 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    console.log('✓ Success');
    return output;
  } catch (error) {
    console.error(`✗ Failed: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log('🌟 Azure Blob Storage Setup for Spatial Website\n');
  console.log('This script will help you create and configure Azure Blob Storage.\n');

  try {
    // Check if Azure CLI is installed
    console.log('🔍 Checking Azure CLI installation...');
    executeCommand('az --version', 'Verifying Azure CLI');

    // Check if logged in
    try {
      executeCommand('az account show', 'Checking Azure login status');
    } catch (error) {
      console.log('\n⚠️  You are not logged in to Azure.');
      console.log('Please login now...');
      executeCommand('az login', 'Logging in to Azure');
    }

    // Get configuration
    const resourceGroup = await prompt('\n📦 Enter resource group name (or press Enter for "spatial-website-rg"): ') || 'spatial-website-rg';
    const location = await prompt('🌍 Enter Azure region (or press Enter for "westus2"): ') || 'westus2';
    const storageAccountName = await prompt('💾 Enter storage account name (lowercase, no spaces): ');
    
    if (!storageAccountName || !/^[a-z0-9]+$/.test(storageAccountName)) {
      throw new Error('Storage account name must contain only lowercase letters and numbers');
    }

    const containerName = await prompt('📁 Enter container name (or press Enter for "spatial-images"): ') || 'spatial-images';

    console.log('\n📋 Configuration Summary:');
    console.log(`   Resource Group: ${resourceGroup}`);
    console.log(`   Location: ${location}`);
    console.log(`   Storage Account: ${storageAccountName}`);
    console.log(`   Container: ${containerName}`);

    const confirm = await prompt('\n✅ Continue with this configuration? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }

    // Create resource group
    executeCommand(
      `az group create --name ${resourceGroup} --location ${location}`,
      'Creating resource group'
    );

    // Create storage account
    executeCommand(
      `az storage account create --name ${storageAccountName} --resource-group ${resourceGroup} --location ${location} --sku Standard_LRS --kind StorageV2`,
      'Creating storage account'
    );

    // Get connection string
    const connectionString = executeCommand(
      `az storage account show-connection-string --name ${storageAccountName} --resource-group ${resourceGroup} --output tsv`,
      'Retrieving connection string'
    ).trim();

    // Create container
    executeCommand(
      `az storage container create --name ${containerName} --connection-string "${connectionString}" --public-access blob`,
      'Creating blob container with public read access'
    );

    // Update .env file
    const envPath = path.join(__dirname, '..', 'server', '.env');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }

    // Remove old Azure config if exists
    envContent = envContent.split('\n').filter(line => 
      !line.startsWith('USE_AZURE_STORAGE=') && 
      !line.startsWith('AZURE_STORAGE_CONNECTION_STRING=') &&
      !line.startsWith('AZURE_CONTAINER_NAME=')
    ).join('\n');

    // Add new Azure config
    envContent += `\n\n# Azure Blob Storage Configuration\n`;
    envContent += `USE_AZURE_STORAGE=true\n`;
    envContent += `AZURE_STORAGE_CONNECTION_STRING="${connectionString}"\n`;
    envContent += `AZURE_CONTAINER_NAME=${containerName}\n`;

    fs.writeFileSync(envPath, envContent);

    console.log('\n✨ Setup Complete! ✨\n');
    console.log('📝 Configuration saved to server/.env');
    console.log('\n🔑 Your Azure Blob Storage Details:');
    console.log(`   Resource Group: ${resourceGroup}`);
    console.log(`   Storage Account: ${storageAccountName}`);
    console.log(`   Container: ${containerName}`);
    console.log(`   Connection String: ${connectionString.substring(0, 50)}...`);
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Restart your server to use Azure Blob Storage');
    console.log('   2. Upload images will now be stored in Azure');
    console.log('   3. Monitor your storage at: https://portal.azure.com');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Make sure Azure CLI is installed: https://aka.ms/installazurecliwindows');
    console.log('   - Verify you have an active Azure subscription');
    console.log('   - Check that the storage account name is globally unique');
  } finally {
    rl.close();
  }
}

main();


