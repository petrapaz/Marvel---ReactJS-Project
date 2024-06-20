// src/types/comic.ts
export interface Comic {
    id: number;
    title: string;
    description: string;
    pageCount: number;
    series: {
      name: string;
    };
    thumbnail: {
      path: string;
      extension: string;
    };
    prices: {
      type: string;
      price: number;
    }[];
    creators: {
      items: {
        role: string;
        name: string;
      }[];
    };
  }
  