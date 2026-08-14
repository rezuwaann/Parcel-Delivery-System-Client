import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Bike, PackageCheck } from 'lucide-react';
import img1 from '../../assets/agent-pending.png'

const VEHICLE_TYPES = ['Bike', 'Scooter', 'Cycle', 'Van'];

const Rider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset } = useForm();

    const regionsData = useLoaderData();

    const regions = [...new Set(regionsData.map(r => r.region))];

    const getDistricts = (region) => {
        const filtered = regionsData.filter(r => r.region == region);
        return filtered.map(f => f.district);
    };

    const selectedRegion = watch('region');
    const districts = selectedRegion ? getDistricts(selectedRegion) : [];

    const handleRiderApplication = (data) => {
        const riderInfo = {
            ...data,
            email: user.email,
            status: 'pending',
            appliedAt: new Date().toISOString()

        };
        console.log(riderInfo);

        axiosSecure.post('/riders', riderInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Application submitted!',
                        text: "We've received your rider application. You'll hear back from us within 3–5 business days.",
                        icon: 'success',
                        confirmButtonColor: '#7C3AED',
                    });
                    reset();
                }
            })
            .catch(() => {
                Swal.fire({
                    title: 'Something went wrong',
                    text: 'Your application could not be submitted. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#7C3AED',
                });
            });
    };

    const inputClass =
        'input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]';
    const selectClass =
        'select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600';
    const labelClass = 'text-sm font-semibold text-[#1E1B2E]';

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='space-y-2 mb-8'>
                <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                    Join the fleet
                </span>
                <h1 className='text-3xl md:text-5xl font-bold text-[#1E1B2E]'>Be a Rider</h1>
                <p className='text-[#6B6478] max-w-xl'>
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero
                    hassle. From personal packages to business shipments — we deliver on
                    time, every time.
                </p>
            </div>

            <div className='grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start'>
                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleRiderApplication)}
                    className='bg-white border border-[#EDE9FE] rounded-3xl p-6 md:p-10 space-y-2 shadow-[0_4px_30px_rgba(124,58,237,0.08)]'
                >
                    <h2 className='text-xl font-bold text-[#1E1B2E] mb-2'>
                        Tell us about yourself
                    </h2>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Your Name</label>
                        <input
                            type='text'
                            className={inputClass}
                            {...register('name', { required: true })}
                            placeholder='Your Name'
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Driving License Number</label>
                        <input
                            type='text'
                            className={inputClass}
                            {...register('licenseNo')}
                            placeholder='Driving License Number'
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Your Email</label>
                        <input
                            type='text'
                            defaultValue={user.email}
                            readOnly
                            className='input w-full bg-[#FAF8FF] border-[#EDE9FE] text-[#6B6478]'
                            {...register('email')}
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Your Region</label>
                        <select
                            defaultValue=''
                            {...register('region', { required: true })}
                            className={selectClass}
                        >
                            <option value='' disabled>Select your Region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Your District</label>
                        <select
                            defaultValue=''
                            {...register('district', { required: true })}
                            className={selectClass}
                        >
                            <option value='' disabled>Select your District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>NID No</label>
                        <input
                            type='text'
                            className={inputClass}
                            {...register('nid', { required: true })}
                            placeholder='NID'
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Phone Number</label>
                        <input
                            type='text'
                            className={inputClass}
                            {...register('phone', { required: true })}
                            placeholder='Phone Number'
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Vehicle Type</label>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                            {VEHICLE_TYPES.map((vehicle) => (
                                <label
                                    key={vehicle}
                                    className='flex items-center gap-2 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C4B5FD] transition-colors'
                                >
                                    <input
                                        type='radio'
                                        value={vehicle}
                                        {...register('vehicleType', { required: true })}
                                        className='radio radio-sm text-[#7C3AED] [--radio-color:#7C3AED]'
                                    />
                                    <span className='font-medium text-[#1E1B2E]'>{vehicle}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Bike Brand, Model and Year</label>
                        <input
                            type='text'
                            className={inputClass}
                            {...register('bikeModel')}
                            placeholder='Bike Brand Model and Year'
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Bike Registration Number</label>
                        <input
                            type='text'
                            className={inputClass}
                            {...register('bikeRegNo')}
                            placeholder='Bike Registration Number'
                        />
                    </fieldset>

                    <fieldset className='fieldset w-full'>
                        <label className={labelClass}>Tell Us About Yourself</label>
                        <textarea
                            className='input w-full h-28 p-3 resize-none whitespace-normal bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]'
                            {...register('note')}
                            placeholder='Tell Us About Yourself'
                        />
                    </fieldset>

                    <button
                        type='submit'
                        className='btn w-full bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white text-lg'
                    >
                        Submit
                    </button>
                </form>

                {/* Illustration panel */}
                <div className='hidden lg:flex sticky top-8 flex-col items-center justify-center bg-[#F5F0FE] border border-[#EDE9FE] rounded-3xl p-10 h-full'>
                    <img src={img1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Rider;