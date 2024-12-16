// Initialize EmailJS with your public key
// You'll need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
const PUBLIC_KEY = 'whjtvClDkO_irD9Ox';

const serviceID = 'service_65plppr';

const templateID = 'template_id2dvpg';

emailjs.init(PUBLIC_KEY);

// DOM Elements
const cardForm = document.getElementById('cardForm');
const previewCard = document.getElementById('previewCard');
const previewGreeting = document.getElementById('previewGreeting');
const previewMessage = document.getElementById('previewMessage');
const recipientName = document.getElementById('recipientName');
const customMessage = document.getElementById('customMessage');
const themeColor = document.getElementById('themeColor');

// Generate HTML Email Template
function generateEmailTemplate(name, message, theme) {
    return `
        <div style="
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: ${getThemeBackground(theme)};
            border-radius: 10px;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
        ">
            <h1 style="font-size: 28px; margin-bottom: 20px;">
                🎉 Happy Birthday, ${name}! 🎂
            </h1>
            <div style="
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            ">
                <p style="font-size: 18px; line-height: 1.6;">
                    ${message}
                </p>
            </div>
            <div style="margin-top: 20px;">
                <p>🎈🎁 Wishing you an amazing day! 🎁🎈</p>
            </div>
        </div>
    `;
}

// Get theme background colors
function getThemeBackground(theme) {
    const themes = {
        theme1: 'linear-gradient(135deg, #6e8efb, #a777e3)',
        theme2: 'linear-gradient(135deg, #FF9A9E, #FAD0C4)',
        theme3: 'linear-gradient(135deg, #FFD700, #FFA500)'
    };
    return themes[theme] || themes.theme1;
}

// Update preview as user types
recipientName.addEventListener('input', updatePreview);
customMessage.addEventListener('input', updatePreview);
themeColor.addEventListener('change', updateTheme);

function updatePreview() {
    const name = recipientName.value || 'Friend';
    const message = customMessage.value || 'Wishing you a fantastic day!';
    
    previewGreeting.textContent = `Happy Birthday, ${name}!`;
    previewMessage.textContent = message;
}

function updateTheme() {
    // Remove all theme classes
    previewCard.classList.remove('theme1', 'theme2', 'theme3');
    // Add selected theme class
    previewCard.classList.add(themeColor.value);
}

// Handle form submission
cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const recipientEmail = document.getElementById('recipientEmail').value;
    const name = recipientName.value;
    const message = customMessage.value;
    const theme = themeColor.value;

    try {
        // Show loading state
        const sendButton = cardForm.querySelector('button[type="submit"]');
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true;

        // Generate HTML template
        const htmlContent = generateEmailTemplate(name, message, theme);

        // Send email using EmailJS
        await emailjs.send(serviceID, templateID, {
            to_name: name,
            to_email: recipientEmail,
            message_html: htmlContent,
            message: message
        });

        // Show success message
        alert('Birthday card sent successfully! 🎉');
        cardForm.reset();
        updatePreview();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send birthday card. Please try again.');
    } finally {
        // Reset button state
        const sendButton = cardForm.querySelector('button[type="submit"]');
        sendButton.textContent = 'Send Birthday Card';
        sendButton.disabled = false;
    }
});

// Initialize preview
updatePreview();
updateTheme();
