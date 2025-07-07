import request from "supertest";
import app from "../../server.js"; 
import 'dotenv/config';

describe("Flujo completo: Crear y loguear admin", () => {
  let adminData;
  let adminToken;

  beforeAll(() => {
    const unique = Date.now();
    adminData = {
      id: `id-${unique}`,
      email: `admin${unique}@example.com`,
      password: "adminpass2word",
      admin_key: process.env.SECRET_KEY_ADMIN // Esto depende de tu backend
    };
  });

  it("debería crear un admin correctamente", async () => {
    const res = await request(app)
      .post("/users/createAdmin")
      .send(adminData)
      .set("Accept", "application/json");

    if (res.status !== 201) {
      console.error("Error en /users/createAdmin:", res.status, res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "ADMIN created successfully",
        adminID: adminData.id
      })
    );
  });

  it("debería loguear el admin y devolver un token", async () => {
    const loginRes = await request(app)
      .post("/users/login")
      .send({
        email: adminData.email,
        password: adminData.password,
      })
      .set("Accept", "application/json");

    if (loginRes.status !== 200) {
      console.error("Error en login:", loginRes.status, loginRes.body);
    }

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    adminToken = loginRes.body.token; // Guarda el token para el resto de los tests
  });

  it("debería crear un estudiante usando el token del admin", async () => {
    const uniqueStudent = Date.now();
    const newStudent = {
      identification_number: `dni${uniqueStudent}`,
      name: "Test",
      lastname: "Student",
      nationality: "Argentina",
      email: `student${uniqueStudent}@example.com`
    };

    const res = await request(app)
      .post("/users/createCompleteStudent")
      .set("Authorization", `Bearer ${adminToken}`)
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
});