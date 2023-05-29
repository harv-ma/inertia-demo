import Layout from "@/Layouts/Layout";
import {
    Button,
    Card,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Input,
} from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect } from "react";
import route from "ziggy-js";

export default function Edit({ auth, project }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: project.name,
        name_generated: project.name_generated ?? "",
        customer_id: project.customer_id ?? "",
        reference: project.reference ?? "",
        workstream: project.workstream ?? "",
        start_date: project.start_date ?? "",
        delivery_date: project.delivery_date ?? "",
        address_line_1: project.address_line_1 ?? "",
        address_line_2: project.address_line_2 ?? "",
        city: project.city ?? "",
        postcode: project.postcode ?? "",
    });

    function submit(e: any) {
        e.preventDefault();
        put(route("projects.update", project.id));
    }

    function handleInput(e: any) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    function handleDateInput(e: any) {
        setData({
            ...data,
            [e.target.name]: moment(new Date(e.target.value)).format(
                "YYYY-MM-DD"
            ),
        });
    }

    useEffect(() => {
        setData({
            ...data,
            // @todo
            name_generated: data.name.substr(0, 3) + "-" + data.reference,
        });
    }, [data.name]);

    return (
        <Layout user={auth.user} className="px-8 py-8">
            <form onSubmit={submit} className="">
                <Head title="Dashboard" />
                <Link href="/projects">Back to projects</Link>
                <div className="flex justify-between items-center mb-6">
                    <Heading>{project.name}</Heading>
                    <Button type="submit" isLoading={processing}>
                        Save
                    </Button>
                </div>
                <div className="flex w-full gap-8">
                    <Card
                        padding="5"
                        shadow="md"
                        className="flex-1 flex flex-col gap-4"
                    >
                        <Heading as="h3" size="md">
                            Project details
                        </Heading>
                        <FormControl isRequired isInvalid={!!errors?.name}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={!!errors?.name_generated}
                        >
                            <FormLabel>Generated Name</FormLabel>
                            <Input
                                type="text"
                                readOnly
                                value={data.name_generated}
                            />
                            <FormErrorMessage>
                                {errors.name_generated}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={!!errors?.customer_id}
                        >
                            <FormLabel>Customer</FormLabel>
                            <Input
                                type="text"
                                name="customer_id"
                                value={data.customer_id}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>
                                {errors.customer_id}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors?.reference}>
                            <FormLabel>Reference</FormLabel>
                            <Input
                                type="text"
                                name="reference"
                                value={data.reference}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>
                                {errors.reference}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors?.workstream}>
                            <FormLabel>Workstream</FormLabel>
                            <Input
                                type="text"
                                name="workstream"
                                value={data.workstream}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>
                                {errors.workstream}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={!!errors?.start_date}
                        >
                            <FormLabel>Start date</FormLabel>
                            <Input
                                type="date"
                                name="start_date"
                                value={data.start_date}
                                onInput={handleDateInput}
                            />
                            <FormErrorMessage>
                                {errors.start_date}
                            </FormErrorMessage>
                        </FormControl>
                    </Card>
                    <Card
                        padding="5"
                        shadow="md"
                        className="flex-1 flex flex-col gap-4"
                    >
                        <Heading as="h3" size="md">
                            Address
                        </Heading>

                        <FormControl
                            isRequired
                            isInvalid={!!errors?.address_line_1}
                        >
                            <FormLabel>Address line 1</FormLabel>
                            <Input
                                type="text"
                                name="address_line_1"
                                value={data.address_line_1}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>
                                {errors.address_line_1}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors?.address_line_2}>
                            <FormLabel>Address line 2</FormLabel>
                            <Input
                                type="text"
                                name="address_line_2"
                                value={data.address_line_2}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>
                                {errors.address_line_2}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors?.city}>
                            <FormLabel>City</FormLabel>
                            <Input
                                type="text"
                                name="city"
                                value={data.city}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>{errors.city}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors?.postcode}>
                            <FormLabel>Postcode</FormLabel>
                            <Input
                                type="text"
                                name="postcode"
                                value={data.postcode}
                                onInput={handleInput}
                            />
                            <FormErrorMessage>
                                {errors.postcode}
                            </FormErrorMessage>
                        </FormControl>
                    </Card>
                </div>
            </form>
        </Layout>
    );
}
