import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLoginName from '../context/LoginContext';
import Navbar from '../components/Navbar';

const Intimation = () => {
    const [intimation, setIntimation] = useState([])
    const [formData, setFormData] = useState({
        idate: "",
        batchNo: "",
        productName: "",
        stage: "",
        deptName: "",
        employeeName: "",
        remarks: ""
    });
    const [products, setProducts] = useState([])
    const [qcTestRows, setQcTestRows] = useState([])
    const [dept, setDept] = useState([])
    const [selectedBatchNo, setSelectedBatchNo] = useState([])
    const [productName, setProductName] = useState("")
    const [selectedTstage, setSelectedTstage] = useState([])
    const [tstageDesc, setTstageDesc] = useState([])
    const [selectedDept, setSelectedDept] = useState([])
    const [deptName, setDeptName] = useState([])
    const [pcomp, setPcomp] = useState(null)

    const { LoginName, LoginId } = useLoginName()

    const [empName, setEmpName] = useState(LoginName)


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            pcomp,
            tstage: selectedTstage,
            dept: selectedDept,
            cby: LoginId,
            remarks: formData.remarks
        }

        console.log(submitData);

        try {
            const res = await axios.post("/api/save-data", { ...submitData })

            if (res.data.success) {
                alert("Saved successfuly")
                setSelectedBatchNo("")
                setSelectedTstage("")
                setSelectedDept("")
                setFormData({ ...formData, remarks: "" })
            }
        } catch (error) {
            console.log("Error:", error)
            alert("Cannot save")
        }


    };

    useEffect(() => {
        // axios.get("/api/get-intimation")
        //     .then(res => {
        //         console.log(res.data)
        //         setIntimation(res.data.intimation)
        //     })
        axios.get("/api/get-data")
            .then(res => {
                console.log(res.data)
                setProducts(res.data.newProdRows)
                setQcTestRows(res.data.qc_test_rows)
                setDept(res.data.dept_rows)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [])

    const sendToWhatsapp = async (e) => {
        // const message = `
        // intimation
        // ----------------
        // ${intimation.map((item, index) => `${index + 1}. ${item}`).join("\n")}
        // `
        // const encodedMessage = encodeURIComponent(message);

        // window.open(`https://wa.me/+923002120067?text=${encodedMessage}`, "_blank");

        e.preventDefault();

        const submitData = {
            pcomp,
            tstage: selectedTstage,
            dept: selectedDept,
            cby: LoginId,
            remarks: formData.remarks
        }

        try {
            const response = await axios.post("/api/send-message", { ...submitData })

            if (response.data.success) {

                const encodedMessage = encodeURIComponent(response.data.intimationMessage);

                window.open(`https://wa.me/+923002120067?text=${encodedMessage}`, "_blank"); 

                alert("Message sent successfully")

                setSelectedBatchNo("")
                setSelectedTstage("")
                setSelectedDept("")
                setFormData({ ...formData, remarks: "" })
            }
        } catch (error) {
            alert("Cannot send message")
        }


    }

    return (
        // <div>
        //     Intimation
        //     <ul>
        //         {
        //             intimation?.map(int => (
        //                 <li>{int}</li>
        //             ))
        //         }
        //     </ul>

        //     <button onClick={sendToWhatsapp} className='py-1 px-3 bg-blue-500 text-white rounded'>Send to whatsapp</button>
        // </div>
        <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">

                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Send Process Intimation
                </h2>

                <form onSubmit={sendToWhatsapp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Intimation Date
                        </label>
                        <input
                            type="date"
                            name="idate"
                            value={formData.idate}
                            onChange={handleChange}
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
                            value={selectedBatchNo}
                            // value={formData.batchNo}
                            onChange={e => {
                                setSelectedBatchNo(e.target.value)
                                const selectedProduct = products.find(
                                    (prod) => prod.batch_no === e.target.value
                                );

                                console.log(e.target.value)

                                console.log(selectedProduct)

                                if (selectedProduct) {
                                    setProductName(selectedProduct.product_name);
                                    setPcomp(selectedProduct.pcomp)
                                } else {
                                    setProductName("");
                                    setPcomp(null)
                                }
                            }}
                            className="input"
                        >
                            <option value="Select Batch No" selected>Select Batch No</option>
                            {
                                products.map(prod => (
                                    <option value={prod.batch_no}>{prod.batch_no}/ {prod.product_name}/ {prod.pcomp}</option>
                                ))
                            }
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
                            value={selectedTstage}
                            onChange={e => {
                                setSelectedTstage(e.target.value)

                                const selectedTstageProd = qcTestRows.find(
                                    (prod) => prod.qcTest == e.target.value
                                );

                                if (selectedTstageProd) {
                                    setTstageDesc(selectedTstageProd.qcTestDesc);
                                } else {
                                    setTstageDesc("");
                                }
                            }}
                            className="input"
                        >
                            <option value="">Select Process</option>
                            {
                                qcTestRows.map(row => (
                                    <option value={row.qcTest}>{row.qcTestDesc}</option>
                                ))
                            }
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
                            value={selectedDept}
                            onChange={e => {
                                setSelectedDept(e.target.value)

                                const Dept = dept.find(d => d.dept == e.target.value)

                                if (Dept) {
                                    setDeptName(Dept.dept_name)
                                } else {
                                    setDeptName("")
                                }
                            }}
                            className="input"
                        >
                            <option value="">Select Dept</option>
                            {
                                dept.map(d => (
                                    <option value={d.dept}>{d.dept_name}</option>
                                ))
                            }
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
                            onChange={handleChange}
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
                            value={formData.remarks}
                            onChange={handleChange}
                            className="input"
                        />
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

export default Intimation