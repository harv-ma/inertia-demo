import Client from "@/Client";
import {
    TableContainer,
    Table as CTable,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Spinner,
    Select,
} from "@chakra-ui/react";
import {
    faArrowLeft,
    faArrowLeftRotate,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    PaginationState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, useQuery } from "react-query";
import route from "ziggy-js";

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

    const fetchDataOptions = {
        pageIndex,
        pageSize,
    };

    const dataQuery: any = useQuery(
        [url, fetchDataOptions],
        () => fetchData(fetchDataOptions),
        { keepPreviousData: true }
    );

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const fetchData = (options: any) => {
        Client.get(url, {
            params: { page: options.pageIndex + 1, per_page: options.pageSize },
        })
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
            pagination,
        },
        onPaginationChange: setPagination,
        manualPagination: true,
    });

    return (
        <TableContainer className="py-4">
            <CTable variant="simple" className="border">
                <Thead>
                    {table.getHeaderGroups().map((headerGroup: any) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => (
                                <Th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </Th>
                            ))}
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
                <button
                    className="border rounded p-1 px-2"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                    className="border rounded p-1 px-2"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>

                <Select
                    width="140px"
                    value={pageSize}
                    onChange={(val) =>
                        setPagination({
                            pageIndex: pageIndex,
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
