import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';



const SendParcel = () => {

    const { register,
        handleSubmit,
        watch
    } = useForm();

    const {user}=useAuth();
    console.log(user.email)

    const axiosSecure = useAxiosSecure();


    const senderRegion = watch('senderRegion');
    const recieverRegion = watch('recieverRegion');
    const regionsData = useLoaderData()
    const regionsALL = regionsData.map(r => r.region)
    const regions = [...new Set(regionsALL)]
    console.log(regions)



    const getDistricts = (region) => {

        const filtered = regionsData.filter(r => r.region == region);
        const districts = filtered.map(f => f.district)

        return districts;
    }

    const senderDistricts = getDistricts(senderRegion)
    const recieverDistricts = getDistricts(recieverRegion)
    console.log(senderRegion)
    // console.log(districts)

    const handleSendParcel = (data) => {
        console.log(data)
        let cost = 0;
        const parcelType = data.parcelType;
        const sameDistrict = data.senderDistrict == data.recieverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight)

        if (parcelType == 'document') {
            cost = sameDistrict ? 60 : 80;
        } else {
            if (parcelWeight <= 3) {
                cost = sameDistrict ? 110 : 150;
            } else {
                const minimumCost = sameDistrict ? 110 : 150;
                const remainingWeights = parcelWeight - 3;
                const extraCost = minimumCost + (remainingWeights * 40)
                minimumCost + (remainingWeights * 40);
                cost = sameDistrict ? extraCost : extraCost + 40;
            }

        }
        console.log('cost = ', cost);
        data.cost=cost;
        console.log(sameDistrict, parcelWeight)

        Swal.fire({
            title: "Agree with the price",
            text: `You will be charged ${cost}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7C3AED",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!"
        }).then((result) => {



            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                .then(res => {
                    console.log('after saving parcel', res.data)
                })
                
                Swal.fire({
                    title: "Confirmed!",
                    text: "Your parcel request has been sent.",
                    icon: "success"
                });
            }
        });
    }


    // const districts = [
    //     "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola",
    //     "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga",
    //     "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur",
    //     "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
    //     "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat",
    //     "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia",
    //     "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj",
    //     "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
    //     "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona",
    //     "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    //     "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
    //     "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
    //     "Sylhet", "Tangail", "Thakurgaon"
    // ];




    return (
        <div className='max-w-5xl mx-auto bg-white rounded-3xl p-6 md:p-12 space-y-8 shadow-[0_4px_30px_rgba(124,58,237,0.08)] border border-[#EDE9FE]'>

            <div className='space-y-2'>
                <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                    Book a pickup
                </span>
                <h2 className='text-3xl md:text-5xl font-bold text-[#1E1B2E]'>Send A Parcel</h2>
                <p className='text-[#6B6478]'>Fill in the details below and we'll take care of the rest.</p>
            </div>

            <form onSubmit={handleSubmit(handleSendParcel)}>

                {/* document */}
                <div className='bg-white border border-[#EDE9FE] rounded-2xl p-5 md:p-6 space-y-4'>
                    <h2 className="text-xl font-bold text-[#1E1B2E]">Enter your parcel details</h2>

                    <div className='flex flex-col sm:flex-row gap-3'>
                        <label className='flex-1 flex items-center gap-2 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C4B5FD] transition-colors'>
                            <input type="radio" name="radio-4" {...register('parcelType')} value='document' className="radio radio-sm text-[#7C3AED] [--radio-color:#7C3AED]" defaultChecked />
                            <span className='font-medium text-[#1E1B2E]'>Document</span>
                        </label>

                        <label className='flex-1 flex items-center gap-2 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C4B5FD] transition-colors'>
                            <input type="radio" name="radio-4"  {...register('parcelType')} value='non-document' className="radio radio-sm text-[#7C3AED] [--radio-color:#7C3AED]" />
                            <span className='font-medium text-[#1E1B2E]'>Non Document</span>
                        </label>
                    </div>

                    {/* name,weight */}
                    <div className='flex gap-4 flex-col md:flex-row'>
                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Parcel Name</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('parcelName',{required:true})} placeholder="Parcel Name" />
                        </fieldset>
                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Parcel Weight (KG)</label>
                            <input type="number" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]" step='0.01' {...register('parcelWeight', { valueAsNumber: true ,required:true})} placeholder="Parcel Weight" />
                        </fieldset>
                    </div>
                </div>


                {/* two column */}
                <div className='flex flex-col md:flex-row gap-6 mt-6'>



                    {/* sender */}
                    <div className='w-full space-y-1  border border-[#EDE9FE] rounded-2xl p-5 md:p-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='h-8 w-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-bold'>S</span>
                            <h3 className="text-2xl font-bold text-[#1E1B2E]">Sender Details</h3>
                        </div>

                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Sender Name</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('senderName',{required:true})} placeholder="Sender Name" />
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Sender Email</label>
                            <input type="text"  defaultValue={user.email} className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('senderEmail',{required:true})} placeholder="Sender Email"/>
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Sender Address</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('senderAddress',{required:true})} placeholder="Address"/>
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Sender Phone NO</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('senderPhone',{required:true})} placeholder="Sender Phone NO" />
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Your Division</label>
                            <select defaultValue="Select Your District" {...register('senderRegion')} className="select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600">
                                <option value='' disabled={true} >Select Your District</option>


                                {
                                    regions.map((district, index) => <option key={index} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Your District</label>
                            <select defaultValue="Select Your District" {...register('senderDistrict')} className="select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600">
                                <option value='' disabled={true} >Select Your District</option>


                                {
                                    senderDistricts.map((district, index) => <option key={index} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Pickup Instruction</label>
                            <textarea type="text" className="input w-full h-30 md:h-40 p-3 resize-none whitespace-normal bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('pickupInstruction')} placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>




                    {/* reciever */}
                    <div className='w-full space-y-1  border border-[#EDE9FE] rounded-2xl p-5 md:p-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='h-8 w-8 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-sm font-bold'>R</span>
                            <h3 className="text-2xl font-bold text-[#1E1B2E]">Receiver Details</h3>
                        </div>

                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Reciever Name</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('recieverName',{required:true})} placeholder="Reciever Name" />
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Reciever Address</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('recieverAddress',{required:true})} placeholder="Address" />
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Reciever Phone NO</label>
                            <input type="text" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('recieverPhone',{required:true})} placeholder="Reciever Contact NO" />
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Reciever's Division</label>


                            <select defaultValue="Select Your District" {...register('recieverRegion')} className="select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600">
                                <option value='' disabled={true} >Select Your District</option>


                                {
                                    regions.map((district, index) => <option key={index} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>


                        
                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Reciever's District</label>


                            <select  defaultValue="Select Your District" {...register('recieverDistrict')} className="select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600">
                                <option value='' disabled={true} >Select Your District</option>


                                {
                                    recieverDistricts.map((district, index) => <option key={index} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <label className="text-sm font-semibold text-[#1E1B2E] label">Delivery Instruction</label>
                            <textarea type="text" className="input w-full h-30 md:h-40 p-3 resize-none whitespace-normal bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"  {...register('deliveryInstruction')} placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>
                </div>
                <button className='btn w-full md:w-auto mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white px-10'>Send Parcel</button>
            </form >
        </div>
    );
};

export default SendParcel;