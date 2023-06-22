import { getSession } from "next-auth/react"

//https://www.youtube.com/watch?v=VP-RCddbjrc&t=235s

export const requireAuthentication = async (context: any, callback: any) => {
    const session = await getSession(context)

    if(!session) {
        return {
            redirect: {
                destination: "/403",
                permanent: false,
            },
        }
        // console.log(session);
        // return {
        //   props: { session },
        // }
    }
    return callback();
}