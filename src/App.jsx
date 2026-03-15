import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(["a", "d"]); // Başlangıç görevleri
  const [input, setInput] = useState("");

  // Yeni görev ekleme
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  // Görevi silme
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Görevi düzenleme
  const editTask = (index) => {
    const newTask = prompt("Görevi düzenle:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = newTask.trim();
      setTasks(updatedTasks);
    }
  };

  // Tüm görevleri temizleme
  const clearTasks = () => setTasks([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full bg-purple-600 text-white p-4 mb-6 rounded">
        <h1 className="text-2xl font-bold">FlowTask</h1>
        <p className="text-sm">Görevlerinizi kolayca yönetin</p>
      </header>

      {/* Input ve Ekle Butonu */}
      <div className="w-full flex mb-4 gap-2 max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev girin..."
          className="flex-1 p-2 border rounded border-gray-300"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ekle
        </button>
      </div>

      {/* Görev Listesi */}
      <div className="w-full mb-4 space-y-2 max-w-md">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-2 rounded shadow"
          >
            <span>{task}</span>
            <div className="flex gap-2">
              <button
                onClick={() => editTask(index)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Düzenle
              </button>
              <button
                onClick={() => removeTask(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* İşlem Butonları */}
      <div className="w-full flex gap-2 mb-4 max-w-md">
        <button
          onClick={addTask}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Yeni Görev Ekle (Deneme)
        </button>
        <button
          onClick={clearTasks}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Temizle
        </button>
      </div>

      {/* Bilgi kutusu */}
      <div className="w-full bg-blue-100 text-blue-700 p-2 rounded mb-4 max-w-md">
        Bu bir örnek bilgi kutusudur.
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-200 text-gray-600 text-center p-4 rounded">
        © 2026 FlowTask. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

export default App;