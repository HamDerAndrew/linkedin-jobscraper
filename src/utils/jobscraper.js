const grabJobs = async (page) => {
    const jobsUl = await page.$('.card-list, card-list--tile, jobs-jymbii__list');
    // Remember to remove the first item in the list on the site as it is not a "job post", but some profile premium offer
    const jobsNode = await jobsUl.$$('.jobs-jymbii__list-item, .jobs-jymbii__list-item--job-card-addon, .card-list__item, .a11y-job-card');
    const jobList = await Array.from(jobsNode);
    let count = 0;
    let earlybirdJobs = [];
  
    // Using map instead of forEach as forEach does not wait for promises
    const getJobs = jobList.map(async (job, index) => {
      const jobTitleContainer = await job.$('.job-card-square__title');
      const jobLinkElement = await job.$('.job-card-square__link');
      const timeStampElement = await job.$('time');
  
      // page.evaluate gives access to the complete DOM API. Therefore you can use 'innerText'
      const jobText = await page.evaluate(async (element) => {
        return element.innerText
      }, jobTitleContainer)
  
      const jobLink = await page.evaluate(async (element) => {
        return element.href
      }, jobLinkElement)
  
      const timeStamp = await page.evaluate(async (element) => {
        return element.innerText;
      }, timeStampElement)
      
  
      const splitTimeStamp = await timeStamp.split(' ');
      const amountOfTime = await parseInt(splitTimeStamp[0]);
      const typeOfDate =  await splitTimeStamp[1];
  
  
      if (amountOfTime < 4 && typeOfDate === "dage") {
        const jobObj = {
          name: jobText,
          link: jobLink,
          posted: timeStamp
        }
        earlybirdJobs.push(jobObj);
      } else if (amountOfTime === 1 && typeOfDate === "dag") {
        const jobObj = {
          name: jobText,
          link: jobLink,
          posted: timeStamp
        }
        earlybirdJobs.push(jobObj);
      } else if (amountOfTime < 24 && typeOfDate === "timer") {
        const jobObj = {
          name: jobText,
          link: jobLink,
          posted: timeStamp
        }
        earlybirdJobs.push(jobObj);
      } else {
        console.log("None", count++)
      }
  
      return earlybirdJobs;
    })
  
    await Promise.all(getJobs)
  
    console.log(earlybirdJobs)
  }

  module.exports = grabJobs;