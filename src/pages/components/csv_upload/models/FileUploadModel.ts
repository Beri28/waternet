export interface FileUploadModel {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: Date;

  validateFileType(allowedTypes: string[]): boolean;
  validateFileSize(maxSizeInMB: number, fileSizeInBytes: number): boolean;
}

export class FileUpload implements FileUploadModel {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: Date;

  constructor(id: string, fileName: string, fileType: string, uploadDate: Date) {
    this.id = id;
    this.fileName = fileName;
    this.fileType = fileType;
    this.uploadDate = uploadDate;
  }

  isValid(): boolean {
    return this.fileType === 'text/csv' || this.fileName.endsWith('.csv');
  }

  validateFileType(allowedTypes: string[]): boolean {
    return allowedTypes.includes(this.fileType);
  }

  validateFileSize(maxSizeInMB: number, fileSizeInBytes: number): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return fileSizeInBytes <= maxSizeInBytes;
  }
}