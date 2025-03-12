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

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Code successfully copied to clipboard.');

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy code. Please try again.');
    }
  };


  const formatTimeLeft = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 text-white">Upload file</h1>

      <div className="bg-gray-900 bg-opacity-40 rounded-md border border-gray-800 p-6">
        <div
          {...getRootProps()}
          className={`border border-dashed rounded p-8 text-center cursor-pointer transition-colors relative
            ${isDragActive
              ? 'border-emerald-400 bg-gray-800'
              : 'border-gray-700 hover:border-emerald-400 hover:bg-black'}`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="w-10 h-10 mx-auto mb-4 text-gray-500" />
          {isDragActive ? (
            <p className="text-emerald-400 text-sm">Drop the file here</p>
          ) : (
            <p className="text-gray-400 text-sm">
              Drag & drop a file here, or click to select
            </p>
          )}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
            <AlertCircle className="w-3 h-3" />
            <span>Maximum file size: {formatFileSize(MAX_FILE_SIZE)}</span>
          </div>
        </div>

        {isUploading && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}

        {uploadedFile && (
          <div className="mt-6 space-y-4">
            <div className="bg-black rounded p-4 border border-gray-800">
              <h3 className="text-sm font-medium text-emerald-400 mb-3">Your share code</h3>
              <div className="flex items-center gap-2 bg-gray-900 rounded p-3 border border-gray-800">
                <span className="font-mono text-xl font-medium text-white flex-1 text-center">
                  {uploadedFile.code}
                </span>
                <button
                  onClick={() => copyToClipboard(uploadedFile.code)}
                  className="p-1.5 hover:bg-gray-800 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-black rounded p-4 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-900 rounded">
                  {getFileIcon(uploadedFile.fileType, "w-6 h-6 text-emerald-400")}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-medium">File details</h3>
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <p>Name: {uploadedFile.fileName}</p>
                    <p>Size: {formatFileSize(uploadedFile.fileSize)}</p>
                    <p>Uploaded: {formatDate(uploadedFile.uploadedAt)}</p>
                    {timeLeft !== null && (
                      <p className="flex items-center gap-2 text-emerald-400">
                        <Clock className="w-3 h-3" />
                        Expires in {formatTimeLeft(timeLeft)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-400 mb-2">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="File preview"
                    className="w-full h-40 object-contain rounded border border-gray-800"
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