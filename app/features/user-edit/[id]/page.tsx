'use client'
import Home from '@/app/page';
import ImageUploader from '@/components/ImageUploader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

const employeeUpdate = ({ params }: any) => {
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

    React.useEffect(() => {
        if (employee) {
            setName(employee.name || '');
            setEmail(employee.email || '');
            setMobile(employee.mobile || '');
            setBloodGroup(employee.blood_group || '');
            setStatus(employee.status || '');
        }
    }, [employee]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [blood_group, setBloodGroup] = useState('');
    const [status, setStatus] = useState('');
    const [fileName, setFileName] = useState("");

    const [isUpdate, setIsUpdate] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // if (!title || !description) {
        //     alert("Title and description are required.");
        //     return;
        // }
        setIsUpdate(false);
        try {
            const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name, email, mobile, blood_group, status, fileName }),
            });

            if (res.ok) {
                resetForm();
                setIsUpdate(true);
                setTimeout(() => {
                    router.push("/features/user-list");
                }, 1000)
            } else {
                throw new Error("Failed to update employee");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
        }

        if (employee) {
            setName(employee.name || '');
            setEmail(employee.email || '');
            setMobile(employee.mobile || '');
            setBloodGroup(employee.blood_group || '');
            setStatus(employee.status || '');
        }
    }

    const getFileName = async (filename?: any) => {
        setFileName(filename);
    };

    return (
        <>
            <Home>
                <div className='p-10'>
                    <h4 className="text-md font-bold">Update Employee</h4>
                    <ImageUploader fileName={getFileName} />
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="p-4">
                                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className="input input-bordered input-info w-full" />
                            </div>
                            <div className="p-4">
                                <input onChange={(e) => setMobile(e.target.value)} value={mobile} type="text" placeholder="Mobile" className="input input-bordered input-info w-full" />
                            </div>
                            <div className="p-4">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" className="input input-bordered input-info w-full" />
                            </div>
                            <div className="p-4">
                                <input onChange={(e) => setBloodGroup(e.target.value)} value={blood_group} type="text" placeholder="Blood Group" className="input input-bordered input-info w-full" />
                            </div>
                            <div className="p-4">
                                <input onChange={(e) => setStatus(e.target.value)} value={status} type="text" placeholder="Status" className="input input-bordered input-info w-full" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                            <button type="submit" className="btn btn-success btn-sm">Update</button>
                            <button onClick={resetForm} className="btn btn-error btn-sm">Reset</button>
                            <Link href="/features/user-list" className="btn btn-warning btn-sm">Back</Link>
                        </div>
                    </form>

                    {isUpdate && (
                        <div className="toast toast-center toast-middle">
                            <div className="alert alert-success">
                                <span>Updated successfully.</span>
                            </div>
                        </div>
                    )}
                </div>
            </Home>
        </>
    )
}

export default employeeUpdate