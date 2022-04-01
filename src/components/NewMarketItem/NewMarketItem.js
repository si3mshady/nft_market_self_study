
import React from 'react'
import './NewMarketItem.css'


const handleSubmit = () => {

}

const handleChange = (e) => {
    e.preventDefault()
  
  }

export default function NewMarketItem() {


    const [formData, setFormData] = React.useState({
        address: "",
        date: "",
        email: "",
        fee: "",
        appointmentType: ""
      })
      
    return (
        <div class="container">
            <form >

                <label>Doctor Wallet Address</label>
                <input type="text"  name="address" placeholder="ETH wallet address"/>

                <label>Appt Date</label>
                <input type="text" name="date" placeholder="Appt Date"/>

                <input type="submit" value="Submit"/>

            </form>
        </div>
    )
}
