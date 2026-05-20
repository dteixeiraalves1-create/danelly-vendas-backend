# DV Points Module

Sistema de pontuação e níveis para clientes (DV - Danelly Vendas).

## Estrutura

```
dv-points/
├── controllers/
├── services/
│   └── pointsService.js
├── routes/
│   └── dvRoutes.js
├── models/
├── database/
│   └── schema.sql
└── INTEGRATION.md
```

## Funcionalidades

- **Adicionar Pontos**: Registra ações do cliente e adiciona pontos
- **Consultar Pontos**: Obtém saldo e nível do cliente
- **Histórico**: Visualiza todas as ações e pontos acumulados
- **Níveis**: Bronze (padrão), Silver, Gold, Diamante (5000+ pontos)

## Endpoints

### POST /dv/add-points
Adiciona pontos para um usuário.

```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "store_id": "321e4567-e89b-12d3-a456-426614174000",
  "action": "Venda realizada",
  "points": 10
}
```

### GET /dv/points/:user_id
Retorna saldo e nível atual do usuário.

### GET /dv/history/:user_id
Retorna histórico de todas as movimentações de pontos.

## Setup

1. Execute o schema SQL: `schema.sql`
2. Configure `DATABASE_URL` nas variáveis de ambiente
3. Integre as rotas conforme `INTEGRATION.md`
