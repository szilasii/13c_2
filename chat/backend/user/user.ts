interface IUser {
    userId: number | null
    name: string
    email: string
    phoneNumber: string | null
    password: string | null
}

export class User implements IUser {
    userId: number | null
    name: string
    email: string
    phoneNumber: string | null
    password: string | null

    constructor (userId:number | null,
         name:string,
         email:string,
         phoneNumber:string | null,
         password:string | null)
        {
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.password = password;
        }  
        nagybetu : any = () => {
        return this.name.toLocaleLowerCase()

        
    }       
}






