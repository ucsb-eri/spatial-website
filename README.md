# SPATIAL Research Center Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern, full-stack website for the SPATIAL (Spatial Analysis and Research) Center at UCSB. Built with React, Node.js, Express, GraphQL, and MongoDB.

## Features

- **Dynamic Content Management** - Admin interface for managing people, projects, and content
- **Azure Blob Storage** - Cloud-based image storage with local fallback
- **GraphQL API** - Efficient data fetching with Apollo Client/Server
- **Authentication** - Secure JWT-based admin authentication
- **Responsive Design** - Material-UI components for mobile-friendly interface
- **Docker Support** - Containerized deployment for easy scaling
- **Comprehensive Testing** - Jest tests for backend and frontend

## Quick Start

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- Docker (optional)

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp server/env.example server/.env
cp client/env.example client/.env

# Edit .env files with your configuration

# Start development servers (runs both client and server)
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- GraphQL: http://localhost:3001/graphql

## Documentation

- **[Development Guide](DEVELOPMENT.md)** - Local setup, testing, and development workflow
- **[Deployment Guide](DEPLOYMENT.md)** - Docker and Azure deployment instructions

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- Apollo Client (GraphQL)
- React Router
- Draft.js (Rich text editing)

### Backend
- Node.js / Express
- Apollo Server (GraphQL)
- MongoDB / Mongoose
- JWT Authentication
- Multer + Azure Blob Storage

### DevOps
- Docker / Docker Compose
- Azure Container Registry
- Azure App Service / Container Instances
- Azure Blob Storage

## Project Structure

```
spatial-website/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page-level components
│   │   ├── utils/         # Client utilities (auth, API, config)
│   │   └── context/       # React context providers
│   └── package.json
├── server/                # Node.js backend API
│   ├── models/           # Mongoose data models
│   ├── routes/           # Express REST routes
│   ├── schemas/          # GraphQL schema and resolvers
│   ├── utils/            # Server utilities (auth, storage)
│   ├── seeders/          # Database seed data
│   └── server.js
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Docker orchestration
└── package.json          # Root scripts
```

## Admin Features

The website includes a full admin interface for content management:

### Authentication
- Secure login at `/login`
- JWT-based session management
- Auto-logout on token expiration

### Content Management
- **People** - Add/edit/delete team members with bios, photos, and links
- **Projects** - Manage research projects with descriptions and images
- **Info Panels** - Edit content sections on About, Events, and Opportunities pages
- **Image Upload** - Upload images to Azure Blob Storage or local storage

### Admin Access

Default credentials (development only):
- Email: `admin@spatial.ucsb.edu`
- Password: Set in `.env` file

**⚠️ Change these in production!**

## Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# Run with coverage
npm run test:coverage
```

## Deployment

### Docker (Recommended)

```bash
# Build image
docker build -t spatial-website .

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f
```

### Azure Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Azure setup including:
- Azure Container Registry
- Azure App Service / Container Instances
- Azure Blob Storage configuration
- MongoDB Atlas / Cosmos DB setup

## Environment Variables

### Server

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT signing | Yes |
| `USE_AZURE_STORAGE` | Use Azure Blob Storage (true/false) | No |
| `AZURE_STORAGE_CONNECTION_STRING` | Azure storage connection | If using Azure |
| `AZURE_CONTAINER_NAME` | Azure blob container name | If using Azure |
| `ADMIN_EMAIL` | Admin account email | Development only |
| `ADMIN_PASSWORD` | Admin account password | Development only |

### Client

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | Yes |
| `REACT_APP_GRAPHQL_URL` | GraphQL endpoint URL | Yes |
| `REACT_APP_UPLOAD_API_URL` | Upload API URL | Yes |

## Storage Options

### Local Storage (Development)
Images stored in `server/public/images/`
```bash
USE_AZURE_STORAGE=false
```

### Azure Blob Storage (Production)
Images stored in Azure cloud
```bash
USE_AZURE_STORAGE=true
AZURE_STORAGE_CONNECTION_STRING=<your-connection-string>
AZURE_CONTAINER_NAME=spatial-images
```

The storage service automatically falls back to local storage if Azure credentials are invalid.

## API Documentation

### GraphQL API

Access the GraphQL Playground at `/graphql` to explore the schema.

**Queries:**
- `people` - Fetch all people
- `projects` - Fetch all projects
- `infoPanels` - Fetch all info panels

**Mutations:** (Require Authentication)
- `addPerson`, `editPerson`, `deletePerson`
- `addProject`, `editProject`, `deleteProject`
- `addInfoPanel`, `editInfoPanel`, `deleteInfoPanel`

### REST API

- `GET /api/health` - Health check endpoint
- `POST /api/images` - Upload image (requires auth)
- `DELETE /api/images/:id` - Delete image (requires auth)
- `GET /api/calendar/events` - Get calendar events

## Development Workflow

1. Create feature branch from `main`
2. Make changes and add tests
3. Run tests: `npm test`
4. Commit with descriptive messages
5. Create pull request

## Security

- JWT authentication for all admin operations
- Bcrypt password hashing
- CORS configuration
- Rate limiting on sensitive endpoints
- Environment variable protection
- Non-root Docker user
- Input validation and sanitization

## Performance

- GraphQL for efficient data fetching
- React code splitting
- Image optimization
- Multi-stage Docker builds
- CDN-ready (Azure Blob Storage)
- Health checks for monitoring

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
lsof -ti:3001 | xargs kill -9
```

**MongoDB connection failed:**
- Check MongoDB is running
- Verify connection string in `.env`
- Check network/firewall settings

**Images not uploading:**
- Check Azure credentials if using Azure
- Verify admin authentication token
- Check file permissions for local storage

See [DEVELOPMENT.md](DEVELOPMENT.md) for more troubleshooting tips.

## License

MIT License - see LICENSE file for details

## Support

For questions or issues:
- Email: admin@spatial.ucsb.edu
- GitHub Issues: [Create an issue](../../issues)

## Acknowledgments

- SPATIAL Research Center at UCSB
- Material-UI for component library
- Apollo for GraphQL implementation
- MongoDB for database

---

**Built with ❤️ at UCSB**
