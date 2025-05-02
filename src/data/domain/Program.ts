export interface IProgram {
    id: string; 
    name: string;
    description: string;
}

export type ProgramFormData = Omit<IProgram, 'id'>;
