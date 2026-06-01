export default function EventSection() {
    return (
        <section className="py-12 bg-background w-full border-t border-coffee-200 dark:border-coffee-800 h-screen ">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center ">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Event cards will be rendered here */}
                </div>
            </div>
        </section>
    );
}