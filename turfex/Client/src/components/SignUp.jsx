import { SignUp } from "@clerk/clerk-react";

export function Signup(){
    return(
        <SignUp  forceRedirectUrl={"/chat"}/>
    )
}