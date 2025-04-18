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
    return <div>
        Some List
        {
            data?.map((list) => {
                return <div key={list.id}>{list.text}</div>;
            })
        }
    </div>;
}