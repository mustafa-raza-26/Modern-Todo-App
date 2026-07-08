 // Micro-interaction for FAQ accordion
        const details = document.querySelectorAll('details');
        details.forEach((targetDetail) => {
            targetDetail.addEventListener('click', () => {
                details.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute('open');
                    }
                });
            });
        });

        // Search Bar Keyboard Shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector('input').focus();
            }
        });