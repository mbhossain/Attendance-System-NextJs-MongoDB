import Home from '@/app/page';
import EmployeeList from '@/components/EmployeeList';
import React from 'react'

const UserPage = async () => {
    return (
        <>
            <Home>
                <EmployeeList />
            </Home>
        </>
    )
}

export default UserPage