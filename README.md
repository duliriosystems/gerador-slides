# Gerador de Slides Animados

App (um único arquivo HTML) que cria vídeos de letra de música animada — um MP4 por slide — para importar como mídia no **Holyrics**. Feito para o ministério de louvor.

**Abrir o app:** https://duliriosystems.github.io/gerador-slides/

- Funciona no Chrome/Edge do computador (WebGL2 + WebCodecs). Pode ser **instalado como app** e **abre sem internet** depois da primeira visita.
- Sem login: quem abre o endereço usa o app, mas **cada pessoa vê só as músicas salvas no próprio navegador**.
- Para levar músicas de um aparelho a outro: **📤 Enviar** (uma música) ou **⭳ Exportar biblioteca** (tudo) e, no outro aparelho, **⭱ Importar**.

## Pastas

| Caminho | O que é |
|---|---|
| `index.html` | O app (versão atual). É o endereço acima. |
| `sw.js` | Service worker: abre offline e avisa "Nova versão disponível". |
| `manifest.webmanifest`, `icons/` | Dados para instalar como app, e ícones originais. |
| `versoes/` | Só a versão de segurança: a imediatamente anterior à atual (`gerador-slides-holyrics-vNN.html`), funcionando sozinha. |

## Publicar uma versão nova

Veja o `CLAUDE.md`. Em resumo: trocar o arquivo de `versoes/` pelo `index.html` atual (fica sempre só uma versão de segurança), colocar o novo como `index.html`, subir o número da versão também em `sw.js` e fazer o commit na `main` — o GitHub Pages publica sozinho em ~1 minuto.

## Licenças

As fontes embutidas (Anton, Bebas Neue, Archivo Black, Oswald, Alfa Slab One, Passion One, Alex Brush, Dancing Script, Yellowtail, Sacramento, Great Vibes, Pacifico, Inter, JetBrains Mono) são livres, sob a SIL Open Font License 1.1. O `mp4-muxer` embutido é MIT (Vanilagy).
