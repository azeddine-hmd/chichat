type ObjectWithSearch<TargetKey extends string> = {
  [key in TargetKey]: string;
} & {
  [otherKey: string]: any;
};

export type SearchResultsProps<
  TargetKey extends string,
  T extends ObjectWithSearch<TargetKey>
> = {
  children: (result: T) => React.ReactNode;
  targetKey: string;
  results: Iterable<T>;
  searchText: string;
  title: string;
};

export type SearchResultItemProps<TargetKey extends string, T> = {
  result: T;
  children: (result: T) => React.ReactNode;
};

function SearchResultItem<TargetKey extends string, T>({
  result,
  children,
}: SearchResultItemProps<TargetKey, T>) {
  return <>{children(result)}</>;
}

export default function SearchResults<
  TargetKey extends string,
  T extends ObjectWithSearch<TargetKey>
>({
  children,
  targetKey,
  results,
  searchText,
  title,
}: SearchResultsProps<TargetKey, T>) {
  const filteredResults = [...results].filter((result) =>
    (result[targetKey] as string)
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
  return (
    <div className="h-full w-full pt-4">
      <h2 className="text-grey-500 mb-4 text-[12px] uppercase leading-4 text-muted">
        {title} - {filteredResults.length}
      </h2>
      <div className="" >
        {filteredResults.map((result) => (
          <SearchResultItem key={result[targetKey]} result={result}>
            {children}
          </SearchResultItem>
        ))}
      </div>
    </div>
  );
}
