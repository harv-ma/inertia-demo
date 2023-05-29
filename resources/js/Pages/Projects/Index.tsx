import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Projects({ auth }: any) {
    return (
        <Layout user={auth.user}>
            <Head title="Dashboard" />
            Projects
        </Layout>
    );
}
