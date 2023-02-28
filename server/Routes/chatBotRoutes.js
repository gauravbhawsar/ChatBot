const express = require("express");
const router = express.Router();

const {
  runSample,
  createInt,
  getListIntent,
  updateIntent,
} = require("../Controllers/chatBotController");
const { CreateEntity } = require("../Controllers/entityController");
const { handleWebhook } = require("../Controllers/webhook");
router.post("/runSample", runSample);
router.post("/createIntent", createInt);
router.get("/getListIntent", getListIntent);
router.put("/updateIntent", updateIntent);
router.post("/handleWebhook", handleWebhook);
router.post("/createEntity", CreateEntity);

module.exports = router;
