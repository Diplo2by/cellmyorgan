//WIP

export default function handler(req, res) {
  const body = req.body;
  if (req.method !== "POST") {
    res.status(504).json("only post allowed");
    return;
  }
  console.log(body.name);
  res.status(200).json({ data: "recieved", body: body });
}
