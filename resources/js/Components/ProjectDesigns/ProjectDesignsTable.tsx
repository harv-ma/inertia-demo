import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/Components/Table";
import route from "ziggy-js";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import ReactSlidingPane from "react-sliding-pane";
import EditForm from "./EditForm";

type Design = {
    status: string;
    comment: string;
    project_id: number;
    created_at: string;
};

const columnHelper = createColumnHelper<Design>();

export default function ProjectsDesignsTable({ rows }: any) {
    const { project }: any = usePage().props;
    const [state, setState] = useState<any>({
        design: undefined,
        open: false,
    });

    const columns = [
        columnHelper.accessor("status", {
            header: "Status",
            cell: (info: any) => info.getValue(),
        }),
        columnHelper.accessor("comment", {
            header: "Comment",
            cell: (info: any) => info.getValue(),
        }),
        columnHelper.accessor("created_at", {
            header: "Created at",
            cell: (info: any) => info.getValue(),
        }),
        columnHelper.display({
            header: "Actions",
            cell: ({ row }: any) => (
                <Button
                    onClick={() =>
                        setState({
                            design: row.original,
                            open: true,
                        })
                    }
                >
                    Edit in panel
                </Button>
            ),
        }),
    ];

    return (
        <>
            <Table
                columns={columns}
                url={route("projects.show.designs", project.id)}
            />
            <ReactSlidingPane
                isOpen={state.open}
                onRequestClose={() => setState({ ...state, open: false })}
                width="400px"
                title="Edit project design"
            >
                {state.design ? (
                    <EditForm
                        design={state.design}
                        closePanel={() => setState({ ...state, open: false })}
                    />
                ) : (
                    ""
                )}
            </ReactSlidingPane>
        </>
    );
}
