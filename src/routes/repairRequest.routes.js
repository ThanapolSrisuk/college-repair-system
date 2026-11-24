const express = require("express");
const router = express.Router();
const {
  createRepairRequest,
  getAllRepairRequests,
  getRepairRequestById,
  updateRepairRequest,
  deleteRepairRequest
} = require("../controllers/repairRequest.controller");

router.post("/", createRepairRequest);
router.get("/", getAllRepairRequests);
router.get("/:id", getRepairRequestById);
router.put("/:id", updateRepairRequest);
router.delete("/:id", deleteRepairRequest);

module.exports = router;
