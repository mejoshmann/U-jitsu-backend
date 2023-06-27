const app = require("./server");
const fs = require("fs");
const PORT = 1080;
const puppeteer = require("puppeteer");
const path = require("path");
const grapplingInfo = require("./scrape");
require('events').EventEmitter.defaultMaxListeners = 15;



app.get("/training", (_req, res) => {
  fs.readFile("demoData.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading profile data:", err);
      res.status(500).send("Error reading profile data");
    } else {
      const profileData = JSON.parse(data);
      res.status(200).json(profileData);
    }
  });
});


// Post new profile
app.post("/profile", (req, res) => {
  const profileDataJASON = fs.readFileSync("./data.json")
  const profileData = JSON.parse(profileDataJASON);

  const formData = {
    name: req.body.name,
    belt: req.body.belt,
    experience: req.body.experience,
    gender: req.body.gender,
    age: req.body.age,
    location: req.body.location,
    school: req.body.school,
    bio: req.body.school,
  };

  profileData.splice(0, 0, formData)
  const updateProfile = JSON.stringify(profileData);
  fs.writeFileSync("./data.json", updateProfile);
  res.status(201).send("Profile successfully updated");
});


// Profile Delete
app.delete("/profile", (_req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      res.status(500).send("Error reading data.json");
    } else {
      const deleteProfile = JSON.parse(data);
      delete deleteProfile.splice(0, 1);
      const updatedProfile = JSON.stringify(deleteProfile);
      fs.writeFile("data.json", updatedProfile, (err) => {
        if (err) {
          console.error("Error writing data.json:", err);
          res.status(500).send("Error writing data.json");
        } else {
          res.status(200).send("Profile section deleted successfully");
        }
      });
    }
  });
});

app.post("/training", (req, res) => {
  const profileDataJSON = fs.readFileSync("./data.json")
  const profileData = JSON.parse(profileDataJSON)


  const currentDate = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const trainData = {
    date: formattedDate,
    hours: req.body.hours,
    journal: req.body.journal,
    takedowns: req.body.takedowns,
    positions: req.body.positions,
    submissions: req.body.submissions,
    movements: req.body.movements,
    gi: false,
    noGi: false,
  };

  profileData[2].training.push(trainData);
  const updateProfile = JSON.stringify(profileData);
  fs.writeFileSync("./data.json", updateProfile);
  res.status(201).send("Profile successfully updated");
});


app.get('/knowledge/page', (_req, res) => {
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

app.get("/scrape", async (req, res) => {
  try {
    const extractedData = await grapplingInfo();
    res.json(extractedData);
  } catch (error) {
    console.error("An error occurred while scraping:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
