import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["task", "list"],
    queryFn: todoListApi.getToDoList
  });

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
          data?.map((list) => {
            return <div className="border border-slate-300 p-3" key={list.id}>
              <h1 className="text-1xl">
                {list.text}
              </h1>
            </div>;
          })
        }
      </div>
    </div>
  );
}