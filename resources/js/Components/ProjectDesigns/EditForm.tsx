import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { router, useForm } from "@inertiajs/react";
import route from "ziggy-js";

export default function EditForm({ design, closePanel }: any) {
    const { data, setData, put, processing, errors } = useForm({
        status: design.status,
        comment: design.comment,
    });

    function submit(e: any) {
        e.preventDefault();
        put(route("designs.update", design.id), {
            preserveState: true,
            onSuccess: () => closePanel(),
        });
    }

    function handleInput(e: any) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
            <form onSubmit={submit} className="p-8 flex flex-col gap-4">
                <FormControl isRequired isInvalid={!!errors?.status}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="status"
                        value={data.status}
                        onInput={handleInput}
                    />
                    <FormErrorMessage>{errors.status}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors?.comment}>
                    <FormLabel>Name</FormLabel>
                    <Textarea
                        name="comment"
                        value={data.comment}
                        onInput={handleInput}
                        resize="none"
                        height="200px"
                    />
                    <FormErrorMessage>{errors.comment}</FormErrorMessage>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}
