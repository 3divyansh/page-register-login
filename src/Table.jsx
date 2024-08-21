import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Table = () => {

    const [store, setStore] = useState();
    const [refresh, setRefresh] = useState(false);
    const [edit, editHandle] = useState(false)
    const [Index, setIndex] = useState()


    const Remove = (e) => {
        axios.delete("http://localhost:5000/testing" + e).then((res) => {
            console.log("done");
            setRefresh(!refresh)
        }).catch((err) => {
            console.log(err);
        })
    }

    


    useEffect(() => {
        axios.get("http://localhost:5000/testing").then((res) => {
            setStore(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refresh]);




    return (
        <>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store && store.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{edit && Index === index ? <input defaultValue={item.name} /> : item.name}</td>
                                    <td>{edit && Index === index ? <input defaultValue={item.email} /> : item.email}</td>

                                   
                                    <td>
                                        <span className="material-symbols-outlined text-info " style={{ cursor: "pointer", margin: "10px"}} onClick={() => { setIndex(index); editHandle(!edit) }}>edit</span>
                                        <span className="material-symbols-outlined text-danger " style={{ cursor: "pointer" }} onClick={() => Remove(item.id)}>delete</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table