const applicationState = {
    requests: [],
    clowns: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

// export const getRequests = () => {
//     const unorderedRequestsArray = applicationState.requests.map(request => ({...request}))
//     const convertedDateStringsArray = unorderedRequestsArray.map(request => {
//         return {...request, date: new Date(request.date)}
//     })
//     const requestsArraySortedByDate = convertedDateStringsArray.sort(
//         (request1, request2) => Number(request1.date) - Number(request2.date),
//     )
//     return requestsArraySortedByDate
// }

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
    .then(response => response.json())
    .then(
        (clownInfo) => {
            applicationState.clowns = clownInfo
        }
    )
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completedRequests) => {
                applicationState.completions = completedRequests
            }
        )
}

export const saveCompletions = (completedRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedRequest)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}