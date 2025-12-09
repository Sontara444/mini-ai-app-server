const uploadToCloudinary = require("../utils/cloudinaryUpload");
const generatePortrait = require("../services/instantIdService");

exports.personalize = async (req, res) => {
    try {
        console.log("📩 Personalize Request Received");

        if (!req.file) {
            console.log("❌ No image found in request");
            return res.status(400).json({
                success: false,
                error: "No image uploaded"
            });
        }

        console.log(`📁 File received: ${req.file.originalname} (${req.file.size} bytes)`);

        // 1️⃣ Upload to Cloudinary
        console.log("☁️ Uploading to Cloudinary...");
        const uploaded = await uploadToCloudinary(req.file.buffer);

        if (!uploaded?.secure_url) {
            throw new Error("Cloudinary upload failed");
        }

        console.log("✅ Cloudinary Upload Success:", uploaded.secure_url);

        // 2️⃣ Generate Portrait using Replicate
        console.log("🤖 Sending image to Replicate...");
        const result = await generatePortrait(uploaded.secure_url);

        console.log("✅ Replicate Success:", result);

        // 3️⃣ Respond to client
        return res.json({
            success: true,
            image: uploaded.secure_url,
            result
        });

    } catch (err) {
        console.error("❌ Controller Error:", err);

        // Handle Replicate "Payment Required" specifically
        if (err.response && err.response.status === 402) {
            return res.status(402).json({
                success: false,
                error: "PAYMENT_REQUIRED",
                message: "Insufficient credits in Replicate account. Please add a payment method."
            });
        }

        return res.status(500).json({
            success: false,
            error: "Failed to generate portrait",
            message: err.message,
            ...(process.env.NODE_ENV === "development" && {
                stack: err.stack,
            }),
        });
    }
};
