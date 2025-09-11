---
title: Personal home
aliases:
  - My dashboard
tags:
  - main/personal
draft: true
publish: false
---
#  Personal Dashboardhboard

> [!quote] Thought of the Day
> "Life is what happens while you're busy making other plans." : 삶이란 다른 계획을 세우느라 바쁠 때 일어나는 일이다.


> [!warning] **Important Notice**
> - This dashboard is just an example, which assumes notes that don't exist in your vault and the "Dataview" plugin.
> - Please adapt it to your use.
> - Take this as inspiration to create your own dashboard.


## 🌅 Quick Links


## 🎯 Focus Areas

> [!info] Active Studies
> - [[02 - Knowledge/Computing/Cybersecurity|🔒 Cybersecurity]]
> - [[02 - Knowledge/Computing/Development|💻 Development]]
> - [[02 - Knowledge/Humanities/Stoicism|📚 Stoicism]]

> [!tip] Ongoing Projects
> - [[03 - Projects/Project 1|🚀 Main Project]]
> - [[03 - Projects/Project 2|🎮 Game Dev]]
> - [[Tasks#In Progress|📋 View All]]

## 💪 Health & Wellness

> [!success] Routines & Habits
> ```dataview
> TASK FROM "01 - Personal/Routine"
> WHERE !completed
> LIMIT 5
> ```

> [!note] Upcoming Workouts
> ```dataview
> LIST FROM #type/workout AND #status/in-progress
> LIMIT 3
> ```

## 📚 Continuous Learning

> [!note] Latest Study Notes
> ```dataview
> TABLE file.ctime as "Created"
> FROM "02 - Knowledge"
> SORT file.ctime DESC
> LIMIT 3
> ```

---
## ⚡ Quick Capture
- [ ] New Task
- [ ] New Idea
- [ ] New Project

---
*Last updated: {{date}}*