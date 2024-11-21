interface IChat {
    ChatId?: number
    ChatName?: string
    Owner?:number   
}

class Chat implements IChat {
    ChatId!: number
    ChatName!: string
    Owner!: number
}