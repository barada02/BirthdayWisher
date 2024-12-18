// Initialize EmailJS with your public key
const PUBLIC_KEY = 'whjtvClDkO_irD9Ox';
const serviceID = 'service_65plppr';
const templateID = 'template_id2dvpg';

emailjs.init(PUBLIC_KEY);

// DOM Elements
const cardForm = document.getElementById('cardForm');
const previewCard = document.getElementById('previewCard');
const recipientName = document.getElementById('recipientName');
const customMessage = document.getElementById('customMessage');
const templateSelect = document.getElementById('templateSelect');

// Generate Email Template
function generateEmailTemplate(name, message, selectedTemplate) {
    let template = '';
    
    if (selectedTemplate === 'template1') {
        template = `
        <div style="background: linear-gradient(45deg, #ff6b6b, #ffd93d); border-radius: 15px; padding: 30px; text-align: center; font-family: Arial, sans-serif; color: white; max-width: 600px; margin: 0 auto;">
            <div style="font-size: 40px; margin: 10px;">🎈</div>
            <div style="font-size: 1.2em; line-height: 1.6; margin: 20px 0;">
                <p>${message}</p>
                <p>May all your dreams come true!</p>
            </div>
            <div style="margin-top: 30px;">
                <p>With love,</p>
                <p>CK</p>
            </div>
            <div style="font-size: 40px; margin: 10px;">🎁</div>
        </div>`;
    } else {
        template = `
        <div style="background: linear-gradient(135deg, #1a1a1a, #4a4a4a); border-radius: 20px; padding: 40px; text-align: center; font-family: Arial, sans-serif; color: gold; max-width: 600px; margin: 0 auto; border: 2px solid gold;">
            <div style="font-size: 30px; margin: 15px;">✨</div>
            <div style="height: 2px; background: linear-gradient(90deg, transparent, gold, transparent); margin: 20px auto; width: 80%;"></div>
            <div style="color: white; font-size: 1.3em; line-height: 1.7; margin: 25px 0;">
                <p>${message}</p>
                <p>Here's to another wonderful year ahead!</p>
            </div>
            <div style="height: 2px; background: linear-gradient(90deg, transparent, gold, transparent); margin: 20px auto; width: 80%;"></div>
            <div style="margin-top: 35px; color: gold;">
                <p>Warmest wishes,</p>
                <p>CK</p>
            </div>
            <div style="font-size: 30px; margin: 15px;">✨</div>
        </div>`;
    }
    return template;
}

// Update preview
function updatePreview() {
    const name = recipientName.value || 'Friend';
    const message = customMessage.value || 'Wishing you a fantastic birthday filled with joy and happiness!';
    const selectedTemplate = templateSelect.value;
    
    previewCard.innerHTML = generateEmailTemplate(name, message, selectedTemplate);
}

// Handle form submission
cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const sendButton = e.target.querySelector('button[type="submit"]');
    sendButton.textContent = 'Sending...';
    sendButton.disabled = true;

    try {
        const templateParams = {
            to_name: recipientName.value,
            to_email: document.getElementById('recipientEmail').value,
            message_html: generateEmailTemplate(
                recipientName.value,
                customMessage.value || 'Wishing you a fantastic birthday filled with joy and happiness!',
                templateSelect.value
            )
        };

        await emailjs.send(serviceID, templateID, templateParams);
        alert('Birthday card sent successfully!');
        cardForm.reset();
        updatePreview();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send birthday card. Please try again.');
    } finally {
        sendButton.textContent = 'Send Birthday Card';
        sendButton.disabled = false;
    }
});

// Add event listeners
recipientName.addEventListener('input', updatePreview);
customMessage.addEventListener('input', updatePreview);
templateSelect.addEventListener('change', updatePreview);

// Initial preview
updatePreview();
