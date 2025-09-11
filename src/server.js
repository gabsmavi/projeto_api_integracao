// by: Gabriel Viana

const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Carrega os pontos de coleta do JSON local (dados verídicos)
let pontos = [];
try {
  const data = fs.readFileSync("./pontos_coleta.json", "utf8");
  pontos = JSON.parse(data);
  console.log("JSON carregado com sucesso:", pontos.length, "pontos encontrados");
} catch (err) {
  console.error("Erro ao carregar pontos_coleta.json:", err);
}

// Função auxiliar para calcular distância aproximada
function calcularDistancia(lat1, lng1, lat2, lng2) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

// Endpoint 1: lista todos os pontos de coleta locais
app.get("/pontos-coleta", (req, res) => {
  if (pontos.length === 0) {
    return res.status(404).json({ error: "Nenhum ponto de coleta encontrado." });
  }
  res.send(`<pre>${JSON.stringify(pontos, null, 2)}</pre>`);
});

// Função para buscar coordenadas de um endereço via OpenStreetMap (API externa integrada)
async function buscarCoordenadas(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    endereco
  )}&format=json`;
  const response = await axios.get(url);
  if (response.data.length > 0) {
    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon),
    };
  } else {
    throw new Error("Endereço não encontrado");
  }
}

// Função para buscar pontos de coleta externos (API municipal)
async function buscarPontosExternos(lat, lng) {
  const url = `https://api.ecopontosfortaleza.com/pontos?lat=${lat}&lng=${lng}&radius=5000`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.warn("Falha ao buscar pontos externos:", error.message);
    return []; // Retorna vazio se a API externa falhar
  }
}

// Endpoint 2: lista pontos próximos (locais + externos)
app.get("/pontos-coleta/proximos", async (req, res) => {
  const { lat, lng, endereco } = req.query;

  let latitude, longitude;

  try {
    if (endereco) {
      // Converte endereço em coordenadas usando OpenStreetMap
      const coords = await buscarCoordenadas(endereco);
      latitude = coords.lat;
      longitude = coords.lng;
    } else if (lat && lng) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lng);
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Parâmetros de localização inválidos." });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Informe lat/lng ou endereco nos parâmetros." });
    }

    // Calcula distância dos pontos locais
    const pontosLocais = pontos
      .map((ponto) => ({
        ...ponto,
        distancia: calcularDistancia(latitude, longitude, ponto.latitude, ponto.longitude),
        origem: "local",
      }))
      .sort((a, b) => a.distancia - b.distancia);

    // Busca pontos externos
    const pontosExternosRaw = await buscarPontosExternos(latitude, longitude);
    const pontosExternos = pontosExternosRaw.map((ponto) => ({
      ...ponto,
      origem: "externo",
    }));

    // Combina e ordena todos os pontos
    const todosPontos = [...pontosLocais, ...pontosExternos].sort(
      (a, b) => a.distancia - b.distancia
    );

    res.json(todosPontos.slice(0, 5)); // retorna os 5 mais próximos
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tratamento de rota inexistente
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Exportar o app para fazer os testes
module.exports = app;

// Inicializa o servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
  });
}
