#!/bin/bash

# ===========================================
# Seed Production Database
# ===========================================
# 
# This script runs the seeder against your production MongoDB.
# 
# Prerequisites:
#   1. MongoDB connection string configured
#   2. Node.js installed locally
#
# Usage:
#   MONGODB_URI="your-production-uri" ./azure/seed-production.sh
#
# ===========================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ -z "$MONGODB_URI" ]; then
    echo -e "${RED}❌ MONGODB_URI environment variable is required!${NC}"
    echo ""
    echo "Usage:"
    echo "  MONGODB_URI=\"mongodb+srv://...\" ./azure/seed-production.sh"
    echo ""
    echo "For MongoDB Atlas:"
    echo "  - Go to your cluster > Connect > Connect your application"
    echo "  - Copy the connection string"
    echo "  - Replace <password> with your actual password"
    exit 1
fi

echo -e "${YELLOW}⚠️  WARNING: This will seed your PRODUCTION database!${NC}"
echo "Connection: ${MONGODB_URI:0:30}..."
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

echo -e "${GREEN}Seeding production database...${NC}"

cd "$(dirname "$0")/../server"

# Run the seed script (uses runSeed.js which properly connects and runs)
MONGODB_URI="$MONGODB_URI" NODE_ENV="production" node seeders/runSeed.js

