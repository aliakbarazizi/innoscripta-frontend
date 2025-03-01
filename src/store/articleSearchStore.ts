import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

import { Author, Category, Source } from "../types";

export interface InitialState {
  query: string;
  authors: Author[];
  categories: Category[];
  sources: Source[];
}

export interface ArticleSearchState extends InitialState {
  setQuery: (query: string) => void;
  setAuthors: (authors: Author[]) => void;
  setCategories: (categories: Category[]) => void;
  setSources: (sources: Source[]) => void;
  setSearchState: (state: InitialState) => void;
}

export const createArticleSearchStore = (init: InitialState) => {
  return createStore<ArticleSearchState>((set) => ({
    ...init,
    setQuery: (query) => set({ query }),
    setAuthors: (authors) => set({ authors }),
    setCategories: (categories) => set({ categories }),
    setSources: (sources) => set({ sources }),
    setSearchState: (state) => set(state),
  }));
};

export type ArticleStore = ReturnType<typeof createArticleSearchStore>;

export const ArticleSearchContext = createContext<ArticleStore | null>(null);

function useArticleStoreContext() {
  const store = useContext(ArticleSearchContext);
  if (!store)
    throw new Error(
      "useArticleStore must be used within a ArticleSearchContext",
    );
  return store;
}

export function useArticleStore<T>(
  selector: (state: ArticleSearchState) => T,
): T {
  return useStore(useArticleStoreContext(), selector);
}
