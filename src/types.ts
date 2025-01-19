export interface FileData {
  id: string;
  code: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: number;
  expiresAt: number;
  data: string;
}