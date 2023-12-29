import Home from '@/app/page';
import Link from 'next/link';
import React from 'react'

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const UserPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();
    return (
        <>
            <Home>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-md font-bold">Employee List</h4>
                    <Link href="/features/user-create" className="btn btn-primary btn-sm">Create</Link>
                </div>
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
                        {users.map(user => <tr key={user.id}>
                            <td>{user.id}</td>
                            <td></td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>)}
                    </tbody>
                </table>
            </Home>
        </>
    )
}

export default UserPage