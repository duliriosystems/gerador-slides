/* Service worker do Gerador de Slides Animados.
   - Abre sempre a versão mais nova quando há internet (rede primeiro, com limite de tempo).
   - Sem internet (ou rede lenta demais), abre a última cópia guardada.
   - A VERSÃO abaixo muda a cada publicação: é isso que faz o app avisar "Nova versão disponível". */
const VERSAO = 'v51';
const CACHE = 'slides-' + VERSAO;
const LIMITE_REDE_MS = 4000;
const ESSENCIAIS = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];

self.addEventListener('install', function(e){
  e.waitUntil((async function(){
    const cache = await caches.open(CACHE);
    /* um arquivo que falhe não impede a instalação */
    await Promise.all(ESSENCIAIS.map(async function(u){
      try{ const r = await fetch(u, {cache:'no-cache'}); if(r && r.ok) await cache.put(u, r); }catch(err){}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    const nomes = await caches.keys();
    await Promise.all(nomes.filter(function(n){ return n.indexOf('slides-') === 0 && n !== CACHE; }).map(function(n){ return caches.delete(n); }));
    await self.clients.claim();
  })());
});

function comLimite(promessa, ms){
  return new Promise(function(resolve, reject){
    const t = setTimeout(function(){ reject(new Error('lento')); }, ms);
    promessa.then(function(v){ clearTimeout(t); resolve(v); }, function(err){ clearTimeout(t); reject(err); });
  });
}

self.addEventListener('fetch', function(e){
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;     /* só o próprio site; busca de letra, imagens etc. seguem direto pra internet */
  e.respondWith((async function(){
    const cache = await caches.open(CACHE);
    const rede = fetch(req.url, {cache:'no-cache', credentials:'same-origin'}).then(function(res){
      if(res && res.ok) cache.put(req.url, res.clone());
      return res;
    });
    try{
      return await comLimite(rede, LIMITE_REDE_MS);
    }catch(err){
      const copia = (await cache.match(req.url, {ignoreSearch:true})) ||
                    (req.mode === 'navigate' ? ((await cache.match('./index.html')) || (await cache.match('./'))) : null);
      if(copia){ e.waitUntil(rede.catch(function(){})); return copia; }
      return rede;                                      /* sem cópia: devolve o erro real da rede */
    }
  })());
});
