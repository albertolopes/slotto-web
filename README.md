# Slotto — (Documentação do Projeto)

Este repositório contém a versão front-end (implementação em Next.js / React) dos low-fidelity wireframes do aplicativo Slotto. Este README descreve como o projeto deve ficar quando pronto, a estrutura ideal do repositório, como executar localmente, integração com a API e orientações para deixar a UI responsiva e ocupando 100% da viewport.

## Resumo rápido
- **Linguagem:** TypeScript + React
- **Framework:** Next.js (App Router)
- **Estilização:** Tailwind CSS (versão 4+) + CSS custom
- **Objetivo:** Aplicação responsiva, conteúdo preenchendo toda a tela, design limpo com bordas claras e finas
- **Backend (documentação OpenAPI):** http://localhost:8080/v3/api-docs

## Comandos úteis
- Instalar dependências: `npm install`
- Rodar em desenvolvimento: `npm run dev`
- Build de produção: `npm run build`

## Integração com Backend

### 1. Categorias (`categories.ts`)
*   `GET /api/categories`: Listar todas as categorias.

### 2. Empresas (`companies.ts`)
*   `GET /api/companies`: Listar empresas.
*   `GET /api/companies/{id}`: Detalhes da empresa por ID.
*   `GET /api/companies/slug/{slug}`: Detalhes da empresa por slug.
*   `POST /api/companies`: Criar empresa.
*   `PUT /api/companies/{id}`: Atualizar empresa.
*   `DELETE /api/companies/{id}`: Remover empresa.
*   `POST /api/companies/{id}/photos`: Upload de foto.
*   `DELETE /api/companies/{id}/photos/{photoId}`: Remover foto.

**Exemplo de JSON (Empresa com `slug`):**
```json
{
  "id": "uuid-empresa-123",
  "slug": "barbearia-do-beto",
  "name": "Barbearia do Beto",
  // ... resto dos campos
}
```

### 3. Serviços da Empresa (`companyServices.ts`)
*   `GET /api/companies/{companyId}/services`: Listar serviços da empresa.
*   `POST /api/companies/{companyId}/services`: Adicionar serviço.
*   `PUT /api/companies/{companyId}/services/{serviceId}`: Atualizar serviço.
*   `DELETE /api/companies/{companyId}/services/{serviceId}`: Remover serviço.

### 4. Funcionários (`staff.ts`)
*   `GET /api/companies/{companyId}/staff`: Listar funcionários.
*   `POST /api/companies/{companyId}/staff`: Adicionar funcionário.
*   `PUT /api/staff/{id}`: Atualizar funcionário.
*   `DELETE /api/staff/{id}`: Remover funcionário.

### 5. Disponibilidade (`availability.ts`)
*   `GET /api/availability/month`: Obter disponibilidade para um mês inteiro.
*   `GET /api/availability`: Obter horários disponíveis para um dia específico.

### 6. Agendamentos (`appointments.ts`)
*   `GET /api/appointments`: Listar agendamentos.
*   `POST /api/appointments`: Criar novo agendamento.
*   `DELETE /api/appointments/{id}`: Cancelar agendamento.
*   `POST /api/appointments/{id}/confirm`: Confirmar agendamento.
*   `PUT /api/appointments/{id}/reschedule`: Reagendar.

### 7. Avaliações (`reviews.ts`)
*   `GET /api/companies/{companyId}/reviews`: Listar avaliações.
*   `GET /api/companies/{companyId}/reviews/summary`: Obter resumo das avaliações.
*   `POST /api/companies/{companyId}/reviews`: Criar avaliação.
*   `GET /api/reviews/{id}`: Detalhes da avaliação.
*   `DELETE /api/reviews/{id}`: Remover avaliação.

### 8. Assinaturas (`subscriptions.ts`)
*   `GET /api/companies/{companyId}/subscription`: Obter status da assinatura.
*   `POST /api/companies/{companyId}/subscription`: Criar/Atualizar assinatura.
*   `POST /api/subscriptions/webhook`: Webhook para pagamentos.

### 9. Notificações (`notifications.ts`)
*   `GET /api/notifications`: Listar notificações.
*   `POST /api/notifications`: Criar notificação.
*   `POST /api/notifications/{id}/mark-sent`: Marcar como enviada.
*   `POST /api/notifications/process`: Processar fila de envio.
