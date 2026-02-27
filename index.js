(function() {
    const ExtensionName = "delstart-cleaner";

    function delstartCommand(args, value) {
        const numToDelete = parseInt(value);
        const context = SillyTavern.getContext();
        const chat = context.chat;

        if (isNaN(numToDelete) || numToDelete <= 0) {
            toastr.error("Укажи число сообщений. Пример: /delstart 10");
            return "";
        }

        if (chat.length <= 1) {
            toastr.warning("Чат пуст или содержит только приветствие.");
            return "";
        }

        // Ограничиваем, чтобы не удалить лишнего
        const actualToDelete = Math.min(numToDelete, chat.length - 1);

        // Магия удаления (индекс 1 — это первое сообщение после приветствия)
        chat.splice(1, actualToDelete);

        // Принудительное сохранение и рендер
        context.saveChat();
        context.renderChat();

        toastr.success(`Удалено сообщений: ${actualToDelete}`);
        return "";
    }

    jQuery(document).ready(() => {
        const slashCommands = SillyTavern.getExtensionsContext().slashCommands;
        slashCommands.add("delstart", delstartCommand, [], "Удаляет сообщения с начала чата", true);
        console.log("DelStart Extension Loaded");
    });
})();
