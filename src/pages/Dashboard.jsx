import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import axios from 'axios'
import useLoginName from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [smp, setSmp] = useState([])
    const [steps, setSteps] = useState([])
    const [product, setProduct] = useState([])
    const [batchNo, setBatchNo] = useState()
    const [batchSize, setBatchSize] = useState()
    const [billNo, setBillNo] = useState()
    const [stepNo, setStepNo] = useState()
    const [materials, setMaterials] = useState([])
    const [sdate, setSdate] = useState(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
    );
    const [edate, setEdate] = useState();
    const [operator, setOperator] = useState();
    const [selectedStepObj, setSelectedStepObj] = useState({})
    const [qtys, setQtys] = useState([])
    const [pcomp, setPcomp] = useState()
    const [asmp, setAsmp] = useState()
    const [procedure, setProcedure] = useState()
    const [cdate, setCdate] = useState("")
    const [rdate, setRdate] = useState("")
    const [checkby, setCheckby] = useState("")
    const [reviewby, setReviewby] = useState("")
    const [process, setProcess] = useState("")


    const navigate = useNavigate()

    const { LoginId, setLoginId, LoginName } = useLoginName()

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("loginId"))

        console.log("id", id)

        setLoginId(id)

        // axios.post("/api/check-smp", {
        //     page: "chkrewsmp"
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         setSmp(res.data.smp)
        //     })
        //     .catch(err => {
        //         console.log("Error:", err)
        //     })
        axios.get("/api/get-smpdata")
            .then(res => {
                console.log(res.data)
                setSmp(res.data.smp)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [asmp])

    // useEffect(() => {
    //     axios.post("/api/get-steps", {
    //         bill_no: billNo
    //     })
    //         .then(res => {
    //             console.log(res.data)
    //             setSteps(res.data.steps)
    //         })
    //         .catch(err => {
    //             console.log("Error:", err)
    //         })
    // }, [product])

    useEffect(() => {
        axios.post("/api/check-materials", {
            asmp
        })
            .then(res => {
                console.log(res.data)
                setMaterials(res.data.materials)
                setCheckby(res.data.checkby)
                setReviewby(res.data.reviewby)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [asmp])

    // useEffect(() => {
    //     setQtys(materials.map(m => ({
    //         icode: m.icode,
    //         quantity_used: ""
    //     })));
    // }, [materials]);

    const addSmp = async () => {
        try {

            const newQtys = qtys.filter(q => q.quantity_used != "")

            const res = await axios.post("/api/add-smp", {
                pcomp,
                smp: selectedStepObj.smp,
                sdate,
                edate,
                operator,
                createdby: LoginId,
                newQtys
            })

            if (res.data.success) {
                alert("Saved successfuly")
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleDelete = async (m, qty) => {
        try {

            const newMaterials = materials.filter(mat => mat.icode != m.icode)

            setMaterials(newMaterials)

            console.log("qty", qty)

            // const res = await axios.post("/api/delete-material", {
            //     // pcomp,
            //     // smp: selectedStepObj.smp,
            //     // sdate,
            //     // edate,
            //     // operator,
            //     // createdby: LoginId,
            //     // newQtys
            //     mat: m
            // })

            // if (res.data.success) {
            //     alert("Saved successfuly")
            // }

        } catch (error) {
            console.log("Error:", error)
        }
    }

    const chkBy = async () => {
        try {
            const res = await axios.post("/api/update-checkby", {
                LoginId,
                asmp
            })

            if (res.data.success) {
                setCdate(res.data.cdate)
                setCheckby(res.data.checkby)
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }
    const rewBy = async () => {
        try {
            const res = await axios.post("/api/update-reviewby", {
                LoginId,
                asmp
            })

            if (res.data.success) {
                setRdate(res.data.rdate)
                setReviewby(res.data.reviewby)
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }



    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">
                    <BackButton />

                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        {/* Standard Manufacturing Procedure */}
                        Production Status
                    </h2>




                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {smp.map((item, index) => (
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
                                        Step {item.mstep}
                                    </span>
                                </div>

                                {/* Info Grid */}
                                <div className=" gap-3 text-sm text-gray-600">
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <p className="text-sm text-gray-400">Start Date</p>
                                        {/* <p className="font-medium">{new Date(item.startd).toISOString().slice(0, 16)}</p> */}
                                        <p className="font-medium">{new Date(item.startd).toLocaleString('en-US', { hour12: true })}</p>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <p className="text-sm text-gray-400">Operator</p>
                                        <p className="font-medium">{item.operator}</p>
                                    </div>
                                </div>

                                {/* Procedure */}
                                <div className="mt-4 pt-3 border-t text-sm text-gray-500 line-clamp-2">
                                    {item.procedure}
                                </div>
                            </div>
                        ))}
                    </div>








                    {/* Desktop Table */}
                    {/* <div className="hidden md:block">
                        <div className="hidden md:block overflow-x-auto border rounded-lg mt-6">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-200 text-sm">
                                    <tr>
                                        <th className="border p-2 w-40">Material Name</th>
                                        <th className="border p-2 w-10">Quantity Used</th>
                                        <th className="border p-2 w-10">Unit</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        materials.map((m, idx) => (
                                            <tr>
                                                <td className='border p-2'>{m.item}</td>
                                                <td className='border p-2'>
                                                    <input type="number" className='w-full' value={qtys[idx]?.quantity_used} onChange={(e) => {
                                                        const updated = [...qtys];
                                                        updated[idx] = {
                                                            ...updated[idx],
                                                            quantity_used: e.target.value
                                                        };
                                                        console.log("upd", updated)
                                                        setQtys(updated);
                                                    }} />
                                                </td>
                                                <td className='border p-2'>{m.qty}</td>
                                                <td className='border p-2'>{m.unit}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-2'>
                            <button className='ml-2 cursor-pointer bg-blue-500 text-white rounded p-1 px-2' >Check By</button>
                            <button className='ml-2 cursor-pointer bg-blue-500 text-white rounded p-1 px-2' >Review By</button>
                        </div>
                    </div> */}

                    {/* Mobile Card View */}
                    <div className='md:hidden'>
                        {
                            materials.map((m, idx) => (
                                <div className="md:hidden space-y-4 mt-6">
                                    <div className="border rounded-lg p-3 shadow-sm bg-white">
                                        <div className="flex justify-between">
                                            <span className="font-semibold mr-4">Material</span>
                                            <span>{m.item}</span>
                                        </div>

                                        <div className="flex justify-between mt-2">
                                            <span className="font-semibold mr-4">Quantity</span>
                                            {/* <span><input type="number" className='w-full' value={qtys[idx]?.quantity_used} onChange={(e) => {
                                                const updated = [...qtys];
                                                updated[idx] = {
                                                    ...updated[idx],
                                                    quantity_used: e.target.value
                                                };
                                                console.log("upd", updated)
                                                setQtys(updated);
                                            }} /></span> */}
                                            <span>{m.qty}</span>
                                        </div>

                                        <div className="flex justify-between mt-2">
                                            <span className="font-semibold">Unit</span>
                                            <span>{m.unit}</span>
                                        </div>
                                        <button className='mt-2 text-base font-semibold' onClick={() => handleDelete(m, qtys[idx])}>Delete</button>
                                    </div>
                                </div>
                            ))
                        }

                        {/* {
                            cdate && <div className='mt-2'>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <p><span className='font-semibold'>Check By:</span> {checkby}</p>
                                        <p className='mt-1'><span className='font-semibold '>Date:</span> {new Date(cdate).toLocaleString('en-US', { hour12: true })}</p>

                                    </div>
                                </div>
                            </div>
                        }
                        {
                             rdate && <div className='mt-4'>
                                <div className='flex flex-col gap-4'>
                                    
                                    <div>
                                        <p><span className='font-semibold'>Review By:</span>  {reviewby}</p>
                                        <p className='mt-1'><span className='font-semibold '>Date:</span> {new Date(rdate).toLocaleString('en-US', { hour12: true })}</p>
                                    </div>

                                </div>
                            </div>
                        } */}

                        {/* <div className='mt-2 text-xl'>
                            <button className='ml-2 cursor-pointer bg-blue-500 text-white rounded p-1 px-2' onClick={chkBy}>Check By</button>
                            <button className='ml-2 cursor-pointer bg-blue-500 text-white rounded p-1 px-2' onClick={rewBy}>Review By</button>
                        </div> */}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard