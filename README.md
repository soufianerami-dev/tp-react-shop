# React Shop — TP Hooks React

## Étape 1 — useState : état de l'application

### Q1.1 — À quoi sert le hook useState ?

`useState` permet de créer un état dans un composant React.
Quand la valeur change, React met à jour la page automatiquement.

---

### Q1.2 — Montrer votre implémentation des trois useState

```jsx
const [searchQuery, setSearchQuery] = useState('');
const [isCartOpen, setIsCartOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
```

---

### Q1.3 — Capture d'écran : la modale s'ouvre et se ferme

**Modale ouverte**

![Modale ouverte](screen-short/step1/modal-open.png)

---

# Étape 2 — Composants ProductCard et ProductList

## Q2.1 — Qu'est-ce que le « props drilling » ?

Le props drilling est le passage des données par plusieurs composants.

Quand il y a beaucoup de composants, le code devient plus difficile à lire et à maintenir.

---

## Q2.2 — Montrer le rendu de la grille

```jsx
<div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
  {products.map((product) => (
    <div
      key={product.id}
      className="col"
    >
      <ProductCard
        product={product}
        onAddToCart={addToCart}
      />
    </div>
  ))}
</div>
```

---

## Q2.3 — Capture d'écran : la grille avec le produit fictif

**Grille de produits**

![Grille de produits](screen-short/step2/product-grid.png)

---

# Étape 3 — useEffect : chargement des données

## Q3.1 — Pourquoi utiliser useEffect pour les appels réseau ?

`useEffect` lance le `fetch()` après le rendu du composant.
Si on met `fetch()` dans le composant, il sera exécuté à chaque rendu.

---

## Q3.2 — Quel est le rôle du tableau de dépendances [searchQuery, page] ?

Le tableau lance `useEffect` quand `searchQuery` ou `page` change.

- Avec `[]`, le code est exécuté une seule fois.
- Sans tableau, le code est exécuté à chaque rendu.

---

## Q3.3 — Montrer votre implémentation du useEffect dans useProducts

```jsx
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const skip = (page - 1) * PAGE_SIZE;

      let url = '';

      if (searchQuery) {
        url = `${BASE_URL}/search?q=${searchQuery}&limit=${PAGE_SIZE}&skip=${skip}`;
      } else {
        url = `${BASE_URL}?limit=${PAGE_SIZE}&skip=${skip}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.products);
      setTotal(data.total);

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  fetchProducts();

}, [searchQuery, page]);
```

---

## Q3.4 — Capture d'écran : les produits s'affichent, la pagination fonctionne

**Produits page 2**

![Produits page 2](screen-short/step3/page-2-products.png)

# Étape 4 — Hook personnalisé useDebounce

## Q4.1 — Qu'est-ce que le debounce et pourquoi est-il utile ici ?

Le debounce attend un petit temps avant le `fetch()`.

Il évite plusieurs requêtes quand l'utilisateur écrit rapidement.

---

## Q4.2 — Quel est le rôle de la fonction de nettoyage (cleanup) retournée par useEffect ?

`clearTimeout()` supprime l'ancien timer.

Comme ça, un seul timer reste actif.

---

## Q4.3 — Montrer votre implémentation complète de useDebounce

```jsx
export function useDebounce(value, delay) {

  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setDebouncedValue(value);

      }, delay);

    return () => {

      clearTimeout(timer);

    };

  }, [value, delay]);

  return debouncedValue;

}
```

---

## Q4.4 — Preuve du debounce dans les DevTools réseau

**Debounce réseau**

![Debounce réseau](screen-short/step4/debounce-network.png)

---

# Étape 5 — Hook personnalisé useCart : useCallback + useMemo

## Q5.1 — Pourquoi utiliser useCallback pour addToCart, removeFromCart et clearCart ?

`useCallback` garde la même fonction entre les rendus.

Cela évite de recréer les fonctions à chaque rendu, surtout avec le contexte.

---

## Q5.2 — Pourquoi utiliser useMemo pour cartCount et cartTotal ?

`useMemo` mémorise le résultat d'un calcul.

`useMemo` mémorise une valeur, alors que `useCallback` mémorise une fonction.

---

## Q5.3 — Montrer votre implémentation de addToCart avec useCallback

```jsx
const addToCart =
  useCallback((product) => {

    setCart((prev) => {

      const existingProduct =
        prev.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {

        return prev.map((item) =>

          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1
              }
            : item

        );

      }

      return [

        ...prev,

        {
          ...product,
          qty: 1
        }

      ];

    });

  }, []);
```

---

## Q5.4 — Preuve de la persistance localStorage

Le test n'est pas encore possible.

À cette étape, le panier n'est pas encore connecté aux composants.

La capture d'écran sera réalisée après l'Étape 6.
