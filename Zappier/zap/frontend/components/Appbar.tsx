"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

function ZapIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="#ff4f00"
			className="size-6"
		>
			<path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
		</svg>
	);
}

export const Appbar = () => {
	const router = useRouter();
	return (
		<div className="flex border-b justify-between p-4">
			<div className="flex justify-center ml-10 text-2xl font-extrabold">
				<div className="mt-1">
					<ZapIcon />
				</div>
				<div className="ml-1 flex flex-col"> 
                    <div>
                        Zapier
                    </div>
                </div>
			</div>
			<div className="flex mr-10">
				<div className="pr-4">
					<LinkButton onClick={() => {}}>Contact Sales</LinkButton>
				</div>
				<div className="pr-4">
					<LinkButton
						onClick={() => {
							router.push("/login");
						}}
					>
						Login
					</LinkButton>
				</div>
				<PrimaryButton
					onClick={() => {
						router.push("/signup");
					}}
				>
					Signup
				</PrimaryButton>
			</div>
		</div>
	);
};
