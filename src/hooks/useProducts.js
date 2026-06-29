import { useState, useEffect } from 'react'

const BASE_URL = 'https://dummyjson.com/products'
export const PAGE_SIZE = 12

/**
 * useProducts — récupère les produits depuis l'API dummyjson.
 *
 * Endpoints :
 *   • Pagination : GET /products?limit=12&skip=N
 *   • Recherche  : GET /products/search?q=mot&limit=12&skip=N
 *
 * Réponse API : { products: [...], total: 194, skip: 0, limit: 12 }
 *
 * @param {string} searchQuery — mot-clé de recherche (vide = parcourir)
 * @param {number} page        — numéro de page, 1-based
 * @returns {{ products: Array, total: number, loading: boolean, error: string|null }}
 *
 */
export function useProducts(searchQuery, page) {
  const [products, setProducts] =
    useState([]);

  const [total, setTotal] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);
    
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const skip =
        (page - 1) * PAGE_SIZE;

      let url = '';

      if (searchQuery) {

        url =
          `${BASE_URL}/search?q=${searchQuery}&limit=${PAGE_SIZE}&skip=${skip}`;

      } else {

        url =
          `${BASE_URL}?limit=${PAGE_SIZE}&skip=${skip}`;

      }

      const response =
        await fetch(url);

      const data =
        await response.json();

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

  return {
      products,
      total,
      loading,
      error
    }

}
