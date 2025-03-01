export interface Paginate<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  url: string;
  published_at: string;
  author_id: number;
  source_id: number;
  category_id: number | null;
  author: Author;
  source: Source;
  category: Category | null;
}

export interface Author {
  id: number;
  name: string;
}

export interface Source {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
