let jobsUl = document.querySelector('.card-list, card-list--tile, jobs-jymbii__list');
// Remember to remove the first item in the list on the site as it is not a "job post", but some profile premium offer
let jobsNode = jobsUl.querySelectorAll('.jobs-jymbii__list-item, .jobs-jymbii__list-item--job-card-addon, .card-list__item, .a11y-job-card');
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
    let amountOfTime = parseInt(splitTimeStamp[0]);
    let typeOfDate = splitTimeStamp[1];

    if (amountOfTime < 5 && typeOfDate === "dage") {
        const jobObj = {
            name: jobTitleContainer,
            link: jobLink,
            posted: timeStamp
        }
        earlybirdJobs.push(jobObj)
    } else if (amountOfTime === 1 && typeOfDate === "dag") {
        const jobObj = {
            name: jobTitleContainer,
            link: jobLink,
            posted: timeStamp
        }
        earlybirdJobs.push(jobObj)
    } else if (amountOfTime < 24 && typeOfDate === "timer") {
        const jobObj = {
            name: jobTitleContainer,
            link: jobLink,
            posted: timeStamp
        }
        earlybirdJobs.push(jobObj)
    } else {
        console.log("Not compliant with criteria")
    }
})

console.log(earlybirdJobs)