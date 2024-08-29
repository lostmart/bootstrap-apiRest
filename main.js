import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"
import { bringData } from "./utils/bringData"
const form = document.querySelector("[data-form]")

//showData(dummy_data)
// bringData()

form.addEventListener("submit", (e) => {
	e.preventDefault()
	const searchValue = form.test.value
	// console.log(searchValue)
	document.querySelector(".dynamic_data").innerHTML = "" // clean DOM
	document.querySelector(".spinner-container").classList.remove("d-none") // show spipnner
	document.querySelector(".alert").classList.add("d-none") // hide "no found alert"
	// bring data from Steam API
	bringData(`https://steam2.p.rapidapi.com/search/${searchValue}/page/1`)
})
