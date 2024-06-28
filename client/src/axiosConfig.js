import axios from 'axios'

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://habit-tracker-jukt.onrender.com'
    : 'http://localhost:3000'

axios.defaults.baseURL = baseURL
