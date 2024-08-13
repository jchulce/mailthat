document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const mailto = params.get('mailto');
    
    if (mailto) {
        // Show email options if a mailto parameter is present
        document.getElementById('emailOptions').classList.remove('hidden');
        
        // Parse mailto parameters
        const decodedMailto = decodeURIComponent(mailto);
        const mailtoLink = `mailto:${decodedMailto}`;
        const recipients = decodedMailto.split('?')[0];
        const subjectAndBody = decodedMailto.split('?')[1] || '';

        // Update mailto link
        document.getElementById('mailtoLink').addEventListener('click', function() {
            window.location.href = mailtoLink;
        });

        // Copy recipients to clipboard
        document.getElementById('copyToClipboard').addEventListener('click', function() {
            navigator.clipboard.writeText(recipients);
            alert('Recipients copied to clipboard!');
        });

        // Prepare web email client links
        const gmailBaseUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&${subjectAndBody}`;
        const outlookBaseUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${recipients}&${subjectAndBody}`;
        const yahooBaseUrl = `https://compose.mail.yahoo.com/?to=${recipients}&${subjectAndBody}`;

        document.getElementById('gmailLink').href = gmailBaseUrl;
        document.getElementById('outlookLink').href = outlookBaseUrl;
        document.getElementById('yahooLink').href = yahooBaseUrl;
    } else {
        // Show informational screen if no mailto parameter
        document.getElementById('infoScreen').classList.remove('hidden');
    }
});
