import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const generateCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getFileIcon = (fileType: string, className: string): JSX.Element => {
  let IconComponent: LucideIcon = Icons.File;

  if (fileType.startsWith('image/')) {
    IconComponent = Icons.Image;
  } else if (fileType.startsWith('video/')) {
    IconComponent = Icons.Film;
  } else if (fileType.startsWith('audio/')) {
    IconComponent = Icons.Music;
  } else if (fileType.includes('pdf')) {
    IconComponent = Icons.FileText;
  } else if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) {
    IconComponent = Icons.Archive;
  } else if (fileType.includes('javascript') || fileType.includes('json') || fileType.includes('html')) {
    IconComponent = Icons.FileCode;
  }

  return React.createElement(IconComponent, { className });
};