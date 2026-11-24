const { repairRequests, ALLOWED_STATUSES, getNextId } = require("../models/repairRequest.model");

const createRepairRequest = (req, res) => {
  const { computerId, symptom } = req.body;

  if (typeof computerId !== "number" || isNaN(computerId)) {
    return res.status(400).json({ message: "computerId must be a valid number" });
  }
  if (typeof symptom !== "string" || symptom.trim() === "") {
    return res.status(400).json({ message: "symptom is required and cannot be empty" });
  }

  const newRequest = {
    id: getNextId(),
    computerId,
    symptom: symptom.trim(),
    status: "pending",
    technicianId: null,
    resultNote: ""
  };

  repairRequests.push(newRequest);
  return res.status(201).json(newRequest);
};

const getAllRepairRequests = (req, res) => {
  const { status } = req.query;

  if (status) {
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}`
      });
    }
    const filtered = repairRequests.filter((item) => item.status === status);
    return res.status(200).json(filtered);
  }

  return res.status(200).json(repairRequests);
};

const getRepairRequestById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const request = repairRequests.find((item) => item.id === id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  return res.status(200).json(request);
};

const updateRepairRequest = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const request = repairRequests.find((item) => item.id === id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const { status, technicianId, resultNote } = req.body;

  if (status !== undefined) {
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}`
      });
    }
    request.status = status;
  }

  if (technicianId !== undefined) {
    request.technicianId = technicianId;
  }

  if (resultNote !== undefined) {
    request.resultNote = resultNote;
  }

  return res.status(200).json(request);
};

const deleteRepairRequest = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = repairRequests.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  if (repairRequests[index].status !== "pending") {
    return res.status(409).json({
      message: "Cannot cancel a request that has already been accepted by a technician"
    });
  }

  repairRequests.splice(index, 1);
  return res.status(204).send();
};

module.exports = {
  createRepairRequest,
  getAllRepairRequests,
  getRepairRequestById,
  updateRepairRequest,
  deleteRepairRequest
};
