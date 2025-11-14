
# Grupo VOLL - Gerador de Fotos Corporativas com IA

![Demonstração do Aplicativo](https://i.imgur.com/LgHwF3E.png)

## 📜 Descrição

Este é um aplicativo web desenvolvido para o **Grupo VOLL** que utiliza o poder da inteligência artificial do Google (Gemini) para transformar uma foto de rosto comum em fotos de perfil corporativas e profissionais. A ferramenta é ideal para colaboradores que desejam atualizar suas fotos em redes como o LinkedIn, mantendo um padrão de alta qualidade e alinhado à identidade da empresa.

O usuário simplesmente faz o upload de uma foto, personaliza algumas opções, e a IA gera quatro imagens distintas, prontas para download.

## ✨ Funcionalidades

- **Upload de Imagem**: Interface intuitiva com suporte para arrastar e soltar (drag-and-drop) ou seleção de arquivo.
- **Geração com IA**: Utiliza o modelo `gemini-2.5-flash-image` para criar 4 estilos de fotos:
  - Casual Corporativo
  - Sério e Confiante
  - Profissional Intermediário
  - Preto e Branco Elegante
- **Personalização Avançada**:
  - **Ambiente de Fundo**: Escolha entre um "Escritório" moderno ou um "Estúdio de Pilates" profissional.
  - **Inclusão de Logo**: Opção para adicionar o logo "VOLL Pilates Group" de forma discreta na roupa.
- **Fidelidade Facial**: As instruções para a IA são otimizadas para preservar todas as características do rosto, cabelo, acessórios e textura da pele da pessoa.
- **Download Fácil**: Cada imagem gerada possui um botão para download direto em formato PNG.
- **Interface Moderna**: Design responsivo com um elegante tema escuro (Dark Mode).

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React com TypeScript
- **Estilização**: Tailwind CSS
- **IA Generativa**: Google Gemini API (`@google/genai`)
- **Build Tool**: Vite
- **Deploy**: Vercel

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o aplicativo em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 1. Clonar o Repositório

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente

Para que o aplicativo possa se comunicar com a API do Gemini, você precisa de uma API Key.

a. Crie um arquivo chamado `.env` na raiz do projeto.

b. Adicione a seguinte linha ao arquivo `.env`, substituindo `SUA_API_KEY_AQUI` pela sua chave real do Google AI Studio:

```
VITE_API_KEY=SUA_API_KEY_AQUI
```

> **Importante**: O prefixo `VITE_` é obrigatório para que a variável de ambiente seja acessível no código do frontend em projetos que usam Vite.

### 4. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no seu terminal) para ver o aplicativo em execução.

## 🌐 Deploy na Vercel

Publicar este projeto na Vercel é um processo simples:

1.  **Envie seu código para um repositório no GitHub.**
2.  **Crie um novo projeto na Vercel** e importe o seu repositório do GitHub.
3.  **A Vercel detectará automaticamente que é um projeto Vite** e configurará as definições de build (`npm run build`) e o diretório de saída (`dist`).
4.  **Configure a Variável de Ambiente**:
    - Vá para as configurações do projeto na Vercel (`Settings` > `Environment Variables`).
    - Adicione uma variável com a **Key**: `VITE_API_KEY`.
    - No campo **Value**, cole a sua chave da API do Google Gemini.
5.  **Clique em "Deploy"**. A Vercel cuidará do resto e fornecerá a URL do seu aplicativo publicado.

## 📂 Estrutura do Projeto

```
/
├── public/
│   └── assets/
│       └── logo.png       # Logo (se usado como arquivo estático)
├── src/
│   ├── components/        # Componentes React reutilizáveis (Uploader, Card, etc.)
│   ├── services/          # Lógica de comunicação com a API Gemini
│   ├── App.tsx            # Componente principal que gerencia o estado da aplicação
│   ├── index.css          # Estilos globais
│   └── index.tsx          # Ponto de entrada da aplicação React
├── .env                   # Arquivo para variáveis de ambiente (local)
├── index.html             # Arquivo HTML principal
└── README.md              # Documentação do projeto
```
