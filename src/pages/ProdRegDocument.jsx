import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ProdRegDocument = () => {
    const [refDocs, setRefDocs] = useState([
        {
            sn: 1,
            title: "Title",
            fname: "Fname"
        }
    ])
    const [preg, setPreg] = useState([])
    const [pregNo, setPregNo] = useState()
    const [refNo, setRefNo] = useState()
    const [product, setProduct] = useState("")
    const [file, setFile] = useState()
    const [rows, setRows] = useState([
        { id: 1, title: "", file: null, path: "", loading: false, date: "" }
    ]);
    const [filePath, setFilePath] = useState("")
    const navigate = useNavigate()

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [idx, setIdx] = useState()
    const [rdoc, setRdoc] = useState([])
    const [regis, setRegis] = useState()
    const [rgdate, setRgdate] = useState()

    const handleButtonClick = (i) => {
        // fileInputRef.current.click();
        setIdx(i)
    };

    const handleFileChange = async (index, file) => {
        if (!file) return;
        const updated = [...rows];
        updated[index].file = file;
        updated[index].loading = true;
        setRows(updated);
        // setFile(file)
        console.log("updated", updated)

        // setFileName(file.name);
        // setLoading(true);

        try {
            const formData = new FormData();
            formData.append("uploaded_file", file);
            formData.append("index", index); // optional if needed

            const res = await axios.post("/api/file-upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // backend should return fileUrl
            // onUploadSuccess(index, res.data.path);
            alert("File uploaded successfuly")
            updated[index].path = res.data.path || ""
            // setFilePath(res.data.path || "")

        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            // setLoading(false);
            updated[index].loading = false
            setRows([...updated])
        }
    };

    useEffect(() => {
        axios.get("/api/get-preg")
            .then(res => {
                console.log(res.data)
                setPreg(res.data.preg)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [])

    useEffect(() => {
        setRows([
            { id: 1, title: "", file: null, path: "", loading: false, date: "", isNew: false }
        ])
        axios.post("/api/get-rdoc", {
            preg: pregNo
        })
            .then(res => {
                console.log(res.data)
                setRdoc(res.data.rdoc)
                setRows((res.data.rdoc || [
                    { id: 1, title: "", file: null, path: "", loading: false, date: "" }
                ]).map(item => ({
                    ...item,
                    isNew: false   // ✅ existing rows
                })))
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [refNo])

    const handleSave = async (e) => {
        try {
            e.preventDefault()

            console.log("rows", rows)

            // const formData = new FormData();
            // formData.append("uploaded_file", file);

            const newRows = rows.filter(row => row.isNew).filter(row => row.title);

            console.log("New Rows Only:", newRows);

            if (newRows.length === 0) {
                alert("No new rows to save or title is required");
                return;
            }

            const res = await axios.post("/api/add-preg", {
                data: newRows,
                pregNo
            })

            if (res.data.success) {
                // console.log(res.data)
                // setFilePath(res.data.path || "")
                alert("Saved successfuly")

                const updated = rows.map(row => ({
                    ...row,
                    isNew: false
                }));

                setRows(updated);
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleEdit = async (row) => {
        try {
            console.log("row", row)

            const res = await axios.post("/api/edit-preg", {
                row,
                pregNo
            })

            if (res.data.success) {
                alert("Edit successful")
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }
    
    const handleDelete = async (row) => {
        try {


            console.log("row", row)

            // const formData = new FormData();
            // formData.append("uploaded_file", file);



            // console.log("new rows", )

            const res = await axios.post("/api/delete-preg", {
                row,
                pregNo
            })

            if (res.data.success) {
                const newRows = rows.filter(r => (r.id || r.sn) != (row.id || row.sn))

                setRows(newRows)
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleCancel = () => {
        setRows([
            { id: 1, title: "", file: null, path: "", loading: false, date: "" },
        ])

        setRefNo()
        setProduct("")
        setPregNo()
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">
                    <BackButton />

                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Product Registration Document
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" enctype="multipart/form-data">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Reference #</label>
                            <select
                                type="text"
                                name="Ref No"
                                // placeholder="line clearance number"
                                value={refNo}
                                className="input"
                                onChange={e => {
                                    setRefNo(e.target.value)
                                    console.log(e.target.value)
                                    const pre = preg.find(item => item.regn == e.target.value)

                                    if (pre) {
                                        setProduct(pre.product)
                                        setPregNo(pre.preg)
                                        setRegis(pre.regis)
                                        setRgdate(pre.rgdate)
                                    } else {
                                        setProduct("")
                                    }
                                }}
                            >
                                <option value="Select Reference #" selected>Select Reference #</option>
                                {
                                    preg.map(prod => (
                                        <option value={prod.regn}>{prod.regn}/ {prod.product}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Product
                            </label>
                            <input
                                type="text"
                                name="Product"
                                value={product}
                                // onChange={handleChange}
                                className="input"
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Regis
                            </label>
                            <input
                                type="text"
                                name="Regis"
                                value={regis}
                                // onChange={handleChange}
                                className="input"
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">
                                Rg Date
                            </label>
                            <input
                                type="text"
                                name="rgdate"
                                value={rgdate?.split("T")[0]}
                                // onChange={handleChange}
                                className="input"
                                readOnly
                            />
                        </div>
                    </form>

                    <div className="p-4">
                        <h2 className="font-bold text-red-600 mb-3">Reference Documents</h2>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto border">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-200 text-sm">
                                    <tr>
                                        {/* <th className="border p-2">S.No</th> */}
                                        <th className="border p-2 w-24">Title</th>
                                        <th className="border p-2">Date</th>
                                        <th className="border p-2">Browse File </th>
                                        <th className="border p-2">File Name</th>
                                        <th className="border p-2">Document</th>
                                    </tr>
                                </thead>

                                <tbody>                                                                        
                                    {rows.map((row, index) => (
                                        <tr key={row.id || row.sn}>
                                            {/* <td className="border p-2 text-center">
                                                {row.id ? row.id : row.sn}

                                            </td> */}
                                            {/* title */}
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={row.title}
                                                    className="w-50 border px-2 py-1 text-xs"
                                                    onChange={e => {
                                                        const updated = [...rows]
                                                        updated[index].title = e.target.value
                                                        setRows(updated)
                                                    }}
                                                    required
                                                />
                                            </td>
                                            {/* date */}
                                            <td className="border p-2">
                                                <input
                                                    type="date"
                                                    value={row.date?.split("T")[0]}
                                                    className="w-28 border px-2 py-1 text-xs"
                                                    onChange={e => {
                                                        const updated = [...rows]
                                                        updated[index].date = e.target.value
                                                        setRows(updated)
                                                    }}
                                                />
                                            </td>

                                            {/* File + Preview */}
                                            <td className="border p-2">
                                                <div className="flex flex-col gap-1">
                                                    {/* <input
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(index, e.target.files[0])
                                                        }
                                                        name='uploaded_file'
                                                        className='text-xs'
                                                    /> */}

                                                    <input
                                                        type="file"
                                                        id={`file-${index}`}
                                                        // ref={fileInputRef}
                                                        onChange={e => handleFileChange(index, e.target.files[0])}
                                                        className="hidden"
                                                        name="uploaded_file"
                                                    />

                                                    {/* Custom Button */}
                                                    <label
                                                        htmlFor={`file-${index}`}
                                                        // onClick={() => handleButtonClick(index)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs text-center px-3 py-1 rounded"
                                                    >
                                                        {row.loading ? "Uploading..." : "Upload"}
                                                    </label>
                                                </div>
                                            </td>

                                            {/* File name preview */}
                                            <td className='border p-2'>
                                                {(row.file || row.fname) && (
                                                    <span className="text-xs  truncate">
                                                        {row.file?.name || row.fname}
                                                    </span>
                                                )}
                                            </td>
                                            {/* display button */}
                                            <td className="border p-2 text-center">
                                                {row.path || row.fname ? (
                                                    <Link
                                                        to={`http://localhost:3000${row.path || row.fname}`}
                                                        className="bg-gray-300 px-3 py-1 text-xs"
                                                        target="_blank"
                                                    >
                                                        Display
                                                    </Link>
                                                ) : (
                                                    <span className="bg-gray-200 px-3 py-1 text-gray-500 text-xs cursor-not-allowed">
                                                        Display
                                                    </span>
                                                )}
                                            </td>
                                            {/* edit button */}
                                            <td className='border p-2 cursor-pointer'>
                                                <button className='cursor-pointer text-xs' onClick={() => handleEdit(row)}>Save Edit</button>
                                            </td>
                                            {/* delete button */}
                                            <td className='border p-2 cursor-pointer'>
                                                <button className='cursor-pointer text-xs' onClick={() => handleDelete(row)}>Delete</button>
                                            </td>                                           
                                            {/* <td className="border p-2 text-center">
                                                <button className="bg-gray-300 px-3 py-1" onClick={handleSubmit}>
                                                    Upload
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-2'>
                            <button onClick={() => setRows([...rows, { id: rows.length + 1, title: "", file: null, path: "", loading: false, isNew: true }])}>Add</button>
                            <button className='ml-2 cursor-pointer' onClick={handleSave}>Save</button>
                            <button className='ml-2 cursor-pointer' onClick={handleCancel}>Cancel</button>

                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                            {rows.map((row, index) => (
                                <div key={row.id} className="border p-3 rounded shadow-sm">
                                    <p className="text-sm font-semibold">S.No: {row.id ? row.id : ""}</p>

                                    <p className="text-sm mt-1">Title:</p>
                                    <input
                                        type="text"
                                        value={row.title}
                                        className="w-full border px-2 py-1 text-sm"
                                        readOnly
                                    />

                                    <p className="text-sm mt-2">File:</p>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(index, e.target.files[0])
                                        }
                                        className="text-sm"
                                    />

                                    {/* File preview */}
                                    {(row.file || row.fname) && (
                                        <p className="text-xs text-gray-600 mt-1 break-all">
                                            {row.file?.name || row.fname}
                                        </p>
                                    )}

                                    <button className="mt-3 bg-gray-300 px-3 py-1 w-full" >
                                        Display
                                    </button>
                                    <button className='py-1 px-2 text-lg cursor-pointer' type='submit' >Upload</button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProdRegDocument