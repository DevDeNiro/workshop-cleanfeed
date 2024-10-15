import axiosClient from "@api/axiosClient.ts";

export async function getSample() {
    try {
        const response = await axiosClient("http://localhost:8080").get(
            "/sample",
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error Fetching data", error);
    }
}
