export default function AboutPage() {

    const date = new Date().toLocaleDateString() ;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">About Page</h1>
            <p className="mt-4 text-lg">Current Date: {date}</p>
        </div>
    )
}