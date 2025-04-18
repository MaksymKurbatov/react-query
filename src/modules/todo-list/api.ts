const BASE_URL = "http://localhost:3000/";
export type TodoDto = {
    id: number,
    text: string,
    done: boolean

}
export const todoListApi = {
    getToDoList: ({ signal }: { signal: AbortSignal }) => {
        return fetch(`${BASE_URL}/todos`,
            { signal })
            .then(res => res.json() as Promise<TodoDto[]>);
    }
};