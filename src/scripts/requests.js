import { getRequests, deleteRequest, getClowns, saveCompletions } from "./dataAccess.js";

export const requests = () => {
    const listOfRequests = getRequests()
    const clowns = getClowns()

    let html = `
        <ul>
            ${
                listOfRequests.map(request => {
                    return `
                    <li>
                        ${request.childName}'s party on ${request.date}
                        <select class="clowns" id="clowns">
                            <option value="">Choose</option>
                            ${
                                clowns.map(
                                    clown => {
                                        return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
                                    }
                                ).join("")
                            }
                        </select>
                        <button class="request__delete" id="request--${request.id}">
                            Deny
                        </button>
                    </li>`
                }).join("")
            }
        </ul>
    `
    
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

            const timestamp = Date.now()

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: parseInt(requestId),
                clownId: parseInt(clownId),
                completionDate: timestamp
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletions(completion)
        }
    }
)