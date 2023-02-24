import path from "path";
import fs from "fs";

function builPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = builPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({
      status: 400,
      message: "Events data not found",
    });
  }

  if (method === "POST") {
    const { email, eventId } = req.body;

    if(!email || !email.includes("@")){
      res.status(422).json({message: "Invalid email address"})
    }

    const newAllEvents = allEvents.map((e) => {
      if (e.id === eventId) {
        if (e.emails_registered.includes(email)) {
          res
            .status(409)
            .json({ message: "This email has already been registered" });
            return e;
        }
        return {
          ...e,
          emails_registered: [...e.emails_registered, email],
        };
      }
      return e;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You has been registered successfully whit the email: ${email} for the event:  ${eventId} `,
    });
  }
}
