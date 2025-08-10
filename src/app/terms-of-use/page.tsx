"use client";
import React, { useEffect, useState } from "react";
import AppLayout from "@src/components/AppLayout";
import { useSearchParams } from "next/navigation";
import { CompanyName } from "@constants";
import RefundPolicy from "./_components/RefundPolicy";
import DeliveryReturn from "./_components/DeliveryReturn";

const Page = () => {
	const searchParams = useSearchParams().toString();
	const search = searchParams.replace(/=$/, "");
	const [activeTab, setActiveTab] = useState<string>("termsOfUse");

	useEffect(() => {
		if (search === "terms-of-use") {
			setActiveTab("termsOfUse");
		} else if (search === "privacy-policy") {
			setActiveTab("privacyPolicy");
		} else if (search === "delivery-return") {
			setActiveTab("deliveryReturn");
		} else if (search === "refund-policy") {
			setActiveTab("refundPolicy");
		}
	}, [search]);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-6 pb-24'>
				<section className='flex w-full flex-col items-center pt-8 xl:pt-16 gap-2 sm:gap-3 px-2 sm:px-8 md:px-16 text-center'>
					<h4 className='text-black text-base sm:text-xl font-semibold leading-[120%]'>
					Our Policies
					</h4>
					<h3 className='font-semibold text-xl sm:text-2xl md:text-3xl leading-[150%]'>
					JW Townsend Communications Limited Policies
					</h3>
					<span className='text-xs sm:text-sm xl:text-base leading-[150%] text-black/80 sm:max-w-3xl slg:max-w-2xl'>
					At JW Townsend Communications Limited, we deliver innovative computer programming solutions, comprehensive ICT services, and professional web design while maintaining excellence in technology delivery and customer satisfaction.
					</span>
					<div className='flex gap-2 mt-3 xl:mt-8 text-[10px] xs:text-xs sm:text-sm slg:text-base leading-[140%] bg-[#F5F5F5] p-1 rounded-md transition'>
					<button
						className={`px-2 xl:px-4 py-2 rounded-md ${
						activeTab === "termsOfUse"
							? "bg-white text-black"
							: "bg-[#F5F5F5] text-[#667085]"
						}`}
						onClick={() => handleTabClick("termsOfUse")}
					>
						Terms of use
					</button>
					<button
						className={`px-2 xl:px-4 py-2 rounded-md ${
						activeTab === "privacyPolicy"
							? "bg-white text-black"
							: "bg-[#F5F5F5] text-[#667085]"
						}`}
						onClick={() => handleTabClick("privacyPolicy")}
					>
						Privacy Policy
					</button>
					<button
						className={`px-2 xl:px-4 py-2 rounded-md ${
						activeTab === "deliveryReturn"
							? "bg-white text-black"
							: "bg-[#F5F5F5] text-[#667085]"
						}`}
						onClick={() => handleTabClick("deliveryReturn")}
					>
						Delivery & Return
					</button>
					<button
						className={`px-2 xl:px-4 py-2 rounded-md ${
						activeTab === "refundPolicy"
							? "bg-white text-black"
							: "bg-[#F5F5F5] text-[#667085]"
						}`}
						onClick={() => handleTabClick("refundPolicy")}
					>
						Refund Policy
					</button>
					</div>
				</section>
				
				<div className='flex mx-auto w-full mt-4 md:mt-8 text-base leading-[155%] px-2 sm:px-0 sm:max-w-xl slg:max-w-2xl pb-20'>
					{activeTab === "termsOfUse" && (
					<div id='termsOfUse' className='text-[#667085]'>
						<h4 className='text-base sm:text-xl xl:text-2xl font-semibold text-black capitalize'>
						Terms of Use - JW Townsend Communications Limited
						</h4>

						<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
						By engaging JW Townsend Communications Limited for computer programming, ICT services, or web design solutions, you agree to the following comprehensive terms and conditions:
						</p>

						<ul className='list-disc pl-5 mt-2 space-y-2 text-xs md:text-sm xl:text-base'>
						<li>
							<span className='font-medium'>Service Specializations:</span> JW Townsend Communications provides expert computer programming services, comprehensive information and communication technology solutions, and professional web design services. Our specialties include custom software development, web applications, mobile apps, system integration, and digital transformation consulting.
						</li>
						<li>
							<span className='font-medium'>Web Design & Development:</span> Web design services include responsive website design, e-commerce platforms, content management systems, user experience optimization, and website maintenance. All websites are developed with modern standards including mobile responsiveness, SEO optimization, and security best practices.
						</li>
						<li>
							<span className='font-medium'>Computer Programming Services:</span> Custom programming solutions include desktop applications, web applications, mobile applications, database systems, API development, and software integration. Programming follows industry best practices with code documentation, version control, and quality assurance testing.
						</li>
						<li>
							<span className='font-medium'>ICT Consulting & Implementation:</span> ICT services encompass technology strategy consulting, system architecture design, digital infrastructure planning, cloud solutions implementation, and technology training. All recommendations align with client business objectives and industry standards.
						</li>
						<li>
							<span className='font-medium'>Project Management:</span> All projects follow structured development methodologies with defined phases, deliverables, and approval milestones. Project timelines are established collaboratively with regular progress updates and client consultation throughout development.
						</li>
						<li>
							<span className='font-medium'>Intellectual Property Rights:</span> Custom developed solutions include negotiated intellectual property rights with options for client ownership, shared ownership, or licensing arrangements. Open-source components are clearly identified with appropriate licensing documentation.
						</li>
						<li>
							<span className='font-medium'>Quality Assurance:</span> All programming and web development includes comprehensive testing, debugging, and quality assurance processes. User acceptance testing is conducted before final delivery with training and documentation provided for all solutions.
						</li>
						<li>
							<span className='font-medium'>Maintenance & Support:</span> Post-development support includes bug fixes, minor modifications, security updates, and technical assistance. Extended support contracts available for ongoing maintenance, hosting, and feature enhancements.
						</li>
						<li>
							<span className='font-medium'>Payment Structure:</span> Projects are typically billed in phases with deposits required before commencement. Web design projects require 50% upfront payment. Large programming projects may have milestone-based payment schedules established during contract negotiation.
						</li>
						</ul>

						<p className='mt-4 leading-[1.8] text-xs md:text-sm xl:text-base'>
						<span className='font-medium'>Technology Standards:</span> All development work follows current technology standards and best practices including security protocols, accessibility guidelines, and performance optimization. Code quality and documentation standards are maintained for future maintainability.
						</p>

						<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
						<span className='font-medium'>Client Collaboration:</span> Successful project delivery requires active client participation including requirement definition, feedback provision, content supply, and timely approval of deliverables throughout the development process.
						</p>
					</div>
					)}

					{activeTab === "privacyPolicy" && (
					<div id='privacyPolicy' className='text-[#667085]'>
						<h4 className='text-sm sm:text-xl xl:text-2xl font-semibold text-black'>
						PRIVACY POLICY - JW TOWNSEND COMMUNICATIONS LIMITED
						</h4>
						
						<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
						JW Townsend Communications Limited is committed to protecting client privacy while delivering computer programming, ICT services, and web design solutions. This policy explains our data practices for technology development and consulting services.
						</p>

						<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
						TECHNOLOGY SERVICES DATA COLLECTION
						</h4>
						
						<ul className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base list-decimal pl-4'>
						<li>Client business information (company details, project requirements, technical specifications)</li>
						<li>Web analytics and user behavior data for website optimization and improvement</li>
						<li>System performance data and usage statistics for application monitoring</li>
						<li>Technical support interactions and issue resolution documentation</li>
						<li>Project communication records and development milestone documentation</li>
						<li>Payment processing information for service billing and contract management</li>
						<li>User feedback and testing data for quality assurance and enhancement</li>
						<li>Security logs and access records for system protection and compliance</li>
						</ul>

						<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
						DATA USAGE IN DEVELOPMENT OPERATIONS
						</h4>
						
						<ul className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base list-disc pl-4'>
						<li>To design, develop, and implement custom programming solutions</li>
						<li>To optimize web design performance and user experience</li>
						<li>To provide ICT consulting and technology strategy recommendations</li>
						<li>To monitor system performance and ensure application reliability</li>
						<li>To provide technical support and maintenance services</li>
						<li>To ensure security and compliance with development standards</li>
						<li>To manage project timelines and deliver quality solutions</li>
						<li>To improve development processes through data analysis and feedback</li>
						</ul>

						<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
						TECHNOLOGY DATA SECURITY
						</h4>
						
						<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
						We implement comprehensive security measures for all development and project data including secure code repositories, encrypted data transmission, and restricted access protocols. Client source code and business-sensitive information are protected through professional confidentiality agreements and industry-standard security practices. Development environments are isolated and secured to prevent unauthorized access.
						</p>

						<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
						DEVELOPMENT PARTNER & VENDOR RELATIONSHIPS
						</h4>
						
						<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
						Third-party development tools and hosting providers operate under strict confidentiality agreements protecting client code and business information. Technology partner data is shared only as necessary for development and deployment purposes. All partnerships maintain data protection standards and comply with technology industry privacy requirements.
						</p>

						<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
						CLIENT CONTROL & DEVELOPMENT TRANSPARENCY
						</h4>
						
						<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
						Clients have full access to their project data, source code, and development documentation. Development processes are transparent with regular updates and milestone reporting capabilities. Business information confidentiality is maintained through secure access controls and professional data handling practices.
						</p>
					</div>
					)}

					{activeTab === "deliveryReturn" && (
					<div id='deliveryReturn' className='text-[#667085]'>
						<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
						PROJECT DELIVERY & SERVICE POLICY - JW TOWNSEND COMMUNICATIONS LIMITED
						</h3>

						<p className='text-xs md:text-sm xl:text-base mb-4'>
						JW Townsend Communications Limited provides comprehensive technology delivery solutions with guaranteed performance standards, real-time project tracking, and professional development management to ensure efficient and reliable technology implementations.
						</p>

						<div className='mb-6'>
						<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
							Development & Design Delivery Services
						</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
							<h5 className='font-medium text-xs md:text-sm mb-1'>Web Design & Development</h5>
							<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
								<li>Responsive website delivery with cross-browser testing</li>
								<li>E-commerce platform setup with payment integration</li>
								<li>Content management system implementation and training</li>
								<li>SEO optimization and performance enhancement</li>
							</ul>
							</div>
							<div>
							<h5 className='font-medium text-xs md:text-sm mb-1'>Custom Programming Solutions</h5>
							<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
								<li>Desktop application development and deployment</li>
								<li>Web application architecture and implementation</li>
								<li>Mobile app development for iOS and Android platforms</li>
								<li>Database design and system integration services</li>
							</ul>
							</div>
						</div>
						</div>

						<div className='mb-6'>
						<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
							ICT Consulting & Implementation Solutions
						</h4>
						<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
							<li>Technology strategy consulting with actionable recommendations</li>
							<li>System architecture design and implementation roadmaps</li>
							<li>Digital infrastructure planning and deployment</li>
							<li>Cloud solutions migration and optimization</li>
							<li>Technology training and knowledge transfer programs</li>
							<li>Digital transformation consulting and change management</li>
						</ul>
						</div>

						<div className='mb-6'>
						<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
							Development Process & Quality Assurance
						</h4>
						<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
							<li>Agile development methodology with sprint planning and reviews</li>
							<li>Version control systems with code repository management</li>
							<li>Comprehensive testing including unit, integration, and user acceptance testing</li>
							<li>Code review processes and quality assurance protocols</li>
							<li>Documentation delivery including technical and user manuals</li>
							<li>Performance optimization and security vulnerability assessment</li>
						</ul>
						</div>

						<div className='mb-6'>
						<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
							Project Management & Tracking Systems
						</h4>
						<div className='space-y-3'>
							<div>
							<p className='font-medium text-xs md:text-sm'>Project Visibility:</p>
							<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
								<li>Real-time project tracking with milestone monitoring</li>
								<li>Client portal for project status and deliverable updates</li>
								<li>Regular progress reports and communication schedules</li>
								<li>Change request management and approval workflows</li>
							</ul>
							</div>
							<div>
							<p className='font-medium text-xs md:text-sm'>Performance Analytics:</p>
							<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
								<li>Development velocity tracking and performance metrics</li>
								<li>Quality metrics monitoring and improvement analysis</li>
								<li>Resource utilization reports and efficiency optimization</li>
								<li>Project timeline analysis and delivery prediction models</li>
							</ul>
							</div>
						</div>
						</div>

						<div className='mb-6'>
						<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
							Service Guarantees & Technology Standards
						</h4>
						<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
							<li>Project delivery agreements with timeline guarantees</li>
							<li>Quality assurance guarantee with comprehensive testing</li>
							<li>Security compliance delivery for all development projects</li>
							<li>Professional coding standards and documentation requirements</li>
							<li>Client satisfaction guarantee with performance monitoring</li>
							<li>Continuous improvement processes based on project feedback</li>
						</ul>
						</div>
					</div>
					)}

					{activeTab === "refundPolicy" && (
					<div id='refundPolicy' className='text-[#667085]'>
						<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
						REFUND POLICY - JW TOWNSEND COMMUNICATIONS LIMITED
						</h3>
						<p className='text-xs md:text-sm xl:text-base mb-4'>
						Effective Date: {new Date().toLocaleDateString('en-GB')}
						</p>

						<p className='text-xs md:text-sm xl:text-base mb-4'>
						At JW Townsend Communications Limited, we are committed to delivering exceptional computer programming solutions, reliable ICT services, and professional web design. Our comprehensive refund policy ensures accountability while maintaining the high-quality standards our clients expect from technology development operations.
						</p>

						<ul className='list-disc pl-5 space-y-3 leading-[1.8] text-xs md:text-sm xl:text-base'>
						<li>
							<span className='font-medium'>1. Web Design & Development Refunds</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Milestone delivery refunds for projects not meeting agreed specifications</li>
							<li>Full refund for web design services not delivered due to our technical failures</li>
							<li>Prorated refunds for incomplete development work within project phases</li>
							<li>Performance guarantee refunds for websites not meeting speed requirements</li>
							<li>Functionality refunds for features not working as specified in contracts</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>2. Computer Programming Service Refunds</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Code quality refunds for programming not meeting industry standards</li>
							<li>Development failure refunds if agreed software cannot be implemented</li>
							<li>Integration failure refunds for systems not connecting as specified</li>
							<li>Security vulnerability refunds for code not meeting security requirements</li>
							<li>Documentation deficiency refunds for inadequate technical documentation</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>3. ICT Consulting Service Refunds</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Strategy consultation refunds for recommendations not meeting business objectives</li>
							<li>Implementation failure refunds if technology solutions don&apos;t deploy correctly</li>
							<li>System architecture refunds for designs that fail structural requirements</li>
							<li>Training service refunds for inadequate knowledge transfer or support</li>
							<li>Digital transformation refunds for processes not delivering promised efficiency</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>4. Technical Support & Maintenance Refunds</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Bug fix refunds for critical issues not resolved within agreed timeframes</li>
							<li>System downtime refunds for maintenance causing extended service interruptions</li>
							<li>Security update failure refunds for patches not properly applied</li>
							<li>Performance degradation refunds for maintenance causing system slowdowns</li>
							<li>Support availability refunds for technical assistance not provided as agreed</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>5. Non-Refundable Technology Services</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Successfully completed projects delivered according to approved specifications</li>
							<li>Development services completed according to agreed timelines and requirements</li>
							<li>Third-party licensing costs including software licenses and hosting fees</li>
							<li>Client-initiated changes or cancellations after development work begins</li>
							<li>External dependencies including API limitations or third-party service failures</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>6. Technology Refund Process</span>
							<p className='mt-1'>To request refunds for technology services:</p>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Submit detailed refund request with project documentation</li>
							<li>Provide specific examples of non-compliance or service failures</li>
							<li>Include project timeline evidence and communication records</li>
							<li>Submit formal technical assessment report for development issues</li>
							<li>Allow for technical review period of 5-10 business days</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>7. Technical Assessment & Resolution</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Development team review of all technical refund requests</li>
							<li>Independent code review for complex development disputes</li>
							<li>System performance analysis to identify root causes of failures</li>
							<li>Client consultation to develop technical corrective action plans</li>
							<li>Process improvement implementation to prevent future technical issues</li>
							</ul>
						</li>

						<li>
							<span className='font-medium'>8. Alternative Technology Solutions</span>
							<ul className='list-disc pl-5 mt-1 space-y-1'>
							<li>Service credits applied to future development and technology services</li>
							<li>Enhanced development services and priority technical support as compensation</li>
							<li>Additional programming features and optimization at no charge</li>
							<li>Extended maintenance agreements with improved terms and conditions</li>
							<li>Technology consulting services to improve overall system performance</li>
							</ul>
						</li>
						</ul>

						<div className='mt-6 pt-4 border-t border-gray-200'>
						<p className='text-xs md:text-sm xl:text-base'>
							For technology refunds and development resolution, please review our service agreements and project documentation before submitting requests.
						</p>
						</div>
					</div>
					)}
				</div>
				</main>
		</AppLayout>
	);
};

export default Page;
