const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { personalize } = require("../controllers/aiController");

router.post("/personalize", upload.single("image"), personalize);

module.exports = router;
