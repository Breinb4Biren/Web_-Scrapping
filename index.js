// // import puppeteer from "puppeteer";

// // (async () => {
// //   const browser = await puppeteer.launch({
// //     headless: false,
// //     defaultViewport: null,
// //     args: ["--start-maximized", "--window-size=1920,1080"],
// //     userDataDir: "./tmp",
// //   });

// //   const page = await browser.newPage();

// //   await page.goto("https://www.amazon.com/s?k=amazon+basics");

// //   await page.setViewport({
// //     width: 1300,
// //     height: 1080,
// //   });

// //   console.log("Navigation to Amazon successful");

// //   let i = 0;
// //   let items = [];
// //   let isBtnDisabled = false;

// //   while (!isBtnDisabled) {
// //     await page.waitForSelector(
// //       ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
// //     );
// //     const productsHandles = await page.$$(
// //       ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
// //     );
// //     // console.log("productsHandles", productsHandles.length);

// //     for (const producthandle of productsHandles) {
// //       let title = "Null";
// //       let price = "Null";
// //       let image = "Null";
// //       try {
// //         //Without carasoul
// //         let normalTitle = await page.evaluate(
// //             (el) => el.querySelector(":not(.a-carousel-card) h2 > a > span")?.textContent,
// //             producthandle
// //         );
// //         console.log({normalTitle});

// //         // with carosul
// //         // let carasoulTitleArr = await page.evaluate(
// //         //     (el) => el.querySelectorAll(".a-carousel-card").childElementCount,
// //         //     producthandle
// //         // );
// //         // console.log("carasoulTitleArr", carasoulTitleArr);




// //         // const courselElArr = await page.evaluate(
// //         //   (el) => el.querySelector(".a-carousel").children,
// //         //   producthandle
// //         // );
// //         // const arrConvCour = Array.from(courselElArr);
// //         // console.log("arrConvCour.length",arrConvCour.length);
// //         // if (arrConvCour.includes(".a-carousel")) {
// //         // //   const couraselTitleArr = Array.from(
// //         // //     await page.evaluate(
// //         // //       (el) => el.querySelector(".a-carousel").children,
// //         // //       courselElArr
// //         // //     )
// //         // //   );
// //         // //   console.log({ couraselTitleArr });
// //         // //   for (const titleItm of couraselTitleArr) {
// //         // //     const tempText = await page.evaluate(
// //         // //       (el) => el.querySelector("h2 > a > span").textContent,
// //         // //       titleItm
// //         // //     );
// //         // //     console.log("==========");
// //         // //     console.log({ tempText });
// //         // //     const pushItmRes = await pushItem(tempText, price, image, titleItm);
// //         // //     items.push(pushItmRes);
// //         // //   }
// //         // } else {
// //         //   title = await page.evaluate(
// //         //     (el) => el.querySelector("h2 > a > span")?.textContent,
// //         //     producthandle
// //         //   );
// //         //   const pushItmRes = await pushItem(title, price, image, producthandle);
// //         //   items.push(pushItmRes);
// //         // }
// //       } catch (error) {
// //         console.log("SOMETHING WRONG!!!!!!", error);
// //       }
// //     }
// //     // console.log("items.length", items.length);

// //     console.log(
// //       `Page ${i + 1} collected ${
// //         productsHandles.length
// //       } products. Total items collected: ${items.length}`
// //     );
// //     i++;

// //     // await page.waitForSelector(".s-pagination-item.s-pagination-next", {
// //     //   visible: true,
// //     // });
// //     // const is_disabled =
// //     //   (await page.$(
// //     //     ".s-pagination-item.s-pagination-next.s-pagination-disabled"
// //     //   )) !== null;
// //     // isBtnDisabled = is_disabled;
// //     // // console.log(is_disabled);
// //     // if (!is_disabled) {
// //     //   await Promise.all([
// //     //     page.click(".s-pagination-item.s-pagination-next"),
// //     //     page.waitForNavigation({ waitUntil: "networkidle2" }),
// //     //   ]);
// //     // }
// //   }
// //   async function pushItem(title, price, image, producthandle = null) {
// //     try {
// //       price = await page.evaluate(
// //         (el) => el.querySelector(".a-price > .a-offscreen").textContent,
// //         producthandle
// //       );
// //     } catch (error) {}
// //     try {
// //       image = await page.evaluate(
// //         (el) => el.querySelector(".s-image").getAttribute("src"),
// //         producthandle
// //       );
// //     } catch (error) {}
// //     if (title !== "Null") {
// //       return { title, price, image };
// //     }
// //     return null;
// //   }

// //   isBtnDisabled = true;
// //   //console.log(items);
// //   //   console.log(`Total items collected: ${items.length}`);

// //   // Close the browser
// //   // await browser.close();
// // })();


import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--window-size=1920,1080"],
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();

  await page.goto("https://www.amazon.com/s?k=amazon+basics");

  await page.setViewport({
    width: 1300,
    height: 1080,
  });

  console.log("Navigation to Amazon Basics is successful");

  let i = 0;
  let items = [];
  let isBtnDisabled = false;

  while (!isBtnDisabled) {
    await page.waitForSelector(
      '[data-cel-widget="search_result_0"]'
    );
    const productsHandles = await page.$$(
      ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    );

    for (const producthandle of productsHandles) {
      let title = "Null";
      let price = "Null";
      let image = "Null";
      try {
        // Handle normal product titles
        let normalTitle = await page.evaluate(
          (el) =>
            el.querySelector(":not(.a-carousel-card) h2 > a > span")?.textContent.trim(),
          producthandle
        );
        console.log({ normalTitle });

        // Handle carousel products
        const carouselExists = await page.evaluate(
          (el) => el.querySelector(".a-carousel") !== null,
          producthandle
        );

        if (carouselExists) {
          const carouselItems = await producthandle.$$(
            ".a-carousel-card"
          );

          for (const carouselItem of carouselItems) {
            try {
              let carouselTitle = await page.evaluate(
                (el) =>
                  el.querySelector("h2 > a > span")?.textContent.trim(),
                carouselItem
              );
              console.log({ carouselTitle });

              // Push carousel item to items array
              const pushItmRes = await pushItem(
                carouselTitle,
                price,
                image,
                carouselItem
              );
              items.push(pushItmRes);
            } catch (error) {
              console.log("Error in extracting carousel item:", error);
            }
          }
        } else {
          // Push normal product to items array
          const pushItmRes = await pushItem(
            normalTitle,
            price,
            image,
            producthandle
          );
          items.push(pushItmRes);
        }
      } catch (error) {
        console.log("Error in scraping product:", error);
      }
    }

    console.log(
      `Page ${i + 1} collected ${productsHandles.length} products. Total items collected: ${items.length}`
    );
    i++;

    await page.waitForSelector(".s-pagination-item.s-pagination-next", {
      visible: true,
    });
    const is_disabled =
      (await page.$(
        ".s-pagination-item.s-pagination-next.s-pagination-disabled"
      )) !== null;
    isBtnDisabled = is_disabled;

    if (!is_disabled) {
      await Promise.all([
        page.click(".s-pagination-item.s-pagination-next"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }
  }

  async function pushItem(title, price, image, producthandle = null) {
    try {
      price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent.trim()|| "Null",
        producthandle
      );
    } catch (error) {}
    try {
      image = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        producthandle
      );
    } catch (error) {}
    if (title !== "Null") {
      return { title, price, image };
    }
    return null;
  }

  isBtnDisabled = true;
  console.log(items);
  console.log(`Total items collected: ${items.length}`);

  // Close the browser
  // await browser.close();
})();



// const fs = require("fs");
// const puppeteer = require("puppeteer");

// const sleep = (milliseconds) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: false,
//     userDataDir: "./tmp",
//   });

//   const page = await browser.newPage();
//   await page.goto(
//     "https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A11036071%2Cp_36%3A1253503011&dc&fs=true&qid=1635596580&rnid=16225007011&ref=sr_pg_1"
//   );

//   let isBtnDisabled = false;
//   while (!isBtnDisabled) {
//     await page.waitForSelector('[data-cel-widget="search_result_0"]');
//     const productsHandles = await page.$$(
//       "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
//     );

//     for (const producthandle of productsHandles) {
//       let title = "Null";
//       let price = "Null";
//       let img = "Null";

//       try {
//         title = await page.evaluate(
//           (el) => el.querySelector("h2 > a > span").textContent,
//           producthandle
//         );
//       } catch (error) {}

//       try {
//         price = await page.evaluate(
//           (el) => el.querySelector(".a-price > .a-offscreen").textContent,
//           producthandle
//         );
//       } catch (error) {}

//       try {
//         img = await page.evaluate(
//           (el) => el.querySelector(".s-image").getAttribute("src"),
//           producthandle
//         );
//       } catch (error) {}
//       if (title !== "Null") {
//         fs.appendFile(
//           "results.csv",
//           `${title.replace(/,/g, ".")},${price},${img}\n`,
//           function (err) {
//             if (err) throw err;
//           }
//         );
//       }
//     }

//     await page.waitForSelector("li.a-last", { visible: true });
//     const is_disabled = (await page.$("li.a-disabled.a-last")) !== null;

//     isBtnDisabled = is_disabled;
//     if (!is_disabled) {
//       await Promise.all([
//         page.click("li.a-last"),
//         page.waitForNavigation({ waitUntil: "networkidle2" }),
//       ]);
//     }
//   }

//   await browser.close();
// })();