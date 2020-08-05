let ulJobContainer = document.querySelector('.jobs-search-results__list');
let jobs = ulJobContainer.querySelectorAll('.artdeco-list__item ')
let jobList = []

// Remember to scroll to the bottom of the document to avoid null values
jobs.forEach((job, index) => {
    let jobTitle = job.querySelector('.job-card-list__title').text.trim();
    let jobLink = job.querySelector('.job-card-container__link').href.trim();
    let timeOfPost = job.querySelector('time').innerText;

    // Split text into array to access the day value
    let splitString = timeOfPost.split(' ')

    if (parseInt(splitString[0]) < 2 && splitString[1] === "dag") {
        const jobObj = {
            jobTitle: jobTitle,
            jobLink: jobLink
        }
    
        jobList.push(jobObj)
    }
})

if (jobList.length === 0) {
    console.log("no jobs")
} else {
    jobList.forEach((job) => {
        console.log(job)
    })
}


// V2
let jobsUl = document.querySelector('.card-list, card-list--tile, jobs-jymbii__list');
// Remember to remove the first item in the list on the site as it is not a "job post", but some profile premium offer
let jobsNode = jobsUl.querySelectorAll('.artdeco-card, .jobs-jymbii__list-item, .jobs-jymbii__list-item--job-card-addon, .card-list__item, .a11y-job-card ');
let jobList = Array.from(jobsNode);
let count = 0;
let earlybirdJobs = [];

jobList.forEach((job, index) => {
    let jobTitleContainer = job.querySelector('.job-card-square__title').innerText;
    let jobLink = job.querySelector('.job-card-square__link').href;
    let timeStamp = job.querySelector('time').innerText;
    count++;

    // Split text into array to access the day value
    let splitTimeStamp = timeStamp.split(' ');
    let amountOfTime = parseInt(splitTimeStamp[0])
    let dayOrHour = splitTimeStamp[1]
    
    if ( ((amountOfTime < 4 && dayOrHour === "dage") || (amountOfTime === 1 && dayOrHour === "dag")) || (amountOfTime < 24 && dayOrHour === "timer")  ) {
        const jobObj = {
            name: jobTitleContainer,
            link: jobLink,
            posted: timeStamp
        }
        
        earlybirdJobs.push(jobObj)
    } else {
        console.log("no jobs according to the criteria")
    }

})

console.log(count)
console.log(earlybirdJobs)