// src/data/constants.js

export const contact = {
    name:     "Jacob Martinage",
    email:    "jacobmartinage@gmail.com",
    linkedin: "linkedin.com/in/jacob-martinage/",
    location: "Washington, DC",
  };
  
  export const educationData = [
    {
      range:              "Aug 2023 – May 2026",
      org:                "Virginia Tech",
      title:              "B.S. Computer Science, GPA 3.4",
      location:           "Blacksburg, VA",
      expectedGraduation: "May 2026",
      organizations: [
        "VTHacks",
        "VT Artificial Intelligence & Machine Learning",
        "HackViolet",
        "BOLT",
      ],
      courses: [
        "Discrete Math",
        "Problem Solving in CS",
        "Linear Algebra",
        "Computer Organization",
        "Data Structures",
      ],
      logo: "/images/vtlogo.png",
    },
    {
      range: "May 2025 – Jul 2025",
      org: "Stanford University (via DeepLearning.AI)",
      title: "Machine Learning Specialization",
      location: "Online",
      expectedGraduation: null,
      courses: [
        "Supervised Machine Learning: Regression and Classification",
        "Advanced Learning Algorithms",
        "Unsupervised Learning, Recommenders, Reinforcement Learning",
      ],
      logo: "/images/stanford.png",
      certificate: "https://www.coursera.org/account/accomplishments/specialization/GFDO0AG9POUD",
    },
    
    
  ];
  
  export const workData = [
    {
        range:    "Jul 2025 – Present",
        org:      "ATPCO",
        title:    "Software Engineering Intern",
        location: "Remote",
        bullets: [
          "Current Internship going through December 2025, working on automating core processes used by 400+ airlines",
          "Developed an internal tool that reduced deployment time for new feeds by 85% and cut my teams' cloud operation costs by 11%",
          "Built and maintained Python scripts and CI workflows to automate testing across 30+ services",
        ],
        logo:     "/images/atpco.png",
    },
    {
      range:    "May 2024 – Aug 2024",
      org:      "General Atomics‑CCRi",
      title:    "Backend Software Engineering Intern",
      location: "Charlottesville, VA",
      bullets: [
        "Developed scripts to automate the tracking of financial sources and data-rights assertions, reducing manual processing time 90%",
        "Optimized Kubernetes deployments to improve performance and reliability",
        "Enhanced a Java/Scala stack’s stability by addressing memory inefficiencies and improving fault tolerance, increasing uptime from 2 hours to over 20 hours",
      ],
      logo: "/images/GA-I3.jpg",
    },
    {
      range:    "May 2024 – Present",
      org:      "Project Torch (VP & Co‑Founder)",
      title:    "Vice‑President & Co‑Founder",
      location: "Blacksburg, VA",
      bullets: [
        "Led a team of over 10 developers to create free websites and software solutions for local businesses",
        "Conducted weekly workshops on React and Node.js, accelerating project delivery by 50%",
        "Launched web products that attracted over 20 000 unique monthly visitors",
      ],
      logo: "/images/torch.png",
    },
    {
      range:    "Jan 2024 – June 2025",
      org:      "P.R.I.M.E Lab, Virginia Tech",
      title:    "Research Assistant",
      location: "Blacksburg, VA",
      bullets: [
        "Built a React/Node.js web app with a task panel, code editor, and real‑time chat via a custom ChatGPT agent, supporting 150+ concurrent users",
        "Designed and implemented an AWS‑hosted PostgreSQL database, collecting over 250 GB of interaction data to optimize AI‑driven student workflows",
      ],
      logo: "/images/vtlogo.png",
    },
  ];
  
  export const projectData = [
    {
      name:  "SteerClear | HackViolet 2025 Winner",
      date:  "Feb 2025",
      desc:  "Developed SteerClear, a React Native app featuring AI‑powered safety reports and dynamic routing",
      bullets: [
        "Won Best Startup Hack at HackViolet 2025",
        "Implemented custom routing to avoid high‑risk areas, improving pedestrian safety",
        "Built real‑time heatmaps and crowdsourced reporting with Supabase and a data‑decay model",
      ],
      tech:   ["React Native","JavaScript","Supabase","Nativewind"],
      source: "https://devpost.com/software/safewalk-gh3dk8",
    },
    {
      name:  "Ditch | Hoohacks 2024",
      date:  "Mar 2024",
      desc:  "Automated subscription cancellations via AI‑driven phone calls to save user effort",
      bullets: [
        "Reduced manual cancellation effort by over 500 hours through automated Twilio calls",
        "Built a Node.js backend with Twilio, GPT API, ElevenLabs, Deepgram, and AWS",
        "Designed a user‑friendly frontend for one‑click subscription management",
      ],
      tech:   ["JavaScript","Node.js","Twilio","Deepgram","GPT API","ElevenLabs","AWS"],
      source: "https://github.com/ramankc6/ditch",
    },
    {
      name:  "Envo | VTHacksX AI Environmental Chatbot",
      date:  "Nov 2022",
      desc:  "Created an ML chatbot to estimate car carbon emissions with 95%+ accuracy",
      bullets: [
        "Trained a model on 9 000+ cars, achieving over 95% prediction accuracy",
        "Integrated Twilio messaging for real‑time user interactions",
        "Placed 3rd in the Environmental ML category at VTHacksX",
      ],
      tech: ["Python","JavaScript","AI/ML","Twilio"],
      link: null,
    },
    {
      name:  "Wheelie Control System",
      date:  "Apr 2025",
      desc:  "Designed a real-time control system to stabilize and limit motorcycle wheelies for improved rider safety",
      bullets: [
        "Implemented an onboard IMU-based feedback loop to detect lift angles",
        "Built a PID control algorithm to dynamically adjust throttle output",
        "Tested system on simulation and prototype rig, reducing unintended wheelies by 80%",
      ],
      tech:   ["C++", "Python", "Embedded Systems", "PID Control", "IMU", "ROS"],
      source: null,
    },
  ];
  
  export const skills = {
    languages: [
      "JavaScript","React","Python","Java","BASH/Linux","TypeScript",
      "HTML","CSS","C","C++","React Native","Svelte","SvelteKit",
      "Flutter","Dart","Node.js","C#",
    ],
    tools: [
      "Docker","Kubernetes","Supabase","Firebase","PostgreSQL","SQL",
      "Statistics","Financial Markets","Next.js","AWS EC2","Tensorflow",
      "TailwindCSS","Expo","NativeWind","Mapbox","Unity","UnityXR",
      "PyTorch","Figma",
    ],
  };
  