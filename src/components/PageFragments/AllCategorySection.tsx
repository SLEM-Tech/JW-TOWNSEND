"use client";
import React from "react";
import Picture from "../picture/Picture";
import { flowerImg, furnitureImg, headsetImg } from "@public/images";
import { FaShoppingBag } from "@node_modules/react-icons/fa";
import { heroImages } from "@constants";
import Link from "next/link";

const AllCategorySection = () => {
	return (
		<>
			<section className='flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-12 items-center px-3 lg:px-6 gap-6 lg:min-h-screen overflow-hidden max-w-[1256px] mx-auto'>
				{/* LEFT TEXT CONTENT */}
				<div className='lg:col-span-6 z-10 text-black space-y-2 lg:space-y-6 h-full text-center lg:text-start flex flex-col justify-center'>
					<h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight md:leading-8 max-w-md'>
						10% discount on all Sony Products
					</h3>

					<p className='text-base md:text-lg lg:text-xl lg:leading-[50px] text-gray-600 max-w-md'>
						You can explore ans shop many differnt collection from various
						barands here.
					</p>

					<Link
						href='/category'
						className='bg-primary shadow-md text-sm lg:text-base px-4 lg:px-6 py-3 flex items-center mx-auto lg:mx-0 rounded-md lg:rounded-none gap-2 text-white w-fit transition-[.3] hover:scale-105'
					>
						<FaShoppingBag className='text-lg' />
						<span className='capitalize'>shop now</span>
					</Link>
				</div>

				{/* RIGHT IMAGE CONTENT */}
				<div className='lg:col-span-6 relative flex justify-end items-center h-full'>
					{/* Main phone image */}
					<Picture
						src={headsetImg}
						alt='iPhone'
						className='relative z-10 w-[90%] lg:w-[1200px] object-cover'
					/>
				</div>
				{/* Label tags */}
				<Picture
					src={flowerImg}
					alt='highest'
					className='absolute top-6 lg:top-80 right-0 z-10 object-contain w-[120px] lg:w-[200px]'
				/>
			</section>
			<div className='bg-white relative'>
				<div className='w-full space-y-4 lg:space-y-8 mt-8 lg:mt-0 pt-7 lg:py-14 lg:px-5 max-w-[1256px] mx-auto'>
					<div className='flex w-full justify-center gap-1 sm:gap-12 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar'>
						<div className='grid grid-cols-2 md:grid-cols-5 gap-4 p-4'>
							{heroImages.map((image) => (
								<div
									key={image.id}
									className='relative group overflow-hidden rounded-lg'
								>
									<Picture
										src={image.src}
										alt={image.alt}
										className='w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105'
									/>
									<div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<span className='text-white font-semibold uppercase text-lg'>
											{image.category}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<Picture
					src={flowerImg}
					alt='highest'
					className='absolute bottom-10 lg:bottom-5 right-0 z-10 object-contain w-[80px] lg:w-[150px]'
				/>
			</div>
		</>
	);
};

export default AllCategorySection;
