# Jalim Sistemas | Sinistro Web

Sistema WEB de gerenciamento de sinistros desenvolvido com arquitetura baseada em microserviços utilizando Java e Spring Boot.

O projeto foi criado com foco em aprendizado prático de desenvolvimento backend, APIs REST, persistência de dados e integração entre serviços.

---

## 🚀 Tecnologias utilizadas

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Hibernate
- OpenFeign
- Swagger / OpenAPI
- Maven
- API REST
- Microserviços
- Apache POI (Exportação Excel)

---

## 📌 Funcionalidades

- Cadastro de sinistros
- Listagem de sinistros
- Busca de sinistro por ID
- Busca por nota fiscal
- Atualização de registros
- Exclusão de sinistros
- Exportação de dados para Excel
- Documentação automática com Swagger
- Comunicação entre microserviços com OpenFeign

---

## 🏗️ Estrutura do projeto

O sistema foi dividido em microserviços:

- Sinistro
- Parceiro
- Seguradora
- Config Server

---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/icarofadel/Jalim-Sinistros-API.git
```

---

### 2. Acesse a pasta do projeto

```bash
cd Jalim-Sinistros-API
```

---

### 3. Configure o banco de dados PostgreSQL

Crie um banco de dados local no PostgreSQL.

Exemplo:

```sql
CREATE DATABASE jalim_sinistros;
```

---

### 4. Configure o arquivo `application.properties`

Localização do arquivo:

```txt
src/main/resources/application.properties
```

Altere as informações de conexão do banco conforme seu ambiente local.

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jalim_sinistros
spring.datasource.username=postgres
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 5. Baixe as dependências do projeto

Execute o comando abaixo na raiz do projeto:

```bash
mvn clean install
```

---

### 6. Execute a aplicação

```bash
mvn spring-boot:run
```

Ou execute diretamente pela IDE (STS / IntelliJ).

---

## 📄 Documentação da API

Swagger disponível em:

```txt
http://localhost:8082/swagger-ui/index.html
```

---

## 📂 Endpoints principais

### Sinistros

- GET `/sinistro`
- GET `/sinistro/{id}`
- POST `/sinistro`
- PUT `/sinistro/{id}`
- DELETE `/sinistro/{id}`

### Parceiros

- GET `/parceiro`
- POST `/parceiro`

### Seguradora

- GET `/seguradora`
- POST `/seguradora`

---

## 💡 Objetivo do projeto

O projeto foi desenvolvido com foco em aprendizado e prática de conceitos utilizados no mercado de desenvolvimento backend, incluindo:

- Arquitetura de microserviços
- APIs REST
- Persistência de dados
- Comunicação entre serviços
- Documentação de APIs
- Estruturação de backend com Spring Boot

---

## 🔮 Melhorias futuras

- Autenticação com JWT
- Testes automatizados
- Containerização com Docker
- Deploy em nuvem
- Monitoramento e observabilidade
- Testes de integração
- Mensageria com Kafka

---

## 👨‍💻 Autor

Ícaro Natã Fadel

GitHub:
https://github.com/icarofadel
