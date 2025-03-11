'use client'
import Link from 'next/link'



export default function DeliveryHome() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[#fdc501] shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-3xl font-bold text-black">Delivery Management</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assign Driver Card */}
                    <Link href="/assign-driver">
                        <div className="bg-white border-2 border-[#fdc501] rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer">
                            <h2 className="text-2xl font-semibold text-black mb-3">Assign Driver</h2>
                            <p className="text-gray-600">Assign drivers to pending deliveries and manage delivery assignments.</p>
                        </div>
                    </Link>

                    {/* Track Delivery Status Card */}
                    <Link href="/track-delivery">
                        <div className="bg-white border-2 border-[#fdc501] rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer">
                            <h2 className="text-2xl font-semibold text-black mb-3">Track Delivery Status</h2>
                            <p className="text-gray-600">Monitor real-time status and location of ongoing deliveries.</p>
                        </div>
                    </Link>

                    {/* Delivery Confirmation Card */}
                    <Link href="/delivery-confirmation">
                        <div className="bg-white border-2 border-[#fdc501] rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer">
                            <h2 className="text-2xl font-semibold text-black mb-3">Delivery Confirmation</h2>
                            <p className="text-gray-600">Verify and confirm completed deliveries with proof of delivery.</p>
                        </div>
                    </Link>

                    {/* Customer Feedbacks Card */}
                    <Link href="/customer-feedbacks">
                        <div className="bg-white border-2 border-[#fdc501] rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer">
                            <h2 className="text-2xl font-semibold text-black mb-3">Customer Feedbacks</h2>
                            <p className="text-gray-600">View and manage customer feedback for completed deliveries.</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    )
}
