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

