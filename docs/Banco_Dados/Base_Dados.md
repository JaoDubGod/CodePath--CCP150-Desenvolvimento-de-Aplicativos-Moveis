# Etapa 5 — Persistência com Supabase

## Objetivo e decisão técnica

Esta etapa troca o armazenamento somente em memória por uma base PostgreSQL hospedada no Supabase. O projeto já mantém o catálogo de exercícios no app; as tentativas e o diário passam a ser carregados e gravados pelo cliente Supabase quando as credenciais e o esquema estiverem configurados. Sem essa configuração, o aplicativo continua funcionando em modo local durante a sessão.

O Supabase foi escolhido porque oferece PostgreSQL e SQL relacional, familiar ao autor do projeto, além de uma API JavaScript que pode ser chamada pelo React Native. O aplicativo usa uma conta anônima do Supabase para obter um identificador de usuário sem pedir dados pessoais nesta versão acadêmica. A conta anônima não pode ser recuperada depois de sair, limpar os dados do app ou trocar de dispositivo; uma versão futura pode permitir vincular e-mail.

## Modelo de dados

| Tabela | Finalidade | Relações principais |
| --- | --- | --- |
| `profiles` | Perfil associado à identidade do Supabase Auth | `id` referencia `auth.users.id` |
| `languages` | Python, JavaScript e futuras linguagens | Uma linguagem possui exercícios |
| `categories` | Assuntos do catálogo | Uma categoria possui exercícios |
| `exercises` | Enunciado, opções e metadados públicos do exercício | Referencia linguagem e categoria |
| `private.exercise_answer_keys` | Resposta, saída esperada e explicação | Uma chave para cada exercício; schema privado |
| `exercise_attempts` | Tentativas individuais do usuário | Referencia usuário e exercício |
| `study_entries` | Sessões do diário | Referencia usuário |

O nível de conhecimento e as estatísticas por categoria serão derivados do histórico de tentativas na Etapa 6. Assim, não há duas fontes de verdade para a mesma pontuação.

## Segurança e comunicação

O app chama `@supabase/supabase-js` pela rede HTTPS. O cliente envia a URL do projeto e a chave **publishable**, e o Supabase Auth fornece o token da sessão. As políticas RLS usam `auth.uid()` para limitar tentativas e registros do diário à conta atual. A chave publishable é pública por natureza e fica sujeita às políticas RLS; chaves secret/service-role nunca devem estar no app.

A resposta correta foi separada em `private.exercise_answer_keys`. O app chama a função SQL `submit_exercise_attempt`, que verifica a alternativa, grava a tentativa e devolve feedback. Isso impede que o cliente escolha o resultado gravado no banco. A função valida sessão e índice da opção antes de inserir. Como a Etapa 4 ainda mantém `correctOption` e explicações no catálogo TypeScript empacotado, esta versão não impede que alguém inspecione o bundle para descobrir respostas; substituir esse catálogo local pelos metadados públicos do banco elimina essa duplicação numa evolução posterior.

## Arquivos desta etapa

- `supabase/migrations/202611030001_create_codepath_schema.sql`: tabelas, relações, índices, RLS, gatilho de perfil e função de avaliação.
- `supabase/seed.sql`: dados iniciais de Python, JavaScript, categorias e 40 exercícios.
- `scripts/generate-exercise-seed.cjs`: gera novamente o seed a partir de `src/data/exercises.ts`.
- `src/database/supabase.ts`: inicialização condicional do cliente e armazenamento local da sessão com `expo-sqlite`.
- `src/database/authService.ts`: cria ou reutiliza a sessão anônima.
- `src/database/studyRepository.ts`: operações de leitura, criação, atualização e exclusão.
- `src/context/StudyContext.tsx`: carrega dados na inicialização e coordena a interface com o repositório.

## Configuração manual no Supabase

1. Crie um projeto Supabase e habilite **Anonymous Sign-Ins** na configuração de Auth.
2. No SQL Editor, execute primeiro `supabase/migrations/202611030001_create_codepath_schema.sql`.
3. Execute `supabase/seed.sql` para carregar o catálogo.
4. Em Project Settings / API, copie Project URL e a publishable key (começa com `sb_publishable_`).
5. Crie `codepath/.env.local` copiando `.env.example` e substitua os dois valores de exemplo. O arquivo local fica ignorado pelo Git.
6. Reinicie o bundler com `npx expo start --clear` para recarregar as variáveis `EXPO_PUBLIC_`.

As variáveis `EXPO_PUBLIC_` entram no bundle do aplicativo. Só devem conter URL e chave publishable. A proteção dos dados depende das políticas SQL, não do sigilo da chave.

## Operações CRUD implementadas

- **Create:** `createStudyEntry` cria uma sessão com assunto, anotações e minutos.
- **Read:** `loadStudyEntries` e `loadAttempts` carregam dados do usuário atual. O app ainda usa o catálogo TypeScript local; as 40 questões também são carregadas no banco pelo seed para estabelecer o modelo e permitir a próxima evolução.
- **Update:** `updateStudyEntry` atualiza os campos do diário e a data `updated_at`.
- **Delete:** `deleteStudyEntry` remove um registro do diário; `deleteAttempt` permite apagar uma tentativa própria quando necessário.
- **Avaliar e registrar:** `submitAttempt` chama a função SQL segura; tentativas são preservadas como histórico imutável na interface comum.

As políticas RLS permitem somente a leitura e escrita que o usuário autenticado precisa. A função do catálogo/seed é administrada no painel, não pelo aplicativo.

## Tratamento de estados e limitações atuais

O contexto informa se o app está em `local`, `connecting`, `connected` ou `error`. Em erro de configuração ou conexão, a tela inicial informa que os registros ficam apenas na sessão local. Isso evita afirmar que um dado foi sincronizado quando não foi. Não há fila offline nem sincronização posterior nesta etapa.

## Validação da etapa

Depois de executar o SQL e criar `.env.local`, reinicie o Expo. Na tela Início, confirme a mensagem “Conectado ao Supabase”. Em Diário, grave um registro, feche e reabra o app e confirme que ele continua listado; exclua-o e confirme que desaparece. Em Exercícios, responda uma questão e confirme que a tentativa aparece em Progresso, inclusive depois de reiniciar o app. No painel Supabase, confira as linhas com o mesmo `user_id` da conta anônima. Esses passos são instruções de validação; a conexão real ainda depende do projeto Supabase e das credenciais do usuário.

## Dificuldades comuns

- `Invalid API key`: confira URL e publishable key e reinicie Metro.
- `Anonymous sign-ins are disabled`: habilite o acesso anônimo nas configurações de Auth.
- `relation does not exist`: execute a migration antes do seed.
- `permission denied` ou `row-level security`: confira os `GRANT`s e as políticas da migration; não desative RLS para contornar o erro.
- Registro não encontrado ao atualizar: o registro pode pertencer a outra sessão anônima, o que é bloqueado pelo RLS.
