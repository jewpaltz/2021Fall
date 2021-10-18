import router from "../router";
import { Login } from "./users";

const session = {
    user: null,
    messages: [],       // {text: string, type: string }
    toRoute: '/feed',
    Login(handle, password){

        try {
            const response = Login(handle, password);

            this.user = response.user;
    
            router.push(this.toRoute);
                
        } catch (error) {
            this.messages.push({ text: error.msg, type: 'warning' })
        }


    }
};

export default session;

//export function