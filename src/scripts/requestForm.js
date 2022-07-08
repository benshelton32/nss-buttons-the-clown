import { sendRequest } from "./dataAccess.js"

export const requestForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent's Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child's Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numberOfAttendees">Number of Attendees</label>
            <input type="number" name="numberOfAttendees" class="input" />
        </div>
        <div class="field">
            <label class="label" for="lengthOfReservation">Reservation Length (Hours)</label>
            <input type="number" name="lengthOfReservation" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userParentsName = document.querySelector("input[name='parentName']").value
        const userChildsName = document.querySelector("input[name='childName']").value
        const userNumberOfAttendees = document.querySelector("input[name='numberOfAttendees']").value
        const userReservationLength = document.querySelector("input[name='lengthOfReservation']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: userParentsName,
            childName: userChildsName,
            numberOfAttendees: userNumberOfAttendees,
            reservationLength: userReservationLength,
            address: userAddress,
            date: userDate
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})