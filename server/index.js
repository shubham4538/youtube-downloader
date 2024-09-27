const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/video", (req, res) => {
  const { url } = req.query;
  try {
    axios
      .get(
        `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${url}`,
        {
          headers: {
            "x-rapidapi-key":
              "c944ef0e80msh49ed7ee9e7e3f68p1c134ejsn0d1058a4fa84",
            "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
          },
        }
      )
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    console.log(error);
  }
  console.log("Received");
});

app.get("/download", (req, res) => {
  const { url } = req.query;
  const shortCode = url.split("/").pop();

  try {
    axios
      .get(
        `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${shortCode}`,
        {
          headers: {
            "x-rapidapi-key":
              "c944ef0e80msh49ed7ee9e7e3f68p1c134ejsn0d1058a4fa84",
            "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
          },
        }
      )
      .then(async (response) => {
        const mediaUrl = response.data.videos.items[0].url;
        const resp = await axios.get(mediaUrl, { responseType: "stream" });

        console.log(resp);
        res.setHeader("Content-Type", resp.headers["content-type"]);
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${response.data.title}`
        );
        resp.data.pipe(res);
        // res.send("doing something");
      });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
