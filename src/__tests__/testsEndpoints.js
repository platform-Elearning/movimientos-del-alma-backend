import request from "supertest";
import app from "../server.js"; // ¡con extensión .js!
import 'dotenv/config';

describe("POST /users/createAdmin", () => {
  it("debería crear un usuario y devolver el objeto esperado", async () => {
    const newAdmin = {
      id: `id-${Date.now()}`,
      email: `admin${Date.now()}@example.com`,
      password: "adminpass2word",
      admin_key: process.env.SECRET_KEY_ADMIN 
    };

    const res = await request(app)
      .post("/users/createAdmin")
      .send(newAdmin)
      .set("Accept", "application/json");

    if (res.status !== 201) {
      console.error("Error en /users/createAdmin:", res.status, res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "ADMIN created successfully",
        adminID: newAdmin.id
      })
    );
  });
});

