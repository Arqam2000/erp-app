import axios from 'axios';
import React, { useEffect } from 'react'
import useLoginName from '../context/LoginContext';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckAuthorization = () => {
    const { LoginName, LoginId, setLoginId, setLoginName } = useLoginName()

    const navigate = useNavigate()
    const location = useLocation()

    console.log("state", location.state)

    const hasRun = React.useRef(false);

    let todo, path;

    if (location.state?.label == "Intimation" ) {
        todo = "Add"
        path ="/intimation"
    }
    else if (location.state?.label == "Add Line Clearance" ) {
        todo = "Add"
        path = "/line-clearance"
    } else if (location.state?.label == "Edit/Delete Line Clearance" ) {
        todo = "Edit/Delete"
        path = "/edit-line-clearance"
    } else if (location.state?.label == "Add SMP" ) {
        todo = "Add"
        path = "/add-smp"
    } else {
        todo = "Edit/Delete"
        path = "/edit-smp"
    }

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const storedLoginName = localStorage.getItem("loginName");
        const storedLoginId = JSON.parse(localStorage.getItem("loginId"));

        setLoginName(storedLoginName);
        setLoginId(storedLoginId);

        axios.post("/api/check-authorization", {
            loginId: storedLoginId,
            todo: todo,
            MSCODE: location.state?.mscode
        })
            .then(res => {
                console.log("resp", res.data.addId) 

                if (res.data.addId !== 'T') {
                    alert("You are not authorized. Contact administrator")
                    navigate("/home")
                } else {
                    navigate(path)
                    // if (location.state?.label == "Add Line Clearance") {
                    //     navigate("/line-clearance")
                    // } else if (location.state?.label == "Edit/Delete Line Clearance") {
                    //     navigate("/edit-line-clearance")
                    // } else if (location.state?.label == "Add SMP") {
                    //     navigate("/add-smp")
                    // } else {
                    //     navigate("/edit-smp")
                    // }
                }
            })
    }, [navigate])


    return (
        <div>

        </div>
    )
}

export default CheckAuthorization