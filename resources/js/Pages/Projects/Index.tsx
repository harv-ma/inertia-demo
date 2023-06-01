import ProjectsTable from "@/Components/Projects/ProjectTable";
import { Heading } from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Projects({ auth, projects }: any) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="px-8 py-8">
                <div className="flex justify-between items-center">
                    <Heading>Projects</Heading>
                    <Link href={route("projects.create")}>Create</Link>
                </div>
                <ProjectsTable initialData={projects.data} />
            </div>
        </>
    );
}
