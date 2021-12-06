import router from "../router";
import { Login } from "./users";
import { NotificationProgrammatic } from "@oruga-ui/oruga-next/dist/esm/notification";

const session = {
    user: null,
    messages: [],       // {text: string, type: string }
    toRoute: '/feed',
    async Login(handle, password){

        try {
            const response = await Login(handle, password);

            this.user = response.user;
    
            router.push(this.toRoute);
                
        } catch (error) {
            this.Error(error);
        }
    },
    Error(error){
        console.error(error);
        const msg = error.msg ?? error;

        this.messages.push({ text: msg, type: 'warning' })
        NotificationProgrammatic.open({
            duration: 5000,
            message: msg,
            variant: 'danger',
            type: 'danger',
            closable: true,

        })

    }
};

export default session;

//export function