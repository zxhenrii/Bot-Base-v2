### 📦 Instalação de Dependências

#### Usando NPM (recomendado)
```bash
npm install
```

#### Usando Yarn
```bash
yarn install
```

#### Usando PNPM
```bash
pnpm install
```

> 💡 Caso não tenha o Node.js instalado, baixe em: [https://nodejs.org](https://nodejs.org)

---

## 📂 Estrutura de Pastas

```
src/
├── app.ts                  # Arquivo principal
├── commands/               # Comandos organizados por categoria
│   ├── config/
│   └── util/
├── database/               # Conexão e schemas do MongoDB
├── events/                 # Eventos do Discord (messageCreate, ready, etc.)
├── handlers/               # Carregadores de comandos, eventos e DB
├── structures/             # Classes base como Command e ExtendedClient
├── types/                  # Tipagens globais
└── utils/                  # Utilitários (prefixo, deploy de comandos, logger)
```

## ⚙️ Pré-requisitos

- Node.js v18 ou superior
- MongoDB (local ou Atlas)
- Token do bot e URI do MongoDB

## 📦 Instalação

```bash
git clone https://github.com/zxhenrii/Bot-Base-v2.git
cd BotBasev2
npm install
```


## ⚙️ Variáveis de Ambiente

é preciso criar o arquivo `.env` e configure as variáveis da seguinte forma:

```env
TOKEN=<token_bot>
URI=<mongodb_uri>
CLIENT_ID=<bot_id>
```

## 🛠️ Scripts

```bash
# Iniciar o bot
npm run dev

# Compilar TypeScript
npm run build
```

### 💻 Code World
 Entre no meu servidor focado em programação no link abaixo!
👉 [Servidor de programação](https://discord.gg/bqQD8y83mQ)

> Projeto desenvolvido com ❤️ e TypeScript
```
