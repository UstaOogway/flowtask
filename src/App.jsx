import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#16171d] text-[#9ca3af] flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-2 text-[#f3f4f6]">FlowTask</h1>
      <p className="mb-6 text-lg">Görev yönetim uygulaması</p>

      {/* Input ve Ekle Butonu */}
      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev girin..."
          className="flex-1 p-2 rounded border border-[#2e303a] bg-[#1f2028] text-[#f3f4f6]"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 rounded bg-[#c084fc] text-[#f3f4f6] hover:bg-[#a855f7] transition"
        >
          Ekle
        </button>
      </div>

      {/* Görev Listesi */}
      <div className="w-full max-w-md space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 rounded bg-[#1f2028] border border-[#2e303a] shadow"
          >
            <span>{task}</span>
            <button
              onClick={() => removeTask(index)}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;