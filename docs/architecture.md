by: Gabriel, Anne, Ronaldo e Vitor

1. Visão Geral

Este projeto é uma API REST feita em Node.js com Express.js, que fornece informações sobre pontos de coleta de resíduos em Fortaleza.

Ela possui dois endpoints principais:

/pontos-coleta → lista todos os pontos de coleta disponíveis localmente.

/pontos-coleta/proximos → retorna os pontos mais próximos de uma localização, usando latitude/longitude ou endereço.

A API combina dados locais e externos, ajudando na gestão de resíduos urbanos e contribuindo para cidades mais sustentáveis (ODS 11).

2. Estrutura do Projeto:

projeto-api/
├─ server.js                 # Código principal da API
├─ package.json              # Gerencia dependências e scripts
├─ pontos_coleta.json        # Dados locais de pontos de coleta
├─ tests/                    # Testes (Jest + Supertest)
│   └─ pontos.test.js
├─ docs/                     # Documentação
│   └─ architecture.md
└─ postman/                  # Coleção Postman para testes da API
    └─ pontos-coleta.postman_collection.json

3. Fluxo de Dados

1 - O endpoint /pontos-coleta lê os dados do arquivo pontos_coleta.json e retorna todos os pontos cadastrados.

2 - O endpoint /pontos-coleta/proximos recebe lat/lng ou endereco nos parâmetros.
Se for endereço, a API consulta o OpenStreetMap (Nominatim) para obter as coordenadas.

Calcula a distância de cada ponto de coleta e retorna os mais próximos, combinando dados locais e de APIs externas (como ecopontos da cidade).

Exemplo de resposta:

[
  {
    "nome": "Ponto Local 1",
    "latitude": -3.71722,
    "longitude": -38.5434,
    "distancia": 0.0012,
    "origem": "local"
  },
  {
    "nome": "Ecoponto Teste",
    "latitude": -3.718,
    "longitude": -38.544,
    "distancia": 0.0021,
    "origem": "externo"
  }
]

4. Integrações Externas

OpenStreetMap = converte endereço em coordenadas.

API externa de ecopontos = fornece pontos adicionais em Fortaleza.

Então, a API consegue agregar informações de mais de um sistema, atendendo ao requisito de integração entre sistemas.

5. Testes

Framework utilizados: Jest + Supertest

Cobertura: endpoints /pontos-coleta e /pontos-coleta/proximos

Mocks: API externa simulada para evitar chamadas reais durante os testes

6. Arquitetura

Separação entre app Express e servidor:

if (require.main === module) {
  app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
}


Isso permite rodar testes sem abrir a porta real.

Combinação de JSON local e APIs externas garante dados confiáveis e permite expandir para mais serviços no futuro.

Estrutura de pastas clara:

tests/ = testes

docs/ = documentação

postman/ = coleção de testes

7. Impacto Social

Facilita que cidadãos encontrem pontos de coleta de resíduos em Fortaleza.

Ajuda na gestão de resíduos sólidos urbanos e na sustentabilidade da cidade (ODS 11).

A integração de sistemas aumenta a eficiência e confiabilidade das informações, beneficiando tanto cidadãos quanto órgãos públicos.
