const app = require("./server");
const fs = require("fs");
const PORT = 1080;
const puppeteer = require("puppeteer");
const path = require("path");
require('events').EventEmitter.defaultMaxListeners = 15;



app.get("/", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading profile data:", err);
      res.status(500).send("Error reading profile data");
    } else {
      const profileData = JSON.parse(data);
      res.status(200).json(profileData);
    }
  });
});


// Profile post and update
app.post("/", (req, res) => {
  const profileDataJASON = fs.readFileSync("./data.json")
  const profileData = JSON.parse(profileDataJASON);
  console.log("profileData: ", profileData[0].exercises);
  console.log("body: ", req.body);

  

  const formData = {
    name: req.body.name,
    belt: req.body.belt,
    experience: req.body.experience,
    gender: req.body.gender,
    age: req.body.age,
    location: req.body.location,
    school: req.body.school,
    bio: req.body.school,
    trainingDates:[
    { "month": "Jan", "Days": 0 },
    { "month": "Feb", "Days": 0 },
    { "month": "Mar", "Days": 0 },
    { "month": "Apr", "Days": 0 },
    { "month": "May", "Days": 0 },
    { "month": "Jun", "Days": 0 },
    { "month": "Jul", "Days": 0 },
    { "month": "Aug", "Days": 0 },
    { "month": "Sep", "Days": 0 },
    { "month": "Oct", "Days": 0 },
    { "month": "Nov", "Days": 0 },
    { "month": "Dec", "Days": 0 }],
    exercises: []
  };
  // profileData[0] = {}

  profileData.push(formData)
  const updateProfile = JSON.stringify(profileData);
  fs.writeFileSync("./data.json", updateProfile);
  res.status(201).send("Profile successfully updated");
});

app.post("/exercises", (req, res) => {

  const profileDataJSON = fs.readFileSync("./data.json")
  const profileData = JSON.parse(profileDataJSON)

  const trainData = {
    hours: req.body.name,
    journal: req.body.journal,
    takedowns: req.body.takedowns,
    positions: req.body.positions,
    submissions: req.body.submissions,
    movements: req.body.movements,
  };

  profileData[0].exercises.push(trainData);
  const updateProfile = JSON.stringify(profileData);
  fs.writeFileSync("./data.json", updateProfile);
  res.status(201).send("Profile successfully updated");
});

app.get("/scrape", (req, res) => {

  (async () => {
    // Launch the browser
    const browser = await puppeteer.launch();

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    await page.goto('https://grapplingindustries.smoothcomp.com/en/event/9408');

    // Query for an element handle.
    const h1Element = await page.waitForSelector('h1');
    const h1Text = await page.evaluate((el) => el.textContent, h1Element);

    const pElement = await page.waitForSelector('p');
    const pText = await page.evaluate((el) => el.textContent, pElement);


    // console.log('element', element);
    await browser.close();
    res.json({ title: h1Text, info: pText });
    
  }
  )();

})


app.get('/api/knowledge/points', (_req, res) => {
  fs.readFile('knowledge.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading knowledge data:', err);
      res.status(500).send('Error reading knowledge data');
    } else {
      const knowledgeData = JSON.parse(data);
      res.status(200).json(knowledgeData);
    }
  });
});

// app.get('/api/knowledge/takedowns', (req, res) => {
//   fs.readFile('knowledge.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading knowledge data:', err);
//       res.status(500).send('Error reading knowledge data');
//     } else {
//       const knowledgeData = JSON.parse(data);
//       res.status(200).json(knowledgeData);
//     }
//   });
// });




app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
