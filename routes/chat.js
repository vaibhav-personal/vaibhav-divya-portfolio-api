const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// MODELS
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Certification = require("../models/Certification");

// GROQ CLIENT
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,

  baseURL: "https://api.groq.com/openai/v1",
});

// CHAT ROUTE
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // FETCH DATABASE DATA
    const projects = await Project.find();
    const skills = await Skill.find();
    const experience = await Experience.find();
    const education = await Education.find();
    const certifications = await Certification.find();

    // BUILD DYNAMIC CONTEXT
    const portfolioContext = `

Portfolio Owner:
Vaibhav Divya

Professional Summary:
- MERN Stack Developer
- Frontend Engineer
- Worked at Tata Consultancy Services (TCS)
- Passionate about scalable web applications and AI-powered systems

Skills:
${skills.map((skill) => `- ${skill.name}`).join("\n")}

Projects:
${projects
  .map(
    (project) => `
- ${project.title}
  Description: ${project.description}
  Technologies: ${project.techStack}
`,
  )
  .join("\n")}

Experience:
${experience
  .map(
    (exp) => `
- ${exp.role} at ${exp.company}
  Duration: ${exp.startDate} - ${exp.currentlyWorking ? "Present" : exp.endDate}
  Location: ${exp.location}
`,
  )
  .join("\n")}

Education:
${education
  .map(
    (edu) => `
- ${edu.degree}
  Institution: ${edu.institution}
  Field: ${edu.fieldOfStudy}
`,
  )
  .join("\n")}

Certifications:
${certifications
  .map(
    (cert) => `
- ${cert.title}
`,
  )
  .join("\n")}

`;

    // AI COMPLETION
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",

          content: `
You are Vaibhav Divya's professional AI portfolio assistant.

Your job:
- Answer recruiter questions professionally
- Answer in short bullet points
- Keep responses concise
- Be recruiter friendly
- Explain technical projects clearly
- Never generate fake information
- Only use provided portfolio data

Portfolio Data:

${portfolioContext}
            `,
        },

        {
          role: "user",

          content: message,
        },
      ],

      temperature: 0.7,

      max_tokens: 500,
    });

    // SEND RESPONSE
    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
