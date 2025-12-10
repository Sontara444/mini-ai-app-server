const Replicate = require("replicate");
require("dotenv").config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

async function generatePortrait(imageUrl) {
    try {

        const input = {
            prompt: `
                        A super cute 3D animated toddler girl, large expressive eyes, soft smooth skin,
                        Pixar / DreamWorks animation style, high-detail facial features, warm soft lighting,
                        tiny nose, round cheeks, delicate eyelashes, playful smile, short dark hair with cute hairband,
                        warm outdoor background, ultra-clean render, cinematic depth of field,
                        colorful and joyful atmosphere, highly detailed 3D character render, toy-like stylization.
`,
            input_image: imageUrl,
            aspect_ratio: "match_input_image",
            output_format: "jpg",
            safety_tolerance: 2,
            prompt_upsampling: false
        };

        const output = await replicate.run("black-forest-labs/flux-kontext-pro", { input });

        return output.url();

    } catch (err) {
        console.error("❌ AI Error:", err);
        if (err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
        }
        throw err;
    }
}

module.exports = generatePortrait;
