import React, { useEffect, useState } from 'react'
import useLoginName from '../context/LoginContext'

const LineClearance = () => {
    const [date, setDate] = useState()
    const { LoginName, LoginId } = useLoginName()

    const [empName, setEmpName] = useState(LoginName)

    useEffect(() => {
        axios.get("/api/line-clearance")
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log("Error:", err)
        })
    }, [])
    
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">

                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                        Line Clearance
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {/* Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                // onChange={handleChange}
                                className="input"
                            />
                        </div>

                        {/* Batch No */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Batch No/Product/Order No
                            </label>
                            <select
                                type="text"
                                name="batchNo"
                                placeholder="Enter batch number"
                                // value={selectedBatchNo}
                                // value={formData.batchNo}
                                // onChange={e => {
                                //     setSelectedBatchNo(e.target.value)
                                //     const selectedProduct = products.find(
                                //         (prod) => prod.batch_no === e.target.value
                                //     );

                                //     console.log(e.target.value)

                                //     console.log(selectedProduct)

                                //     if (selectedProduct) {
                                //         setProductName(selectedProduct.product_name);
                                //         setPcomp(selectedProduct.pcomp)
                                //     } else {
                                //         setProductName("");
                                //         setPcomp(null)
                                //     }
                                // }}
                                className="input"
                            >
                                {/* <option value="Select Batch No" selected>Select Batch No</option>
                            {
                                products.map(prod => (
                                    <option value={prod.batch_no}>{prod.batch_no}/ {prod.product_name}/ {prod.pcomp}</option>
                                ))
                            } */}
                            </select>
                        </div>

                        {/* Product Name */}
                        {/* <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            className="input"
                        />
                    </div> */}

                        {/* Stage */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Process Stage
                            </label>
                            <select
                                type="text"
                                name="stage"
                                placeholder="Enter stage"
                                // value={selectedTstage}
                                // onChange={e => {
                                //     setSelectedTstage(e.target.value)

                                //     const selectedTstageProd = qcTestRows.find(
                                //         (prod) => prod.qcTest == e.target.value
                                //     );

                                //     if (selectedTstageProd) {
                                //         setTstageDesc(selectedTstageProd.qcTestDesc);
                                //     } else {
                                //         setTstageDesc("");
                                //     }
                                // }}
                                className="input"
                            >
                                {/* <option value="">Select Process</option>
                            {
                                qcTestRows.map(row => (
                                    <option value={row.qcTest}>{row.qcTestDesc}</option>
                                ))
                            } */}
                            </select>
                        </div>
                        {/* <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Process
                        </label>
                        <input
                            type="text"
                            name="stage"
                            placeholder="Enter stage"
                            value={tstageDesc}
                            onChange={e => setTstageDesc(e.target.value)}
                            className="input"
                        />
                    </div> */}

                        {/* Department */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                DEPT
                            </label>
                            <select
                                type="text"
                                name="dept"
                                placeholder="Enter department"
                                // value={selectedDept}
                                // onChange={e => {
                                //     setSelectedDept(e.target.value)

                                //     const Dept = dept.find(d => d.dept == e.target.value)

                                //     if (Dept) {
                                //         setDeptName(Dept.dept_name)
                                //     } else {
                                //         setDeptName("")
                                //     }
                                // }}
                                className="input"
                            >
                                {/* <option value="">Select Dept</option>
                            {
                                dept.map(d => (
                                    <option value={d.dept}>{d.dept_name}</option>
                                ))
                            } */}
                            </select>
                        </div>
                        {/* <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            DEPT_NAME
                        </label>
                        <input
                            type="text"
                            name="deptName"
                            placeholder="Enter department"
                            value={deptName}
                            onChange={e => setDeptName(e.target.value)}
                            className="input"
                        />
                    </div> */}

                        {/* Employee */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                ENAME
                            </label>
                            <input
                                type="text"
                                name="employeeName"
                                placeholder="Enter employee name"
                                value={empName}
                                // onChange={handleChange}
                                className="input"
                            />
                        </div>

                        {/* Remarks (Full width) */}
                        <div className="flex flex-col lg:col-span-3">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                REMARKS
                            </label>
                            <textarea
                                name="remarks"
                                rows="4"
                                placeholder="Enter remarks"
                                // value={formData.remarks}
                                // onChange={handleChange}
                                className="input"
                            />
                        </div>


                        {/* Line Clearance Check List */}
                        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4">
                                Line Clearance Check List
                            </h2>

                            {/* Header (visible on desktop) */}
                            <div className="hidden md:grid grid-cols-12 gap-2 font-semibold text-gray-600 border-b pb-2 mb-2">
                                <div className="col-span-1">#</div>
                                <div className="col-span-7">Check Points</div>
                                <div className="col-span-4">Observation</div>
                            </div>

                            {/* {checklist.map((item, index) => ( */}
                                <div
                                    // key={item.id}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border-b py-3"
                                >
                                    {/* Number */}
                                    <div className="md:col-span-1 font-semibold text-gray-600">
                                        {/* {item.id} */} id
                                    </div>

                                    {/* Check Point */}
                                    <div className="md:col-span-7 text-gray-700">
                                        {/* {item.text} */} Check Point
                                    </div>

                                    {/* Dropdown */}
                                    <div className="md:col-span-4">
                                        <select
                                            // value={item.observation}
                                            // onChange={(e) => handleChange(index, e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                        >
                                            <option>Complies</option>
                                            <option>Not Complies</option>
                                            <option>Not Applicable</option>
                                        </select>
                                    </div>
                                </div>
                           { /* ))} */}
                        </div>




                        {/* Button */}
                        <div className="lg:col-span-3 flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-10 py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Submit Form
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default LineClearance