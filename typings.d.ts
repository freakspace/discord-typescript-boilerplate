export interface Command {
    data: any;  
    name: string;
    description: string;
    execute: (parameters: any) => Promise<void>;
  }