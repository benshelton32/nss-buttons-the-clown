import { clownServices } from "./clownService.js";
import { fetchClowns, fetchRequests, fetchCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchClowns())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = clownServices()
            }
        )
}

render()

document.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)