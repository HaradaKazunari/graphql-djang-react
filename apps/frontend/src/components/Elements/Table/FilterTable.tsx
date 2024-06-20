import { Table, TableProps } from "./Table";

type FilterTermType<Entry> = {
  [key: string]: (target: Entry) => boolean;
};

type FilterTableType<Entry> = {
  isSorting?: boolean;
  filterTerms?: FilterTermType<Entry>;
} & TableProps<Entry>;

export const FilterTable = <Entry extends { id: string }>({
  data: prevData,
  columns,
  filterTerms = {},
  ...props
}: FilterTableType<Entry>) => {
  const onFiltering = () => {
    let data = prevData;
    Object.keys(filterTerms).map((key: string) => {
      if (filterTerms[key]) {
        const filterMethod = filterTerms[key];
        data = data.filter(filterMethod);
      }
    });
    return data;
  };

  return (
    <>
      <div className="mt-6">
        <Table data={onFiltering()} columns={columns} {...props} />
      </div>
    </>
  );
};
