import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import axios from 'axios'
import useLoginName from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const AddSmp = () => {
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

    const navigate = useNavigate()

    const {LoginId, setLoginId} = useLoginName()

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("loginId"))

        console.log("id", id)

        setLoginId(id)

        axios.get("/api/get-smp")
            .then(res => {
                console.log(res.data)
                setSmp(res.data.smp)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [])

    useEffect(() => {
        axios.post("/api/get-steps", {
            bill_no: billNo
        })
            .then(res => {
                console.log(res.data)
                setSteps(res.data.steps)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [product])

    useEffect(() => {
        axios.post("/api/get-materials", {
            step_no: stepNo
        })
            .then(res => {
                console.log(res.data)
                setMaterials(res.data.materials)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [stepNo])

    useEffect(() => {
        setQtys(materials.map(m => ({
            icode: m.icode,
            quantity_used: ""
        })));
    }, [materials]);

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
                        {/* Product */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Product</label>
                            <select
                                type="text"
                                name="Product"
                                // placeholder="line clearance number"
                                value={product}
                                className="input"
                                onChange={e => {
                                    setProduct(e.target.value)
                                    console.log(e.target.value)
                                    const pre = smp.find(item => item.product_name == e.target.value)

                                    if (pre) {
                                        setBatchNo(pre.batch_no)
                                        setBatchSize(pre.batch_size)
                                        setBillNo(pre.bill_no)
                                        setPcomp(pre.pcomp)

                                    } else {
                                        setBatchNo()
                                        setBatchSize()
                                        setBillNo()
                                        setPcomp()
                                    }
                                }}
                            >
                                <option value="Select Product" selected>Select Product</option>
                                {
                                    smp.map(prod => (
                                        <option value={prod.product_name}>{prod.product_name}</option>
                                    ))
                                }
                            </select>
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
                                Procedure Step #
                            </label>
                            <select
                                type="text"
                                name="Step #"
                                value={stepNo}
                                onChange={(e) => {
                                    setStepNo(e.target.value)

                                    const foundedStep = steps.find(s => s.mstep == e.target.value)

                                    console.log("foundedStep", foundedStep)

                                    if (foundedStep) {
                                        setSelectedStepObj(foundedStep)
                                    } else {
                                        setSelectedStepObj({})
                                    }
                                }}
                                className="input"
                                readOnly
                            >
                                <option value="">Select step #</option>
                                {
                                    steps.map(prod => (
                                        <option value={prod.mstep}>{prod.mstep} / {prod.pmaking}</option>
                                    ))
                                }

                            </select>
                        </div>

                        {/* SDate */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Start Date
                            </label>
                            <input
                                type="datetime-local"
                                name="Sdate"
                                value={sdate}
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
                                value={edate}
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
                                                <td className='border p-2'>{m.unit}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-2'>
                            <button className='ml-2 cursor-pointer' onClick={addSmp}>Save</button>
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
                                            <span><input type="number" className='w-full' value={qtys[idx]?.quantity_used} onChange={(e) => {
                                                        const updated = [...qtys];
                                                        updated[idx] = {
                                                            ...updated[idx],
                                                            quantity_used: e.target.value
                                                        };
                                                        console.log("upd", updated)
                                                        setQtys(updated);
                                                    }} /></span>
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
                        <div className='mt-2 text-xl'>
                            <button className='ml-2 cursor-pointer' onClick={addSmp}>Save</button>
                            <button className='ml-2 cursor-pointer' onClick={() => navigate(0)}>Cancel</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AddSmp