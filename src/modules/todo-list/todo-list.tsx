import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useState } from "react";

export function TodoList() {
  const [page, setPage] = useState(1);
  const { data: toDoItems, error, isPending } = useQuery({
    queryKey: ["task", "list", { page }],
    queryFn: (meta) => todoListApi.getToDoList({ page }, meta)
  });
  console.log(page);

  if (isPending) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }
  return (
    <div className="p-5 mx-auto max-w-[1200px] mt 10">
      <h1 className="text-3xl font-bold underline">
        Some List
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        {
          toDoItems?.data.map((list) => {
            return <div className="border border-slate-300 p-3" key={list.id}>
              <h1 className="text-1xl">
                {list.text}
              </h1>
            </div>;
          })
        }
      </div>
      <div className="flex gap-2">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}
                className="p-3 rounded border border-teal-500">
          prev
        </button>
        <button onClick={() => setPage(p => p + 1)}
                className="p-3 rounded border border-teal-500">
          next
        </button>
      </div>
    </div>
  );
}