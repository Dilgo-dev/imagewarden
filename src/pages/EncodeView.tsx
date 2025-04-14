import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/encode/Header";
import ErrorMessage from "../components/encode/ErrorMessage";
import ImageUploader from "../components/encode/ImageUploader";
import SecretForm from "../components/encode/SecretForm";
import SecurityIndicator from "../components/encode/SecurityIndicator";
import ActionButtons from "../components/encode/ActionButtons";
import SuccessMessage from "../components/encode/SuccessMessage";

export default function EncodeView() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState("standard");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodingComplete, setEncodingComplete] = useState(false);

  const handleImageUpload = (file: File) => {
    setImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setEncodingComplete(false);
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    setTimeout(() => {
      setIsEncoding(false);
      setEncodingComplete(true);
    }, 2000);
  };

  const resetForm = () => {
    setImage(null);
    setPreviewUrl(null);
    setPassword("");
    setConfirmPassword("");
    setEncodingComplete(false);
    setErrorMessage("");
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
            onEncryptionLevelChange={setEncryptionLevel}
          />
        </div>

        <SecurityIndicator />
        
        <ActionButtons
          isEncoding={isEncoding}
          encodingComplete={encodingComplete}
          onReset={resetForm}
        />
      </form>
      
      {encodingComplete && <SuccessMessage />}
    </motion.div>
  );
}