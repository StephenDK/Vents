import sampleData from "./sampleData"

// 12.18 below is a fetch data from server simulation using setTimeout
// after we return the delay and with promise resolve we return the data
// from sampleData
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchSampleData = () => {
    return delay(1000).then(() => {
        return Promise.resolve(sampleData)
    })
}

// 12.19 head to eventConstants.js to add new action constant