# Case - Carrossel de Cursos

Essa aplicação foi desenvolvida em `HTML`, `CSS` e `JavaScript Vanilla` (puro).

## Live Version

[GitHub Page](https://guicoutost.github.io/carrossel/)

## Estrutura

A estrutura de arquivos foi feita da seguinte forma:

```
carrossel/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── reset.css
│   │   ├── images/
│   │   │   ├── arrow-left.png
│   │   │   ├── arrow-right.png
│   │   │   ├── favicon.ico
│   │   │   ├── icon-analise-de-experimentos.svg
│   │   │   └── icon-carga-horaria.svg
│   │   └── js/
│   │   │   └── script.js
├── index.html
└── README.md
```

- **`index.html`**: Aqui se encontra a estrutura html da aplicação. Esse arquivo não está dentro do diretório `src` a fim de facilitar seu _deploy_ com o GitHub Pages.
- **`src`**: Esse diretório abriga o código fonte da aplicação.
- **`assets`**: Esse diretório contém os “bens” do projeto, necessários para seu funcionamento, estilização, etc.
- **`css`**: Esse diretório abriga os arquivos `.css` \*\*\*\*da aplicação, responsáveis por sua estilização.
- **`images`**: Esse diretório comporta as imagens/ícones necessárias para a apresentação da aplicação.
- **`js`**: Esse diretório contém o arquivo `script.js`, responsável pela dinâmica da aplicação.

## Construção

### `git`

- Para manter a integridade da _branch_ `main`, utilizada para o _deploy_ da aplicação, foi criada uma _branch_ `development` para o desenvolvimento da aplicação. Posteriormente, quando a aplicação estava pronta, foi realizado um merge entre `main` e `development`.
- Os _commits_ seguiram a especificação [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), para trazer maior padronização e organização ao projeto.

### `html`

- A estrutura `html` do projeto foi feita respeitando a hierarquia dos elementos e pensando em uma maior acessibilidade. Nesse documento foram importados a fonte, os arquivos `.css`, e o arquivo `script.js`.

### `css`

- A estilização foi construída buscando fidedignidade com o layout apresentado no `Figma`.
- Foi utilizado um `reset stylesheet` a fim de reduzir as inconsistências de estilo do _browser_, como valores _default_ de `line-height`, `margin`, `fontsize` dos `headings`, dentre outros.
- Para trazer maior padronização e organização à estilização do projeto, foi utilizada a metodologia `BEM` (Block, Element, Modifier).
- Foram utilizadas `@media queries` para que a aplicação se tornasse responsiva, trazendo mais acessibilidade para usuários que utilizam dispositivos com telas menores.

### `javascript`

- O arquivo `script.js` é o responsável pelo dinamismo da aplicação. O objetivo foi construir de forma simples, uma aplicação funcional e agradável.
- Esse objetivo foi alcançado através da manipulação do DOM (Documento Object Model), da seguinte forma:

  - O primeiro passo foi selecionar os dois `buttons` que movimentam o carrossel e a `div` que contém os cards de cursos:

    ```jsx
    const previewButton = document.getElementById("preview");
    const nextButton = document.getElementById("next");

    const carouselContent = document.querySelector(".carousel__content");
    ```

  - Para registrar uma espera de evento nos botões, foi utilizado um `addEventListener` com o `type=”click”`.
  - Ao reduzir o `width` da `div` que comporta os cards de cursos, seu `overflow` adiciona uma _scroll bar_ horizontal a fim de comportar seu conteúdo (o _overflow_ foi definido com `hidden`, pois o objetivo não é utiliza-lo diretamente na movimentação do carrossel).
  - O DOM possuí uma propriedade chamada `scrollLeft`, que obtém o número de pixels do conteúdo de um elemento que é rolado para a esquerda. Ao somar ou subtrair o valor de `scrollLeft` no escopo do `addEventListener`, é possível movimentar o `scroll` com os `buttons` selecionados:

    ```jsx
    previewButton.addEventListener(
      "click",
      () => {
        carouselContent.scrollLeft -= 10;
      },
      true
    );

    nextButton.addEventListener(
      "click",
      () => {
        carouselContent.scrollLeft += 10;
      },
      true
    );
    ```

  - Essa solução possibilita uma movimentação básica do carrossel de 10 _pixels_ a cada clique, porém essa ação fica pouco agradável para o usuário. A solução disso, foi a utilização do método `setInterval()`. Esse método chama uma função em intervalos especificados em milissegundos. Ele continua chamando a função até `clearInterval()` ser invocado.
  - O primeiro passo foi colocar `carouselContent.scrollLeft` no escopo de `setInterval`:
    ```jsx
    nextButton.addEventListener(
      "click",
      () => {
        let intervalID = setInterval(() => {
          carouselContent.scrollLeft += 10;
        }, 10);
      },
      true
    );
    ```
  - Com o código acima, ao clicar no botão o carrossel se movimenta até o final do _scroll_. Isso acontece porque `clearInterval` não foi invocado, logo `setInterval` soma `scrollLeft` até seu valor máximo, ininterruptamente. Para prevenir esse comportamento foi criada a variável chamada `scrollMeasure` e a ela atribuído o valor inicial igual a 0. Essa variável faz uma espécie de registro de quantos pixels foram somados ou subtraídos do _scroll_. A cada iteração de `setInterval`, essa variável é acrescentada com o mesmo número de pixels acrescidos ou decrescidos à `scrollLeft`.
  - Para chamar `clearInterval`, foi preciso construir uma condicional `if` que comparasse o valor de `scrollMeasure` com um valor que representa a quantidade de _pixels_ percorridos a cada interação dos botões. Se `scrollMeasure` for maior ou igual a esse valor, `clearInterval` é invocado e a animação do carrossel deve parar. Se não, ela continua acontecendo até `scrollMeasure` alcançar esse valor. O código final fica assim:

    ```jsx
    previewButton.addEventListener(
      "click",
      () => {
        scrollMeasure = 0;

        let intervalID = setInterval(() => {
          carouselContent.scrollLeft -= 10;
          scrollMeasure += 10;

          if (scrollMeasure >= 325) {
            clearInterval(intervalID);
          }
        }, 10);
      },
      true
    );

    nextButton.addEventListener(
      "click",
      () => {
        scrollMeasure = 0;

        let intervalID = setInterval(() => {
          carouselContent.scrollLeft += 10;
          scrollMeasure += 10;

          if (scrollMeasure >= 325) {
            clearInterval(intervalID);
          }
        }, 10);
      },
      true
    );
    ```

  - Essa solução deixou o movimento do carrossel mais suave, o que é mais confortável para o usuário.
  - A velocidade da animação do carrossel pode ser aumentada ou diminuída de acordo com os valores acrescentados a `scrollLeft` e `scrollMeasure`. Quanto mais altos os valores, mais rápida é a animação e quanto mais baixos, mais lenta ela é.
  - Alterar o valor do `delay` de `setInterval` também altera a velocidade da animação do carrossel.
  - A quantidade de _pixels_ percorridos também pode ser alterada, implicando em uma animação mais curta ou mais longa.

  ### Referências

  - [scrollLeft](https://developer.mozilla.org/pt-BR/docs/Web/API/Element/scrollLeft)
  - [setInterval](https://developer.mozilla.org/pt-BR/docs/Web/API/setInterval)
