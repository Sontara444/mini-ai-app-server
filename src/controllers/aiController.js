const uploadToCloudinary = require("../utils/cloudinaryUpload");
const generatePortrait = require("../services/instantIdService");

exports.personalize = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No image uploaded"
            });
        }

        const uploaded = await uploadToCloudinary(req.file.buffer);

        if (!uploaded?.secure_url) {
            throw new Error("Cloudinary upload failed");
        }

        const result = await generatePortrait(uploaded.secure_url);

        return res.json({
            success: true,
            image: uploaded.secure_url,
            result
        });

    } catch (err) {

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
