"use client";
import { logoImage } from "@public/images";
import Picture from "@src/components/picture/Picture";
import Link from "next/link";

interface LogoImageProps {
	className?: string;
}

export const LogoImage = ({ className }: LogoImageProps) => {
	return (
		<Link href='/' className='w-[150px]' style={{ width: "150px" }}>
			<Picture
				src={logoImage}
				alt='logo'
				priority
				loading='lazy'
				width={150}
				height={100}
				className={`!w-[60px] lg:!w-[70px] h-[50px] lg:h-[60px] duration-300 hover:scale-105 transition-[.3] hover:animate-pulse ${className}`}
			/>
		</Link>
	);
};

export const extractCurrencySymbol = (html: string) => {
	if (!html) return "";
	const doc = new DOMParser().parseFromString(html, "text/html");
	return doc.body.textContent?.match(/[\u20A6]/)?.[0] || "";
};
