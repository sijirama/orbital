export const ENV = {
    API: import.meta.env.VITE_ENV == 'dev' ? 'http://localhost:3500' : 'https://orbitalbackend.onrender.com'
}
