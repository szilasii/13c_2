export interface IUser {
    UserId: number | null
    Name: string
    Email: string
    PhoneNumber: string | null
    PassWord: string | null
}

export class User implements IUser {
    UserId: number | null
    Name: string
    Email: string
    PhoneNumber: string | null
    PassWord: string | null

    constructor (UserId:number | null,
         Name:string,
         Email:string,
         PhoneNumber:string | null,
         PassWord:string | null)
        {
            this.UserId = UserId;
            this.Name = Name;
            this.Email = Email;
            this.PhoneNumber = PhoneNumber;
            this.PassWord = PassWord;
        }  
        nagybetu : any = () => {
        return this.Name.toLocaleLowerCase()
    }       
}






