const superagent = require("superagent");
const fs = require("fs");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not fine file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) reject("I could not fine file");
      resolve("sucess");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-img.text", res.body.message);
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return "2:Ready";
};

(async () => {
  try {
    console.log("1:will get dog pics");
    const x = await getDogPic();
    console.log(x);

    console.log("3:done getting dog pics");
  } catch (err) {
    console.log("Error");
  }
})();

// console.log("1:will get dog pics");

// getDogPic()
//   .then((res) => {
//     console.log(res);
//     console.log("3: Done getting dog pictures");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// readFilePro(`${__dirname}/dog.txt`).then((data) => {
//   console.log(`Breed : ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
