export type Language = 'Python' | 'JavaScript';
export type Difficulty = 'Iniciante' | 'Básico' | 'Intermediário' | 'Avançado';

export type Exercise = {
  id: string;
  title: string;
  language: Language;
  category: string;
  difficulty: Difficulty;
  statement: string;
  expectedInput: string;
  expectedOutput: string;
  example: string;
  concepts: string[];
  evaluationCriteria: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

const initialExercises: Exercise[] = [
  {
    id: 'py-variables-01',
    title: 'Somando duas variáveis',
    language: 'Python',
    category: 'Variáveis e tipos de dados',
    difficulty: 'Iniciante',
    statement: 'Qual valor será exibido pelo código?\n\na = 7\nb = 3\nprint(a + b)',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: '10',
    example: 'Código: a = 7, b = 3\nSaída: 10',
    concepts: ['Variáveis', 'Números inteiros', 'Soma'],
    evaluationCriteria: 'A resposta deve corresponder exatamente à saída impressa.',
    options: ['4', '10', '73', 'a + b'],
    correctOption: 1,
    explanation: 'O operador + soma os valores guardados em a e b: 7 + 3 = 10.',
  },
  {
    id: 'py-operators-01',
    title: 'Resto da divisão',
    language: 'Python',
    category: 'Operadores',
    difficulty: 'Iniciante',
    statement: 'Qual valor será exibido?\n\nprint(17 % 5)',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: '2',
    example: 'Código: print(17 % 5)\nSaída: 2',
    concepts: ['Operador módulo', 'Divisão inteira'],
    evaluationCriteria: 'A resposta deve ser o resto da divisão de 17 por 5.',
    options: ['3', '2', '3.4', '0'],
    correctOption: 1,
    explanation: '17 dividido por 5 deixa resto 2. Em Python, % calcula esse resto.',
  },
  {
    id: 'py-conditionals-01',
    title: 'Verificando uma condição',
    language: 'Python',
    category: 'Estruturas condicionais',
    difficulty: 'Iniciante',
    statement:
      'Qual palavra será exibida?\n\ntemperatura = 31\nif temperatura >= 30:\n    print("quente")\nelse:\n    print("ameno")',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: 'quente',
    example: 'temperatura = 31\nSaída: quente',
    concepts: ['if e else', 'Comparação numérica'],
    evaluationCriteria: 'A resposta deve indicar o ramo executado quando a condição é verdadeira.',
    options: ['quente', 'ameno', '31', 'Nenhuma saída'],
    correctOption: 0,
    explanation: '31 é maior ou igual a 30, então o bloco do if é executado.',
  },
  {
    id: 'py-loops-01',
    title: 'Somando em um laço',
    language: 'Python',
    category: 'Estruturas de repetição',
    difficulty: 'Básico',
    statement:
      'Qual valor será exibido ao final?\n\ntotal = 0\nfor numero in range(1, 4):\n    total += numero\nprint(total)',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: '6',
    example: 'Os valores somados são 1, 2 e 3.\nSaída: 6',
    concepts: ['for', 'range', 'Acumulador'],
    evaluationCriteria: 'A resposta deve somar os três valores percorridos pelo laço.',
    options: ['3', '4', '6', '10'],
    correctOption: 2,
    explanation: 'range(1, 4) produz 1, 2 e 3. O acumulador termina com 1 + 2 + 3 = 6.',
  },
  {
    id: 'js-variables-01',
    title: 'Exibindo uma string',
    language: 'JavaScript',
    category: 'Variáveis e tipos de dados',
    difficulty: 'Iniciante',
    statement: 'O que será exibido no console?\n\nconst linguagem = "JavaScript";\nconsole.log(linguagem);',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: 'JavaScript',
    example: 'linguagem contém "JavaScript".\nSaída: JavaScript',
    concepts: ['const', 'String', 'console.log'],
    evaluationCriteria: 'A resposta deve reproduzir o texto guardado na variável.',
    options: ['linguagem', 'JavaScript', 'const', 'Nada'],
    correctOption: 1,
    explanation: 'console.log recebe o valor da variável e exibe o conteúdo da string.',
  },
  {
    id: 'js-operators-01',
    title: 'Divisão em JavaScript',
    language: 'JavaScript',
    category: 'Operadores',
    difficulty: 'Iniciante',
    statement: 'Qual número será exibido?\n\nconsole.log(10 / 4);',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: '2.5',
    example: 'Código: console.log(10 / 4)\nSaída: 2.5',
    concepts: ['Operador de divisão', 'Números'],
    evaluationCriteria: 'A resposta deve ser o resultado numérico da divisão.',
    options: ['2', '2.5', '4', '0'],
    correctOption: 1,
    explanation: 'O operador / realiza divisão e pode produzir um número decimal.',
  },
  {
    id: 'js-conditionals-01',
    title: 'Aprovado ou reprovado',
    language: 'JavaScript',
    category: 'Estruturas condicionais',
    difficulty: 'Iniciante',
    statement:
      'Qual palavra será exibida?\n\nconst nota = 75;\nif (nota >= 60) {\n  console.log("aprovado");\n} else {\n  console.log("reprovado");\n}',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: 'aprovado',
    example: 'nota = 75\nSaída: aprovado',
    concepts: ['if e else', 'Comparação numérica'],
    evaluationCriteria: 'A resposta deve indicar o ramo executado para nota 75.',
    options: ['aprovado', 'reprovado', '75', 'Nenhuma saída'],
    correctOption: 0,
    explanation: '75 >= 60 é verdadeiro, então o primeiro bloco é executado.',
  },
  {
    id: 'js-loops-01',
    title: 'Contando repetições',
    language: 'JavaScript',
    category: 'Estruturas de repetição',
    difficulty: 'Básico',
    statement:
      'Quais valores aparecem no console?\n\nfor (let i = 0; i < 3; i++) {\n  console.log(i);\n}',
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput: '0, 1, 2',
    example: 'O laço começa em 0 e para antes de 3.\nSaída: 0, 1, 2',
    concepts: ['for', 'Condição de parada', 'Incremento'],
    evaluationCriteria: 'A resposta deve listar cada valor exibido, na ordem.',
    options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'],
    correctOption: 1,
    explanation: 'O laço inicia em 0 e executa enquanto i < 3. Assim, exibe 0, 1 e 2.',
  },
];

type ExerciseDraft = Omit<Exercise, 'expectedInput' | 'expectedOutput' | 'example' | 'evaluationCriteria'>;

function createExercise(draft: ExerciseDraft): Exercise {
  const expectedOutput = draft.options[draft.correctOption];
  return {
    ...draft,
    expectedInput: 'Nenhuma entrada externa.',
    expectedOutput,
    example: `Código do enunciado.\nSaída: ${expectedOutput}`,
    evaluationCriteria: 'A resposta selecionada deve corresponder à saída do trecho fornecido.',
  };
}

const additionalExercises: Exercise[] = [
  createExercise({
    id: 'py-arrays-01', title: 'Acessando um elemento da lista', language: 'Python',
    category: 'Arrays e matrizes', difficulty: 'Iniciante',
    statement: 'Qual valor será exibido?\n\nvalores = [2, 4, 6]\nprint(valores[1])',
    concepts: ['Listas', 'Índice iniciado em zero'], options: ['2', '4', '6', '1'], correctOption: 1,
    explanation: 'O índice 1 aponta para o segundo elemento, que é 4.',
  }),
  createExercise({
    id: 'py-matrix-01', title: 'Acessando uma matriz', language: 'Python',
    category: 'Arrays e matrizes', difficulty: 'Básico',
    statement: 'Qual valor será exibido?\n\nmatriz = [[1, 2], [3, 4]]\nprint(matriz[1][0])',
    concepts: ['Matrizes', 'Índice de linha e coluna'], options: ['1', '2', '3', '4'], correctOption: 2,
    explanation: 'A linha de índice 1 é [3, 4]; dentro dela, o índice 0 contém 3.',
  }),
  createExercise({
    id: 'py-strings-01', title: 'Fatiando uma string', language: 'Python',
    category: 'Strings', difficulty: 'Básico',
    statement: 'Qual texto será exibido?\n\npalavra = "codigo"\nprint(palavra[0:3])',
    concepts: ['Strings', 'Fatiamento'], options: ['cod', 'codi', 'igo', 'codigo'], correctOption: 0,
    explanation: 'O início 0 é incluído e o fim 3 não é incluído. O resultado é cod.',
  }),
  createExercise({
    id: 'py-functions-01', title: 'Chamando uma função', language: 'Python',
    category: 'Funções e métodos', difficulty: 'Iniciante',
    statement: 'Qual valor será exibido?\n\ndef dobro(n):\n    return n * 2\n\nprint(dobro(5))',
    concepts: ['Parâmetros', 'return', 'Chamada de função'], options: ['5', '7', '10', '25'], correctOption: 2,
    explanation: 'A função recebe 5 e retorna 5 multiplicado por 2.',
  }),
  createExercise({
    id: 'py-recursion-01', title: 'Soma recursiva', language: 'Python',
    category: 'Recursividade', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\ndef soma(n):\n    if n == 0:\n        return 0\n    return n + soma(n - 1)\n\nprint(soma(4))',
    concepts: ['Recursividade', 'Caso base', 'Pilha de chamadas'], options: ['4', '6', '10', '24'], correctOption: 2,
    explanation: 'As chamadas somam 4 + 3 + 2 + 1 e terminam no caso base soma(0).',
  }),
  createExercise({
    id: 'py-oop-01', title: 'Atributo de um objeto', language: 'Python',
    category: 'Orientação a objetos', difficulty: 'Básico',
    statement: 'O que será exibido?\n\nclass Animal:\n    def __init__(self, nome):\n        self.nome = nome\n\na = Animal("Lua")\nprint(a.nome)',
    concepts: ['Classe', 'Objeto', 'Construtor', 'Atributo'], options: ['Animal', 'nome', 'Lua', 'None'], correctOption: 2,
    explanation: 'O construtor guarda Lua no atributo nome do objeto a.',
  }),
  createExercise({
    id: 'py-datastructures-01', title: 'Contando itens únicos', language: 'Python',
    category: 'Estruturas de dados', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nvalores = {2, 2, 5, 7}\nprint(len(valores))',
    concepts: ['Conjunto', 'Remoção de duplicatas', 'len'], options: ['2', '3', '4', '16'], correctOption: 1,
    explanation: 'Um conjunto mantém apenas valores únicos: 2, 5 e 7.',
  }),
  createExercise({
    id: 'py-sort-01', title: 'Ordenando uma lista', language: 'Python',
    category: 'Algoritmos de ordenação', difficulty: 'Básico',
    statement: 'Qual lista será exibida?\n\nvalores = [3, 1, 2]\nprint(sorted(valores))',
    concepts: ['Ordenação', 'Ordem crescente', 'sorted'], options: ['[3, 1, 2]', '[1, 2, 3]', '[2, 1, 3]', '[3, 2, 1]'], correctOption: 1,
    explanation: 'sorted cria uma lista ordenada em ordem crescente.',
  }),
  createExercise({
    id: 'py-search-01', title: 'Busca por pertencimento', language: 'Python',
    category: 'Busca', difficulty: 'Básico',
    statement: 'Qual valor será exibido?\n\nvalores = [1, 3, 5, 7]\nprint(5 in valores)',
    concepts: ['Busca linear', 'Operador in', 'Booleanos'], options: ['True', 'False', '5', 'None'], correctOption: 0,
    explanation: 'O valor 5 está na lista, então a expressão in resulta em True.',
  }),
  createExercise({
    id: 'py-stack-01', title: 'Removendo do topo da pilha', language: 'Python',
    category: 'Listas, pilhas e filas', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\npilha = [1, 2]\npilha.append(3)\nprint(pilha.pop())',
    concepts: ['Pilha', 'LIFO', 'append', 'pop'], options: ['1', '2', '3', '[1, 2]'], correctOption: 2,
    explanation: 'pop sem índice remove e retorna o último elemento, 3.',
  }),
  createExercise({
    id: 'py-queue-01', title: 'Removendo do início da fila', language: 'Python',
    category: 'Listas, pilhas e filas', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nfila = [1, 2]\nfila.append(3)\nprint(fila.pop(0))',
    concepts: ['Fila', 'FIFO', 'Ordem de remoção'], options: ['1', '2', '3', '[2, 3]'], correctOption: 0,
    explanation: 'pop(0) remove o elemento do início da lista, que é 1.',
  }),
  createExercise({
    id: 'py-tree-01', title: 'Lendo um nó filho', language: 'Python',
    category: 'Árvores e grafos', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\narvore = {"valor": 8, "esquerda": {"valor": 3}}\nprint(arvore["esquerda"]["valor"])',
    concepts: ['Árvore', 'Nó', 'Dicionário aninhado'], options: ['8', '3', 'esquerda', 'Erro'], correctOption: 1,
    explanation: 'A chave esquerda contém outro dicionário cujo valor é 3.',
  }),
  createExercise({
    id: 'py-graph-01', title: 'Vizinho em uma lista de adjacência', language: 'Python',
    category: 'Árvores e grafos', difficulty: 'Intermediário',
    statement: 'Qual vértice será exibido?\n\ngrafo = {"A": ["B", "C"], "B": ["A"]}\nprint(grafo["A"][1])',
    concepts: ['Grafo', 'Lista de adjacência', 'Índices'], options: ['A', 'B', 'C', '1'], correctOption: 2,
    explanation: 'A lista associada a A é [B, C]; o índice 1 contém C.',
  }),
  createExercise({
    id: 'py-sort-02', title: 'Comparando duas ordenações', language: 'Python',
    category: 'Algoritmos de ordenação', difficulty: 'Avançado',
    statement: 'Qual sequência aparece?\n\nvalores = [4, 1, 3, 2]\nvalores.sort(reverse=True)\nprint(valores)',
    concepts: ['Ordenação', 'Ordem decrescente', 'Mutação de lista'], options: ['[1, 2, 3, 4]', '[4, 3, 2, 1]', '[2, 1, 4, 3]', '[4, 1, 3, 2]'], correctOption: 1,
    explanation: 'sort modifica a própria lista; reverse=True pede ordem decrescente.',
  }),
  createExercise({
    id: 'py-search-02', title: 'Busca binária e intervalo', language: 'Python',
    category: 'Busca', difficulty: 'Avançado',
    statement: 'Em uma lista ordenada de 8 itens, quantas metades no máximo são necessárias para chegar a um único item usando busca binária?',
    concepts: ['Busca binária', 'Divisão do intervalo', 'Complexidade logarítmica'], options: ['2', '3', '4', '8'], correctOption: 1,
    explanation: 'A cada passo o intervalo cai pela metade: 8 → 4 → 2 → 1, totalizando 3 reduções.',
  }),
  createExercise({
    id: 'py-graph-02', title: 'Primeiro passo de uma busca em largura', language: 'Python',
    category: 'Árvores e grafos', difficulty: 'Avançado',
    statement: 'Na busca em largura, a fila começa com ["A"]. Após remover A e adicionar seus vizinhos B e C, qual é a fila?',
    concepts: ['Busca em largura', 'Fila', 'Vizinhos'], options: ['["A"]', '["B", "C"]', '["C", "B"]', '[]'], correctOption: 1,
    explanation: 'A é removido; seus vizinhos são adicionados ao final da fila na ordem B, C.',
  }),
  createExercise({
    id: 'js-arrays-01', title: 'Acessando um elemento do array', language: 'JavaScript',
    category: 'Arrays e matrizes', difficulty: 'Iniciante',
    statement: 'Qual valor será exibido?\n\nconst valores = [2, 4, 6];\nconsole.log(valores[2]);',
    concepts: ['Array', 'Índice iniciado em zero'], options: ['2', '4', '6', '2,4'], correctOption: 2,
    explanation: 'O índice 2 aponta para o terceiro elemento do array, que é 6.',
  }),
  createExercise({
    id: 'js-matrix-01', title: 'Acessando um valor em matriz', language: 'JavaScript',
    category: 'Arrays e matrizes', difficulty: 'Básico',
    statement: 'Qual valor será exibido?\n\nconst matriz = [[1, 2], [3, 4]];\nconsole.log(matriz[0][1]);',
    concepts: ['Matrizes', 'Índice de linha e coluna'], options: ['1', '2', '3', '4'], correctOption: 1,
    explanation: 'A linha 0 é [1, 2]; o índice 1 dessa linha contém 2.',
  }),
  createExercise({
    id: 'js-strings-01', title: 'Extraindo parte de uma string', language: 'JavaScript',
    category: 'Strings', difficulty: 'Básico',
    statement: 'Qual texto será exibido?\n\nconsole.log("programar".slice(0, 4));',
    concepts: ['Strings', 'slice', 'Índice final exclusivo'], options: ['prog', 'progr', 'gram', 'programar'], correctOption: 0,
    explanation: 'slice(0, 4) inclui os índices 0 a 3 e retorna prog.',
  }),
  createExercise({
    id: 'js-functions-01', title: 'Retorno de uma função', language: 'JavaScript',
    category: 'Funções e métodos', difficulty: 'Iniciante',
    statement: 'Qual valor será exibido?\n\nfunction dobro(n) { return n * 2; }\nconsole.log(dobro(6));',
    concepts: ['Funções', 'Parâmetros', 'return'], options: ['6', '8', '12', '36'], correctOption: 2,
    explanation: 'A função retorna o parâmetro multiplicado por 2: 6 × 2 = 12.',
  }),
  createExercise({
    id: 'js-recursion-01', title: 'Soma recursiva', language: 'JavaScript',
    category: 'Recursividade', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nfunction soma(n) {\n  if (n === 0) return 0;\n  return n + soma(n - 1);\n}\nconsole.log(soma(3));',
    concepts: ['Recursividade', 'Caso base', 'Pilha de chamadas'], options: ['3', '5', '6', '9'], correctOption: 2,
    explanation: 'As chamadas somam 3 + 2 + 1 e terminam no caso base soma(0).',
  }),
  createExercise({
    id: 'js-oop-01', title: 'Chamando um método', language: 'JavaScript',
    category: 'Orientação a objetos', difficulty: 'Básico',
    statement: 'Qual valor será exibido?\n\nclass Contador {\n  constructor() { this.valor = 0; }\n  incrementar() { this.valor++; }\n}\nconst c = new Contador();\nc.incrementar();\nconsole.log(c.valor);',
    concepts: ['Classe', 'Objeto', 'Método', 'this'], options: ['0', '1', '2', 'undefined'], correctOption: 1,
    explanation: 'incrementar aumenta valor em uma unidade.',
  }),
  createExercise({
    id: 'js-datastructures-01', title: 'Tamanho de um conjunto', language: 'JavaScript',
    category: 'Estruturas de dados', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nconst valores = new Set([2, 2, 5, 7]);\nconsole.log(valores.size);',
    concepts: ['Set', 'Elementos únicos', 'size'], options: ['2', '3', '4', '16'], correctOption: 1,
    explanation: 'Set mantém apenas os valores únicos 2, 5 e 7.',
  }),
  createExercise({
    id: 'js-sort-01', title: 'Ordenando números', language: 'JavaScript',
    category: 'Algoritmos de ordenação', difficulty: 'Intermediário',
    statement: 'Qual array será exibido?\n\nconst valores = [10, 2, 1];\nvalores.sort((a, b) => a - b);\nconsole.log(valores);',
    concepts: ['sort', 'Função comparadora', 'Ordem numérica'], options: ['[1, 2, 10]', '[1, 10, 2]', '[10, 2, 1]', '[2, 1, 10]'], correctOption: 0,
    explanation: 'A função comparadora a - b define ordenação numérica crescente.',
  }),
  createExercise({
    id: 'js-search-01', title: 'Procurando um item', language: 'JavaScript',
    category: 'Busca', difficulty: 'Básico',
    statement: 'Qual valor será exibido?\n\nconst valores = [1, 3, 5, 7];\nconsole.log(valores.includes(4));',
    concepts: ['Busca linear', 'includes', 'Booleanos'], options: ['true', 'false', '4', 'undefined'], correctOption: 1,
    explanation: 'O valor 4 não está no array, então includes retorna false.',
  }),
  createExercise({
    id: 'js-stack-01', title: 'Usando um array como pilha', language: 'JavaScript',
    category: 'Listas, pilhas e filas', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nconst pilha = [1, 2];\npilha.push(3);\nconsole.log(pilha.pop());',
    concepts: ['Pilha', 'LIFO', 'push', 'pop'], options: ['1', '2', '3', '[1, 2]'], correctOption: 2,
    explanation: 'pop remove e retorna o último elemento inserido: 3.',
  }),
  createExercise({
    id: 'js-queue-01', title: 'Usando um array como fila', language: 'JavaScript',
    category: 'Listas, pilhas e filas', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nconst fila = [1, 2];\nfila.push(3);\nconsole.log(fila.shift());',
    concepts: ['Fila', 'FIFO', 'push', 'shift'], options: ['1', '2', '3', '[2, 3]'], correctOption: 0,
    explanation: 'shift remove e retorna o primeiro elemento da fila: 1.',
  }),
  createExercise({
    id: 'js-tree-01', title: 'Lendo uma propriedade de nó', language: 'JavaScript',
    category: 'Árvores e grafos', difficulty: 'Intermediário',
    statement: 'Qual valor será exibido?\n\nconst arvore = { valor: 8, esquerda: { valor: 3 } };\nconsole.log(arvore.esquerda.valor);',
    concepts: ['Árvore', 'Nó', 'Objeto aninhado'], options: ['8', '3', 'esquerda', 'undefined'], correctOption: 1,
    explanation: 'A propriedade esquerda contém um objeto cujo valor é 3.',
  }),
  createExercise({
    id: 'js-graph-01', title: 'Lendo vizinhos no grafo', language: 'JavaScript',
    category: 'Árvores e grafos', difficulty: 'Intermediário',
    statement: 'Qual vértice será exibido?\n\nconst grafo = { A: ["B", "C"], B: ["A"] };\nconsole.log(grafo.A[1]);',
    concepts: ['Grafo', 'Lista de adjacência', 'Índices'], options: ['A', 'B', 'C', '1'], correctOption: 2,
    explanation: 'A lista associada ao vértice A é [B, C]; seu índice 1 contém C.',
  }),
  createExercise({
    id: 'js-sort-02', title: 'Ordenação sem alterar o array original', language: 'JavaScript',
    category: 'Algoritmos de ordenação', difficulty: 'Avançado',
    statement: 'Qual valor será exibido?\n\nconst valores = [3, 1, 2];\nconst ordenados = [...valores].sort((a, b) => a - b);\nconsole.log(valores[0], ordenados[0]);',
    concepts: ['Ordenação', 'Spread', 'Cópia de array'], options: ['1 1', '3 1', '1 3', '3 3'], correctOption: 1,
    explanation: 'A ordenação ocorre na cópia; o array original continua começando por 3.',
  }),
  createExercise({
    id: 'js-search-02', title: 'Limite de etapas da busca binária', language: 'JavaScript',
    category: 'Busca', difficulty: 'Avançado',
    statement: 'Em um array ordenado de 8 itens, quantas reduções pela metade levam a um intervalo de 1 item?',
    concepts: ['Busca binária', 'Divisão do intervalo', 'Complexidade logarítmica'], options: ['2', '3', '4', '8'], correctOption: 1,
    explanation: 'O intervalo passa por 8 → 4 → 2 → 1, ou seja, três reduções pela metade.',
  }),
  createExercise({
    id: 'js-graph-02', title: 'Fila inicial de busca em largura', language: 'JavaScript',
    category: 'Árvores e grafos', difficulty: 'Avançado',
    statement: 'Na busca em largura, a fila começa como ["A"]. Depois de remover A e adicionar os vizinhos B e C, qual é a fila?',
    concepts: ['Busca em largura', 'Fila', 'Vizinhos'], options: ['["A"]', '["B", "C"]', '["C", "B"]', '[]'], correctOption: 1,
    explanation: 'A sai da fila e seus vizinhos entram no final na ordem B, C.',
  }),
];

export const exercises: Exercise[] = [...initialExercises, ...additionalExercises];
