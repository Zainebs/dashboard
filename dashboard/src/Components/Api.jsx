const petKey = "96w8GvXJ9ji1hGD029lZpTTmIJNux1rBAE9sh6yMHLYrwYJ4kk";
const petSecret = "RUHCg01gjPaEZmcnY4i8uTdXL0Xx9JiEZAyhUWKQ";

async function Api(req, res) {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", petKey);
    params.append("client_secret", petSecret);

    try {
        const petRes = await fetch("https://api.petfinder.com/v2/oauth2/token", {
            method: "POST",
            body: params,
        });

        if (!petRes.ok) {
            throw new Error(`Request failed with status: ${petRes.status}`);
        }

        const data = await petRes.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export default Api;


