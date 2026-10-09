# LP Wilson Mármores e Granitos

Landing page de conversão no padrão QH4 Growth. Cliente do Método Stones Low Ticket (LP + tráfego pago Google Ads e Meta Ads + CRM e automações + GMN Ouro).

## Contexto do cliente

- **Empresa:** Wilson Mármores e Granitos, CNPJ 26.784.360/0001-15
- **Onde:** região metropolitana de Natal/RN. Atende a capital, arredores e interior conforme a demanda
- **Posicionamento pedido no briefing:** alto luxo, tradicional, técnico. Tema que não pode faltar: beleza, elegância e praticidade
- **Destaque:** bancadas de cozinha e banheiro (as mais comerciais)
- **Objetivo:** captar clientes de ticket mais alto e depender menos de indicação
- **Não gosta:** fotos de IA. Por isso a página usa só fotos reais do Instagram do cliente

## Identidade visual aplicada

| Item | Valor |
| --- | --- |
| Azul da logo | `#25405e` |
| Azul escuro (rodapé) | `#1b3049` |
| Dourado da logo | `#ca9b65` |
| Dourado para texto | `#8a6230` |
| Fundo claro (o mesmo da logo) | `#f7f7f7` |
| Títulos | Poppins 500/600 |
| Corpo | Inter 400/500/600 |

- Fundo claro, como pedido no briefing. Só a faixa de avaliações e o rodapé são azuis.
- Assinatura visual: fotos com um canto cortado em 45 graus e marcadores em triângulo dourado, os mesmos ângulos das setas da logo.
- Logo: recortada do arquivo enviado, com fundo transparente e sem a linha de telefones. Versão branca para o rodapé. Favicon no esquema de cores do avatar (símbolo azul com seta dourada).

## O que já está configurado

- WhatsApp dos leads: **(84) 98829-2372** em todos os CTAs, com mensagem diferente por origem
- Formulário sem Apps Script: monta a mensagem com todos os campos, abre `obrigado.html` e redireciona para o WhatsApp em 2,5 s
- Botão de envio nasce desabilitado e libera quando os campos obrigatórios estão válidos
- Botão flutuante de WhatsApp fixo à direita
- Rodapé com "Desenvolvido pro QH4 Growth" e link para @qh4growth
- SEO: title, description, canonical, Open Graph, Twitter Card, JSON-LD (HomeAndConstructionBusiness + FAQPage), sitemap.xml, robots.txt, site.webmanifest, preload da imagem do hero, width/height em todas as imagens
- Página de obrigado e página 404 personalizadas
- vercel.json com cache longo para assets e cabeçalhos de segurança

## O que trocar antes de subir

1. **Domínio:** buscar `DOMINIO-A-DEFINIR.com.br` e trocar pelo domínio real em `index.html` (canonical, og:url, og:image, twitter:image e os dois JSON-LD), `robots.txt` e `sitemap.xml`
2. **GTM:** em `assets/js/main.js`, trocar `GTM-XXXXXXX` na constante `GTM_ID`. Enquanto for o placeholder, o GTM não é carregado
3. **Apps Script (opcional):** se for usar planilha de leads, colar a URL do Web App em `APPS_SCRIPT_URL` no mesmo arquivo. Com a URL preenchida, os dados vão para a planilha e o WhatsApp recebe a mensagem padrão "Olá, acabei de preencher o formulário no site. Aguardo mais informações."

## Pendências de briefing (confirmar com o cliente)

- **Vídeos:** o zip `IMGS E VIDEOS WILSON` veio só com 28 fotos, sem nenhum arquivo de vídeo. Quando os vídeos chegarem, o lugar natural é o hero ou a seção de projetos
- **Cidade:** o briefing interno diz "Belém (RN)" e o formulário do cliente diz "região metropolitana de Natal". A página usa Natal e região metropolitana. Confirmar a cidade exata da fábrica
- **Endereço:** o único endereço no briefing é o de cadastro do domínio (pessoa física), então não foi publicado. Sem endereço, a página não tem mapa e o JSON-LD leva só cidade e estado
- **Horário de sexta:** o briefing diz "sexta das 17h às 16h". A página usa 7h às 16h. Confirmar
- **Segundo telefone:** (84) 99112-5718 veio da logo e aparece como telefone. Confirmar se é WhatsApp também
- **Avaliações:** o link do Google enviado está no botão "Ler avaliações no Google". Nenhum depoimento foi escrito na página, porque não havia texto de avaliação no briefing
- **Nomes de materiais:** "Branco Extra", "Preto São Gabriel polido" e as descrições de mármore, granito e quartzo vieram dos textos dos próprios posts do cliente

## Fonte do conteúdo

- Formulário de Briefing + Site respondido pela Laís (história, serviços, diferenciais, público, horários, buscas no Google)
- Briefing interno de onboarding (produto, contatos, dores e objetivos)
- 28 fotos do Instagram @wmarmores. Usadas 14, todas reais e recortadas para tirar os textos dos posts. Ficaram de fora as artes gráficas, as imagens com aparência de render ou banco de imagem e as fotos com pessoas

## Estrutura da pasta

```
lp-wilson-marmores/
├── index.html
├── obrigado.html
├── 404.html
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/  (fotos em .webp em dois tamanhos, logos, ícones e imagem de compartilhamento)
```

## Seções da página

1. Topo fixo com menu e CTA
2. Hero com headline "Marmoraria em Natal perto de você, com acabamento de alto padrão"
3. Bancadas de cozinha e de banheiro
4. Outras peças (cubas esculpidas, peitoris, soleiras, divibox, divisórias, túmulos, tábuas de carne)
5. Materiais em abas (mármore, granito, quartzo)
6. Projetos: galeria de arrastar com ampliação
7. História do Wilson com linha do tempo e compromissos
8. Faixa de avaliações do Google
9. Formulário de orçamento e contatos
10. Dúvidas (8 perguntas, só com fatos do briefing)
11. Rodapé

## Stack e comportamento

HTML, CSS e JavaScript puros, sem dependências. Como publicar na Vercel: arrastar a pasta em vercel.com/new ou rodar `vercel --prod` dentro dela. Não tem build.

Animações: entrada em sequência no hero, parallax leve nas fotos do hero (só desktop), revelação ao rolar, troca de abas, galeria com arrasto e barra de progresso, perguntas com altura animada. Tudo respeita `prefers-reduced-motion`, e o conteúdo aparece normalmente se o JavaScript falhar.

## Eventos enviados ao dataLayer

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `clique_whatsapp` | clique em qualquer CTA de WhatsApp | `origem`: menu, hero, bancada-cozinha, bancada-banheiro, contato, duvidas, rodape, flutuante, obrigado, 404 |
| `formulario_inicio` | primeiro foco em um campo | |
| `formulario_enviado` | envio válido do formulário | `peca`, `material` |
| `lead_obrigado` | carregamento de obrigado.html | `com_formulario` |
| `clique_telefone` | clique no telefone | |
| `clique_instagram` | clique no Instagram | |
| `clique_avaliacoes_google` | clique no botão de avaliações | |
| `aba_material` | troca de aba de material | `material` |
| `galeria_ampliar` | foto ampliada | `foto` |
| `duvida_aberta` | pergunta aberta | `pergunta` |

Conversão principal sugerida: pageview de `/obrigado.html` ou o evento `lead_obrigado` com `com_formulario` verdadeiro, somado a `clique_whatsapp`.

## Checklist de entrega

- [x] SEO on-page (title, description, canonical, headings, alt nas imagens)
- [x] Open Graph e Twitter Card
- [x] JSON-LD LocalBusiness e FAQPage válidos
- [x] sitemap.xml
- [x] robots.txt
- [x] site.webmanifest e favicons
- [x] vercel.json
- [x] Página de obrigado
- [x] Página 404 personalizada
- [x] Botão flutuante de WhatsApp à direita
- [x] Formulário com botão desabilitado até validar
- [x] Testado no Chromium em 320, 360, 390, 414, 600, 768, 900, 1024, 1280, 1440 e 1920 px, sem rolagem horizontal e sem erro de console
- [ ] Trocar o domínio placeholder
- [ ] Inserir o ID do GTM
