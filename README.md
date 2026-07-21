# Anexador de PDF

Aplicação web simples para juntar (mesclar) vários arquivos PDF em um único arquivo, direto pelo navegador.

<img width="1250" height="496" alt="Organizador-de-PDFs-07-21-2026_10_54_AM" src="https://github.com/user-attachments/assets/534e09fb-d787-4079-a5d9-897a41f244bd" />

---
## Funcionalidades

- Upload de múltiplos arquivos PDF
- Ordenação automática dos arquivos pelo nome (ordem numérica/alfabética)
- Mesclagem de todos os PDFs em um único arquivo
- Download do PDF final gerado

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) — servidor web
- [Multer](https://github.com/expressjs/multer) — upload de arquivos
- [pdf-merger-js](https://www.npmjs.com/package/pdf-merger-js) — mesclagem dos PDFs
- HTML, CSS e JavaScript puro no front-end

## Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/JVictorFreitasM/Anexador-de-pdf.git
   cd Anexador-de-pdf
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node server.js
   ```

4. Acesse no navegador:
   ```
   http://localhost:3987
   ```

## Como usar

1. Abra a aplicação no navegador.
2. Selecione os arquivos PDF que deseja juntar.
3. Envie os arquivos para mesclagem.
4. Baixe o PDF final já unificado.

## Estrutura do projeto

```
Anexador-de-pdf/
├── public/
│   ├── index.html    # Página principal
│   ├── style.css      # Estilos
│   └── app.js         # Lógica do front-end
├── server.js           # Servidor Express e rota de mesclagem
├── package.json
└── package-lock.json
```

## Observações

- Os arquivos enviados são armazenados temporariamente na pasta `uploads/` e removidos automaticamente após a mesclagem.
- O PDF final é salvo na pasta `merged/` com um nome único baseado em timestamp (ex: `LOTE_1234567890.pdf`).

## Licença

ISC
