document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const languageSelect = document.getElementById("language-select");

  if (!chatbotToggle || !chatbotBox || !chatMessages || !chatInput || !sendBtn) {
    console.error("❌ Elementos do chatbot não encontrados no HTML!");
    return;
  }

  let firstMessageSent = false;
  let isOpen = false;
  let currentLanguage = "pt";

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotReply(input, lang) {
    const text = input.toLowerCase();

    const respostas = {
      pt: {
        saudacao: 
          "Olá, espero que você esteja bem. Posso te contar um pouco mais sobre as habilidades, projetos ou hobbies da Sabrina?",
        habilidades:
          "A Sabrina tem experiência em engenharia de dados, HTML, Power BI, Power Automate, SQL Server e Python, com foco em automação e integração de dados.",
        projetos:
           "Muito prazer! Sou o primeiro projeto pessoal da Sabrina. Fui desenvolvido utilizando HTML, CSS e JavaScript puro (Vanilla JS). Toda a minha lógica de funcionamento — como envio e exibição de mensagens, regras de resposta, suporte a múltiplos idiomas, abertura, fechamento e minimização do chat — foi construída manualmente por ela. Os demais projetos estão em desenvolvimento e irão abordar diferentes métodos de análise de dados e automação.",
         hobbies:
          "Ela adora fazer trilhas e estar em contato com a natureza nas horas livres 🌿.",
        padrao:
          "Desculpe, não entendi. Você pode perguntar sobre *habilidades*, *projetos* ou *hobbies*."
      },
      en: {
        habilidades:
          "Sabrina has experience in data engineering, Power BI, SQL Server, and Python, focusing on automation and data integration.",
        projetos:
          "She has developed performance dashboards, VBA automations, and an AI-based school meal prediction system.",
        hobbies:
          "She loves hiking and connecting with nature in her free time 🌿.",
        saudacao: "Hello! 👋 I'm Sabrina’s virtual assistant.",
        ajuda:
          "I can tell you about her skills, projects, and hobbies. What would you like to know?",
        padrao:
          "Sorry, I didn’t understand. You can ask about *skills*, *projects*, or *hobbies*."
      }
    };

    if (lang === "en") {
      if (text.includes("skill")) return respostas.en.habilidades;
      if (text.includes("project")) return respostas.en.projetos;
      if (text.includes("hobby")) return respostas.en.hobbies;
      return respostas.en.padrao;
    } else {
      if (text.includes("habilidade")) return respostas.pt.habilidades;
      if (text.includes("projeto")) return respostas.pt.projetos;
      if (text.includes("hobbie")) return respostas.pt.hobbies;
      if (text.includes("oi")) return respostas.pt.saudacao;
      if (text.includes("bom dia")) return respostas.pt.saudacao;
      if (text.includes("boa tarde")) return respostas.pt.saudacao;
      return respostas.pt.padrao;
    }
  }

  function sendMessage() {
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    addMessage(userInput, "user");
    chatInput.value = "";

    setTimeout(() => {
      const reply = getBotReply(userInput, currentLanguage);
      addMessage(reply, "bot");
    }, 600);
  }

  chatbotToggle.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      chatbotBox.style.display = "flex";

      if (!firstMessageSent) {
        firstMessageSent = true;

        const res =
          currentLanguage === "en"
            ? "Hello! 👋 I'm Sabrina’s virtual assistant."
            : "Olá! 👋 Sou a assistente virtual da Sabrina.";

        const res2 =
          currentLanguage === "en"
            ? "I can tell you about her skills, projects and hobbies. What would you like to know?"
            : "Posso te contar sobre as habilidades, projetos e hobbies dela. O que você deseja saber?";

        addMessage(res, "bot");
        setTimeout(() => addMessage(res2, "bot"), 800);
      }
    } else {
      chatbotBox.style.display = "none";
    }
  });

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // auto abrir o chat ao carregar
  setTimeout(() => chatbotToggle.click(), 300);

  // === TROCAR IDIOMA ===
  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      currentLanguage = e.target.value;
      firstMessageSent = false;
      chatMessages.innerHTML = "";

      setTimeout(() => {
        const res =
          currentLanguage === "en"
            ? "Hello! 👋 I'm Sabrina’s virtual assistant."
            : "Olá! 👋 Sou a assistente virtual da Sabrina.";

        const res2 =
          currentLanguage === "en"
            ? "I can tell you about her skills, projects, and hobbies. What would you like to know?"
            : "Posso te contar sobre as habilidades, projetos e hobbies dela. O que você deseja saber?";

        addMessage(res, "bot");
        setTimeout(() => addMessage(res2, "bot"), 800);
      }, 200);
    });
  }

  // === MINIMIZAR E FECHAR ===
  const minimizeBtn = document.getElementById("minimize-chat");
  const closeChat = document.getElementById("close-chat");

  if (minimizeBtn) {
    minimizeBtn.addEventListener("click", () => {
      chatbotBox.classList.toggle("minimized");
      const minimized = chatbotBox.classList.contains("minimized");
      const messagesEl = document.getElementById("chat-messages");
      const inputArea = document.getElementById("chat-input-area");

      if (messagesEl) messagesEl.style.display = minimized ? "none" : "block";
      if (inputArea) inputArea.style.display = minimized ? "none" : "flex";
    });
  }

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatbotBox.style.display = "none";
      firstMessageSent = false; // reseta saudação
    });
  }

}); // ← FECHAMENTO FINAL (ERA O QUE FALTAVA!)

