import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import noteContext from "../context/notes/noteContext";
import './AddCar.css'

const Addcar = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const navigate = useNavigate(); 

  const [note, setNote] = useState({ name: '', description: '', cost: '', photo: '',Used_for:'' });

  const handleClick = async (e) => {
    e.preventDefault();
    await addNote(note.name, note.description, note.cost, note.photo,note.Used_for);
    console.log("Sucesfully Added Data In Database")
    setNote({ name: '', description: '', cost: '', photo: '',Used_for:'' });
    navigate('/home'); 
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
    return (
        <div className="container my-5" id='Addingcar'>
  <div className="row" style={{margin: 100}}>
    <div className="col-md-6 newCarDetails">
      <h2 className='addar-text'>ADD NEW FLEET IN THE ROOM</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">VEHICLE NAME</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={note.name} onChange={onChange} minLength={3} required placeholder='Enter Vehicle Name'/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">VEHICLE DESCRIPTION</label>
          {/* <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder='Enter Vehicle Description' onChange={onChange} minLength={5} required /> */}
          <textarea
            className="form-control"
            id="description"
            value={note.description}
            onChange={onChange}
            name="description"
            placeholder="Enter Description"
            minLength={5}
             required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">PRICE</label>
          <input type="text" className="form-control" id="cost" name="cost" value={note.cost} placeholder='Enter Price (in RS)' onChange={onChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="photo" className="form-label">IMAGE URL</label>
            <input type="text" className="form-control" id="photo" name="photo" placeholder='Paste URL of the upcoming Vehicle here' value={note.photo} onChange={onChange} required />
        </div>

        <div className="mb-3">
            <label htmlFor="Used_for" className="form-label">TYPE OF VEHICLE</label>
                <select className="form-select" value={note.Used_for} onChange={onChange} name="Used_for" id="Used_for">
                    <option value="">Select Occupation</option>
                    <option value="farmer">Farmer</option>
                    <option value="manager">Manager</option>
                    <option value="tourist">Tourist</option>
                    {/* Add more options as needed */}
                </select>
        </div>

        <button disabled={note.name.length < 3 || note.description.length < 5} type="submit" className="team-engage-button" onClick={handleClick}>Add Car</button>
      </form>
    </div>
    <div className="col-md-6" style={{margin: 'auto' , mixBlendMode:"darken"}}>
      <img src='https://pbs.twimg.com/media/EPm_tKZUUAEAgod.jpg' alt="Car" className="img-fluid" />
    </div>
  </div>
</div>

    )
}

export default Addcar
