import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import axios from 'axios'

const LineClearanceToday = () => {
    const [lineClearance, setLineClearance] = useState([])

    useEffect(() => {
        // setLoginName(localStorage.getItem("loginName"))
        // setLoginId(JSON.parse(localStorage.getItem("loginId")))
        // axios.get("/api/line-clearance")
        //     .then(res => {
        //         // console.log(res.data)
        //         setProducts(res.data.newRows)
        //         setCheckListFor(res.data.rows)


        //     })
        //     .catch(err => {
        //         console.log("Error:", err)
        //     })
        axios.get("/api/get-today-lclear")
            .then(res => {
                console.log(res.data)
                setLineClearance(res.data.lclearRows)
                // setCheckListFor(res.data.rows)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [])
    return (
        <div>
            <Navbar />

            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">
                <BackButton />

                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {/* Standard Manufacturing Procedure */}
                    Today's Line Clearance
                </h2>


                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {lineClearance.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
                        >
                            {/* Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl"></div>

                            {/* Header */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-400">Batch No</p>
                                <h2 className="text-base ">
                                    {item.batch_no}
                                </h2>
                                <div className='mt-2'>
                                    <p className="text-sm text-gray-400">Product</p>
                                    <p className="text-base  mt-1">{item.product_name}</p>

                                </div>
                            </div>

                            {/* Process Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">
                                    {item.process}
                                </span>

                                <span className="text-sm font-semibold text-gray-700">
                                    {/* Step {item.mstep} */}
                                </span>
                            </div>

                            {/* Info Grid */}
                            <div className=" gap-3 text-sm text-gray-600">
                                <div className='flex flex-col gap-1 mb-2'>
                                    <p className="text-sm text-gray-400">Intimation Date</p>
                                    {/* <p className="font-medium">{new Date(item.startd).toISOString().slice(0, 16)}</p> */}
                                    <p className="font-medium">{new Date(item.idate).toLocaleString('en-US', { hour12: true })}</p>
                                </div>

                                <div className='flex flex-col gap-1 mb-4 mt-4'>
                                    <p className="text-sm text-gray-400">Line Clearance Date</p>
                                    {/* <p className="font-medium">{new Date(item.startd).toISOString().slice(0, 16)}</p> */}
                                    <p className="font-medium">{new Date(item.ldate).toLocaleString('en-US', { hour12: true })}</p>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <p className="text-sm text-gray-400">remarks</p>
                                    <p className="font-medium">{item.remarks}</p>
                                </div>
                            </div>

                            {/* Ename */}
                            <div className="mt-4 pt-3 border-t text-sm line-clamp-2">
                                <p className="text-sm text-gray-400">Done By</p>
                                <p>{item.ename}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LineClearanceToday