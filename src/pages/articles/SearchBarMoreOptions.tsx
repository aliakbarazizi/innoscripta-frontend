import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Save02 } from "@untitled-ui/icons-react";
import classNames from "classnames";
import { useState } from "react";

import Button from "../../components/core/Button";
import SearchableSelect from "../../components/core/SearchableSelect";
import { useSearchableQuery } from "../../hooks/useSearchableQuery";
import { fetchAuthorsQueryOptions } from "../../services/authors";
import { fetchCategoriesQueryOptions } from "../../services/categories";
import { fetchSourcesQueryOptions } from "../../services/sources";
import {
  fetchMeQueryOptions,
  useUpdatePreferences,
} from "../../services/users";
import { SearchState } from "./ArticleSearchBar";

type Props = {
  state: SearchState;
  setState: (state: SearchState) => void;
};

export default function SearchBarMoreOptions({ state, setState }: Props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const { data: me } = useQuery(fetchMeQueryOptions());

  const {
    data: authors,
    isLoading: authorsLoading,
    search: authorSearch,
    setSearch: setAuthorSearch,
  } = useSearchableQuery(fetchAuthorsQueryOptions);

  const {
    data: categories,
    isLoading: categoriesLoading,
    search: categorySearch,
    setSearch: setCategorySearch,
  } = useSearchableQuery(fetchCategoriesQueryOptions);

  const {
    data: sources,
    isLoading: sourcesLoading,
    search: sourceSearch,
    setSearch: setSourceSearch,
  } = useSearchableQuery(fetchSourcesQueryOptions);

  const { mutate: updatePreferences, isPending: isUpdatePending } =
    useUpdatePreferences();

  const handleSave = () => {
    updatePreferences(
      {
        authors: state.authors.map((author) => author.id),
        categories: state.categories.map((category) => category.id),
        sources: state.sources.map((source) => source.id),
      },
      {
        onSuccess: () => {
          navigate({
            to: "/feed",
          });
        },
      },
    );
  };

  return (
    <>
      <div className="absolute inset-y-0 right-0">
        <button
          type="button"
          onClick={() => setOpen((open) => !open)}
          className="flex h-full cursor-pointer items-center gap-1.5 rounded-r-xl border-l border-gray-200 px-2 hover:bg-gray-200"
        >
          <ChevronDown
            className={classNames(
              "size-4 text-gray-700 transition",
              open && "rotate-180",
            )}
          />
        </button>
      </div>
      <Transition show={open}>
        <div
          className={classNames(
            "mt-1.5 flex flex-col divide-x divide-gray-200 rounded-xl bg-gray-100 py-4 shadow-lg",
            "transition-all duration-200",
            "data-[enter]:scale-0 data-[enter]:opacity-0",
          )}
        >
          <div
            className={classNames(
              "flex flex-col items-center divide-x divide-gray-200",
              "lg:flex-row lg:py-0",
            )}
          >
            <SearchableSelect
              options={authors?.data || []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => `${option.id}`}
              inputValue={authorSearch}
              onInputChange={(value) => setAuthorSearch(value)}
              isLoading={authorsLoading}
              value={state.authors}
              onChange={(data) => setState({ ...state, authors: [...data] })}
              className="w-full p-2"
              placeholder="Filter authors..."
            />
            <SearchableSelect
              options={categories?.data || []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => `${option.id}`}
              inputValue={categorySearch}
              onInputChange={(value) => setCategorySearch(value)}
              isLoading={categoriesLoading}
              value={state.categories}
              onChange={(data) => setState({ ...state, categories: [...data] })}
              className="w-full p-2"
              placeholder="Filter categories..."
            />
            <SearchableSelect
              options={sources?.data || []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => `${option.id}`}
              inputValue={sourceSearch}
              onInputChange={(value) => setSourceSearch(value)}
              isLoading={sourcesLoading}
              value={state.sources}
              onChange={(data) => setState({ ...state, sources: [...data] })}
              className="w-full p-2"
              placeholder="Filter sources..."
            />
          </div>
          <div className="mt-4 flex w-full gap-4 px-2 lg:mt-0 lg:w-auto">
            <Button type="submit" variant="primary" className="px-2 lg:px-8">
              Search
            </Button>
            {me && (
              <Button
                loading={isUpdatePending}
                onClick={handleSave}
                type="button"
                variant="secondary"
                className="ml-auto flex cursor-pointer items-center gap-1.5 px-5 py-2 hover:bg-gray-200"
              >
                <span>Save</span>
                <Save02 className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
}
