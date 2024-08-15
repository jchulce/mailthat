document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('emailForm');
    const params = new URLSearchParams(window.location.search.substring(1));
    let mailto = '';

    // Check if the URL starts with "mailto:"
    if (window.location.search.startsWith("?mailto:")) {
        mailto = window.location.search.substring(8); // Skip "?mailto:"
    } else if (window.location.search.startsWith("?mailto=")) {
        mailto = window.location.search.substring(8); // Skip "?mailto="
    }

    if (mailto) {
        document.getElementById('emailOptions').classList.remove('hidden');

        // Decode and process the mailto link
        const [recipients, queryParams] = mailto.split('?');
        const query = new URLSearchParams(queryParams || '');

        // Set form values from the mailto parameters
        document.getElementById('to').value = recipients || '';
        document.getElementById('cc').value = query.get('cc') || '';
        document.getElementById('bcc').value = query.get('bcc') || '';
        document.getElementById('subject').value = query.get('subject') || '';
        document.getElementById('body').value = query.get('body') || '';

        // Update links on page load
        updateLinks();

        // Update links in real-time as the form is modified
        form.addEventListener('input', updateLinks);

        // Attach clipboard functionality
        document.getElementById('copyToClipboard').addEventListener('click', function() {
            const to = document.getElementById('to').value; // Get the updated 'to' value directly
            navigator.clipboard.writeText(to).then(function() {
                alert('Recipients copied to clipboard!');
            }).catch(function(error) {
                alert('Failed to copy recipients: ' + error);
            });
        });

    } else {
        // Show landing page with mailto link generator form
        document.getElementById('infoScreen').classList.remove('hidden');

        document.getElementById('generateMailtoForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const to = document.getElementById('createTo').value;
            const cc = document.getElementById('createCc').value;
            const bcc = document.getElementById('createBcc').value;
            const subject = document.getElementById('createSubject').value;
            const body = document.getElementById('createBody').value;

            const params = new URLSearchParams();
            if (cc) params.append('cc', cc);
            if (bcc) params.append('bcc', bcc);
            if (subject) params.append('subject', subject);
            if (body) params.append('body', body);

            const mailtoLink = `mailto:${to}?${params.toString()}`;
            const mailthatLink = `/?mailto:${to}?${params.toString()}`;
            const generatedMailto = document.getElementById('generatedMailto');
            const generatedLink = document.getElementById('generatedLink');
            generatedMailto.innertext = mailtoLink
            generatedLink.href = mailthatLink;
            document.getElementById('generatedLinkContainer').classList.remove('hidden');
        });
    }

    function createMailtoLink() {
        const to = document.getElementById('to').value;
        const cc = document.getElementById('cc').value;
        const bcc = document.getElementById('bcc').value;
        const subject = document.getElementById('subject').value;
        const body = document.getElementById('body').value;

        const params = new URLSearchParams();
        if (cc) params.append('cc', cc);
        if (bcc) params.append('bcc', bcc);
        if (subject) params.append('subject', subject);
        if (body) params.append('body', body);

        return `mailto:${to}?${params.toString()}`;
    }

    function updateLinks() {
        const mailtoLink = createMailtoLink();
        const to = document.getElementById('to').value;
        const cc = document.getElementById('cc').value;
        const bcc = document.getElementById('bcc').value;
        const subject = document.getElementById('subject').value;
        const body = document.getElementById('body').value;

        document.getElementById('mailtoLink').addEventListener('click', function() {
            window.location.href = mailtoLink;
        });
        //Update email client links
        document.getElementById('gmailLink').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('gmailAppLink').href = `googlegmail:///co?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('outlookLink').href = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('outlookAppLink').href = `ms-outlook://compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('yahooLink').href = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subj=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('yahooAppLink').href = `ymail://mail/compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('fastmailLink').href = `https://app.fastmail.com/mail/inbox/compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('fastmailAppLink').href = `fastmail://mail/compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('sparkAppLink').href = `readdle-spark://compose?recipient=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('airmailAppLink').href = `airmail://compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('dispatchAppLink').href = `x-dispatch:///compose?to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Update the browser's URL bar
        //const newUrl = `?mailto:${encodeURIComponent(to)}&${params.toString()}`;
        //history.replaceState(null, '', newUrl);
    }
});