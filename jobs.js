const ulJobContainer = document.querySelector('.jobs-search-results__list');
const jobs = ulJobContainer.querySelectorAll('.artdeco-list__item ')
const jobList = []

// Remember to scroll to the bottom of the document to avoid null values
jobs.forEach((job, index) => {
    const jobTitle = job.querySelector('.job-card-list__title').text.trim();
    const jobLink = job.querySelector('.job-card-container__link').href.trim();
    const timeOfPost = job.querySelector('time').innerText;

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

jobList.forEach((job) => {
    console.log(job)
})