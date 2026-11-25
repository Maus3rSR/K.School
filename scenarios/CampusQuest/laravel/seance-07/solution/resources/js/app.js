import './bootstrap';

document.querySelectorAll('form[data-accept-quest]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
        });

        if (!response.ok) {
            form.submit();
            return;
        }

        const data = await response.json();

        form.outerHTML = '<p>✅ Vous avez accepté cette quête.</p>';
        document.querySelector('[data-my-quests-count]').textContent = data.count;
    });
});
