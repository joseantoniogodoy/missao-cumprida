# Missão Cumprida? — integração Firebase

## Arquivos
- `index.html`: jogo original preservado com integração adicional.
- `integracao.js`: sincronização das equipes e painel central.
- `firebase-config.js`: preencher com as credenciais públicas do seu projeto.
- `firebase.rules`: regras do Cloud Firestore.

## Configuração
1. No Firebase Console, crie ou selecione um projeto e registre um aplicativo Web.
2. Ative **Authentication > Sign-in method > Anonymous**.
3. Crie o **Cloud Firestore** e publique o conteúdo de `firebase.rules` na aba Regras.
4. Preencha `firebase-config.js` com os dados do seu aplicativo Web.
5. Publique **todos os arquivos na mesma pasta** do seu repositório/site (Vercel, por exemplo). Não abra o HTML com `file://`.
6. Equipes: `https://SEU-SITE/?sala=mentoria-novembro`.
7. Formador: `https://SEU-SITE/?sala=mentoria-novembro&painel=1`.

## Funcionamento e limitações
- Cada navegador recebe um usuário anônimo Firebase. A equipe mantém sua partida nesse navegador, e ela é sincronizada no Firestore.
- Não usar a mesma sessão de navegador para duas equipes; a identidade é vinculada ao navegador.
- O painel mostra pontuação, progresso e decisões em tempo real.
- As pontuações continuam sendo preenchidas pelo próprio jogo, **não validadas pelo formador**. Portanto o ranking é indicativo, não competitivo auditado.
- As regras permitem que usuários autenticados anonimamente leiam partidas da mesma sala. O endereço do painel **não é protegido por senha**. Para dados sensíveis ou administração restrita, é necessária uma etapa posterior de autenticação de formadores e regras específicas.
- O botão de importar JSON do jogo original continua disponível; ao importar, os dados podem ser sincronizados na equipe atual.
- Teste com dois navegadores distintos antes da mentoria.
