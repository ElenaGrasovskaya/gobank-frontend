export interface ExpenseType {
    id: number;
    user_id: number;
    expense_name: string;
    expense_purpose: string;
    expense_category: string;
    expense_value: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserType {
    id: number,
    email: string;    
    first_name: string;
    last_name:string;
}

export interface userLoginType {
    email: string;    
    password: string,
}


export interface userRegisterType {
    first_name: string;
    last_name:string;
    email: string;    
    password: string,
}

