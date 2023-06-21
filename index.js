const app = require("./server");
const fs = require("fs");
const PORT = 1080;

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
    trainingDates:[{ "month": "Jan", "Days": 0 },
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

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
