const BASE_URL = "http://localhost:3000/";
export type TodoDto = {
  id: number,
  text: string,
  done: boolean

}

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}
export const todoListApi = {
  getToDoList: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    return fetch(`${BASE_URL}/todos?_page=${page}&_per_page=10`,
      { signal })
      .then(res => res.json() as Promise<PaginatedResult<TodoDto>>);
  }
};