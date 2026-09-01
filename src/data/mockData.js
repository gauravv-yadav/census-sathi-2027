export const mockAdminStats = {
  totalHouseholds: 250000000,
  completedHouseholds: 185000000,
  pendingHouseholds: 65000000,
  selfEnumerated: 45000000,
  enumeratorAssisted: 140000000,
  completionTrend: [
    { name: 'Week 1', completed: 10 },
    { name: 'Week 2', completed: 25 },
    { name: 'Week 3', completed: 45 },
    { name: 'Week 4', completed: 75 },
    { name: 'Week 5', completed: 120 },
    { name: 'Week 6', completed: 185 },
  ],
  commonQuestions: [
    "Do I need an ID card to participate?",
    "How to securely self-enumerate online?",
    "What if I'm not home when the representative visits?",
    "Is my data encrypted and safe?"
  ],
  regionalAlerts: [
    { region: "North Zone - Sector 4", issue: "Low self-enumeration rate", severity: "medium" },
    { region: "South Zone - District 9", issue: "High misinformation reports", severity: "high" },
    { region: "East Zone - Sector 2", issue: "Field agents require translation support", severity: "medium" }
  ]
};

export const mockMisinformationDb = {
  "platform will delete ration cards": {
    status: "False",
    reasoning: "This platform is purely for demographic and statistical purposes. It has no connection to the issuance, modification, or deletion of any civil benefits or cards. It is against our policies to use data for targeting individuals.",
    source: "Platform 2027 Guidelines, Chapter 2, Data Privacy"
  },
  "is it true I have to pay rs 100 for self enumeration?": {
    status: "False",
    reasoning: "Participation is completely free of charge. No official or field agent will ever ask for money or banking details.",
    source: "Platform FAQs 2027"
  },
  "self enumeration deadline extended": {
    status: "Verified",
    reasoning: "The platform administration has officially extended the self-enumeration portal access until November 15th, 2027.",
    source: "Platform Update No. 45"
  },
  "submitting data will increase my taxes": {
    status: "False",
    reasoning: "Data collected is fully anonymized and aggregated. It is strictly prohibited from being shared with tax authorities or financial institutions.",
    source: "Data Protection Charter, Section 4"
  }
};

export const mockQuestions = [
  {
    id: "q1",
    questionText: "What is your primary source of drinking water?",
    options: ["Tap Water (Treated)", "Tap Water (Untreated)", "Covered Well", "Handpump / Tube well", "Other"],
    aiExplanation: "We want to know where you get most of the water you drink every day. 'Treated' means it has been cleaned by a municipal or local facility."
  },
  {
    id: "q2",
    questionText: "What is the main material of the roof of your house?",
    options: ["Concrete (RCC)", "Tiles / Slate", "Tin / Metal sheets", "Thatch / Grass / Bamboo", "Other"],
    aiExplanation: "Look at your ceiling or roof. If it is a solid cement roof, choose 'Concrete'. If it has corrugated metal sheets, choose 'Tin'."
  },
  {
    id: "q3",
    questionText: "What is the ownership status of this dwelling?",
    options: ["Owned", "Rented", "Provided by Employer", "Other"],
    aiExplanation: "Select 'Owned' if the house belongs to a member of the household. Select 'Rented' if you pay a landlord to live here."
  },
  {
    id: "q4",
    questionText: "How many living rooms does this household occupy?",
    options: ["One", "Two", "Three", "Four or more"],
    aiExplanation: "Count bedrooms and living rooms. Do not count bathrooms, kitchens, or open balconies."
  },
  {
    id: "q5",
    questionText: "What is the main source of lighting for the household?",
    options: ["Electricity", "Solar Energy", "Kerosene", "Other / No Lighting"],
    aiExplanation: "Select the primary way you light your home at night. If you use the grid power line, select 'Electricity'."
  },
  {
    id: "q6",
    questionText: "What type of latrine facility is used by the household?",
    options: ["Flush to Piped Sewer", "Flush to Septic Tank", "Pit Latrine", "Public / Shared Facility", "Open Defecation"],
    aiExplanation: "Choose how your household's toilet operates. 'Septic Tank' means the waste goes to an underground tank on your property."
  },
  {
    id: "q7",
    questionText: "What is the main fuel used for cooking?",
    options: ["LPG / PNG (Gas)", "Electricity", "Firewood / Chips", "Biogas", "Kerosene / Other"],
    aiExplanation: "Select the primary fuel used on your stove. Gas cylinders count as 'LPG'."
  },
  {
    id: "q8",
    questionText: "Do you have a dedicated kitchen facility?",
    options: ["Yes, inside the house", "Yes, outside the house", "No dedicated kitchen"],
    aiExplanation: "A dedicated kitchen is a specific room or defined space used exclusively for cooking meals."
  },
  {
    id: "q9",
    questionText: "How many married couples live in this household?",
    options: ["None", "One", "Two", "Three or more"],
    aiExplanation: "Count the total number of married couples residing permanently in this exact house."
  },
  {
    id: "q10",
    questionText: "What is the primary language spoken at home?",
    options: ["English", "Hindi", "Regional Language", "Other"],
    aiExplanation: "Select the language that household members use most frequently to communicate with each other inside the house."
  },
  {
    id: "q11",
    questionText: "What is the highest educational qualification attained by the head of the household?",
    options: ["No formal schooling", "Primary / Middle School", "High School", "Graduate / Postgraduate", "Diploma / Certificate"],
    aiExplanation: "Identify the main earner or decision-maker (head), and select the highest level of education they successfully completed."
  },
  {
    id: "q12",
    questionText: "What is the main source of income for this household?",
    options: ["Agriculture / Farming", "Salaried Employment", "Business / Self-Employed", "Daily Wages", "Pension / Other"],
    aiExplanation: "Select the activity that brings in the majority of the money used to support the household."
  },
  {
    id: "q13",
    questionText: "Does the household have access to a broadband internet connection?",
    options: ["Yes, fixed broadband (Wi-Fi)", "Yes, mobile internet only", "No internet access"],
    aiExplanation: "If you have a router in your house, select 'fixed broadband'. If you only use data on your phone, select 'mobile internet'."
  },
  {
    id: "q14",
    questionText: "Which of these vehicles are owned by the household?",
    options: ["Bicycle only", "Two-wheeler (Scooter/Bike)", "Four-wheeler (Car/Jeep)", "None"],
    aiExplanation: "Select the highest category of vehicle owned. For example, if you own both a bike and a car, select 'Four-wheeler'."
  },
  {
    id: "q15",
    questionText: "Are there any persons with disabilities residing in the household?",
    options: ["Yes", "No", "Prefer not to say"],
    aiExplanation: "This helps local planners ensure that infrastructure like ramps, healthcare, and support programs are allocated to your area."
  }
];

export const mockEnumeratorTasks = [
  { id: 1, household: "Residence 12-A, Block B", status: "Pending", contact: "9876543210" },
  { id: 2, household: "Residence 14-C, Block B", status: "Incomplete", issue: "Requires translation support", contact: "9876543211" },
  { id: 3, household: "Residence 15-D, Block B", status: "Completed", contact: "9876543212" },
  { id: 4, household: "Residence 16-E, Block C", status: "Pending", contact: "9876543213" },
  { id: 5, household: "Residence 18-F, Block C", status: "Incomplete", issue: "Residents not home", contact: "9876543214" }
];
