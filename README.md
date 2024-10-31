# todolist_desafio_v360
Esse repositório contem tanto a aplicação frontend quanto backend (estou utilizando o turborepo - https://turbo.build) da todolist proposta no case técnico da empresa v360

A aplicação é tem funcionalidades e aparence baseada no software já existente Todoist.
Aqui está uma imagem do atual estado do projeto:
![image](https://github.com/user-attachments/assets/11f99218-3f1a-4049-8385-c1104258a4b9)

![image](https://github.com/user-attachments/assets/ae5a6d5b-1eb0-4213-88b8-e728996717fa)

# Tecnologias
 - Frontend: Next.js
 - Backend: Nestj.js
 - ORM: Prisma
 - Banco de dados: Estou utilizando o supabase (https://supabase.com)
 - Oauth2

O que o projeto já tem implementado
- Um usuario pode criar todos para a caixa de entrada
- Um usuario pode colocar informacoes como nome, descricao, para que dia eh o todo, a prioridade da tarefa e uma label.
- Uma task pode ter subtasks (Esta modelado com o Prisma para que a entidade task tenha self-relation, uma task pode ter uma coleção de filhos que tambem sao uma task. tasks filhas referenciam ao id do pai)
- Usuario pode dar check e uncheck nas tasks.
- Usuario tem acesso à caixa de entrada e hoje.

O que está em andamento para implementação:
  - Usuario pode criar um projeto (uma lista com um nome especifico para determinadas tarefas relacionadas a esse projeto)
  - Visualização das telas de cada projeto e as tasks relacionadas a esse projeto (quase finalizado)
  - Criação de labels.

