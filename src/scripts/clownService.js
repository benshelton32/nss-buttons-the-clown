import { requestForm } from "./requestForm.js"
import { requests } from "./requests.js"

export const clownServices = () => {
    return `
    <h1>Buttons and Lollipop's Clown Service</h1>
    <section class="serviceForm">
    ${requestForm()}
    </section>

    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${requests()}
    </section>
    `
}