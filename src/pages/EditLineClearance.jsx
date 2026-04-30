import React, { useEffect, useState } from 'react'
import useLoginName from '../context/LoginContext'
import axios from 'axios'
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const EditLineClearance = () => {
    const getLocalDateTime = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        return new Date(now - offset * 60000)
            .toISOString()
            .slice(0, 16);
    };
    // const [date, setDate] = useState(new Date().toISOString().slice(0, 16))
    const [date, setDate] = useState(getLocalDateTime())
    const [selectedIntimationNo, setSelectedIntimationNo] = useState(null)
    const [products, setProducts] = useState([])
    const [checkListFor, setCheckListFor] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedCheckListNo, setSelectedCheckListNo] = useState(null)
    const [checkList, setCheckList] = useState([])
    const [remarks, setRemarks] = useState("")
    const [au, setAu] = useState("")
    const [responses, setResponses] = useState(
        checkList.map(() => "") // one value per item
    );
    const [lclear, setLclear] = useState()
    // console.log("responses", responses)

    const { LoginName, LoginId, setLoginId, setLoginName } = useLoginName()

    const [empName, setEmpName] = useState(LoginName)
    const [lclearRows, setLclearRows] = useState([])
    const [lclearRow, setLclearRow] = useState(null)
    const [updCheckList, setUpdCheckList] = useState([])

    const [formData, setFormData] = useState({
        ldate: "",
        wcall: "",
        batch_no: "",
        pcomp: "",
        product_name: "",
        tstage_des: "",
        idate: "",
        ename: "",
        remarks: "",
        au: ""
    });

    const navigate = useNavigate();


    useEffect(() => {
        setLoginName(localStorage.getItem("loginName"))
        setLoginId(JSON.parse(localStorage.getItem("loginId")))
        axios.get("/api/line-clearance")
            .then(res => {
                // console.log(res.data)
                setProducts(res.data.newRows)
                setCheckListFor(res.data.rows)


            })
            .catch(err => {
                console.log("Error:", err)
            })
        axios.get("/api/get-lclear")
            .then(res => {
                console.log(res.data)
                setLclearRows(res.data.lclearRows)
                // setCheckListFor(res.data.rows)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [])


    useEffect(() => {
        axios.post("/api/get-checklist", { selectedCheckListNo })
            .then(res => {
                // console.log(res.data)
                setCheckList(res.data.checkList)
            })
    }, [selectedCheckListNo])

    useEffect(() => {
        axios.post("/api/get-obs", { lclear })
            .then(res => {
                console.log(res.data.obs)

                const obsMap = {};
                res.data.obs.forEach(item => {
                    obsMap[item.sn] = {
                        obs: item.obs,
                        lcleard: item.lcleard
                    };
                });

                // Merge into checklist
                const updatedCheckList = checkList.map(item => ({
                    ...item,
                    obs: obsMap[item.sn] === 'Y' ? 'Complies' : 'Not Complies',
                    lcleard: obsMap[item.sn]?.lcleard
                }));

                console.log(updatedCheckList)

                setUpdCheckList(updatedCheckList)
            })
    }, [lclear, checkList])

    const handleEdit = async (e) => {
        try {
            e.preventDefault()

            // let merged = [];

            // if (responses.length === checkList.length) {
            //     merged = checkList.map((item, index) => ({
            //         ...item,
            //         observation: responses[index] == "Complies" ? 'Y' : 'N'
            //     }));
            // } else {
            //     console.error("Length mismatch");
            // }

            const mergedChecklist = updCheckList.map(item => ({
                ...item,
                observation: item.obs === "Complies" ? "Y" : "N"
            }));


            // const submitData = {
            //     ldate: date,
            //     doneby: LoginId,
            //     remarks,
            //     wcall: selectedIntimationNo,
            //     au,
            //     checkList: merged
            // }

            // console.log(submitData)

            const submitData = {
                ...formData,
                lclear,
                doneby: LoginId,
                checkList: mergedChecklist
            };

            console.log("Data", submitData);

            const res = await axios.post("/api/edit-line-clearance", { ...submitData })

            if (res.data.success) {
                // setLclear(res.data.lclear)

                alert(res.data.message)

                navigate(0)

                // setSelectedIntimationNo(null)
                // setSelectedProduct(null)
                // setSelectedCheckListNo(null)
                // setCheckList([])
                // setResponses(checkList.map(() => ""))
            }


        } catch (error) {
            console.log("Error:", error)
            alert(error?.response?.data.message)
        }
    }
    
    const handleDelete = async (e) => {
        try {
            e.preventDefault()

            const confirmDelete = window.confirm("Are you sure you want to delete?");

            if (!confirmDelete) return;

            const mergedChecklist = updCheckList.map(item => ({
                ...item,
                observation: item.obs === "Complies" ? "Y" : "N"
            }));

            const submitData = {
                ...formData,
                lclear,
                doneby: LoginId,
                checkList: mergedChecklist
            };

            console.log("Data", submitData);

            const res = await axios.post("/api/delete-line-clearance", { ...submitData })

            if (res.data.success) {
                // setLclear(res.data.lclear)

                alert(res.data.message)

                navigate(0)

                // setSelectedIntimationNo(null)
                // setSelectedProduct(null)
                // setSelectedCheckListNo(null)
                // setCheckList([])
                // setResponses(checkList.map(() => ""))
            }


        } catch (error) {
            console.log("Error:", error)
            alert(error?.response?.data.message)
        }
    }

    const clearForm = () => {
        setSelectedIntimationNo(null)
        setSelectedProduct(null)
        setSelectedCheckListNo(null)
        setCheckList([])
        setResponses(checkList.map(() => ""))
    }

    const handleChange = (index, value) => {
        const updated = [...updCheckList];
        updated[index].obs = value;
        setUpdCheckList(updated);
        console.log("updated", updated)
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">
                    <BackButton />

                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Edit/Delete Line Clearance
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Line Clearance # */}
                        <div className="flex flex-col">

                            <select
                                type="text"
                                name="lineClearanceNo"
                                // placeholder="line clearance number"
                                value={lclear}
                                className="input"
                                onChange={(e) => {
                                    console.log(e.target.value)

                                    setLclear(e.target.value)

                                    const row = lclearRows.find(row => row.lclear == e.target.value)

                                    if (row) {
                                        setLclearRow(row)
                                        setSelectedCheckListNo(row.au)

                                        setFormData({
                                            ldate: row.ldate || "",
                                            wcall: row.wcall || "",
                                            batch_no: row.batch_no || "",
                                            pcomp: row.pcomp || "",
                                            product_name: row.product_name || "",
                                            tstage_des: row.tstage_des || "",
                                            idate: row.idate ? row.idate.split("T")[0] : "",
                                            ename: row.ename || "",
                                            remarks: row.remarks || "",
                                            au: row.au || ""
                                        });
                                    } else {
                                        setLclearRow(null)
                                    }
                                }}
                            >
                                <option value="Select Line Clearance #" selected>Line Clearance #</option>
                                {
                                    lclearRows.map(lclear => (
                                        <option value={lclear.lclear}>{lclear.lclear}/ {new Date(lclear.ldate).toDateString()}/ {new Date(lclear.idate).toDateString()} / {lclear.ename}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* LDate */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                date
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.ldate ? formData.ldate.slice(0, 16) : ""}
                                onChange={e => { setFormData({ ...formData, ldate: e.target.value }) }}
                                className="input"
                            />
                        </div>

                        {/* Intimation No */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Intimation #
                            </label>
                            <input
                                type="text"
                                name="intimationNo"
                                placeholder="Enter intimation number"
                                value={formData.wcall}
                                // value={formData.batchNo}
                                onChange={e => {
                                    setSelectedIntimationNo(e.target.value)
                                    setFormData({ ...formData, wcall: e.target.value })
                                }}
                                className="input"
                                readOnly
                            />
                            {/* <option value="Select Intimation No">Select Intimation No</option>
                                {
                                    products.map(prod => (
                                        <option value={prod.intimation}>{prod.intimation}</option>
                                    ))
                                }
                            </select> */}
                        </div>

                        {/* Batch No */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Batch No
                            </label>
                            <input
                                type="text"
                                name="batchNo"
                                placeholder="Batch No"
                                // value={lclearRow?.batch_no}
                                value={formData.batch_no}
                                // onChange={e => {
                                //     setSelectedIntimationNo(e.target.value)
                                //     const selectedProduct = products.find(
                                //         (prod) => prod.intimation == e.target.value
                                //     );

                                //     console.log(e.target.value)

                                //     console.log(selectedProduct)

                                //     if (selectedProduct) {
                                //         setSelectedProduct(selectedProduct)
                                //     } else {
                                //         setSelectedProduct(null)
                                //     }
                                // }}
                                onChange={e => {
                                    setFormData({ ...formData, batch_no: e.target.value })
                                }}
                                className="input"
                                readOnly
                            />
                            {/* <option value="Select Intimation No" selected>Select Intimation No</option>
                            {
                                products.map(prod => (
                                    <option value={prod.intimation}>{prod.intimation}</option>
                                ))
                            }
                            </select> */}
                        </div>
                        {/* Order No */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Order No
                            </label>
                            <input
                                type="text"
                                name="orderNo"
                                placeholder="order No"
                                value={formData.pcomp}
                                // value={formData.batchNo}
                                // onChange={e => {
                                //     setSelectedIntimationNo(e.target.value)
                                //     const selectedProduct = products.find(
                                //         (prod) => prod.intimation == e.target.value
                                //     );

                                //     console.log(e.target.value)

                                //     console.log(selectedProduct)

                                //     if (selectedProduct) {
                                //         setSelectedProduct(selectedProduct)
                                //     } else {
                                //         setSelectedProduct(null)
                                //     }
                                // }}
                                onChange={e => { setFormData({ ...formData, pcomp: e.target.value }) }}
                                className="input"
                                readOnly
                            />
                            {/* <option value="Select Intimation No" selected>Select Intimation No</option>
                            {
                                products.map(prod => (
                                    <option value={prod.intimation}>{prod.intimation}</option>
                                ))
                            }
                            </select> */}
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="productName"
                                placeholder="Product Name"
                                value={formData.product_name}
                                // value={formData.batchNo}
                                // 
                                onChange={e => { setFormData({ ...formData, product_name: e.target.value }) }}
                                className="input"
                                readOnly
                            />
                            {/* <option value="Select Intimation No" selected>Select Intimation No</option>
                            {
                                products.map(prod => (
                                    <option value={prod.intimation}>{prod.intimation}</option>
                                ))
                            }
                            </select> */}
                        </div>

                        {/* Stage */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Process Stage
                            </label>
                            <input
                                type="text"
                                name="stage"
                                placeholder="Enter stage"
                                value={formData.tstage_des}
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
                                onChange={e => { setFormData({ ...formData, tstage_des: e.target.value }) }}
                                className="input"
                                readOnly
                            />
                            {/* <option value="">Process Stage</option> */}
                            {/* {
                                qcTestRows.map(row => (
                                    <option value={row.qcTest}>{row.qcTestDesc}</option>
                                ))
                            } */}
                            {/* </select> */}
                        </div>

                        {/* intimation date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Intimation Date
                            </label>
                            <input
                                type="date"
                                name="intimationDate"
                                value={formData.idate ? formData.idate.split("T")[0] : ""}
                                onChange={e => { setFormData({ ...formData, idate: e.target.value }) }}
                                className="input"
                                readOnly
                            />
                        </div>

                        {/* Employee */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Done by
                            </label>
                            <input
                                type="text"
                                name="employeeName"
                                placeholder="Done By"
                                value={formData.ename}
                                onChange={e => { setFormData({ ...formData, ename: e.target.value }) }}
                                className="input"
                                readOnly
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
                                onChange={e => { setFormData({ ...formData, remarks: e.target.value }) }}
                                className="input"
                            />
                        </div>

                        {/* Check List For */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Check List For
                            </label>
                            <input
                                type="text"
                                name="checkListFor"
                                placeholder="Enter checklist for"
                                className="input"
                                value={checkListFor.find(item => item.au == lclearRow?.au)?.ltyped || ""}
                                onChange={e => {
                                    setSelectedCheckListNo(lclearRow?.au)

                                    setAu(checkListFor.find(item => item.au == lclearRow?.au)?.au || null)
                                }}
                                readOnly
                            />
                            {/* <option value="">Check List For</option>
                                {
                                    checkListFor.map(c => (
                                        <option value={c.au}>{c.ltyped}</option>
                                    ))
                                }
                            </select> */}
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

                            {updCheckList.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border-b py-3"
                                >
                                    {/* Number */}
                                    {/* <div className="md:col-span-1 font-semibold text-gray-600">
                                        {item.sn}
                                    </div> */}

                                    {/* Check Point */}
                                    <div className="md:col-span-7 text-gray-700">
                                        {item.aq}
                                    </div>

                                    {/* Dropdown */}
                                    <div className="md:col-span-4">
                                        <select
                                            // value={responses[index]}
                                            value={item.obs}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                        >
                                            <option value="" selected disabled>Select Observation</option>
                                            <option>Complies</option>
                                            <option>Not Complies</option>
                                            {/* <option>Not Applicable</option> */}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Button */}
                        <div className="lg:col-span-3 flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-10 py-3 rounded-xl font-semibold shadow-lg"
                                onClick={handleEdit}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-10 py-3 rounded-xl font-semibold shadow-lg ml-2"
                                onClick={handleDelete}>
                                Delete
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditLineClearance