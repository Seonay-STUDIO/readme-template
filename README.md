> [!NOTE]
> **Modèle de README Seonay Studio.** Remplacer chaque `{{…}}`, suivre les commentaires (invisibles sur GitHub, visibles en édition), puis supprimer ce bloc.
> Règles d’écriture et outils : [`.readme/GUIDE.md`](.readme/GUIDE.md). Pour retrouver ce qui reste à remplir : `grep -n "{{" README.md`.

<!--
  EN-TÊTE
  - Logo : le SVG du client (public/…). Toujours un alt qui décrit le logo.
  - Accroche en gras : la phrase du lieu, la sienne, pas un slogan inventé.
  - Une ligne de description : « Site vitrine du/de la … du [adresse], à [ville]. »
-->

<p align="center">
  <img src="{{chemin/du/logo.svg}}" width="112" height="112" alt="{{Logo de … : description du logo}}">
</p>

<h1 align="center">{{Nom du lieu}}</h1>

<p align="center">
  <strong>{{L’accroche du lieu.}}</strong><br>
  Site vitrine {{du café / du salon / de la brasserie}} {{activité}} du {{numéro et rue}}, à {{Ville}}.
</p>

<!--
  BADGES
  - Couleur de fond : la couleur principale de la marque, en hex sans « # » (ex. 24473a).
  - logoColor : la couleur claire de la marque (ex. fffdf9).
  - Uniquement la stack réelle (package.json) + « cookies-aucun » si c’est vrai.
  - Logos disponibles : https://simpleicons.org (nextdotjs, react, vite, tailwindcss, greensock, framer, leaflet…)
  - Espaces : %20 ; accents encodés (é = %C3%A9).
-->

<p align="center">
  <img alt="{{Framework}}" src="https://img.shields.io/badge/{{Framework}}-{{version}}-{{couleur}}?style=flat-square&logo={{logo}}&logoColor={{couleur-claire}}">
  <img alt="{{Animation}}" src="https://img.shields.io/badge/{{Animation}}-{{détail}}-{{couleur}}?style=flat-square&logo={{logo}}&logoColor={{couleur-claire}}">
  <img alt="Lenis" src="https://img.shields.io/badge/Lenis-d%C3%A9filement%20doux-{{couleur}}?style=flat-square">
  <img alt="Aucun cookie" src="https://img.shields.io/badge/cookies-aucun-{{couleur-accent}}?style=flat-square">
</p>

<p align="center">
  <a href="{{https://site-du-client.fr}}">{{site-du-client.fr}}</a> ·
  <a href="{{https://www.instagram.com/compte/}}">{{@compte}}</a> ·
  réalisé par <a href="https://seonay.com/fr">Seonay Studio</a>
</p>

<br>

<!-- Capture de l’accueil, 1600 px de large : node .readme/captures.mjs -->

![{{L’accueil : ce qu’on voit à l’écran, en une phrase}}](docs/apercu-hero.webp)

## Sommaire

- [L’idée](#lidée)
- [Le parcours](#le-parcours)
- [Les détails qui comptent](#les-détails-qui-comptent)
- [Démarrer](#démarrer)
- [Structure du projet](#structure-du-projet)
- [Personnaliser](#personnaliser)
- [Référencement](#référencement)
- [Mise en ligne](#mise-en-ligne)
- [Avant la mise en ligne](#avant-la-mise-en-ligne)
- [Crédits](#crédits)

## L’idée

<!--
  Deux paragraphes courts.
  1. Ce qu’est le lieu, en faits : qui, depuis quand, ce qu’on y fait.
  2. L’intention du site, avec une image forte en gras : ce que le site doit faire ressentir.
  Exemples : « une serre à la tombée de la nuit, où des ruines antiques ont été reconquises par la végétation »,
  « des murs vert forêt, des miroirs cerclés de laiton et un savoir-faire qui se transmet ».
-->

{{Ce qu’est le lieu, en deux ou trois phrases factuelles.}} Le site {{prolonge / reprend}} cette sensation : **{{l’image qui guide tout le design}}.**

{{Ce que la page met en avant, et ce qui se passe en la parcourant.}}

### Palette

<!-- Générée depuis les variables CSS : node .readme/palette.mjs -->

![Palette : {{liste des noms de couleurs}}](docs/palette.svg)

<!-- Une ligne par couleur ou paire de couleurs. Le rôle dit OÙ et POURQUOI, pas juste « couleur principale ». -->

| Couleur | Rôle |
| --- | --- |
| **{{Nom}}** | {{Où elle est utilisée}} |
| **{{Nom}}** et **{{Nom}}** | {{Où elles sont utilisées}} |
| **{{Nom de l’accent}}** | Seul accent {{chaud/vif}} : {{où}} |

Toutes les couleurs sont des variables CSS dans `:root`, en tête de [`{{src/style.css}}`]({{src/style.css}}).

### Typographie

| Police | Usage |
| --- | --- |
| **{{Police titres}}** | Titres et nom {{du lieu}}. {{Une phrase sur son caractère et pourquoi elle va avec le lieu.}} |
| **{{Police texte}}** | Texte courant, navigation, étiquettes. |

<!-- Garder cette phrase seulement si c’est vrai (Fontsource, next/font, fichiers dans public/). -->

Les polices sont hébergées avec le site. Aucune requête ne part vers Google Fonts, ce qui évite un transfert de données vers un tiers (RGPD).

## Le parcours

<!--
  Une ligne par section, dans l’ordre de la page. La numérotation est justifiée : c’est l’ordre réel de lecture.
  « Le mouvement » : ce que le visiteur voit bouger, pas le nom de la librairie. Laisser vide si rien ne bouge.
-->

La page se lit de haut en bas comme {{une promenade dans… / une visite du…}}.

| | Section | Ce qu’on y trouve | Le mouvement |
| --- | --- | --- | --- |
| 1 | **{{Accueil}}** | {{Contenu}} | {{Animation}} |
| 2 | **{{Section}}** | {{Contenu}} | {{Animation}} |
| 3 | **{{Section}}** | {{Contenu}} | {{Animation}} |
| 4 | **Pied de page** | {{Contenu}} | |

<!-- Galerie : 4 ou 6 captures de sections, 1200 px de large. Alt = ce qu’on voit, pas « capture ». -->

<table>
  <tr>
    <td width="50%"><img src="docs/apercu-{{section}}.webp" alt="{{Section : ce qu’on voit}}"></td>
    <td width="50%"><img src="docs/apercu-{{section}}.webp" alt="{{Section : ce qu’on voit}}"></td>
  </tr>
  <tr>
    <td><img src="docs/apercu-{{section}}.webp" alt="{{Section : ce qu’on voit}}"></td>
    <td><img src="docs/apercu-{{section}}.webp" alt="{{Section : ce qu’on voit}}"></td>
  </tr>
</table>

![{{Pied de page : ce qu’on voit}}](docs/apercu-pied.webp)

<p align="center">
  <img src="docs/apercu-mobile.webp" width="720" alt="Sur mobile : {{les trois écrans montrés}}">
</p>

## Les détails qui comptent

<!--
  4 à 7 paragraphes. Chacun : une phrase-titre en gras, puis 2 ou 3 phrases concrètes, puis un lien vers le fichier.
  Commencer par le détail le plus propre à CE lieu (la bouture qui pousse, l’archive qui se développe…).
  Garder « Accessible », « Référencement » et « Sobre » s’ils sont vrais ; n’affirmer que ce qui est dans le code.
-->

**{{Le détail signature.}}** {{Ce que voit le visiteur, et pourquoi c’est lié au lieu.}} Voir [`{{src/fichier}}`]({{src/fichier}}).

**{{Un détail pratique.}}** {{Par exemple : statut ouvert ou fermé en direct, réservation en un geste.}}

**Accessible.** Si le visiteur a demandé à réduire les animations, {{ce qui est désactivé}}. {{Focus visible, menu qui se ferme avec Échap, textes alternatifs… uniquement ce qui existe.}}

**Pensé pour le référencement local.** Données structurées schema.org ({{types}}), `robots.txt`, `sitemap.xml`{{, llms.txt}} et une image de partage. Voir [Référencement](#référencement).

**Sobre.** Aucun cookie, aucun traceur{{, aucun appel à un service tiers au chargement}}. {{Poids mesuré au build : JavaScript et CSS compressés, poids total des images.}}

## Démarrer

Prérequis : [Node.js](https://nodejs.org) {{version minimale}} ou plus récent.

```sh
npm install       # installe les dépendances
npm run dev       # serveur de développement sur http://localhost:{{port}}
npm run build     # version de production dans {{dist/ ou .next/}}
npm run {{preview ou start}}   # sert la version de production en local
```

## Structure du projet

<!-- Uniquement les fichiers utiles à quelqu’un qui reprend le projet, avec une description courte à droite. -->

```
{{nom-du-depot}}/
├── {{fichier}}            {{rôle}}
├── src/
│   ├── {{fichier}}        {{rôle}}
│   └── {{fichier}}        {{rôle}}
├── public/
│   └── images/            {{visuels optimisés}}
└── docs/                  captures et palette de ce README
```

## Personnaliser

<!--
  Ce qu’on modifie le plus souvent, dans l’ordre de fréquence.
  Horaires : TOUJOURS lister tous les endroits où ils sont écrits (affichage, JSON-LD, llms.txt, pied de page…).
-->

### Les textes

{{Où sont les textes, et dans quel ordre.}}

### Les horaires

Ils sont à {{N}} endroits, à garder synchronisés :

1. **`{{fichier}}`** : {{ce qu’il alimente}}.
2. **`{{fichier}}`** : {{ce qu’il alimente}}.

### {{Autre élément propre au projet : tarifs, carte, animations, feuillages…}}

{{Comment le modifier, avec un exemple de code court.}}

## Référencement

Le site est construit pour que Google et les assistants IA lisent correctement les informations {{du lieu}}. Tout repose sur des standards publics : rien de caché, aucun texte réservé aux robots.

| Élément | Rôle |
| --- | --- |
| `<title>` et meta description | « {{titre exact}} » : ce qui s’affiche dans les résultats de recherche |
| `<link rel="canonical">` | Indique l’adresse officielle de la page, `{{https://domaine/}}` |
| Données structurées JSON-LD | {{Types schema.org et informations : adresse, GPS, horaires, téléphone, réseaux, FAQ}} |
| Questions fréquentes | Une section visible qui répond aux questions qu’on tape vraiment : {{exemples}} |
| `robots.txt` | Ouvre tout le site aux moteurs de recherche et aux assistants IA, et indique le plan du site |
| `sitemap.xml` | Le plan du site, à envoyer dans Google Search Console |
| Open Graph | Titre, description et image {{fichier}} (1200 × 630) pour les partages |

{{Le contenu est écrit directement dans le HTML : il est lisible sans JavaScript, comme le voient les robots.}}

## Mise en ligne

<!-- Dire clairement si le site est statique (FTP possible) ou s’il demande un serveur Node. -->

{{Commande de build et ce qu’elle produit.}}

- **{{Hébergeur conseillé}}** : {{étapes}}.
- **{{Alternative}}** : {{étapes}}.

## Avant la mise en ligne

<!--
  Liste honnête de ce qui reste à faire : placeholders, contenus à faire valider par le client,
  incohérences repérées (prix, chiffres, horaires, GPS), domaine final, Google Business Profile, Search Console.
-->

- [ ] Compléter les **mentions légales** : {{champs manquants}}.
- [ ] Faire **valider par le client** {{les informations à vérifier}}.
- [ ] Remplacer les **visuels provisoires** par les photos du lieu.
- [ ] Vérifier que le domaine final est bien **`{{https://domaine/}}`**, sinon le remplacer dans {{fichiers}}.
- [ ] Revendiquer et compléter la **fiche Google Business Profile**, avec exactement les mêmes nom, adresse, téléphone et horaires que le site.
- [ ] Déclarer le site dans **Google Search Console** et y envoyer `sitemap.xml`.
- [ ] Un mois après la mise en ligne, refaire une recherche « {{requête locale}} » et « {{Nom}} horaires » pour vérifier ce que Google et les assistants affichent.

## Crédits

- **Conception et développement** : [Seonay Studio](https://seonay.com/fr)
- **{{Logo, photos, contenus}}** : {{Client}}
- **Polices** : {{Polices}}, sous licence SIL Open Font License
- **{{Animation / Carte / Icônes}}** : [{{Librairie}}]({{url}}) ({{licence}})

<br>

<p align="center">
  <img src="{{chemin/du/logo.svg}}" width="40" height="40" alt=""><br>
  <sub>{{Nom du lieu}}, {{adresse complète}}</sub>
</p>
