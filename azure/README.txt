========================================
Azure Blob Storage for Spatial Website
========================================

This folder contains Azure Blob Storage setup and utility scripts.

📁 Files:
---------
1. azureBlobSetup.js    - Interactive setup script to create Azure resources
2. azureBlobClient.js   - Clean API wrapper for blob operations
3. README.txt           - This file

🚀 Quick Start:
---------------

Option 1: Automated Setup (Recommended)
----------------------------------------
1. Install Azure CLI: https://aka.ms/installazurecli
2. Run setup script:
   
   node azure/azureBlobSetup.js

3. Follow the prompts to create your storage account
4. The script will automatically update your .env file
5. Restart your server


Option 2: Manual Setup
----------------------
1. Go to Azure Portal: https://portal.azure.com
2. Create a Storage Account:
   - Click "Create a resource"
   - Search for "Storage account"
   - Fill in details:
     * Resource group: spatial-website-rg
     * Storage account name: <your-unique-name>
     * Region: West US 2 (or your preference)
     * Performance: Standard
     * Redundancy: LRS
   
3. Create a container:
   - Go to your storage account
   - Click "Containers" in the left menu
   - Click "+ Container"
   - Name: spatial-images
   - Public access level: Blob (public read access for blobs)

4. Get connection string:
   - In your storage account, go to "Access keys"
   - Copy "Connection string" from key1 or key2

5. Update server/.env:
   
   USE_AZURE_STORAGE=true
   AZURE_STORAGE_CONNECTION_STRING="<your-connection-string>"
   AZURE_CONTAINER_NAME=spatial-images

6. Restart your server


🔧 Environment Variables:
--------------------------
Add these to your server/.env file:

USE_AZURE_STORAGE=true
AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=..."
AZURE_CONTAINER_NAME=spatial-images


📊 How It Works:
-----------------
1. User uploads image via UI
2. Client sends image to /api/images endpoint
3. Server receives image and checks USE_AZURE_STORAGE
4. If true: Upload to Azure Blob Storage (gets URL)
   If false: Save to local server/public/images (gets filename)
5. URL/filename is saved in MongoDB
6. Client displays image using the stored URL/filename


💾 Storage Structure:
---------------------
Azure Blob Container: spatial-images/
├── uuid-image1.jpg
├── uuid-image2.png
├── uuid-image3.jpg
└── ...

Each blob is publicly readable via URL:
https://<account>.blob.core.windows.net/spatial-images/<blob-name>


🔒 Security Notes:
------------------
- Connection string is secret - never commit to git
- Container has public READ access for blobs
- Upload requires authentication (JWT token)
- Connection string is in .env (already gitignored)


💰 Pricing:
-----------
Azure Blob Storage (Hot tier, LRS redundancy):
- Storage: ~$0.02/GB per month
- Operations: ~$0.05 per 10,000 transactions
- Data transfer: First 5GB free, then ~$0.087/GB

For a typical research website with 1GB images and moderate traffic:
Estimated cost: $1-5 per month


🛠️ Troubleshooting:
--------------------
Issue: "Connection string is invalid"
→ Make sure you copied the full connection string from Azure Portal

Issue: "Container not found"
→ Run: node azure/azureBlobSetup.js to create container

Issue: "Upload fails, falls back to local"
→ Check that USE_AZURE_STORAGE=true in .env
→ Verify connection string is correct
→ Check Azure Portal that storage account is active

Issue: Images not displaying
→ Verify container has "Blob" public access level
→ Check that URLs in database are complete Azure URLs


📚 Additional Resources:
------------------------
- Azure Blob Storage Docs: https://docs.microsoft.com/en-us/azure/storage/blobs/
- Azure CLI Docs: https://docs.microsoft.com/en-us/cli/azure/
- Pricing Calculator: https://azure.microsoft.com/en-us/pricing/calculator/


💡 Usage in Code:
-----------------
The storage service is already integrated in:
- server/utils/storageService.js (main service)
- server/routes/uploadImages.js (upload endpoint)
- client/src/components/people/CreatePerson.js (example usage)
- client/src/components/projects/CreateProject.js (example usage)

You don't need to use azureBlobClient.js directly unless you want
custom blob operations beyond upload/delete.


