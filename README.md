# Little Portrait AI - Server

Express backend for AI portrait generation using Replicate's Flux model.

## Tech Stack

- **Node.js + Express**
- **Replicate API** - Flux Kontext Pro model
- **Cloudinary** - Image hosting
- **Multer** - File uploads

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
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

## API

### POST `/api/personalize`

Generate AI portrait from uploaded image.

**Request:**
- `image` (file) - Image to transform
- `prompt` (text, optional) - Custom style prompt

**Response:**
```json
{
  "success": true,
  "image": "https://cloudinary.com/...",
  "result": "https://replicate.delivery/..."
}
```

## Default Prompt

If no custom prompt is provided, the default 3D Pixar/DreamWorks animation style is used.
