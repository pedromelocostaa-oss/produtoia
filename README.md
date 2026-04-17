# Virada Profissional — Plataforma Educacional sobre IA

Plataforma educacional para profissionais aprenderem a aplicar IA no dia a dia, com módulos, diagnóstico personalizado e comunidade de cases reais.

## Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase (banco de dados + storage)
- React Router v6

## Configurando a Comunidade

A página de Comunidade requer um projeto Supabase configurado. Siga os passos:

### 1. Crie uma conta gratuita em supabase.com

Acesse [supabase.com](https://supabase.com) e crie um novo projeto.

### 2. Rode o SQL das tabelas

No painel do Supabase, acesse **SQL Editor** e rode o conteúdo do arquivo:

```
src/lib/supabase-schema.sql
```

Isso criará as tabelas `cases` e `comments` com as políticas de segurança (RLS).

### 3. Crie o bucket de imagens

No painel do Supabase, acesse **Storage → New Bucket**:
- Nome: `case-images`
- Public bucket: **SIM** (marque como público)

### 4. Copie as credenciais

No painel do Supabase, acesse **Settings → API** e copie:
- **Project URL**
- **anon / public key**

### 5. Configure o .env.local

Crie (ou edite) o arquivo `.env.local` na raiz do projeto:

```
VITE_SUPABASE_URL=sua_project_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 6. Reinicie o servidor

```bash
bun run dev
```

Acesse `/comunidade` para ver a página funcionando.

---

## Desenvolvimento

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Testes

```bash
bun run test
```

---

## Nota sobre autenticação

O sistema de login será implementado futuramente com Supabase Auth.
Por enquanto os usuários se identificam pelo nome ao publicar cases.
A estrutura do banco já está preparada: quando o login for implementado,
basta adicionar coluna `user_id` nas tabelas `cases` e `comments`
referenciando `auth.users`.
