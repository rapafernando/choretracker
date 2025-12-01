export type Household = {
  id: string;
  name: string;
  timezone: string;
  guardians: string[];
  children: string[];
  chores: { id: string; title: string; cadence: string; assignee: string }[];
  calendar: { id: string; title: string; date: string; owner: string }[];
};

const households: Household[] = [
  {
    id: "household-1",
    name: "Doe household",
    timezone: "America/Los_Angeles",
    guardians: ["Jamie Doe", "Pat Doe"],
    children: ["Avery", "Noah"],
    chores: [
      { id: "c1", title: "Dishes", cadence: "Daily", assignee: "Jamie" },
      { id: "c2", title: "Laundry", cadence: "Weekly", assignee: "Pat" },
      { id: "c3", title: "Trash & recycling", cadence: "Tue/Fri", assignee: "Avery" }
    ],
    calendar: [
      { id: "ev1", title: "Grocery pickup", date: "2024-08-15", owner: "Jamie" },
      { id: "ev2", title: "Parent/teacher conference", date: "2024-08-17", owner: "Pat" },
      { id: "ev3", title: "Piano recital", date: "2024-08-21", owner: "Avery" }
    ]
  }
];

export async function getHouseholdContext(id: string) {
  const household = households.find((home) => home.id === id);
  if (!household) {
    throw new Error(`Household ${id} not found`);
  }

  return household;
}

export async function listHouseholds() {
  return households;
}
