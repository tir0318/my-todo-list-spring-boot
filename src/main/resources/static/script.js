// DOM要素を取得
const todoForm = document.getElementById('add-todo-form');
const todoInput = document.getElementById('new-todo-input');
const todoList = document.getElementById('todo-list');

// APIのベースURL
const API_URL = 'http://localhost:8080';

// --- 関数定義 ---

// サーバーからTODOリストを取得して画面に表示する関数
async function fetchAndRenderTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) {
            console.error('データの取得に失敗しました。');
            todoList.innerHTML = '<li>データの読み込みに失敗しました。サーバーを確認してください。</li>';
            return;
        }
        const todos = await response.json();
        todoList.innerHTML = '';
        if (todos.length === 0) {
            todoList.innerHTML = '<li class="empty-message">タスクはまだありません！</li>';
        } else {
            todos.forEach(todo => {
                const listItem = createTodoElement(todo);
                todoList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('通信エラー:', error);
        todoList.innerHTML = '<li>通信エラーが発生しました。サーバーが起動しているか確認してください。</li>';
    }
}

// TODOデータからHTML要素を作成する関数
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = todo.completed;

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.textContent = todo.task;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = todo.task;
    editInput.setAttribute('spellcheck', 'false'); // ★スペルチェックを無効化

    taskWrapper.appendChild(taskSpan);
    taskWrapper.appendChild(editInput);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.setAttribute('aria-label', 'Delete task');

    li.appendChild(checkbox);
    li.appendChild(taskWrapper);
    li.appendChild(deleteBtn);

    return li;
}

// 編集モードを有効にする関数
function enterEditMode(listItem) {
    listItem.classList.add('editing');
    const editInput = listItem.querySelector('.edit-input');
    editInput.focus();
    const textLength = editInput.value.length;
    editInput.setSelectionRange(textLength, textLength);
}

// 編集を保存する関数
async function saveEdit(listItem) {
    const id = listItem.dataset.id;
    const editInput = listItem.querySelector('.edit-input');
    const taskSpan = listItem.querySelector('.task');
    const checkbox = listItem.querySelector('.checkbox');
    const newText = editInput.value.trim();

    if (newText === '' || newText === taskSpan.textContent) {
        cancelEdit(listItem);
        return;
    }

    const updatedTodo = { task: newText, completed: checkbox.checked };

    try {
        const response = await fetch(`${API_URL}/todo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo),
        });
        if (!response.ok) {
            console.error('編集の保存に失敗しました。');
            cancelEdit(listItem);
            return;
        }
        taskSpan.textContent = newText;
        listItem.classList.remove('editing');
    } catch (error) {
        console.error('通信エラー:', error);
        cancelEdit(listItem);
    }
}

// 編集をキャンセルする関数
function cancelEdit(listItem) {
    const editInput = listItem.querySelector('.edit-input');
    const taskSpan = listItem.querySelector('.task');
    editInput.value = taskSpan.textContent;
    listItem.classList.remove('editing');
}


// --- イベントリスナーの設定 ---

document.addEventListener('DOMContentLoaded', fetchAndRenderTodos);

todoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText === '') return;
    try {
        const response = await fetch(`${API_URL}/todo`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task: taskText, completed: false }), });
        if (!response.ok) {
            console.error('タスクの追加に失敗しました。');
            return;
        }
        todoInput.value = '';
        await fetchAndRenderTodos();
    } catch (error) {
        console.error('通信エラー:', error);
    }
});

todoList.addEventListener('click', async (event) => {
    const target = event.target;
    const listItem = target.closest('.todo-item');
    if (!listItem) return;

    if (target.classList.contains('delete-btn')) {
        const id = listItem.dataset.id;
        try {
            const response = await fetch(`${API_URL}/todo/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                console.error('削除に失敗しました。');
                return;
            }
            await fetchAndRenderTodos();
        } catch (error) {
            console.error('通信エラー:', error);
        }
    } else if (target.classList.contains('checkbox')) {
        listItem.classList.toggle('completed', target.checked);
        await saveEdit(listItem);
    } else if (target.classList.contains('task')) {
        enterEditMode(listItem);
    }
});

todoList.addEventListener('keydown', async (event) => {
    const target = event.target;
    if (!target.classList.contains('edit-input')) return;
    const listItem = target.closest('.todo-item');
    if (event.key === 'Enter') {
        event.preventDefault();
        await saveEdit(listItem);
    }
    else if (event.key === 'Escape') {
        cancelEdit(listItem);
    }
});

todoList.addEventListener('focusout', async (event) => {
    const target = event.target;
    if (!target.classList.contains('edit-input')) return;
    const listItem = target.closest('.todo-item');
    await saveEdit(listItem);
});