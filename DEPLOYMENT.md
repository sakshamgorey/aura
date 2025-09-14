# Vercel Deployment Guide

## Prerequisites

1. **Google Generative AI API Key**
   - Get your API key from: https://makersuite.google.com/app/apikey
   - You'll need this for the image analysis functionality

## Deployment Steps

### 1. Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project or create new one
# - Choose your team/account
# - Confirm project settings
```

### 2. Set Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variable:
   - **Name**: `GOOGLE_GENERATIVE_AI_API_KEY`
   - **Value**: Your Google Generative AI API key
   - **Environment**: Production, Preview, Development

### 3. Redeploy

After setting environment variables, redeploy your project:

```bash
vercel --prod
```

## Project Structure

- `api/analyze.ts` - Vercel serverless function for image analysis
- `src/` - Vue.js frontend application
- `vercel.json` - Vercel configuration
- `components.json` - shadcn-vue configuration

## API Endpoint

The API endpoint will be available at:
- **Production**: `https://your-project.vercel.app/api/analyze`
- **Development**: `http://localhost:3000/api/analyze` (when using `vercel dev`)

## Local Development with Vercel

To test the API locally with Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Start local development server
vercel dev

# This will start both frontend and API on localhost:3000
```

## Troubleshooting

### 404 Error on API Endpoint
- Ensure `api/analyze.ts` is in the root `api/` directory
- Check that the file exports a default function
- Verify Vercel configuration in `vercel.json`

### API Key Issues
- Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is set in Vercel environment variables
- Redeploy after setting environment variables
- Check the API key is valid and has proper permissions

### Build Issues
- Ensure all dependencies are in `package.json`
- Check that the build command works locally: `npm run build`
- Verify TypeScript compilation: `npx vue-tsc --noEmit`
