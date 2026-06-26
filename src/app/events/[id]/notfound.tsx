export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-txt-primary">Event Not Found</h1>
            <p className="mt-4 text-lg text-txt-secondary">
                The event you are looking for does not exist or has been removed.
            </p>
        </div>
    );
}   