"use client"
import FirebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { ref, get, set, update, remove, child } from "firebase/database";
import { useState } from "react";
import './FirebaseCrud.css';


const database = FirebaseConfig();

export default function FirebaseCrud() {

    let [username, setUsername] = useState('');
    let [fullname, setFullname] = useState('');
    let [phone, setPhone] = useState('');
    let [dob, setDob] = useState('');

    let isNullOrWhiteSpaces = value => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }

    let InsertData = () => {

        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username) || isNullOrWhiteSpaces(fullname) || isNullOrWhiteSpaces(phone) || isNullOrWhiteSpaces(dob)) {
            alert("Fill all the fields");
            return;
        }

        get(child(dbref, 'Custumer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                alert("The user already exist, try a diferent name")
            } else {
                set(ref(database, 'Custumer/' + username), {
                    fullname: fullname,
                    phonenumber: phone,
                    dateofbirth: dob
                })
                    .then(() => {
                        alert("Custumer added successfully")
                    })
                    .catch(error => {
                        console.log(error);
                        alert("There was an error adding the custumer");
                    });;
            }
        })
            .catch((error) => {
                console.log(error);
                alert("Error data retrived was unsuccessful")
            })



    }

    let UpdateData = () => {

        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
            alert("Username is empity, try to select a user first, with the select button");
            return;
        }

        get(child(dbref, 'Custumer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, 'Custumer/' + username), {
                    fullname: fullname,
                    phonenumber: phone,
                    dateofbirth: dob
                })
                    .then(() => {
                        alert("Custumer updated successfully")
                    })
                    .catch(error => {
                        console.log(error);
                        alert("There was an error updating the custumer");
                    });;

            } else {
                alert("The user does not exist")
            }
        })
            .catch((error) => {
                console.log(error);
                alert("Error data retrived was unsuccessful")
            })



    }

    let DeleteData = () => {

        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
            alert("Username is is required to delete a user");
            return;
        }

        get(child(dbref, 'Custumer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, 'Custumer/' + username))
                    .then(() => {
                        alert("Custumer deleted successfully")
                    })
                    .catch(error => {
                        console.log(error);
                        alert("There was an error deleting the custumer");
                    });

            } else {
                alert("The user does not exist")
            }
        })
            .catch((error) => {
                console.log(error);
                alert("Error data retrived was unsuccessful")
            })



    }

    let selectData = () => {

        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
            alert("Username is required to retrived the data");
            return;
        }

        get(child(dbref, 'Custumer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                setFullname(snapshot.val().fullname);
                setPhone(snapshot.val().phonenumber);
                setDob(snapshot.val().dateofbirth);
            } else {
                alert("No data available")
            }
        })
            .catch((error) => {
                console.log(error);
                alert("Error data retrived was unsuccessful")
            })
    }


    return (
        <div className="container">
            <h1 className="title">Cadastro</h1>
            <div className="form-container">
                <label>Username</label>
                <input type="text" value={username} onChange={e => { setUsername(e.target.value) }} />
                <br />
    
                <label>Fullname</label>
                <input type="text" value={fullname} onChange={e => { setFullname(e.target.value) }} />
                <br />
    
                <label>Phone</label>
                <input type="text" value={phone} onChange={e => { setPhone(e.target.value) }} />
                <br />
    
                <label>Date of Birth</label>
                <input type="date" value={dob} onChange={e => { setDob(e.target.value) }} />
                <br />
    
                <div className="button-container">
                    <button onClick={InsertData}>Insert Data</button>
                    <button onClick={UpdateData}>Update Data</button>
                    <button onClick={DeleteData}>Delete Data</button>
                    <button onClick={selectData}>Select Data</button>
                </div>
            </div>
        </div>
    )
}
