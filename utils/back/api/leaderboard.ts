import axios from 'axios';

export async function updtLb(address: string, action: 'sent' | 'mint', hash: string) {
    const response = await axios.post(`api/leaderboard`, {
        address,
        action,
        hash
    });
    return response.data;
}

export async function getLb() {
    const response = await axios.get(`api/leaderboard`);
    return response.data;
}