// src/types.ts
export interface Comic {
    id: number;
    title: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    pageCount: number;
    series: {
      name: string;
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
  
  export interface ComicsData {
    results: Comic[];
    total: number;
  }
  