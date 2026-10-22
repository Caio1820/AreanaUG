# 📝 Log de Governança, Tarefas & Issues • Arena Underground

Este registro documenta as tarefas planejadas, critérios de aceite e os respectivos PRs que estruturaram o projeto da Arena Underground Games.

---

## Issue #01: Governança, Documentação Viva & Arquitetura Base
- **Status**: Concluído (Closed via PR #01)
- **Escopo**:
  - Estruturação do fluxo de trabalho Git/GitHub (Conventional Commits, PR Templates, Issue Templates).
  - Criação dos documentos vivos `CONVENTIONS.md` e `AGENT.md`.
  - Configuração do pipeline de TypeScript e dependências.
- **Critérios de Aceite**:
  - [x] Documentos `CONVENTIONS.md` e `AGENT.md` disponíveis na raiz.
  - [x] Template de Pull Request exigindo referência de issue (`Closes #XX`).
  - [x] Configuração de tipos estritos no `tsconfig.json`.

---

## Issue #02: Identidade Visual Cyberpunk Dark, Motion & Skeletons Fluidos
- **Status**: Concluído (Closed via PR #02)
- **Escopo**:
  - Configuração da paleta Cyberpunk Gaming (#0A0A0A base, #FF6600 acentos neon).
  - Logo oficial da Arena Underground com aura circular brilhante.
  - Skeletons fluidos com animação shimmer para carregamento inicial sem corte seco.
  - Princípios de motion com curvas de aceleração naturais via `motion/react`.
- **Critérios de Aceite**:
  - [x] Logo oficial carregado com fallback seguro e glow laranja neon.
  - [x] Skeletons fluidos exibidos durante o carregamento inicial.
  - [x] Respeito à disciplina anti-slop (sem pill sandwiches, sem comentários em títulos).

---

## Issue #03: Catálogo Interativo de Pacotes & Agendamento Direto WhatsApp
- **Status**: Concluído (Closed via PR #03)
- **Escopo**:
  - Implementação das categorias de pacotes: Pacotes Promocionais, Consoles & PCs, Aniversários & Eventos.
  - Cards interativos com preenchimento exato da mensagem de WhatsApp:
    - Pacote 5h (R$ 59,90) -> `"Salve, Arena Underground! Quero garantir o Pacote de 5h por R$ 59,90."`
    - Pacote 10h (R$ 99,90) -> `"Salve! Quero adquirir o Pacote de 10h por R$ 99,90."`
    - Pacote 20h (R$ 189,90) -> `"Salve! Quero o Pacote de 20h por R$ 189,90."`
    - Avulso (R$ 20,00/h) -> `"Olá! Gostaria de reservar horário avulso (R$ 20/h) na Arena."`
    - Aniversários -> `"Olá! Gostaria de informações para realizar um evento/aniversário na Arena Underground."`
  - Feedback visual de celebração com confetti ao disparar agendamento.
- **Critérios de Aceite**:
  - [x] Todos os 5 pacotes com textos e valores oficiais.
  - [x] Filtros por tabs interativos funcionais.
  - [x] Deep link WhatsApp direcionado ao número `5596991217979`.

---

## Issue #04: Simulador de Sessão Personalizada & Estações de Elite
- **Status**: Concluído (Closed via PR #04)
- **Escopo**:
  - Simulador interativo onde o usuário calcula horas, amigos e plataforma em tempo real.
  - Showcase das estações (PCs 240Hz RTX, PS5 4K, VR Quest 3, Nintendo Switch) com imagens de alta resolução.
  - Módulo de Chave PIX rápida com cópia em 1 toque e envio de comprovante.
- **Critérios de Aceite**:
  - [x] Cálculo dinâmico com ativação automática de combos de horas.
  - [x] Especificações técnicas detalhadas de cada plataforma.
  - [x] Cópia instantânea da chave PIX no celular do cliente.

---

## Issue #05: Observabilidade em Tempo Real & APM Client-Side
- **Status**: Concluído (Closed via PR #05)
- **Escopo**:
  - Monitoramento de First Contentful Paint (FCP) via `PerformanceObserver`.
  - Captura e rastreio de eventos do usuário (cliques, conversões de WhatsApp, rotas).
  - Drawer de console de telemetria acessível no rodapé.
  - `ErrorBoundary` integrado prevenindo telas em branco.
- **Critérios de Aceite**:
  - [x] Painel de métricas APM ativo com status em tempo real.
  - [x] Zero erros não capturados em runtime.

---

## Issue #06: Atualização dos Horários Oficiais (Terça a Domingo das 15h às 21h)
- **Status**: Concluído (Closed via PR #06)
- **Escopo**:
  - Ajuste de cálculo de status de abertura em tempo real no Header (segunda fechado, terça a domingo 15h às 21h).
  - Atualização dos badges informativos no topo e na seção de localização do rodapé.
  - Ajuste das opções de turno do Simulador de Agendamento Rápido.
- **Critérios de Aceite**:
  - [x] Badge do Header exibe "Terça a Domingo: 15h às 21h".
  - [x] Rodapé reflete Terça a Domingo das 15:00 às 21:00 e Segunda-feira Fechado.
  - [x] Turnos do simulador sincronizados com a janela operacional oficial.

---

## Issue #07: Atualização do Link Direto do Google Maps (maps.app.goo.gl)
- **Status**: Concluído (Closed via PR #07)
- **Escopo**:
  - Integração do link curto oficial fornecido: `https://maps.app.goo.gl/RoX8LEsR1AYDRTzw7`.
  - Propagação para todos os pontos de contato (Card de rota no topo, Botão de Ação Rápida Direct, Botões do Rodapé e Barra de Acesso Rápido Mobile).
  - Adição de teste unitário validando o link de mapas.
- **Critérios de Aceite**:
  - [x] `ARENA_MAPS_URL` aponta exatamente para `https://maps.app.goo.gl/RoX8LEsR1AYDRTzw7`.
  - [x] Testes unitários atualizados e validados com sucesso.
