# Dockerize uma Aplicação Node.js com MongoDB usando Dockerfile e docker-compose

Este repositório contém um exemplo de como criar e orquestrar uma aplicação Node.js com um banco de dados MongoDB usando Docker. Este README fornece uma explicação de como os arquivos Dockerfile e docker-compose.yml funcionam e como executar a aplicação.

## Arquivo Dockerfile

O arquivo `Dockerfile` é usado para definir como a imagem Docker do serviço Node.js deve ser construída. Aqui estão as principes instruções:

- `FROM node:alpine`: Especifica a imagem base que usaremos, neste caso, "node:alpine".
- `EXPOSE 3001`: Indica que a porta 3001 do contêiner estará disponível para se comunicar com o mundo exterior.
- `WORKDIR /opt/server`: Define o diretório de trabalho atual dentro do contêiner como "/opt/server".
- `COPY ./src /opt/server/src` e `COPY *.json /opt/server/`: Copiam os arquivos do host para o contêiner, incluindo o código-fonte e arquivos de configuração.
- `RUN npm i`: Executa o comando "npm i" para instalar as dependências do Node.js no contêiner.
- `CMD [ "npm", "start" ]`: Define o comando padrão a ser executado quando o contêiner for iniciado, neste caso, "npm start".

## Arquivo docker-compose.yml

O arquivo `docker-compose.yml` é usado para orquestrar os contêineres e serviços da aplicação. Aqui estão as principais configurações:

- `version: '3.8'`: Define a versão do formato do arquivo docker-compose.
- `services`: Define os serviços que compõem a aplicação.
- `server`: Define o serviço para a aplicação Node.js e inclui várias configurações.
  - `container_name: NODE_APP`: Define o nome do contêiner.
  - `build: '.'`: Indica que a imagem deste serviço deve ser construída a partir do Dockerfile no diretório atual.
  - `depends_on`: Especifica que este serviço depende do serviço "db".
  - `ports`: Mapeia a porta 3002 do host para a porta 3001 do contêiner.
  - `networks`: Adiciona o serviço a uma rede chamada "host".
- `db`: Define o serviço para o MongoDB.
  - `container_name: MONGODB_APP`: Define o nome do contêiner.
  - `ports`: Mapeia a porta 27018 do host para a porta 27017 do contêiner.
  - `networks`: Adiciona o serviço à mesma rede "host".
- `networks`: Define a rede chamada "host" como uma rede do tipo bridge.

## Executando a Aplicação

Para construir e executar a aplicação, siga os seguintes passos:

1. Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
2. Navegue até a pasta onde está localizado o arquivo `docker-compose.yml`.
3. Execute o seguinte comando:


Isso iniciará os serviços conforme definido no arquivo `docker-compose.yml`, construirá a imagem do serviço "server" a partir do Dockerfile e iniciará os contêineres. A aplicação Node.js estará disponível na porta 3002 do host e se comunicará com o contêiner MongoDB.

Agora você tem uma aplicação Node.js com MongoDB em contêineres Docker, pronta para ser executada e escalonada conforme necessário.
