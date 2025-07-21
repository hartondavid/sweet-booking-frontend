# Troubleshooting Guide - Domain & API Issues

## Issues Identified

Based on the domain management interface, you're experiencing:

1. **Certificate Generation Failure** for both `davidharton.online` and `www.davidharton.online`
2. **JSON Parsing Errors** in your React application
3. **Missing Environment Configuration**

## Solutions Implemented

### ✅ 1. Fixed JSON Parsing Errors

**Problem**: API calls were failing due to undefined `REACT_APP_API_URL` environment variable, causing JSON parsing errors.

**Solution**: 
- Created `env.example` file with proper API URL configuration
- Improved error handling in all API files (`auth.js`, `cakes.js`, `user.js`)
- Added proper response validation before JSON parsing
- Created `apiUtils.js` for consistent API call handling

**Files Modified**:
- `src/api/auth.js` - Added API URL validation and better error handling
- `src/api/cakes.js` - Added API URL validation and better error handling  
- `src/api/user.js` - Added API URL validation and better error handling
- `src/utils/apiUtils.js` - New utility for consistent API calls

### ✅ 2. Environment Configuration

**Problem**: Missing `.env.example` file causing build failures.

**Solution**: Created `env.example` with:
```bash
# API Configuration
REACT_APP_API_URL=https://api.davidharton.online

# Optional: Development API URL (uncomment for local development)
# REACT_APP_API_URL=http://localhost:3001

# Optional: Environment indicator
REACT_APP_ENV=production
```

## Next Steps for Domain Issues

### 🔧 3. Fix Certificate Generation

**For AWS Amplify (recommended)**:

1. **Check DNS Configuration**:
   - Ensure your domain's nameservers point to AWS
   - Verify DNS records are properly configured

2. **SSL Certificate Setup**:
   - In AWS Amplify Console, go to your app
   - Navigate to "Domain Management"
   - Click "Add domain" if not already added
   - Configure SSL certificate (AWS Certificate Manager will handle this automatically)

3. **Domain Verification**:
   - Ensure domain ownership is verified
   - Check that all required DNS records are in place

### 🔧 4. Alternative Solutions

**If using a different hosting provider**:

1. **Vercel**:
   - Add domain in Vercel dashboard
   - Configure DNS records as instructed
   - SSL certificates are automatically provisioned

2. **Netlify**:
   - Add custom domain in Netlify dashboard
   - Update DNS records
   - SSL certificates are automatically provisioned

3. **Manual SSL Setup**:
   - Use Let's Encrypt for free SSL certificates
   - Configure your web server (nginx/apache) with the certificate

## Testing Your Fixes

### 1. Local Development
```bash
# Copy environment file
cp env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Production Build
```bash
# Build for production
npm run build

# Deploy to your hosting platform
```

### 3. Verify API Calls
- Check browser console for any remaining JSON parsing errors
- Verify API endpoints are accessible
- Test authentication flow

## Common Issues & Solutions

### Issue: "API URL not configured" error
**Solution**: Ensure `.env` file exists with `REACT_APP_API_URL` set

### Issue: CORS errors
**Solution**: Configure your backend to allow requests from your domain

### Issue: Certificate still failing
**Solution**: 
1. Wait 24-48 hours for DNS propagation
2. Verify all DNS records are correct
3. Check domain ownership verification

### Issue: Build failures
**Solution**: 
1. Ensure all environment variables are set
2. Check for syntax errors in API files
3. Verify all dependencies are installed

## Monitoring

After implementing these fixes:

1. **Monitor Application Logs**: Check for any remaining JSON parsing errors
2. **Test All Features**: Ensure all API calls work correctly
3. **Verify SSL**: Check that HTTPS is working properly
4. **Performance**: Monitor API response times

## Support

If issues persist:
1. Check your hosting provider's documentation
2. Verify DNS configuration with your domain registrar
3. Review AWS Amplify/your hosting platform's troubleshooting guides 