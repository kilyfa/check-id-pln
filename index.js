import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: null });
});

app.post("/", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://cek-id-pln-pasca-dan-pra-bayar.p.rapidapi.com/pln/${req.body["tokenid"]}/token_pln`,
    headers: {
      "x-rapidapi-key": "30d911b00amsh7fbfa7596da6decp146e15jsncad3a2f74f2a",
      "x-rapidapi-host": "cek-id-pln-pasca-dan-pra-bayar.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // const data = {
    //   success: true,
    //   data: {
    //     meter_number: "56213840202",
    //     subscriber_id: "520541273766",
    //     subscriber_name: "SAR** WAN**",
    //     segment_power: "R1/900",
    //   },
    // };
    res.render("index.ejs", { data: response.data });
  } catch (error) {
    console.error(error, { data: null });
  }
});

app.listen(port, () => {
  console.log("Its work on port ", port);
});
