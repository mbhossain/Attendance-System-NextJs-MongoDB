import Home from '@/app/page'
import Link from 'next/link'
import React from 'react'

const employeeCreate = () => {
    return (
        <>
            <Home>
                <h4 className="text-md font-bold">Create Employee</h4>
                <form className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="p-4">
                            <input type="text" placeholder="Name" className="input input-bordered input-info w-full" />
                        </div>
                        <div className="p-4">
                            <input type="text" placeholder="Mobile" className="input input-bordered input-info w-full" />
                        </div>
                        <div className="p-4">
                            <input type="text" placeholder="Email" className="input input-bordered input-info w-full" />
                        </div>
                        <div className="p-4">
                            <input type="text" placeholder="Blood Group" className="input input-bordered input-info w-full" />
                        </div>
                        <div className="p-4">
                            <input type="text" placeholder="Status" className="input input-bordered input-info w-full" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4 gap-2">
                        <button className="btn btn-success btn-sm">Save</button>
                        <button className="btn btn-error btn-sm">Reset</button>
                        <Link href="/features/user-list" className="btn btn-warning btn-sm">Back</Link>
                    </div>
                </form>
            </Home>
        </>
    )
}

export default employeeCreate