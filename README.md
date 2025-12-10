# Little Portrait AI - Server

A Node.js/Express backend for AI portrait generation using Replicate.

## Tech Stack

- **Node.js** with Express
- **Replicate API** (Flux Kontext Pro model)
- **Cloudinary** for image hosting
- **Multer** for file uploads

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` and add:
   ```
   PORT=5000
   REPLICATE_API_TOKEN=your_replicate_token
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/personalize` | Upload image and generate AI portrait |

## How It Works

1. Client uploads an image
2. Image is stored on Cloudinary
3. Cloudinary URL is sent to Replicate's Flux model
4. Generated portrait URL is returned to client
