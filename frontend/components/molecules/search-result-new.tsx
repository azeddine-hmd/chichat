import { cn } from "@/lib/cn";
import React, { useMemo } from "react";

export type SearchResultItemProps<T> = {
  result: T;
  children: (result: T) => React.ReactNode | undefined;
};

function SearchResultItem<T>({ result, children }: SearchResultItemProps<T>) {
  return <li>{children(result)}</li>;
}

export type SearchResultsProps<T> = {
  children: (result: T) => React.ReactNode | undefined;
  className?: string;
  targetKey: string;
  results: T[];
  searchText: string;
  title?: string;
  emptyCn?: React.ReactNode;
};

export default function SearchResults<T>({
  children,
  className,
  targetKey,
  results,
  searchText,
  title,
  emptyCn,
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
    <ul className={cn("h-full w-full overflow-y-scroll", className)}>
      {title && (
        <h2 className="text-grey-500 mb-4 text-[12px] uppercase leading-4 text-muted">
          {title} - {filteredResults.length}
        </h2>
      )}
      {filteredResults.length === 0 ? (
        <>{emptyCn}</>
      ) : (
        <>
          {filteredResults.map((result) => (
            <SearchResultItem key={(result as any)[targetKey]} result={result}>
              {children}
            </SearchResultItem>
          ))}
        </>
      )}
    </ul>
  );
}
