import Link from "next/link";


export function Login() {
    return <div>
        <Link href={"/api/auth/login"}> Login </Link>
    </div>
}