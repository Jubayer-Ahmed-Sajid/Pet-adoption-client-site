import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import Title from '../../../Components/Title/Title';
import bg from '../../../assets/bannerImage/banner-parallax.jpg';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import donation from '../../../assets/bannerImage/2149428897.jpg'
import adoption from '../../../assets/bannerImage/2150167138.jpg'
import blogs from '../../../assets/bannerImage/2148454683.jpg'
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className='mb-20'>
            <Title title={'Our Services'} />
            <div className='relative  mb-12 mt-12'>
               
                <div className="overflow-hidden"> {/* This will hide the overflow for small devices */}
                    <ParallaxBanner
                        layers={[
                            { image: bg, speed: -20, scale: [1, 1.2], opacity: [0.9, 1] },
                        ]}
                        className="lg:aspect-[2/1] bg-cover bg-center"
                    />
                    <div className="lg:absolute lg:gap-12 min-h-screen inset-0 lg:flex items-center justify-around">
                        <div>
                            <Card className="lg:w-80 mx-auto">
                                <CardHeader shadow={false} floated={false} className="">
                                    <img src={adoption} alt="card-image" className="h-1/2 w-full object-cover" />
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Typography color="blue-gray" className="font-medium">
                                            Adopt New Family Member
                                        </Typography>
                                    </div>
                                    <Typography variant="paragraph" color="gray" className="font-normal opacity-75">
                                        Open your heart and home to a deserving pet, and discover a loyal friend who will be by your side through thick and thin.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button ripple={false} fullWidth={true} className="bg-secondary text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                                        <Link to='/petlisting'>Adopt Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div>
                            <Card className="lg:w-80 mx-auto">
                                <CardHeader shadow={false} floated={false} className="">
                                    <img src={donation} alt="card-image" className="h-1/2 w-full object-cover" />
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Typography color="blue-gray" className="font-medium">
                                            Your Donations Change Lives
                                        </Typography>
                                    </div>
                                    <Typography variant="paragraph" color="gray" className="font-normal opacity-75">
                                        Your donations directly support our critical services like providing shelter, medical care, and finding loving homes for animals in need.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button ripple={false} fullWidth={true} className="bg-secondary text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                                        <Link to='/donationCampaign'>Donate Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div>
                            <Card className="lg:w-80 mx-auto">
                                <CardHeader shadow={false} floated={false} className="">
                                    <img src={blogs} alt="card-image" className="h-1/2 w-full object-cover" />
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Typography color="blue-gray" className="font-medium">
                                            Join Events
                                        </Typography>
                                    </div>
                                    <Typography variant="paragraph" color="gray" className="font-normal opacity-75">
                                        We organize regular events where you can meet with different pets and can help them through your donation or you can also adopt them.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button ripple={false} fullWidth={true} className="bg-secondary text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                                        <Link to={'/events'}>Join Events</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
