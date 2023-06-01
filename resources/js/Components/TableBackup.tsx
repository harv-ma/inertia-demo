import Client from "@/Client";
import {
    TableContainer,
    Table as CTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    Button,
} from "@chakra-ui/react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    PaginationState,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

type TableProps = {
    columns: any;
    url: string;
};

export default function Table({ columns, url }: TableProps) {
    const [data, setData] = useState([]);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [lastPage, setLastPage] = useState(-1);
    const [loading, setLoading] = useState(true);

    const [sorting, setSorting] = useState<SortingState>([]);

    const fetchDataOptions = {
        pageIndex,
        pageSize,
        sorting,
    };

    const dataQuery: any = useQuery(
        [url, fetchDataOptions],
        () => fetchData(fetchDataOptions),
        { keepPreviousData: true }
    );

    const paginationMemo = useMemo(
        () => ({
            pageIndex,
            pageSize,
            sorting,
        }),
        [pageIndex, pageSize, sorting]
    );

    const sortingMemo = useMemo(() => sorting, [sorting]);

    const fetchData = (options: any) => {
        let params: any = {
            page: options.pageIndex + 1,
            per_page: options.pageSize,
            sort_by: undefined,
            direction: undefined,
        };
        if (options.sorting.length > 0) {
            params = {
                ...params,
                sort_by: options.sorting[0].id,
                direction: options.sorting[0].desc ? "desc" : "asc",
            };
        }

        Client.post(url, params)
            .then((res) => {
                if (res.data) {
                    // setLoading(false);
                    console.log(res.data.data);
                    setData(res.data.data);
                    setLastPage(res.data.meta.last_page);
                }
            })
            .catch((er) => {
                console.log(er);
            });
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: lastPage,
        state: {
            pagination: paginationMemo,
            sorting: sortingMemo,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        manualSorting: true,
        manualPagination: true,
    });

    return (
        <TableContainer className="py-4">
            <CTable variant="simple" className="border">
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? "cursor-pointer select-none"
                                                            : "",
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </div>
                                        )}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row: any) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell: any) => (
                                <Td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </CTable>
            <div className="flex items-center gap-2 pt-4 justify-end">
                <Button
                    className="border rounded p-1 px-2"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Button
                    className="border rounded p-1 px-2"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>

                <Select
                    width="140px"
                    value={pageSize}
                    onChange={(val) =>
                        setPagination({
                            pageIndex: 0,
                            pageSize: Number.parseInt(val.target.value),
                        })
                    }
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </Select>
            </div>
        </TableContainer>
    );
}
