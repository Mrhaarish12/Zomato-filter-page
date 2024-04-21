import React, { useEffect, useState } from 'react';
import Fooddata from './FoodData';
import "./style.css";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'; // Import Button component

import Cards from './Cards';
import Set from './Set';

const Search = () => {
    const [fdata, setFdata] = useState(Fooddata);
    const [copydata, setCopyData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const chanegData = (e) => {
        let getchangedata = e.toLowerCase();
        if (getchangedata === "") {
            setCopyData(fdata);
        } else {
            let storedata = fdata.filter((ele) => {
                for (let key in ele) {
                    if (ele[key].toString().toLowerCase().includes(getchangedata)) {
                        return true;
                    }
                }
                return false;
            });
            setCopyData(storedata);
        }
    };

    const sortData = (criterion) => {
        let sortedData = [...copydata];
        switch (criterion) {
            case 'rname':
                sortedData.sort((a, b) => a.rname.localeCompare(b.rname));
                break;
            case 'address':
                sortedData.sort((a, b) => a.address.localeCompare(b.address));
                break;
            default:
                break;
        }
        setCopyData(sortedData);
    };

    const zomatologo = "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png";

    const sortingOptions = [
        { label: 'Name', value: 'rname' },
        { label: 'Address', value: 'address' }
    ];

    useEffect(() => {
        setTimeout(() => {
            setCopyData(fdata);
        }, 3000);
    }, []);

    return (
        <>
            <div className="container d-flex justify-content-between align-items-center">
                <img src={zomatologo} style={{ width: "8rem", position: "relative", left: "2%", cursor: "pointer" }} alt="" />
            </div>

            <Form className='d-flex justify-content-center align-items-center mt-3'>
                <Form.Group className="mx-2 col-lg-4" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        onChange={(e) => chanegData(e.target.value)}
                        placeholder="Search Restaurant"
                    />
                </Form.Group>
                <button className='btn text-light col-lg-1' style={{ background: "#ed4c67" }}>Submit</button>

                {/* <Form.Group className="mx-2 col-lg-4" controlId="formBasicDropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort By
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onSelect={() => sortData('rname')} // Call sortData with 'rname' directly for Name sorting
                            >
                                Name
                            </Dropdown.Item>
                            <Dropdown.Item
                                onSelect={() => sortData('address')} // Call sortData with 'address' directly for Address sorting
                            >
                                Address
                            </Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                </Form.Group> */}
                <Form.Group className="mx-2 col-lg-4">
                    <Button variant="success" onClick={() => sortData('rname')}>Sort By Name</Button>
                    <Button variant="success" onClick={() => sortData('address')}>Sort By Address</Button>
                </Form.Group>

            </Form>

            <section className='iteam_section mt-4 container'>
                <h2 className='px-4' style={{ fontWeight: 400 }}>Restaurants</h2>
                <div className="row mt-2 d-flex justify-content-around align-items-center">
                    {copydata && copydata.length ? <Cards data={copydata} /> : <Set sdata={fdata} />}
                </div>
            </section>
        </>
    );
};

export default Search;
