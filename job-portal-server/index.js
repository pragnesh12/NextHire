const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lighthearted-lebkuchen-2f83e3.netlify.app/",
    ], // Remove trailing slash
    methods: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello Developer");
});

const uri = `mongodb+srv://workingpragnesh:W9sWYTgJWYFPGaZo@cluster1.aa7ic.mongodb.net/mernJobPortal?retryWrites=true&w=majority`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    // Posting a Job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      try {
        const result = await jobsCollections.insertOne(body);
        if (result.insertedId) {
          return res
            .status(200)
            .json({ message: "Job posted successfully", result });
        } else {
          return res
            .status(500)
            .json({ message: "Failed to post job. Try again later" });
        }
      } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        if (req.query.id) {
          const job = await jobsCollections.findOne({
            _id: new ObjectId(req.query.id),
          });
          res.json(job);
        } else {
          const jobs = await jobsCollections.find({}).toArray();
          res.json(jobs);
        }
      } catch (error) {
        res.status(500).json({ message: "Error fetching jobs" });
      }
    });

    // Get Single job using ID
    app.get("/all-jobs/:id", async (req, res) => {
      try {
        const job = await jobsCollections.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(job);
      } catch (error) {
        res.status(500).json({ message: "Error fetching job by ID" });
      }
    });

    // Get Jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      try {
        const jobs = await jobsCollections
          .find({ postedBy: req.params.email })
          .toArray();
        res.json(jobs);
      } catch (error) {
        res.status(500).json({ message: "Error fetching jobs by email" });
      }
    });

    // Delete a Job
    app.delete("/job/:id", async (req, res) => {
      try {
        const result = await jobsCollections.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error deleting job" });
      }
    });

    // Update a Job
    app.patch("/update-job/:id", async (req, res) => {
      const jobData = req.body;
      try {
        const result = await jobsCollections.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: jobData },
          { upsert: true }
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error updating job" });
      }
    });

    // Handle job applications
    app.post("/job/:id/apply", async (req, res) => {
      const { jobId, resumeLink } = req.body;
      try {
        const application = { jobId, resumeLink, submittedAt: new Date() };
        const result = await jobsCollections.updateOne(
          { _id: new ObjectId(jobId) },
          { $push: { applications: application } }
        );
        res.json({ message: "Application submitted successfully", result });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    });

    await client.db("admin").command({ ping: 1 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
