import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";

function Landing(){
    const[data,setData]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/landing/")
            .then(res=>res.data)
            .then(d=>setData(d))
            .catch(e=>console.log(e));

    },[])
    return(
        <div>
            <h1>Pathsy</h1>
            {
                <table>
                    <thead>
                        <tr>
                            <th>Tour Type</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Availability</th>
                            <th>Group Type</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={7}>No tours available.</td>
                            </tr>
                        ) : (
                            data.map((obj, index)=>{
                                return(
                                    <tr key={obj.id ?? index}>
                                        <td>{obj.tourtype}</td>
                                        <td>{obj.price}</td>
                                        <td>{obj.description}</td>
                                        <td>{obj.duration}</td>
                                        <td>{obj.availability}</td>
                                        <td>{obj.grouptype}</td>
                                        <td>
                                            {obj.imageurl ? (
                                                <img src={obj.imageurl} alt={obj.tourtype || 'tour image'} style={{maxWidth: '150px', height: 'auto'}} />
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )
                    }
                    </tbody>
                </table>
            }
        </div>
    )
}
export default Landing;