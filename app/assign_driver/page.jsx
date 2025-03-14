'use client'

import React, { useState, useEffect } from 'react'
// Remove the import for styles.module.css
// import styles from '../correct_path/styles.module.css'

// Mock data for drivers and deliveries
const mockDrivers = [
    { id: 1, name: 'John Smith', vehicle: 'Toyota Hiace', phone: '0771234567' },
    { id: 2, name: 'David Wilson', vehicle: 'Nissan Caravan', phone: '0777654321' },
    { id: 3, name: 'Sarah Brown', vehicle: 'Honda CR-V', phone: '0761234567' },
    { id: 4, name: 'Mike Johnson', vehicle: 'Suzuki Every', phone: '0751234567' }
]

const mockDeliveries = [
    { id: 1, customerName: 'John Doe', address: '123 Main St', status: 'Pending', phone: '0712345678' },
    { id: 2, customerName: 'Jane Smith', address: '456 Oak Ave', status: 'Pending', phone: '0723456789' },
    { id: 3, customerName: 'Bob Wilson', address: '789 Pine Rd', status: 'Pending', phone: '0734567890' }
]

/* Database connection code (uncomment and modify when ready)
import { prisma } from '@/lib/prisma'

async function getDrivers() {
    try {
        const drivers = await prisma.driver.findMany({
            where: { status: 'AVAILABLE' }
        })
        return drivers
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch drivers')
    }
}

async function getDeliveries() {
    try {
        const deliveries = await prisma.delivery.findMany({
            where: { status: 'PENDING' }
        })
        return deliveries
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch deliveries')
    }
}

async function assignDriver(deliveryId: number, driverId: number) {
    try {
        await prisma.delivery.update({
            where: { id: deliveryId },
            data: { 
                driverId: driverId,
                status: 'ASSIGNED'
            }
        })
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to assign driver')
    }
}
*/

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'

export default function AssignDriver() {
    const [deliveries, setDeliveries] = useState([])
    const [drivers, setDrivers] = useState([])
    const [selectedDrivers, setSelectedDrivers] = useState({})
    const toast = useRef(null)

    useEffect(() => {
        // Use mock data directly for now
        setDeliveries(mockDeliveries)
        setDrivers(mockDrivers)
    }, [])

    // Comment out or remove these functions until API is ready
    /*
    const fetchPendingDeliveries = async () => {
        try {
            const response = await fetch('/api/pending-deliveries')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            setDeliveries(data)
        } catch (error) {
            console.error('Error fetching deliveries:', error)
            setDeliveries(mockDeliveries)
        }
    }

    const fetchAvailableDrivers = async () => {
        try {
            const response = await fetch('/api/available-drivers')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            setDrivers(data)
        } catch (error) {
            console.error('Error fetching drivers:', error)
            setDrivers(mockDrivers)
        }
    }
    */

    const driverSelectionTemplate = (rowData) => {
        return (
            <div className="px-4">
                <Dropdown
                    value={selectedDrivers[rowData.id]}
                    options={drivers}
                    onChange={(e) => {
                        setSelectedDrivers({
                            ...selectedDrivers,
                            [rowData.id]: e.value
                        })
                    }}
                    optionLabel="name"
                    placeholder="Select Driver"
                    className="w-52 bg-white shadow-md border-2 border-gray-200 hover:border-[#fdc501] focus:border-[#fdc501]"
                    panelClassName="bg-white text-black font-medium"
                />
            </div>
        )
    }

    const confirmAssignment = async (deliveryId) => {
        if (!selectedDrivers[deliveryId]) {
            toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Please select a driver first',
                life: 3000
            })
            return
        }

        try {
            const response = await fetch('/api/assign-driver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deliveryId,
                    driverId: selectedDrivers[deliveryId].id
                })
            })

            if (response.ok) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Driver assigned successfully',
                    life: 3000
                })
                fetchPendingDeliveries() // Refresh the table
            } else {
                throw new Error('Failed to assign driver')
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 3000
            })
        }
    }

    const actionTemplate = (rowData) => {
        return (
            <div className="px-4">
                <Button
                    icon="pi pi-check"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold shadow-sm border-none"
                    onClick={() => confirmAssignment(rowData.id)}
                    label="Assign"
                />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <Toast ref={toast} />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center mb-8 bg-[#fdc501] p-4 rounded-lg">
                    <h1 className="text-3xl font-bold text-black">Assign Drivers to Deliveries</h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                    <DataTable
                        value={deliveries}
                        paginator
                        rows={8}
                        stripedRows
                        rowHover
                        emptyMessage="No pending deliveries found"
                        className="border-t-4 border-[#fdc501]"
                        rowClassName="h-16 border-b border-gray-200"
                        headerClassName="bg-gray-100 h-14"
                    >
                        <Column 
                            field="id" 
                            header="ID" 
                            sortable 
                            headerClassName="text-black font-bold text-base px-6"
                            bodyClassName="text-gray-800 font-semibold text-base px-6"
                            style={{ width: '8%', textAlign: 'center' }}
                        />
                        <Column 
                            field="customerName" 
                            header="Customer" 
                            sortable 
                            headerClassName="text-black font-bold text-base px-6"
                            bodyClassName="text-gray-800 font-medium text-base px-6"
                            style={{ width: '22%', textAlign: 'left' }}
                        />
                        <Column 
                            field="phone" 
                            header="Contact" 
                            headerClassName="text-black font-bold text-base px-6"
                            bodyClassName="text-gray-800 font-medium text-base px-6"
                            style={{ width: '15%', textAlign: 'left' }}
                        />
                        <Column 
                            field="address" 
                            header="Delivery Address" 
                            headerClassName="text-black font-bold text-base px-6"
                            bodyClassName="text-gray-800 font-medium text-base px-6"
                            style={{ width: '25%', textAlign: 'left' }}
                        />
                        <Column
                            header="Select Driver"
                            body={driverSelectionTemplate}
                            headerClassName="text-black font-bold text-base px-6"
                            bodyClassName="px-6"
                            style={{ width: '18%', textAlign: 'center' }}
                        />
                        <Column
                            header="Action"
                            body={actionTemplate}
                            headerClassName="text-black font-bold text-base px-6"
                            bodyClassName="px-6"
                            style={{ width: '12%', textAlign: 'center' }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}