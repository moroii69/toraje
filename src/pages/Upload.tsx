import React, { useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { FileData } from "../types";
import {
	generateCode,
	formatFileSize,
	formatDate,
	getFileIcon,
} from "../utils";
import { Progress } from "../components/ui/progress";
import toast from "react-hot-toast";
import {
	Upload as UploadIcon,
	Copy,
	CheckCircle,
	Clock,
	AlertCircle,
} from "lucide-react";
import CryptoJS from "crypto-js";

// Access the master key from environment variables
const MASTER_KEY = import.meta.env.VITE_MASTER_KEY;

if (!MASTER_KEY) {
	throw new Error(
		"VITE_MASTER_KEY is not defined in the environment variables."
	);
}

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
				const remaining = Math.max(
					0,
					uploadedFile.expiresAt - Date.now()
				);
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
			const encryptionKey = CryptoJS.lib.WordArray.random(16).toString();

			// Set initial progress to indicate file processing has begun
			setProgress(10);
			await new Promise((resolve) => setTimeout(resolve, 300));

			if (file.type.startsWith("image/")) {
				const previewReader = new FileReader();
				previewReader.onload = (e) =>
					setPreviewUrl(e.target?.result as string);
				previewReader.readAsDataURL(file);

				// Update progress after preview generation
				setProgress(20);
				await new Promise((resolve) => setTimeout(resolve, 200));
			} else {
				setPreviewUrl(null);
			}

			const reader = new FileReader();

			reader.onprogress = (event) => {
				if (event.lengthComputable) {
					// Scale file reading to be 20-60% of the total progress
					const percentage = 20 + (event.loaded / event.total) * 40;
					setProgress(Math.round(percentage));
				}
			};

			reader.onload = async (e) => {
				try {
					// File read complete - update progress
					setProgress(60);
					await new Promise((resolve) => setTimeout(resolve, 300));

					const base64Data = e.target?.result as string;
					const expiresAt = Date.now() + 69 * 60 * 1000;

					// Encryption started - update progress
					setProgress(70);
					await new Promise((resolve) => setTimeout(resolve, 300));

					const encryptedData = CryptoJS.AES.encrypt(
						base64Data,
						encryptionKey
					).toString();
					const encryptedKey = CryptoJS.AES.encrypt(
						encryptionKey,
						MASTER_KEY
					).toString();

					// Encryption complete - update progress
					setProgress(80);
					await new Promise((resolve) => setTimeout(resolve, 200));

					const fileData: FileData = {
						id: code,
						code,
						fileName: file.name,
						fileSize: file.size,
						fileType: file.type,
						uploadedAt: Date.now(),
						expiresAt,
						data: encryptedData,
						encryptedKey,
					};

					// Firebase upload started - update progress
					setProgress(90);
					await new Promise((resolve) => setTimeout(resolve, 400));

					await set(ref(db, `files/${code}`), fileData);

					// Upload complete
					setProgress(100);
					await new Promise((resolve) => setTimeout(resolve, 300));

					// Now set the uploaded file and clear loading state
					setUploadedFile(fileData);
					setIsUploading(false);
					setProgress(0);

					toast.success(
						`File uploaded successfully! Share the code ${code} with the recipient.`
					);

					// Set expiration timer
					setTimeout(async () => {
						try {
							await set(ref(db, `files/${code}`), null);
							if (uploadedFile?.code === code) {
								setUploadedFile(null);
								setPreviewUrl(null);
							}
						} catch (error) {
							console.error(
								"Error deleting expired file:",
								error
							);
						}
					}, 69 * 60 * 1000);
				} catch (error) {
					console.error("Error saving to Firebase:", error);
					toast.error("Failed to save file");
					setIsUploading(false);
					setProgress(0);
				}
			};

			reader.onerror = () => {
				console.error("Error reading file");
				toast.error("Failed to read file");
				setIsUploading(false);
				setProgress(0);
			};

			reader.readAsDataURL(file);
		} catch (error) {
			console.error("Error uploading file:", error);
			toast.error("Failed to upload file");
			setIsUploading(false);
			setProgress(0);
		}
	};

	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		const file = rejectedFiles[0];
		if (file?.size > MAX_FILE_SIZE) {
			toast.error(
				`File is too large. Maximum size is ${formatFileSize(
					MAX_FILE_SIZE
				)}`
			);
		} else {
			toast.error(
				"File was rejected. Please try again with a supported file."
			);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected,
		maxFiles: 1,
		maxSize: MAX_FILE_SIZE,
	});

	const copyToClipboard = async (text: string): Promise<void> => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
			toast.success("Code successfully copied to clipboard.");

			setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			console.error("Error copying to clipboard:", error);
			toast.error("Failed to copy code. Please try again.");
		}
	};

	const formatTimeLeft = (ms: number) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className="max-w-2xl mx-auto px-4 py-12">
			<h1 className="text-2xl font-medium mb-8 text-white">
				Upload a file
			</h1>
			<p className="text-gray-400 text-sm mb-6">
				One file at a time supported
			</p>

			<div className="bg-gray-900/40 rounded-xl border border-gray-800 p-8 backdrop-blur-sm">
				<div
					{...getRootProps()}
					className={`border border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-300 relative ${
						isDragActive
							? "border-emerald-400 bg-gray-800/50"
							: "border-gray-700 hover:border-emerald-400 hover:bg-black/50"
					}`}>
					<input {...getInputProps()} />
					<UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-500 transition-colors" />
					{isDragActive ? (
						<p className="text-emerald-400 text-sm">
							Drop the file here
						</p>
					) : (
						<p className="text-gray-400 text-sm">
							Drag & drop a file here, or click to select
						</p>
					)}
					<div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
						<AlertCircle className="w-3 h-3" />
						<span>
							Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
						</span>
					</div>
				</div>

				{isUploading && (
					<div className="mt-6 space-y-3">
						<div className="flex justify-between text-sm text-gray-400">
							<span>Uploading...</span>
							<span>{progress}%</span>
						</div>
						<Progress value={progress} className="h-1.5" />
					</div>
				)}

				{uploadedFile && (
					<div className="mt-8 space-y-6">
						<div className="bg-black/60 rounded-lg p-6 border border-gray-800">
							<h3 className="text-sm font-medium text-emerald-400 mb-4">
								Your share code
							</h3>
							<div className="flex items-center gap-3 bg-gray-900/70 rounded-lg p-4 border border-gray-800">
								<span className="font-mono text-2xl font-medium text-white flex-1 text-center tracking-wider">
									{uploadedFile.code}
								</span>
								<button
									onClick={() =>
										copyToClipboard(uploadedFile.code)
									}
									className="p-2 hover:bg-emerald-950/50 rounded-lg transition-colors"
									title="Copy to clipboard">
									{isCopied ? (
										<CheckCircle className="w-5 h-5 text-emerald-400" />
									) : (
										<Copy className="w-5 h-5 text-gray-400 hover:text-emerald-400 transition-colors" />
									)}
								</button>
							</div>
							<p className="text-xs text-gray-400 mt-3">
								Share this 6-digit code with the recipient.
							</p>
						</div>

						<div className="bg-black/60 rounded-lg p-6 border border-gray-800">
							<div className="flex items-start gap-4">
								<div className="p-3 bg-gray-900/70 rounded-lg">
									{getFileIcon(
										uploadedFile.fileType,
										"w-7 h-7 text-emerald-400"
									)}
								</div>
								<div className="flex-1 space-y-3">
									<h3 className="text-sm font-medium">
										File details
									</h3>
									<div className="space-y-2 text-sm text-gray-400">
										<p>Name: {uploadedFile.fileName}</p>
										<p>
											Size:{" "}
											{formatFileSize(
												uploadedFile.fileSize
											)}
										</p>
										<p>
											Uploaded:{" "}
											{formatDate(
												uploadedFile.uploadedAt
											)}
										</p>
										{timeLeft !== null && (
											<p className="flex items-center gap-2 text-emerald-400">
												<Clock className="w-4 h-4" />
												Expires in{" "}
												{formatTimeLeft(timeLeft)}
											</p>
										)}
									</div>
								</div>
							</div>

							{previewUrl && (
								<div className="mt-6">
									<p className="text-xs font-medium text-gray-400 mb-2">
										Preview:
									</p>
									<div className="rounded-lg border border-gray-800 overflow-hidden bg-black/30 p-1">
										<img
											src={previewUrl}
											alt="File preview"
											className="w-full h-48 object-contain rounded"
										/>
									</div>
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
