import { useEffect, useState } from "react";
import { AuthPanel } from "./components/AuthPanel";
import { Header } from "./components/Header";
import { DashboardHero } from "./sections/DashboardHero";
import { PlannerBoard } from "./sections/PlannerBoard";
import { GroupWorkspace } from "./sections/GroupWorkspace";
import { ReelsShowcase } from "./sections/ReelsShowcase";
import { AnalyticsPanel } from "./sections/AnalyticsPanel";
import { ChatPanel } from "./sections/ChatPanel";
import { TaskManager } from "./sections/TaskManager";
import { RevisionLibrary } from "./sections/RevisionLibrary";
import { TodaysRevision } from "./sections/TodaysRevision";
import { ReminderPanel } from "./sections/ReminderPanel";
import { NotificationFeed } from "./sections/NotificationFeed";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const fallbackDashboard = {
  studentName: "Aarav",
  tasksDueToday: 4,
  focusMinutesToday: 135,
  streakDays: 12,
  completionRate: 82.5,
  priorityTasks: [
    { id: 1, title: "Discrete Math Assignment", subject: "Mathematics", dueDate: "2026-04-08", status: "IN_PROGRESS", progress: 65 },
    { id: 2, title: "Database ER Diagram", subject: "DBMS", dueDate: "2026-04-09", status: "NOT_STARTED", progress: 15 }
  ],
  groups: [
    { id: 1, name: "Algo Sprint", topic: "Problem Solving", activeMembers: 8, nextSession: "Today, 7:30 PM" }
  ],
  reels: [
    { id: 1, title: "Binary Search in 60 seconds", subject: "DSA", duration: "01:00", takeaway: "Spot sorted-array patterns faster" }
  ]
};

const fallbackPlanner = [
  { timeSlot: "6:30 PM - 7:15 PM", title: "Finish discrete math proofs", purpose: "High-priority assignment before deadline" },
  { timeSlot: "7:30 PM - 8:15 PM", title: "Join Algo Sprint live session", purpose: "Collaborative revision and accountability" }
];

const fallbackGeneratedPlan = {
  subject: "DBMS",
  deadline: "2026-04-10",
  recommendation: "Split the session between concept revision, active recall, and timed practice.",
  slots: [
    {
      block: "Block 1",
      duration_minutes: 40,
      task: "Review DBMS fundamentals and concept definitions",
      focus: "Normalization"
    },
    {
      block: "Block 2",
      duration_minutes: 30,
      task: "Write short notes and test recall on SQL joins",
      focus: "SQL joins"
    },
    {
      block: "Block 3",
      duration_minutes: 50,
      task: "Solve timed DBMS practice questions and review mistakes",
      focus: "exam readiness"
    }
  ]
};

const fallbackTasks = [
  {
    id: 1,
    userId: 1,
    title: "Discrete Math Assignment",
    subject: "Mathematics",
    description: "Complete induction and recurrence questions.",
    dueDate: "2026-04-08",
    status: "IN_PROGRESS",
    priority: "HIGH",
    progress: 65
  },
  {
    id: 2,
    userId: 1,
    title: "Database ER Diagram",
    subject: "DBMS",
    description: "Prepare schema draft for mini project.",
    dueDate: "2026-04-09",
    status: "NOT_STARTED",
    priority: "HIGH",
    progress: 15
  }
];

const fallbackQuiz = {
  reelId: 1,
  title: "Binary Search in 60 seconds",
  questions: [
    {
      question: "What is the main pattern binary search depends on?",
      options: ["Sorted data", "Random scanning", "Hash collisions", "Graph traversal"],
      answer: "Sorted data"
    },
    {
      question: "What is the best next action after watching the reel?",
      options: ["Practice a sorted-array problem", "Skip revision", "Ignore edge cases", "Avoid dry runs"],
      answer: "Practice a sorted-array problem"
    }
  ],
  selectedAnswers: {},
  submitted: false,
  score: null
};

const storedUser = (() => {
  try {
    const raw = localStorage.getItem("student-reel-user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

export default function App() {
  const [user, setUser] = useState(storedUser);
  const [dashboard, setDashboard] = useState(fallbackDashboard);
  const [planner, setPlanner] = useState(fallbackPlanner);
  const [tasks, setTasks] = useState(fallbackTasks);
  const [taskLoading, setTaskLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(fallbackGeneratedPlan);
  const [plannerLoading, setPlannerLoading] = useState(false);
  const [reels, setReels] = useState(fallbackDashboard.reels);
  const [savedReels, setSavedReels] = useState([]);
  const [dueReels, setDueReels] = useState([]);
  const [quizState, setQuizState] = useState(fallbackQuiz);
  const [quizLoading, setQuizLoading] = useState(null);
  const [saveLoading, setSaveLoading] = useState(null);
  const [reminderLoading, setReminderLoading] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [readLoading, setReadLoading] = useState(null);

  const loadDashboard = async () => {
    const dashboardResponse = await fetch(`${apiBaseUrl}/api/dashboard?userId=${user?.userId}`);
    if (dashboardResponse.ok) {
      setDashboard(await dashboardResponse.json());
    }
  };

  const loadPlanner = async () => {
    const plannerResponse = await fetch(`${apiBaseUrl}/api/dashboard/planner`);
    if (plannerResponse.ok) {
      setPlanner(await plannerResponse.json());
    }
  };

  const loadTasks = async () => {
    const tasksResponse = await fetch(`${apiBaseUrl}/api/tasks?userId=${user?.userId}`);
    if (tasksResponse.ok) {
      setTasks(await tasksResponse.json());
    }
  };

  const loadReels = async () => {
    const reelsResponse = await fetch(`${apiBaseUrl}/api/reels`);
    if (reelsResponse.ok) {
      setReels(await reelsResponse.json());
    }
  };

  const loadSavedReels = async () => {
    const savedReelsResponse = await fetch(`${apiBaseUrl}/api/reels/saved?userId=${user?.userId}`);
    if (savedReelsResponse.ok) {
      setSavedReels(await savedReelsResponse.json());
    }
  };

  const loadDueReels = async () => {
    const dueReelsResponse = await fetch(`${apiBaseUrl}/api/reels/due?userId=${user?.userId}`);
    if (dueReelsResponse.ok) {
      setDueReels(await dueReelsResponse.json());
    }
  };

  const loadNotifications = async () => {
    const notificationsResponse = await fetch(`${apiBaseUrl}/api/reminders?userId=${user?.userId}`);
    if (notificationsResponse.ok) {
      setNotifications(await notificationsResponse.json());
    }
  };

  const refreshData = async () => {
    if (!user?.userId) {
      return;
    }

    try {
      setTaskLoading(true);
      await Promise.all([
        loadDashboard(),
        loadPlanner(),
        loadTasks(),
        loadReels(),
        loadSavedReels(),
        loadDueReels(),
        loadNotifications()
      ]);
    } catch (error) {
      console.warn("Using fallback data until backend is running.", error);
    } finally {
      setTaskLoading(false);
    }
  };

  const generateReelQuiz = async (reel) => {
    try {
      setQuizLoading(reel.id);
      const response = await fetch(`${apiBaseUrl}/api/reels/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: reel.title,
          subject: reel.subject,
          takeaway: reel.takeaway
        })
      });

      if (!response.ok) {
        throw new Error("Quiz generation failed");
      }

      const data = await response.json();
      setQuizState({
        reelId: reel.id,
        title: data.title,
        questions: data.questions,
        selectedAnswers: {},
        submitted: false,
        score: null
      });
    } catch (error) {
      console.warn("Using fallback reel quiz until AI services are running.", error);
      setQuizState({
        ...fallbackQuiz,
        reelId: reel.id,
        title: reel.title,
        selectedAnswers: {},
        submitted: false,
        score: null
      });
    } finally {
      setQuizLoading(null);
    }
  };

  const createReel = async (reel) => {
    const response = await fetch(`${apiBaseUrl}/api/reels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reel)
    });

    if (!response.ok) {
      throw new Error("Reel creation failed");
    }

    await refreshData();
  };

  const saveReel = async (reelId) => {
    try {
      setSaveLoading(reelId);
      const response = await fetch(`${apiBaseUrl}/api/reels/${reelId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.userId
        })
      });

      if (!response.ok) {
        throw new Error("Save reel failed");
      }

      await loadSavedReels();
      await loadDueReels();
    } catch (error) {
      console.warn("Save to revision is unavailable until the backend is running.", error);
    } finally {
      setSaveLoading(null);
    }
  };

  const recordQuizAttempt = async (reelId, score, totalQuestions) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/reels/${reelId}/attempt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.userId,
          score,
          totalQuestions
        })
      });

      if (!response.ok) {
        throw new Error("Quiz attempt save failed");
      }

      await loadSavedReels();
      await loadDueReels();
    } catch (error) {
      console.warn("Quiz attempt tracking is unavailable until the backend is running.", error);
    }
  };

  const toggleReminder = async (reelId, reminderEnabled) => {
    try {
      setReminderLoading(reelId);
      const response = await fetch(`${apiBaseUrl}/api/reels/${reelId}/reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.userId,
          reminderEnabled
        })
      });

      if (!response.ok) {
        throw new Error("Reminder update failed");
      }

      await loadSavedReels();
      await loadDueReels();
    } catch (error) {
      console.warn("Reminder update is unavailable until the backend is running.", error);
    } finally {
      setReminderLoading(null);
    }
  };

  const markNotificationRead = async (notificationId) => {
    try {
      setReadLoading(notificationId);
      const response = await fetch(`${apiBaseUrl}/api/reminders/${notificationId}/read`, {
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Mark read failed");
      }

      await loadNotifications();
    } catch (error) {
      console.warn("Notification updates are unavailable until the backend is running.", error);
    } finally {
      setReadLoading(null);
    }
  };

  const selectQuizAnswer = (questionIndex, option) => {
    setQuizState((current) => ({
      ...current,
      selectedAnswers: {
        ...(current?.selectedAnswers || {}),
        [questionIndex]: option
      }
    }));
  };

  const submitQuizAttempt = async (reelId) => {
    if (!quizState?.questions?.length) {
      return;
    }

    const score = quizState.questions.reduce((total, question, index) => {
      return total + (quizState.selectedAnswers?.[index] === question.answer ? 1 : 0);
    }, 0);

    setQuizState((current) => ({
      ...current,
      submitted: true,
      score
    }));

    await recordQuizAttempt(reelId, score, quizState.questions.length);
  };

  useEffect(() => {
    if (user?.userId) {
      refreshData();
    }
  }, [user]);

  const createTask = async (task) => {
    const response = await fetch(`${apiBaseUrl}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...task,
        userId: user.userId
      })
    });

    if (!response.ok) {
      throw new Error("Task creation failed");
    }

    await refreshData();
  };

  const updateTask = async (taskId, task) => {
    const response = await fetch(`${apiBaseUrl}/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.userId,
        title: task.title,
        subject: task.subject,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
        progress: task.progress
      })
    });

    if (!response.ok) {
      throw new Error("Task update failed");
    }

    await refreshData();
  };

  const deleteTask = async (taskId) => {
    const response = await fetch(`${apiBaseUrl}/api/tasks/${taskId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Task delete failed");
    }

    await refreshData();
  };

  const generatePlan = async (planInput) => {
    try {
      setPlannerLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/ai/study-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: planInput.subject,
          availableHours: planInput.availableHours,
          weakAreas: planInput.weakAreas
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          deadline: planInput.deadline
        })
      });

      if (!response.ok) {
        throw new Error("Planner generation failed");
      }

      setGeneratedPlan(await response.json());
    } catch (error) {
      console.warn("Using fallback generated plan until AI services are running.", error);
      setGeneratedPlan({
        ...fallbackGeneratedPlan,
        subject: planInput.subject || fallbackGeneratedPlan.subject,
        deadline: planInput.deadline || fallbackGeneratedPlan.deadline
      });
    } finally {
      setPlannerLoading(false);
    }
  };

  const handleAuthSuccess = (authUser) => {
    setUser(authUser);
    localStorage.setItem("student-reel-user", JSON.stringify(authUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("student-reel-user");
    setTasks(fallbackTasks);
    setDashboard(fallbackDashboard);
    setGeneratedPlan(fallbackGeneratedPlan);
    setReels(fallbackDashboard.reels);
    setSavedReels([]);
    setDueReels([]);
    setNotifications([]);
    setQuizState(fallbackQuiz);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-canvas px-4 py-10 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Header user={null} />
          <AuthPanel onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Header onLogout={handleLogout} user={user} />
        <DashboardHero dashboard={dashboard} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <PlannerBoard
            generatedPlan={generatedPlan}
            loading={plannerLoading}
            onGeneratePlan={generatePlan}
            planner={planner}
            tasks={dashboard.priorityTasks}
          />
          <ChatPanel />
        </div>
        <div className="mt-6">
          <TaskManager
            loading={taskLoading}
            onCreateTask={createTask}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
            tasks={tasks}
          />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GroupWorkspace groups={dashboard.groups} />
          <AnalyticsPanel dashboard={dashboard} />
        </div>
        <div className="mt-6">
          <TodaysRevision dueReels={dueReels} />
        </div>
        <div className="mt-6">
          <ReminderPanel dueReels={dueReels} />
        </div>
        <div className="mt-6">
          <NotificationFeed
            notifications={notifications}
            onMarkRead={markNotificationRead}
            readLoading={readLoading}
          />
        </div>
        <div className="mt-6">
          <RevisionLibrary
            onToggleReminder={toggleReminder}
            reminderLoading={reminderLoading}
            savedReels={savedReels}
          />
        </div>
        <div className="mt-6">
          <ReelsShowcase
            onCreateReel={createReel}
            onGenerateQuiz={generateReelQuiz}
            onSelectAnswer={selectQuizAnswer}
            onSubmitQuiz={submitQuizAttempt}
            onSaveReel={saveReel}
            quizLoading={quizLoading}
            quizState={quizState}
            reels={reels}
            saveLoading={saveLoading}
          />
        </div>
      </div>
    </div>
  );
}
