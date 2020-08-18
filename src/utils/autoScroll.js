const autoScroll = async (page) => {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        let distance = 140;
        const scrollTimer  = setInterval(() => {
          // Get the scrollable height from the DOM body
          const scrollHeight = document.body.scrollHeight;
          // Scroll down by x amount of distance
          window.scrollBy(0, distance);
          totalHeight += distance;
  
          if (totalHeight >= scrollHeight) {
            clearInterval(scrollTimer)
            resolve()
          }
        }, 500)
      })
    })
  }

  module.exports = autoScroll;