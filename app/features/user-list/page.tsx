'use client'
import Home from '@/app/page';
import DeleteEmployee from '@/components/DeleteEmployee';
import SearchList from '@/components/Search';
import Link from 'next/link';
import React, { useState } from 'react';

interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    blood_group: string;
    status: string;
    fileName: string;
}

const getTopics = async (page_no?: number, limit?: number, name?: string) => {
    let filter = '';
    if (page_no) {
        filter += `?page_no=${page_no}`
    }
    if (limit) {
        filter += `&limit=${limit}`
    }
    if (name) {
        filter += `&name=${name}`
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
    const [searchInput, setSearchInput] = useState("");

    const fetchData = async (page_no?: number, limit?: number, name?: string) => {
        setIsLoading(true);
        try {
            page_no = page_no ? page_no : 1;
            limit = limit ? limit : 5;
            const response = await getTopics(page_no, limit, name);
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

    const searchList = async (e: React.MouseEvent) => {
        e.preventDefault();
        await fetchData(1, 5, searchInput);
    };

    const resetSearch = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
        }
        setSearchInput("");
        await fetchData(1, 5);
    }

    return (
        <>
            <Home>
                {/* <EmployeeList /> */}
                <div className='pl-10 pr-10 pb-20'>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-md font-bold">Employee List</h4>
                        <Link href="/features/user-create" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-sm">Create</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 mb-3 ml-3">
                        {/* <SearchList /> */}
                        <div className="relative">
                            <input
                                type="text"
                                onChange={(e) => setSearchInput(e.target.value)}
                                value={searchInput}
                                placeholder="Employee Name"
                                className="input input-bordered input-info w-full input-sm pl-8 pr-4" // Adjust padding to make space for the icon
                            />
                            <svg
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width="16"
                                height="16"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 mb-3 ml-1">
                        <button className="btn btn-outline btn-success btn-xs ml-2" onClick={searchList}>
                            {isLoading && (
                                <span className="loading loading-spinner" style={{ height: '14px', width: '14px' }}></span>
                            )}
                            Search
                        </button>
                        <button className="btn btn-outline btn-xs btn-warning ml-2" onClick={resetSearch}>Reset</button>
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
                                        <td>
                                            {!user.fileName && (
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src="/images/profile-demo.png" alt="Not Found" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {user.fileName && (
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={`/api/uploads/${user.fileName}`} alt="Not Found" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.email}</td>
                                        <td>{user.blood_group}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <div className="flex space-x-2">
                                                <Link href={`/features/user-details/${user._id}`} className="btn btn-info btn-xs">details</Link>
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