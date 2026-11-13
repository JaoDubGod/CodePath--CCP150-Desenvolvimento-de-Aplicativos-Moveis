# Planejamento inicial — CodePath

## Contexto

CodePath é um aplicativo mobile individual para a disciplina CCP150 — Desenvolvimento de Aplicativos Móveis, do Centro Universitário FEI. O projeto usa React Native com Expo e tem como objetivo apoiar a prática e o acompanhamento dos estudos de programação.

## Problema

Estudantes podem ter dificuldade para manter um histórico de prática e identificar quais conteúdos específicos precisam de reforço. Uma contagem geral de exercícios não diferencia o desempenho em assuntos como estruturas condicionais e recursividade.

## Objetivo geral

Desenvolver um aplicativo mobile que reúna exercícios de programação, registro de estudos e acompanhamento de desempenho por assunto.

## Objetivos específicos

- Organizar exercícios por linguagem, categoria e dificuldade.
- Permitir responder questões e acompanhar tentativas.
- Registrar sessões de estudo, duração e anotações.
- Apresentar uma estimativa de conhecimento por linguagem e categoria.
- Recomendar questões para prática adicional.
- Integrar persistência remota com PostgreSQL via Supabase.
- Utilizar um recurso do dispositivo relacionado à experiência de estudo.

## Escopo inicial

- Navegação por quatro áreas: Início, Exercícios, Diário e Progresso.
- Catálogo inicial de Python e JavaScript com questões de múltipla escolha.
- Diário e acompanhamento básico de tentativas.
- Avaliação determinística por categoria e recomendações.
- Meta semanal e feedback tátil.
- Supabase como persistência remota, com modo local de demonstração.

## Sequência do escopo

- Sistema de autenticação recuperável por e-mail.
- Algoritmo de aprendizagem treinado com dados de uma turma.
- Notificações push.

## Tecnologias escolhidas

- React Native, TypeScript e Expo SDK 58.
- React Navigation para abas e navegação em pilha.
- Supabase JS e PostgreSQL para persistência remota.

Este documento registra o escopo e as decisões iniciais; os critérios de validação que dependem de dispositivo e de projeto Supabase devem ser marcados como concluídos somente após sua execução.