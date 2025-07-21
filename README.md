# Sweet Booking Frontend

A React-based frontend application for a cake booking system, deployed on AWS Amplify.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- AWS Amplify CLI (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sweet-booking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit the .env file with your API URL
   REACT_APP_API_URL=https://api.davidharton.online
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | Yes | - |
| `REACT_APP_ENV` | Environment indicator | No | production |

## 🚨 Troubleshooting

### Domain and Certificate Issues

If you're experiencing issues with the domain `www.davidharton.online`:

#### 1. Certificate Generation Failure
**Problem**: "Failed To Generate Cert" error
**Solutions**:
- Verify DNS records are properly configured
- Ensure the domain is pointing to the correct AWS Amplify app
- Check if the domain is verified in AWS Certificate Manager

#### 2. JSON Parsing Errors
**Problem**: "Failed to parse json" error
**Solutions**:
- Verify the API URL is correctly configured in `.env`
- Check if the backend API is running and accessible
- Ensure the API returns valid JSON responses

#### 3. API URL Configuration
**Problem**: API calls failing due to undefined URL
**Solutions**:
- Create `.env` file with correct `REACT_APP_API_URL`
- Verify the API endpoint is accessible
- Check network connectivity

### Common Issues and Solutions

#### Issue: "API URL not configured" error
**Solution**: 
1. Create `.env` file in project root
2. Add `REACT_APP_API_URL=https://api.davidharton.online`
3. Restart the development server

#### Issue: Build failures in Amplify
**Solution**:
1. Ensure `.env.example` exists and contains required variables
2. Check that `amplify.yml` is properly configured
3. Verify Node.js version compatibility

#### Issue: CORS errors
**Solution**:
1. Ensure backend API has proper CORS configuration
2. Check if API URL is accessible from the frontend domain
3. Verify SSL certificate is valid

## 📁 Project Structure

```
src/
├── api/                 # API service functions
├── components/          # Reusable React components
├── layouts/            # Layout components
├── theme/              # Material-UI theme configuration
├── utils/              # Utility functions
├── views/              # Page components
└── routes.js           # Application routing
```

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌐 Deployment

This application is configured for AWS Amplify deployment. The build process:
1. Uses Node.js 20
2. Installs dependencies with legacy peer deps
3. Copies `.env.example` to `.env`
4. Builds the React application

## 🔒 Security

- API tokens are stored in localStorage
- All API calls include Authorization headers
- Environment variables are properly configured for production

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify environment configuration
3. Check browser console for detailed error messages
4. Ensure backend API is running and accessible

## 🚀 Next Steps

To resolve the current domain issues:
1. Verify DNS configuration for `davidharton.online`
2. Check AWS Certificate Manager for SSL certificate status
3. Ensure API backend is properly deployed and accessible
4. Test API endpoints manually to verify JSON responses
