import React, { useEffect, useState } from "react";
import './styles/App.css'

const App = () => {
  const [breeds, setBreeds] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('akita');
  const [breedImgs, setBreedImgs] = useState(null);
  const [selectedImg, setSelectedImg] = useState()


  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        setBreeds(data.message)
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
      .then(res => res.json())
      .then(data => setBreedImgs(data.message))
      .catch(err => console.log(err))
  });

  const handleChange = (e) => setSelectedBreed(e.target.value)
  const handleImg = (e) => {
    let randomImg = breedImgs[Math.floor(Math.random() * breedImgs.length)]
    setSelectedImg(randomImg)
  }

  return <React.Fragment>
    <nav className="nav-bar">FIND YOUR DOG</nav>
    <div className="main">
      <div className="side-bar">
        <h3>Pick a breed</h3>
        {breeds && <select onChange={handleChange}>
          <option hidden selected>Select a breed</option>
          {Object.keys(breeds).map(breed => <option value={breed}>{breed.toUpperCase()}</option>)}
        </select>}

        {/* {breedImgs && <select onChange={handleImg}>
          <option hidden selected>Select a picture</option>
          {breedImgs.map(img => <option value={img}>{breedImgs.indexOf(img)}</option>)}
        </select>} */}
        <button onClick={handleImg}>Random Photo</button>
      </div>

      <div className="img-container">
        <img id="dog-photo" src={selectedImg} alt="Dog" height="500px" style={{ display: selectedImg ? "flex" : "none" }} />
      </div>
    </div >
  </React.Fragment >
}
export default App;
