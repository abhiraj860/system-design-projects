import Link from "next/link";

export default function Home() {
  return (<div>
        <Link href={"/api/auth/login"}> Login </Link>
  </div>
  );
}
