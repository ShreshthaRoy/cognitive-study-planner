import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    setToken(data.token);
    alert("Login successful");
  };
  const signup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
  
    const data = await res.json();
    alert(data.message || "Signup successful");
  
    // switch back to login after signup
    setIsSignup(false);
  };

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, subject, priority })
      });

      alert("Task added!");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{
      fontFamily: "Arial",
      background: "#f5f6fa",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h1 style={{ textAlign: "center", color: "#2f3640" }}>
        📚 Cognitive Study Planner
      </h1>

      {/* LOGIN CARD */}
      <div style={card}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

{isSignup && (
  <input
    placeholder="Name"
    onChange={e => setName(e.target.value)}
  />
)}

<br /><br />

<input
  placeholder="Email"
  onChange={e => setEmail(e.target.value)}
/>
<br /><br />

<input
  placeholder="Password"
  type="password"
  onChange={e => setPassword(e.target.value)}
/>
<br /><br />

{isSignup ? (
  <button onClick={signup}>Signup</button>
) : (
  <button onClick={login}>Login</button>
)}

<br /><br />

<button onClick={() => setIsSignup(!isSignup)}>
  {isSignup ? "Already have an account? Login" : "New user? Signup"}
</button>
      </div>

      {/* ADD TASK CARD */}
      <div style={card}>
        <h2>➕ Add Task</h2>

        <input style={input} placeholder="Title"
          onChange={e => setTitle(e.target.value)} />

        <input style={input} placeholder="Subject"
          onChange={e => setSubject(e.target.value)} />

<select
  style={input}
  onChange={e => setPriority(e.target.value)}
>
  <option value="">Select Priority</option>
  <option value="low">🟢 Low</option>
  <option value="medium">🟠 Medium</option>
  <option value="high">🔴 High</option>
</select>

        <button style={greenBtn} onClick={createTask}>
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div style={card}>
        <h2>📋 Your Tasks</h2>

        <button style={darkBtn} onClick={getTasks}>
          Load Tasks
        </button>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map(task => (
            <li key={task._id} style={taskCard}>
              <strong>{task.title}</strong>
              <br />
              <span>{task.subject}</span>
              <br />
              <span style={{
                color:
                  task.priority === "high" ? "red" :
                  task.priority === "medium" ? "orange" : "green"
              }}>
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

/* 🎨 STYLES */

const card = {
  maxWidth: "500px",
  margin: "20px auto",
  padding: "20px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const blueBtn = {
  width: "100%",
  padding: "10px",
  background: "#0984e3",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const greenBtn = {
  width: "100%",
  padding: "10px",
  background: "#00b894",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const darkBtn = {
  width: "100%",
  padding: "10px",
  background: "#2d3436",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginBottom: "15px"
};

const taskCard = {
  padding: "12px",
  marginBottom: "10px",
  background: "#ecf0f1",
  borderRadius: "8px"
};

export default App;