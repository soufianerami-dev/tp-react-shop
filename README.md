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
