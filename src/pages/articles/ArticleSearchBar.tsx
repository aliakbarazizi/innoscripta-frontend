import { Transition, TransitionChild } from "@headlessui/react";
import { SearchLg } from "@untitled-ui/icons-react";
import classNames from "classnames";
import { RefObject, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Author, Category, Source } from "../../types";
import SearchBarMoreOptions from "./SearchBarMoreOptions";

export type SearchState = {
  query: string;
  authors: Author[];
  categories: Category[];
  sources: Source[];
};

type Props = {
  state: SearchState;
  setState: (state: SearchState) => void;
};

export default function ArticleSearchBar({ state, setState }: Props) {
  const [localState, setLocalState] = useState(state);

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLFormElement>(null);

  useOnClickOutside(ref as RefObject<HTMLFormElement>, () => setOpen(false));

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    setState(localState);

    setOpen(false);
  };

  return (
    <>
      <button
        className="cursor-pointer rounded-lg p-2 hover:bg-gray-100"
        onClick={() => setOpen((open) => !open)}
      >
        <SearchLg className="size-5" />
      </button>
      <Transition show={open}>
        <TransitionChild>
          <div className="fixed inset-0 z-10 bg-black/30 transition duration-200 data-[enter]:opacity-0"></div>
        </TransitionChild>
        <TransitionChild>
          <form
            ref={ref}
            className={classNames(
              "absolute inset-x-0 inset-y-1.5 z-20 rounded-xl px-2 shadow-lg transition-all duration-200 md:px-0",
              "data-[enter]:scale-0 data-[enter]:opacity-0",
            )}
            onSubmit={handleSubmit}
          >
            <div className="relative h-full w-full rounded-xl">
              <div className="absolute top-0 bottom-0 left-0 flex items-center gap-1.5 p-2">
                <SearchLg className="size-5 text-gray-400" />
              </div>
              <input
                autoFocus
                type="text"
                className="h-full w-full rounded-xl border-gray-200 bg-gray-100 p-2 ps-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Press enter to search"
                value={localState.query}
                onChange={(event) =>
                  setLocalState({ ...localState, query: event.target.value })
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <SearchBarMoreOptions
                state={localState}
                setState={setLocalState}
              />
            </div>
          </form>
        </TransitionChild>
      </Transition>
    </>
  );
}
