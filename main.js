import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"
const form = document.querySelector("[data-form]")

const API_KEY = import.meta.env.VITE_RAPID_KEY
const VITE_RAPID_HOST = import.meta.env.VITE_RAPID_HOST

console.log(API_KEY)

// check API key
if (!API_KEY) {
	alert("you don't have an API key !! ")
}

const dummy_data = [
	{
		appId: "1672970",
		imgUrl:
			"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/capsule_sm_120.jpg?t=1717003107",
		price: "",
		released: "22 Sep, 2021",
		reviewSummary:
			"Very Positive\n91% of the 11,033 user reviews for this game are positive.",
		title: "Minecraft Dungeons",
		url: "https://store.steampowered.com/app/1672970/Minecraft_Dungeons/?snr=1_7_7_151_150_1",
	},
]

const bringData = async (url) => {
	document.querySelector("h2").classList.add("d-none")
	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-key": API_KEY,
			"x-rapidapi-host": VITE_RAPID_HOST,
		},
	}

	try {
		const response = await fetch(url, options)
		// error handling
		if (!response.ok) {
			throw Error(response.status)
		}

		const result = await response.json()
		if (result.length === 0) {
			return showError()
		}

		showData(result)
	} catch (error) {
		console.error(error)
		document.querySelector(".spinner-container").style.display = "none"
		document.querySelector(".dynamic_data").innerHTML = `<pre>${error}</pre>`
	}
}

const showData = (dummy_data) => {
	document.querySelector(".spinner-container").classList.add("d-none")
	document.querySelector("h2").classList.remove("d-none")
	dummy_data.forEach((game) => {
		document.querySelector(".dynamic_data").innerHTML += `
        <div class="col">
            <article class="card">
                <img src="${game.imgUrl}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">
                    ${game.reviewSummary}
                    </p>
                    <a href="${game.url}" target="_blank" class="btn btn-primary">See on Steam</a>
                </div>
            </article>
        </div>
        `
	})
}

const showError = () => {
	document.querySelector(".spinner-container").classList.add("d-none")
	document.querySelector(".alert").classList.remove("d-none")
	document.querySelector(".alert").innerText =
		"Nothing found with the name " + form.test.value + " 💔 "
	form.test.value = "" // clean the form
}

//showData(dummy_data)
// bringData()

// console.log(form.test)

form.addEventListener("submit", (e) => {
	e.preventDefault()
	const searchValue = form.test.value
	console.log(searchValue)
	document.querySelector(".dynamic_data").innerHTML = "" // clean DOM
	document.querySelector(".spinner-container").classList.remove("d-none") // show spipnner
	bringData(`https://steam2.p.rapidapi.com/search/${searchValue}/page/1`)
})
