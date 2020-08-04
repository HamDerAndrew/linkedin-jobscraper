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