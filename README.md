# Aura - AI Image Profiler

A minimalist Vue.js 3 application that analyzes images and generates prescriptive XML style profiles using Google's Gemini Pro Vision API.

## Features

- **Image Upload**: Drag and drop or click to upload multiple images (JPG, PNG, WEBP, GIF)
- **AI Analysis**: Uses Google Gemini Pro Vision API to analyze visual aesthetics
- **XML Generation**: Creates detailed, prescriptive XML profiles for recreating image styles
- **Syntax Highlighting**: Beautiful XML display with syntax highlighting
- **Copy to Clipboard**: Easy copying of generated XML profiles
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern, minimalist dark interface

## Technology Stack

- **Frontend**: Vue.js 3 with Composition API and `<script setup>`
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Tailwind
- **Notifications**: vue-sonner
- **Icons**: Lucide Vue Next
- **Backend**: Vercel Serverless Functions
- **AI**: Google Gemini Pro Vision API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Generative AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aura
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Add your Google Generative AI API key to `.env.local`:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Key Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env.local` file

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Badge, etc.)
│   ├── FileUpload.vue  # File upload component
│   └── AnalysisDrawer.vue # XML display drawer
├── views/              # Page components
│   └── HomeView.vue    # Main application view
├── lib/                # Utility functions and constants
├── types/              # TypeScript type definitions
├── test/               # Test setup and utilities
└── main.ts             # Application entry point

api/
└── analyze.ts          # Serverless API endpoint
```

## Usage

1. **Upload Images**: Click the upload area or drag and drop image files
2. **Generate Profile**: Click "Generate Profile" to analyze the images
3. **View Results**: The XML profile will open in a drawer with syntax highlighting
4. **Copy XML**: Use the copy button to copy the XML to your clipboard

## XML Profile Structure

The generated XML contains detailed information about:

- **Summary**: Overall style description
- **Prompt Keywords**: Keywords for AI image generation
- **Composition**: Camera positioning and framing
- **Lighting**: Light quality, direction, and mood
- **Color**: Dominant palette and color harmony
- **Camera Settings**: Aperture, shutter speed, ISO, focal length
- **Post Processing**: Vignette, grain, contrast, saturation, sharpening

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details
