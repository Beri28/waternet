import { parse } from 'papaparse';

export const parseCSVFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results:any) => {
          resolve(results.data);
        },
        error: (error:any) => {
          reject(error);
        },
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};