import { useMemo } from "react";

export type SearchResultItemProps<T> = {
  result: T;
  children: (result: T) => React.ReactNode | undefined;
};

function SearchResultItem<T>({ result, children }: SearchResultItemProps<T>) {
  return <>{children(result)}</>;
}

export type SearchResultsProps<T> = {
  children: (result: T) => React.ReactNode | undefined;
  targetKey: string;
  results: T[];
  searchText: string;
  title: string;
};

export default function SearchResults<T>({
  children,
  targetKey,
  results,
  searchText,
  title,
}: SearchResultsProps<T>) {
  const filteredResults = useMemo(
    () =>
      [...results].filter((result) =>
        ((result as any)[targetKey] as string)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [results, searchText, targetKey]
  );

  return (
    <div className="h-full w-full pt-4">
      <h2 className="text-grey-500 mb-4 text-[12px] uppercase leading-4 text-muted">
        {title} - {filteredResults.length}
      </h2>
      {filteredResults.map((result) => (
        <SearchResultItem key={(result as any)[targetKey]} result={result}>
          {children}
        </SearchResultItem>
      ))}
    </div>
  );
}
