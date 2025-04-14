import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/decode/Header";
import ErrorMessage from "../components/decode/ErrorMessage";
import ImageUploader from "../components/decode/ImageUploader";
import DecodeButton from "../components/decode/DecodeButton";
import PasswordDisplay from "../components/decode/PasswordDisplay";
import { Steganography } from "../utils/steganography";

export default function DecodeView() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [decodedPassword, setDecodedPassword] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setError(null);
    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const decodeImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsDecoding(true);
    setError(null);

    try {
      const extracted = await Steganography.extractData(selectedImage);
      setDecodedPassword(extracted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decode image");
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <Header />
      
      <ErrorMessage error={error} />
      
      <ImageUploader
        selectedImage={selectedImage}
        previewUrl={previewUrl}
        onImageSelect={handleImageSelect}
      />
      
      <DecodeButton
        isDecoding={isDecoding}
        hasImage={!!selectedImage}
        onDecode={decodeImage}
      />
      
      <PasswordDisplay decodedPassword={decodedPassword} />
    </motion.div>
  );
}