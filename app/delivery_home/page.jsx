'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DeliveryHome() {
    // Mock data for tables
    const toDeliverData = [
        { orderId: "ORD001", location: "Colombo 05", customerName: "John Doe", preparedDate: "2024-01-15" },
        { orderId: "ORD002", location: "Colombo 07", customerName: "Jane Smith", preparedDate: "2024-01-15" },
        { orderId: "ORD003", location: "Nugegoda", customerName: "Mike Johnson", preparedDate: "2024-01-15" },
    ];

    const onDeliveringData = [
        { orderId: "ORD004", location: "Rajagiriya", customerName: "Sarah Wilson", startedDateTime: "2024-01-15 10:30", driverId: "DRV001", vehicleId: "VEH001" },
        { orderId: "ORD005", location: "Malabe", customerName: "Tom Brown", startedDateTime: "2024-01-15 11:15", driverId: "DRV002", vehicleId: "VEH002" },
    ];

    const deliveredData = [
        { orderId: "ORD006", location: "Kaduwela", startedDateTime: "2024-01-14 09:00", deliveredDateTime: "2024-01-14 10:30", driverId: "DRV001", vehicleId: "VEH001" },
        { orderId: "ORD007", location: "Kottawa", startedDateTime: "2024-01-14 11:00", deliveredDateTime: "2024-01-14 12:15", driverId: "DRV003", vehicleId: "VEH003" },
        { orderId: "ORD008", location: "Battaramulla", startedDateTime: "2024-01-14 13:00", deliveredDateTime: "2024-01-14 14:30", driverId: "DRV002", vehicleId: "VEH002" },
    ];

    // Add refs for scrolling
    const toDeliverRef = useRef(null)
    const onDeliveringRef = useRef(null)
    const deliveredRef = useRef(null)

    // Update counts based on actual data
    const toDeliverCount = toDeliverData.length
    const onDeliveringCount = onDeliveringData.length
    const deliveredCount = deliveredData.length

    // Calculate total orders for percentage
    const totalOrders = toDeliverCount + onDeliveringCount + deliveredCount

    // Chart data configurations
    const chartData = {
        labels: ['To Deliver', 'On Delivering', 'Delivered'],
        datasets: [
            {
                data: [toDeliverCount, onDeliveringCount, deliveredCount],
                backgroundColor: ['rgba(253, 197, 1, 0.8)', 'rgba(253, 197, 1, 0.5)', 'rgba(253, 197, 1, 0.3)'],
                borderColor: ['#fdc501', '#fdc501', '#fdc501'],
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            }
        }
    }

    // Create specific data for each chart
    const toDeliverChartData = {
        ...chartData,
        datasets: [{
            ...chartData.datasets[0],
            backgroundColor: [
                'rgba(253, 197, 1, 0.8)',  // Highlight To Deliver
                'rgba(200, 200, 200, 0.3)', // Others grayed out
                'rgba(200, 200, 200, 0.3)'
            ]
        }]
    }

    const onDeliveringChartData = {
        ...chartData,
        datasets: [{
            ...chartData.datasets[0],
            backgroundColor: [
                'rgba(200, 200, 200, 0.3)',
                'rgba(253, 197, 1, 0.8)',  // Highlight On Delivering
                'rgba(200, 200, 200, 0.3)'
            ]
        }]
    }

    const deliveredChartData = {
        ...chartData,
        datasets: [{
            ...chartData.datasets[0],
            backgroundColor: [
                'rgba(200, 200, 200, 0.3)',
                'rgba(200, 200, 200, 0.3)',
                'rgba(253, 197, 1, 0.8)'  // Highlight Delivered
            ]
        }]
    }

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[#fdc501] shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-3xl font-bold text-black">Delivery Management</h1>
                </div>
            </header>

            {/* Counting Tabs */}
            <div className="container mx-auto px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                        onClick={() => scrollToSection(toDeliverRef)}
                        className="bg-white border-2 border-[#fdc501] rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-black">To Deliver</h3>
                                <p className="text-3xl font-bold text-[#fdc501]">{toDeliverCount}</p>
                                <p className="text-sm text-gray-600">{((toDeliverCount / totalOrders) * 100).toFixed(1)}% of total</p>
                            </div>
                            <div className="w-20 h-20">
                                <Doughnut data={toDeliverChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                    <div 
                        onClick={() => scrollToSection(onDeliveringRef)}
                        className="bg-white border-2 border-[#fdc501] rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-black">On Delivering</h3>
                                <p className="text-3xl font-bold text-[#fdc501]">{onDeliveringCount}</p>
                                <p className="text-sm text-gray-600">{((onDeliveringCount / totalOrders) * 100).toFixed(1)}% of total</p>
                            </div>
                            <div className="w-20 h-20">
                                <Doughnut data={onDeliveringChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                    <div 
                        onClick={() => scrollToSection(deliveredRef)}
                        className="bg-white border-2 border-[#fdc501] rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-black">Successfully Delivered</h3>
                                <p className="text-3xl font-bold text-[#fdc501]">{deliveredCount}</p>
                                <p className="text-sm text-gray-600">{((deliveredCount / totalOrders) * 100).toFixed(1)}% of total</p>
                            </div>
                            <div className="w-20 h-20">
                                <Doughnut data={deliveredChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Assign Driver Card */}
                    <Link href="/assign_driver">
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

                {/* Tables Section */}
                <div className="space-y-8">
                    {/* To Deliver Table */}
                    <div ref={toDeliverRef} className="bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold p-4 bg-[#fdc501] text-black rounded-t-lg">To Deliver</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-black bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Order ID</th>
                                        <th className="px-6 py-3">Delivery Location</th>
                                        <th className="px-6 py-3">Customer Name</th>
                                        <th className="px-6 py-3">Order Prepared Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toDeliverData.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 text-black">{item.orderId}</td>
                                            <td className="px-6 py-4 text-black">{item.location}</td>
                                            <td className="px-6 py-4 text-black">{item.customerName}</td>
                                            <td className="px-6 py-4 text-black">{item.preparedDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* On Delivering Table */}
                    <div ref={onDeliveringRef} className="bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold p-4 bg-[#fdc501] text-black rounded-t-lg">On Delivering</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-black bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Order ID</th>
                                        <th className="px-6 py-3">Delivery Location</th>
                                        <th className="px-6 py-3">Customer Name</th>
                                        <th className="px-6 py-3">Delivery Started Date & Time</th>
                                        <th className="px-6 py-3">Driver ID</th>
                                        <th className="px-6 py-3">Delivery Vehicle ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {onDeliveringData.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 text-black">{item.orderId}</td>
                                            <td className="px-6 py-4 text-black">{item.location}</td>
                                            <td className="px-6 py-4 text-black">{item.customerName}</td>
                                            <td className="px-6 py-4 text-black">{item.startedDateTime}</td>
                                            <td className="px-6 py-4 text-black">{item.driverId}</td>
                                            <td className="px-6 py-4 text-black">{item.vehicleId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Successfully Delivered Table */}
                    <div ref={deliveredRef} className="bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold p-4 bg-[#fdc501] text-black rounded-t-lg">Successfully Delivered</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-black bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Order ID</th>
                                        <th className="px-6 py-3">Delivery Location</th>
                                        <th className="px-6 py-3">Delivery Started Date & Time</th>
                                        <th className="px-6 py-3">Delivered Date & Time</th>
                                        <th className="px-6 py-3">Driver ID</th>
                                        <th className="px-6 py-3">Delivery Vehicle ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveredData.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 text-black">{item.orderId}</td>
                                            <td className="px-6 py-4 text-black">{item.location}</td>
                                            <td className="px-6 py-4 text-black">{item.startedDateTime}</td>
                                            <td className="px-6 py-4 text-black">{item.deliveredDateTime}</td>
                                            <td className="px-6 py-4 text-black">{item.driverId}</td>
                                            <td className="px-6 py-4 text-black">{item.vehicleId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
