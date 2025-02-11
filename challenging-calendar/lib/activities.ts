interface Activity {
  keyword: string;
  activity: string;
}

type Activities = {
  [key: number]: Activity;
}

export const activities: Activities = {
  1: { keyword: "Relax", activity: "Take a 20-minute bath with essential oils" },
  2: { keyword: "Meditate", activity: "Practice mindfulness meditation for 10 minutes" },
  3: { keyword: "Journal", activity: "Write three things you're grateful for" },
  4: { keyword: "Connect", activity: "Call a friend you haven't spoken to in a while" },
  5: { keyword: "Exercise", activity: "Take a 15-minute walk in nature" },
  6: { keyword: "Create", activity: "Draw, paint, or color for 30 minutes" },
  7: { keyword: "Read", activity: "Read a chapter of your favorite book" },
  8: { keyword: "Nourish", activity: "Cook a healthy meal from scratch" },
  9: { keyword: "Stretch", activity: "Do 10 minutes of gentle stretching" },
  10: { keyword: "Unplug", activity: "Take a 2-hour break from screens" },
  11: { keyword: "Sleep", activity: "Go to bed 30 minutes earlier than usual" },
  12: { keyword: "Breathe", activity: "Practice deep breathing exercises" },
  13: { keyword: "Dance", activity: "Dance to your favorite song" },
  14: { keyword: "Learn", activity: "Learn something new for 15 minutes" },
  15: { keyword: "Clean", activity: "Declutter one small space" },
  16: { keyword: "Music", activity: "Listen to calming music" },
  17: { keyword: "Nature", activity: "Spend time outdoors" },
  18: { keyword: "Write", activity: "Write a letter to yourself" },
  19: { keyword: "Hydrate", activity: "Drink 8 glasses of water" },
  20: { keyword: "Rest", activity: "Take a 15-minute power nap" },
  21: { keyword: "Plan", activity: "Set three goals for next week" },
  22: { keyword: "Love", activity: "Do something kind for yourself" },
  23: { keyword: "Move", activity: "Try a new form of exercise" },
  24: { keyword: "Create", activity: "Start a new creative project" },
  25: { keyword: "Reflect", activity: "Write about your achievements" },
  26: { keyword: "Balance", activity: "Practice standing on one leg" },
  27: { keyword: "Laugh", activity: "Watch your favorite comedy" },
  28: { keyword: "Dream", activity: "Visualize your ideal future" },
  // ... add more activities up to day 90
}
  
  