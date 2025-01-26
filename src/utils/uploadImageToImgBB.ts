import axios from "axios";
const imgbbAPIKey = "5eece81bae3064a984a2456e43f75675";
export const uploadImageToImgBB = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
            formData
        );
        return response.data.data.url;
    } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
        throw error;
    }
};