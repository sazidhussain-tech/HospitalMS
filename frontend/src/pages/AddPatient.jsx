import API from "../services/api";
import { useState } from "react";

function AddPatient() {

    const [userId, setUserId] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `${API}/patients`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: Number(userId),
                    age: Number(age),
                    gender,
                    phone,
                    address,
                    blood_group: bloodGroup
                })
            }
        );

        const data = await response.json();

        alert(data.message || "Patient Added Successfully");
    };

    return (
        <div>

            <h2>Add Patient</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Blood Group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Add Patient
                </button>

            </form>

        </div>
    );
}

export default AddPatient;
