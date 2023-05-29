import ProjectsTable from "@/Components/Projects/ProjectTable";
import Layout from "@/Layouts/Layout";
import { Heading } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";

export default function Projects({ auth }: any) {
    return (
        <Layout user={auth.user}>
            <Head title="Dashboard" />
            <div className="px-8 py-8">
                <Heading>Projects</Heading>
                <ProjectsTable />
            </div>
        </Layout>
    );
}
