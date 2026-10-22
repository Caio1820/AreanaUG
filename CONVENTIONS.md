# Diretrizes de Engenharia e Governança • Arena Underground Games

Este documento define os padrões rigorosos de arquitetura, qualidade de código, governança Git/GitHub e design para o **BioSite Interativo e Portal de Agendamento Rápido** da **Arena Underground Games**.

---

## 1. Fluxo de Trabalho Git & GitHub Flow

### 1.1 Gestão de Tarefas (Issues First)
- **Nenhum código entra sem Issue prévia**: Toda tarefa, correção, melhoria técnica ou nova funcionalidade deve obrigatoriamente possuir uma Issue documentada no repositório.
- A Issue deve conter:
  1. Contexto e Justificativa de Negócio / UX.
  2. Escopo delimitado (o que entra e o que NÃO entra).
  3. Critérios de Aceite testáveis (Gherkin ou checklist objetivo).

### 1.2 Pull Requests Isolados e Rastreáveis
- Cada branch de trabalho deve seguir a convenção:
  - `feature/issue-XX-descricao-curta`
  - `fix/issue-XX-descricao-curta`
  - `perf/issue-XX-descricao-curta`
- **Referência Obrigatória**: A descrição do PR deve conter imperativamente o comando de fechamento: `Closes #XX` ou `Fixes #XX`.
- Nenhum merge direto na branch principal `main`.

### 1.3 Convenção de Mensagens de Commit (Conventional Commits)
- Formato: `<tipo>(<escopo>): <descrição no imperativo>`
  - Ex: `feat(catalog): adicionar cards interativos de pacotes com deep link wa.me`
  - Ex: `fix(telemetry): corrigir observer de First Contentful Paint`
  - Ex: `docs(conventions): atualizar padrões de governança e issue log`

---

## 2. Princípios de Design & Motion (KyleZantos & Universal Frontend)

1. **Cyberpunk Gaming Dark Aesthetic**:
   - Fundo base: `#0A0A0A` (Preto Profundo).
   - Cores primárias de acento: `#FF6600` / `#F97316` (Laranja Fogo Neon).
   - Superfícies de cards: `#141414` e `#191919` com bordas sutis `#262626`.
2. **Anti-Slop Discipline**:
   - Zero pill static tags aglomeradas. Metadados devem usar texto limpo com separadores tipográficos (`·`, `/`).
   - Proibido texto fantasma de baixa opacidade (watermarks gigantes).
   - Sem cabeçalhos em formato de comentário de código (`// 01 ARCHITECTURE`).
   - Controles de linha única com `truncate` e alinhamento tabular (`tabular-nums`) para valores numéricos.
3. **Motion Principles**:
   - Skeletons customizados com gradiente shimmer durante carregamento.
   - Transições naturais com curvas easing `[0.16, 1, 0.3, 1]` via `motion/react`.
   - Limite estrito de 15% de altura para elementos sticky em telas mobile.
4. **Ergonomia Mobile-First**:
   - Alvos de toque $\ge 44 \times 44\text{px}$ (CTAs principais $\ge 48\text{px}$).
   - Botão de WhatsApp prioritário na thumb-zone inferior.

---

## 3. Observabilidade, Qualidade & Testes

- **APM em Tempo Real**: Telemetria cliente integrada (`src/utils/telemetry.ts`), registrando First Contentful Paint (FCP), cliques em botões de WhatsApp, simulações de pacotes e rotas.
- **Error Boundary**: Toda a aplicação é envelopada no `ErrorBoundary`, capturando exceções e fornecendo recuperação suave sem tela em branco.
- **Deep Linking WhatsApp**: Formatação 100% testada e livre de caracteres ilegais para o número oficial `5596991217979`.

---

## 4. Estrutura do Projeto

```
/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── task_issue.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   └── ISSUES_LOG.md
├── src/
│   ├── assets/images/      # Imagens de alta fidelidade
│   ├── components/         # Componentes modulares
│   ├── data/               # Pacotes e especificações
│   ├── utils/              # WhatsApp deep links e telemetria
│   ├── App.tsx             # Orquestrador principal
│   └── main.tsx            # Entry point React
├── CONVENTIONS.md          # Diretrizes vivas
└── metadata.json           # Configuração de sandbox
```
