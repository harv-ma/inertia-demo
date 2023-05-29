export default function GuestLayout({ children }: any) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    );
}
