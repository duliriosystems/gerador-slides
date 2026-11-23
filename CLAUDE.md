# gerador-slides

App de página única (`index.html`, HTML/JS puro, sem build) que gera vídeos de letra animada para o Holyrics. Publicado pelo GitHub Pages direto da `main` (pasta raiz): https://duliriosystems.github.io/gerador-slides/ — o contexto completo (histórico, decisões, itens em aberto) está no Projeto "Slides - Holyrics" do Douglas (arquivo `contexto-projeto-gerador-slides.md`). Responder sempre em português do Brasil.

## Regras de trabalho

- O HTML é editado por patch (script que aplica trocas com âncora única), **nunca reescrito do zero**. Antes de editar, criar a cópia versionada (vNN); não sobrescrever a anterior até confirmar que a nova funciona.
- Testar antes de entregar: regressão funcional (jsdom/Playwright simulando criar música, salvar, exportar), teste de layout visual olhando a imagem gerada, e `node --check` no `<script>` extraído.
- Automação precisa de ajuste manual — nunca travar o usuário numa escolha automática.
- Sobre comportamento do Holyrics (fora do app), ser honesto sobre incerteza e sugerir teste direto.
- **O repositório é público:** nunca colocar chaves (ex.: Vagalume), senhas ou dados de pessoas no código. Chave só em link de configuração privado.
- Nada é pedido à internet ao abrir o app: as fontes (OFL) estão embutidas em `<style id="fontesEmbutidas">`. Busca de letra/imagem, conversor ffmpeg de reserva e .zip são os únicos usos de rede (sob demanda).

## Publicar uma versão nova (sempre nesta ordem)

1. A pasta `versoes/` guarda **só uma** versão de segurança (a anterior à atual). Apagar o arquivo que estiver lá e colocar o `index.html` atual como `versoes/gerador-slides-holyrics-vNN.html` (NN = a versão que está saindo de cena). Nunca acumular várias.
2. Colocar o HTML novo como `index.html` (título, selo `vNN` no cabeçalho, "PEDIDO" e "DIAGNÓSTICO" já com o número novo).
3. **Subir `VERSAO` em `sw.js`** (ex.: `'v45'`). É isso que faz os aparelhos abertos mostrarem "Nova versão disponível". Esquecer = ninguém é avisado (o app ainda atualiza ao recarregar).
4. Commit direto na `main` (ou PR) — o Pages publica sozinho. Conferir que o endereço acima abre com a versão nova.

## Armadilhas conhecidas

- O endereço `duliriosystems.github.io` é uma origem só para todos os sites de Pages dessa conta (cada repositório tem seu caminho, mas o armazenamento do navegador — IndexedDB — é compartilhado). Não hospedar outros apps nessa mesma conta sem pensar nisso.
- IndexedDB é por origem: quem abria o app como arquivo local ou em outro endereço precisa exportar a biblioteca lá e importar aqui (uma vez por aparelho).
- A permissão da pasta dos vídeos (File System Access API) também é por origem e por aparelho.
