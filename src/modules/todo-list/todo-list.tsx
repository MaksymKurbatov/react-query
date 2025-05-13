import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useCallback, useRef, useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { useTodoList } from "../../shared/api/use-todo-list.tsx";

export function TodoList() {
  const { error, cursor, isLoading, toDoItems } = useTodoList();

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt 10">
      <h1 className="text-3xl font-bold underline">
        Some List
      </h1>
      <div className="flex">
        <h1>Enable check</h1>
      </div>
      <div className={"flex flex-col gap-4 mt-4"}>
        {
          toDoItems?.map((list) => {
            return <div className="border border-slate-300 p-3" key={list.id}>
              <h1 className="text-1xl">
                {list.text}
              </h1>
            </div>;
          })
        }
      </div>
      {cursor}
    </div>
  );
}