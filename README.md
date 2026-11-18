# CodePath--CCP150 Desenvolvimento de Aplicativos Móveis

*João Pedro Spiezzi Monti*
*RA - 22.125.049-1*

Aplicativo mobile acadêmico desenvolvido individualmente para a disciplina **CCP150 — Desenvolvimento de Aplicativos Móveis**, do Centro Universitário FEI. O CodePath reúne exercícios introdutórios, registro de estudos e acompanhamento de desempenho por linguagem e assunto.

## Visão geral

O CodePath foi pensado para estudantes que desejam praticar programação e acompanhar sua evolução sem depender apenas de uma contagem geral de exercícios. O aplicativo separa o desempenho por linguagem e categoria: assim, um bom resultado em estruturas condicionais pode coexistir com a necessidade de reforço em recursividade.

A interface do MVP é intencionalmente simples. As áreas principais são **Início**, **Exercícios**, **Diário** e **Progresso**. O catálogo inicial contém questões de múltipla escolha em Python e JavaScript, com assuntos e níveis de dificuldade variados.

## Problema e objetivos

Estudantes podem ter dificuldade para manter uma rotina, registrar o que estudaram e identificar quais conteúdos precisam de revisão. Uma pontuação total não mostra em quais assuntos a pessoa tem segurança nem onde precisa praticar mais.

### Objetivo geral

Desenvolver um aplicativo mobile que apoie a prática de programação e o acompanhamento dos estudos.

### Objetivos específicos

- Organizar exercícios por linguagem, categoria e dificuldade.
- Registrar respostas, tentativas e resultados.
- Permitir o registro de sessões de estudo, com duração e anotações.
- Estimar o desempenho por linguagem e categoria.
- Recomendar exercícios para reforçar assuntos com menor desempenho.
- Acompanhar uma meta semanal de estudo.
- Usar feedback tátil para complementar a avaliação visual das respostas.

### Público-alvo

Estudantes iniciantes ou em nível intermediário que estejam praticando fundamentos de programação e desejem acompanhar seu histórico de aprendizagem.

## Domínios funcionais

O aplicativo está organizado em cinco domínios principais:

1. **Sessão e perfil:** quando o Supabase está configurado, o app cria ou reutiliza uma sessão anônima. Esta versão não pede nome, e-mail ou senha. A conta anônima não pode ser recuperada após limpar os dados do aplicativo ou trocar de dispositivo.
2. **Catálogo de exercícios:** apresenta questões de Python e JavaScript filtradas por linguagem, assunto e dificuldade.
3. **Tentativas:** registra a alternativa selecionada, o resultado e a data da resposta. Com Supabase conectado, o app solicita a avaliação à função `submit_exercise_attempt` no banco; sem conexão configurada, a demonstração funciona em memória durante a sessão.
4. **Diário e metas:** registra assunto, duração e anotações de estudo, além de uma meta semanal em minutos.
5. **Progresso e recomendações:** resume tentativas, desempenho por categoria, evolução, confiança da estimativa e exercícios sugeridos.

Cada domínio fica separado em telas, contexto, utilitários ou serviços. Essa organização reduz a concentração de regras no `App.tsx` e facilita entender e manter o projeto.

## Funcionalidades do MVP

| Funcionalidade | Estado documentado |
| --- | --- |
| Abas Início, Exercícios, Diário e Progresso | Implementada |
| Navegação em pilha entre catálogo e detalhe do exercício | Implementada |
| Catálogo inicial com 40 exercícios de Python e JavaScript | Implementado no catálogo TypeScript e no seed SQL |
| Filtros por linguagem, assunto e dificuldade | Implementados no catálogo |
| Resposta de múltipla escolha e explicação | Implementadas |
| Feedback tátil para resposta correta ou incorreta | Implementado com `expo-haptics` |
| Diário com assunto, duração, observações e histórico | Implementado |
| Criar, atualizar e excluir registros do diário | Operações disponíveis no serviço; confirme os controles da tela na validação manual |
| Meta semanal, padrão de 150 minutos | Implementada; aceita de 1 a 10.080 minutos |
| Resumo das sessões dos últimos sete dias | Implementado |
| Avaliação de conhecimento por linguagem e categoria | Implementada como regra determinística inicial |
| Persistência remota, autenticação anônima e políticas RLS | Código e migrations preparados; dependem de configuração e validação em projeto Supabase real |
| Execução de código enviado pelo usuário | Não implementada; as questões atuais são de múltipla escolha |

O aplicativo **não executa código arbitrário** no telefone nem no servidor. As respostas são avaliadas comparando a alternativa escolhida com um gabarito predefinido. O catálogo TypeScript ainda contém respostas e explicações no bundle local; portanto, os gabaritos não devem ser considerados secretos. O esquema privado e a função SQL oferecem avaliação remota quando o backend está corretamente configurado, mas remover a duplicação do gabarito empacotado é um trabalho futuro.

## Organização dos arquivos

```text
codepath/
├── App.tsx                         # Composição dos provedores e navegação raiz
├── index.ts                        # Entrada do aplicativo Expo
├── app.json                        # Nome, ícones e configuração Expo
├── assets/                         # Ícones, splash e imagens
├── docs/                           # Planejamento e documentação técnica
├── scripts/
│   └── generate-exercise-seed.cjs  # Gera o seed SQL a partir do catálogo TypeScript
├── src/
│   ├── components/                  # Componentes reutilizáveis
│   ├── context/                     # Estado compartilhado de tentativas, diário e meta
│   ├── data/                        # Catálogo inicial de exercícios
│   ├── database/                    # Cliente Supabase, autenticação e repositório
│   ├── navigation/                  # Abas e pilha de telas de exercícios
│   ├── screens/                     # Telas do aplicativo
│   └── utils/                       # Avaliação e estatísticas como funções de domínio
└── supabase/
    ├── migrations/                  # Schema, progresso por categoria e metas
    └── seed.sql                     # Dados iniciais do catálogo
```

### Responsabilidade dos módulos

- **`screens`:** compõem cada tela e chamam as operações disponibilizadas pelo contexto.
- **`components`:** concentram elementos visuais reutilizáveis, como layouts e cartões informativos.
- **`navigation`:** define as quatro abas principais e o fluxo catálogo → detalhe do exercício.
- **`context`:** compartilha estado entre telas e coordena modo local ou operações remotas.
- **`data`:** contém o catálogo inicial, incluindo enunciados, alternativas, conceitos e critérios.
- **`database`:** inicializa o cliente Supabase, cria a sessão anônima e implementa operações de leitura e gravação.
- **`utils`:** calcula estimativas de conhecimento e resumos de estudo sem depender de componentes visuais.
- **`supabase/migrations`:** define tabelas, relações, funções, permissões e políticas de segurança.

## Modelo de dados e persistência

O armazenamento persistente remoto usa **PostgreSQL hospedado pelo Supabase**. O aplicativo acessa o serviço por `@supabase/supabase-js` e uma conexão HTTPS. O catálogo existe no app para o MVP e também é inserido no banco pelo seed SQL.

| Tabela ou schema | Conteúdo | Chaves e relações |
| --- | --- | --- |
| `profiles` | Perfil associado à sessão autenticada | `id` é chave primária e referencia `auth.users.id` |
| `languages` | Linguagens, inicialmente Python e JavaScript | `id` textual é chave primária; `name` é único |
| `categories` | Assuntos usados na classificação | `id` textual é chave primária; `name` é único |
| `exercises` | Enunciado, opções, dificuldade e metadados públicos | `id` textual é chave primária; `language_id` e `category_id` são chaves estrangeiras |
| `private.exercise_answer_keys` | Alternativa correta, saída esperada e explicação | `exercise_id` é chave primária e referencia `exercises.id`; schema privado |
| `exercise_attempts` | Alternativa escolhida e resultado de cada tentativa | UUID como chave primária; `user_id` referencia Auth e `exercise_id` referencia o exercício |
| `study_entries` | Assunto, notas e minutos de cada sessão de estudo | UUID como chave primária; `user_id` referencia Auth |
| `user_category_progress` | Snapshot recalculável da avaliação por categoria | Chave composta por usuário, linguagem e categoria |
| `study_goals` | Meta semanal em minutos | `user_id` é chave primária e referencia Auth |

O encadeamento lógico do histórico é:

```text
auth.users → profiles
auth.users → exercise_attempts → exercises → languages
                                         └──────→ categories
auth.users → study_entries
auth.users → user_category_progress → languages / categories
auth.users → study_goals
exercises → private.exercise_answer_keys
```

As tentativas e sessões pertencem ao usuário autenticado. As políticas **Row Level Security (RLS)** usam a identidade da sessão para limitar o acesso aos registros próprios. O gabarito remoto fica em schema privado, não acessível diretamente pelo cliente.

### Relacionamento entre fontes de dados

- `src/data/exercises.ts` alimenta o catálogo que aparece no aplicativo.
- `scripts/generate-exercise-seed.cjs` gera `supabase/seed.sql` a partir do catálogo TypeScript.
- As migrations criam a estrutura relacional e as políticas.
- `exercise_attempts` é a fonte de verdade para reconstituir o histórico de desempenho.
- `user_category_progress` guarda um resumo calculado que pode ser refeito a partir das tentativas.
- `study_entries` registra as sessões usadas nas estatísticas semanais.

## Avaliação de conhecimento

O resultado é calculado por combinação de **linguagem e categoria**, por exemplo, `Python · Recursividade`. Ele é um índice explicável para orientar a prática, não uma nota acadêmica nem uma probabilidade calibrada.

| Critério | Peso | Regra resumida |
| --- | ---: | --- |
| Desempenho recente | 65% | Acertos nas tentativas mais recentes de cada exercício, ponderados por dificuldade e recência |
| Dificuldade superada | 20% | Maior dificuldade em que houve acerto |
| Variedade | 10% | Número de exercícios diferentes tentados, limitado à cobertura disponível |
| Evolução | 5% | Comparação entre janelas recente e anterior, quando há histórico suficiente |

Faixas do índice: **0–39 Iniciante**, **40–64 Básico**, **65–79 Intermediário** e **80–100 Avançado**. O nível final também fica limitado à dificuldade mais alta respondida corretamente. A confiança é baixa com uma ou duas questões diferentes, média com três ou quatro e boa a partir de cinco.

As recomendações priorizam categorias com menor pontuação. Podem sugerir questões erradas anteriormente para nova prática; uma resposta correta recente não é recomendada de novo. Os pesos e limites são regras iniciais do projeto, ainda sem calibração com dados de uma turma.

## Segurança e limites da integração

- O app usa uma chave Supabase **publishable** no cliente; ela não substitui as políticas RLS.
- Nunca coloque `service_role`, senha de banco ou outro segredo em `EXPO_PUBLIC_`.
- `EXPO_PUBLIC_` é incorporado ao bundle do aplicativo e pode ser inspecionado.
- A autenticação anônima não oferece recuperação de conta nesta versão.
- Sem credenciais, o app entra em modo local; tentativas, diário e meta ficam em memória e não persistem após fechar o aplicativo.
- A sincronização offline e o envio posterior de dados não foram implementados.
- O aplicativo não executa código livre; para isso seria necessário um serviço de execução isolado, fora do dispositivo.

## Tecnologias e dependências

- **React Native**, **TypeScript** e **Expo SDK 58**.
- **React Navigation 7** para navegação por abas e pilha.
- **Supabase JS** e **PostgreSQL** para autenticação e persistência remota.
- **Expo SQLite** para armazenamento local da sessão Supabase.
- **Expo Haptics** para feedback tátil.
- **Jest** e **jest-expo** para testes unitários de funções de domínio.
- **ESLint** e **TypeScript** para análise estática.

As versões e faixas instaladas estão registradas em `package.json` e `package-lock.json`. Para pacotes Expo, use `npx expo install` para selecionar versões compatíveis com o SDK do projeto.

## Instalação e execução

### Requisitos

- Node.js 22.13 ou superior.
- npm.
- Expo Go compatível com o SDK 58 ou dispositivo/simulador configurado.
- Para persistência remota: um projeto Supabase com as migrations aplicadas.

### Executar localmente

No Windows PowerShell, na raiz do projeto:

```powershell
npm install
npx expo start
```

Leia o QR code com o Expo Go no iPhone. Para iniciar limpando o cache do Metro:

```powershell
npx expo start -c
```

## Configuração do Supabase

1. Crie um projeto Supabase e habilite **Anonymous Sign-Ins** nas configurações de Auth.
2. No SQL Editor do Supabase, execute as migrations na ordem: `202611030001_create_codepath_schema.sql`, `202611030002_add_category_progress.sql` e `202611030003_add_study_goals.sql`.
3. Execute `supabase/seed.sql` para cadastrar linguagens, categorias e exercícios.
4. Copie `.env.example` para `.env.local` e preencha a URL do projeto e a publishable key:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave
   ```

5. Reinicie o Expo para carregar as variáveis:

   ```powershell
   npx expo start --clear
   ```

Não envie `.env.local` ao GitHub. Use apenas a chave publishable no app e mantenha RLS habilitada. A chave `service_role` jamais deve ser incluída no aplicativo.

Para regenerar o seed após alterar o catálogo:

```powershell
node scripts/generate-exercise-seed.cjs
```

## Como utilizar

1. Abra **Exercícios**, escolha Python ou JavaScript e filtre o catálogo.
2. Abra uma questão, selecione uma alternativa e solicite a verificação.
3. Consulte o feedback visual, a explicação e, em dispositivo compatível, o feedback tátil.
4. Em **Diário**, registre o assunto e os minutos estudados; ajuste a meta semanal se desejar.
5. Em **Progresso**, consulte tentativas, resultados por categoria e recomendações de prática.

## Validação e testes

Os testes automatizados cobrem as funções de avaliação por categoria, recomendações e estatísticas do diário. Para executar as verificações na raiz do projeto:

```powershell
npm test
npm run lint
npx tsc --noEmit
npx expo-doctor
```

O registro técnico de uma execução anterior documenta **2 suítes e 7 testes aprovados**, além de `tsc` e ESLint sem erros no workspace de desenvolvimento. Reexecute esses comandos no checkout que será entregue ao GitHub, especialmente depois das correções de navegação, ponto de entrada e tipos TypeScript. A validação manual no iPhone, a persistência no Supabase e o isolamento RLS com contas distintas continuam dependentes da execução nesse ambiente.

Para validar manualmente, percorra as quatro abas, abra e responda uma questão, registre e remova uma sessão no diário e confira as recomendações. Com o Supabase configurado, reinicie o app e confirme a persistência das tentativas, sessões e meta, além do isolamento dos dados por usuário.

## Aprendizados e decisões técnicas

- Separação de telas, navegação, contexto, repositório de dados e utilitários.
- Uso de estado compartilhado para coordenar telas sem concentrar a lógica no componente raiz.
- Diferença entre modo local em memória e persistência remota com PostgreSQL.
- Autenticação anônima, chaves públicas, políticas RLS e função SQL para registrar tentativas.
- Cálculo por categoria com regras explícitas e limitações documentadas.
- Integração de um atuador do dispositivo com `expo-haptics`.
- Testes unitários de funções determinísticas sem depender da interface ou do hardware.

## Trabalhos futuros

- Concluir a validação visual e funcional no iPhone com a versão final enviada ao GitHub.
- Aplicar e validar as migrations, o seed, a persistência e o RLS em um projeto Supabase real.
- Permitir vincular a conta anônima a um método recuperável.
- Deixar de empacotar gabaritos no catálogo local e carregar os metadados públicos do banco.
- Implementar edição de sessões diretamente na interface, se necessário ao fluxo do diário.
- Calibrar as regras de avaliação com um teste diagnóstico e dados consentidos.
- Ampliar o catálogo e considerar execução de código em serviço remoto isolado.
- Adicionar capturas de tela reais após a validação no dispositivo.

## Referências e créditos

- [Documentação do Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- [Variáveis de ambiente no Expo](https://docs.expo.dev/guides/environment-variables/)
- [Expo Haptics — SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/haptics/)
- [Expo SQLite — SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/)
- [React Native](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Supabase com Expo e React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)
- [Row Level Security no Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Bayesian Knowledge Tracing: propriedades do modelo](https://jedm.educationaldatamining.org/index.php/JEDM/article/view/35)
- [EDM 2024: restrições e parâmetros em Bayesian Knowledge Tracing](https://educationaldatamining.org/edm2024/proceedings/2024.EDM-long-papers.2/index.html)

Ícones e imagens são assets do projeto Expo. Os exercícios e textos didáticos foram preparados para fins acadêmicos; novas questões e materiais devem incluir revisão de conteúdo e atribuição das fontes utilizadas.

