# AbuAliCina-Balkhi Phytotherapy Platform

A modern, AI-powered platform for plant-based medicine product development, formulation, and compliance checking.

## Features
- **Formulation Lab**: AI-assisted cosmetic and phytotherapy formulation.
- **Production Suite**: Batch management, scaling, and quality control.
- **Knowledge Base**: Ingredients, regulations, and scientific references.
- **Research Lab**: Plant identification and active compound analysis.
- **Compliance**: Automated regulatory checks for EU, FDA, and other standards.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **State Management**: Zustand
- **Icons**: Lucide React
- **AI Integration**: Google GenAI SDK

## Build System

This project uses Vite as its build tool, providing a highly optimized, production-ready build process.

### Installation

1. Ensure you have Node.js installed (v18+ recommended).
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
# or
npm run watch
```
The application will be available at `http://localhost:3000`.

### Building for Production

To create a production-ready build:
```bash
npm run build
```
This will:
- Compile TypeScript to JavaScript.
- Minify and optimize code using esbuild.
- Generate source maps for debugging.
- Perform tree shaking and code splitting (separating vendor code like React and Zustand).
- Output all static assets to the `dist/` directory.

### Automated Build Script

To run the automated build script which also cleans the `dist/` folder and reports build statistics (bundle sizes):
```bash
npm run build:automated
```

### Other Commands

- **Clean**: Remove the `dist/` folder.
  ```bash
  npm run clean
  ```
- **Test**: Run the test suite using Vitest.
  ```bash
  npm run test
  ```
- **Preview**: Preview the production build locally.
  ```bash
  npm run preview
  ```

## Customizing the Build

The build configuration is located in `vite.config.ts`. You can customize:
- **Code Splitting**: Modify the `manualChunks` under `build.rollupOptions.output` to change how vendor libraries are bundled.
- **Minification**: Change `build.minify` (currently set to `esbuild`, but can be changed to `terser` for slightly smaller bundles at the cost of build speed).
- **Source Maps**: Toggle `build.sourcemap` to `false` if you don't want source maps in production.

## Deployment

The `dist/` folder contains all the necessary static files for deployment. You can deploy this folder to any static hosting provider such as:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 / CloudFront

Example deployment to Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select the 'dist' folder as your public directory
firebase deploy
```

## Environment Variables

Copy `.env.example` to `.env.development` or `.env.production` and fill in the required values.
Note: In the AI Studio environment, `GEMINI_API_KEY` is automatically injected.
