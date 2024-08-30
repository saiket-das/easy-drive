import axios from "axios";
import { toast } from "sonner";

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "easy-drive");
  formData.append("folder", "easy-drive");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/saiketdas/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
    toast.error("Failed to upload images", {
      id: "Upload images to cloudinary",
      duration: 2000,
    });
  }
};

export default uploadToCloudinary;
