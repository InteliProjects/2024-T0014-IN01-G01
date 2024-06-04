# 2024-T0014-IN01-G01
Repositório do grupo 2024-T0014-IN01-G01

# Passo a passo para iniciar o ambiente de desenvolvimento do jogo:
Resumo: O jogo está sendo desenvolvido em cima de um template pronto que roda em servidores Node e utiliza o versionador de pacote NPM.
<br>
Para executar o projeto será necessário seguir alguns passos básicos para a execução do projeto.
<br>
Primeiramente é necessário ter as seguintes dependencias instaladas:
Node JS: Versão >= 20.11
NPM: Versão >= 10.2.4

## 1° Passo
Primeiro precisaremos instalar todos os pacotes usados pelo projeto. Para isso, em um prompt de comando será necessário executar o seguintes comandos:
<br>
```npm install```

<p align="center">
  <img src="https://github.com/Inteli-College/2024-T0014-IN01-G01/assets/70596205/46585fda-b76c-4fe1-a7cc-a3ef3aac07ca">
  <br>
  <em>Resposta do terminal</em>
</p>

## 2° Passo
Instalado as dependencias, nosso projeto está pronto para ser executado.
<br>
Para iniciar o servidor do mesmo. Primeiro, em um prompt de comando você deverá executar o seguinte comando:
<br>
```npm run dev```
<p align="center">
  <img src="https://github.com/Inteli-College/2024-T0014-IN01-G01/assets/70596205/4b2c10c6-c029-43f8-b4c8-4c5ac10b2461">
  <br>
  <em>Resposta do terminal</em>
</p>

## Ultimo passo
Feito os passos acima o jogo deve automáticamente abrir no seu navegador, porém, caso isso não ocorra tente jogar o CAMINHO ``localhost:8080``.
<br>
Em alguns casos o processo de iniciar o jogo pode falhar por falta de permissão do node para acessar a porta solicitada (8080) ou por essa porta já estar sendo usada por outro aplicação, isso dependerá da mensagem indicada no prompt de comando.

### Possíveis soluções:
Caso algum dos erros acima aconteça, você pode simplesmente dar a permissão ao node para acessar a porta solicitada (8080) ou encerrar a aplicação que está usando a mesma porta. Isso pode resolver o erro.
