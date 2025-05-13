import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../../modules/todo-list/api.ts";
import { useCallback, useRef } from "react";

export function useTodoList() {
  const {
    data: toDoItems,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPageac,
    fetchNextPage
  } = useInfiniteQuery({
    ...todoListApi.getToDoListInfinityQueryOptions()
  });

  const cursorRef = useInterSection(() => {
    fetchNextPage().then(r => console.log("useInterSection"));
  });

  const cursor = (
    <div className="flex gap-2 mt-2" ref={cursorRef}>
      {!hasNextPage && <div> NO DATA FOR DOWNLOAD</div>}
      {isFetchingNextPageac && <div> LOADING</div>}
    </div>
  );

  return { error, toDoItems, isLoading, cursor };

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