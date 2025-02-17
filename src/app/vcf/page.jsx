'use client'
import React, { useState } from 'react'

const page = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        website: "",
        address: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:1000/vcard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${formData.name.replace(/\s+/g, "_")}.vcf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert("Error generating VCard");
        }
    };
  return (
    <div>

<form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" onChange={handleChange} />
                <input type="text" name="website" placeholder="Website" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <button type="submit">Generate VCard</button>
            </form>
    </div>
  )
}

export default page