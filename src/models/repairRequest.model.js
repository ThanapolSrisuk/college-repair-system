let repairRequests = [
  {
    id: 1,
    computerId: 101,
    symptom: "เปิดเครื่องไม่ติด หน้าจอดำ",
    status: "pending",
    technicianId: null,
    resultNote: ""
  },
  {
    id: 2,
    computerId: 102,
    symptom: "เชื่อมต่อ Wi-Fi วิทยาลัยไม่ได้",
    status: "in_progress",
    technicianId: 501,
    resultNote: "กำลังตรวจสอบการ์ดแลน"
  }
];

let nextId = 3;
const ALLOWED_STATUSES = ["pending", "in_progress", "waiting_parts", "done"];

module.exports = {
  repairRequests,
  ALLOWED_STATUSES,
  getNextId: () => nextId++
};
