type PokeApiResult = {
  name: string;
  url: string;
};

type PaginateParamsRequest<T = object> = {
  offset: number; // page number for PokeAPI
  limit: number; // page size for PokeAPI
} & T;

type PaginateResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
