// script.js
(function () {
    "use strict";

    const chatMessages = document.getElementById("chatMessages");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const typingArea = document.getElementById("typingArea");

    // Abrir e fechar chat
    const chatToggle = document.getElementById("chatToggle");
    const chatContainer = document.getElementById("chatContainer");
    const closeChat = document.getElementById("closeChat");

    const BOT_DELAY = 700;

    // Chat inicia fechado
    chatContainer.style.display = "none";

    // Abrir chat
    chatToggle.addEventListener("click", () => {
        chatContainer.style.display = "flex";
        chatToggle.style.display = "none";
        userInput.focus();
    });

    // Fechar chat
    closeChat.addEventListener("click", () => {
        chatContainer.style.display = "none";
        chatToggle.style.display = "flex";
    });

    // Adicionar mensagem
    function addMessage(text, sender) {

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);

        const textNode = document.createElement("span");
        textNode.innerHTML = text;
        messageDiv.appendChild(textNode);

        const time = document.createElement("div");
        time.classList.add("time");

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        time.textContent = `${hours}:${minutes}`;

        messageDiv.appendChild(time);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mostrar "digitando..."
    function showTyping(show) {
        typingArea.style.display = show ? "block" : "none";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Respostas do Dentix
    function getBotResponse(userMsg) {

        const lower = userMsg.toLowerCase().trim();

        if (lower.includes("oi") || lower.includes("olá") || lower.includes("bom dia") || lower.includes("boa tarde") || lower.includes("boa noite")) {
            return "Olá! 🦷 Eu sou o <strong>Dentix</strong>, assistente virtual da clínica odontológica. Como posso ajudar você hoje?";
        }

        if (lower.includes("consulta") || lower.includes("agendar") || lower.includes("marcar")) {
            return "📅 Claro! Para agendar sua consulta informe seu nome, telefone e a data desejada.";
        }

        if (lower.includes("limpeza")) {
            return "✨ A limpeza dental remove placa bacteriana e tártaro. Recomendamos realizá-la a cada 6 meses.";
        }

        if (lower.includes("clareamento")) {
            return "😁 Realizamos clareamento dental após avaliação clínica.";
        }

        if (lower.includes("aparelho")) {
            return "🦷 Trabalhamos com aparelhos metálicos, estéticos e alinhadores transparentes.";
        }

        if (lower.includes("implante")) {
            return "🦷 Os implantes dentários substituem dentes perdidos e devolvem seu sorriso.";
        }

        if (lower.includes("canal")) {
            return "😷 O tratamento de canal elimina a infecção e preserva o dente.";
        }

        if (lower.includes("extração") || lower.includes("extrair")) {
            return "🦷 As extrações são realizadas após avaliação do dentista.";
        }

        if (lower.includes("dor")) {
            return "🚨 Caso esteja com dor intensa, recomendamos atendimento o quanto antes.";
        }

        if (lower.includes("convênio") || lower.includes("convenio")) {
            return "💳 Atendemos consultas particulares e alguns convênios.";
        }

        if (lower.includes("horário") || lower.includes("horario")) {
            return "🕒 Funcionamos de segunda a sexta das 08h às 18h e aos sábados das 08h às 12h.";
        }

        if (lower.includes("telefone") || lower.includes("contato") || lower.includes("whatsapp")) {
            return "📞 (11) 4000-1234<br>📱 WhatsApp: (11) 99999-1234";
        }

        if (lower.includes("endereço") || lower.includes("endereco")) {
            return "📍 Rua das Flores, 123 - Centro - São Paulo/SP.";
        }

        if (lower.includes("valor") || lower.includes("preço") || lower.includes("preco")) {
            return "💰 Os valores dependem do tratamento. Agende uma avaliação para receber um orçamento.";
        }

        if (lower.includes("obrigado") || lower.includes("obrigada") || lower.includes("valeu")) {
            return "😊 Eu que agradeço! Estou sempre à disposição.";
        }

        if (lower.includes("tchau") || lower.includes("adeus")) {
            return "👋 Até logo! Obrigado por conversar com o Dentix.";
        }

        const respostas = [
            "🦷 Posso ajudar com consultas, tratamentos, horários e dúvidas.",
            "😊 Não entendi muito bem. Pode reformular sua pergunta?",
            "💙 Pergunte sobre limpeza, implantes, aparelhos, canal ou clareamento.",
            "✨ Estou aqui para ajudar você a cuidar do seu sorriso!"
        ];

        return respostas[Math.floor(Math.random() * respostas.length)];
    }

    // Enviar mensagem
    function handleSend() {

        const text = userInput.value.trim();

        if (!text) return;

        addMessage(text, "user");

        userInput.value = "";

        showTyping(true);

        setTimeout(() => {

            showTyping(false);

            const reply = getBotResponse(text);

            addMessage(reply, "bot");

        }, BOT_DELAY);
    }

    // Eventos
    sendBtn.addEventListener("click", handleSend);

    userInput.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            handleSend();

        }

    });

})();
