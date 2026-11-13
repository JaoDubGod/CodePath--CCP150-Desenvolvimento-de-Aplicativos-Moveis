const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const scriptDirectory = path.dirname(require.resolve('./generate-exercise-seed.cjs'));
const sourcePath = path.join(scriptDirectory, '..', 'src', 'data', 'exercises.ts');
const outputPath = path.join(scriptDirectory, '..', 'supabase', 'seed.sql');
const source = fs.readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleObject = { exports: {} };
vm.runInNewContext(compiled, { exports: moduleObject.exports, module: moduleObject });
const exercises = moduleObject.exports.exercises;

function sql(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function slug(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const languages = [...new Set(exercises.map((exercise) => exercise.language))];
const categories = [...new Set(exercises.map((exercise) => exercise.category))];
const statements = [
  '-- Arquivo gerado por scripts/generate-exercise-seed.cjs. Nao editar manualmente.',
  'insert into public.languages (id, name) values',
  languages.map((name) => `  (${sql(slug(name))}, ${sql(name)})`).join(',\n') +
    '\non conflict (id) do update set name = excluded.name;',
  '',
  'insert into public.categories (id, name) values',
  categories.map((name) => `  (${sql(slug(name))}, ${sql(name)})`).join(',\n') +
    '\non conflict (id) do update set name = excluded.name;',
  '',
  'insert into public.exercises (id, title, language_id, category_id, difficulty, statement, expected_input, example, concepts, evaluation_criteria, options) values',
  exercises.map((exercise) => `  (${[
    sql(exercise.id), sql(exercise.title), sql(slug(exercise.language)),
    sql(slug(exercise.category)), sql(exercise.difficulty), sql(exercise.statement),
    sql(exercise.expectedInput), sql(exercise.example),
    `array[${exercise.concepts.map(sql).join(', ')}]::text[]`,
    sql(exercise.evaluationCriteria), `${sql(JSON.stringify(exercise.options))}::jsonb`,
  ].join(', ')})`).join(',\n') +
    '\non conflict (id) do update set title = excluded.title, language_id = excluded.language_id, category_id = excluded.category_id, difficulty = excluded.difficulty, statement = excluded.statement, expected_input = excluded.expected_input, example = excluded.example, concepts = excluded.concepts, evaluation_criteria = excluded.evaluation_criteria, options = excluded.options;',
  '',
  'insert into private.exercise_answer_keys (exercise_id, correct_option, expected_output, explanation) values',
  exercises.map((exercise) => `  (${sql(exercise.id)}, ${exercise.correctOption}, ${sql(exercise.expectedOutput)}, ${sql(exercise.explanation)})`).join(',\n') +
    '\non conflict (exercise_id) do update set correct_option = excluded.correct_option, expected_output = excluded.expected_output, explanation = excluded.explanation;',
  '',
].join('\n');

fs.writeFileSync(outputPath, statements, 'utf8');
console.log(`Seed criado com ${exercises.length} exercicios: ${path.relative(process.cwd(), outputPath)}`);
