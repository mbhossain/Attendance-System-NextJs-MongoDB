'use client'
import Home from '@/app/page';
import Link from 'next/link';
import React, { useState } from 'react';

const getEmployeeById = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch employee");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const employeeDetails = ({ params }: any) => {
    const { id } = params;
    const [employee, setEmployee] = useState<any>(null);

    const fetchData = async (id: string) => {
        try {
            const { employee: fetchedEmployee } = await getEmployeeById(id);
            setEmployee(fetchedEmployee);
        } catch (error: any) {
            console.log(error);
        } finally { }
    };

    React.useEffect(() => {
        fetchData(id);
    }, []);

    return (
        <>
            <Home>
                <div className='p-10'>
                    <h4 className="text-md font-bold">Employee Details</h4>
                    <div className="grid grid-cols-3 gap-4 mt-10 ml-10">
                        <div>
                            <strong>Name:</strong> {employee?.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {employee?.email}
                        </div>
                        <div>
                            <strong>Mobile:</strong> {employee?.mobile}
                        </div>
                        <div>
                            <strong>Blood Group:</strong> {employee?.blood_group}
                        </div>
                        <div>
                            <strong>Status:</strong> {employee?.status}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                        <Link href="/features/user-list" className="btn btn-warning btn-sm">Back</Link>
                    </div>
                </div>
            </Home>
        </>
    )
}

export default employeeDetails