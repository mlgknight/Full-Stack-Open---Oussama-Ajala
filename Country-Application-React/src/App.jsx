import React, { useEffect, useState } from "react"
import axios from "axios"
import Search from "./components/Search"
import DisplayCountries from "./components/DisplayCountries"


function App() {
  const [selectCountry, setSelectCountry] = useState("")
  const [currentCountry, setCurrentCountry] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    if (selectCountry) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
        setData(response.data)
    })
    .catch(error => {
      if (error.response && error.response.status === 404){
      }
    });
  }
  },[selectCountry]);



  const filteredCountries = data.filter(country => country.name.common.toLowerCase()
  .includes(selectCountry.toLowerCase())).slice(0, 5)


  return (
    <>
      <h1>Country Appliction</h1>
      <Search setCurrentCountry={setCurrentCountry} selectCountry={selectCountry} setSelectCountry={setSelectCountry} filteredCountries={filteredCountries} />
      <DisplayCountries currentCountry={currentCountry} setCurrentCountry={setCurrentCountry}
       filteredCountries={filteredCountries}
        selectCountry={selectCountry}/>
    </>

  )
}

export default App
