[Client] → POST /register <br>
  ↓
  <br>
[Controller] → chama → [Service] → chama → [Repository] → chama → [Prisma]
<br>
  ↑--------------------------------------------------------------------------↑ <br>
(resposta HTTP) ← lógica de negócio ← dados do banco


## Camadas - Clean Architecture

- Controller:	Lida com a requisição e resposta HTTP, Exemplo - O garçom: recebe pedidos e entrega pratos
- Service: Regras de negócio, validação, transformação, Exemplo - O cozinheiro: aplica a lógica de preparo
- Repository: Comunicação com o banco de dados, Exemplo - O estoque: pega ingredientes (dados)
- Prisma Client: O driver do DB (ORM) que executa as queries, Exemplo -	A dispensa: a chave para abrir o estoque

Crie um arquivo .env com:
```.env
PORT=3000
DATABASE_URL="URL do DB Prisma"
```