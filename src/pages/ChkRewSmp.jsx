import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import axios from 'axios'
import useLoginName from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const ChkRewSmp = () => {
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


    const navigate = useNavigate()

    const { LoginId, setLoginId, LoginName } = useLoginName()

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("loginId"))

        console.log("id", id)

        setLoginId(id)

        axios.post("/api/check-smp", {
            page: "chkrewsmp"
        })
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
                        Standard Manufacturing Procedure
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" enctype="multipart/form-data">
                        {/* Asmp */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Batch No</label>
                            <select
                                type="text"
                                name="Asmp"
                                // placeholder="line clearance number"
                                value={asmp}
                                className="input"
                                onChange={e => {
                                    setAsmp(e.target.value)
                                    console.log(e.target.value)
                                    const pre = smp.find(item => item.asmp == e.target.value)

                                    if (pre) {
                                        setBatchNo(pre.batch_no)
                                        setBatchSize(pre.batch_size)
                                        setProduct(pre.product_name)
                                        setOperator(pre.operator)
                                        setStepNo(pre.mstep)
                                        setSdate(pre.startd)
                                        setEdate(pre.edate)
                                        setProcedure(pre.pmaking)
                                        setCheckby(pre.checkby)
                                        setReviewby(pre.reviewby)
                                        setCdate(pre.cdate)
                                        setRdate(pre.rdate)
                                        // setBillNo(pre.bill_no)
                                        // setPcomp(pre.pcomp)

                                    } else {
                                        setBatchNo()
                                        setBatchSize()
                                        setProduct()
                                        setOperator()
                                        setStepNo()
                                        setSdate()
                                        setEdate()
                                        setProcedure()
                                        setCheckby()
                                        setReviewby()
                                        setCdate()
                                        setRdate()
                                        // setBillNo()
                                        // setPcomp()
                                    }
                                }}
                            >
                                <option value="Select Product" selected>Select Batch No</option>
                                {
                                    smp.map(prod => (
                                        <option value={prod.asmp}> {prod.asmp} / {prod.product_name} / {prod.batch_no}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Product */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Product</label>
                            <input
                                type="text"
                                name="Product"
                                // placeholder="line clearance number"
                                value={product}
                                className="input"
                                onChange={e => {
                                    // setProduct(e.target.value)
                                    // console.log(e.target.value)
                                    // const pre = smp.find(item => item.product_name == e.target.value)

                                    // if (pre) {
                                    //     setBatchNo(pre.batch_no)
                                    //     setBatchSize(pre.batch_size)
                                    //     setBillNo(pre.bill_no)
                                    //     setPcomp(pre.pcomp)

                                    // } else {
                                    //     setBatchNo()
                                    //     setBatchSize()
                                    //     setBillNo()
                                    //     setPcomp()
                                    // }
                                }}
                            />
                            {/* <option value="Select Product" selected>Select Product</option>
                                {
                                    smp.map(prod => (
                                        <option value={prod.product_name}>{prod.product_name}</option>
                                    ))
                                }
                            </select> */}
                        </div>

                        {/* Batch # */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Batch #
                            </label>
                            <input
                                type="text"
                                name="Batch #"
                                value={batchNo}
                                // onChange={handleChange}
                                className="input"
                                readOnly
                            />
                        </div>

                        {/* Batch Size */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Batch Size
                            </label>
                            <input
                                type="text"
                                name="Batch Size"
                                value={batchSize}
                                // onChange={handleChange}
                                className="input"
                                readOnly
                            />
                        </div>

                        {/* Procedure Step # */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Step #
                            </label>
                            <input
                                type="text"
                                name="Step #"
                                value={stepNo}
                                onChange={(e) => {
                                    // setStepNo(e.target.value)

                                    // const foundedStep = steps.find(s => s.mstep == e.target.value)

                                    // console.log("foundedStep", foundedStep)

                                    // if (foundedStep) {
                                    //     setSelectedStepObj(foundedStep)
                                    // } else {
                                    //     setSelectedStepObj({})
                                    // }
                                }}
                                className="input"
                                readOnly
                            />
                            {/* <option value="">Select step #</option>
                                {
                                    steps.map(prod => (
                                        <option value={prod.mstep}>{prod.mstep} / {prod.pmaking}</option>
                                    ))
                                }

                            </select> */}
                        </div>

                        {/* Procedure */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Procedure
                            </label>
                            <input
                                type="text"
                                name="Procedure"
                                value={procedure}
                                // onChange={(e) => setSdate(e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* SDate */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Start Date
                            </label>
                            <input
                                type="datetime-local"
                                name="Sdate"
                                value={sdate ? new Date(sdate).toISOString().slice(0, 16) : ""}
                                onChange={(e) => setSdate(e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* EDate */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                End Date
                            </label>
                            <input
                                type="datetime-local"
                                name="Edate"
                                value={edate ? new Date(edate).toISOString().slice(0, 16) : ""}
                                onChange={(e) => setEdate(e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* Operator */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Operator
                            </label>
                            <input
                                type="text"
                                name="Operator"
                                value={operator}
                                onChange={(e) => setOperator(e.target.value)}
                                className="input"
                            />
                        </div>
                    </form>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
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
                                                {/* <td className='border p-2'>
                                                    <input type="number" className='w-full' value={qtys[idx]?.quantity_used} onChange={(e) => {
                                                        const updated = [...qtys];
                                                        updated[idx] = {
                                                            ...updated[idx],
                                                            quantity_used: e.target.value
                                                        };
                                                        console.log("upd", updated)
                                                        setQtys(updated);
                                                    }} />
                                                </td> */}
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
                    </div>

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
                        {
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
                        }
                        <div className='mt-2 text-xl'>
                            <button className='ml-2 cursor-pointer bg-blue-500 text-white rounded p-1 px-2' onClick={chkBy}>Check By</button>
                            <button className='ml-2 cursor-pointer bg-blue-500 text-white rounded p-1 px-2' onClick={rewBy}>Review By</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ChkRewSmp