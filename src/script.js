// Elementleri seç
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// 🔹 a) Sayfa açıldığında localStorage'dan görevleri yükle
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(taskText => {
    addTaskToDOM(taskText);
  });
});

// 🔹 b) Görev ekleme ve localStorage'a kaydetme
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToDOM(taskText);

    // Mevcut görevleri al ve yeni eklenenle güncelle
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    currentTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(currentTasks));

    taskInput.value = ""; // inputu temizle
  }
});

// 🔹 c) Görevleri DOM'a ekleyen yardımcı fonksiyon
function addTaskToDOM(taskText) {
  let taskContent = taskText; // Güncelleme için referans

  const li = document.createElement("li");
  li.textContent = taskContent;

  // Adım 4: Shadow, padding ve hover efektleri
  li.className = "p-3 bg-white rounded-md shadow-md mb-2 flex justify-between items-center hover:shadow-lg transition-shadow duration-200";

  // Tıklayınca tamamlandı olarak işaretleme
  li.addEventListener("click", () => {
    li.classList.toggle("line-through"); // üstü çizili
    li.classList.toggle("text-gray-400"); // rengi gri yap
  });

  // 🔹 Adım 5: Düzenle (Edit) butonu
  const editBtn = document.createElement("button");
  editBtn.textContent = "Düzenle";
  editBtn.className = "bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded ml-2";
  editBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // "tamamlandı" click eventini tetiklememesi için
    const newTask = prompt("Görevi düzenle:", taskContent);
    if (newTask && newTask.trim() !== "") {
      // DOM'u güncelle
      li.firstChild.textContent = newTask;

      // Local Storage'ı güncelle
      const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = currentTasks.map(t => t === taskContent ? newTask : t);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      taskContent = newTask; // referansı güncelle
    }
  });

  // Silme butonu
  const delBtn = document.createElement("button");
  delBtn.textContent = "Sil";
  delBtn.className = "bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded ml-2";
  delBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // tıklama üstüne eklenen "line-through"u tetiklememesi için
    li.remove();

    // localStorage'dan sil
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = currentTasks.filter(t => t !== taskContent);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  });

  // Butonları ekle
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  taskList.appendChild(li);

  // Temizle butonu
const clearBtn = document.getElementById("clearTasks");

clearBtn.addEventListener("click", () => {
  taskList.innerHTML = ""; // tüm görevleri DOM'dan sil
  localStorage.removeItem("tasks"); // localStorage'ı temizle
});
}
