import { registerSlashCommand } from "../../../slash-commands.js";
import { saveChatDebounced, chat, renderChat } from "../../../../script.js";

// Регистрация команды /delstart
registerSlashCommand(
    "delstart",
    (args) => {
        const numToDelete = parseInt(args);
        
        if (isNaN(numToDelete) || numToDelete <= 0) {
            toastr.error("Укажи число: сколько сообщений удалить. Пример: /delstart 50");
            return;
        }

        // Проверяем, чтобы не удалить больше, чем есть (оставляя хотя бы 1 сообщение помимо приветственного)
        if (numToDelete >= chat.length - 1) {
            toastr.warning("Нельзя удалить всё! Оставь хотя бы одно сообщение.");
            return;
        }

        // Удаляем сообщения начиная с индекса 1 (индекс 0 — это описание персонажа/приветствие)
        chat.splice(1, numToDelete);

        // Сохраняем изменения в файл и перерисовываем чат
        saveChatDebounced();
        renderChat();

        toastr.success(`Удалено ${numToDelete} сообщений из начала чата.`);
    },
    [],
    "Удаляет указанное количество сообщений с начала чата (сохраняя приветствие).",
    true
);

