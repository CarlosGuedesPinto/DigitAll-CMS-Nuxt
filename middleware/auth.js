export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        return;
    }
    const config = useRuntimeConfig();

    const username = config.public.NUXT_PUBLIC_AUTH_USERNAME;
    const password = config.public.NUXT_PUBLIC_AUTH_PASSWORD;

    const auth = window.btoa(`${username}:${password}`);
    const storedAuth = localStorage.getItem('auth');

    if (storedAuth !== auth) {
        const user = prompt('Enter username:');
        const pass = prompt('Enter password:');
        if (user === username && pass === password) {
            localStorage.setItem('auth', auth);
        } else {
            alert('Invalid credentials');
            window.location.href = 'about:blank';
        }
    }
});