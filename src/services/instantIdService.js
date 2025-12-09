const Replicate = require("replicate");

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

async function generatePortrait(imageUrl) {
    try {
        console.log("✨ Sending image to Instant-ID model:", imageUrl);

        const output = await replicate.run(
            "zsxkib/instant-id:2e4785a4d80dadf580077b2244c8d7c05d8e3faac04a04c02d8e099dd2876789",
            {
                input: {
                    image: imageUrl,

                    // You *must* provide a prompt
                    prompt:
                        "3D render style illustration portrait of this child, pixar style, disney style, cute, high quality, highly detailed, soft lighting, 8k",

                    // SAFE defaults for this Instant-ID version
                    pose_image: "",
                    sdxl_weights: "protovision-xl-high-fidel",
                    guidance_scale: 5,
                    negative_prompt:
                        "(lowres, low quality, worst quality:1.2), watermark, painting, glitch, deformed, ugly, photo, realistic"
                }
            }
        );

        console.log("AI Output URLs:", output);

        // output is an array of file objects
        const resultUrl = output[0].url();

        return [resultUrl];
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
