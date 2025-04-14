import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/encode/Header";
import ErrorMessage from "../components/encode/ErrorMessage";
import ImageUploader from "../components/encode/ImageUploader";
import SecretForm from "../components/encode/SecretForm";
import SecurityIndicator from "../components/encode/SecurityIndicator";
import ActionButtons from "../components/encode/ActionButtons";
import SuccessMessage from "../components/encode/SuccessMessage";
import Steganography from "../utils/steganography";
import { keyManager } from "../utils/keyManager";

export default function EncodeView() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState<"standard" | "enhanced">("standard");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodingComplete, setEncodingComplete] = useState(false);
  const [encodedImage, setEncodedImage] = useState<Blob | null>(null);
  const [keyExists, setKeyExists] = useState(false);

  const changeEncryptionLevel = (value: string) => {
    setEncryptionLevel(value as "standard" | "enhanced");
  };
  
  useEffect(() => {
    const checkKey = async () => {
      const exists = await keyManager.keyExists();
      setKeyExists(exists);
      
      if (!exists) {
        setErrorMessage("No encryption key found. Please set up a key in Settings before encoding.");
      }
    };
    
    checkKey();
  }, []);

  const handleImageUpload = (file: File) => {
    setImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setEncodingComplete(false);
    setErrorMessage("");
    setEncodedImage(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyExists) {
      setErrorMessage("No encryption key found. Please set up a key in Settings before encoding.");
      return;
    }
    
    if (!image) {
      setErrorMessage("Please select an image first");
      return;
    }
    
    if (!password) {
      setErrorMessage("Password cannot be empty");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    setErrorMessage("");
    setIsEncoding(true);
    
    try {
      const result = await Steganography.hideData(
        image,
        password,
        encryptionLevel
      );
      
      setEncodedImage(result);
      setEncodingComplete(true);
    } catch (error) {
      console.error("Error encoding image:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setIsEncoding(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreviewUrl(null);
    setPassword("");
    setConfirmPassword("");
    setEncodingComplete(false);
    setErrorMessage("");
    setEncodedImage(null);
  };

  const downloadEncodedImage = () => {
    if (encodedImage && image) {
      const url = URL.createObjectURL(encodedImage);
      const a = document.createElement("a");
      a.href = url;
      a.download = `encoded_${image.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
      
      <ErrorMessage message={errorMessage} />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ImageUploader 
            image={image}
            previewUrl={previewUrl}
            onImageUpload={handleImageUpload}
          />
          
          <SecretForm
            password={password}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            encryptionLevel={encryptionLevel}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onTogglePasswordVisibility={togglePasswordVisibility}
            onEncryptionLevelChange={changeEncryptionLevel}
          />
        </div>

        <SecurityIndicator />
        
        <ActionButtons
          isEncoding={isEncoding}
          encodingComplete={encodingComplete}
          onReset={resetForm}
        />
      </form>
      
      {encodingComplete && encodedImage && (
        <SuccessMessage onDownload={downloadEncodedImage} />
      )}
    </motion.div>
  );
}