import axios from 'axios'

export const logout= async () => {
    try{
        await axios.post('');
        localStorage.removeItem(userId);
    } catch (error) {
        console.error('Error logging out:',  error);
    }
}