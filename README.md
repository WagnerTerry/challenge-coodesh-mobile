# Challenge Coodesh Mobile

>**Nota**: Desafio de criar um dicionário em inglês com React Native.

## Print do projeto

<p align="center">
  <img src="https://github.com/WagnerTerry/challenge-coodesh-mobile/blob/main/src/assets/tela%201.png" alt="Tela 1" />
</p>

<p align="center">
  <img src="https://github.com/WagnerTerry/challenge-coodesh-mobile/blob/main/src/assets/tela%202.png" alt="Tela 2" />
</p>

<p align="center">
  <img src="https://github.com/WagnerTerry/challenge-coodesh-mobile/blob/main/src/assets/tela%203.png" alt="Tela 3" />
</p>

## Criando projeto

- npx react-native init dictionary --template react-native-template-typescript

## Iniciando Aplicação

Deixe o Metro Bundler rodar em seu próprio terminal. Abra um _novo_ terminal da _root_ do seu projeto React Native. Execute o seguinte comando para iniciar seu aplicativo _Android_ ou _iOS_:

### Para Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### Para iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
## Tecnologias usadas:
- React Native CLI
- Typescript
- Axios
- React native modal
- React naive tts
- React native vector icons
- Async Storage

## Dependencias
- npm install @react-navigation/native
- npm install react-native-screens react-native-safe-area-context
- npm install @react-navigation/bottom-tabs
- npm i @react-native-async-storage/async-storage
- npm i axios
- npm i react-native-modal

## Remover warning do react-native-tts
- É necessário fazer uma atualização dentro do node_modules para remover o warning da biblioteca tts
- caminho: node_modules/react-native-tts/android/src/main/java/net/no_mad/tts/texttospeechmodule.java

- dentro do arquivo, digitar esse código
  @ReactMethod
    public void addListener(String eventname) {
      // keep: required for rn built in event emitter calls.
    }
  @ReactMethod
    public void removeListeners(Integer count) {
      // keep: required for rn built in event emitter calls.
    }
