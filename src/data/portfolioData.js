// Structured knowledge base about Rebha Naik for the AI Portfolio Assistant

export const portfolioKnowledge = {
  name: "Rebha Naik",
  role: "Aspiring Software Developer & Creative Technologist",
  education: {
    institution: "BMS Institute of Technology & Management (BMSIT&M)",
    degree: "B.E. in Computer Science & Engineering",
    focus: "Software Engineering, Algorithms, Databases, and Emerging Technologies",
    location: "Bengaluru, India"
  },
  skills: {
    languages: ["C", "Python", "JavaScript"],
    frontend: ["React", "HTML5", "CSS3", "Responsive Web Design"],
    databases: ["SQL", "Relational Database Management"],
    tools: ["Git", "GitHub", "Vite", "VS Code"],
    core: ["Data Structures & Algorithms", "Creative Problem Solving", "Hackathon Prototyping", "UI/UX Design"]
  },
  projects: [
    {
      title: "Arogyamitra",
      category: "Healthcare",
      summary: "A healthcare innovation concept aimed at solving critical healthcare access challenges and enhancing patient monitoring.",
      tags: ["Healthcare", "Innovation", "Accessibility"]
    },
    {
      title: "Decode",
      category: "Smart India Hackathon",
      summary: "A rapid-prototyping tech solution developed for Smart India Hackathon focusing on creative digital problem solving.",
      tags: ["Technology", "Problem Solving", "SIH"]
    },
    {
      title: "SEHAT",
      category: "Smart India Hackathon",
      summary: "A health-surveillance platform concept designed for community-wide health tracking, data collection, and proactive alerts.",
      tags: ["Health Tech", "Analytics", "SIH"]
    },
    {
      title: "DNK Portal",
      category: "Smart India Hackathon",
      summary: "A streamlined digital platform concept engineered around national hackathon problem statements for government/organizational workflows.",
      tags: ["Digital Platform", "Workflows", "SIH"]
    },
    {
      title: "Smart Navigator",
      category: "Campus Technology",
      summary: "An interactive campus navigation web application helping new students and visitors easily find buildings and amenities.",
      tags: ["React", "Interactive Maps", "Navigation"]
    },
    {
      title: "WellNexus",
      category: "Wellness & AI",
      summary: "A holistic personalized wellness concept integrating activity tracking, nutrition, sleep cycles, and mental well-being with AI insights.",
      tags: ["AI", "Wellness", "Personalization"]
    },
    {
      title: "Decentralized Carbon Credit Marketplace",
      category: "Sustainability & Web3",
      summary: "A transparent decentralized marketplace exploring blockchain-verified carbon credits to empower real climate action.",
      tags: ["Blockchain", "Web3", "Climate Action"]
    }
  ],
  contact: {
    email: "rebhanaik@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    availability: "Actively seeking internship opportunities, collaborative tech ventures, and hackathon teams."
  }
};

// Intelligent conversational matcher
export function generateBotResponse(userInput) {
  const query = userInput.toLowerCase().trim();

  // 1. Greetings
  if (query.match(/^(hi|hello|hey|sup|greetings|hola|good (morning|afternoon|evening))/i)) {
    return {
      text: "Hello! I'm Rebha's AI assistant. I can tell you about Rebha's hackathon projects, technical skills, education at BMSIT&M, or how to get in touch. What would you like to explore?",
      suggestions: ["Tell me about your SIH projects", "What are your core skills?", "Tell me about Arogyamitra", "How can I contact you?"]
    };
  }

  // 2. Contact & Email
  if (query.match(/contact|email|reach|hire|touch|message|connect/i)) {
    return {
      text: `You can reach Rebha directly at **${portfolioKnowledge.contact.email}**.\n\nShe is currently ${portfolioKnowledge.contact.availability.toLowerCase()}`,
      suggestions: ["What projects have you built?", "Tell me about your education", "What skills do you have?"]
    };
  }

  // 3. Education / College
  if (query.match(/education|college|university|degree|study|bmsit|bms|school/i)) {
    return {
      text: `Rebha is pursuing a **${portfolioKnowledge.education.degree}** at **${portfolioKnowledge.education.institution}** in Bengaluru.\n\nHer academic focus includes ${portfolioKnowledge.education.focus}.`,
      suggestions: ["What are your core skills?", "Tell me about your SIH projects", "Can I contact Rebha?"]
    };
  }

  // 4. Smart India Hackathon Projects
  if (query.match(/hackathon|sih|smart india/i)) {
    return {
      text: `Rebha has designed multiple solutions around **Smart India Hackathon** problem statements:\n\n` +
        `• **SEHAT**: A health-surveillance platform for community wellness and predictive monitoring.\n` +
        `• **Decode**: A rapid digital problem-solving platform addressing technical hackathon challenges.\n` +
        `• **DNK Portal**: A workflow and governance platform concept for streamlined digital services.`,
      suggestions: ["Tell me about SEHAT", "Tell me about Arogyamitra", "What other projects do you have?"]
    };
  }

  // 5. Specific Projects
  if (query.match(/arogyamitra|healthcare|health/i)) {
    return {
      text: `**Arogyamitra** is a healthcare solution concept designed to address real-world health challenges by streamlining patient monitoring and expanding access to vital medical services.`,
      suggestions: ["Tell me about SEHAT", "Tell me about Smart Navigator", "What technologies do you use?"]
    };
  }

  if (query.match(/sehat/i)) {
    return {
      text: `**SEHAT** is a Smart India Hackathon health-tech project engineered for community health surveillance, proactive medical data gathering, and real-time alerts.`,
      suggestions: ["Tell me about Decode", "Tell me about Arogyamitra", "What skills do you have?"]
    };
  }

  if (query.match(/decode/i)) {
    return {
      text: `**Decode** is a Smart India Hackathon innovation exploring rapid problem decomposition, software prototyping, and creative digital problem-solving under competitive hackathon timelines.`,
      suggestions: ["Tell me about DNK Portal", "Tell me about SEHAT", "Show all projects"]
    };
  }

  if (query.match(/dnk|dnk portal/i)) {
    return {
      text: `**DNK Portal** is a digital platform concept developed around national hackathon problem statements to modernize workflows and deliver reliable stakeholder management.`,
      suggestions: ["What other projects do you have?", "Tell me about your SIH projects", "What are your skills?"]
    };
  }

  if (query.match(/navigator|smart navigator|campus/i)) {
    return {
      text: `**Smart Navigator** is an interactive campus navigation system built using React and modern mapping tools to help new students and visitors seamlessly locate buildings, classrooms, and departments.`,
      suggestions: ["Tell me about WellNexus", "Tell me about Carbon Credit Marketplace", "What are your skills?"]
    };
  }

  if (query.match(/wellnexus|wellness|mental health/i)) {
    return {
      text: `**WellNexus** is an AI-driven personalized wellness platform connecting fitness tracking, customized nutrition, sleep quality analytics, and holistic mental well-being.`,
      suggestions: ["Tell me about Carbon Credit Marketplace", "What skills do you have?", "How can I contact Rebha?"]
    };
  }

  if (query.match(/carbon|climate|blockchain|marketplace|web3/i)) {
    return {
      text: `The **Decentralized Carbon Credit Marketplace** is a Web3/Blockchain sustainability concept ensuring transparent, verifiable carbon-offset tokenization and peer-to-peer trading.`,
      suggestions: ["Tell me about Arogyamitra", "Tell me about your SIH projects", "What are your core skills?"]
    };
  }

  // 6. Projects General
  if (query.match(/projects|work|portfolio|built|creations/i)) {
    return {
      text: `Rebha has developed **7 major projects & concepts** across Healthcare, SIH Hackathons, Campus Tech, and Web3:\n\n` +
        `1. **Arogyamitra** (Healthcare innovation)\n` +
        `2. **Decode** (Smart India Hackathon)\n` +
        `3. **SEHAT** (Health surveillance SIH)\n` +
        `4. **DNK Portal** (Digital platform SIH)\n` +
        `5. **Smart Navigator** (Interactive campus map)\n` +
        `6. **WellNexus** (AI wellness & health tracker)\n` +
        `7. **Decentralized Carbon Credit Marketplace** (Blockchain sustainability)`,
      suggestions: ["Tell me about Arogyamitra", "Tell me about SEHAT", "Tell me about Smart Navigator"]
    };
  }

  // 7. Skills & Tech Stack
  if (query.match(/skills|stack|technologies|languages|tools|react|python|c\b|javascript|sql/i)) {
    return {
      text: `Rebha's technical toolkit includes:\n\n` +
        `• **Languages**: C, Python, JavaScript\n` +
        `• **Frontend**: React, HTML5, CSS3, Responsive UI/UX\n` +
        `• **Databases & Tools**: SQL, Git & GitHub, Vite\n` +
        `• **Specialties**: Data Structures & Algorithms, Prototyping, and Creative Digital Experiences.`,
      suggestions: ["What projects have you built?", "Tell me about your education", "How can I contact Rebha?"]
    };
  }

  // 8. About Rebha
  if (query.match(/about|who (are|is)|background|bio|tell me about (you|rebha)/i)) {
    return {
      text: `Rebha Naik is an **Aspiring Software Developer & Creative Technologist** currently studying Computer Science and Engineering at **BMSIT&M** in Bengaluru.\n\nShe is driven by creating impactful technology, excelling in hackathons, and building visually stunning interactive digital experiences.`,
      suggestions: ["What projects have you built?", "What are your core skills?", "How can I contact Rebha?"]
    };
  }

  // 9. Availability / Hiring
  if (query.match(/hire|job|internship|available|opportunity|work with/i)) {
    return {
      text: `Rebha is **actively open to internships, software development roles, and collaborative projects**!\n\nFeel free to send an email to **${portfolioKnowledge.contact.email}** or connect via LinkedIn.`,
      suggestions: ["How can I contact Rebha?", "What projects have you built?", "What are your core skills?"]
    };
  }

  // Default Fallback
  return {
    text: `That's an interesting question! I can provide detailed insights into Rebha's **projects** (like Arogyamitra or her Smart India Hackathon solutions), her **education at BMSIT&M**, her **programming skills**, or how to **get in touch**.`,
    suggestions: ["Tell me about your SIH projects", "What are your core skills?", "What projects have you built?", "How can I contact Rebha?"]
  };
}
