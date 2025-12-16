#!/bin/bash

# ===========================================
# Azure Deployment Script for Spatial Website
# ===========================================
# 
# Prerequisites:
#   1. Azure CLI installed: brew install azure-cli
#   2. Docker installed and running
#   3. Logged into Azure: az login
#
# Usage:
#   ./azure/deploy.sh              # First-time setup + deploy
#   ./azure/deploy.sh deploy-only  # Just deploy (resources exist)
#   ./azure/deploy.sh setup-only   # Just create Azure resources
#
# ===========================================

set -e  # Exit on any error

# =====================
# CONFIGURATION
# =====================
# Change these values for your deployment!

RESOURCE_GROUP="spatial-website-rg"
LOCATION="westus2"
APP_NAME="spatial-website"
ACR_NAME="spatialwebsiteacr"  # Must be globally unique, lowercase, no hyphens
PLAN_NAME="spatial-website-plan"
MONGODB_NAME="spatial-cosmos-db"  # For Cosmos DB with MongoDB API

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo_step() {
    echo -e "${BLUE}==>${NC} ${GREEN}$1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# =====================
# CHECK PREREQUISITES
# =====================
check_prerequisites() {
    echo_step "Checking prerequisites..."
    
    # Check Azure CLI
    if ! command -v az &> /dev/null; then
        echo_error "Azure CLI not found. Install with: brew install azure-cli"
        exit 1
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo_error "Docker not found. Please install Docker Desktop."
        exit 1
    fi
    
    # Check if logged into Azure
    if ! az account show &> /dev/null; then
        echo_warning "Not logged into Azure. Running 'az login'..."
        az login
    fi
    
    echo_success "Prerequisites satisfied!"
}

# =====================
# SELECT SUBSCRIPTION
# =====================
select_subscription() {
    echo_step "Selecting Azure subscription..."
    
    # List available subscriptions
    echo ""
    echo "Available subscriptions:"
    echo "------------------------"
    az account list --query "[].{Name:name, ID:id, IsDefault:isDefault}" --output table
    echo ""
    
    # Get current subscription
    CURRENT_SUB=$(az account show --query "name" --output tsv)
    echo -e "Current subscription: ${YELLOW}$CURRENT_SUB${NC}"
    echo ""
    
    read -p "Enter subscription ID or name to use (or press Enter to keep current): " SUB_CHOICE
    
    if [ -n "$SUB_CHOICE" ]; then
        echo "Switching to subscription: $SUB_CHOICE"
        az account set --subscription "$SUB_CHOICE"
        NEW_SUB=$(az account show --query "name" --output tsv)
        echo_success "Now using subscription: $NEW_SUB"
    else
        echo_success "Keeping current subscription: $CURRENT_SUB"
    fi
    echo ""
}

# =====================
# CREATE AZURE RESOURCES
# =====================
create_resources() {
    echo_step "Checking/Creating Azure resources..."
    
    # Create Resource Group (if not exists)
    if az group show --name $RESOURCE_GROUP &> /dev/null; then
        echo "✓ Resource group '$RESOURCE_GROUP' already exists"
    else
        echo "Creating resource group: $RESOURCE_GROUP..."
        az group create \
            --name $RESOURCE_GROUP \
            --location $LOCATION \
            --output none
        echo_success "Resource group created"
    fi
    
    # Create Azure Container Registry (if not exists)
    # Check both in resource group and globally (ACR names are globally unique)
    if az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP &> /dev/null; then
        echo "✓ Container registry '$ACR_NAME' already exists in resource group"
    elif az acr check-name --name $ACR_NAME --query "nameAvailable" -o tsv 2>/dev/null | grep -q "false"; then
        echo_warning "Container registry '$ACR_NAME' exists globally (possibly in another subscription)"
        echo "Attempting to use existing registry..."
        # Try to import it or just continue - it might be accessible
    else
        echo "Creating container registry: $ACR_NAME..."
        az acr create \
            --resource-group $RESOURCE_GROUP \
            --name $ACR_NAME \
            --sku Basic \
            --admin-enabled true \
            --output none
        echo_success "Container registry created"
    fi
    
    # Create App Service Plan (if not exists)
    if az appservice plan show --name $PLAN_NAME --resource-group $RESOURCE_GROUP &> /dev/null; then
        echo "✓ App Service plan '$PLAN_NAME' already exists"
    else
        echo "Creating App Service plan: $PLAN_NAME..."
        az appservice plan create \
            --name $PLAN_NAME \
            --resource-group $RESOURCE_GROUP \
            --sku B1 \
            --is-linux \
            --output none
        echo_success "App Service plan created"
    fi
    
    echo_success "Azure resources ready!"
}

# =====================
# BUILD AND PUSH IMAGE
# =====================
build_and_push() {
    echo_step "Building and pushing Docker image..."
    
    # Ensure admin access is enabled on the registry
    echo "Enabling admin access on registry..."
    az acr update --name $ACR_NAME --resource-group $RESOURCE_GROUP --admin-enabled true --output none
    
    # Get ACR credentials
    echo "Fetching registry credentials..."
    ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "loginServer" --output tsv)
    ACR_USERNAME=$(az acr credential show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "username" --output tsv)
    ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "passwords[0].value" --output tsv)
    
    if [ -z "$ACR_PASSWORD" ]; then
        echo_error "Failed to get ACR credentials. Trying az acr login instead..."
        az acr login --name $ACR_NAME
    else
        # Login to ACR with credentials
        echo "Logging into Azure Container Registry..."
        echo $ACR_PASSWORD | docker login $ACR_LOGIN_SERVER -u $ACR_USERNAME --password-stdin
    fi
    
    # Build the image
    echo "Building Docker image..."
    docker build -t $ACR_LOGIN_SERVER/$APP_NAME:latest .
    
    # Push to ACR
    echo "Pushing image to ACR..."
    docker push $ACR_LOGIN_SERVER/$APP_NAME:latest
    
    echo_success "Image pushed to $ACR_LOGIN_SERVER/$APP_NAME:latest"
}

# =====================
# DEPLOY TO APP SERVICE
# =====================
deploy_app() {
    echo_step "Deploying to Azure App Service..."
    
    ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "loginServer" --output tsv)
    ACR_USERNAME=$(az acr credential show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "username" --output tsv)
    ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "passwords[0].value" --output tsv)
    
    # Check if web app exists
    if az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP &> /dev/null; then
        echo "Updating existing web app..."
        az webapp config container set \
            --name $APP_NAME \
            --resource-group $RESOURCE_GROUP \
            --container-image-name $ACR_LOGIN_SERVER/$APP_NAME:latest \
            --container-registry-url https://$ACR_LOGIN_SERVER \
            --container-registry-user $ACR_USERNAME \
            --container-registry-password $ACR_PASSWORD \
            --output none
    else
        echo "Creating new web app..."
        # Create the web app first
        az webapp create \
            --name $APP_NAME \
            --resource-group $RESOURCE_GROUP \
            --plan $PLAN_NAME \
            --deployment-container-image-name $ACR_LOGIN_SERVER/$APP_NAME:latest \
            --output none
        
        # Then configure the container registry credentials
        az webapp config container set \
            --name $APP_NAME \
            --resource-group $RESOURCE_GROUP \
            --container-image-name $ACR_LOGIN_SERVER/$APP_NAME:latest \
            --container-registry-url https://$ACR_LOGIN_SERVER \
            --container-registry-user $ACR_USERNAME \
            --container-registry-password $ACR_PASSWORD \
            --output none
    fi
    
    # Enable continuous deployment
    az webapp deployment container config \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --enable-cd true \
        --output none
    
    echo_success "App deployed!"
}

# =====================
# CONFIGURE APP SETTINGS
# =====================
configure_app() {
    echo_step "Configuring app settings..."
    
    echo_warning "You need to set environment variables manually!"
    echo ""
    echo "Run this command with YOUR values:"
    echo ""
    echo -e "${YELLOW}az webapp config appsettings set \\
    --name $APP_NAME \\
    --resource-group $RESOURCE_GROUP \\
    --settings \\
        NODE_ENV=production \\
        PORT=3001 \\
        WEBSITES_PORT=3001 \\
        MONGODB_URI=\"YOUR_MONGODB_CONNECTION_STRING\" \\
        JWT_SECRET=\"YOUR_JWT_SECRET\" \\
        USE_AZURE_STORAGE=true \\
        AZURE_STORAGE_CONNECTION_STRING=\"YOUR_STORAGE_CONNECTION_STRING\" \\
        AZURE_CONTAINER_NAME=spatial-images \\
        ADMIN_EMAIL=\"YOUR_ADMIN_EMAIL\" \\
        ADMIN_PASSWORD=\"YOUR_ADMIN_PASSWORD\"${NC}"
    echo ""
    
    # Set basic settings
    az webapp config appsettings set \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --settings \
            NODE_ENV=production \
            PORT=3001 \
            WEBSITES_PORT=3001 \
        --output none
    
    echo_success "Basic settings configured!"
}

# =====================
# PRINT STATUS
# =====================
print_status() {
    echo ""
    echo "============================================"
    echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
    echo "============================================"
    echo ""
    
    APP_URL=$(az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP --query "defaultHostName" --output tsv 2>/dev/null || echo "")
    
    if [ -n "$APP_URL" ]; then
        echo -e "🌐 Your app URL: ${BLUE}https://$APP_URL${NC}"
    fi
    
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Set up MongoDB (MongoDB Atlas or Azure Cosmos DB)"
    echo "   2. Configure environment variables (see command above)"
    echo "   3. Seed your database"
    echo ""
    echo "📊 View logs:"
    echo "   az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP"
    echo ""
    echo "🔄 Redeploy after changes:"
    echo "   ./azure/deploy.sh deploy-only"
    echo ""
}

# =====================
# MAIN
# =====================
main() {
    echo ""
    echo "============================================"
    echo "  Azure Deployment for Spatial Website"
    echo "============================================"
    echo ""
    
    check_prerequisites
    select_subscription
    
    case "${1:-full}" in
        "setup-only")
            create_resources
            ;;
        "deploy-only")
            build_and_push
            deploy_app
            print_status
            ;;
        "config-only")
            configure_app
            ;;
        "full"|*)
            create_resources
            build_and_push
            deploy_app
            configure_app
            print_status
            ;;
    esac
}

main "$@"

