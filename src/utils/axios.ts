import axios from 'axios'

export async function axiospost(url: string, body: any) {
    try {
        const response = await axios.post(url, body)
        return response
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}
