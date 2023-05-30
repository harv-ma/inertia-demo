import {
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Show({ project }: any) {
    return (
        <>
            <Head title={project.name} />
            <div className="flex min-h-screen">
                <div className="w-1/4 border-r p-6">
                    <Link href={route("projects.index")}>Back</Link>
                </div>
                <div className="w-3/4 p-6">
                    <div className="flex w-full justify-between items-center">
                        <Heading as="h2" size="lg">
                            {project.name}
                        </Heading>
                        <Link href={route("projects.edit", project.id)}>
                            Edit
                        </Link>
                    </div>

                    <Tabs className="mt-8">
                        <TabList>
                            <Tab>Designs</Tab>
                            <Tab>Supplier POs</Tab>
                            <Tab>Comments</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Heading as="h3" size="sm">
                                    Project Designs
                                </Heading>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" size="sm">
                                    Supplier POs
                                </Heading>
                            </TabPanel>
                            <TabPanel>
                                <Heading as="h3" size="sm">
                                    Comments
                                </Heading>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
