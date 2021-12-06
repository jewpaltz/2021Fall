//import router from "../router";
import { Login } from "./users";
import { toast } from "react-toastify";

const session = {
    user: { 
        firstName: 'Moshe',
        lastName: 'Plotkin',
        handle: '@JewPaltz',
        pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMo3I5GL9_Zd_LULXRIXTzRLlVESBnoGp8sw&usqp=CAU',
        password: 'me',
        isAdmin: true,
        emails: [
            "plotkinm@newpaltz.edu"
        ],
        following: [ { handle: '@vp', isApproved: true }, { handle: '@johnsmith', isApproved: true }, ],
        get name(){ return this.firstName + ' ' + this.lastName },
    },
    messages: [],       // {text: string, type: string }
    toRoute: '/feed',
    async Login(handle, password){

        try {
            const response = await Login(handle, password);

            this.user = response.user;
    
            //router.push(this.toRoute);
                
        } catch (error) {
            this.Error(error);
        }
    },
    Error(error){
        console.error(error);
        const msg = error.msg ?? error;

        this.messages.push({ text: msg, type: 'warning' })

        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
};

export default session;

//export function