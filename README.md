# API de Pontos de Coleta em Fortaleza
# by: Gabriel Viana, Anne Andrade, Ronaldo Paiva, Vitor Eduardo

## Descrição
API REST feita em Node.js com Express.js, que fornece informações sobre pontos de coleta de resíduos recicláveis em Fortaleza.  
Ela combina dados locais e externos para ajudar na gestão de resíduos e apoiar cidades mais sustentáveis (ODS 11).

---

## Como Rodar
1. Instale as dependências:

bash
npm install

2. Rode a API:

bash
Copiar código
npm start
Acesse em: http://localhost:3000

3. Testes
Para rodar os testes da API:

bash
Copiar código
npm test
Endpoints Principais
GET /pontos-coleta
Retorna todos os pontos de coleta disponíveis localmente.

GET /pontos-coleta
  - Retorna todos os pontos de coleta disponíveis localmente.

GET /pontos-coleta/proximos?lat=<latitude>&lng=<longitude>
  - Retorna os pontos mais próximos da localização informada.

GET /pontos-coleta/proximos?endereco=<endereco>
  - Retorna os pontos mais próximos do endereço informado.
  
4. Documentação Detalhada:

Para entender a arquitetura, fluxos de dados e decisões técnicas do projeto, veja:
docs/architecture.md

5. Relação com ODS 11 

Este projeto está alinhado com o Objetivo de Desenvolvimento Sustentável 11 da ONU, que visa "tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis".

Como nossa API contribui para o ODS 11:

Meta 11.6 - Reduzir o impacto ambiental negativo per capita das cidades

- Gestão de resíduos: Facilita o acesso a pontos de coleta seletiva

- Redução de poluição: Promove a reciclagem e descarte adequado

- Qualidade do ar: Diminui a queima de lixo e acúmulo em vias públicas

Meta 11.3 - Participação inclusiva no planejamento urbano

- Acesso democrático: API pública disponível para desenvolvedores e cidadãos

- Dados abertos: Informações sobre infraestrutura de reciclagem acessíveis a todos

Impacto Social em Fortaleza:

- Otimização de rotas para catadores de materiais recicláveis

- Redução de resíduos em locais inadequados da cidade

- Fomento à economia circular através da valorização de materiais recicláveis

- Educação ambiental indireta através da facilitação do descarte correto

