'use client'

import { useRouter } from "next/navigation";
import NavBar from "../../components/~header/page";

export default function CreateForm() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add any validation or form submission logic here
        router.push("/dashboard/forms"); // Navigate to the dashboard
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar />
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-semibold text-gray-700 mb-6">New Form</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-gray-600 mb-4">Form Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Josh's wedding"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-red-500 mt-1">The Name field is required.</p>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="forwardTo"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Forward to
                            </label>
                            <textarea
                                id="forwardTo"
                                placeholder="jane@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="2"
                            ></textarea>
                            <p className="text-sm text-gray-500 mt-1">
                                One email address per line.
                            </p>
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#525e9e] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                CREATE FORM
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="text-center text-sm text-gray-500 mt-10">
                Have a question or need help?{" "}
                <a href="#" className="text-blue-600 underline">
                    Send us an email.
                </a>{" "}
                © 2025 Tighten | Privacy Policy | GDPR
            </footer>
        </div>
    );
}
