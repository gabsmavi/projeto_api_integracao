// by: Vitor

const request = require("supertest");
const axios = require("axios");
const app = require("../src/server");

// Axios
jest.mock("axios");

describe("Testes da API de pontos de coleta", () => {
  it("GET /pontos-coleta deve retornar os pontos locais", async () => {
    const res = await request(app).get("/pontos-coleta");
    expect(res.statusCode).toBe(200);
  });

  it("GET /pontos-coleta/proximos deve retornar erro sem parâmetros", async () => {
    const res = await request(app).get("/pontos-coleta/proximos");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Informe lat/lng ou endereco nos parâmetros.");
  });

  it("GET /pontos-coleta/proximos deve funcionar com endereço", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ lat: "-3.71722", lon: "-38.5434" }],
    });
    axios.get.mockResolvedValueOnce({
      data: [{ nome: "Ecoponto Teste", latitude: -3.718, longitude: -38.544 }],
    });

    const res = await request(app)
      .get("/pontos-coleta/proximos")
      .query({ endereco: "Fortaleza, CE" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("origem");
  });
});
