import { useQuery } from "@tanstack/react-query";

type Todo = {
    id: number,
    text: string,
    done: boolean

}
export const getTasks = () => {
    return new Promise<Todo[]>((res) => {
        setTimeout(() => {
            res([
                {
                    id: 1,
                    text: "toDo",
                    done: false
                },
                {
                    id: 2,
                    text: "Second",
                    done: false
                }
            ]);
        });
    });
};

export function TodoList() {
    const { data, error, isPending } = useQuery({
        queryKey: ["task", "list"],
        queryFn: getTasks
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