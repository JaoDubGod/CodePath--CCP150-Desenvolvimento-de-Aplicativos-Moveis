insert into public.languages (id, name) values
  ('python', 'Python'),
  ('javascript', 'JavaScript')
on conflict (id) do update set name = excluded.name;

insert into public.categories (id, name) values
  ('variaveis-e-tipos-de-dados', 'Variáveis e tipos de dados'),
  ('operadores', 'Operadores'),
  ('estruturas-condicionais', 'Estruturas condicionais'),
  ('estruturas-de-repeticao', 'Estruturas de repetição'),
  ('arrays-e-matrizes', 'Arrays e matrizes'),
  ('strings', 'Strings'),
  ('funcoes-e-metodos', 'Funções e métodos'),
  ('recursividade', 'Recursividade'),
  ('orientacao-a-objetos', 'Orientação a objetos'),
  ('estruturas-de-dados', 'Estruturas de dados'),
  ('algoritmos-de-ordenacao', 'Algoritmos de ordenação'),
  ('busca', 'Busca'),
  ('listas-pilhas-e-filas', 'Listas, pilhas e filas'),
  ('arvores-e-grafos', 'Árvores e grafos')
on conflict (id) do update set name = excluded.name;

insert into public.exercises (id, title, language_id, category_id, difficulty, statement, expected_input, example, concepts, evaluation_criteria, options) values
  ('py-variables-01', 'Somando duas variáveis', 'python', 'variaveis-e-tipos-de-dados', 'Iniciante', 'Qual valor será exibido pelo código?

a = 7
b = 3
print(a + b)', 'Nenhuma entrada externa.', 'Código: a = 7, b = 3
Saída: 10', array['Variáveis', 'Números inteiros', 'Soma']::text[], 'A resposta deve corresponder exatamente à saída impressa.', '["4","10","73","a + b"]'::jsonb),
  ('py-operators-01', 'Resto da divisão', 'python', 'operadores', 'Iniciante', 'Qual valor será exibido?

print(17 % 5)', 'Nenhuma entrada externa.', 'Código: print(17 % 5)
Saída: 2', array['Operador módulo', 'Divisão inteira']::text[], 'A resposta deve ser o resto da divisão de 17 por 5.', '["3","2","3.4","0"]'::jsonb),
  ('py-conditionals-01', 'Verificando uma condição', 'python', 'estruturas-condicionais', 'Iniciante', 'Qual palavra será exibida?

temperatura = 31
if temperatura >= 30:
    print("quente")
else:
    print("ameno")', 'Nenhuma entrada externa.', 'temperatura = 31
Saída: quente', array['if e else', 'Comparação numérica']::text[], 'A resposta deve indicar o ramo executado quando a condição é verdadeira.', '["quente","ameno","31","Nenhuma saída"]'::jsonb),
  ('py-loops-01', 'Somando em um laço', 'python', 'estruturas-de-repeticao', 'Básico', 'Qual valor será exibido ao final?

total = 0
for numero in range(1, 4):
    total += numero
print(total)', 'Nenhuma entrada externa.', 'Os valores somados são 1, 2 e 3.
Saída: 6', array['for', 'range', 'Acumulador']::text[], 'A resposta deve somar os três valores percorridos pelo laço.', '["3","4","6","10"]'::jsonb),
  ('js-variables-01', 'Exibindo uma string', 'javascript', 'variaveis-e-tipos-de-dados', 'Iniciante', 'O que será exibido no console?

const linguagem = "JavaScript";
console.log(linguagem);', 'Nenhuma entrada externa.', 'linguagem contém "JavaScript".
Saída: JavaScript', array['const', 'String', 'console.log']::text[], 'A resposta deve reproduzir o texto guardado na variável.', '["linguagem","JavaScript","const","Nada"]'::jsonb),
  ('js-operators-01', 'Divisão em JavaScript', 'javascript', 'operadores', 'Iniciante', 'Qual número será exibido?

console.log(10 / 4);', 'Nenhuma entrada externa.', 'Código: console.log(10 / 4)
Saída: 2.5', array['Operador de divisão', 'Números']::text[], 'A resposta deve ser o resultado numérico da divisão.', '["2","2.5","4","0"]'::jsonb),
  ('js-conditionals-01', 'Aprovado ou reprovado', 'javascript', 'estruturas-condicionais', 'Iniciante', 'Qual palavra será exibida?

const nota = 75;
if (nota >= 60) {
  console.log("aprovado");
} else {
  console.log("reprovado");
}', 'Nenhuma entrada externa.', 'nota = 75
Saída: aprovado', array['if e else', 'Comparação numérica']::text[], 'A resposta deve indicar o ramo executado para nota 75.', '["aprovado","reprovado","75","Nenhuma saída"]'::jsonb),
  ('js-loops-01', 'Contando repetições', 'javascript', 'estruturas-de-repeticao', 'Básico', 'Quais valores aparecem no console?

for (let i = 0; i < 3; i++) {
  console.log(i);
}', 'Nenhuma entrada externa.', 'O laço começa em 0 e para antes de 3.
Saída: 0, 1, 2', array['for', 'Condição de parada', 'Incremento']::text[], 'A resposta deve listar cada valor exibido, na ordem.', '["1, 2, 3","0, 1, 2","0, 1, 2, 3","3"]'::jsonb),
  ('py-arrays-01', 'Acessando um elemento da lista', 'python', 'arrays-e-matrizes', 'Iniciante', 'Qual valor será exibido?

valores = [2, 4, 6]
print(valores[1])', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 4', array['Listas', 'Índice iniciado em zero']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["2","4","6","1"]'::jsonb),
  ('py-matrix-01', 'Acessando uma matriz', 'python', 'arrays-e-matrizes', 'Básico', 'Qual valor será exibido?

matriz = [[1, 2], [3, 4]]
print(matriz[1][0])', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Matrizes', 'Índice de linha e coluna']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1","2","3","4"]'::jsonb),
  ('py-strings-01', 'Fatiando uma string', 'python', 'strings', 'Básico', 'Qual texto será exibido?

palavra = "codigo"
print(palavra[0:3])', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: cod', array['Strings', 'Fatiamento']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["cod","codi","igo","codigo"]'::jsonb),
  ('py-functions-01', 'Chamando uma função', 'python', 'funcoes-e-metodos', 'Iniciante', 'Qual valor será exibido?

def dobro(n):
    return n * 2

print(dobro(5))', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 10', array['Parâmetros', 'return', 'Chamada de função']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["5","7","10","25"]'::jsonb),
  ('py-recursion-01', 'Soma recursiva', 'python', 'recursividade', 'Intermediário', 'Qual valor será exibido?

def soma(n):
    if n == 0:
        return 0
    return n + soma(n - 1)

print(soma(4))', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 10', array['Recursividade', 'Caso base', 'Pilha de chamadas']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["4","6","10","24"]'::jsonb),
  ('py-oop-01', 'Atributo de um objeto', 'python', 'orientacao-a-objetos', 'Básico', 'O que será exibido?

class Animal:
    def __init__(self, nome):
        self.nome = nome

a = Animal("Lua")
print(a.nome)', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: Lua', array['Classe', 'Objeto', 'Construtor', 'Atributo']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["Animal","nome","Lua","None"]'::jsonb),
  ('py-datastructures-01', 'Contando itens únicos', 'python', 'estruturas-de-dados', 'Intermediário', 'Qual valor será exibido?

valores = {2, 2, 5, 7}
print(len(valores))', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Conjunto', 'Remoção de duplicatas', 'len']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["2","3","4","16"]'::jsonb),
  ('py-sort-01', 'Ordenando uma lista', 'python', 'algoritmos-de-ordenacao', 'Básico', 'Qual lista será exibida?

valores = [3, 1, 2]
print(sorted(valores))', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: [1, 2, 3]', array['Ordenação', 'Ordem crescente', 'sorted']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["[3, 1, 2]","[1, 2, 3]","[2, 1, 3]","[3, 2, 1]"]'::jsonb),
  ('py-search-01', 'Busca por pertencimento', 'python', 'busca', 'Básico', 'Qual valor será exibido?

valores = [1, 3, 5, 7]
print(5 in valores)', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: True', array['Busca linear', 'Operador in', 'Booleanos']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["True","False","5","None"]'::jsonb),
  ('py-stack-01', 'Removendo do topo da pilha', 'python', 'listas-pilhas-e-filas', 'Intermediário', 'Qual valor será exibido?

pilha = [1, 2]
pilha.append(3)
print(pilha.pop())', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Pilha', 'LIFO', 'append', 'pop']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1","2","3","[1, 2]"]'::jsonb),
  ('py-queue-01', 'Removendo do início da fila', 'python', 'listas-pilhas-e-filas', 'Intermediário', 'Qual valor será exibido?

fila = [1, 2]
fila.append(3)
print(fila.pop(0))', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 1', array['Fila', 'FIFO', 'Ordem de remoção']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1","2","3","[2, 3]"]'::jsonb),
  ('py-tree-01', 'Lendo um nó filho', 'python', 'arvores-e-grafos', 'Intermediário', 'Qual valor será exibido?

arvore = {"valor": 8, "esquerda": {"valor": 3}}
print(arvore["esquerda"]["valor"])', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Árvore', 'Nó', 'Dicionário aninhado']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["8","3","esquerda","Erro"]'::jsonb),
  ('py-graph-01', 'Vizinho em uma lista de adjacência', 'python', 'arvores-e-grafos', 'Intermediário', 'Qual vértice será exibido?

grafo = {"A": ["B", "C"], "B": ["A"]}
print(grafo["A"][1])', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: C', array['Grafo', 'Lista de adjacência', 'Índices']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["A","B","C","1"]'::jsonb),
  ('py-sort-02', 'Comparando duas ordenações', 'python', 'algoritmos-de-ordenacao', 'Avançado', 'Qual sequência aparece?

valores = [4, 1, 3, 2]
valores.sort(reverse=True)
print(valores)', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: [4, 3, 2, 1]', array['Ordenação', 'Ordem decrescente', 'Mutação de lista']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["[1, 2, 3, 4]","[4, 3, 2, 1]","[2, 1, 4, 3]","[4, 1, 3, 2]"]'::jsonb),
  ('py-search-02', 'Busca binária e intervalo', 'python', 'busca', 'Avançado', 'Em uma lista ordenada de 8 itens, quantas metades no máximo são necessárias para chegar a um único item usando busca binária?', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Busca binária', 'Divisão do intervalo', 'Complexidade logarítmica']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["2","3","4","8"]'::jsonb),
  ('py-graph-02', 'Primeiro passo de uma busca em largura', 'python', 'arvores-e-grafos', 'Avançado', 'Na busca em largura, a fila começa com ["A"]. Após remover A e adicionar seus vizinhos B e C, qual é a fila?', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: ["B", "C"]', array['Busca em largura', 'Fila', 'Vizinhos']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["[\"A\"]","[\"B\", \"C\"]","[\"C\", \"B\"]","[]"]'::jsonb),
  ('js-arrays-01', 'Acessando um elemento do array', 'javascript', 'arrays-e-matrizes', 'Iniciante', 'Qual valor será exibido?

const valores = [2, 4, 6];
console.log(valores[2]);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 6', array['Array', 'Índice iniciado em zero']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["2","4","6","2,4"]'::jsonb),
  ('js-matrix-01', 'Acessando um valor em matriz', 'javascript', 'arrays-e-matrizes', 'Básico', 'Qual valor será exibido?

const matriz = [[1, 2], [3, 4]];
console.log(matriz[0][1]);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 2', array['Matrizes', 'Índice de linha e coluna']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1","2","3","4"]'::jsonb),
  ('js-strings-01', 'Extraindo parte de uma string', 'javascript', 'strings', 'Básico', 'Qual texto será exibido?

console.log("programar".slice(0, 4));', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: prog', array['Strings', 'slice', 'Índice final exclusivo']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["prog","progr","gram","programar"]'::jsonb),
  ('js-functions-01', 'Retorno de uma função', 'javascript', 'funcoes-e-metodos', 'Iniciante', 'Qual valor será exibido?

function dobro(n) { return n * 2; }
console.log(dobro(6));', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 12', array['Funções', 'Parâmetros', 'return']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["6","8","12","36"]'::jsonb),
  ('js-recursion-01', 'Soma recursiva', 'javascript', 'recursividade', 'Intermediário', 'Qual valor será exibido?

function soma(n) {
  if (n === 0) return 0;
  return n + soma(n - 1);
}
console.log(soma(3));', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 6', array['Recursividade', 'Caso base', 'Pilha de chamadas']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["3","5","6","9"]'::jsonb),
  ('js-oop-01', 'Chamando um método', 'javascript', 'orientacao-a-objetos', 'Básico', 'Qual valor será exibido?

class Contador {
  constructor() { this.valor = 0; }
  incrementar() { this.valor++; }
}
const c = new Contador();
c.incrementar();
console.log(c.valor);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 1', array['Classe', 'Objeto', 'Método', 'this']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["0","1","2","undefined"]'::jsonb),
  ('js-datastructures-01', 'Tamanho de um conjunto', 'javascript', 'estruturas-de-dados', 'Intermediário', 'Qual valor será exibido?

const valores = new Set([2, 2, 5, 7]);
console.log(valores.size);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Set', 'Elementos únicos', 'size']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["2","3","4","16"]'::jsonb),
  ('js-sort-01', 'Ordenando números', 'javascript', 'algoritmos-de-ordenacao', 'Intermediário', 'Qual array será exibido?

const valores = [10, 2, 1];
valores.sort((a, b) => a - b);
console.log(valores);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: [1, 2, 10]', array['sort', 'Função comparadora', 'Ordem numérica']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["[1, 2, 10]","[1, 10, 2]","[10, 2, 1]","[2, 1, 10]"]'::jsonb),
  ('js-search-01', 'Procurando um item', 'javascript', 'busca', 'Básico', 'Qual valor será exibido?

const valores = [1, 3, 5, 7];
console.log(valores.includes(4));', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: false', array['Busca linear', 'includes', 'Booleanos']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["true","false","4","undefined"]'::jsonb),
  ('js-stack-01', 'Usando um array como pilha', 'javascript', 'listas-pilhas-e-filas', 'Intermediário', 'Qual valor será exibido?

const pilha = [1, 2];
pilha.push(3);
console.log(pilha.pop());', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Pilha', 'LIFO', 'push', 'pop']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1","2","3","[1, 2]"]'::jsonb),
  ('js-queue-01', 'Usando um array como fila', 'javascript', 'listas-pilhas-e-filas', 'Intermediário', 'Qual valor será exibido?

const fila = [1, 2];
fila.push(3);
console.log(fila.shift());', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 1', array['Fila', 'FIFO', 'push', 'shift']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1","2","3","[2, 3]"]'::jsonb),
  ('js-tree-01', 'Lendo uma propriedade de nó', 'javascript', 'arvores-e-grafos', 'Intermediário', 'Qual valor será exibido?

const arvore = { valor: 8, esquerda: { valor: 3 } };
console.log(arvore.esquerda.valor);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Árvore', 'Nó', 'Objeto aninhado']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["8","3","esquerda","undefined"]'::jsonb),
  ('js-graph-01', 'Lendo vizinhos no grafo', 'javascript', 'arvores-e-grafos', 'Intermediário', 'Qual vértice será exibido?

const grafo = { A: ["B", "C"], B: ["A"] };
console.log(grafo.A[1]);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: C', array['Grafo', 'Lista de adjacência', 'Índices']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["A","B","C","1"]'::jsonb),
  ('js-sort-02', 'Ordenação sem alterar o array original', 'javascript', 'algoritmos-de-ordenacao', 'Avançado', 'Qual valor será exibido?

const valores = [3, 1, 2];
const ordenados = [...valores].sort((a, b) => a - b);
console.log(valores[0], ordenados[0]);', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3 1', array['Ordenação', 'Spread', 'Cópia de array']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["1 1","3 1","1 3","3 3"]'::jsonb),
  ('js-search-02', 'Limite de etapas da busca binária', 'javascript', 'busca', 'Avançado', 'Em um array ordenado de 8 itens, quantas reduções pela metade levam a um intervalo de 1 item?', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: 3', array['Busca binária', 'Divisão do intervalo', 'Complexidade logarítmica']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["2","3","4","8"]'::jsonb),
  ('js-graph-02', 'Fila inicial de busca em largura', 'javascript', 'arvores-e-grafos', 'Avançado', 'Na busca em largura, a fila começa como ["A"]. Depois de remover A e adicionar os vizinhos B e C, qual é a fila?', 'Nenhuma entrada externa.', 'Código do enunciado.
Saída: ["B", "C"]', array['Busca em largura', 'Fila', 'Vizinhos']::text[], 'A resposta selecionada deve corresponder à saída do trecho fornecido.', '["[\"A\"]","[\"B\", \"C\"]","[\"C\", \"B\"]","[]"]'::jsonb)
on conflict (id) do update set title = excluded.title, language_id = excluded.language_id, category_id = excluded.category_id, difficulty = excluded.difficulty, statement = excluded.statement, expected_input = excluded.expected_input, example = excluded.example, concepts = excluded.concepts, evaluation_criteria = excluded.evaluation_criteria, options = excluded.options;

insert into private.exercise_answer_keys (exercise_id, correct_option, expected_output, explanation) values
  ('py-variables-01', 1, '10', 'O operador + soma os valores guardados em a e b: 7 + 3 = 10.'),
  ('py-operators-01', 1, '2', '17 dividido por 5 deixa resto 2. Em Python, % calcula esse resto.'),
  ('py-conditionals-01', 0, 'quente', '31 é maior ou igual a 30, então o bloco do if é executado.'),
  ('py-loops-01', 2, '6', 'range(1, 4) produz 1, 2 e 3. O acumulador termina com 1 + 2 + 3 = 6.'),
  ('js-variables-01', 1, 'JavaScript', 'console.log recebe o valor da variável e exibe o conteúdo da string.'),
  ('js-operators-01', 1, '2.5', 'O operador / realiza divisão e pode produzir um número decimal.'),
  ('js-conditionals-01', 0, 'aprovado', '75 >= 60 é verdadeiro, então o primeiro bloco é executado.'),
  ('js-loops-01', 1, '0, 1, 2', 'O laço inicia em 0 e executa enquanto i < 3. Assim, exibe 0, 1 e 2.'),
  ('py-arrays-01', 1, '4', 'O índice 1 aponta para o segundo elemento, que é 4.'),
  ('py-matrix-01', 2, '3', 'A linha de índice 1 é [3, 4]; dentro dela, o índice 0 contém 3.'),
  ('py-strings-01', 0, 'cod', 'O início 0 é incluído e o fim 3 não é incluído. O resultado é cod.'),
  ('py-functions-01', 2, '10', 'A função recebe 5 e retorna 5 multiplicado por 2.'),
  ('py-recursion-01', 2, '10', 'As chamadas somam 4 + 3 + 2 + 1 e terminam no caso base soma(0).'),
  ('py-oop-01', 2, 'Lua', 'O construtor guarda Lua no atributo nome do objeto a.'),
  ('py-datastructures-01', 1, '3', 'Um conjunto mantém apenas valores únicos: 2, 5 e 7.'),
  ('py-sort-01', 1, '[1, 2, 3]', 'sorted cria uma lista ordenada em ordem crescente.'),
  ('py-search-01', 0, 'True', 'O valor 5 está na lista, então a expressão in resulta em True.'),
  ('py-stack-01', 2, '3', 'pop sem índice remove e retorna o último elemento, 3.'),
  ('py-queue-01', 0, '1', 'pop(0) remove o elemento do início da lista, que é 1.'),
  ('py-tree-01', 1, '3', 'A chave esquerda contém outro dicionário cujo valor é 3.'),
  ('py-graph-01', 2, 'C', 'A lista associada a A é [B, C]; o índice 1 contém C.'),
  ('py-sort-02', 1, '[4, 3, 2, 1]', 'sort modifica a própria lista; reverse=True pede ordem decrescente.'),
  ('py-search-02', 1, '3', 'A cada passo o intervalo cai pela metade: 8 → 4 → 2 → 1, totalizando 3 reduções.'),
  ('py-graph-02', 1, '["B", "C"]', 'A é removido; seus vizinhos são adicionados ao final da fila na ordem B, C.'),
  ('js-arrays-01', 2, '6', 'O índice 2 aponta para o terceiro elemento do array, que é 6.'),
  ('js-matrix-01', 1, '2', 'A linha 0 é [1, 2]; o índice 1 dessa linha contém 2.'),
  ('js-strings-01', 0, 'prog', 'slice(0, 4) inclui os índices 0 a 3 e retorna prog.'),
  ('js-functions-01', 2, '12', 'A função retorna o parâmetro multiplicado por 2: 6 × 2 = 12.'),
  ('js-recursion-01', 2, '6', 'As chamadas somam 3 + 2 + 1 e terminam no caso base soma(0).'),
  ('js-oop-01', 1, '1', 'incrementar aumenta valor em uma unidade.'),
  ('js-datastructures-01', 1, '3', 'Set mantém apenas os valores únicos 2, 5 e 7.'),
  ('js-sort-01', 0, '[1, 2, 10]', 'A função comparadora a - b define ordenação numérica crescente.'),
  ('js-search-01', 1, 'false', 'O valor 4 não está no array, então includes retorna false.'),
  ('js-stack-01', 2, '3', 'pop remove e retorna o último elemento inserido: 3.'),
  ('js-queue-01', 0, '1', 'shift remove e retorna o primeiro elemento da fila: 1.'),
  ('js-tree-01', 1, '3', 'A propriedade esquerda contém um objeto cujo valor é 3.'),
  ('js-graph-01', 2, 'C', 'A lista associada ao vértice A é [B, C]; seu índice 1 contém C.'),
  ('js-sort-02', 1, '3 1', 'A ordenação ocorre na cópia; o array original continua começando por 3.'),
  ('js-search-02', 1, '3', 'O intervalo passa por 8 → 4 → 2 → 1, ou seja, três reduções pela metade.'),
  ('js-graph-02', 1, '["B", "C"]', 'A sai da fila e seus vizinhos entram no final na ordem B, C.')
on conflict (exercise_id) do update set correct_option = excluded.correct_option, expected_output = excluded.expected_output, explanation = excluded.explanation;
