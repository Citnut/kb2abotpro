import axios from 'axios'
export default async (message, reply) => {
    const res = await axios({
        url: `https://api.simsimi.net/v2/?text=${encodeURI(
            message.body
        )}&lc=vn`,
        method: 'GET',
    })
    reply(res.data.success)
}