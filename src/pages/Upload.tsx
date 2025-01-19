import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import { FileData } from '../types';
import { generateCode, formatFileSize, formatDate, getFileIcon } from '../utils';
import { Progress } from "../components/ui/progress";
import toast from 'react-hot-toast';
import { Upload as UploadIcon, Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<FileData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (uploadedFile) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, uploadedFile.expiresAt - Date.now());
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          setUploadedFile(null);
          setTimeLeft(null);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [uploadedFile]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);
    setProgress(0);

    try {
      const code = generateCode();

      if (file.type.startsWith('image/')) {
        const previewReader = new FileReader();
        previewReader.onload = (e) => setPreviewUrl(e.target?.result as string);
        previewReader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          setProgress(Math.round(percentage));
        }
      };

      reader.onload = async (e) => {
        try {
          const base64Data = e.target?.result as string;
          const expiresAt = Date.now() + 69 * 60 * 1000;
          
          const fileData: FileData = {
            id: code,
            code,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadedAt: Date.now(),
            expiresAt,
            data: base64Data
          };

          setProgress(90);
          await set(ref(db, `files/${code}`), fileData);
          setProgress(100);
          setUploadedFile(fileData);
          toast.success('file uploaded successfully!');

          setTimeout(async () => {
            try {
              await set(ref(db, `files/${code}`), null);
              if (uploadedFile?.code === code) {
                setUploadedFile(null);
                setPreviewUrl(null);
              }
            } catch (error) {
              console.error('error deleting expired file:', error);
            }
          }, 69 * 60 * 1000);
        } catch (error) {
          console.error('error saving to Firebase:', error);
          toast.error('Failed to save file');
        }
      };

      reader.onerror = () => {
        console.error('error reading file');
        toast.error('failed to read file');
      };

      reader.readAsDataURL(file);

    } catch (error) {
      console.error('error uploading file:', error);
      toast.error('failed to upload file');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);
    }
  };

  const onDropRejected = (rejectedFiles: any[]) => {
    const file = rejectedFiles[0];
    if (file?.size > MAX_FILE_SIZE) {
      toast.error(`file is too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}`);
    } else {
      toast.error('file was rejected. please try again with a supported file.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('code copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('failed to copy code');
    }
  };

  const formatTimeLeft = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">upload file</h1>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors relative
            ${isDragActive 
              ? 'border-emerald-500 bg-zinc-800' 
              : 'border-zinc-700 hover:border-emerald-500'}`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
          {isDragActive ? (
            <p className="text-emerald-500">drop the file here</p>
          ) : (
            <p className="text-zinc-400">
              drag & drop a file here, or click to select
            </p>
          )}
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mt-2">
            <AlertCircle className="w-4 h-4" />
            <span>maximum file size: {formatFileSize(MAX_FILE_SIZE)}</span>
          </div>
        </div>

        {isUploading && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {uploadedFile && (
          <div className="mt-6 space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-500 mb-3">your share code</h3>
              <div className="flex items-center gap-2 bg-black rounded-lg p-4 border border-zinc-700">
                <span className="font-mono text-2xl font-bold text-white flex-1 text-center">
                  {uploadedFile.code}
                </span>
                <button
                  onClick={() => copyToClipboard(uploadedFile.code)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-zinc-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-900 rounded-lg">
                  {getFileIcon(uploadedFile.fileType, "w-8 h-8 text-emerald-500")}
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold">file details</h3>
                  <div className="space-y-2 text-sm text-zinc-400">
                    <p>Name: {uploadedFile.fileName}</p>
                    <p>Size: {formatFileSize(uploadedFile.fileSize)}</p>
                    <p>Uploaded: {formatDate(uploadedFile.uploadedAt)}</p>
                    {timeLeft !== null && (
                      <p className="flex items-center gap-2 text-emerald-500">
                        <Clock className="w-4 h-4" />
                        Expires in {formatTimeLeft(timeLeft)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-zinc-400 mb-2">preview:</p>
                  <img 
                    src={previewUrl} 
                    alt="File preview" 
                    className="w-full h-48 object-contain rounded-lg border border-zinc-700"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;