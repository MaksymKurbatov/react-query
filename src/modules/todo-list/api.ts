import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance.ts";

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
  getToDoListQueryOption: ({ page }: { page: Number }) => {
    return queryOptions({
      queryKey: ["task", "list"],
      //queryFn: (meta) => todoListApi.getToDoList({ page }, meta)
      queryFn: (meta) => jsonApiInstance(`/todos?_page=${page}&_per_page=10`, {
        signal: meta.signal
      })
    });
  },

  getToDoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["task", "list"],
      //queryFn: (meta) => todoListApi.getToDoList({ page: meta.pageParam }, meta),
      queryFn: (meta) => jsonApiInstance(`/todos?_page=${meta.pageParam}&_per_page=10`, {
        signal: meta.signal
      }),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  }
};