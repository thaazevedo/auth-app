<h1 align="center">Welcome to authentication-app 👋</h1>

> Esse é um projeto de uma api de autenticação de usuários construída utilizando [Django](https://www.djangoproject.com) e [React](https://react.dev) 


## Requisitos

[Docker Compose](https://docs.docker.com/compose/install/)

## Instalação

Authapp é executando utilizando Docker Compose. Para visualizar as configurações acesse o arquivo docker-compose.yaml

```sh
# clone o repositório
git clone https://github.com/thaazevedo/auth-app.git

# entre no diretório do repositório
cd auth-app

# para iniciar o projeto:
docker-compose up --build

# para finalizar os containers do projeto:
docker-compose down
```

## Usage Auth App

- Para acessar a aplicação, vá para a url http://0.0.0.0:81, onde verá o aplicação React em Execução. Nessa página o usuário poderá entrar no sistema, ou caso não possua conta, basta se registrar! 
<p float="center">
 <img width="300px" src="https://github.com/thaazevedo/auth-app/assets/76017955/f68f330b-d173-44cc-bb26-31efbe1c0a82">
</p>

- Assim, o usuário será redirecionado ao dasboard de visualizações das informações de sua conta.

- Nesta página o usuário pode:

<p float="center">
 <img width="300px" src="https://github.com/thaazevedo/auth-app/assets/76017955/3e069743-0189-45e6-9976-25989ab5ac46">
</p>

  a. Sair do sistema: Ao clickar no ícone no canto superior direito da tela;
  
  b. Atualizer e validar a edição das informações de sua conta: Ao clickar em Editar e após isso, em Atualizar;
  
  c. Apagar a conta: Ao clicker em Apagar e confirmar a exclusão da conta.


## API Validators

* E-mail: não pode ser um campo inválido ou ser repetido em mais de uma conta;
* Password: não pode ser um campo inválido.

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
