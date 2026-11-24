# ระบบแจ้งซ่อมคอมพิวเตอร์และอุปกรณ์ของวิทยาลัย (College Repair System)

## โครงสร้างโปรเจกต์
- src/ : ซอร์สโค้ด Back-End
- docs/uml/ : แผนภาพ UML (.png, .drawio)
- docs/postman/ : ชุดทดสอบ Postman Collection

## วิธีติดตั้งและรันโปรเจกต์
1. ติดตั้งแพ็กเกจ: npm install express
2. รันเซิร์ฟเวอร์: node src/app.js (ทำงานที่ http://localhost:3000)

## ตารางเทียบ Use Case และ API Endpoints (สัปดาห์ที่ 2)

| Use Case (สัปดาห์ที่ 1) | HTTP Method | Endpoint | คำอธิบาย | Status (สำเร็จ / ผิดพลาด) |
| :--- | :--- | :--- | :--- | :--- |
| แจ้งซ่อมคอมพิวเตอร์ | POST | /api/v1/repair-requests | สร้างคำขอแจ้งซ่อมใหม่ (สถานะเริ่มต้น pending) | 201 / 400 |
| ดูรายการแจ้งซ่อม / ค้นหาตามสถานะ | GET | /api/v1/repair-requests | ดึงรายการทั้งหมด หรือกรองด้วย ?status=... | 200 / 400 |
| ดูรายละเอียดคำขอแจ้งซ่อม | GET | /api/v1/repair-requests/:id | ดึงข้อมูลคำขอแจ้งซ่อมตามรหัส id | 200 / 404 |
| อัปเดตสถานะและผลการซ่อม | PUT | /api/v1/repair-requests/:id | แก้ไข status, technicianId, resultNote | 200 / 400, 404 |
| ยกเลิกคำขอแจ้งซ่อม | DELETE | /api/v1/repair-requests/:id | ลบคำขอแจ้งซ่อม (ลบได้เฉพาะสถานะ pending) | 204 / 404, 409 |