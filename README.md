<h1 align="center">Welcome to authentication-app 👋</h1>

> Esse é um projeto de uma api de autenticação de usuários construída utilizando [Django](https://www.djangoproject.com) e [React](https://react.dev) 


## Requisitos

[Docker Compose](https://docs.docker.com/compose/install/)

## Instalação

Authapp é executado utilizando Docker Compose. Para visualizar as configurações acesse o arquivo docker-compose.yaml.

```sh
# clone o repositório:
git clone https://github.com/thaazevedo/auth-app.git

# entre no diretório do repositório:
cd auth-app/

# para iniciar o projeto:
docker-compose up --build
```

Assim, o projeto já estará em execução:

 a. <strong>Frotend:</strong> http://0.0.0.0:81
 
 b. <strong>Backend:</strong> http://0.0.0.0:8000/api/

```
# para finalizar os containers do projeto:
docker-compose down
```

## Usage Auth App

- Para acessar a aplicação, vá para a url http://0.0.0.0:81, onde verá o aplicação React em Execução. Nessa página o usuário poderá entrar no sistema, ou, caso não possua conta, basta se registrar! 
<p float="center">
 <img width="300px" src="https://github.com/thaazevedo/auth-app/assets/76017955/f68f330b-d173-44cc-bb26-31efbe1c0a82">
</p>

- Assim, o usuário será redirecionado ao dashboard de visualizações das informações de sua conta.

- Nesta página o usuário pode:

<p float="center">
 <img width="300px" src="https://github.com/thaazevedo/auth-app/assets/76017955/3e069743-0189-45e6-9976-25989ab5ac46">
</p>

  a. <strong>Sair do sistema:</strong> Ao clicar no ícone no canto superior direito da tela;
  
  b. <strong>Atualizar e validar a edição das informações de sua conta: </strong> Ao clicar em Editar e após isso, em Atualizar;
  
  c. <strong>Apagar a conta: </strong> Ao clicar em Apagar e confirmar a exclusão da conta.

## Usage API

- Para acessar a API, vá para a url http://0.0.0.0:8000/api/)

a. <strong>Registrar um usuário</strong>

 - POST http://0.0.0.0:8000/api/signup/
```json
// request body
{
    "email": "email@email",
    "password": "password",
}
```

b. <strong>Logar um usuário</strong>

 - POST http://0.0.0.0:8000/api/login/
```json
// request body
{
    "email": "email@email",
    "password": "password",
}
```
c. <strong>Pegar informações de um usuário</strong>

 - GET http://0.0.0.0:8000/api/user/[uuid]

d. <strong>Logout de um usuário</strong>

 - POST http://0.0.0.0:8000/api/logout/

e. <strong>Atualizer informações de um usuário</strong>

 - PUT http://0.0.0.0:8000/api/user/[uuid]

f. <strong>Apagar um usuário</strong>

 - DELETE http://0.0.0.0:8000/api/user/[uuid]
 
## API Validators

* E-mail: não pode ser um campo inválido e ser repetido em mais de uma conta;
* Password: não pode ser um campo inválido e ter menos de 6 caracteres.


 ## Inputs Validators

* E-mail: não pode ser um campo vazio e não possui caracteres não comum ao e-mail;
* Password: não pode ser um campo inválido e ter menos de 6 caracteres.

## Run tests

Foram contruídos testes para a aplicação Django, para executar:
```sh
# entre no diretório backend:
python manage.py test
```
Assim, será exibido no terminal a saída da excução dos testes de model e views da API.

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Django](https://www.djangoproject.com)
- [Django Rest Framework](https://www.django-rest-framework.org)
- [React](https://pt-br.reactjs.org/)
- [Nginx](https://www.nginx.com)
- [Gunicorn](https://gunicorn.org)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Author

👤 **Thays Azevedo**

[![Linkedin Badge](https://img.shields.io/badge/-Thays-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/thays-azevedo-0022621ab/)](https://www.linkedin.com/in/thays-azevedo-0022621ab/) [![Gmail Badge](https://img.shields.io/badge/-thaysparecida2015@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:thaysparecida2015@gmail.com)](mailto:thaysparecida2015@gmail.com)
