'use client'
import Home from '@/app/page';
import DeleteEmployee from '@/components/DeleteEmployee';
import Link from 'next/link';
import React, { useState } from 'react';

interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    blood_group: string;
    status: string;
}

const getTopics = async (page_no?: number, limit?: number) => {
    let filter = '';
    if (page_no) {
        filter += `?page_no=${page_no}`
    }
    if (limit) {
        filter += `&limit=${limit}`
    }

    try {
        const res = await fetch(`http://localhost:3000/api/employee${filter}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};

const UserPage = () => {
    const [users, setUsers] = React.useState([]);
    const [res, setRes] = React.useState({ result: { data: [], page_no: 1, total: 0, limit: 0 } });
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const fetchData = async (page_no?: number, limit?: number) => {
        setIsLoading(true);
        try {
            page_no = page_no ? page_no : 1;
            limit = limit ? limit : 5;
            const response = await getTopics(page_no, limit);
            setRes(response);
            setUsers(response.result.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData(1, 5);
    }, []);

    const previousPage = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (res.result.page_no > 1) {
            await fetchData(res.result.page_no - 1, 5);
        }
    };

    const nextPage = async (e: React.MouseEvent) => {
        e.preventDefault();
        const mod = res.result.total % res.result.limit;
        const div = res.result.total / res.result.limit;

        if (mod === 0 && res.result.page_no < div) {
            await fetchData(res.result.page_no + 1, 5);
        } else {
            if (res.result.page_no < Math.ceil(div)) {
                await fetchData(res.result.page_no + 1, 5);
            }
        }
    };

    return (
        <>
            <Home>
                {/* <EmployeeList /> */}
                <div className='p-10'>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-md font-bold">Employee List</h4>
                        <Link href="/features/user-create" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-sm">Create</Link>
                    </div>

                    {!isLoading && !error && (
                        <>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>SL No</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th>Blood Group</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: User, index: number) => <tr className="hover" key={user._id}>
                                        <td>{index + 1}</td>
                                        <td></td>
                                        <td>{user.name}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.email}</td>
                                        <td>{user.blood_group}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <div className="flex space-x-2">
                                                <button className="btn btn-info btn-xs">details</button>
                                                <Link href={`/features/user-edit/${user._id}`} className="btn btn-warning btn-xs">edit</Link>
                                                <DeleteEmployee id={user._id} onDelete={fetchData} />
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </>
                    )}

                    {isLoading && (
                        <div className="flex items-center justify-center h-full pt-20">
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-center pt-20">Error loading data. Please try again.</div>
                    )}

                    {!isLoading && !error && (
                        <div className="text-center mt-3">
                            <button className="join-item btn" onClick={previousPage}>«</button>
                            <button className="join-item btn">Page {res.result.page_no}</button>
                            <button className="join-item btn" onClick={nextPage}>»</button>
                        </div>
                    )}
                </div>
            </Home>
        </>
    )
}

export default UserPage