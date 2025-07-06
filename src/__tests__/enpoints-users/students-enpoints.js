import request from "supertest";
import app from "../../server.js"; 
import jwt from "jsonwebtoken";
import 'dotenv/config';

describe("POST /users/createCompleteStudent", () => {
  // Genera un token válido de admin antes de cada test
  let adminToken;
  beforeAll(() => {
    // Cambia el payload y secret según tu implementación
    const adminPayload = {
      id: `testadmin-${Date.now()}`,
      email: `admin${Date.now()}@example.com`,
      role: "admin",
    };
    adminToken = jwt.sign(adminPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
  });

  it("debería crear un estudiante y devolver el objeto esperado", async () => {
    const uniqueId = `dni${Date.now()}`;
    const newStudent = {
      identification_number: uniqueId,
      name: "Test",
      lastname: "Student",
      nationality: "Argentina",
      email: `student${uniqueId}@example.com`
    };

    const res = await request(app)
      .post("/users/createCompleteStudent")
      .set("Authorization", `Bearer ${adminToken}`) // JWT de admin
      .set("Accept", "application/json")
      .send(newStudent);

    if (res.status !== 201) {
      console.error("Error en /users/createCompleteStudent:", res.status, res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Student and user created successfully",
        userId: expect.any(String),
      })
    );
  });

  it("debería rechazar si falta algún campo obligatorio", async () => {
    const res = await request(app)
      .post("/users/createCompleteStudent")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send({
        // Falta 'identification_number'
        name: "Test",
        lastname: "Student",
        nationality: "Argentina",
        email: `incomplete${Date.now()}@example.com`
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: false,
        error: "Mandatory data missing"
      })
    );
  });
});
