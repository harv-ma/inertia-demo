import Layout from "@/Layouts/Layout";
import { Button } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }: any) {
    return (
        <Layout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <Button onClick={() => console.log("hi")}>
                    Hey I am a button
                </Button>
            </div>
        </Layout>
    );
}
