import Home from '@/app/page'
import React from 'react'

const attendanceCreate = () => {
    return (
        <>
            <Home>
                <div>AttendanceCreate</div>
                <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
            </Home>
        </>
    )
}

export default attendanceCreate