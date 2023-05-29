import Root from "@/root";

export default function GuestLayout({ children }: any) {
    return (
        <Root>
            <div className="min-h-screen bg-gray-100">
                <main>{children}</main>
            </div>
        </Root>
    );
}
