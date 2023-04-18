// Get a reference to the button element with the ID 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// This event is fired when the browser is ready to prompt the user to install the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event object in a global variable so it can be accessed later
    window.deferredPrompt = event;
    // Make the install button visible by removing the 'hidden' class
    butInstall.classList.toggle('hidden',false);
});

// Add a click event listener to the install button
butInstall.addEventListener('click', async () => {
    const promptEvent =window.deferredPrompt;
    // If the prompt event does not exist, do nothing
    if(!promptEvent){
        return;
    }
    // Prompt the user to install the PWA
    promptEvent.prompt();
    window.deferredPrompt = null;
    // Hide the install button by adding the 'hidden' class
    butInstall.classList.toggle('hidden',true);
});

// This event is fired when the PWA has been successfully installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferred prompt so it cannot be used again
    window.deferredPrompt = null;
});