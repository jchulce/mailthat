document.addEventListener("DOMContentLoaded", function() {
    // Get the full query string without the initial "?"
    const queryString = window.location.search.substring(1);

    let mailto = '';

    // Check if the URL starts with "mailto:"
    if (queryString.startsWith("mailto:")) {
        mailto = queryString.substring(7); // Skip "mailto:"
    } else if (queryString.startsWith("mailto=")) {
        mailto = queryString.substring(7); // Skip "mailto="
    }

    if (mailto) {
        // Show email options
        document.getElementById('emailOptions').classList.remove('hidden');
        
        // Decode and process the mailto link
        const [recipients, queryParams] = mailto.split('?');
        const mailtoLink = `mailto:${recipients}`;

        // Parse the query parameters
        const params = new URLSearchParams(queryParams || '');
        const subject = params.get('subject') || '';
        const body = params.get('body') || '';
        const cc = params.get('cc') || '';
        const bcc = params.get('bcc') || '';

        // Build the full mailto link with subject, body, cc, and bcc
        const fullMailtoLink = `${mailtoLink}?${params.toString()}`;

        document.getElementById('mailtoLink').addEventListener('click', function() {
            window.location.href = fullMailtoLink;
        });

        // Copy recipients to clipboard
        document.getElementById('copyToClipboard').addEventListener('click', function() {
            navigator.clipboard.writeText(recipients);
            alert('Recipients copied to clipboard!');
        });

        // Prepare web email client links
        const gmailBaseUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const gmailAppURl = `googlegmail:///co?to=${recipients}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const outlookBaseUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${recipients}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const outlookAppUrl = `ms-outlook://compose?to=${recipients}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const yahooBaseUrl = `https://compose.mail.yahoo.com/?to=${recipients}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subj=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const yahooAppUrl = `ymail://mail/compose?to=${recipients}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        document.getElementById('gmailLink').href = gmailBaseUrl;
        document.getElementById('gmailAppLink').href = gmailAppURl;
        document.getElementById('outlookLink').href = outlookBaseUrl;
        document.getElementById('outlookAppLink').href = outlookAppUrl;
        document.getElementById('yahooLink').href = yahooBaseUrl;
        document.getElementById('yahooAppLink').href = yahooAppUrl;
    } else {
        // Show informational screen if no mailto parameter
        document.getElementById('infoScreen').classList.remove('hidden');
    }
});
