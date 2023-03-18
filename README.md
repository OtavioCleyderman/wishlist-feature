# wishlist-feature

Projeto desenvolvido para a etapa do desafio técnico para a vaga de desenvolvedor frontend júnior no LuizaLabs. 

# Feature 

Uma das funcionalidades mais interessantes em um e-commerce
é a Wishlist, ou a lista de desejos. No e-commerce o cliente pode
realizar a busca de produtos, ou pode acessar a tela de detalhes
do produto. Em ambas as telas ele pode selecionar os produtos
de sua preferência e armazená-los na sua Wishlist. A qualquer
momento o cliente pode visualizar sua Wishlist completa, com
todos os produtos que ele selecionou em uma única tela.

# O que deve ser feito?

Como objetivo, você deve criar 2 páginas (telas), conforme a
seguir:
- Uma página de listagem de produtos, onde o cliente poderá
adicionar/remover os produtos na wishlist;
- Outra página onde o cliente poderá listar os produtos que
estão na wishlist e remover se desejar.

# + Dicas

- Testes são excelentes para descrever como o código funciona!
Nós gostamos muito de testes;
- Organizar a estrutura do código, classes e pacotes, também é
relevante;
- Tente reutilizar o máximo possível de código;
- Faça funcionar no Internet Explorer 8 pelo menos;
- Esperamos que o layout fique o máximo possível perto do
desenho e que esteja flexível (responsivo) conforme a largura
da tela;

## Licença

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Autores

- [@OtavioCleyderman](https://github.com/OtavioCleyderman)

# Estrutura e stack utilizada

**Stack:** React, SASS, Axios, Jest, React testing library...

**Estrutura do projeto:**

```shell
  $ Wishlist-feature
  └── public
      └── css
  └── src
      └── assets
          └── sass
      └── components
      └── pages
      └── services
      └── test
      ├── App.jsx
      ├── App.spec.jsx
      ├── AppRoutes.jsx
      └── main.jsx
  ├── index.html
  ├── package.json
  └── README.md
```

## Demonstração

Projeto rodando na vercel: https://wishlist-feature.vercel.app/

### Prévia layout Desktop
![previa desktop](https://user-images.githubusercontent.com/68860740/226080323-d1f7879c-aa8e-4641-9a7e-a2b53ed499aa.png)

### Prévia layout Mobile
![image](https://user-images.githubusercontent.com/68860740/226080410-b4b597cb-9ab4-4a71-8a49-e178e3dd1fbf.png)

# Testes
![image](https://user-images.githubusercontent.com/68860740/226080742-1754cf91-80bd-4328-b35e-c7ea495d13b7.png)


## Para rodar o projeto em sua máquina

Clone este repositorio ou baixe o código fonte. Em seguida, abra a pasta do projeto no seu editor de código favorito.

Após isso, instale as dependências do projeto, rode no terminal:
```
    yarn 
```
ou, se preferir:
```
    npm install 
```
Após as dependências do projeto serem instaladas, inicie a aplicação rodando no terminal o comando:
```
    yarn dev 
```
ou, se preferir:
```
    npm run dev 
```

Pronto, após realizar os passos acima o projeto já iniciou e está rodando na porta **3000**. Acesse o seu navegador favorito e digite na barra de endereço dele:
```
    http://localhost:3000/
```

# Checklist

- [X]  Página Home, de listagem de produtos
- [X]  Página Wishlist, onde mostra os produtos favoritados pelo cliente
- [X]  Consumo de API com a listagem de produtos
- [X]  Layout próximo ao proposto
- [X]  Realização de testes. Teste escolhido foi o unitário. 
- [X]  Reutilização de código, componetização
- [X]  Estruturação, organização e código o mais limpo possível

# Agradecimentos

Muito obrigado por ler até aqui e agradeço ao Luizalabs pela oportunidade de mostrar meus conhecimentos. Sempre em busca de novos conhecimentos e desafios.

**LinkedIn:** www.linkedin.com/in/otavio-ferraz

**E-mail:** otavio.cleydermann@gmail.com
