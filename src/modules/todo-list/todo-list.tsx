import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useCallback, useRef, useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";

export function TodoList() {
  const [enabled, setEnable] = useState(false);
  const {
    data: toDoItems,
    error,
    isLoading,
    fetchStatus,
    status,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPageac
  } = useInfiniteQuery({
    ...todoListApi.getToDoListInfinityQueryOptions(),
    enabled: enabled
  });
  const cursorRef = useInterSection(() => {
    fetchNextPage().then(r => console.log("useInterSection"));
  });

  if (status === "pending" && fetchStatus === "fetching") {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }

  function handleChange() {
    setEnable(!enabled);
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt 10">
      <h1 className="text-3xl font-bold underline">
        Some List
      </h1>
      <div className="flex">
        <Switch
          checked={enabled}
          onChange={handleChange}
        />
        <h1>Enable check</h1>
      </div>
      <div className={"flex flex-col gap-4 mt-4" + (isPlaceholderData ? " opacity-59" : "")}>
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
      <div className="flex gap-2 mt-2" ref={cursorRef}>
        {!hasNextPage && <div> NO DATA FOR DOWNLOAD</div>}
        {isFetchingNextPageac && <div> LOADING</div>}
      </div>
    </div>
  );
}

export function useInterSection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {
  });
  return useCallback((el: HTMLDivElement | null) => {
    const obserever = new IntersectionObserver((entries, observer) => {
      entries.forEach(intersection => {
        if (intersection) {
          onIntersect();
        }
      });
    });

    if (el) {
      obserever.observe(el);
      unsubscribe.current = () => obserever.disconnect();
    } else {
      unsubscribe.current();
    }

  }, []);
}