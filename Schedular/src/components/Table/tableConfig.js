//User Table configuration
export const UsertableConfigs = {
    Appointments: {
      header: ["Advisor", "Domain", "Topic", "Date"],
      fields: ["advisorId fullname", "domain", "topic", "date"],
      title: "Appointments",
      empty: "No Appointments found",
      isMeetLink: true,
    },
    "Quick Sessions": {
      header: ["Name", "Domain", "Status", "Topic", "Date"],
      fields: ["userId fullname", "domain", "status", "topic", "date"],
      title: "Quick Sessions",
      empty: "No Quick Sessions found",
      isMeetLink: true,
    },
    Batches: {
      header: ["Batch Name", "Status", "Start Date", "End Date"],
      fields: ["name", "status", "startDate", "endDate"],
      title: "Batches",
      empty: "No Batches found",
      isMeetLink: true,
    },
    "Learning Resources": {
      header: ["Task", "Status", "Due Date"],
      fields: ["taskName", "status", "dueDate"],
      title: "My Learning Material",
      empty: "No Learning Material Found",
      isMeetLink: false,
    },
    "Past Events": {
      header: ["Name", "Domain", "Is Quick", "Topic", "Date"],
      fields: ["userId fullname", "domain", "isQuick", "topic", "date"],
      title: "My Past Events",
      empty: "No Learning Material Found",
      isMeetLink: false,
    },
    // Add more tabs as needed...
  };
//Config for Advisor
export const tableConfigs = {
    Appointments: {
      header: ["Name", "Domain", "Status", "Topic", "Date"],
      fields: ["userId fullname", "domain", "status", "topic", "date"],
      title: "Appointments",
      empty: "No Appointments found",
      isMeetLink: true,
    },
    "Quick Sessions": {
      header: ["Name", "Domain", "Status", "Topic", "Date"],
      fields: ["userId fullname", "domain", "status", "topic", "date"],
      title: "Quick Sessions",
      empty: "No Quick Sessions found",
      isMeetLink: true,
    },
    Batches: {
      header: ["Batch Name", "Status", "Start Date", "End Date"],
      fields: ["name", "status", "startDate", "endDate"],
      title: "Batches",
      empty: "No Batches found",
      isMeetLink: true,
    },
    "My Tasks": {
      header: ["Task", "Status", "Due Date"],
      fields: ["taskName", "status", "dueDate"],
      title: "My Tasks",
      empty: "No Tasks found",
      isMeetLink: false,
    },
    // Add more tabs as needed...
  };
