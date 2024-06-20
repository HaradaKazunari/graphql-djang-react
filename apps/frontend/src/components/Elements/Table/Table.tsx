import {
  ArchiveBoxIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import * as React from "react";
import {
  DeepKeys,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { getRandomKey } from "@/utils/variable";
import { Pagination } from "./Pagination";

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  isSorting?: boolean;
  isPager?: boolean;
};

const iconStyle = ["group-hover:text-gray-300", "mr-4 flex-shrink-0 h-3 w-3"];

export const Table = <Entry extends { id: string }>({
  data,
  columns,
  isSorting = false,
  isPager = false,
}: TableProps<Entry>) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [showItemNum] = React.useState<number>(15);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columnHelper = createColumnHelper<Entry>();
  const rtColumn = columns.map((column) =>
    columnHelper.accessor(column.field as DeepKeys<Entry>, {
      cell: (info) =>
        column.Cell
          ? column.Cell({ entry: info.row.original })
          : info.getValue(),
      header: column.title,
    })
  );
  const table = useReactTable({
    columns: rtColumn,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const getShowData = () => {
    const rows = table.getRowModel().rows;
    if (isPager) {
      return rows.slice(
        (currentPage - 1) * showItemNum,
        showItemNum * currentPage
      );
    }
    return rows;
  };

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
        <ArchiveBoxIcon className="w-16 h-16" />
        <h4>データがありません</h4>
      </div>
    );
  }

  return (
    <>
      {isPager && (
        <div className="mb-6">
          <Pagination
            currentPage={currentPage}
            maxPage={Math.ceil(data.length / showItemNum)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id + getRandomKey()}
                          scope="col"
                          className={clsx([
                            "px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase",
                            isSorting ? "cursor-pointer" : "",
                          ])}
                          onClick={
                            isSorting
                              ? header.column.getToggleSortingHandler()
                              : () => {}
                          }
                        >
                          <div className="flex items-center gap-2 justify-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <span>
                              {header.column.getIsSorted() &&
                                (header.column.getIsSorted() === "desc" ? (
                                  <ArrowDownIcon
                                    className={clsx(iconStyle)}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ArrowUpIcon
                                    className={clsx(iconStyle)}
                                    aria-hidden="true"
                                  />
                                ))}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {getShowData().map((row) => (
                    <tr key={row.id} className="odd:bg-white even:bg-gray-100">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id + getRandomKey()}
                          className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isPager && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            maxPage={Math.ceil(data.length / showItemNum)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};
